const { test, expect } = require("@playwright/test")
const { TaskPage } = require("../pages/task.page")

test("renders accessible icon tags for the refreshed task card", async ({ page }) => {
  const tasks = new TaskPage(page)
  await tasks.goto()
  await tasks.clearData()

  await page.locator("#taskPriorityInput").selectOption("high")
  await page.locator("#taskStatusInput").selectOption("inProgress")
  await tasks.addTask({ title: "کارت بازطراحی‌شده", category: "work" })

  const item = page.locator(".task-item", { hasText: "کارت بازطراحی‌شده" })
  const tags = item.locator(".task-tags")
  await expect(tags).toHaveAttribute("role", "list")
  await expect(tags.getByRole("listitem")).toHaveCount(3)
  await expect(tags.locator(".category-tag .fa-tag")).toHaveCount(1)
  await expect(tags.locator(".priority-high .fa-flag")).toHaveCount(1)
  await expect(tags.locator(".status-inProgress .fa-list-check")).toHaveCount(1)
  await expect(item).toHaveAttribute("data-priority", "high")
  await expect(item.locator(".task-meta > .fa-clock")).toHaveCount(1)
  await expect(page.locator("#inProgressCount")).toHaveText("۱")
  await expect(page.locator("#highPriorityCount")).toHaveText("۱")

  await item.getByRole("button", { name: "پین کردن" }).click()
  await expect(item.locator(".pinned-tag")).toHaveText("پین‌شده")
  await expect(item.locator(".pinned-tag .fa-thumbtack")).toHaveCount(1)
})
