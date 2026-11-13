# Kiro prompt pack for Safra

Use these prompts in **Kiro** (IDE or CLI) once access to `minasamitawfiksaad@gmail.com` is restored. They implement the remaining polish for the Kiroween 2026 Resurrection entry. Run them **in order**, one prompt per session (or start the next only after the previous acceptance checks pass).

Do not run these prompts in some other coding agent if the goal is a genuine Kiro usage write-up. Credits on that account are only for this entry — keep each session focused.

## How to run them in spec mode

1. Open the Safra repository root (the folder that contains `.kiro/`) in Kiro:
   - **Kiro IDE:** File → Open Folder, and choose this repo.
   - **Kiro CLI:** `cd` into the repo root and run `kiro-cli`. V3 picks up workspace steering, hooks, and specs from `.kiro/`.
2. Sign in as `minasamitawfiksaad@gmail.com`.
3. Turn on **spec mode** so Kiro follows the existing Safra spec rather than starting a new one:
   - **IDE:** open the `safra-report` spec in the Kiro panel (`.kiro/specs/safra-report/`), or start a chat in spec mode and point it at that spec.
   - **CLI:** `kiro-cli chat --mode spec`, then paste the prompt. You can also name the spec in the first line of the paste.
4. Before you paste a prompt, skim:
   - Steering (always included): `.kiro/steering/product.md`, `.kiro/steering/tech.md`, `.kiro/steering/structure.md`
   - Spec: `.kiro/specs/safra-report/requirements.md`, `design.md`, `tasks.md`
5. After each prompt, confirm `npm test`, `npm run check:i18n`, and `npm run build` all pass. Then append an honest note to `docs/kiro-usage-log.md` (create it if needed): what you asked, which Kiro features you used, what Kiro changed, and any manual fix. That log is for the write-up; it may stay untracked until you choose to commit it.
6. A client-only scaffold already exists. Prefer evolving `src/components/`, `src/domain/`, and `src/i18n/` over rewriting the app.

---

## Shared constraints (apply to every prompt)

- Follow the medical-safety rules in `.kiro/steering/product.md`: informational only; no diagnosis; no treatment advice; extractive report text only.
- **No real patient data.** Do not add fields for names, national IDs, medical record numbers, phone numbers, or emails. Sample data must stay clearly fictional.
- **Safra produces a draft only.** The user files any official report with the Egyptian Pharmaceutical Vigilance Center (EPVC) themselves. Do not submit, email, fax, or otherwise send a draft to EPVC, EDA, or WHO-UMC. Keep official URLs only in `src/domain/epvc.ts`.
- Keep the app client-only (Vite + React + TypeScript, `localStorage` drafts, no backend).
- Add every new user-visible string in both `en` and `ar` in `src/i18n/messages.ts` in the same change.
- After the work: `npm test`, `npm run check:i18n`, and `npm run build` must pass. Check off the matching task in `.kiro/specs/safra-report/tasks.md`.
- Log the session in `docs/kiro-usage-log.md`.

---

## Prompt 1 — Step-by-step bilingual Yellow Card wizard

Copy everything in the block below.

```text
Work in spec mode on the existing Safra spec at .kiro/specs/safra-report/ (requirements.md, design.md, tasks.md). Follow workspace steering in .kiro/steering/product.md, tech.md, and structure.md.

Goal
Turn the current single long form into a polished guided multi-step Yellow Card wizard that works in English and Arabic. Keep the existing domain layer (types, validation, report generation, storage, EPVC constants). Steps should be: (1) reporter type, (2) suspected medicine, (3) what was observed, including dates, (4) severity and outcome, then a Prepare action that runs existing validation and opens the existing print-ready preview. Show a clear step indicator. Allow Back. Validate the current step before advancing. Keep Save draft, Load fictional sample, and Clear available on the flow. Do not ask for a diagnosis or a confirmed cause.

Spec tasks this covers
Task 6 in .kiro/specs/safra-report/tasks.md. Requirements 2.1–2.9 and 5.1–5.5 in requirements.md.

Acceptance criteria
- The wizard collects the same fields as Requirement 2.1 and still refuses to open the print view when required fields fail validation (2.3–2.8).
- A valid draft can still open the print-ready view (2.9).
- Language toggle still switches all new chrome, labels, and errors (Requirement 1). New strings exist in both en and ar.
- npm test, npm run check:i18n, and npm run build all pass.
- Mark task 6 complete in tasks.md if the criteria above are met.

Constraints
No real patient data and no identifier fields. Safra produces a draft only; the user files any official report with EPVC themselves. Do not add a backend or a filing/submit-to-EPVC path. Do not invent medical conclusions.

When you finish, append an honest session note to docs/kiro-usage-log.md (prompt summary, Kiro features used, what changed, any manual fix).
```

