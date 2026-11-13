import { describe, expect, it } from "vitest";
import { messages } from "./messages.ts";

describe("i18n key parity", () => {
  it("keeps the same message keys in English and Arabic", () => {
    const enKeys = Object.keys(messages.en).sort();
    const arKeys = Object.keys(messages.ar).sort();
    expect(arKeys).toEqual(enKeys);
  });

  it("does not leave any message empty", () => {
    for (const locale of ["en", "ar"] as const) {
      for (const [key, value] of Object.entries(messages[locale])) {
        expect(value.trim(), `${locale}.${key}`).not.toBe("");
      }
    }
  });
});
