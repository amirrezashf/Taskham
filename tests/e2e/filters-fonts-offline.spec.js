const { test, expect } = require("@playwright/test")
const { TaskPage, openTopbarAction } = require("../pages/task.page")

test("filters tasks by category, priority, and status while preserving font preferences", async ({ page }) => {
  const tasks = new TaskPage(page)
  await tasks.goto()
  await tasks.clearData()
  await expect(page.locator("html")).toHaveAttribute("data-font-family", "dana")
  await expect(page.locator("html")).toHaveAttribute("data-font-weight", "500")

  await tasks.openComposer()
  await page.locator("#taskPriorityInput").selectOption("high")
  await page.locator("#taskStatusInput").selectOption("review")
  await tasks.addTask({ title: "بازبینی کاری", category: "work" })
  await tasks.openComposer()
  await page.locator("#taskPriorityInput").selectOption("low")
  await page.locator("#taskStatusInput").selectOption("pending")
  await tasks.addTask({ title: "کار شخصی", category: "personal" })

  await page.locator("#taskCategoryFilter").selectOption("work")
  await page.locator("#taskPriorityFilter").selectOption("high")
  await page.locator("#taskStatusFilter").selectOption("review")
  await expect(page.locator(".task-item")).toHaveCount(1)
  await expect(page.locator(".task-item")).toContainText("بازبینی کاری")

  await page.locator("#taskCategoryFilter").selectOption("")
  await page.locator("#taskPriorityFilter").selectOption("")
  await page.locator("#taskStatusFilter").selectOption("")
  await page.getByRole("button", { name: "انتخاب همه" }).click()
  await page.locator("#bulkCategoryInput").selectOption("health")
  await page.locator("#bulkPriorityInput").selectOption("medium")
  await page.locator("#bulkStatusInput").selectOption("final")
  await page.getByRole("button", { name: "اعمال تغییرات" }).click()
  await expect(page.locator(".task-item")).toHaveCount(2)
  await expect(page.locator(".task-item").first()).toContainText("سلامت")
  await expect(page.locator(".task-item").first()).toContainText("متوسط")
  await expect(page.locator(".task-item").first()).toContainText("تکمیل نهایی")

  await openTopbarAction(page, "تنظیمات")
  await page.locator("#fontFamilyInput").selectOption("peyda")
  await page.locator("#fontWeightInput").selectOption("700")
  expect(await page.locator("#taskCategoryFilter").evaluate((select) => getComputedStyle(select).fontFamily.includes("Peyda"))).toBeTruthy()
  expect(await page.locator("#taskCategoryFilter").evaluate((select) => getComputedStyle(select).fontWeight)).toBe("700")
  await page.reload()

  await expect(page.locator("html")).toHaveAttribute("data-font-family", "peyda")
  await expect(page.locator("html")).toHaveAttribute("data-font-weight", "700")
})

test.describe("offline app shell", () => {
  test.use({ serviceWorkers: "allow" })

  test("opens the cached app without a network connection after the first visit", async ({ page }) => {
    await page.goto("/index.html")
    await page.evaluate(() => navigator.serviceWorker.ready)
    await page.reload()
    await page.context().setOffline(true)
    await page.reload()

    await expect(page.locator("h1")).toHaveText("تسک هام")
    await expect(page.locator("[data-app-version]")).toHaveText("v2.2.0")
    await page.context().setOffline(false)
  })

  test("loads the Persian date picker from the runtime cache when offline", async ({ page }) => {
    const focusDateInput = async () => {
      const mobileComposer = page.getByRole("button", { name: "افزودن تسک جدید" })
      if (await mobileComposer.isVisible()) await mobileComposer.click()
      await page.locator("#taskDueInput").focus()
    }

    await page.goto("/index.html")
    await page.evaluate(() => navigator.serviceWorker.ready)
    await page.reload()
    await focusDateInput()
    await expect(page.locator("#jalaliDatepickerScript")).toBeAttached()
    await page.context().setOffline(true)
    await page.reload()
    await focusDateInput()
    await expect(page.locator("#jalaliDatepickerScript")).toBeAttached()
    await page.context().setOffline(false)
  })
})
