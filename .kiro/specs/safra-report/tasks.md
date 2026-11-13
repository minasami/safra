# Implementation Plan

The items marked complete in tasks 1–5 are part of the initial local scaffold. Tasks 6–11 are the remaining Kiro polish. Run them in Kiro on `minasamitawfiksaad@gmail.com` (prompt pack: `docs/kiro-prompts.md`) so the hackathon write-up reflects genuine Kiro usage.

- [x] 1. Scaffold the Vite + React + TypeScript project, MIT license, README, and git repository
  - Initialize the app with npm, add Vitest, and keep `.kiro/` tracked
  - _Requirements: 5.5_

- [x] 2. Add Kiro steering, the safra-report spec, and hooks
  - Write always-included `product.md`, `tech.md`, and `structure.md` with medical-safety rules
  - Write EARS requirements, design, and this task list
  - Add PostFileSave command hooks for tests and i18n key parity
  - _Requirements: 1.5, 4.1, 4.2_

- [x] 3. Implement domain types, EPVC constants, validation, report generation, and localStorage
  - Record official EPVC name and verified URLs in one module
  - Reject incomplete drafts and inverted dates
  - Build an extractive bilingual report view that always includes the disclaimer
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 3.1, 3.2, 3.3, 3.5, 5.1, 5.2, 5.4_

- [x] 4. Implement bilingual UI, the guided form, print-ready preview, and yellow-card design
  - Language toggle with RTL/LTR and persisted locale
  - Persistent disclaimer with official EPVC e-reporting link
  - Fictional sample draft and print styles
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.9, 3.4, 4.1, 4.2, 4.3, 4.4, 5.3, 5.5_

- [x] 5. Add Vitest coverage for validation, report generation, and i18n key parity
  - Ensure `npm test` and `npm run build` pass on the scaffold
  - _Requirements: 1.5, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 3.1, 3.5, 4.1_

- [ ] 6. Step-by-step bilingual Yellow Card wizard
  - Turn the single long form into a guided multi-step flow (reporter, medicine, observation, severity) with a step indicator, Back, and per-step validation, in English and Arabic
  - Keep Save draft, Load fictional sample, and Clear; keep the existing domain layer
  - Prompt: `docs/kiro-prompts.md`, Prompt 1
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 7. RTL layout polish
  - Make Arabic layout truly RTL (dir, typography, alignment, step chrome, preview) and keep English LTR solid, including at narrow widths
  - Prompt: `docs/kiro-prompts.md`, Prompt 2
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ] 8. Accessibility
  - Label every control; associate errors with fields; move focus on step change; keyboard access; aria-live status; contrast and visible focus
  - Prompt: `docs/kiro-prompts.md`, Prompt 3
  - _Requirements: 1, 2_

- [ ] 9. Print CSS / printable report
  - Distinctive bilingual unofficial Yellow Card; hide app chrome in print; extractive values only; keep the draft stamp and disclaimer
  - Prompt: `docs/kiro-prompts.md`, Prompt 4
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 10. EPVC e-form handoff and copy
  - Persistent unofficial disclaimer and official links only from `src/domain/epvc.ts`; a clear "file this yourself" handoff to the official e-form; optional copy of the extractive draft; no in-app filing
  - Prompt: `docs/kiro-prompts.md`, Prompt 5
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 11. Polish and demo-readiness
  - Judge-ready fictional sample path in under three minutes, both languages; tighten visuals; confirm save/restore, disclaimer, and EPVC handoff still meet the spec
  - Prompt: `docs/kiro-prompts.md`, Prompt 6
  - _Requirements: 1, 2, 3, 4, 5_
