const { test, expect } = require("@playwright/test")
const { TaskPage, openTopbarAction } = require("../pages/task.page")

test("keeps pinned tasks above explicit priorities, persists status, and keeps only high contrast", async ({ page }) => {
  const tasks = new TaskPage(page)
  await tasks.goto()
  await tasks.clearData()

  await page.locator("#taskPriorityInput").selectOption("high")
  await page.locator("#taskStatusInput").selectOption("inProgress")
  await tasks.addTask({ title: "اولویت بالا", category: "work" })
  await page.locator("#taskPriorityInput").selectOption("low")
  await tasks.addTask({ title: "اولویت پایین", category: "study" })
  await tasks.addTask({ title: "تسک پین‌شده", category: "personal" })

  await page.getByRole("button", { name: "پین کردن" }).last().click()
  await expect(page.locator(".task-item").first()).toContainText("تسک پین‌شده")
  await expect(page.locator(".task-item").nth(1)).toContainText("اولویت بالا")
  await expect(page.locator(".task-item", { hasText: "اولویت پایین" })).toContainText("کم")
  await expect(page.locator(".task-item", { hasText: "اولویت بالا" })).toContainText("در حال انجام")

  await page.locator(".task-item", { hasText: "اولویت بالا" }).getByRole("button", { name: "ویرایش تسک" }).click()
  await page.locator("#detailStatusInput").selectOption("review")
  await page.getByRole("button", { name: "ذخیره" }).click()
  await expect(page.locator(".task-item", { hasText: "اولویت بالا" })).toContainText("نیازمند بازبینی")

  await openTopbarAction(page, "تنظیمات")
  await page.locator("#highContrastToggle").check()
  await expect(page.locator("#reduceMotionToggle")).toHaveCount(0)
  await expect(page.locator("#focusRingToggle")).toHaveCount(0)
  await expect(page.locator("#comfortableReadingToggle")).toHaveCount(0)
  await page.reload()

  await expect(page.locator("html")).toHaveAttribute("data-contrast", "high")
  await expect(page.locator(".task-item", { hasText: "اولویت بالا" })).toContainText("نیازمند بازبینی")
})
