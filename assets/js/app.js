const STORAGE_KEYS = {
  tasks: "taskham.tasks",
  history: "taskham.history",
  theme: "taskham.theme",
  appearance: "taskham.appearance",
  limit: "taskham.limit",
  fontSize: "taskham.fontsize",
  fontFamily: "taskham.fontfamily",
  fontWeight: "taskham.fontweight",
  language: "taskham.language",
  lock: "taskham.lock",
  lockSession: "taskham.lock.session",
  trash: "taskham.trash",
  accessibility: "taskham.accessibility"
}

const DEFAULT_LIMIT = 5
const MAX_LIMIT = 50
const HISTORY_PAGE_SIZE = 5
const LOCK_SESSION_MS = 10 * 60 * 1000
const MODAL_TRANSITION_MS = 360
const CATEGORIES = ["personal", "work", "study", "health", "other"]
const PRIORITIES = ["high", "medium", "low"]
const TASK_STATUSES = ["pending", "inProgress", "done", "review", "final"]
const FONT_SIZES = ["xs", "sm", "md", "lg", "xl"]
const FONT_FAMILIES = ["dana", "iransans", "peyda"]
const FONT_WEIGHTS = ["300", "500", "700"]
const LANGUAGES = {
  fa: {
    locale: "fa-IR", dir: "rtl", calendar: "persian", appName: "تسک هام", pageTitle: "تسک هام | مدیریت ساده کارهای روزانه", metaDescription: "تسک هام یک وب اپ سبک و مرتب برای ثبت، پیگیری و مدیریت ساده تسک های روزانه روی موبایل و دسکتاپ.",
    eyebrow: "نوشتن ساده و آسان", heroLabel: "امروز چه تسک هایی داری؟", installApp: "نصب روی دستگاه", activeTasks: "تسک فعال", remainingCapacity: "ظرفیت باقی‌مانده", newTask: "تسک جدید", taskTitleLabel: "عنوان تسک", taskTitlePlaceholder: "عنوان تسک...", taskNoteLabel: "توضیحات تکمیلی", taskNotePlaceholder: "توضیحات تکمیلی (اختیاری)", taskNoteOnlyPlaceholder: "توضیحات تکمیلی", addToTasks: "افزودن به تسک هام", tasksSection: "تسک هام", emptyTitle: "لیستت هنوز خالیه", emptyBody: "هر کاری که باید یادت بماند را از همین‌جا شروع کن.", editTask: "ویرایش تسک", save: "ذخیره", delete: "حذف", settings: "تنظیمات", appearance: "حالت نمایش", system: "سیستم", light: "روشن", dark: "تیره", taskLimit: "محدودیت تسک فعال", fontSize: "اندازه فونت", themes: "دیزاین‌ها", themeCount: "۸ حالت", historyTitle: "تاریخچه انجام‌شده‌ها", historyEmpty: "هنوز چیزی به تاریخچه اضافه نشده.", previous: "قبلی", next: "بعدی", clearHistory: "پاک‌کردن تاریخچه", complete: "تکمیل!", close: "بستن", switchLanguage: "Switch to English", language: "زبان", openMenu: "باز کردن منو", closeMenu: "بستن منو", completeTask: "تکمیل تسک", history: "تاریخچه", createdAt: "ایجاد", updatedAt: "آخرین ویرایش", completedAt: "تکمیل", deletedAt: "حذف", category: "دسته‌بندی", dueDate: "سررسید", noCategory: "بدون دسته‌بندی", personal: "شخصی", work: "کاری", study: "مطالعه", health: "سلامت", other: "سایر", searchTasks: "جستجو در تسک‌ها", searchPlaceholder: "جستجو در عنوان یا توضیحات...", clearSearch: "پاک کردن", noSearchResults: "تسکی با این جستجو پیدا نشد.", overdue: "عقب‌افتاده", due: "سررسید", pin: "پین کردن", unpin: "برداشتن پین", clearSelection: "لغو انتخاب", selected: (count) => `${toLocaleNumber(count)} انتخاب شده`, appLock: "قفل برنامه", lockDisabled: "غیرفعال", lockEnabled: "فعال", pinLabel: "پین ۴ تا ۱۲ رقمی", pinPlaceholder: "پین ۴ تا ۱۲ رقمی", savePin: "ثبت پین", disableLock: "غیرفعال کردن قفل", enableBiometric: "فعال‌سازی بیومتریک", unlockApp: "باز کردن تسک هام", unlockHint: "برای ادامه، پین خود را وارد کن.", unlock: "باز کردن", useBiometric: "استفاده از بیومتریک", pinSaved: "قفل با پین فعال شد.", pinInvalid: "پین باید بین ۴ تا ۱۲ رقم باشد.", pinIncorrect: "پین درست نیست.", lockDisabledStatus: "قفل برنامه غیرفعال شد.", biometricReady: "بیومتریک این دستگاه فعال شد.", biometricUnavailable: "بیومتریک در این مرورگر یا دستگاه در دسترس نیست.", biometricFailed: "تایید بیومتریک انجام نشد.", createdLine: (date) => `ایجاد: ${date}`, updatedLine: (date) => `آخرین ویرایش: ${date}`, completedLine: (date) => `تکمیل: ${date}`, deletedLine: (date) => `حذف: ${date}`, dueLine: (date) => `سررسید: ${date}`, status: (count, remaining) => `الان ${count} تسک فعال داری و ${remaining} جای خالی مانده.`, statusEmpty: "اول عنوان تسک را بنویس.", statusTooLong: "عنوان تسک نمی‌تواند بیشتر از ۵۰ کاراکتر باشد.", statusLimit: "اول یکی از کارهای فعلی را تمام کن یا محدودیت را بیشتر کن.", statusReady: "می‌تونی تا ۵۰ تسک فعال داشته باشی.", summary0: "وقتی چیزی را ثبت می‌کنی، خیالت از یادآوری‌اش راحت‌تر می‌شود.", summaryFew: "کار ها و تسک هایی که داری رو خیلی سریع و آسون و راحت لیست کن!", summaryFull: "لیستت کامل شده؛ حالا وقت انجام‌دادن و سبک‌کردن آن است.", summaryMany: "همه‌چیز جلوی چشمت هست؛ فقط یکی‌یکی پیش برو.", small: "خیلی کوچک", mediumSmall: "کوچک", medium: "معمولی", mediumLarge: "بزرگ", large: "خیلی بزرگ"
  },
  en: {
    locale: "en-US", dir: "ltr", calendar: "gregory", appName: "My Tasks", pageTitle: "My Tasks | Clean Daily Task Manager", metaDescription: "My Tasks is a clean installable web app for capturing, organizing, and tracking your daily work on mobile and desktop.",
    eyebrow: "Simple and easy writing", heroLabel: "What tasks do you have today?", installApp: "Install on device", activeTasks: "Active tasks", remainingCapacity: "Remaining slots", newTask: "New task", taskTitleLabel: "Task title", taskTitlePlaceholder: "Task title...", taskNoteLabel: "Extra details", taskNotePlaceholder: "Extra details (optional)", taskNoteOnlyPlaceholder: "Extra details", addToTasks: "Add to My Tasks", tasksSection: "My Tasks", emptyTitle: "Your list is still empty", emptyBody: "Start by adding anything you want to remember here.", editTask: "Edit task", save: "Save", delete: "Delete", settings: "Settings", appearance: "Appearance", system: "System", light: "Light", dark: "Dark", taskLimit: "Active task limit", fontSize: "Font size", themes: "Themes", themeCount: "8 styles", historyTitle: "Task history", historyEmpty: "No history yet.", previous: "Previous", next: "Next", clearHistory: "Clear history", complete: "Done!", close: "Close", switchLanguage: "تغییر به فارسی", language: "Language", openMenu: "Open menu", closeMenu: "Close menu", completeTask: "Complete task", history: "History", createdAt: "Created", updatedAt: "Last edited", completedAt: "Completed", deletedAt: "Deleted", category: "Category", dueDate: "Due date", noCategory: "No category", personal: "Personal", work: "Work", study: "Study", health: "Health", other: "Other", searchTasks: "Search tasks", searchPlaceholder: "Search titles or details...", clearSearch: "Clear", noSearchResults: "No tasks match your search.", overdue: "Overdue", due: "Due", pin: "Pin task", unpin: "Unpin task", clearSelection: "Clear selection", selected: (count) => `${toLocaleNumber(count)} selected`, appLock: "App lock", lockDisabled: "Off", lockEnabled: "On", pinLabel: "4 to 12 digit PIN", pinPlaceholder: "4 to 12 digit PIN", savePin: "Save PIN", disableLock: "Turn off lock", enableBiometric: "Enable biometrics", unlockApp: "Unlock My Tasks", unlockHint: "Enter your PIN to continue.", unlock: "Unlock", useBiometric: "Use biometrics", pinSaved: "PIN lock is enabled.", pinInvalid: "Your PIN must be 4 to 12 digits.", pinIncorrect: "That PIN is not correct.", lockDisabledStatus: "App lock was turned off.", biometricReady: "Biometrics are ready on this device.", biometricUnavailable: "Biometrics are not available in this browser or device.", biometricFailed: "Biometric verification was not completed.", createdLine: (date) => `Created: ${date}`, updatedLine: (date) => `Last edited: ${date}`, completedLine: (date) => `Completed: ${date}`, deletedLine: (date) => `Deleted: ${date}`, dueLine: (date) => `Due: ${date}`, status: (count, remaining) => `You have ${count} active tasks and ${remaining} slots left.`, statusEmpty: "Write the task title first.", statusTooLong: "A task title cannot be longer than 50 characters.", statusLimit: "Finish one of your current tasks or raise the limit first.", statusReady: "You can keep up to 50 active tasks.", summary0: "Once you write it down, it is easier to keep it in sight.", summaryFew: "List what you need quickly and keep moving with focus.", summaryFull: "Your list is full. Time to clear it one by one.", summaryMany: "Everything is in front of you now. Just keep going step by step.", small: "Very small", mediumSmall: "Small", medium: "Medium", mediumLarge: "Large", large: "Very large"
  }
}

