import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "content.spec.ts",
  reporter: "list",
});
