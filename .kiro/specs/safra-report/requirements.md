# Requirements Document

## Introduction

Safra is a client-only web application that helps a person in Egypt prepare an unofficial, bilingual draft of a suspected medicine side-effect observation, in the spirit of a paper Yellow Card. The draft stays in the browser and can be printed. It is not a diagnosis, not medical advice, and not an official report to the Egyptian Pharmaceutical Vigilance Center (EPVC).

This specification describes the MVP scaffold. Further feature work should be continued in Kiro.

## Requirements

### Requirement 1: Language and direction

**User Story:** As a user who reads Arabic or English, I want to switch the interface language, so that I can fill the draft in the language I am most comfortable with.

#### Acceptance Criteria

1. WHEN the application loads for the first time THE SYSTEM SHALL present the interface in English with left-to-right direction.
2. WHEN the user selects Arabic THE SYSTEM SHALL present all chrome, labels, validation messages, and disclaimers in Arabic and set the document direction to right-to-left.
3. WHEN the user selects English THE SYSTEM SHALL present those strings in English and set the document direction to left-to-right.
4. WHEN the user reloads the application after choosing a language THE SYSTEM SHALL restore the last selected language from localStorage.
5. WHEN a user-visible message key exists in one locale THE SYSTEM SHALL also provide the same key in the other locale.

### Requirement 2: Guided observation draft

**User Story:** As a patient, caregiver, or pharmacist, I want a structured form for a suspected side effect, so that I can write down what I observed without being asked for a diagnosis.

#### Acceptance Criteria

1. WHEN the user opens the form THE SYSTEM SHALL collect reporter type (patient, caregiver, pharmacist, or other health professional), suspected medicine name, optional strength or notes, optional concomitant medicines, reaction description, start date or an explicit unknown-date flag, optional stop date or an still-ongoing flag, severity (non-serious, serious, or unknown), and outcome (recovering, recovered, not recovered, recovered with sequelae, fatal, or unknown).
2. WHEN the user is filling the form THE SYSTEM SHALL NOT request a person's legal name, national identification number, medical record number, telephone number, or email address.
3. WHEN the user submits or asks to prepare the print view and the medicine name is missing THE SYSTEM SHALL show a validation error and shall not open the print view.
4. WHEN the user prepares the print view and the reaction description is missing THE SYSTEM SHALL show a validation error and shall not open the print view.
5. WHEN the user prepares the print view and no reporter type is selected THE SYSTEM SHALL show a validation error and shall not open the print view.
6. WHEN the user prepares the print view and no severity is selected THE SYSTEM SHALL show a validation error and shall not open the print view.
7. WHEN the start date is not marked unknown and no start date is provided THE SYSTEM SHALL show a validation error and shall not open the print view.
8. WHEN both a start date and a stop date are provided and the stop date is earlier than the start date THE SYSTEM SHALL show a validation error and shall not open the print view.
9. WHEN the form is valid THE SYSTEM SHALL allow the user to open a print-ready draft view.

### Requirement 3: Extractive bilingual report

**User Story:** As a user, I want a print-ready bilingual draft that only restates what I entered, so that I can keep a paper copy without the app inventing medical conclusions.

#### Acceptance Criteria

1. WHEN a valid draft is prepared THE SYSTEM SHALL generate a report whose field values are taken only from the user's input (extractive only) plus fixed labels and the fixed disclaimer.
2. WHEN the print-ready draft is shown THE SYSTEM SHALL include both English and Arabic labels and values for the entered fields.
3. WHEN the print-ready draft is shown THE SYSTEM SHALL include a visible stamp or heading that the document is a draft and is not an official report.
4. WHEN the user chooses print THE SYSTEM SHALL open the browser print dialog and apply print styles that hide application chrome and keep the draft card readable.
5. WHEN report text is generated THE SYSTEM SHALL NOT add causal language such as a statement that the medicine caused the reaction.

### Requirement 4: Persistent safety disclaimer and official EPVC pointers

**User Story:** As a user, I want to be told clearly that this tool is unofficial and where official reporting actually happens, so that I do not mistake the draft for a filed report or a diagnosis.

#### Acceptance Criteria

1. WHEN any application screen is shown, including the print-ready draft, THE SYSTEM SHALL display a disclaimer stating that the tool is informational only, is not a diagnosis, is not medical advice, and does not file an official report.
2. WHEN the disclaimer is shown THE SYSTEM SHALL name the Egyptian Pharmaceutical Vigilance Center (EPVC) and link to the official e-reporting form at `https://vigiflow-eforms.who-umc.org/eg/med`, verified on 14 November 2026 from the live form and EPVC materials.
3. WHEN the user follows official-reporting links THE SYSTEM SHALL only be offered URLs recorded in `src/domain/epvc.ts` (the official e-reporting form, the EPVC reporting portal, and the Egyptian Drug Authority site).
4. WHEN the disclaimer is shown THE SYSTEM SHALL state that anyone who needs medical care should seek a healthcare professional, and that filling this draft does not provide medical assistance.

### Requirement 5: Local drafts and fictional sample

**User Story:** As a user, I want to save a draft in my own browser and optionally load a clearly fictional sample, so that I can pause and return without sending data to a server.

#### Acceptance Criteria

1. WHEN the user saves a draft THE SYSTEM SHALL store it only in localStorage on the user's device.
2. WHEN the user returns later THE SYSTEM SHALL restore the saved draft if it is still present.
3. WHEN the user loads the sample draft THE SYSTEM SHALL fill the form with clearly fictional example data and shall not use real patient information.
4. WHEN the user clears the draft THE SYSTEM SHALL empty the form and remove the saved draft from localStorage.
5. WHEN the application runs THE SYSTEM SHALL function without a backend and without requiring the user to sign in.
