---
inclusion: always
---

# Technology stack

## Runtime

- Vite, React 19, TypeScript.
- Client-only. No backend, no authentication, no analytics, no network calls required to use the app.
- Drafts persist in `localStorage` only, under a versioned key. Clearing site data deletes drafts.
- Unit tests: Vitest. Prefer pure functions for validation and report generation so tests do not need a browser.

## Internationalization

- English and Arabic ship together. The UI direction is `ltr` for English and `rtl` for Arabic.
- All user-visible strings live in `src/i18n/messages.ts`. Adding a key in one locale without the other is a defect.
- Official names and URLs for EPVC stay in `src/domain/epvc.ts` so they are not paraphrased independently in each locale.

## Safety in implementation

- Do not add diagnostic or advisory language to copy, comments, or AI-generated suggestions.
- Do not add form fields for real patient identifiers.
- Do not add APIs, email, or webhooks that transmit a draft.
- Do not introduce a large language model or "smart summary" of the reaction text.
- Prefer existing components and domain functions over new abstractions.

## Tooling

- Package manager: npm.
- `npm test` runs Vitest once. `npm run check:i18n` checks locale key parity. `npm run build` must stay green.
- Real feature work after this scaffold should be done in Kiro (account `minasamitawfiksaad@gmail.com`) so the hackathon Kiro-usage write-up is genuine.
