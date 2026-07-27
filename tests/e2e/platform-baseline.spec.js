const { test, expect } = require("@playwright/test")

test("exposes essential browser metadata", async ({ page, request }) => {
  await page.goto("/index.html")

  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.+/)
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /index/)
  await expect(page.locator('meta[http-equiv="Content-Security-Policy"]')).toHaveAttribute("content", /default-src 'self'/)
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /.+/)
  await expect(page.locator("[data-app-version]")).toHaveText("v2.2.0")
  await expect(page.locator('link[rel="icon"][type="image/svg+xml"]')).toHaveAttribute("href", /favicon\.svg/)
  await expect(page.locator(".brand-mark img")).toHaveAttribute("src", /logo-mark\.svg/)

  const structuredData = await page.locator('script[type="application/ld+json"]').textContent()
  expect(JSON.parse(structuredData)).toMatchObject({ "@type": "WebApplication", applicationCategory: "ProductivityApplication" })

  const manifest = await request.get("/manifest.webmanifest")
  expect(manifest.ok()).toBeTruthy()
  await expect(manifest.json()).resolves.toMatchObject({
    categories: ["productivity"],
    prefer_related_applications: false,
    theme_color: "#0f766e",
    icons: expect.arrayContaining([
      expect.objectContaining({ src: "./assets/icons/app/icon-192.png", sizes: "192x192", purpose: "any" }),
      expect.objectContaining({ src: "./assets/icons/app/icon-maskable-512.png", sizes: "512x512", purpose: "maskable" })
    ])
  })

  for (const path of ["/assets/icons/app/favicon.svg", "/assets/icons/app/favicon-16.png", "/assets/icons/app/logo-mark.svg", "/assets/icons/app/icon-maskable-512.png"]) {
    expect((await request.get(path)).ok()).toBeTruthy()
  }
})
