const { test, expect } = require("@playwright/test")
const { TaskPage, openTopbarAction } = require("../pages/task.page")

test.describe("My Tasks core workflows", () => {
  let tasks

  test.beforeEach(async ({ page }) => {
    tasks = new TaskPage(page)
    await tasks.goto()
    await tasks.clearData()
  })

  test("saves category, due date and details after refresh", async ({ page }) => {
    await tasks.addTask({
      title: "ارسال گزارش",
      note: "نسخه نهایی برای تیم آماده شود",
      category: "work",
      dueDate: "2030-01-02T10:30"
    })

    const taskItem = page.locator(".task-item", { hasText: "ارسال گزارش" })
    await expect(taskItem).toContainText("کاری")
    await expect(taskItem).toContainText(/سررسید:/)
    await page.reload()
    await expect(page.getByText("ارسال گزارش")).toBeVisible()
    await expect(page.getByText("نسخه نهایی برای تیم آماده شود")).toBeVisible()
    await expect(page.locator(".task-item", { hasText: "ارسال گزارش" })).toContainText("کاری")
  })

  test("finds task content, pins task, and completes selected tasks", async ({ page }) => {
    await tasks.addTask({ title: "مطالعه طراحی", note: "مرور فصل سوم", category: "study" })
    await tasks.addTask({ title: "تماس با تیم", note: "هماهنگی جلسه", category: "work" })

    await tasks.search.fill("فصل سوم")
    await expect(page.getByText("مطالعه طراحی")).toBeVisible()
    await expect(page.locator(".task-item", { hasText: "تماس با تیم" })).toBeHidden()
    await page.getByRole("button", { name: "پاک کردن" }).click()

    await page.getByRole("button", { name: "پین کردن" }).first().click()
    await expect(page.locator(".task-item").first()).toHaveClass(/is-pinned/)

    await page.locator(".task-item", { hasText: "مطالعه طراحی" }).locator(".task-select").click()
    await page.locator(".task-item", { hasText: "تماس با تیم" }).locator(".task-select").click()
    await expect(page.getByText("۲ انتخاب شده")).toBeVisible()
    await page.getByRole("button", { name: "تکمیل!" }).first().click()
    await expect(page.getByText("لیستت هنوز خالیه")).toBeVisible()
    await openTopbarAction(page, "تاریخچه")
    await expect(page.getByText("مطالعه طراحی")).toBeVisible()
    await expect(page.getByText("تماس با تیم")).toBeVisible()
  })

  test("marks past due tasks and unlocks with a local PIN", async ({ page }) => {
    await tasks.addTask({ title: "کار عقب‌افتاده", category: "other", dueDate: "2000-01-01T09:00" })
    await expect(page.getByText("عقب‌افتاده")).toBeVisible()

    await openTopbarAction(page, "تنظیمات")
    await page.locator("#pinInput").fill("1234")
    await page.getByRole("button", { name: "ثبت پین" }).click()
    await expect(page.getByText("قفل با پین فعال شد.")).toBeVisible()
    await page.reload()
    await expect(page.getByRole("dialog", { name: "باز کردن تسک هام" })).toBeVisible()
    await page.locator("#unlockPinInput").fill("1234")
    await page.getByRole("button", { name: "باز کردن", exact: true }).click()
    await expect(page.getByRole("dialog", { name: "باز کردن تسک هام" })).toBeHidden()
    await expect(page.getByText("کار عقب‌افتاده")).toBeVisible()
  })

  test("requires a category and normalizes Persian PIN digits", async ({ page }) => {
    await tasks.openComposer()
    await tasks.title.fill("تسک بدون دسته")
    await tasks.addButton.click()
    await expect(page.getByText("دسته‌بندی را انتخاب کنید.")).toBeVisible()
    await expect(page.locator("#statusMessage")).toHaveClass(/is-error/)
    await expect(page.locator(".task-item")).toHaveCount(0)
    await page.keyboard.press("Escape")
    await expect(page.locator("#mobileTaskModal")).toBeHidden()

    await openTopbarAction(page, "تنظیمات")
    await page.locator("#pinInput").fill("۱۲۳۴۵")
    await expect(page.locator("#pinInput")).toHaveValue("1234")
    await page.getByRole("button", { name: "ثبت پین" }).click()
    await expect(page.getByText("قفل با پین فعال شد.")).toBeVisible()
    await page.getByRole("button", { name: "غیرفعال کردن قفل" }).click()
    await expect(page.getByText("قفل برنامه غیرفعال شد.")).toBeVisible()
  })

  test("selects every visible task", async ({ page }) => {
    await tasks.addTask({ title: "اول", category: "work" })
    await tasks.addTask({ title: "دوم", category: "study" })
    await page.getByRole("button", { name: "انتخاب همه" }).click()
    await expect(page.getByText("۲ انتخاب شده")).toBeVisible()
  })
})
