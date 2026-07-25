# تسک‌هام | Taskham

**تسک‌هام** یک وب‌اپلیکیشن نصب‌پذیر و آفلاین‌محور برای مدیریت کارهای روزانه
است. برنامه به‌صورت کامل در مرورگر اجرا می‌شود و برای ثبت یا استفاده از تسک‌ها
نیازی به ساخت حساب کاربری، اتصال به GitHub، بک‌اند یا API خارجی ندارد. 🧭

- رابط فارسی: راست‌به‌چپ، تقویم جلالی و اعداد فارسی در محل‌های مناسب.
- رابط انگلیسی: چپ‌به‌راست و ورودی تاریخ میلادی سازگار با مرورگر.
- داده‌ها: فقط روی همان مرورگر و دستگاه، در `localStorage` نگه‌داری می‌شوند.

## فهرست مطالب

- [امکانات](#امکانات)
- [فناوری‌ها](#فناوریها)
- [پیش‌نیازها](#پیشنیازها)
- [نصب و اجرا](#نصب-و-اجرا)
- [تست](#تست)
- [انتشار](#انتشار)
- [داده، حریم خصوصی و امنیت](#داده-حریم-خصوصی-و-امنیت)
- [ساختار پروژه](#ساختار-پروژه)
- [فونت‌ها و مجوزها](#فونتها-و-مجوزها)
- [مشارکت](#مشارکت)

## امکانات

### مدیریت تسک

- ساخت تسک با عنوان حداکثر ۵۰ کاراکتر و توضیحات تکمیلی اختیاری تا ۵۰۰ کاراکتر.
- انتخاب اجباری دسته‌بندی و انتخاب اختیاری اولویت، وضعیت و تاریخ سررسید.
- ویرایش عنوان، توضیحات، دسته‌بندی، اولویت، وضعیت و سررسید پس از ایجاد تسک.
- وضعیت‌های `در انتظار انجام`، `در حال انجام`، `انجام شده`، `نیازمند بازبینی`
  و `تکمیل نهایی`.
- پین‌کردن تسک‌ها؛ تسک‌های پین‌شده همیشه بالاتر از تسک‌های دیگر قرار می‌گیرند
  و پس از آن، اولویت بالاتر در جایگاه بالاتر نمایش داده می‌شود.
- سقف قابل‌تنظیم تا ۵۰ تسک فعال و نمایش شمارنده‌های تسک فعال، در حال انجام و
  اولویت بالا.

### جست‌وجو و عملیات گروهی

- جست‌وجو در عنوان و توضیحات تسک.
- فیلتر مستقل بر اساس دسته‌بندی، اولویت و وضعیت.
- انتخاب یک یا همه تسک‌های قابل‌مشاهده.
- تغییر گروهی دسته‌بندی، اولویت یا وضعیت و حذف گروهی با تأیید کاربر.

### تاریخچه و حذف نرم

- ثبت زمان ایجاد، آخرین ویرایش و تکمیل تسک در تاریخچه.
- انتقال تسک حذف‌شده به سطل زباله به‌جای حذف فوری.
- بازیابی تسک از سطل زباله یا حذف دائمی آن با تأیید صریح کاربر.

### ظاهر، زبان و دسترس‌پذیری

- جابه‌جایی کامل بین فارسی و انگلیسی با چیدمان RTL/LTR مناسب هر زبان.
- انتخاب حالت روشن، تیره یا هماهنگ با سیستم.
- هشت تم بصری، پنج اندازه فونت، سه وزن فونت و انتخاب خانواده فونت.
- حالت کنتراست بالا برای خوانایی بهتر.
- کنترل‌های دارای نام قابل‌دسترسی، حالت focus مشخص و پشتیبانی از پیمایش
  صفحه‌کلید در اجزای اصلی.

### PWA و داده محلی

- نصب روی Chrome و مرورگرها و دستگاه‌های سازگار با PWA.
- cache پوسته برنامه با Service Worker و اجرای آفلاین پس از اولین بازدید موفق.
- قفل اختیاری با PIN دقیقاً چهاررقمی؛ پس از بازکردن، نشست محلی تا ۱۰ دقیقه
  معتبر می‌ماند. این قابلیت جایگزین قفل سیستم‌عامل یا راهکار امنیتی سازمانی
  نیست. ✨

## فناوری‌ها

- HTML، CSS و JavaScript بدون فریم‌ورک.
- Web App Manifest و Service Worker برای نصب‌پذیری و cache آفلاین.
- [Font Awesome Free](https://fontawesome.com/) به‌صورت محلی برای آیکون‌های
  رابط کاربری.
- [`@majidh1/jalalidatepicker`](https://www.npmjs.com/package/@majidh1/jalalidatepicker)
  برای date picker جلالی.
- [Playwright](https://playwright.dev/) برای تست end-to-end در Chromium دسکتاپ
  و نمای موبایل Pixel 5.

## پیش‌نیازها

- Node.js `18` یا جدیدتر.
- npm.
- Python 3 برای سرور استاتیک محلی مورد استفاده در تنظیمات Playwright.

## نصب و اجرا

```bash
git clone https://github.com/amirrezashf/Taskham.git
cd Taskham
npm ci
npx playwright install chromium
python3 -m http.server 4173
```

سپس `http://127.0.0.1:4173/index.html` را باز کنید. برای ثبت Service Worker
و نصب PWA، برنامه باید از `localhost` یا یک دامنه HTTPS باز شود.

### تنظیمات محیطی

این پروژه هیچ متغیر محیطی، فایل `.env`، سرویس بک‌اند یا API خارجی ندارد؛
بنابراین مرحله پیکربندی جداگانه‌ای لازم نیست.

## تست

```bash
npm run test:e2e
```

Playwright هنگام اجرای تست، `python3 -m http.server 4173` را خودکار اجرا
می‌کند. سناریوها در Chromium دسکتاپ و نمای Pixel 5 اجرا می‌شوند و رفتارهای
اصلی مانند تسک‌ها، تاریخ، تاریخچه، سطل زباله، قفل محلی، تنظیمات، PWA و کنترل‌های
موبایل را پوشش می‌دهند. 🧪

## انتشار

مرحله build وجود ندارد. تمام فایل‌های static مخزن را روی یک وب‌سرور منتشر کنید.
برای قابلیت نصب و Service Worker، محیط production باید HTTPS داشته باشد.

تنظیمات اختصاصی هاست، مانند headerهای امنیتی، cache و `robots.txt`، عمداً داخل
این مخزن نگه‌داری نمی‌شوند و باید متناسب با سرور یا پلتفرم deployment شما
تنظیم شوند. هنگام تغییر فایل‌های cache‌شده، نسخه cache در `sw.js` را نیز مرور
و به‌روزرسانی کنید تا کاربران نسخه جدید را دریافت کنند.

## داده، حریم خصوصی و امنیت

- تسک‌ها، تاریخچه، سطل زباله، تنظیمات، انتخاب زبان و داده قفل محلی در
  `localStorage` همان مرورگر ذخیره می‌شوند.
- پاک‌کردن site data مرورگر، این اطلاعات را حذف می‌کند.
- اطلاعات میان دستگاه‌ها همگام‌سازی یا روی سرور پشتیبان‌گیری نمی‌شوند.
- از ذخیره اطلاعات بسیار حساس در عنوان یا توضیحات تسک خودداری کنید.
- قفل PIN یک قابلیت محلی برای حریم خصوصی روزمره است، نه جایگزین امنیت دستگاه.

## ساختار پروژه

```text
assets/
  css/                 استایل‌ها، تم‌ها و طراحی واکنش‌گرا
  fonts/               راهنمای استفاده از فونت‌های محلی دارای مجوز
  icons/               آیکون برنامه و Font Awesome Free
  js/                  منطق برنامه، ترجمه‌ها و ذخیره‌سازی محلی
  vendor/              وابستگی‌های مرورگر، از جمله date picker جلالی
tests/
  e2e/                 سناریوهای Playwright
  pages/               helperهای مشترک تست
.github/workflows/     اجرای خودکار تست‌ها در GitHub Actions
index.html             نقطه ورود برنامه
manifest.webmanifest   metadata نصب PWA
sw.js                  Service Worker و cache آفلاین
```

## فونت‌ها و مجوزها

فونت‌های محلی دارای لایسنس تجاری عمداً در مخزن عمومی قرار نگرفته‌اند. پیش از
افزودن چنین فونتی به deployment خصوصی، راهنمای
[`assets/fonts/README.md`](assets/fonts/README.md) را بخوانید. جزئیات مجوز
وابستگی‌ها و دارایی‌های شخص ثالث در
[`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) آمده است. 📦

## مشارکت

Issue و Pull Request خوش‌آمد هستند. لطفاً تغییرات را کوچک و متمرکز نگه دارید،
رفتار هر دو زبان فارسی و انگلیسی را بررسی کنید و پیش از ارسال Pull Request
دستور زیر را اجرا کنید:

```bash
npm run test:e2e
```

## مجوز

کد منبع تسک‌هام تحت [MIT License](LICENSE) منتشر شده است. بسته‌ها و دارایی‌های
شخص ثالث تابع مجوزهای خودشان هستند.

---

# Taskham | English Documentation

**Taskham** is an installable, offline-first Progressive Web App for managing
daily tasks. It runs entirely in the browser: no account, GitHub connection,
backend, or external API is required to create and manage tasks.

- Persian interface: right-to-left layout, Jalali calendar, and appropriate
  Persian numerals.
- English interface: left-to-right layout and native browser Gregorian date
  input.
- Data: stored only in the current browser and device via `localStorage`.

## Contents

- [Features](#features)
- [Technology](#technology)
- [Requirements](#requirements)
- [Installation and local run](#installation-and-local-run)
- [Testing](#testing)
- [Deployment](#deployment)
- [Data, privacy, and security](#data-privacy-and-security)
- [Project structure](#project-structure)
- [Fonts and licenses](#fonts-and-licenses)
- [Contributing](#contributing)

## Features

### Task management

- Create tasks with a title of up to 50 characters and optional notes of up to
  500 characters.
- Require a category while keeping priority, status, and due date optional.
- Edit a task's title, notes, category, priority, status, and due date after
  it has been created.
- Track tasks as `Pending`, `In progress`, `Done`, `Needs review`, or
  `Finalized`.
- Pin tasks. Pinned tasks always appear first; remaining tasks are ordered by
  priority and then creation time.
- Keep a configurable limit of up to 50 active tasks and see active,
  in-progress, and high-priority counts.

### Search and bulk actions

- Search task titles and notes.
- Filter independently by category, priority, and status.
- Select individual visible tasks or select all visible tasks.
- Update category, priority, or status in bulk, or delete selected tasks after
  confirmation.

### History and soft deletion

- Record creation, last-edit, and completion timestamps in task history.
- Move deleted tasks to Trash rather than immediately removing them.
- Restore a trashed task or permanently remove it only after explicit
  confirmation.

### Appearance, language, and accessibility

- Switch completely between Persian and English with suitable RTL/LTR layouts.
- Choose light, dark, or system appearance.
- Choose from eight visual themes, five font sizes, three font weights, and
  supported font families.
- Use high-contrast mode for stronger readability.
- Use controls with accessible names, visible focus states, and keyboard
  navigation support in the main interactions.

### PWA and local data

- Install the app in Chrome and compatible browsers/devices.
- Cache the application shell with a Service Worker and use it offline after a
  successful first visit.
- Enable an optional, exactly four-digit local PIN. A successfully unlocked
  local session remains valid for 10 minutes. This is not a replacement for
  operating-system locks or organisational security controls.

## Technology

- Framework-free HTML, CSS, and JavaScript.
- Web App Manifest and Service Worker for installability and offline caching.
- A local [Font Awesome Free](https://fontawesome.com/) subset for UI icons.
- [`@majidh1/jalalidatepicker`](https://www.npmjs.com/package/@majidh1/jalalidatepicker)
  for the Jalali date picker.
- [Playwright](https://playwright.dev/) for end-to-end testing on desktop
  Chromium and a Pixel 5 mobile viewport.

## Requirements

- Node.js `18` or newer.
- npm.
- Python 3 for the static local server used by Playwright configuration.

## Installation and local run

```bash
git clone https://github.com/amirrezashf/Taskham.git
cd Taskham
npm ci
npx playwright install chromium
python3 -m http.server 4173
```

Open `http://127.0.0.1:4173/index.html`. Service Worker registration and PWA
installation require `localhost` or an HTTPS origin.

### Environment configuration

Taskham has no environment variables, `.env` file, backend service, or
external API. No separate configuration step is required.

## Testing

```bash
npm run test:e2e
```

During the test run, Playwright automatically starts
`python3 -m http.server 4173`. The suite runs in desktop Chromium and a Pixel 5
viewport and covers primary task workflows, dates, history, trash, local lock,
preferences, PWA behaviour, and mobile controls.

## Deployment

There is no build step. Deploy the repository's static files to a web server.
Production must use HTTPS for installability and Service Worker support.

Host-specific concerns, including security headers, cache policy, and
`robots.txt`, are intentionally excluded from this repository. Configure them
for the relevant server or deployment platform. When changing cached assets,
review and update the cache version in `sw.js` so users can receive the new
version.

## Data, privacy, and security

- Tasks, history, Trash, preferences, language choice, and local lock data are
  saved in the current browser's `localStorage`.
- Clearing browser site data removes this local information.
- Data is not synchronised across devices or backed up to a server.
- Avoid storing highly sensitive information in task titles or notes.
- The PIN lock supports everyday local privacy; it is not a substitute for
  device-level security.

## Project structure

```text
assets/
  css/                 Styles, themes, and responsive design
  fonts/               Guide for licensed local font usage
  icons/               App icons and Font Awesome Free assets
  js/                  App logic, translations, and local persistence
  vendor/              Browser dependencies, including Jalali date picker
tests/
  e2e/                 Playwright scenarios
  pages/               Shared test helpers
.github/workflows/     GitHub Actions test workflow
index.html             Application entry point
manifest.webmanifest   PWA installation metadata
sw.js                  Service Worker and offline cache
```

## Fonts and licenses

Commercially licensed local font packages are deliberately excluded from this
public repository. Read [`assets/fonts/README.md`](assets/fonts/README.md)
before adding such fonts to a private deployment. License notices for
third-party dependencies and assets are available in
[`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md).

## Contributing

Issues and pull requests are welcome. Keep changes small and focused, verify
both Persian and English behaviour, and run the following command before
opening a pull request:

```bash
npm run test:e2e
```

## License

Taskham source code is released under the [MIT License](LICENSE). Third-party
packages and assets remain subject to their own licenses.
