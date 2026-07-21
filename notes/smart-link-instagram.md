# Smart Link a Instagram — Guía de uso

Ruta `/smart-link` (`src/pages/SmartLink.jsx`) — redirige al celular directo a un Reel o post de Instagram: abre la app si está instalada, o el navegador si no. Pensada originalmente para la campaña **Thai Mali Rice 2026**, pero sirve para cualquier campaña futura que use el mismo patrón.

## Estructura del link

```
https://www.ditp.com.ar/smart-link?type=TIPO&code=CODIGO
```

Dos parámetros, ambos obligatorios para que redirija. Si falta alguno, la página muestra "todavía no hay un posteo asignado a este link" en vez de redirigir a cualquier lado.

| Parámetro | Valores posibles | Qué es |
|---|---|---|
| `type` | `reel`, `p` o `profile` | Tipo de contenido: `reel` para un Reel, `p` para un post de feed, `profile` para ir directo al perfil de Instagram (sin post específico) |
| `code` | shortcode alfanumérico (`reel`/`p`) o nombre de usuario (`profile`) | El identificador del destino en la URL de Instagram |

## Cómo sacar el `code` de una URL real de Instagram

Cuando el Reel/post está publicado, su URL en Instagram se ve así:

```
https://www.instagram.com/reel/DA1b2C3dEfG/
                            └───┬───┘
                            este es el "code"
```

o si es un post de feed:

```
https://www.instagram.com/p/CxYz9AbCdEf/
                          └───┬───┘
                          este es el "code"
```

El `code` es siempre el segmento entre `/reel/` (o `/p/`) y la barra final. Se copia tal cual, sin barras.

Para `type=profile`, en vez de un código va el **nombre de usuario** de Instagram (con o sin `@`, el builder lo limpia solo):

```
https://www.instagram.com/ditp.thailand/
                          └─────┬─────┘
                            este es el "code"
```

## Ejemplos completos

**Reel:**
```
https://www.ditp.com.ar/smart-link?type=reel&code=DA1b2C3dEfG
```

**Post de feed:**
```
https://www.ditp.com.ar/smart-link?type=p&code=CxYz9AbCdEf
```

**Perfil:**
```
https://www.ditp.com.ar/smart-link?type=profile&code=ditp.thailand
```

## Modo test: quedarse en la pantalla (`&stay=1`)

Agregando `&stay=1` al link, la página **no** redirige automáticamente — se queda mostrando la pantalla de carga con la URL de destino calculada y un botón "Ir a Instagram" para disparar el link a mano cuando quieras. Útil para mirar/probar el diseño de la pantalla sin que te saque al instante.

```
https://www.ditp.com.ar/smart-link?type=reel&code=DA1b2C3dEfG&stay=1
```

## Cómo se conecta con `qrg` (el shortener del QR impreso)

El QR de la campaña apunta a un link corto administrado por `qrg` (Node/Express + Google Sheets, redirect 302 puro — repo aparte, no se toca desde acá). El único punto de contacto es la **columna B** del Sheet de `qrg`, en la fila de la campaña: ahí va pegada la URL completa de arriba, con el `code` real una vez que el contenido esté publicado. `qrg` relee el Sheet en cada request, así que el cambio queda activo al instante, sin redeploy de ningún lado.

Flujo el día que se publique el contenido:

1. Publicar el Reel/post en Instagram.
2. Copiar su `code` de la URL.
3. Armar `https://www.ditp.com.ar/smart-link?type=reel&code=EL_CODE_REAL` (o `type=p` si es post de feed).
4. Pegar esa URL en la columna B del Sheet de `qrg`, en la fila de esta campaña.
5. Listo — el QR ya impreso empieza a llevar al contenido real, sin tocar código ni redeployar.

## Constructor de links (en la propia ruta)

Si entrás a `/smart-link` **sin** `type`/`code` en la URL, en vez del mensaje de "no hay posteo asignado" ahora se muestra un formulario para armarlo:

- Radio button **Reel / Post / Perfil**.
- Campo de texto para pegar el código (o el usuario, si elegiste "Perfil") — el placeholder cambia según la opción elegida.
- Selector **Real / Test**: "Real" genera el link definitivo (redirige solo); "Test" agrega `&stay=1` (ver sección de abajo) para poder mirar la pantalla sin que dispare la redirección.
- Bloque de ayuda "¿de dónde saco esto?" con la URL de ejemplo de Instagram y la parte a copiar, actualizado según el tipo elegido.
- Muestra el link completo generado con una etiqueta **Modo real** / **Modo test** arriba, y botón **Copiar link**. El de "Modo real" es el que va a la columna B del Sheet de `qrg` — el de "Modo test" es solo para mirar la pantalla, no lo publiques.
- Debajo, un **QR generado en el momento** con selector de color del código (**Negro / Blanco / Azul DITP**, fondo siempre transparente) y botones **Descargar QR (PNG)** y **Descargar QR (SVG)**. El QR siempre codifica el link real (nunca el de modo test, aunque tengas el selector en "Test") — así el archivo que bajás está listo para imprimir directo, sin pasos extra. PNG es la opción recomendada para uso general (celular, WhatsApp, imprentas que no aceptan vectorial); SVG para diseño/impresión en alta resolución. La previsualización muestra un fondo tipo damero solo para que se vea el código blanco — el archivo exportado no lleva ese patrón, es transparente de verdad. Usa la librería `qrcode` (nueva dependencia del proyecto).