Object.assign(LANGUAGES.fa, {
  noCategory: "دسته‌بندی را انتخاب کنید",
  categoryRequired: "دسته‌بندی را انتخاب کنید.",
  selectAll: "انتخاب همه",
  pinLabel: "پین ۴ رقمی",
  pinPlaceholder: "پین ۴ رقمی",
  pinInvalid: "پین باید دقیقا ۴ رقم باشد.",
  pinned: "پین‌شده",
  pageLabel: (current, total) => `صفحه ${current} از ${total}`,
  trash: "سطل زباله",
  trashEmpty: "سطل زباله خالی است.",
  deleteConfirmTitle: "انتقال به سطل زباله؟",
  deleteConfirmText: "بعدا می‌توانی تسک را بازیابی یا برای همیشه حذف کنی.",
  cancel: "انصراف",
  moveToTrash: "انتقال",
  restore: "بازیابی",
  deleteForever: "حذف دائمی",
  priority: "اولویت",
  priorityNone: "بدون اولویت",
  high: "بالا",
  medium: "متوسط",
  low: "کم",
  highContrast: "کنتراست بالا",
  filterTasks: "فیلتر تسک‌ها",
  filterCategory: "فیلتر دسته‌بندی",
  filterPriority: "فیلتر اولویت",
  filterStatus: "فیلتر وضعیت",
  allCategories: "همه دسته‌بندی‌ها",
  allPriorities: "همه اولویت‌ها",
  allStatuses: "همه وضعیت‌ها",
  fontFamily: "فونت",
  fontWeight: "ضخامت فونت",
  dana: "دانا",
  iransans: "ایران‌سنس",
  peyda: "پیدا",
  weight300: "نازک",
  weight400: "معمولی",
  weight500: "متوسط",
  weight600: "نیمه‌ضخیم",
  weight700: "ضخیم",
  bulkCategory: "دسته‌بندی جدید",
  bulkPriority: "اولویت جدید",
  bulkStatus: "وضعیت جدید",
  bulkPriorityNone: "حذف اولویت",
  applyBulkChanges: "اعمال تغییرات",
  bulkChangesRequired: "حداقل یک تغییر را انتخاب کنید.",
  bulkChangesSaved: "تغییرات برای تسک‌های انتخاب‌شده اعمال شد.",
  taskStatus: "وضعیت تسک",
  pending: "در انتظار انجام",
  inProgress: "در حال انجام",
  done: "انجام شده",
  review: "نیازمند بازبینی",
  final: "تکمیل نهایی",
  taskAdded: "تسک جدید با موفقیت اضافه شد.",
  taskSaved: "تغییرات تسک ذخیره شد.",
  taskCompleted: "تسک به تاریخچه انجام‌شده‌ها منتقل شد.",
  taskTrashed: "تسک به سطل زباله منتقل شد.",
  taskRestored: "تسک با موفقیت بازیابی شد.",
  languageLoading: "در حال تغییر زبان..."
  , inProgressTasks: "در حال انجام"
  , highPriorityTasks: "اولویت بالا"
  , emptyBody: "هر کاری که نمی‌خواهی از یادت برود را همین‌جا بنویس."
  , summary0: "هر چیزی که امروز باید انجام شود را همین‌جا بنویس و با خیال راحت جلو برو."
  , summaryFew: "تسک‌هایت را سریع و بی‌دردسر لیست کن تا تمرکزت روی انجامشان بماند."
  , summaryMany: "همه‌چیز جلوی چشمت است؛ یکی‌یکی جلو برو و کارها را جمع کن."
  , summaryFull: "لیست فعلی پر شده؛ یکی از کارها را ببند تا برای مورد بعدی جا باز شود."
  , statusEmpty: "اول عنوان تسک را بنویس تا بتوانی آن را اضافه کنی."
  , statusLimit: "فعلا به سقف تسک‌های فعال رسیده‌ای؛ یکی را تمام کن یا سقف را بیشتر کن."
  , statusReady: "تا ۵۰ تسک فعال را می‌توانی اینجا نگه داری."
})
Object.assign(LANGUAGES.en, {
  eyebrow: "Capture tasks. Keep your focus.",
  heroLabel: "What needs your attention today?",
  newTask: "Add a task",
  taskTitleLabel: "Task name",
  taskTitlePlaceholder: "What do you need to do?",
  taskNoteLabel: "Notes",
  taskNotePlaceholder: "Add context or details (optional)",
  taskNoteOnlyPlaceholder: "Add context or details",
  tasksSection: "Your tasks",
  emptyTitle: "Nothing on your list yet",
  emptyBody: "Add a task to give your day a clear starting point.",
  historyTitle: "Completed task history",
  noCategory: "Select a category",
  categoryRequired: "Select a category.",
  selectAll: "Select all",
  pinLabel: "4 digit PIN",
  pinPlaceholder: "4 digit PIN",
  pinInvalid: "Your PIN must be exactly 4 digits.",
  pinned: "Pinned",
  pageLabel: (current, total) => `Page ${current} of ${total}`,
  trash: "Trash",
  trashEmpty: "Your trash is empty.",
  deleteConfirmTitle: "Move this task to trash?",
  deleteConfirmText: "You can restore it later or delete it permanently.",
  cancel: "Cancel",
  moveToTrash: "Move to trash",
  restore: "Restore",
  deleteForever: "Delete forever",
  priority: "Priority",
  priorityNone: "No priority",
  high: "High",
  medium: "Medium",
  low: "Low",
  highContrast: "High contrast",
  filterTasks: "Task filters",
  filterCategory: "Filter category",
  filterPriority: "Filter priority",
  filterStatus: "Filter status",
  allCategories: "All categories",
  allPriorities: "All priorities",
  allStatuses: "All statuses",
  fontFamily: "Font family",
  fontWeight: "Font weight",
  dana: "Dana",
  iransans: "IRANSans",
  peyda: "Peyda",
  weight300: "Light",
  weight400: "Regular",
  weight500: "Medium",
  weight600: "Semi-bold",
  weight700: "Bold",
  bulkCategory: "New category",
  bulkPriority: "New priority",
  bulkStatus: "New status",
  bulkPriorityNone: "Clear priority",
  applyBulkChanges: "Apply changes",
  bulkChangesRequired: "Choose at least one change to apply.",
  bulkChangesSaved: "Changes were applied to the selected tasks.",
  taskStatus: "Task status",
  pending: "Pending",
  inProgress: "In progress",
  done: "Done",
  review: "Needs review",
  final: "Finalized",
  taskAdded: "Your new task was added.",
  taskSaved: "Your task changes were saved.",
  taskCompleted: "Task moved to completed history.",
  taskTrashed: "Task moved to trash.",
  taskRestored: "Task restored successfully.",
  languageLoading: "Changing language..."
  , inProgressTasks: "In progress"
  , highPriorityTasks: "High priority"
  , emptyBody: "Add anything you do not want to forget right here."
  , summary0: "Write down what needs your attention today, then take it one task at a time."
  , summaryFew: "List your tasks quickly and keep your focus on getting them done."
  , summaryMany: "Everything is in view now. Take them one by one and keep moving."
  , summaryFull: "Your active list is full. Finish one task to make room for the next."
  , statusEmpty: "Write a task title first, then add it to your list."
  , statusLimit: "You are at your active-task limit. Finish one or raise the limit to continue."
  , statusReady: "You can keep up to 50 active tasks here."
})

