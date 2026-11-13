import { EPVC } from "./epvc.ts";
import { messages, type Locale, type MessageKey } from "../i18n/messages.ts";
import type { Outcome, ReportDraft, ReporterType, Severity } from "./types.ts";

export interface ReportLine {
  id: string;
  labelEn: string;
  labelAr: string;
  valueEn: string;
  valueAr: string;
}

export interface ReportView {
  titleEn: string;
  titleAr: string;
  stampEn: string;
  stampAr: string;
  disclaimerEn: string;
  disclaimerAr: string;
  officialNameEn: string;
  officialNameAr: string;
  officialUrl: string;
  lines: ReportLine[];
}

function t(locale: Locale, key: MessageKey): string {
  return messages[locale][key];
}

function textOrEmDash(value: string, locale: Locale): string {
  const trimmed = value.trim();
  if (!trimmed) return t(locale, "valueNotProvided");
  return trimmed;
}

function reporterLabel(value: ReportDraft["reporterType"], locale: Locale): string {
  if (!value) return t(locale, "valueNotProvided");
  const keys: Record<ReporterType, MessageKey> = {
    patient: "reporterPatient",
    caregiver: "reporterCaregiver",
    pharmacist: "reporterPharmacist",
    other_hcp: "reporterOtherHcp",
  };
  return t(locale, keys[value]);
}

function severityLabel(value: ReportDraft["severity"], locale: Locale): string {
  if (!value) return t(locale, "valueNotProvided");
  const keys: Record<Severity, MessageKey> = {
    non_serious: "severityNonSerious",
    serious: "severitySerious",
    unknown: "severityUnknown",
  };
  return t(locale, keys[value]);
}

function outcomeLabel(value: ReportDraft["outcome"], locale: Locale): string {
  if (!value) return t(locale, "valueNotProvided");
  const keys: Record<Outcome, MessageKey> = {
    recovering: "outcomeRecovering",
    recovered: "outcomeRecovered",
    not_recovered: "outcomeNotRecovered",
    recovered_with_sequelae: "outcomeSequelae",
    fatal: "outcomeFatal",
    unknown: "outcomeUnknown",
  };
  return t(locale, keys[value]);
}

function startDateValue(draft: ReportDraft, locale: Locale): string {
  if (draft.startDateUnknown) return t(locale, "dateUnknown");
  return textOrEmDash(draft.startedOn, locale);
}

function stopDateValue(draft: ReportDraft, locale: Locale): string {
  if (draft.stillOngoing) return t(locale, "stillOngoing");
  return textOrEmDash(draft.stoppedOn, locale);
}

/**
 * Build a print view that restates user-entered fields and fixed labels only.
 * Do not add causal or diagnostic sentences.
 */
export function buildReport(draft: ReportDraft): ReportView {
  const line = (
    id: string,
    label: MessageKey,
    valueEn: string,
    valueAr: string,
  ): ReportLine => ({
    id,
    labelEn: t("en", label),
    labelAr: t("ar", label),
    valueEn,
    valueAr,
  });

  return {
    titleEn: t("en", "reportTitle"),
    titleAr: t("ar", "reportTitle"),
    stampEn: t("en", "draftStamp"),
    stampAr: t("ar", "draftStamp"),
    disclaimerEn: t("en", "disclaimerFull"),
    disclaimerAr: t("ar", "disclaimerFull"),
    officialNameEn: EPVC.englishName,
    officialNameAr: EPVC.arabicName,
    officialUrl: EPVC.eReportingUrl,
    lines: [
      line("reporter", "fieldReporterType", reporterLabel(draft.reporterType, "en"), reporterLabel(draft.reporterType, "ar")),
      line("medicine", "fieldMedicineName", textOrEmDash(draft.medicineName, "en"), textOrEmDash(draft.medicineName, "ar")),
      line("strength", "fieldMedicineStrength", textOrEmDash(draft.medicineStrength, "en"), textOrEmDash(draft.medicineStrength, "ar")),
      line("notes", "fieldMedicineNotes", textOrEmDash(draft.medicineNotes, "en"), textOrEmDash(draft.medicineNotes, "ar")),
      line(
        "concomitant",
        "fieldConcomitant",
        textOrEmDash(draft.concomitantMedicines, "en"),
        textOrEmDash(draft.concomitantMedicines, "ar"),
      ),
      line("reaction", "fieldReaction", textOrEmDash(draft.reaction, "en"), textOrEmDash(draft.reaction, "ar")),
      line("started", "fieldStartDate", startDateValue(draft, "en"), startDateValue(draft, "ar")),
      line("stopped", "fieldStopDate", stopDateValue(draft, "en"), stopDateValue(draft, "ar")),
      line("severity", "fieldSeverity", severityLabel(draft.severity, "en"), severityLabel(draft.severity, "ar")),
      line("outcome", "fieldOutcome", outcomeLabel(draft.outcome, "en"), outcomeLabel(draft.outcome, "ar")),
    ],
  };
}
