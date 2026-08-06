// Service worker mínimo, sin Workbox — no hace falta ejectar create-react-app
// para esto. Estrategia "network-first": mientras haya conexión, todo sale
// siempre de la red (y se cachea de paso) — ningún visitante del sitio ve
// contenido viejo. Solo cuando el fetch de red falla (sin conexión) se cae
// al cache. Pensado para que /sorteo funcione offline en el dispositivo del
// evento, sin arriesgar contenido desactualizado en el resto de ditp.com.ar.
//
// Alcance: todo el origin (scope por defecto de un SW registrado en /), pero
// solo queda algo en cache si esa URL se visitó antes con conexión — no hay
// precache de rutas no visitadas.
const CACHE_NAME = "ditp-news-v1";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Solo GET, y solo mismo origen — no tocar llamadas a Sheets, GTM, fonts,
  // EmailJS, etc. Esas siempre van directo a la red, con o sin este SW.
  if (request.method !== "GET" || !request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          // waitUntil() a propósito: sin esto, el navegador puede matar el SW
          // apenas se resuelve la promesa de respondWith(), cortando el
          // guardado en cache a mitad de camino — iOS Safari es mucho más
          // agresivo terminando SWs que Chrome/Android, y eso se vio arrastrar
          // el propio fetch en curso (imagen rota solo en iPhone). El .catch
          // evita que un error acá (ej. cuota de storage llena) tire abajo la
          // respuesta real que ya se le está por devolver a la página.
          event.waitUntil(
            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(request, copy))
              .catch(() => {})
          );
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});