El link se arma con el dominio desde el que se esté viendo la página (`window.location.origin`), así que si lo abrís en `http://localhost:3003/smart-link` te da el link de prueba local, y si lo abrís en `https://www.ditp.com.ar/smart-link` te da directo el link de producción para copiar y pegar.

## Cómo probarlo sin depender de `qrg` ni de un post real

Usar cualquier shortcode público de Instagram (de cualquier cuenta) como dummy:

```
# local (dev server, puerto según PORT en .env — por default 3003 en este repo)
http://localhost:3003/smart-link?type=p&code=ABC123

# producción
https://www.ditp.com.ar/smart-link?type=p&code=ABC123
```

Si la navegación termina en `https://www.instagram.com/p/ABC123/`, el armado del link es correcto.

### Prueba en celular real (misma wifi que la máquina de desarrollo)

```
http://<IP_LOCAL_DE_LA_MAQUINA>:PUERTO/smart-link?type=p&code=ABC123
```

- **Android**: si Instagram está instalada, abre la app directo (o muestra el chooser "Abrir con"); si no, cae a Chrome con el post web.
- **iPhone**: si Instagram está instalada, el Universal Link abre la app directo; si no, abre Safari con el post.

Lo que dispara el "abrir app" es que el destino final es `instagram.com` (dominio real) — no importa que la página `/smart-link` se sirva desde una IP local por http, el navegador del celular igual reconoce que el link final apunta a Instagram.

**No sirve** el emulador de dispositivo de Chrome DevTools para esto: solo cambia viewport y user-agent, no tiene Instagram instalada a nivel OS, así que nunca va a disparar el "abrir app". Sirve solo para chequear que el spinner/logo se vean bien en pantalla chica.

## Registro de escaneos (Google Sheet vía service account)

Cada vez que `/smart-link` redirige de verdad (no en modo `stay=1`), manda un registro no bloqueante vía `navigator.sendBeacon` a **`/api/log-scan`** (`api/log-scan.js`, función serverless de Vercel) — esa función se autentica contra la API de Sheets con un **service account de Google Cloud** y agrega una fila. `sendBeacon` no demora ni interfiere la redirección: dispara y sigue.

Se intentó primero con un Google Apps Script Web App (mismo patrón que `src/pages/Credenciales.jsx` usa para leer), pero el Workspace de `apsis.com.ar` bloquea el acceso anónimo a Web Apps de Apps Script incluso con "Cualquier usuario" — por eso se pasó a un service account, que no depende de esa política.

**Seguridad**: `/api/log-scan` corre server-side — la clave privada del service account nunca llega al navegador (a diferencia de una env var `REACT_APP_*`, que sí queda expuesta en el bundle público). La función además rechaza (403) cualquier request cuyo origen no esté en la allowlist (`ALLOWED_ORIGINS` en `api/log-scan.js`): hoy son `ditp.com.ar` (producción) y `https://ditp-news-git-dev-clod.vercel.app` (el alias fijo de la rama `dev`, para poder probar el registro en desarrollo). Cualquier otro origen — previews por deployment individual, curl directo, otro sitio — queda afuera.

Qué se guarda por fila (sin cookies, sin IP explícita, sin fingerprinting):

- Timestamp
- Evento: `scan` (llegada) o `fallback` (se activó la red de seguridad de 2.5s, señal de que el deep-link no abrió nada solo)
- `type` y `code` escaneados
- Plataforma: `android` / `ios` / `desktop`
- `document.referrer` (casi siempre vacío viniendo de un QR impreso)
- **Destino**: la URL de Instagram calculada (`https://www.instagram.com/reel|p/code/` o `/usuario/` para perfil) — columna **G**, header manual "Destino" (la función escribe el rango `Scans!A:G`, pero el encabezado de la fila 1 hay que ponerlo a mano en el Sheet).

### Setup (una sola vez)

1. **Google Cloud Console** → crear/elegir un proyecto → habilitar la **Google Sheets API**.
2. **IAM y administración → Cuentas de servicio** → crear una cuenta de servicio → generar una clave **JSON** y descargarla.
3. Del JSON descargado, copiar `client_email` y `private_key`.
4. Abrir el Google Sheet donde va el registro → **Compartir** → agregar el `client_email` de la cuenta de servicio como **Editor**.
5. Crear una hoja/pestaña llamada **`Scans`** dentro de ese Sheet (la función escribe en el rango `Scans!A:F`).
6. Copiar el **ID del Sheet** (el segmento largo en la URL, entre `/d/` y `/edit`).
7. En Vercel: Project Settings → Environment Variables → agregar (server-side, **sin** prefijo `REACT_APP_`):
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` (pegar tal cual, con los `\n` literales que trae el JSON)
   - `GOOGLE_SHEET_ID`
8. Redeploy.

Si esas tres variables no están seteadas, `/api/log-scan` responde 200 sin escribir nada — no rompe ni tira error, el smart link funciona igual sin registro.

## Fuera de alcance (por ahora)

- Analytics agregados (gráficos, dashboards) sobre el Sheet de escaneos — hoy es solo el registro crudo.
- Cualquier cambio en el repo `qrg`.

## Referencias

- Componente: `src/pages/SmartLink.jsx` / `src/pages/SmartLink.module.scss`
- Ruta: `src/data/cont.js` (`paths.smartLink`) y `src/App.jsx`
- Tarea original: `src/TASK_smart_link_instagram.md`
- Lógica de referencia (vanilla JS, ya validada): vault de Apsis, `Clientes/DITP - TTC-BA/Campaña Thai Mali Rice 2026/smart-link-instagram-template.html`
