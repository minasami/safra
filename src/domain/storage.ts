import { EMPTY_DRAFT, type ReportDraft } from "./types.ts";

export const DRAFT_STORAGE_KEY = "safra.draft.v1";
export const LOCALE_STORAGE_KEY = "safra.locale.v1";

export function loadDraft(): ReportDraft {
  try {
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) return { ...EMPTY_DRAFT };
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return { ...EMPTY_DRAFT };
    return { ...EMPTY_DRAFT, ...(parsed as Partial<ReportDraft>) };
  } catch {
    return { ...EMPTY_DRAFT };
  }
}

export function saveDraft(draft: ReportDraft): void {
  localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
}

export function clearDraft(): void {
  localStorage.removeItem(DRAFT_STORAGE_KEY);
}

export function loadLocale(): "en" | "ar" {
  try {
    const value = localStorage.getItem(LOCALE_STORAGE_KEY);
    return value === "ar" ? "ar" : "en";
  } catch {
    return "en";
  }
}

export function saveLocale(locale: "en" | "ar"): void {
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
}
