"use client";

import { useRef, useState, type FormEvent } from "react";
import { Arrow } from "./icons";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const status = useRef<HTMLDivElement>(null);
  const submission = useRef("");
  const sending = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (!submission.current) submission.current = crypto.randomUUID();
    sending.current = true;
    setState("sending"); setErrors({}); setFeedback("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(data), submissionId: submission.current }),
        signal: AbortSignal.timeout(20_000),
      });
      const result = await response.json();
      if (!response.ok) {
        setState("error"); setFeedback(result.message || "Please try again."); setErrors(result.errors ?? {});
        const invalid = Object.keys(result.errors ?? {})[0];
        if (invalid) (form.elements.namedItem(invalid) as HTMLElement | null)?.focus();
        else status.current?.focus();
      } else {
        setState("success"); setFeedback(result.message); form.reset(); submission.current = ""; status.current?.focus();
      }
    } catch {
      setState("error"); setFeedback("Couldn’t reach the server. Your message is still here. Please try again or email me directly."); status.current?.focus();
    } finally { sending.current = false; }
  }

  return <form className="contact-form" onSubmit={submit} aria-label="Send an inquiry" aria-busy={state === "sending"}>
    <div className="form-intro"><h3>Send an inquiry.</h3><p>Use this form for work, project, or collaboration inquiries.</p></div>
    <div className="form-fields"><div className="form-field"><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" autoComplete="name" placeholder="How should I call you?" required minLength={2} maxLength={100} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined}/>{errors.name && <p id="name-error" className="field-error">{errors.name}</p>}</div>
    <div className="form-field"><label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined}/>{errors.email && <p id="email-error" className="field-error">{errors.email}</p>}</div>
    <div className="form-field full-width"><label htmlFor="contact-inquiry">What brings you here?</label><select id="contact-inquiry" name="inquiry" required defaultValue="" aria-invalid={!!errors.inquiry} aria-describedby={errors.inquiry ? "inquiry-error" : undefined}><option value="" disabled>Select an inquiry type</option><option>Work with me</option><option>Project inquiry</option><option>Collaboration</option><option>Say hello</option></select>{errors.inquiry && <p id="inquiry-error" className="field-error">{errors.inquiry}</p>}</div>
    <div className="form-field full-width"><label htmlFor="contact-message">Your message</label><textarea id="contact-message" name="message" rows={4} placeholder="A little context goes a long way. Tell me about your idea…" required minLength={20} maxLength={5000} aria-invalid={!!errors.message} aria-describedby="message-hint message-error"/><p id="message-hint" className="field-hint">20–5,000 characters.</p><p id="message-error" className="field-error">{errors.message}</p></div>
    <div className="form-trap" aria-hidden="true"><label htmlFor="contact-website">Leave this empty</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off"/></div></div>
    <div className="form-actions"><p>Your details are used only to respond to your inquiry.</p><button type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send message"}<Arrow/></button></div>
    <div ref={status} tabIndex={-1} role="status" aria-live="polite" className={`form-feedback ${state}`}>{feedback}</div>
  </form>;
}
