const { test, expect } = require("@playwright/test")

test("loads licensed local font families when the deployment provides them", async ({ page, request }) => {
  const dana = await request.get("/assets/fonts/dana/dana-fanum-regular.woff2")
  test.skip(!dana.ok(), "Licensed font files are intentionally absent from public clones.")

  await page.goto("/index.html")
  const loaded = await page.evaluate(async () => {
    await Promise.all([
      document.fonts.load("500 16px Dana", "نمونه"),
      document.fonts.load("500 16px IRANSans", "نمونه"),
      document.fonts.load("500 16px Peyda", "نمونه")
    ])

    return ["Dana", "IRANSans", "Peyda"].every((family) => document.fonts.check(`500 16px ${family}`, "نمونه"))
  })

  expect(loaded).toBeTruthy()
})
