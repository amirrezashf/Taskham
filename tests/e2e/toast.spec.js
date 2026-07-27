const { test, expect } = require("@playwright/test")
const { openTaskComposer } = require("../pages/task.page")

test("shows validation feedback as a temporary bottom-right toast", async ({ page }) => {
  await page.goto("/index.html")
  await page.evaluate(() => localStorage.clear())
  await page.reload()
  await openTaskComposer(page)

  await page.getByRole("button", { name: "افزودن به تسک هام" }).click()
  const toast = page.locator("#statusMessage")
  await expect(toast).toBeVisible()
  await expect(toast).toHaveClass(/is-error/)
  await expect(toast).toHaveClass(/is-visible/)

  const box = await toast.boundingBox()
  const viewport = page.viewportSize()
  expect(box.x + box.width).toBeGreaterThan(viewport.width - 28)
  expect(box.y + box.height).toBeGreaterThan(viewport.height - 28)

  await expect(toast).toBeHidden({ timeout: 6000 })
})

test("shows a success toast after adding a task", async ({ page }) => {
  await page.goto("/index.html")
  await page.evaluate(() => localStorage.clear())
  await page.reload()
  await openTaskComposer(page)

  await page.locator("#taskInput").fill("پیام موفقیت")
  await page.locator("#taskCategoryInput").selectOption("personal")
  await page.getByRole("button", { name: "افزودن به تسک هام" }).click()

  const toast = page.locator("#statusMessage")
  await expect(toast).toBeVisible()
  await expect(toast).toHaveClass(/is-success/)
  await expect(toast).toHaveClass(/is-visible/)
})