const THEMES = [
  { id: "ocean", colors: ["#0f766e", "#38bdf8", "#ecfeff"] }, { id: "sunset", colors: ["#f97316", "#fb7185", "#fff7ed"] }, { id: "forest", colors: ["#15803d", "#84cc16", "#f7fee7"] }, { id: "berry", colors: ["#be185d", "#3b82f6", "#fff1f2"] }, { id: "noir", colors: ["#0f172a", "#64748b", "#f8fafc"] }, { id: "gold", colors: ["#ca8a04", "#fde047", "#fffbeb"] }, { id: "lavender", colors: ["#7c3aed", "#06b6d4", "#f5f3ff"] }, { id: "ice", colors: ["#2563eb", "#22d3ee", "#eff6ff"] }
]

const state = {
  tasks: normalizeTasks(loadJSON(STORAGE_KEYS.tasks, [])), history: normalizeHistory(loadJSON(STORAGE_KEYS.history, [])), trash: normalizeTrash(loadJSON(STORAGE_KEYS.trash, [])), theme: localStorage.getItem(STORAGE_KEYS.theme) || THEMES[0].id, appearance: localStorage.getItem(STORAGE_KEYS.appearance) || "light", taskLimit: clampLimit(Number.parseInt(localStorage.getItem(STORAGE_KEYS.limit) || `${DEFAULT_LIMIT}`, 10), 1), fontSize: localStorage.getItem(STORAGE_KEYS.fontSize) || "md", fontFamily: validFontFamily(localStorage.getItem(STORAGE_KEYS.fontFamily)), fontWeight: validFontWeight(localStorage.getItem(STORAGE_KEYS.fontWeight)), language: localStorage.getItem(STORAGE_KEYS.language) || "fa", accessibility: normalizeAccessibility(loadJSON(STORAGE_KEYS.accessibility, {})), installPrompt: null, selectedTaskId: null, pendingDeleteIds: [], historyPage: 1, search: "", filters: { category: "", priority: "", status: "" }, selectedTaskIds: new Set(), lock: normalizeLock(loadJSON(STORAGE_KEYS.lock, {})), isLocked: false, isSwitchingLanguage: false, statusTimer: null, statusHideTimer: null
}

const elements = Object.fromEntries([
  "taskForm", "taskInput", "taskNoteInput", "taskCategoryInput", "taskPriorityInput", "taskStatusInput", "taskDueInput", "taskDueNative", "taskDueValue", "addTaskBtn", "charCounter", "statusMessage", "statusMessageText", "taskList", "emptyState", "activeCount", "remainingCount", "inProgressCount", "highPriorityCount", "todayMessage", "installBtn", "languageBtn", "languageLoader", "languageLoaderText", "settingsBtn", "historyBtn", "trashBtn", "mobileMenuBtn", "mobileMenuBackdrop", "topbarActions", "clearCompletedBtn", "detailModal", "detailForm", "detailInput", "detailNoteInput", "detailCategoryInput", "detailPriorityInput", "detailStatusInput", "detailDueInput", "detailDueNative", "detailDueValue", "detailDate", "deleteTaskBtn", "settingsModal", "historyModal", "trashModal", "trashList", "trashEmpty", "confirmModal", "confirmDeleteBtn", "cancelDeleteBtn", "appearanceModes", "themeGrid", "limitRange", "limitValue", "fontSizeRange", "fontSizeValue", "fontFamilyInput", "fontWeightInput", "highContrastToggle", "historyList", "historyEmpty", "historyPageLabel", "prevHistoryBtn", "nextHistoryBtn", "taskItemTemplate", "historyItemTemplate", "taskSearchInput", "taskCategoryFilter", "taskPriorityFilter", "taskStatusFilter", "clearSearchBtn", "selectAllBtn", "bulkBar", "bulkCategoryInput", "bulkPriorityInput", "bulkStatusInput", "applyBulkChangesBtn", "selectedCount", "bulkCompleteBtn", "bulkDeleteBtn", "clearSelectionBtn", "pinInput", "savePinBtn", "disableLockBtn", "lockStatus", "lockModal", "unlockPinInput", "unlockPinBtn", "unlockStatus"
].map((id) => [id, document.getElementById(id)]))

boot()

function boot() {
  saveTasks(); saveHistory(); saveTrash(); saveLock(); applyLanguage(); applyAppearance(); applyFontSize(); applyFontFamily(); applyFontWeight(); applyAccessibility(); renderCategoryOptions(); renderPriorityOptions(); renderStatusOptions(); renderFilterOptions(); renderBulkOptions(); renderFontPreferences(); renderThemeGrid(); renderAppearanceModes(); syncAccessibilityUI(); bindEvents(); bindZoomLock(); startJalaliDatepicker(); render(); registerPwa()
  if (state.lock.enabled && !hasActiveLockSession()) openLock()
}

