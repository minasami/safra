---
inclusion: always
---

# Product: Safra (صفراء)

Safra is a bilingual Arabic–English web app that resurrects the paper Yellow Card as a **draft** tool for recording a suspected medicine side effect. It is a Kiroween 2026 Resurrection-category project. It complements, and is not a fork of, Medicine Support Hub.

## Purpose

Help a patient, caregiver, or pharmacist in Egypt prepare a clear, print-ready observation draft they can keep locally and, if they choose, transcribe into the official Egyptian Pharmaceutical Vigilance Center (EPVC) reporting channels. The paper Yellow Card is the "dead" artifact being brought back; the product is the draft, not a replacement for official reporting.

## Target users

- Members of the public and caregivers who want to write down what they observed.
- Pharmacists and other health professionals who want a structured bilingual draft before using official channels.

## Medical-safety rules (non-negotiable)

These rules apply to every feature, string, comment, test, and generated report.

1. **Informational only.** Safra records observations. It does not interpret them.
2. **No diagnosis.** Never state or imply that a medicine caused a condition, that a person has a disease, or that a reaction is "confirmed." Use "suspected," "observed," and "reported by the drafter."
3. **No treatment advice.** Never suggest starting, stopping, or changing a medicine. If someone needs care, the copy may only say they should seek a healthcare professional.
4. **No official filing.** Safra does not submit, fax, email, or otherwise send a report to EPVC, the Egyptian Drug Authority, WHO-UMC, or anyone else. Every draft and print-out must say it is unofficial. Official reporting links must point only at verified EPVC / EDA URLs listed in `src/domain/epvc.ts`.
5. **No real patient data in the product.** Do not collect names, national IDs, medical record numbers, phone numbers, or emails in the form. Sample drafts must be clearly fictional. Do not ship real prescriptions, real case narratives, or exports from other apps.
6. **Extractive only.** Generated report text may only restate fields the user entered, plus fixed labels and the fixed disclaimer. Do not invent indications, doses, causality, or medical conclusions. Do not call an external model to "improve" or summarize the reaction narrative.

## Out of scope

Accounts, a medicine catalogue, causality scoring, hospital workflows, native apps, and any integration that would file a report on the user's behalf.
