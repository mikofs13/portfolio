import { createContactHandler } from "@/lib/contact-handler";
import { site } from "@/lib/content";

export const runtime = "nodejs";
export const POST = createContactHandler({
  settings: () => ({
    apiKey: process.env.RESEND_API_KEY,
    from: process.env.CONTACT_FROM_EMAIL,
    to: site.email,
    siteUrl: process.env.CONTACT_SITE_URL,
  }),
});
