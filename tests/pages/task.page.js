class TaskPage {
  constructor(page) {
    this.page = page
    this.title = page.getByLabel("عنوان تسک")
    this.note = page.getByLabel("توضیحات تکمیلی")
    this.category = page.getByLabel("دسته‌بندی").first()
    this.dueDate = page.getByLabel("سررسید").first()
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

  async addTask({ title, note = "", category = "", dueDate = "" }) {
    await this.title.fill(title)
    await this.note.fill(note)
    if (category) await this.category.selectOption(category)
    if (dueDate) {
      await this.page.locator("#taskDueValue").evaluate((input, value) => { input.value = value }, dueDate)
    }
    await this.addButton.click()
  }
}

async function openTopbarAction(page, name) {
  const menuButton = page.locator("#mobileMenuBtn")
  if (await menuButton.isVisible()) await menuButton.click()
  await page.getByRole("button", { name }).click()
}

module.exports = { TaskPage, openTopbarAction }