---

## Prompt 2 — RTL layout

```text
Work in spec mode on the existing Safra spec at .kiro/specs/safra-report/. Follow .kiro/steering/product.md, tech.md, and structure.md.

Goal
Polish right-to-left Arabic layout so the Yellow Card wizard, disclaimer, and print preview feel native in Arabic, not a mirrored afterthought. When the locale is Arabic, document dir must be rtl and lang must be ar. Alignment, step indicator, form controls, and the bilingual print card should follow RTL typography (Noto Naskh Arabic / IBM Plex Sans Arabic as in design.md) without clipping, overlapping, or leaving English-only layout artifacts (for example, left-only padding, broken chevrons, or date fields that overflow). Switching back to English must restore a solid LTR layout. Persist the locale as already specified.

Spec tasks this covers
Task 7 in .kiro/specs/safra-report/tasks.md. Requirements 1.1–1.5 in requirements.md. Visual direction in design.md.

Acceptance criteria
- Selecting Arabic presents chrome, labels, validation, and disclaimers in Arabic and sets document direction to rtl (Requirement 1.2). English restores ltr (1.3). The last language is restored after reload (1.4).
- The wizard, header, disclaimer, and preview remain readable and correctly aligned in both directions, including at a narrow mobile width.
- Every new or changed user-visible string has matching en and ar keys (1.5).
- npm test, npm run check:i18n, and npm run build all pass.
- Mark task 7 complete in tasks.md if the criteria above are met.

Constraints
No real patient data. Safra produces a draft only; the user files any official report with EPVC themselves. Do not change official EPVC URLs. Do not add diagnostic copy.

When you finish, append an honest session note to docs/kiro-usage-log.md (prompt summary, Kiro features used, what changed, any manual fix).
```

---

## Prompt 3 — Accessibility

```text
Work in spec mode on the existing Safra spec at .kiro/specs/safra-report/. Follow .kiro/steering/product.md, tech.md, and structure.md.

Goal
Make the guided Yellow Card flow usable with a keyboard and a screen reader, in both English and Arabic (RTL included). Every control must have an associated label. Validation errors must be tied to their fields with aria-invalid and aria-describedby, and announced without relying on color alone. Changing wizard step should move focus to the step heading. Add an aria-live region for save/error status. Visible focus, sufficient contrast on the yellow-card surfaces, and a logical heading/tab order are required. Do not add identifier fields in the name of a11y.

Spec tasks this covers
Task 8 in .kiro/specs/safra-report/tasks.md. Supports Requirements 2 (guided draft) and 1 (language). Design.md calls for an intuitive, complete product experience.

Acceptance criteria
- The form is fully keyboard operable (next/back, fields, save, sample, clear, prepare, print, language toggle).
- Errors are programmatically associated with fields; status messages are exposed to assistive tech.
- Focus moves to the new step heading when the step changes.
- New strings exist in both en and ar.
- npm test, npm run check:i18n, and npm run build all pass.
- Mark task 8 complete in tasks.md if the criteria above are met.

Constraints
No real patient data. Safra produces a draft only; the user files any official report with EPVC themselves. Do not add name, ID, phone, or email fields. Keep copy informational — no diagnosis or treatment advice.

When you finish, append an honest session note to docs/kiro-usage-log.md (prompt summary, Kiro features used, what changed, any manual fix).
```

---

## Prompt 4 — Print CSS / printable report

```text
Work in spec mode on the existing Safra spec at .kiro/specs/safra-report/. Follow .kiro/steering/product.md, tech.md, and structure.md.

Goal
Make the print-ready Yellow Card a distinctive, readable paper draft. Follow design.md: archival yellow card, double crimson rule, visible "DRAFT — NOT AN OFFICIAL REPORT" / "مسودة — ليست بلاغًا رسميًا" stamp, bilingual labels and values, typography as specified. When the user prints, application chrome (header, language toggle, on-screen actions, site footer) must hide, and the card must stay on a sensible page without clipped text. Report values must stay extractive: only user-entered fields plus fixed labels and the fixed disclaimer. Do not add causal language.

Spec tasks this covers
Task 9 in .kiro/specs/safra-report/tasks.md. Requirements 3.1–3.5 in requirements.md. Print and visual notes in design.md.

Acceptance criteria
- The print view restates entered fields in English and Arabic, with a clear unofficial-draft stamp (3.1–3.3).
- Print uses the browser print dialog and print CSS that hides chrome and keeps the card readable (3.4).
- Generated text does not add statements that the medicine caused the reaction (3.5). Existing report-generation tests must still pass; add tests if you change buildReport.
- npm test, npm run check:i18n, and npm run build all pass.
- Mark task 9 complete in tasks.md if the criteria above are met.

Constraints
No real patient data. Safra produces a draft only; the user files any official report with EPVC themselves. The printed page must still include the disclaimer and official EPVC pointer. Do not invent medical conclusions or "improve" the narrative with a model.

When you finish, append an honest session note to docs/kiro-usage-log.md (prompt summary, Kiro features used, what changed, any manual fix).
```

