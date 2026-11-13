# Implementation Plan

The items marked complete are part of the initial local scaffold. Remaining or follow-on work should be executed in Kiro on `minasamitawfiksaad@gmail.com` so the hackathon write-up reflects genuine Kiro usage.

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

- [ ] 6. Continue feature work in Kiro (not in this scaffold pass)
  - Open the repo in Kiro, review the spec, and iterate on polish, accessibility, and any agreed MVP additions
  - Keep medical-safety steering in force
  - Record honest notes for the Kiro usage write-up in the README
  - _Requirements: all_
