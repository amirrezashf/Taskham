const { test, expect } = require("@playwright/test")

test("exposes essential SEO and browser-security metadata", async ({ page, request }) => {
  await page.goto("/index.html")

  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.+/)
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /index/)
  await expect(page.locator('meta[http-equiv="Content-Security-Policy"]')).toHaveAttribute("content", /default-src 'self'/)
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /.+/)

  const structuredData = await page.locator('script[type="application/ld+json"]').textContent()
  expect(JSON.parse(structuredData)).toMatchObject({ "@type": "WebApplication", applicationCategory: "ProductivityApplication" })

  const manifest = await request.get("/manifest.webmanifest")
  expect(manifest.ok()).toBeTruthy()
  await expect(manifest.json()).resolves.toMatchObject({ categories: ["productivity"], prefer_related_applications: false })

  const robots = await request.get("/robots.txt")
  expect(robots.ok()).toBeTruthy()
  await expect(robots.text()).resolves.toContain("User-agent: *")
})
