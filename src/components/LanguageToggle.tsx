import type { Locale } from "../i18n/messages.ts";
import { useLocale } from "../i18n/locale.tsx";

export function LanguageToggle() {
  const { locale, setLocale, t } = useLocale();

  const Button = ({ value, label }: { value: Locale; label: string }) => (
    <button
      type="button"
      className={locale === value ? "lang-btn is-active" : "lang-btn"}
      onClick={() => setLocale(value)}
      aria-pressed={locale === value}
    >
      {label}
    </button>
  );

  return (
    <div className="lang-toggle" role="group" aria-label={t("languageToggle")}>
      <Button value="en" label={t("switchToEnglish")} />
      <Button value="ar" label={t("switchToArabic")} />
    </div>
  );
}