---

## Prompt 5 — EPVC e-form handoff and copy

```text
Work in spec mode on the existing Safra spec at .kiro/specs/safra-report/. Follow .kiro/steering/product.md, tech.md, and structure.md.

Goal
Make the official-reporting handoff unmistakable: Safra prepares a local draft; the user files it themselves on the official Egyptian Pharmaceutical Vigilance Center (EPVC) e-reporting form. Keep a persistent disclaimer on every screen, including the print-ready draft, stating that this tool is informational only, is not a diagnosis, is not medical advice, and does not file an official report. Name EPVC and link to the official e-form URL from src/domain/epvc.ts (https://vigiflow-eforms.who-umc.org/eg/med, already verified). Also offer only the other URLs recorded in that module (reporting portal and EDA site). Add a short "how to file this yourself" handoff near the preview or after Prepare: open the official form, copy or print this draft, and transcribe it there. Include a safe copy-to-clipboard of the extractive draft text (no identifiers). Make it obvious that clicking through leaves Safra and does not transmit the draft.

Spec tasks this covers
Task 10 in .kiro/specs/safra-report/tasks.md. Requirements 4.1–4.4 in requirements.md.

Acceptance criteria
- Disclaimer is visible on all screens, including print, with the EPVC name, official e-form link, and the "seek a healthcare professional / this draft is not medical assistance" wording (4.1, 4.2, 4.4).
- Official-reporting links come only from src/domain/epvc.ts (4.3). Do not invent additional official process.
- A clear handoff explains that the user must file with EPVC themselves; there is no in-app submit to EPVC.
- New copy exists in both en and ar.
- npm test, npm run check:i18n, and npm run build all pass.
- Mark task 10 complete in tasks.md if the criteria above are met.

Constraints
No real patient data. Safra produces a draft only; the user files any official report with EPVC themselves. Do not email, POST, or auto-fill the official form. Do not add diagnostic or treatment language.

When you finish, append an honest session note to docs/kiro-usage-log.md (prompt summary, Kiro features used, what changed, any manual fix).
```

---

## Prompt 6 — Polish and demo-readiness

```text
Work in spec mode on the existing Safra spec at .kiro/specs/safra-report/. Follow .kiro/steering/product.md, tech.md, and structure.md.

Goal
Do a final demo pass so a judge can complete a fictional draft in under three minutes, in English or Arabic, and see a print-ready unofficial Yellow Card. Tighten visual polish (yellow-card look from design.md: archival, serious, not cartoon Halloween). Fix leftover layout, contrast, or copy glitches from earlier tasks. Make the fictional sample one click away and obviously fictional. Confirm load/save/clear still work in localStorage only. Confirm the live happy path: switch language, walk the wizard, load sample, prepare draft, see bilingual unofficial card, use the EPVC handoff (link out only). Add or adjust tests only if needed to lock behaviour. Do not expand scope (no accounts, catalogue, native app, or filing integration).

Spec tasks this covers
Task 11 in .kiro/specs/safra-report/tasks.md. Cross-cutting check of Requirements 1–5.

Acceptance criteria
- A first-time user can complete the fictional sample path to a print-ready bilingual draft without confusion about it being unofficial.
- Language toggle, RTL/LTR, validation, local drafts, disclaimer, and EPVC handoff still meet the spec.
- npm test, npm run check:i18n, and npm run build all pass.
- Mark task 11 complete in tasks.md if the criteria above are met.

Constraints
No real patient data. Safra produces a draft only; the user files any official report with EPVC themselves. Do not weaken disclaimers or add causal language to make the demo "stronger."

When you finish, append an honest session note to docs/kiro-usage-log.md (prompt summary, Kiro features used, what changed, any manual fix). Also jot anything useful for the README Kiro write-up, but only describe features you actually used.
```
