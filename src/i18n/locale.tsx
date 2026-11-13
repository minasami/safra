import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { loadLocale, saveLocale } from "../domain/storage.ts";
import { messages, type Locale, type MessageKey } from "./messages.ts";

interface LocaleContextValue {
  locale: Locale;
  dir: "ltr" | "rtl";
  setLocale: (locale: Locale) => void;
  t: (key: MessageKey) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function applyDocumentLocale(locale: Locale): void {
  const dir = locale === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = locale === "ar" ? "ar" : "en";
  document.documentElement.dir = dir;
  document.title = messages[locale].appTitle;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() =>
    typeof window === "undefined" ? "en" : loadLocale(),
  );

  useEffect(() => {
    applyDocumentLocale(locale);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    saveLocale(next);
  }, []);

  const value = useMemo<LocaleContextValue>(() => {
    return {
      locale,
      dir: locale === "ar" ? "rtl" : "ltr",
      setLocale,
      t: (key: MessageKey) => messages[locale][key],
    };
  }, [locale, setLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
