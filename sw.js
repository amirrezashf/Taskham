const CACHE_NAME = "taskham-v24"
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./sw.js",
  "./assets/css/style.css",
  "./assets/js/app.js",
  "./assets/vendor/jalalidatepicker/jalalidatepicker.min.js",
  "./assets/vendor/jalalidatepicker/jalalidatepicker.min.css",
  "./assets/icons/fontawesome/css/task-icons.css",
  "./assets/icons/fontawesome/webfonts/fa-regular-400.woff2",
  "./assets/icons/fontawesome/webfonts/fa-solid-900.woff2",
  "./assets/icons/app/icon.svg",
  "./assets/icons/app/icon-192.png",
  "./assets/icons/app/icon-512.png",
  "./assets/icons/app/favicon-32.png",
  "./assets/icons/app/apple-touch-icon.png"
]

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)))
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => key !== CACHE_NAME ? caches.delete(key) : null))
    )
  )
  self.clients.claim()
})

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached

      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== "basic") return response
          const copy = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy))
          return response
        })
        .catch(() => caches.match("./index.html"))
    })
  )
})