function bindEvents() {
  elements.taskForm.addEventListener("submit", handleAddTask)
  elements.taskInput.addEventListener("input", updateCharCounter)
  ;[[elements.taskDueNative, elements.taskDueValue], [elements.detailDueNative, elements.detailDueValue]].forEach(([nativeInput, valueInput]) => nativeInput.addEventListener("change", () => { valueInput.value = nativeInput.value }))
  elements.taskSearchInput.addEventListener("input", handleSearch)
  ;[[elements.taskCategoryFilter, "category"], [elements.taskPriorityFilter, "priority"], [elements.taskStatusFilter, "status"]].forEach(([input, key]) => input.addEventListener("change", () => { state.filters[key] = input.value; renderTasks() }))
  elements.clearSearchBtn.addEventListener("click", clearSearch)
  elements.selectAllBtn.addEventListener("click", () => { getVisibleTasks().forEach((task) => state.selectedTaskIds.add(task.id)); renderTasks() })
  elements.languageBtn.addEventListener("click", toggleLanguage)
  elements.mobileMenuBtn.addEventListener("click", () => setMobileMenu(!elements.topbarActions.classList.contains("is-open")))
  elements.mobileMenuBackdrop.addEventListener("click", () => setMobileMenu(false))
  elements.topbarActions.addEventListener("click", (event) => { if (event.target.closest("button") && window.matchMedia("(max-width: 620px)").matches) setMobileMenu(false) })
  window.addEventListener("resize", () => { if (!window.matchMedia("(max-width: 620px)").matches) setMobileMenu(false) })
  elements.settingsBtn.addEventListener("click", () => openModal(elements.settingsModal))
  elements.historyBtn.addEventListener("click", () => { state.historyPage = 1; renderHistory(); openModal(elements.historyModal) })
  elements.trashBtn.addEventListener("click", () => { renderTrash(); openModal(elements.trashModal) })
  elements.installBtn.addEventListener("click", installApp)
  elements.detailForm.addEventListener("submit", handleSaveTask)
  elements.deleteTaskBtn.addEventListener("click", handleDeleteSelectedTask)
  elements.confirmDeleteBtn.addEventListener("click", confirmDelete)
  elements.cancelDeleteBtn.addEventListener("click", () => closeModal(elements.confirmModal))
  elements.clearCompletedBtn.addEventListener("click", clearHistory)
  elements.limitRange.addEventListener("input", handleLimitInput)
  elements.fontSizeRange.addEventListener("input", handleFontSizeInput)
  elements.fontFamilyInput.addEventListener("change", () => setFontFamily(elements.fontFamilyInput.value))
  elements.fontWeightInput.addEventListener("change", () => setFontWeight(elements.fontWeightInput.value))
  elements.highContrastToggle.addEventListener("change", () => setAccessibility(elements.highContrastToggle.checked))
  elements.prevHistoryBtn.addEventListener("click", () => changeHistoryPage(-1))
  elements.nextHistoryBtn.addEventListener("click", () => changeHistoryPage(1))
  elements.bulkCompleteBtn.addEventListener("click", () => runBulkAction("completed"))
  elements.applyBulkChangesBtn.addEventListener("click", applyBulkChanges)
  elements.bulkDeleteBtn.addEventListener("click", () => runBulkAction("deleted"))
  elements.clearSelectionBtn.addEventListener("click", () => { state.selectedTaskIds.clear(); renderTasks() })
  elements.savePinBtn.addEventListener("click", savePin)
  elements.disableLockBtn.addEventListener("click", disableLock)
  elements.unlockPinBtn.addEventListener("click", unlockWithPin)
  elements.unlockPinInput.addEventListener("keydown", (event) => { if (event.key === "Enter") unlockWithPin() })
  ;[elements.pinInput, elements.unlockPinInput].forEach((input) => input.addEventListener("input", () => {
    input.value = normalizePinDigits(input.value).slice(0, 4)
  }))
  document.querySelectorAll("[data-close]").forEach((node) => node.addEventListener("click", () => closeModal(document.getElementById(node.dataset.close))))
  document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); elements.taskInput.focus() }
    if (event.key === "Escape" && !state.isLocked) { setMobileMenu(false); [elements.detailModal, elements.settingsModal, elements.historyModal, elements.trashModal, elements.confirmModal].forEach(closeModal) }
  })
  elements.appearanceModes.addEventListener("click", (event) => { const button = event.target.closest("[data-mode]"); if (!button) return; state.appearance = button.dataset.mode; localStorage.setItem(STORAGE_KEYS.appearance, state.appearance); applyAppearance(); renderAppearanceModes() })
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => { if (state.appearance === "system") applyAppearance() })
  window.addEventListener("beforeinstallprompt", (event) => { event.preventDefault(); state.installPrompt = event; elements.installBtn.hidden = false })
  window.addEventListener("appinstalled", () => { state.installPrompt = null; elements.installBtn.hidden = true })
  window.addEventListener("pageshow", () => {
    if (state.lock.enabled && !state.isLocked && !hasActiveLockSession()) openLock()
  })
}

function handleAddTask(event) {
  event.preventDefault()
  const title = elements.taskInput.value.trim(); const note = elements.taskNoteInput.value.trim()
  if (!title) return setStatus(t().statusEmpty, "error")
  if (!validCategory(elements.taskCategoryInput.value)) return setStatus(t().categoryRequired, "error")
  if (state.tasks.length >= state.taskLimit) return setStatus(t().statusLimit, "error")
  state.tasks.unshift({ id: crypto.randomUUID(), title: title.slice(0, 50), note: note.slice(0, 500), category: validCategory(elements.taskCategoryInput.value), priority: validPriority(elements.taskPriorityInput.value), status: validTaskStatus(elements.taskStatusInput.value), dueAt: dateInputToTimestamp(elements.taskDueValue.value), pinned: false, createdAt: Date.now(), updatedAt: null })
  saveTasks(); elements.taskForm.reset(); elements.taskNoteInput.value = ""; elements.taskCategoryInput.value = ""; elements.taskPriorityInput.value = ""; elements.taskStatusInput.value = "pending"; elements.taskDueInput.value = ""; elements.taskDueNative.value = ""; elements.taskDueValue.value = ""; updateCharCounter(); render(); elements.taskInput.focus(); setStatus(t().taskAdded, "success")
}

function handleSaveTask(event) {
  event.preventDefault(); const task = getSelectedTask(); const title = elements.detailInput.value.trim(); if (!task || !title) return
  const category = validCategory(elements.detailCategoryInput.value)
  if (!category) return setStatus(t().categoryRequired, "error")
  task.title = title.slice(0, 50); task.note = elements.detailNoteInput.value.trim().slice(0, 500); task.category = category; task.priority = validPriority(elements.detailPriorityInput.value); task.status = validTaskStatus(elements.detailStatusInput.value); task.dueAt = dateInputToTimestamp(elements.detailDueValue.value); task.updatedAt = Date.now(); saveTasks(); render(); closeModal(elements.detailModal); setStatus(t().taskSaved, "success")
}

function render() { applyTheme(); renderTasks(); renderSummary(); renderHistory(); syncLimitUI(); syncFontSizeUI(); syncLockUI() }

