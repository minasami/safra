import { useState } from "react";
import { Disclaimer } from "./components/Disclaimer.tsx";
import { LanguageToggle } from "./components/LanguageToggle.tsx";
import { ReportForm } from "./components/ReportForm.tsx";
import { ReportPreview } from "./components/ReportPreview.tsx";
import { buildReport } from "./domain/report.ts";
import { clearDraft, loadDraft, saveDraft } from "./domain/storage.ts";
import { EMPTY_DRAFT, type ReportDraft } from "./domain/types.ts";
import { isDraftValid } from "./domain/validation.ts";
import { useLocale } from "./i18n/locale.tsx";

export default function App() {
  const { t } = useLocale();
  const [draft, setDraft] = useState<ReportDraft>(() =>
    typeof window === "undefined" ? { ...EMPTY_DRAFT } : loadDraft(),
  );
  const [previewOpen, setPreviewOpen] = useState(false);

  function handlePrepare() {
    if (isDraftValid(draft)) {
      setPreviewOpen(true);
    }
  }

  return (
    <div className="page">
      <header className="masthead no-print">
        <div className="brand">
          <p className="brand-kicker">Yellow Card · البطاقة الصفراء</p>
          <h1>{t("appMark")}</h1>
          <p className="tagline">{t("appSubtitle")}</p>
        </div>
        <LanguageToggle />
      </header>
      <Disclaimer />
      <main className="card">
        {previewOpen && isDraftValid(draft) ? (
          <ReportPreview report={buildReport(draft)} onBack={() => setPreviewOpen(false)} />
        ) : (
          <ReportForm
            draft={draft}
            onChange={(next) => {
              setPreviewOpen(false);
              setDraft(next);
            }}
            onSave={() => saveDraft(draft)}
            onClear={() => {
              clearDraft();
              setDraft({ ...EMPTY_DRAFT });
            }}
            onPrepare={handlePrepare}
          />
        )}
      </main>
      <footer className="site-foot no-print">{t("footerCredit")}</footer>
    </div>
  );
}
