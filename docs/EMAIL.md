# Connect the contact form to Resend

1. Create a Resend account and verify a domain you own in its Domains page.
2. Create an API key with permission to send email.
3. Copy `.env.example` to `.env.local`. Set `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` to your key and verified sender, for example `Michael Portfolio <contact@your-domain.com>`.
4. Restart `npm run dev`. The destination inbox is `email` in `content/site.json`.
5. Submit the form and confirm receipt. The visitor's address is set as Reply-To so you can reply directly from your inbox.
6. In production, set the same environment variables in your hosting dashboard. Set `CONTACT_SITE_URL` to the exact public origin if the deployment uses a proxy or custom domain.

Never use a `NEXT_PUBLIC_` prefix for your key. `.env.local` is ignored by Git. No key belongs in the editable JSON files. Until both required settings are present, the form preserves the visitor's text and shows an honest unavailable message instead of claiming it sent mail.

The form sends only to the configured owner inbox. Server validation, a hidden honeypot, a request size limit, a same-origin check, per-instance rate limiting, and provider idempotency protect the endpoint. The in-memory limiter resets when a server instance restarts and is not shared across instances; use a shared rate-limit store or hosting-level protection if traffic warrants it.

The automated tests mock Resend; they do not send email or prove inbox delivery. Run a live test after configuring the sender and key. See the [Resend sending API](https://resend.com/docs/api-reference/emails/send-email) for provider requirements.