function renderTasks() {
  const visibleTasks = getVisibleTasks(); elements.taskList.innerHTML = ""; elements.emptyState.hidden = visibleTasks.length > 0
  if (!visibleTasks.length && state.search) { elements.emptyState.querySelector("h4").textContent = t().noSearchResults; elements.emptyState.querySelector("p").textContent = "" } else { elements.emptyState.querySelector("h4").textContent = t().emptyTitle; elements.emptyState.querySelector("p").textContent = t().emptyBody }
  visibleTasks.forEach((task) => {
    const item = elements.taskItemTemplate.content.firstElementChild.cloneNode(true); const titleBtn = item.querySelector(".task-title-btn"); const select = item.querySelector(".task-select-input"); const pinBtn = item.querySelector(".pin-btn"); const checkBtn = item.querySelector(".check-btn"); const editBtn = item.querySelector(".edit-btn"); const deleteBtn = item.querySelector(".delete-btn")
    item.classList.toggle("is-pinned", task.pinned); item.classList.toggle("is-overdue", isOverdue(task)); item.dataset.priority = task.priority || "none"; item.dataset.status = task.status; titleBtn.textContent = task.title
    const tags = document.createElement("div"); tags.className = "task-tags"; tags.setAttribute("role", "list")
    if (task.pinned) tags.appendChild(makeTag("pinned-tag", t().pinned, "fa-thumbtack"))
    if (task.category) tags.appendChild(makeTag("category-tag", t()[task.category], "fa-tag"))
    if (task.priority) tags.appendChild(makeTag(`priority-tag priority-${task.priority}`, t()[task.priority], "fa-flag"))
    tags.appendChild(makeTag(`status-tag status-${task.status}`, t()[task.status], { pending: "fa-clock", inProgress: "fa-list-check", done: "fa-check", review: "fa-magnifying-glass", final: "fa-circle-check" }[task.status]))
    if (task.dueAt) tags.appendChild(makeTag(isOverdue(task) ? "overdue-tag" : "due-tag", `${isOverdue(task) ? t().overdue : t().due}: ${formatDate(task.dueAt)}`, isOverdue(task) ? "fa-circle-exclamation" : "fa-calendar"))
    if (tags.childElementCount) titleBtn.appendChild(tags)
    const meta = document.createElement("p"); meta.className = "task-meta"; const metaIcon = document.createElement("i"); metaIcon.className = "fa-solid fa-clock"; metaIcon.setAttribute("aria-hidden", "true"); meta.append(metaIcon, document.createTextNode(t().createdLine(formatDate(task.createdAt)))); titleBtn.appendChild(meta)
    if (task.note) { const note = document.createElement("p"); note.className = "task-note-preview"; note.textContent = task.note; titleBtn.appendChild(note) }
    select.checked = state.selectedTaskIds.has(task.id); select.setAttribute("aria-label", task.title); pinBtn.setAttribute("aria-label", task.pinned ? t().unpin : t().pin); pinBtn.classList.toggle("active", task.pinned); editBtn.setAttribute("aria-label", t().editTask); checkBtn.setAttribute("aria-label", t().completeTask); deleteBtn.setAttribute("aria-label", t().delete); checkBtn.querySelector("span").textContent = t().complete; deleteBtn.querySelector("span").textContent = t().delete
    select.addEventListener("change", () => { select.checked ? state.selectedTaskIds.add(task.id) : state.selectedTaskIds.delete(task.id); renderBulkBar() })
    pinBtn.addEventListener("click", () => { task.pinned = !task.pinned; task.updatedAt = Date.now(); saveTasks(); render() })
    editBtn.addEventListener("click", () => openTaskDetail(task.id)); checkBtn.addEventListener("click", () => archiveTask(task.id, "completed", item)); deleteBtn.addEventListener("click", () => archiveTask(task.id, "deleted", item)); elements.taskList.appendChild(item)
  })
  renderBulkBar()
}

function makeTag(className, text, iconName) { const tag = document.createElement("span"); tag.className = `task-tag ${className}`; tag.setAttribute("role", "listitem"); tag.title = text; if (iconName) { const icon = document.createElement("i"); icon.className = `fa-solid ${iconName}`; icon.setAttribute("aria-hidden", "true"); tag.appendChild(icon) } const label = document.createElement("span"); label.className = "task-tag-label"; label.textContent = text; tag.appendChild(label); return tag }
function getVisibleTasks() { const term = state.search.trim().toLocaleLowerCase(t().locale); const { category, priority, status } = state.filters; return [...state.tasks].filter((task) => (!term || `${task.title} ${task.note}`.toLocaleLowerCase(t().locale).includes(term)) && (!category || task.category === category) && (!priority || task.priority === priority) && (!status || task.status === status)).sort((a, b) => Number(b.pinned) - Number(a.pinned) || priorityRank(b.priority) - priorityRank(a.priority) || b.createdAt - a.createdAt) }
function isOverdue(task) { return Boolean(task.dueAt && task.dueAt < Date.now()) }
function renderBulkBar() { const count = state.selectedTaskIds.size; elements.bulkBar.hidden = count === 0; elements.selectedCount.textContent = t().selected(count) }
function handleSearch(event) { state.search = event.target.value; elements.clearSearchBtn.hidden = !state.search; renderTasks() }
function clearSearch() { state.search = ""; elements.taskSearchInput.value = ""; elements.clearSearchBtn.hidden = true; renderTasks(); elements.taskSearchInput.focus() }
function runBulkAction(action) { const ids = [...state.selectedTaskIds]; if (action === "deleted") return requestDelete(ids); ids.forEach((id) => archiveTask(id, action)); state.selectedTaskIds.clear() }
function applyBulkChanges() { const ids = [...state.selectedTaskIds]; const category = validCategory(elements.bulkCategoryInput.value); const priorityValue = elements.bulkPriorityInput.value; const status = TASK_STATUSES.includes(elements.bulkStatusInput.value) ? elements.bulkStatusInput.value : ""; if (!ids.length || (!category && !priorityValue && !status)) return setStatus(t().bulkChangesRequired, "error"); const now = Date.now(); state.tasks.forEach((task) => { if (!state.selectedTaskIds.has(task.id)) return; if (category) task.category = category; if (priorityValue) task.priority = priorityValue === "__clear__" ? "" : validPriority(priorityValue); if (status) task.status = status; task.updatedAt = now }); saveTasks(); state.selectedTaskIds.clear(); elements.bulkCategoryInput.value = ""; elements.bulkPriorityInput.value = ""; elements.bulkStatusInput.value = ""; render(); setStatus(t().bulkChangesSaved, "success") }

function renderSummary() { const remaining = Math.max(0, state.taskLimit - state.tasks.length); elements.activeCount.textContent = toLocaleNumber(state.tasks.length); elements.remainingCount.textContent = toLocaleNumber(remaining); elements.inProgressCount.textContent = toLocaleNumber(state.tasks.filter((task) => task.status === "inProgress").length); elements.highPriorityCount.textContent = toLocaleNumber(state.tasks.filter((task) => task.priority === "high").length); elements.todayMessage.textContent = state.tasks.length === 0 ? t().summary0 : remaining === 0 ? t().summaryFull : state.tasks.length <= 2 ? t().summaryFew : t().summaryMany }
function renderHistory() { const history = [...state.history].sort((a, b) => (b.completedAt || 0) - (a.completedAt || 0)); const totalPages = Math.max(1, Math.ceil(history.length / HISTORY_PAGE_SIZE)); state.historyPage = Math.min(state.historyPage, totalPages); const pageItems = history.slice((state.historyPage - 1) * HISTORY_PAGE_SIZE, state.historyPage * HISTORY_PAGE_SIZE); elements.historyList.innerHTML = ""; elements.historyEmpty.hidden = history.length > 0; pageItems.forEach((item) => { const node = elements.historyItemTemplate.content.firstElementChild.cloneNode(true); node.querySelector(".history-title").textContent = item.title; const lines = [t().createdLine(formatDate(item.createdAt))]; if (item.updatedAt) lines.push(t().updatedLine(formatDate(item.updatedAt))); lines.push(item.action === "deleted" ? t().deletedLine(formatDate(item.completedAt)) : t().completedLine(formatDate(item.completedAt))); node.querySelector(".history-date").innerHTML = lines.join("<br>"); elements.historyList.appendChild(node) }); elements.historyPageLabel.textContent = t().pageLabel(toLocaleNumber(state.historyPage), toLocaleNumber(totalPages)); elements.prevHistoryBtn.hidden = state.historyPage <= 1; elements.nextHistoryBtn.hidden = state.historyPage >= totalPages; elements.clearCompletedBtn.hidden = history.length === 0 }

