# Taskham

Taskham is a bilingual, offline-first Progressive Web App (PWA) for managing
daily tasks. It supports Persian (RTL with Jalali dates) and English (LTR with
Gregorian dates), and keeps task data on the user's device.

## Features

- Create, edit, complete, pin, search, filter, and soft-delete tasks.
- Assign categories, priorities, statuses, notes, and due dates.
- Use Jalali dates in Persian and native Gregorian date inputs in English.
- Persist task data, history, preferences, and the optional local PIN lock in
  browser `localStorage`.
- Install as a PWA and use the cached application shell offline after the first
  successful visit.
- Switch between light, dark, and system appearance modes; choose from eight
  visual themes, font sizes, font weights, and high-contrast mode.
- Run end-to-end checks in desktop Chromium and a Pixel 5 mobile viewport.

## Technology

- Static HTML, CSS, and vanilla JavaScript.
- Service Worker and Web App Manifest for PWA support.
- Local Font Awesome Free subset for UI icons.
- `@majidh1/jalalidatepicker` for the Persian date picker.
- Playwright for end-to-end testing.

## Requirements

- Node.js 18 or newer, as required by Playwright.
- npm.
- Python 3 for the static development server configured in Playwright.

## Install and run

```bash
npm ci
npx playwright install chromium
python3 -m http.server 4173
```

Open `http://127.0.0.1:4173/index.html` in a browser. Serving through
`localhost` or HTTPS is required for Service Worker registration and PWA
installation.

## Test

```bash
npm run test:e2e
```

The Playwright configuration starts `python3 -m http.server 4173`
automatically while tests run.

## Build and production

There is no build step. Deploy the repository's static files to any web server
that serves HTTPS. The included `.htaccess` adds security, compression, and
cache headers for Apache-compatible hosting.

## Configuration and data

Taskham has no environment variables, backend service, or external API.
Application data and preferences remain in browser `localStorage` on the
current device. Clearing browser site data removes that local information.

## Project structure

```text
assets/                 Styles, icons, scripts, and third-party browser assets
tests/                  Playwright end-to-end tests
index.html              Application entry point
manifest.webmanifest    PWA metadata
sw.js                   Offline cache and Service Worker
.htaccess               Apache hosting headers
```

## Fonts

Proprietary local font packages are deliberately excluded from this public
repository. See [`assets/fonts/README.md`](assets/fonts/README.md) before
adding licensed fonts to a local deployment.

## Contributing

Issues and pull requests are welcome. Keep changes focused, preserve Persian
and English behavior, and run `npm run test:e2e` before opening a pull request.

## License

The Taskham source code is available under the [MIT License](LICENSE).
Third-party packages and assets remain subject to their own licenses.
