import type { ReportDraft } from "./types.ts";

/** Clearly fictional sample for demos and local trials. Not a real case. */
export const SAMPLE_DRAFT: ReportDraft = {
  reporterType: "pharmacist",
  medicineName: "Examplecillin (fictional sample)",
  medicineStrength: "500 mg",
  medicineNotes: "Fictional pack, invented for the demo. Not a marketed product.",
  concomitantMedicines: "Example Vitamin D 1000 IU (fictional)",
  reaction:
    "Fictional sample only — no real person is described. Itchy rash on both arms noted two days after a first dose in this invented scenario.",
  startedOn: "2026-10-02",
  startDateUnknown: false,
  stoppedOn: "2026-10-06",
  stillOngoing: false,
  severity: "non_serious",
  outcome: "recovered",
};
