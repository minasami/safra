# Safra (صفراء)

Safra is a bilingual Arabic–English web app that resurrects the paper Yellow Card as an **unofficial draft** for recording a suspected medicine side effect. You can fill a guided form, save the draft in your own browser, and print a bilingual card.

This project is being prepared as a [Kiroween 2026](https://kiroween.devpost.com/) entry in the **Resurrection** category. It is a new standalone project. It is not a fork of Medicine Support Hub.

**Live demo:** https://safra-eosin.vercel.app

**This tool is informational only. It is not a diagnosis, not medical advice, and not an official report.** Safra does not send data to any authority. If you choose to report, use the official Egyptian Pharmaceutical Vigilance Center (EPVC) e-reporting form.

## Official reporting (verified 14 November 2026, Africa/Cairo)

The live official form and EPVC materials use the name **Egyptian Pharmaceutical Vigilance Center (EPVC)** / **المركز المصري لليقظة الدوائية (EPVC)**.

- Official e-reporting form: [https://vigiflow-eforms.who-umc.org/eg/med](https://vigiflow-eforms.who-umc.org/eg/med)
- EPVC reporting portal: [https://sites.google.com/view/epvc-reporting/home](https://sites.google.com/view/epvc-reporting/home)
- Egyptian Drug Authority: [https://www.edaegypt.gov.eg](https://www.edaegypt.gov.eg)
- EDA hotline, also listed on the official form: 15301

Safra only points to these pages. It does not file a report for you.

## How to run it

Requirements: Node.js 22+ and npm.

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

Other useful commands:

```bash
npm test           # Vitest: validation, report generation, and i18n key parity
npm run check:i18n # Same key-parity check used by the Kiro hook
npm run build      # Typecheck and production build
npm run preview    # Serve the production build locally
```

There is no backend and no sign-in. Drafts stay in `localStorage` on your device. Use **Load fictional sample** for a clearly invented demo case. Do not enter real names or identifiers.

## How Kiro was used

The repository already includes a root `/.kiro` directory that must stay tracked (do not add it to `.gitignore`):

- Steering: `.kiro/steering/product.md`, `tech.md`, and `structure.md` (always included). They state the medical-safety rules: informational only, no diagnosis, no official filing, no real patient data, extractive report text only.
- Spec: `.kiro/specs/safra-report/` with EARS-style `requirements.md`, plus `design.md` and `tasks.md`.
- Hooks (Kiro hook schema `v1`, `PostFileSave` command actions): run tests after TypeScript source is saved, and check English/Arabic message keys when i18n files change.

This first commit is a local scaffold so the project can be opened in Kiro. **Further feature work should be done in Kiro**, signed in as `minasamitawfiksaad@gmail.com`, so the hackathon write-up reflects genuine Kiro usage (specs, steering, hooks, and any later experiments with CLI, Crew, MCP, or property-based tests).

### Notes for the official Kiro write-up

_Complete this section honestly, in your own words, after you have used Kiro on the project. Only describe features you actually used. Judges will read this, and a later README or Devpost field should not invent tool use._

- **Surfaces tried** (IDE, CLI, Web, and/or Crew), and how they differed if you tried more than one:
- **Specs vs vibe coding:** how the `safra-report` spec guided implementation, and any contrast with vibe coding:
- **Steering:** which guidance made the biggest difference:
- **Hooks:** what they automated, and whether that helped:
- **Custom agents, MCP, property-based testing, Kiro powers:** only if used:

## Disclaimer

Safra is an independent project by Mina Sami Tawfik. It is not affiliated with the Egyptian Pharmaceutical Vigilance Center or the Egyptian Drug Authority. The software is provided under the MIT License, without warranty of any kind.

If you need medical care, seek a healthcare professional. Filling or printing this draft does not provide medical assistance.
