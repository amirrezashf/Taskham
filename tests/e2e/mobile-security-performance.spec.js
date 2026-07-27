const { test, expect } = require("@playwright/test")
const { TaskPage, openTaskComposer } = require("../pages/task.page")

test("defers Jalali assets, migrates removed themes, and preserves safe plain text", async ({ page }) => {
  const jalaliRequests = []
  page.on("request", (request) => {
    if (request.url().includes("jalalidatepicker")) jalaliRequests.push(request.url())
  })

  const tasks = new TaskPage(page)
  await tasks.goto()
  await tasks.clearData()

  expect(jalaliRequests).toEqual([])
  await expect(page.locator("#themeGrid .theme-card")).toHaveCount(6)
  await expect(page.locator('[data-theme="berry"], [data-theme="gold"]')).toHaveCount(0)

  await tasks.addTask({ title: "گزارش <test> عربی English Türkçe", category: "work" })
  await expect(page.locator(".task-item")).toContainText("گزارش <test> عربی English Türkçe")

  await openTaskComposer(page)
  await page.getByLabel("عنوان تسک").fill('<script>alert(1)</script>')
  await page.locator("#taskCategoryInput").selectOption("work")
  await page.getByRole("button", { name: "افزودن به تسک هام" }).click()
  await expect(page.locator("#statusMessage")).toHaveClass(/is-error/)
  await expect(page.locator("#statusMessage")).toContainText("محتوای ناامن")
  await expect(page.locator(".task-item")).toHaveCount(1)

  await page.evaluate(() => localStorage.setItem("taskham.theme", "berry"))
  await page.reload()
  await expect(page.locator("html")).toHaveAttribute("data-theme", "ocean")
  await expect.poll(() => page.evaluate(() => localStorage.getItem("taskham.theme"))).toBe("ocean")
})

test("uses a focused mobile task composer and a two-column metrics grid", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "This flow only applies to the compact mobile layout.")
  await page.goto("/index.html")
  await page.evaluate(() => localStorage.clear())
  await page.reload()

  const metrics = page.locator(".hero-metrics")
  await expect(page.locator("#mobileAddBtn")).toBeVisible()
  await expect.poll(() => page.locator("#mobileAddBtn").evaluate((node) => getComputedStyle(node).right)).not.toBe("auto")
  expect((await page.locator("#mobileAddBtn").boundingBox()).x).toBeGreaterThan(190)
  await expect(page.locator("#taskInputHome #taskInput")).toBeHidden()
  expect(await metrics.evaluate((node) => getComputedStyle(node).gridTemplateColumns.trim().split(" ").length)).toBe(2)

  await page.getByRole("button", { name: "افزودن تسک جدید" }).click()
  await expect(page.locator("#mobileTaskModal")).toBeVisible()
  await expect(page.locator("#mobileTaskPanel")).toHaveAttribute("role", "dialog")
  await expect(page.locator(".mobile-task-modal-head")).toHaveCSS("border-top-left-radius", "20px")
  await expect(page.locator("#taskInputCard")).toHaveCSS("border-bottom-left-radius", "20px")
  await expect(page.locator("#taskInput")).toBeFocused()
  expect(await page.locator("#appMain").evaluate((node) => node.inert)).toBeTruthy()

  await page.keyboard.press("Escape")
  await expect(page.locator("#mobileTaskModal")).toBeHidden()
  await expect(page.getByRole("button", { name: "افزودن تسک جدید" })).toBeFocused()

  await page.getByRole("button", { name: "افزودن تسک جدید" }).click()
  await page.getByLabel("عنوان تسک").fill("تسک موبایل")
  await page.locator("#taskCategoryInput").selectOption("personal")
  await page.getByRole("button", { name: "افزودن به تسک هام" }).click()
  await expect(page.locator("#mobileTaskModal")).toBeHidden()
  await expect(page.locator(".task-item", { hasText: "تسک موبایل" })).toBeVisible()
})

test("keeps mobile motion compact and respects reduced motion", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "This flow only applies to the compact mobile layout.")
  await page.emulateMedia({ reducedMotion: "reduce" })
  const tasks = new TaskPage(page)
  await tasks.goto()
  await tasks.clearData()
  await tasks.addTask({ title: "کنترل جمع‌وجور", category: "health" })

  await expect(page.locator(".task-actions .check-btn span")).toBeHidden()
  await expect(page.locator(".task-actions .check-btn")).toHaveCSS("min-height", "40px")
  await expect(page.locator(".task-tag").first()).toHaveCSS("min-height", "28px")
  await page.getByRole("button", { name: "افزودن تسک جدید" }).click()
  await expect.poll(() => page.locator("#mobileTaskPanel").evaluate((node) => {
    return Number.parseFloat(getComputedStyle(node).transitionDuration)
  })).toBeLessThanOrEqual(0.01)
})