function renderCategoryOptions() { [elements.taskCategoryInput, elements.detailCategoryInput].forEach((select) => { const current = select.value; select.innerHTML = `<option value="">${t().noCategory}</option>${CATEGORIES.map((category) => `<option value="${category}">${t()[category]}</option>`).join("")}`; select.value = validCategory(current) }) }
function renderPriorityOptions() { [elements.taskPriorityInput, elements.detailPriorityInput].forEach((select) => { const current = select.value; select.innerHTML = `<option value="">${t().priorityNone}</option>${PRIORITIES.map((priority) => `<option value="${priority}">${t()[priority]}</option>`).join("")}`; select.value = validPriority(current) }) }
function renderStatusOptions() { [elements.taskStatusInput, elements.detailStatusInput].forEach((select) => { const current = select.value; select.innerHTML = TASK_STATUSES.map((status) => `<option value="${status}">${t()[status]}</option>`).join(""); select.value = validTaskStatus(current) }) }
function renderBulkOptions() { elements.bulkCategoryInput.innerHTML = `<option value="">${t().bulkCategory}</option>${CATEGORIES.map((item) => `<option value="${item}">${t()[item]}</option>`).join("")}`; elements.bulkPriorityInput.innerHTML = `<option value="">${t().bulkPriority}</option><option value="__clear__">${t().bulkPriorityNone}</option>${PRIORITIES.map((item) => `<option value="${item}">${t()[item]}</option>`).join("")}`; elements.bulkStatusInput.innerHTML = `<option value="">${t().bulkStatus}</option>${TASK_STATUSES.map((item) => `<option value="${item}">${t()[item]}</option>`).join("")}` }
function renderFilterOptions() { const { category, priority, status } = state.filters; elements.taskCategoryFilter.innerHTML = `<option value="">${t().allCategories}</option>${CATEGORIES.map((item) => `<option value="${item}">${t()[item]}</option>`).join("")}`; elements.taskPriorityFilter.innerHTML = `<option value="">${t().allPriorities}</option>${PRIORITIES.map((item) => `<option value="${item}">${t()[item]}</option>`).join("")}`; elements.taskStatusFilter.innerHTML = `<option value="">${t().allStatuses}</option>${TASK_STATUSES.map((item) => `<option value="${item}">${t()[item]}</option>`).join("")}`; elements.taskCategoryFilter.value = category; elements.taskPriorityFilter.value = priority; elements.taskStatusFilter.value = status }
function renderFontPreferences() { elements.fontFamilyInput.innerHTML = FONT_FAMILIES.map((family) => `<option value="${family}">${t()[family]}</option>`).join(""); elements.fontWeightInput.innerHTML = FONT_WEIGHTS.map((weight) => `<option value="${weight}">${t()[`weight${weight}`]}</option>`).join(""); elements.fontFamilyInput.value = state.fontFamily; elements.fontWeightInput.value = state.fontWeight }
function renderThemeGrid() { elements.themeGrid.innerHTML = ""; THEMES.forEach((theme) => { const button = document.createElement("button"); button.type = "button"; button.className = "theme-card"; button.dataset.theme = theme.id; button.innerHTML = `<div class="theme-card-head"><strong class="theme-name">${themeLabel(theme.id)}</strong><i class="fa-solid fa-palette"></i></div><div class="theme-swatches">${theme.colors.map((color) => `<span style="background:${color}"></span>`).join("")}</div>`; button.addEventListener("click", () => { state.theme = theme.id; localStorage.setItem(STORAGE_KEYS.theme, state.theme); applyTheme(); renderThemeGrid() }); button.classList.toggle("active", state.theme === theme.id); elements.themeGrid.appendChild(button) }) }
function renderAppearanceModes() { elements.appearanceModes.querySelectorAll("[data-mode]").forEach((button) => button.classList.toggle("active", button.dataset.mode === state.appearance)) }
function applyTheme() { document.documentElement.dataset.theme = state.theme }
function applyAppearance() { document.documentElement.classList.toggle("dark", state.appearance === "dark" || (state.appearance === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) }
function applyAccessibility() { document.documentElement.dataset.contrast = state.accessibility.highContrast ? "high" : "normal" }
function applyFontFamily() { document.documentElement.dataset.fontFamily = state.fontFamily }
function applyFontWeight() { document.documentElement.dataset.fontWeight = state.fontWeight }
function syncAccessibilityUI() { elements.highContrastToggle.checked = state.accessibility.highContrast }
function setAccessibility(enabled) { state.accessibility.highContrast = Boolean(enabled); localStorage.setItem(STORAGE_KEYS.accessibility, JSON.stringify(state.accessibility)); applyAccessibility(); syncAccessibilityUI() }
function applyLanguage() { state.language = LANGUAGES[state.language] ? state.language : "fa"; const strings = t(); document.documentElement.lang = state.language; document.documentElement.dir = strings.dir; document.documentElement.dataset.language = state.language; document.title = strings.pageTitle; document.querySelector('meta[name="description"]')?.setAttribute("content", strings.metaDescription); document.querySelector('meta[name="apple-mobile-web-app-title"]')?.setAttribute("content", strings.appName); document.querySelectorAll("[data-i18n]").forEach((node) => { const value = strings[node.dataset.i18n]; if (typeof value === "string") node.textContent = value }); document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => { const value = strings[node.dataset.i18nPlaceholder]; if (value) node.placeholder = value }); document.querySelectorAll("[data-i18n-aria]").forEach((node) => { const value = strings[node.dataset.i18nAria]; if (value) node.setAttribute("aria-label", value) }); const isPersian = state.language === "fa"; document.querySelectorAll("[data-jdp]").forEach((input) => { input.hidden = !isPersian }); document.querySelectorAll("input[type=\"datetime-local\"]").forEach((input) => { input.hidden = isPersian }); syncDateControls() }
function applyFontSize() { document.documentElement.dataset.fontSize = state.fontSize }
function openTaskDetail(taskId) { const task = state.tasks.find((item) => item.id === taskId); if (!task) return; state.selectedTaskId = taskId; elements.detailInput.value = task.title; elements.detailNoteInput.value = task.note || ""; elements.detailCategoryInput.value = task.category || ""; elements.detailPriorityInput.value = task.priority || ""; elements.detailStatusInput.value = task.status; elements.detailDueValue.value = timestampToDateInput(task.dueAt); elements.detailDueInput.value = ""; syncDateControls(); const lines = [t().createdLine(formatDate(task.createdAt))]; if (task.updatedAt) lines.push(t().updatedLine(formatDate(task.updatedAt))); if (task.dueAt) lines.push(t().dueLine(formatDate(task.dueAt))); elements.detailDate.innerHTML = lines.join("<br>"); openModal(elements.detailModal); window.setTimeout(() => elements.detailInput.focus(), 60) }
function getSelectedTask() { return state.tasks.find((item) => item.id === state.selectedTaskId) }
function handleDeleteSelectedTask() { if (state.selectedTaskId) requestDelete([state.selectedTaskId]); closeModal(elements.detailModal) }
function requestDelete(taskIds) { const ids = [...new Set(taskIds)].filter((id) => state.tasks.some((task) => task.id === id)); if (!ids.length) return; state.pendingDeleteIds = ids; openModal(elements.confirmModal) }
function confirmDelete() { const ids = new Set(state.pendingDeleteIds); const removed = state.tasks.filter((task) => ids.has(task.id)); if (!removed.length) return closeModal(elements.confirmModal); const deletedAt = Date.now(); state.trash.unshift(...removed.map((task) => ({ ...task, deletedAt }))); state.tasks = state.tasks.filter((task) => !ids.has(task.id)); ids.forEach((id) => state.selectedTaskIds.delete(id)); state.pendingDeleteIds = []; saveTasks(); saveTrash(); closeModal(elements.confirmModal); render(); setStatus(t().taskTrashed, "success") }
function archiveTask(taskId, action, node) { const task = state.tasks.find((item) => item.id === taskId); if (!task) return; if (action === "deleted") return requestDelete([taskId]); if (node) node.classList.add("removing"); window.setTimeout(() => { state.history.unshift({ ...task, completedAt: Date.now(), action }); state.tasks = state.tasks.filter((item) => item.id !== taskId); state.selectedTaskIds.delete(taskId); saveTasks(); saveHistory(); render(); setStatus(t().taskCompleted, "success") }, node ? 180 : 0) }
function renderTrash() { elements.trashList.innerHTML = ""; elements.trashEmpty.hidden = state.trash.length > 0; state.trash.forEach((task) => { const item = document.createElement("li"); item.className = "history-item trash-item"; item.innerHTML = `<div><p class="history-title"></p><p class="history-date"></p></div><div class="trash-actions"><button class="soft-btn compact-btn restore-btn" type="button">${t().restore}</button><button class="ghost-btn compact-btn danger-btn permanent-btn" type="button">${t().deleteForever}</button></div>`; item.querySelector(".history-title").textContent = task.title; item.querySelector(".history-date").textContent = t().deletedLine(formatDate(task.deletedAt)); item.querySelector(".restore-btn").addEventListener("click", () => { const { deletedAt, ...restoredTask } = task; state.tasks.unshift(restoredTask); state.trash = state.trash.filter((entry) => entry.id !== task.id); saveTasks(); saveTrash(); renderTrash(); render(); setStatus(t().taskRestored, "success") }); item.querySelector(".permanent-btn").addEventListener("click", () => { if (!window.confirm(t().deleteForever + "?")) return; state.trash = state.trash.filter((entry) => entry.id !== task.id); saveTrash(); renderTrash() }); elements.trashList.appendChild(item) }) }
function clearHistory() { state.history = []; state.historyPage = 1; saveHistory(); renderHistory() }
function changeHistoryPage(delta) { state.historyPage += delta; renderHistory() }
function handleLimitInput(event) { const minimum = Math.max(1, state.tasks.length); state.taskLimit = clampLimit(Number.parseInt(event.target.value, 10), minimum); localStorage.setItem(STORAGE_KEYS.limit, `${state.taskLimit}`); syncLimitUI(); render() }
function handleFontSizeInput(event) { state.fontSize = FONT_SIZES[Number.parseInt(event.target.value, 10)] || "md"; localStorage.setItem(STORAGE_KEYS.fontSize, state.fontSize); applyFontSize(); syncFontSizeUI() }
function setFontFamily(value) { state.fontFamily = validFontFamily(value); localStorage.setItem(STORAGE_KEYS.fontFamily, state.fontFamily); applyFontFamily(); renderFontPreferences() }
function setFontWeight(value) { state.fontWeight = validFontWeight(value); localStorage.setItem(STORAGE_KEYS.fontWeight, state.fontWeight); applyFontWeight(); renderFontPreferences() }
function syncLimitUI() { const minimum = Math.max(1, state.tasks.length); elements.limitRange.min = `${minimum}`; elements.limitRange.value = `${Math.max(state.taskLimit, minimum)}`; elements.limitValue.textContent = toLocaleNumber(Math.max(state.taskLimit, minimum)) }
function syncFontSizeUI() { const labels = { xs: t().small, sm: t().mediumSmall, md: t().medium, lg: t().mediumLarge, xl: t().large }; elements.fontSizeRange.value = `${Math.max(0, FONT_SIZES.indexOf(state.fontSize))}`; elements.fontSizeValue.textContent = labels[state.fontSize] || t().medium }
function setStatus(message, kind = "info") { const icons = { info: "fa-circle-info", success: "fa-circle-check", error: "fa-circle-exclamation" }; window.clearTimeout(state.statusTimer); window.clearTimeout(state.statusHideTimer); elements.statusMessage.hidden = false; elements.statusMessage.className = `status-message is-${kind}`; elements.statusMessage.querySelector("i").className = `fa-solid ${icons[kind] || icons.info}`; elements.statusMessageText.textContent = message; requestAnimationFrame(() => { elements.statusMessage.classList.add("is-visible", "is-updated") }); state.statusTimer = window.setTimeout(hideStatus, 5000) }
function hideStatus() { elements.statusMessage.classList.remove("is-visible", "is-updated"); state.statusHideTimer = window.setTimeout(() => { elements.statusMessage.hidden = true }, 280) }
function updateCharCounter() { elements.charCounter.textContent = `${toLocaleNumber(elements.taskInput.value.length)} / ${toLocaleNumber(50)}` }

