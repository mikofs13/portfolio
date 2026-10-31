import { createHash } from "node:crypto";

export const inquiryTypes = ["Work with me", "Project inquiry", "Collaboration", "Say hello"] as const;
type Settings = { apiKey?: string; from?: string; to: string; siteUrl?: string };
type Dependencies = { settings: () => Settings; send?: typeof fetch; now?: () => number };

export function createContactHandler({ settings, send = fetch, now = Date.now }: Dependencies) {
  // Lightweight, per-instance abuse protection. Use a shared limiter for high-volume deployments.
  const attempts = new Map<string, { count: number; expires: number }>();
  return async function POST(request: Request) {
    const config = settings();
    const origin = request.headers.get("origin");
    let allowed: string;
    try {
      const url = new URL(request.url);
      // Next may normalize the internal URL to localhost; Host retains the visitor-facing address.
      allowed = config.siteUrl ? new URL(config.siteUrl).origin : new URL(`${url.protocol}//${request.headers.get("host") || url.host}`).origin;
    } catch { return Response.json({ message: "The form is temporarily unavailable. Please use the email link below." }, { status: 503 }); }
    if (origin && origin !== allowed) return Response.json({ message: "Please submit the form from this website." }, { status: 403 });
    if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ message: "Please send a JSON form submission." }, { status: 415 });
    if (Number(request.headers.get("content-length")) > 16_384) return Response.json({ message: "Your message is too long." }, { status: 413 });

    let body: Record<string, unknown>;
    try {
      const raw = await request.text();
      if (Buffer.byteLength(raw, "utf8") > 16_384) return Response.json({ message: "Your message is too long." }, { status: 413 });
      const parsed: unknown = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid form");
      body = parsed as Record<string, unknown>;
    } catch { return Response.json({ message: "The form could not be read. Please try again." }, { status: 400 }); }

    if (typeof body.website === "string" && body.website.trim()) return Response.json({ message: "Message received." });
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const inquiry = typeof body.inquiry === "string" ? body.inquiry : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const id = typeof body.submissionId === "string" ? body.submissionId : "";
    const errors: Record<string, string> = {};
    if (name.length < 2 || name.length > 100 || /[\r\n\x00-\x1f]/.test(name)) errors.name = "Enter your name, between 2 and 100 characters.";
    if (email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) errors.email = "Enter a valid email address.";
    if (!inquiryTypes.some(type => type === inquiry)) errors.inquiry = "Choose an inquiry type.";
    if (message.length < 20 || message.length > 5000) errors.message = "Write between 20 and 5,000 characters.";
    if (!/^[a-zA-Z0-9-]{16,80}$/.test(id)) return Response.json({ message: "Please refresh the page and try again." }, { status: 400 });
    if (Object.keys(errors).length) return Response.json({ message: "Please check the highlighted fields.", errors }, { status: 400 });
    if (!config.apiKey?.trim() || !config.from?.trim()) return Response.json({ message: "The form is temporarily unavailable. Please use the email link below." }, { status: 503 });

    const timestamp = now();
    for (const [key, attempt] of attempts) if (attempt.expires <= timestamp) attempts.delete(key);
    const address = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "local";
    const key = createHash("sha256").update(address).digest("hex");
    const attempt = attempts.get(key) ?? { count: 0, expires: timestamp + 600_000 };
    if (attempt.count >= 5 || attempts.size >= 5000) return Response.json({ message: "Too many messages. Please wait a few minutes or email me directly." }, { status: 429, headers: { "Retry-After": "600" } });
    attempts.set(key, { ...attempt, count: attempt.count + 1 });
    const fingerprint = createHash("sha256").update(JSON.stringify({ name, email, inquiry, message })).digest("hex");

    try {
      const response = await send("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json", "Idempotency-Key": `contact-${id}-${fingerprint}` },
        body: JSON.stringify({
          from: config.from,
          to: [config.to],
          reply_to: email,
          subject: `Portfolio inquiry: ${inquiry}`,
          text: `New portfolio inquiry\n\nFrom: ${name}\nEmail: ${email}\nType: ${inquiry}\n\n${message}`,
        }),
        signal: AbortSignal.timeout(12_000),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result || typeof result.id !== "string") return Response.json({ message: "Your message could not be sent. Please try again or use the email link below." }, { status: 502 });
      return Response.json({ message: "Your message has been sent. Thanks for reaching out." });
    } catch { return Response.json({ message: "The email service could not be reached. Your message is still here, so you can try again." }, { status: 502 }); }
  };
}
