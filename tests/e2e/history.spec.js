const { test, expect } = require("@playwright/test")
const { openTopbarAction } = require("../pages/task.page")

test("opens the task history modal", async ({ page }) => {
  const errors = []
  page.on("pageerror", (error) => errors.push(error.message))
  await page.goto("/index.html")
  await page.evaluate(() => localStorage.clear())
  await page.reload()
  await openTopbarAction(page, "تاریخچه")
  await expect(page.locator("#historyModal")).toBeVisible()
  await expect(page.getByRole("heading", { name: "تاریخچه انجام‌شده‌ها" })).toBeVisible()
  expect(errors).toEqual([])
})
