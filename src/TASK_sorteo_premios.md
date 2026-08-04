# Tarea: sorteador de premios para eventos presenciales (agosto 2026)

## Contexto

Un dispositivo (un solo celular/tablet, no varios en simultáneo) se usa en 4 jornadas de evento — 13, 14, 21 y 22 de agosto de 2026 — para sortear premios entre asistentes: tocan un botón, sale un mensaje de "sorteando", el sistema asigna al azar uno de los tipos de premio configurados y registra la entrega. Antes y después de cada jornada hay internet disponible; durante el evento en sí puede no haberla. Rama de trabajo: `feature/sorteo-premios`, desde `dev`.

Se integró como una ruta más de `ditpNews` (`ditp.com.ar`) en vez de un proyecto aparte porque el repo ya trae exactamente la pieza que hacía falta: el service account de Google Sheets que usa `/smart-link` para loguear escaneos (`api/_google-sheets-auth.js`).

## Qué se hizo

1. **Ruta `/sorteo`** — `src/data/cont.js` (entrada `sorteo` en `paths`) + `src/App.jsx`.
2. **`src/pages/Sorteo.jsx`** — mismo esquema que `SmartLink.jsx`: panel admin escondido detrás de `?admin=CLAVE`, pero acá la clave (`ADMIN_KEY`) está **hardcodeada en el archivo** en vez de env var — decisión de Claudio 2026-08-04: no es información sensible (solo evita que alguien tropiece con el panel sin querer, no protege datos reales), y una env var de CRA de todos modos termina horneada en texto plano en el bundle público — no había ninguna diferencia real de seguridad, solo un paso extra de configuración en Vercel. Para cambiar la clave: editar la constante `ADMIN_KEY` en `Sorteo.jsx` y redeployar.
   - **Vista pública (`/sorteo`)**: botón "Sortear" → 1.6s de animación → resultado. Deshabilitado si no queda stock de ningún premio.
   - **Vista admin (`/sorteo?admin=CLAVE`)**: definir tipos de premio + cantidad (agregar/quitar filas libremente, no está hardcodeado a 2), ver stock restante, botón "Reiniciar día" (repone el stock a la cantidad configurada — usar una vez al arrancar cada jornada), estado de sincronización (cuántos premios entregados quedan sin subir al Sheet) con botón **"Sincronizar datos"** para forzarla a demanda (2026-08-04, antes solo corría sola al montar/reconectar), y una sección **"Zona de peligro"** con botón **"Borrar todo"** que limpia config + stock + historial completo del dispositivo — confirmación nativa (`window.confirm`) que además avisa si hay premios sin sincronizar (se perderían para siempre). Distinto de "Reiniciar día": ese solo repone stock, nunca borra el historial.
   - **Actualización en tiempo real entre pestañas/dispositivos** (2026-08-04): listener del evento `storage` del navegador — si el admin está abierto en un dispositivo distinto (ej. laptop del organizador) mientras el sorteo corre en la tablet del evento, el stock y la cola se reflejan solos, sin recargar. El evento `storage` solo dispara en la pestaña que NO hizo el cambio, así que no hace falta lógica extra para la que sí lo hizo.
3. **Persistencia 100% local** (`localStorage`, claves `sorteo_config` / `sorteo_stock` / `sorteo_queue`) — el sorteo entero (elegir premio, descontar stock, guardar el registro) no depende de la red en ningún punto. Random ponderado por stock restante (`elegirPremio` en `Sorteo.jsx`): un premio con más unidades disponibles tiene más chance de salir; tope duro — un tipo en 0 nunca puede volver a salir.
4. **`api/log-premio.js`** — mismo patrón que `api/log-scan.js`: función serverless que agrega una fila a la pestaña **"Premios"** del mismo Google Sheet que ya usa `GOOGLE_SHEET_ID` (no hace falta una planilla nueva, solo crear esa pestaña si no existe). Rango `Premios!A:E`, columnas en este orden — **timestamp** (momento exacto del sorteo), **premio** (nombre del tipo entregado), **stockRestante** (cuánto queda de ESE premio después de esta entrega, pedido explícito de Claudio 2026-08-04), **id** (uuid, dedup) y **origin** (metadata técnica). Reusa las mismas tres env vars server-side que `log-scan.js` — nada nuevo que configurar en Vercel para esta parte.
5. **Sync**: `Sorteo.jsx` reintenta la cola pendiente al montar y en cada evento `online` del navegador. Se corta al primer fallo (se reintenta entera en el próximo trigger) — no hace falta reintento fino por-item para este volumen.
6. **`public/service-worker.js`** + registro en `src/index.jsx`: estrategia *network-first* (red primero, cache solo si falla el fetch) para que `/sorteo` cargue sin conexión en el dispositivo del evento, sin arriesgar contenido viejo en el resto de `ditp.com.ar` para visitantes normales — ver comentarios en el propio archivo. **No existía ningún service worker antes en este repo.**

## Decisiones tomadas (no bloqueantes, pero dejarlas explícitas)

- **No se sacó `/sorteo` del wrapper `<NavBar>`/`<FooterPage>` de `App.jsx`** — misma decisión que se tomó para `/smart-link` (ver `TASK_smart_link_instagram.md`), el overlay `position: fixed` de `.draw`/`.admin` los tapa igual visualmente.
- **Random ponderado por stock, no probabilidad fija** — con tope duro de cantidad por tipo, confirmado con Claudio.
- **Un solo dispositivo, no stock compartido entre varios** — confirmado con Claudio. Si en algún evento futuro se necesitan varios dispositivos en simultáneo, esto necesita repensarse (stock centralizado, no local).
- **El reset de stock nunca borra el historial/cola** — "Reiniciar día" solo toca `sorteo_stock`, no `sorteo_queue`. Los registros de días anteriores, sincronizados o no, quedan intactos.

## Cómo probarlo

- `npm start` y entrar a `/sorteo` — el flujo de sorteo, stock y localStorage funciona en local sin nada más.
- `/sorteo?admin=devtest123` para el panel de configuración (clave hardcodeada, ver `ADMIN_KEY` en `Sorteo.jsx`).
- **El sync a Sheets NO va a andar en local ni en preview de esta rama**: `isAllowedOrigin` en `_google-sheets-auth.js` solo permite `ditp.com.ar` y el alias fijo `ditp-news-git-dev-clod.vercel.app` — va a devolver 403 hasta que esto se mergee a `dev` (o se agregue el preview de esta rama a `ALLOWED_ORIGINS`, no se tocó ese archivo compartido desde acá). Mientras tanto, se puede validar el resto del flujo igual — el registro queda en la cola local marcado `synced:false` y no se pierde.
- Para el offline real: abrir `/sorteo` una vez con conexión (así el SW cachea el bundle), después probar en modo avión.

## Pendiente / fuera de alcance

- Crear la pestaña "Premios" en el Google Sheet si todavía no existe.
- Instalar la PWA (Agregar a pantalla de inicio) en el dispositivo real antes del 13/08 — recomendado para que en iOS no dependa del comportamiento normal de Safari entre jornadas.