async function savePin() { const pin = elements.pinInput.value; if (!/^\d{4}$/.test(pin)) return setStatus(t().pinInvalid, "error"); state.lock = { enabled: true, pinHash: await hashText(pin) }; localStorage.removeItem(STORAGE_KEYS.lockSession); saveLock(); elements.pinInput.value = ""; syncLockUI(); setStatus(t().pinSaved, "success") }
function disableLock() { state.lock = { enabled: false, pinHash: null }; localStorage.removeItem(STORAGE_KEYS.lockSession); saveLock(); syncLockUI(); setStatus(t().lockDisabledStatus, "success") }
function syncLockUI() { elements.lockStatus.textContent = state.lock.enabled ? t().lockEnabled : t().lockDisabled; elements.disableLockBtn.hidden = !state.lock.enabled }
function openLock() { state.isLocked = true; elements.unlockPinInput.value = ""; elements.unlockStatus.textContent = ""; revealModal(elements.lockModal); window.setTimeout(() => elements.unlockPinInput.focus(), 60) }
async function unlockWithPin() { const pin = elements.unlockPinInput.value; if (await hashText(pin) !== state.lock.pinHash) { elements.unlockStatus.textContent = t().pinIncorrect; return } unlock() }
function unlock() { startLockSession(); state.isLocked = false; elements.unlockPinInput.value = ""; closeModal(elements.lockModal) }
function saveLock() { localStorage.setItem(STORAGE_KEYS.lock, JSON.stringify(state.lock)) }

