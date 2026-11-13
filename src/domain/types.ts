export const REPORTER_TYPES = [
  "patient",
  "caregiver",
  "pharmacist",
  "other_hcp",
] as const;

export type ReporterType = (typeof REPORTER_TYPES)[number];

export const SEVERITIES = ["non_serious", "serious", "unknown"] as const;
export type Severity = (typeof SEVERITIES)[number];

export const OUTCOMES = [
  "recovering",
  "recovered",
  "not_recovered",
  "recovered_with_sequelae",
  "fatal",
  "unknown",
] as const;

export type Outcome = (typeof OUTCOMES)[number];

export interface ReportDraft {
  reporterType: ReporterType | "";
  medicineName: string;
  medicineStrength: string;
  medicineNotes: string;
  concomitantMedicines: string;
  reaction: string;
  startedOn: string;
  startDateUnknown: boolean;
  stoppedOn: string;
  stillOngoing: boolean;
  severity: Severity | "";
  outcome: Outcome | "";
}

export const EMPTY_DRAFT: ReportDraft = {
  reporterType: "",
  medicineName: "",
  medicineStrength: "",
  medicineNotes: "",
  concomitantMedicines: "",
  reaction: "",
  startedOn: "",
  startDateUnknown: false,
  stoppedOn: "",
  stillOngoing: false,
  severity: "",
  outcome: "",
};

export type DraftField = keyof ReportDraft;
export type FieldErrors = Partial<Record<DraftField, string>>;
