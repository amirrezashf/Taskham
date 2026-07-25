const { test, expect } = require("@playwright/test")

test("keeps desktop actions visible and moves them into an accessible sliding menu on mobile", async ({ page }, testInfo) => {
  await page.goto("/index.html")

  const menuButton = page.locator("#mobileMenuBtn")
  const settingsButton = page.locator("#settingsBtn")
  if (testInfo.project.name !== "mobile") {
    await expect(menuButton).toBeHidden()
    await expect(settingsButton).toBeVisible()
    return
  }

  await expect(menuButton).toBeVisible()
  await expect(menuButton).toHaveAccessibleName("باز کردن منو")
  await expect(settingsButton).toBeHidden()

  await menuButton.click()
  await expect(menuButton).toHaveAttribute("aria-expanded", "true")
  await expect(menuButton).toHaveAccessibleName("بستن منو")
  await expect(settingsButton).toBeVisible()

  await settingsButton.click()
  await expect(page.locator("#settingsModal")).toBeVisible()
  await expect(menuButton).toHaveAttribute("aria-expanded", "false")
})
