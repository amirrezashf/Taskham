const { test, expect } = require("@playwright/test")
const { TaskPage, openTopbarAction } = require("../pages/task.page")

test.describe("Trash and lock session", () => {
  let tasks

  test("moves a task to trash only after confirmation and restores it", async ({ page }) => {
    tasks = new TaskPage(page)
    await tasks.goto()
    await tasks.clearData()
    await tasks.addTask({ title: "بازیابی از سطل", category: "personal" })

    await page.getByRole("button", { name: "حذف" }).click()
    await expect(page.getByText("انتقال به سطل زباله؟")).toBeVisible()
    await expect(page.getByText("بازیابی از سطل")).toBeVisible()
    await page.getByRole("button", { name: "انتقال" }).click()
    await expect(page.getByText("لیستت هنوز خالیه")).toBeVisible()

    await openTopbarAction(page, "سطل زباله")
    await expect(page.getByText("بازیابی از سطل")).toBeVisible()
    await page.getByRole("button", { name: "بازیابی" }).click()
    await expect(page.getByText("سطل زباله خالی است.")).toBeVisible()
    await expect(page.getByText("بازیابی از سطل")).toBeVisible()
  })

  test("keeps an unlocked PIN session through a short reload", async ({ page }) => {
    tasks = new TaskPage(page)
    await tasks.goto()
    await tasks.clearData()

    await openTopbarAction(page, "تنظیمات")
    await page.locator("#pinInput").fill("1234")
    await page.getByRole("button", { name: "ثبت پین" }).click()
    await page.reload()
    await expect(page.getByRole("dialog", { name: "باز کردن تسک هام" })).toBeVisible()
    await page.locator("#unlockPinInput").fill("1234")
    await page.getByRole("button", { name: "باز کردن", exact: true }).click()

    await page.reload()
    await expect(page.getByRole("dialog", { name: "باز کردن تسک هام" })).toBeHidden()
  })
})
