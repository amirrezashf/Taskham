const { test, expect } = require("@playwright/test")
const { openTopbarAction } = require("../pages/task.page")

test("uses a native Gregorian date picker and saves its value in English", async ({ page }) => {
  await page.goto("/index.html")
  await page.evaluate(() => localStorage.clear())
  await page.reload()

  await openTopbarAction(page, "Switch to English")
  await expect(page.locator("#languageLoader")).toBeVisible()
  await expect(page.locator("html")).toHaveAttribute("lang", "en", { timeout: 3000 })
  await expect(page.locator("#languageLoader")).toBeHidden()
  const dueDate = page.locator("#taskDueNative")
  await expect(dueDate).toBeVisible()
  await expect(page.locator("#taskDueInput")).toBeHidden()
  await expect(dueDate).toHaveAttribute("type", "datetime-local")

  await page.getByLabel("Task name").fill("Send the proposal")
  await page.getByLabel("Category").first().selectOption("work")
  await dueDate.fill("2030-02-03T14:45")
  await page.getByRole("button", { name: "Add to My Tasks" }).click()

  await expect(page.locator(".task-item", { hasText: "Send the proposal" })).toContainText(/Due:/)
  await page.reload()
  await expect(page.locator(".task-item", { hasText: "Send the proposal" })).toContainText(/February 3, 2030/)

  await page.getByRole("button", { name: "Edit task" }).click()
  await expect(page.locator("#detailDueNative")).toHaveValue("2030-02-03T14:45")
})
