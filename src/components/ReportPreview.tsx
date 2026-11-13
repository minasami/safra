import { EPVC } from "../domain/epvc.ts";
import type { ReportView } from "../domain/report.ts";
import { useLocale } from "../i18n/locale.tsx";

interface ReportPreviewProps {
  report: ReportView;
  onBack: () => void;
}

export function ReportPreview({ report, onBack }: ReportPreviewProps) {
  const { t } = useLocale();

  return (
    <div className="preview-wrap">
      <p className="preview-intro no-print">{t("previewIntro")}</p>
      <article className="print-card" aria-label={report.titleEn}>
        <header className="print-head">
          <p className="stamp">{report.stampEn}</p>
          <p className="stamp stamp-ar">{report.stampAr}</p>
          <h2>
            <span className="latin">{report.titleEn}</span>
            <span className="arabic">{report.titleAr}</span>
          </h2>
        </header>
        <dl className="print-lines">
          {report.lines.map((line) => (
            <div className="print-line" key={line.id}>
              <dt>
                <span className="latin">{line.labelEn}</span>
                <span className="arabic">{line.labelAr}</span>
              </dt>
              <dd>
                <span className="latin">{line.valueEn}</span>
                {line.valueEn !== line.valueAr ? (
                  <span className="arabic">{line.valueAr}</span>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
        <footer className="print-foot">
          <p>{report.disclaimerEn}</p>
          <p dir="rtl">{report.disclaimerAr}</p>
          <p>
            <a href={report.officialUrl} target="_blank" rel="noreferrer">
              {report.officialNameEn} — {report.officialUrl}
            </a>
          </p>
          <p dir="rtl">{report.officialNameAr}</p>
        </footer>
      </article>
      <div className="form-actions no-print">
        <button type="button" className="btn btn-ghost" onClick={onBack}>
          {t("backToForm")}
        </button>
        <button type="button" className="btn btn-primary" onClick={() => window.print()}>
          {t("printDraft")}
        </button>
      </div>
      <p className="fine-print no-print">
        {t("footerCredit")} {EPVC.email}
      </p>
    </div>
  );
}
