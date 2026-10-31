# Michael Feleke Sahle — Studio portfolio

Next.js App Router, React, TypeScript, and custom responsive CSS. The project lives directly in this folder.

## Run

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000.

## Validate

```sh
npm run typecheck
npm run test
npm run build
```

## Main files

- `content/site.json`: editable profile, hero, about, experience, education, skills, contact, and metadata.
- `content/projects.json`: editable project list, screenshots, descriptions, and links.
- `docs/EDITING.md`: instructions for updating content without changing components.
- `docs/EMAIL.md`: private Resend configuration and delivery setup.
- `app/page.tsx`: page layout that renders the JSON content.
- `app/globals.css`: Studio design system and responsive layouts.
- `app/layout.tsx`: metadata and self-hosted Manrope font.
- `components/`: navigation, scroll animations, project screenshots, and contact form.
- `public/studio-ribbon.webp`: optimized artwork generated with the built-in image tool.

Projects and their screenshots were imported from the original portfolio. Edit the JSON files, run `npm run check:content`, and rebuild before deployment. The Resend contact endpoint needs `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` in `.env.local`; its inbox destination comes from `content/site.json`. Never put secrets in JSON or commit them. Tests mock Resend and do not send mail.

Lenis smooths desktop wheel scrolling; section reveals, light hero parallax, and a reading-progress line provide scroll effects. Touch scrolling remains native. Reduced-motion preferences disable the added motion, including when the preference changes while the page is open. All content remains available if JavaScript fails.
