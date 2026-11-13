import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { EPVC } from "../domain/epvc.ts";
import { SAMPLE_DRAFT } from "../domain/sample.ts";
import {
  OUTCOMES,
  REPORTER_TYPES,
  SEVERITIES,
  type DraftField,
  type FieldErrors,
  type Outcome,
  type ReportDraft,
  type ReporterType,
  type Severity,
} from "../domain/types.ts";
import { validateDraft } from "../domain/validation.ts";
import { useLocale } from "../i18n/locale.tsx";
import type { MessageKey } from "../i18n/messages.ts";

interface ReportFormProps {
  draft: ReportDraft;
  onChange: (draft: ReportDraft) => void;
  onSave: () => void;
  onClear: () => void;
  onPrepare: () => void;
}

const reporterKeys: Record<ReporterType, MessageKey> = {
  patient: "reporterPatient",
  caregiver: "reporterCaregiver",
  pharmacist: "reporterPharmacist",
  other_hcp: "reporterOtherHcp",
};

const severityKeys: Record<Severity, MessageKey> = {
  non_serious: "severityNonSerious",
  serious: "severitySerious",
  unknown: "severityUnknown",
};

const outcomeKeys: Record<Outcome, MessageKey> = {
  recovering: "outcomeRecovering",
  recovered: "outcomeRecovered",
  not_recovered: "outcomeNotRecovered",
  recovered_with_sequelae: "outcomeSequelae",
  fatal: "outcomeFatal",
  unknown: "outcomeUnknown",
};

export function ReportForm({ draft, onChange, onSave, onClear, onPrepare }: ReportFormProps) {
  const { t } = useLocale();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [savedMessage, setSavedMessage] = useState(false);

  function update<K extends DraftField>(field: K, value: ReportDraft[K]) {
    const next = { ...draft, [field]: value };
    if (field === "startDateUnknown" && value === true) {
      next.startedOn = "";
    }
    if (field === "stillOngoing" && value === true) {
      next.stoppedOn = "";
    }
    onChange(next);
    if (errors[field]) {
      setErrors((current) => {
        const rest = { ...current };
        delete rest[field];
        return rest;
      });
    }
  }

  function onText(field: DraftField) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      update(field, event.target.value as ReportDraft[typeof field]);
    };
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const nextErrors = validateDraft(draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      onPrepare();
    }
  }

  function handleSave() {
    onSave();
    setSavedMessage(true);
  }

  function fieldError(field: DraftField) {
    const key = errors[field];
    return key ? t(key as MessageKey) : undefined;
  }

  return (
    <form className="card-form" onSubmit={handleSubmit} noValidate>
      <p className="identifier-notice">{t("identifierNotice")}</p>

      <fieldset>
        <legend>{t("sectionReporter")}</legend>
        <Field label={t("fieldReporterType")} error={fieldError("reporterType")}>
          <select
            value={draft.reporterType}
            onChange={onText("reporterType")}
            aria-invalid={Boolean(errors.reporterType)}
          >
            <option value=""></option>
            {REPORTER_TYPES.map((type) => (
              <option key={type} value={type}>
                {t(reporterKeys[type])}
              </option>
            ))}
          </select>
        </Field>
      </fieldset>

      <fieldset>
        <legend>{t("sectionMedicine")}</legend>
        <p className="hint">{t("medicineHint")}</p>
        <Field label={t("fieldMedicineName")} error={fieldError("medicineName")}>
          <input
            value={draft.medicineName}
            onChange={onText("medicineName")}
            autoComplete="off"
            aria-invalid={Boolean(errors.medicineName)}
          />
        </Field>
        <Field label={t("fieldMedicineStrength")}>
          <input value={draft.medicineStrength} onChange={onText("medicineStrength")} autoComplete="off" />
        </Field>
        <Field label={t("fieldMedicineNotes")}>
          <input value={draft.medicineNotes} onChange={onText("medicineNotes")} autoComplete="off" />
        </Field>
        <Field label={t("fieldConcomitant")}>
          <textarea
            value={draft.concomitantMedicines}
            onChange={onText("concomitantMedicines")}
            rows={2}
          />
        </Field>
      </fieldset>

      <fieldset>
        <legend>{t("sectionReaction")}</legend>
        <p className="hint">{t("reactionHint")}</p>
        <Field label={t("fieldReaction")} error={fieldError("reaction")}>
          <textarea
            value={draft.reaction}
            onChange={onText("reaction")}
            rows={5}
            aria-invalid={Boolean(errors.reaction)}
          />
        </Field>
        <Field label={t("fieldStartDate")} error={fieldError("startedOn")}>
          <input
            type="date"
            value={draft.startedOn}
            onChange={onText("startedOn")}
            disabled={draft.startDateUnknown}
            aria-invalid={Boolean(errors.startedOn)}
          />
        </Field>
        <label className="check">
          <input
            type="checkbox"
            checked={draft.startDateUnknown}
            onChange={(event) => update("startDateUnknown", event.target.checked)}
          />
          <span>{t("dateUnknown")}</span>
        </label>
        <Field label={t("fieldStopDate")} error={fieldError("stoppedOn")}>
          <input
            type="date"
            value={draft.stoppedOn}
            onChange={onText("stoppedOn")}
            disabled={draft.stillOngoing}
            aria-invalid={Boolean(errors.stoppedOn)}
          />
        </Field>
        <label className="check">
          <input
            type="checkbox"
            checked={draft.stillOngoing}
            onChange={(event) => update("stillOngoing", event.target.checked)}
          />
          <span>{t("stillOngoing")}</span>
        </label>
      </fieldset>

      <fieldset>
        <legend>{t("sectionSeverity")}</legend>
        <p className="hint">{t("severityHint")}</p>
        <Field label={t("fieldSeverity")} error={fieldError("severity")}>
          <select
            value={draft.severity}
            onChange={onText("severity")}
            aria-invalid={Boolean(errors.severity)}
          >
            <option value=""></option>
            {SEVERITIES.map((severity) => (
              <option key={severity} value={severity}>
                {t(severityKeys[severity])}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t("fieldOutcome")}>
          <select value={draft.outcome} onChange={onText("outcome")}>
            <option value=""></option>
            {OUTCOMES.map((outcome) => (
              <option key={outcome} value={outcome}>
                {t(outcomeKeys[outcome])}
              </option>
            ))}
          </select>
        </Field>
      </fieldset>

      <section className="how-to">
        <h2>{t("howToTitle")}</h2>
        <p>{t("howToBody")}</p>
        <p>
          <a href={EPVC.eReportingUrl} target="_blank" rel="noreferrer">
            {t("officialReportLabel")}
          </a>
        </p>
      </section>

      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={handleSave}>
          {t("saveDraft")}
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => onChange(SAMPLE_DRAFT)}>
          {t("loadSample")}
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => {
            setErrors({});
            setSavedMessage(false);
            onClear();
          }}
        >
          {t("clearDraft")}
        </button>
        <button type="submit" className="btn btn-primary">
          {t("prepareDraft")}
        </button>
      </div>
      {savedMessage ? <p className="save-confirm">{t("draftSaved")}</p> : null}
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
      {error ? <span className="field-error">{error}</span> : null}
    </label>
  );
}
