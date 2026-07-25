# تسک‌هام | Taskham

**تسک‌هام** یک وب‌اپلیکیشن نصب‌پذیر برای مدیریت کارهای روزانه است که با
فارسی و انگلیسی کار می‌کند. داده‌های تسک، تنظیمات و تاریخچه فقط روی مرورگر
و دستگاه کاربر نگه‌داری می‌شوند؛ این پروژه بک‌اند، حساب کاربری یا API خارجی
ندارد. 🧭

> رابط فارسی راست‌به‌چپ و تقویم جلالی دارد؛ رابط انگلیسی چپ‌به‌راست و از
> ورودی تاریخ میلادی مرورگر استفاده می‌کند.

## امکانات

- ساخت تسک با عنوان، توضیحات تکمیلی، دسته‌بندی الزامی، تاریخ سررسید، اولویت
  اختیاری و وضعیت انجام.
- ویرایش تسک و تغییر دسته‌بندی، اولویت، وضعیت، توضیحات و سررسید پس از ساخت.
- وضعیت‌های `در انتظار انجام`، `در حال انجام`، `انجام شده`، `نیازمند بازبینی`
  و `تکمیل نهایی`.
- پین‌کردن تسک‌ها؛ تسک‌های پین‌شده همیشه پیش از بقیه نمایش داده می‌شوند و
  بعد از آن اولویت بالاتر در رتبه بالاتر است.
- جست‌وجو در عنوان و توضیحات، فیلتر دسته‌بندی/اولویت/وضعیت، انتخاب همه و
  ویرایش یا حذف گروهی.
- تاریخچه تسک‌های تکمیل‌شده با زمان ایجاد، ویرایش و تکمیل؛ حذف نرم با امکان
  بازیابی از سطل زباله.
- نگه‌داری حداکثر ۵۰ تسک فعال، با شمارش تسک‌های در حال انجام و اولویت بالا.
- قفل محلی اختیاری با PIN دقیقاً چهاررقمی و نشست معتبر ۱۰ دقیقه‌ای.
- انتخاب زبان، حالت روشن/تیره/سیستم، هشت تم، پنج اندازه فونت، سه وزن فونت،
  خانواده فونت و حالت کنتراست بالا.
- نصب روی Chrome و دستگاه‌های سازگار با PWA و استفاده آفلاین از پوسته برنامه
  پس از اولین بازدید موفق. ✨

## فناوری‌ها

- HTML، CSS و JavaScript بدون فریم‌ورک.
- Web App Manifest و Service Worker برای قابلیت‌های PWA و cache آفلاین.
- [Font Awesome Free](https://fontawesome.com/) به‌صورت محلی برای آیکون‌ها.
- [`@majidh1/jalalidatepicker`](https://www.npmjs.com/package/@majidh1/jalalidatepicker)
  برای انتخاب تاریخ جلالی.
- [Playwright](https://playwright.dev/) برای تست end-to-end در Chromium دسکتاپ
  و نمای موبایل Pixel 5.

## پیش‌نیازها

- Node.js `18` یا جدیدتر.
- npm.
- Python 3 برای اجرای سرور استاتیک محلی که در تنظیمات Playwright استفاده شده
  است.

## اجرا در محیط توسعه

```bash
npm ci
npx playwright install chromium
python3 -m http.server 4173
```

سپس `http://127.0.0.1:4173/index.html` را در مرورگر باز کنید. ثبت Service
Worker و نصب PWA فقط روی `localhost` یا HTTPS در دسترس است.

## تست

```bash
npm run test:e2e
```

تنظیمات Playwright در زمان تست، `python3 -m http.server 4173` را خودکار اجرا
می‌کند و سناریوهای اصلی را در Chromium دسکتاپ و Pixel 5 بررسی می‌کند.

## انتشار و محیط Production

مرحله build وجود ندارد. فایل‌های استاتیک مخزن را روی یک وب‌سرور دارای HTTPS
منتشر کنید. فایل `.htaccess` موجود، headerهای امنیتی، فشرده‌سازی و cache را
برای میزبان‌های سازگار با Apache تنظیم می‌کند.

برای به‌روزرسانی Service Worker، نسخه cache در `sw.js` را همراه با تغییرات
مربوط به فایل‌های cache‌شده بررسی و به‌روزرسانی کنید.

## داده و حریم خصوصی

- متغیر محیطی، بک‌اند و API خارجی وجود ندارد.
- تسک‌ها، تاریخچه، سطل زباله، ترجیحات ظاهری و داده قفل محلی در `localStorage`
  مرورگر همان دستگاه ذخیره می‌شوند.
- پاک‌کردن site data مرورگر، این اطلاعات محلی را حذف می‌کند.
- این برنامه همگام‌سازی میان دستگاه‌ها یا پشتیبان‌گیری ابری ندارد.

## ساختار پروژه

```text
assets/
  css/                 استایل‌ها و تم‌ها
  icons/               آیکون برنامه و Font Awesome Free
  js/                  منطق برنامه، ترجمه‌ها و ذخیره‌سازی محلی
  vendor/              وابستگی‌های مرورگر، از جمله date picker جلالی
tests/
  e2e/                 سناریوهای Playwright
  pages/               helperهای صفحه تست
index.html             نقطه ورود برنامه
manifest.webmanifest   مشخصات نصب PWA
sw.js                  Service Worker و cache آفلاین
.htaccess              headerهای Apache برای deployment
```

## فونت‌ها و لایسنس‌ها

بسته‌های فونت محلی دارای لایسنس تجاری عمداً در این مخزن عمومی قرار نگرفته‌اند.
پیش از افزودن فونت لایسنس‌دار به deployment محلی، راهنمای
[`assets/fonts/README.md`](assets/fonts/README.md) را بخوانید. جزئیات مجوز
وابستگی‌ها و دارایی‌های شخص ثالث در
[`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) ثبت شده است. 📦

## مشارکت

مشارکت از طریق Issue و Pull Request استقبال می‌شود. لطفاً تغییرات را محدود و
قابل‌بررسی نگه دارید، رفتار هر دو زبان فارسی و انگلیسی را حفظ کنید و قبل از
ارسال Pull Request این دستور را اجرا کنید:

```bash
npm run test:e2e
```

## مجوز

کد منبع تسک‌هام تحت [MIT License](LICENSE) منتشر شده است. بسته‌ها و دارایی‌های
شخص ثالث تابع مجوزهای خودشان هستند.

---

## English Overview

**Taskham** is a bilingual, offline-first PWA for daily task management. It
supports Persian RTL with Jalali dates and English LTR with native Gregorian
date inputs. Tasks, settings, history, trash, and the optional local PIN lock
are stored only in the current browser's `localStorage`; there is no backend,
account system, or external API.

Key capabilities include task creation and editing, categories, optional
priorities, statuses, due dates, pinning, search, filters, bulk changes,
completed-task history, recoverable trash, visual preferences, and PWA
installation. Run `npm ci`, `npx playwright install chromium`, then
`npm run test:e2e` to validate the project. 🧪
