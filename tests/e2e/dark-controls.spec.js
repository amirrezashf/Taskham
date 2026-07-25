const { test, expect } = require("@playwright/test")

test("keeps select controls and the Jalali picker readable in dark mode", async ({ page }) => {
  await page.goto("/index.html")
  const themes = ["ocean", "sunset", "forest", "berry", "noir", "gold", "lavender", "ice"]

  for (const theme of themes) {
    await page.evaluate((currentTheme) => {
      localStorage.clear()
      localStorage.setItem("taskham.appearance", "dark")
      localStorage.setItem("taskham.theme", currentTheme)
    }, theme)
    await page.reload()

    await expect(page.locator("html")).toHaveClass(/dark/)
    await expect(page.locator("#taskCategoryInput")).toHaveCSS("color-scheme", "dark")
    const selectOption = page.locator("#taskCategoryInput option").first()
    expect(await selectOption.evaluate((option) => getComputedStyle(option).backgroundColor)).not.toBe("rgb(255, 255, 255)")

    await page.locator("#taskDueInput").click()
    const picker = page.locator("jdp-container")
    await expect(picker).toBeVisible()
    await expect(picker).toHaveCSS("opacity", "1")
    expect(await picker.evaluate((node) => getComputedStyle(node).backgroundColor)).not.toBe("rgb(255, 255, 255)")
    expect(await picker.locator(".jdp-day").first().evaluate((day) => getComputedStyle(day).color)).not.toBe("rgb(51, 51, 51)")
    await page.keyboard.press("Escape")
  }
})
