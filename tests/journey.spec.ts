import { expect, test } from "@playwright/test";

test("root redirects to Vietnamese journey", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/vi$/);
  await expect(page.getByRole("heading", { name: /MARCUS JOURNEY/i })).toBeVisible();
});

test("renders localized semantic portfolio", async ({ page }) => {
  await page.goto("/en");
  await expect(
    page.getByRole("heading", { name: "The journey, available without 3D." }),
  ).toBeVisible();
  await page.goto("/zh");
  await expect(page.getByRole("heading", { name: "无需3D，也能完整了解这段旅程。" })).toBeVisible();
});

test("CV center previews all three languages", async ({ page, isMobile }) => {
  test.skip(isMobile, "The compact header intentionally hides utility navigation");
  await page.goto("/vi");
  await page.getByRole("button", { name: "Tải CV", exact: true }).first().click();
  const dialog = page.getByRole("dialog", { name: "Hồ sơ năng lực" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("tab")).toHaveCount(3);
  await dialog.getByRole("tab", { name: /English/ }).click();
  await expect(dialog.locator("iframe")).toHaveAttribute("src", /marcus-tran-cv-en\.pdf/);
});
