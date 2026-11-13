import { describe, expect, it } from "vitest";
import { SAMPLE_DRAFT } from "./sample.ts";
import { EMPTY_DRAFT } from "./types.ts";
import { isDraftValid, validateDraft } from "./validation.ts";

describe("validateDraft", () => {
  it("rejects an empty draft with the required field errors", () => {
    const errors = validateDraft(EMPTY_DRAFT);
    expect(errors.reporterType).toBe("errorReporterType");
    expect(errors.medicineName).toBe("errorMedicineName");
    expect(errors.reaction).toBe("errorReaction");
    expect(errors.severity).toBe("errorSeverity");
    expect(errors.startedOn).toBe("errorStartDate");
    expect(isDraftValid(EMPTY_DRAFT)).toBe(false);
  });

  it("accepts the fictional sample draft", () => {
    expect(validateDraft(SAMPLE_DRAFT)).toEqual({});
    expect(isDraftValid(SAMPLE_DRAFT)).toBe(true);
  });

  it("accepts a missing start date when the unknown-date flag is set", () => {
    const draft = { ...SAMPLE_DRAFT, startedOn: "", startDateUnknown: true };
    expect(validateDraft(draft).startedOn).toBeUndefined();
    expect(isDraftValid(draft)).toBe(true);
  });

  it("rejects a stop date earlier than the start date", () => {
    const draft = { ...SAMPLE_DRAFT, startedOn: "2026-10-10", stoppedOn: "2026-10-01" };
    expect(validateDraft(draft).stoppedOn).toBe("errorDateOrder");
    expect(isDraftValid(draft)).toBe(false);
  });

  it("does not require an outcome", () => {
    const draft = { ...SAMPLE_DRAFT, outcome: "" as const };
    expect(validateDraft(draft)).toEqual({});
  });
});
