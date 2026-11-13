---
inclusion: always
---

# Project structure

```text
/
  LICENSE                 MIT, copyright Mina Sami Tawfik
  README.md
  index.html
  .kiro/steering/         product, tech, and structure (always included)
  .kiro/specs/safra-report/   requirements.md, design.md, tasks.md
  .kiro/hooks/            command hooks (JSON schema v1)
  scripts/check-i18n-keys.mjs
  src/
    main.tsx
    App.tsx
    index.css
    domain/               types, validation, report generation, storage, EPVC constants
    i18n/                 messages and locale provider
    components/           form, preview, disclaimer, language toggle
```

## Conventions

- Domain logic is framework-free TypeScript in `src/domain/`. Tests sit next to the modules they cover, as `*.test.ts`.
- Components are presentational plus form wiring. They import domain functions; they do not re-implement validation.
- File names are kebab-case for hooks and scripts, camelCase or PascalCase for TypeScript as already used in `src/`.
- Keep `.kiro/` at the repository root and never add it to `.gitignore`.
- When adding a user-visible string, add both `en` and `ar` keys in the same change.

## Medical-safety reminders while editing structure

New folders or features must still obey: informational only, no diagnosis, no official filing, no real patient data, extractive report text only. If a proposed file would send data somewhere or interpret a reaction, do not add it.
