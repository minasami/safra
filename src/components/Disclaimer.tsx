import { EPVC } from "../domain/epvc.ts";
import { useLocale } from "../i18n/locale.tsx";

export function Disclaimer() {
  const { t } = useLocale();

  return (
    <aside className="disclaimer" role="note">
      <p>{t("disclaimerFull")}</p>
      <p className="disclaimer-links">
        <a href={EPVC.eReportingUrl} target="_blank" rel="noreferrer">
          {t("officialReportLabel")}
        </a>
        <span aria-hidden="true"> · </span>
        <a href={EPVC.portalUrl} target="_blank" rel="noreferrer">
          {t("officialPortalLabel")}
        </a>
        <span aria-hidden="true"> · </span>
        <a href={EPVC.edaUrl} target="_blank" rel="noreferrer">
          {t("officialEdaLabel")}
        </a>
        <span aria-hidden="true"> · </span>
        <span>
          {t("officialHotlineLabel")}: {EPVC.hotline}
        </span>
      </p>
    </aside>
  );
}
