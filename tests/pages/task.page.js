const { expect } = require("@playwright/test")

class TaskPage {
  constructor(page) {
    this.page = page
    this.title = page.getByLabel("عنوان تسک")
    this.note = page.getByLabel("توضیحات تکمیلی")
    this.category = page.locator("#taskCategoryInput")
    this.dueDate = page.locator("#taskDueInput")
    this.addButton = page.getByRole("button", { name: "افزودن به تسک هام" })
    this.search = page.getByLabel("جستجو در تسک‌ها")
  }

  async goto() {
    await this.page.goto("/index.html")
  }

  async clearData() {
    await this.page.evaluate(() => localStorage.clear())
    await this.page.reload()
  }

  async openComposer() {
    const mobileAddButton = this.page.getByRole("button", { name: "افزودن تسک جدید" })
    if ((await mobileAddButton.isVisible()) && !(await this.page.locator("#mobileTaskModal").isVisible())) await mobileAddButton.click()
  }

  async addTask({ title, note = "", category = "", dueDate = "" }) {
    await this.openComposer()
    await this.title.fill(title)
    await this.note.fill(note)
    if (category) await this.category.selectOption(category)
    if (dueDate) {
      await this.page.locator("#taskDueValue").evaluate((input, value) => { input.value = value }, dueDate)
    }
    await this.addButton.click()
    if (await this.page.locator("#mobileTaskModal").isVisible()) {
      await expect(this.page.locator("#mobileTaskModal")).toBeHidden()
    }
  }
}

async function openTopbarAction(page, name) {
  const menuButton = page.locator("#mobileMenuBtn")
  if (await menuButton.isVisible()) await menuButton.click()
  await page.getByRole("button", { name }).click()
}

async function openTaskComposer(page, name = "افزودن تسک جدید") {
  const mobileAddButton = page.getByRole("button", { name })
  if (await mobileAddButton.isVisible()) await mobileAddButton.click()
}

module.exports = { TaskPage, openTopbarAction, openTaskComposer }
