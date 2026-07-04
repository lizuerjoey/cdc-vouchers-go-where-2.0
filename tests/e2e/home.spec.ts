import { expect, test } from "@playwright/test";

test("filters merchant cards by cafe category", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Cafes" }).click();

  await expect(page.getByRole("heading", { name: /merchants found/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Kopi Lane Cafe" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Serangoon Lash Studio" })).not.toBeVisible();
});

test("chat panel returns grounded fallback without an API key", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Recommendation password").fill("cdc-vouchers");
  await page.getByLabel("Unlock recommendations").click();
  await page.getByPlaceholder("Ask for cafes, dinner, brows...").fill("lash lift in Serangoon");
  await page.getByLabel("Send recommendation request").click();

  await expect(page.getByText("Serangoon Lash Studio")).toBeVisible();
});
