import { describe, expect, it } from "vitest";
import { EPVC } from "./epvc.ts";
import { buildReport } from "./report.ts";
import { SAMPLE_DRAFT } from "./sample.ts";
import { EMPTY_DRAFT } from "./types.ts";

describe("buildReport", () => {
  it("restates entered values without adding causal wording", () => {
    const report = buildReport(SAMPLE_DRAFT);
    const medicine = report.lines.find((line) => line.id === "medicine");
    const reaction = report.lines.find((line) => line.id === "reaction");

    expect(medicine?.valueEn).toBe(SAMPLE_DRAFT.medicineName);
    expect(medicine?.valueAr).toBe(SAMPLE_DRAFT.medicineName);
    expect(reaction?.valueEn).toBe(SAMPLE_DRAFT.reaction);
    expect(reaction?.valueAr).toBe(SAMPLE_DRAFT.reaction);

    const joined = [
      report.titleEn,
      report.titleAr,
      ...report.lines.flatMap((line) => [line.valueEn, line.valueAr]),
    ].join(" ");

    expect(joined.toLowerCase()).not.toMatch(/caused by|this confirms|diagnosis of|السبب المؤكد|تشخيص مؤكد/);
  });

  it("always includes the unofficial disclaimer and the verified EPVC URL", () => {
    const report = buildReport(SAMPLE_DRAFT);
    expect(report.officialUrl).toBe(EPVC.eReportingUrl);
    expect(report.officialNameEn).toBe(EPVC.englishName);
    expect(report.officialNameAr).toBe(EPVC.arabicName);
    expect(report.disclaimerEn.toLowerCase()).toContain("not a diagnosis");
    expect(report.disclaimerEn.toLowerCase()).toContain("not an official report");
    expect(report.disclaimerAr).toContain("ليست تشخيصًا");
    expect(report.disclaimerAr).toContain("ليست بلاغًا رسميًا");
    expect(report.stampEn).toMatch(/not an official report/i);
  });

  it("labels both languages and marks missing optional fields as not provided", () => {
    const report = buildReport({
      ...EMPTY_DRAFT,
      reporterType: "patient",
      medicineName: "Examplecillin",
      reaction: "Fictional rash",
      startDateUnknown: true,
      severity: "unknown",
    });

    const notes = report.lines.find((line) => line.id === "notes");
    expect(notes?.labelEn).toBeTruthy();
    expect(notes?.labelAr).toBeTruthy();
    expect(notes?.labelEn).not.toBe(notes?.labelAr);
    expect(notes?.valueEn).toBe("Not provided");
    expect(notes?.valueAr).toBe("غير مُدخل");

    const started = report.lines.find((line) => line.id === "started");
    expect(started?.valueEn).toBe("Start date unknown");
    expect(started?.valueAr).toBe("تاريخ البداية غير معروف");
  });
});
