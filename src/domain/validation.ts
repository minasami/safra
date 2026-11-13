import type { FieldErrors, ReportDraft } from "./types.ts";

function hasText(value: string): boolean {
  return value.trim().length > 0;
}

export function validateDraft(draft: ReportDraft): FieldErrors {
  const errors: FieldErrors = {};

  if (!draft.reporterType) {
    errors.reporterType = "errorReporterType";
  }

  if (!hasText(draft.medicineName)) {
    errors.medicineName = "errorMedicineName";
  }

  if (!hasText(draft.reaction)) {
    errors.reaction = "errorReaction";
  }

  if (!draft.severity) {
    errors.severity = "errorSeverity";
  }

  if (!draft.startDateUnknown && !hasText(draft.startedOn)) {
    errors.startedOn = "errorStartDate";
  }

  if (
    hasText(draft.startedOn) &&
    hasText(draft.stoppedOn) &&
    !draft.startDateUnknown &&
    draft.stoppedOn < draft.startedOn
  ) {
    errors.stoppedOn = "errorDateOrder";
  }

  return errors;
}

export function isDraftValid(draft: ReportDraft): boolean {
  return Object.keys(validateDraft(draft)).length === 0;
}
