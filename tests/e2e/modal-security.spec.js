const { test, expect } = require("@playwright/test")
const { TaskPage, openTopbarAction } = require("../pages/task.page")

test("removes biometric controls and migrates old lock data", async ({ page }) => {
  await page.goto("/index.html")
  await page.evaluate(() => {
    localStorage.clear()
    localStorage.setItem("taskham.lock", JSON.stringify({ enabled: true, pinHash: "hash", biometricId: "legacy-credential" }))
  })
  await page.reload()

  await expect(page.locator("#biometricBtn, #unlockBiometricBtn")).toHaveCount(0)
  await expect.poll(() => page.evaluate(() => localStorage.getItem("taskham.lock"))).not.toContain("biometricId")
})

test("animates modal opening and closing before hiding it", async ({ page }) => {
  await page.goto("/index.html")
  await page.evaluate(() => localStorage.clear())
  await page.reload()

  const modal = page.locator("#settingsModal")
  await openTopbarAction(page, "تنظیمات")
  await expect(modal).toHaveClass(/is-open/)
  await expect(modal.locator(".modal-panel")).toHaveCSS("opacity", "1")

  await modal.getByRole("button", { name: "بستن" }).click()
  await expect(modal).toHaveClass(/is-closing/)
  await expect(modal).toBeVisible()
  await expect(modal).toBeHidden({ timeout: 1000 })
})

test("uses compact task action controls", async ({ page }) => {
  const tasks = new TaskPage(page)
  await tasks.goto()
  await tasks.clearData()
  await tasks.addTask({ title: "اکشن فشرده", category: "work" })

  const action = page.getByRole("button", { name: "ویرایش تسک" })
  await expect(action).toHaveCSS("min-height", "38px")
  await expect(action).toHaveCSS("border-radius", "11px")
})