function revealModal(element) { element.hidden = false; element.classList.remove("is-closing"); requestAnimationFrame(() => element.classList.add("is-open")); document.body.style.overflow = "hidden" }
function openModal(element) { if (!element || state.isLocked) return; revealModal(element) }
function closeModal(element) { if (!element || element.hidden || element.classList.contains("is-closing")) return; element.classList.remove("is-open"); element.classList.add("is-closing"); if (element === elements.detailModal) state.selectedTaskId = null; if (element === elements.confirmModal) state.pendingDeleteIds = []; window.setTimeout(() => { element.hidden = true; element.classList.remove("is-closing"); if ([elements.detailModal, elements.settingsModal, elements.historyModal, elements.trashModal, elements.confirmModal, elements.lockModal].every((modal) => modal.hidden) && !state.isLocked) document.body.style.overflow = "" }, MODAL_TRANSITION_MS) }
function setMobileMenu(open) {
  const isMobile = window.matchMedia("(max-width: 620px)").matches
  const shouldOpen = Boolean(open && isMobile)
  elements.topbarActions.classList.toggle("is-open", shouldOpen)
  elements.mobileMenuBtn.setAttribute("aria-expanded", `${shouldOpen}`)
  elements.mobileMenuBtn.setAttribute("aria-label", shouldOpen ? t().closeMenu : t().openMenu)
  elements.mobileMenuBackdrop.hidden = !shouldOpen
  elements.mobileMenuBackdrop.setAttribute("aria-hidden", `${!shouldOpen}`)
  if (shouldOpen) requestAnimationFrame(() => elements.mobileMenuBackdrop.classList.add("is-visible"))
  else elements.mobileMenuBackdrop.classList.remove("is-visible")
}
async function installApp() { if (!state.installPrompt) return; await state.installPrompt.prompt(); await state.installPrompt.userChoice; state.installPrompt = null; elements.installBtn.hidden = true }
function registerPwa() { if ((location.protocol === "https:" || ["127.0.0.1", "localhost"].includes(location.hostname)) && "serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js")) }
function bindZoomLock() { document.addEventListener("gesturestart", (event) => event.preventDefault(), { passive: false }); document.addEventListener("gesturechange", (event) => event.preventDefault(), { passive: false }); document.addEventListener("gestureend", (event) => event.preventDefault(), { passive: false }); window.addEventListener("wheel", (event) => { if (event.ctrlKey || event.metaKey) event.preventDefault() }, { passive: false }); document.addEventListener("keydown", (event) => { if ((event.ctrlKey || event.metaKey) && ["+", "-", "=", "_", "0"].includes(event.key)) event.preventDefault() }) }
function saveTasks() { localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(normalizeTasks(state.tasks))) }
function saveHistory() { localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(normalizeHistory(state.history))) }
function saveTrash() { localStorage.setItem(STORAGE_KEYS.trash, JSON.stringify(normalizeTrash(state.trash))) }
function loadJSON(key, fallback) { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback } catch { return fallback } }
function normalizeTasks(value) { return Array.isArray(value) ? value.map((item) => normalizeTask(item)).filter((item) => item.title) : [] }
function normalizeHistory(value) { return Array.isArray(value) ? value.map((item) => ({ ...normalizeTask(item), completedAt: validTimestamp(item?.completedAt) || Date.now(), action: item?.action === "deleted" ? "deleted" : "completed" })).filter((item) => item.title) : [] }
function normalizeTrash(value) { return Array.isArray(value) ? value.map((item) => ({ ...normalizeTask(item), deletedAt: validTimestamp(item?.deletedAt) || Date.now() })).filter((item) => item.title) : [] }
function normalizeTask(item) { return { id: typeof item?.id === "string" && item.id ? item.id : crypto.randomUUID(), title: typeof item?.title === "string" ? item.title.trim().slice(0, 50) : "", note: typeof item?.note === "string" ? item.note.trim().slice(0, 500) : "", category: validCategory(item?.category), priority: validPriority(item?.priority), status: validTaskStatus(item?.status), dueAt: validTimestamp(item?.dueAt), pinned: Boolean(item?.pinned), createdAt: validTimestamp(item?.createdAt) || Date.now(), updatedAt: validTimestamp(item?.updatedAt) } }
function normalizeAccessibility(value) { return { highContrast: Boolean(value?.highContrast) } }
function normalizeLock(lock) { return { enabled: Boolean(lock?.enabled && typeof lock?.pinHash === "string"), pinHash: typeof lock?.pinHash === "string" ? lock.pinHash : null } }
function hasActiveLockSession() { const expiresAt = Number(localStorage.getItem(STORAGE_KEYS.lockSession)); if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) { localStorage.removeItem(STORAGE_KEYS.lockSession); return false } return true }
function startLockSession() { localStorage.setItem(STORAGE_KEYS.lockSession, `${Date.now() + LOCK_SESSION_MS}`) }
function validCategory(value) { return CATEGORIES.includes(value) ? value : "" }
function validPriority(value) { return PRIORITIES.includes(value) ? value : "" }
function validTaskStatus(value) { return TASK_STATUSES.includes(value) ? value : "pending" }
function validFontFamily(value) { return FONT_FAMILIES.includes(value) ? value : "dana" }
function validFontWeight(value) { return FONT_WEIGHTS.includes(value) ? value : "500" }
function priorityRank(value) { return ({ high: 3, medium: 2, low: 1 })[value] || 0 }
function validTimestamp(value) { const number = Number(value); return Number.isFinite(number) && number > 0 ? number : null }
function clampLimit(value, minimum) { return Math.min(MAX_LIMIT, Math.max(minimum, Number.isFinite(value) ? value : DEFAULT_LIMIT)) }
function dateInputToTimestamp(value) { const time = new Date(value).getTime(); return Number.isFinite(time) ? time : null }
function timestampToDateInput(timestamp) { if (!timestamp) return ""; const date = new Date(timestamp); const offset = date.getTimezoneOffset() * 60000; return new Date(date.getTime() - offset).toISOString().slice(0, 16) }
function formatDate(timestamp) { return new Intl.DateTimeFormat(t().locale, { calendar: t().calendar, year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(timestamp)) }
function toLocaleNumber(value) { return Number(value).toLocaleString(t().locale) }
function t() { return LANGUAGES[state.language] || LANGUAGES.fa }
async function toggleLanguage() { if (state.isSwitchingLanguage) return; state.isSwitchingLanguage = true; elements.languageBtn.disabled = true; elements.languageLoader.hidden = false; await wait(2000); state.language = state.language === "fa" ? "en" : "fa"; localStorage.setItem(STORAGE_KEYS.language, state.language); applyLanguage(); renderCategoryOptions(); renderPriorityOptions(); renderStatusOptions(); renderFilterOptions(); renderBulkOptions(); renderFontPreferences(); renderThemeGrid(); renderAppearanceModes(); syncAccessibilityUI(); render(); elements.languageLoader.hidden = true; elements.languageBtn.disabled = false; state.isSwitchingLanguage = false }
function startJalaliDatepicker() { if (window.jalaliDatepicker) window.jalaliDatepicker.startWatch({ time: true, hasSecond: false, targetValueInput: "attr", targetValueType: "attr" }) }
function syncDateControls() { [[elements.taskDueNative, elements.taskDueValue], [elements.detailDueNative, elements.detailDueValue]].forEach(([nativeInput, valueInput]) => { nativeInput.value = toNativeDateTimeValue(valueInput.value) }) }
function toNativeDateTimeValue(value) { const timestamp = dateInputToTimestamp(value); return timestamp ? timestampToDateInput(timestamp) : "" }
function wait(duration) { return new Promise((resolve) => window.setTimeout(resolve, duration)) }
function themeLabel(themeId) { const labels = { fa: { ocean: "ساحل", sunset: "مرجانی", forest: "خزه", berry: "انار", noir: "جوهر", gold: "کهربا", lavender: "مهتاب", ice: "یخچال" }, en: { ocean: "Coast", sunset: "Coral", forest: "Moss", berry: "Pomegranate", noir: "Ink", gold: "Amber", lavender: "Moonlight", ice: "Glacier" } }; return labels[state.language]?.[themeId] || themeId }
function normalizePinDigits(value) { return value.replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit))).replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit))).replace(/\D/g, "") }
async function hashText(value) { const bytes = new TextEncoder().encode(value); const hash = await crypto.subtle.digest("SHA-256", bytes); return bytesToBase64(new Uint8Array(hash)) }
function bytesToBase64(bytes) { let value = ""; bytes.forEach((byte) => { value += String.fromCharCode(byte) }); return btoa(value) }
