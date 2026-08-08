import { expect, test } from "@playwright/test";
import { getMilestones } from "../src/data/i18n";
import { languages } from "../src/data/locales";
import { milestones } from "../src/data/milestones";

test("every milestone has complete localized content", () => {
  for (const language of languages) {
    const localized = getMilestones(language);
    expect(localized).toHaveLength(milestones.length);
    expect(localized.map(({ id }) => id)).toEqual(milestones.map(({ id }) => id));
    for (const item of localized) {
      expect(item.role.trim()).not.toBe("");
      expect(item.summary.trim()).not.toBe("");
      expect(item.highlights).toHaveLength(4);
      expect(item.upgrade.trim()).not.toBe("");
    }
  }
});
