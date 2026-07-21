// Función serverless de Vercel — recibe los escaneos de /smart-link y los
// agrega como fila a un Google Sheet vía la API de Sheets, autenticado con
// un service account. Corre server-side: la clave privada nunca llega al
// navegador (a diferencia de una env var REACT_APP_*, que sí se hornea en
// el bundle público).
//
// Env vars requeridas (server-side, sin prefijo REACT_APP_):
//   GOOGLE_SERVICE_ACCOUNT_EMAIL
//   GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY  (con \n literales, tal como la exporta Google)
//   GOOGLE_SHEET_ID
//
// Sin esas tres variables configuradas, responde 200 sin hacer nada — no
// bloquea ni rompe el smart link.

const {
  SHEETS_WRITE_SCOPE,
  isAllowedOrigin,
  getAccessToken,
  getServiceAccountConfig,
} = require("./_google-sheets-auth");

const SHEET_RANGE = "Scans!A:H";

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method not allowed" });
    return;
  }

  if (!isAllowedOrigin(req)) {
    res.status(403).json({ ok: false, reason: "forbidden origin" });
    return;
  }

  const { email, privateKey, sheetId } = getServiceAccountConfig();

  if (!email || !privateKey || !sheetId) {
    // No configurado todavía — no rompe el smart link, solo no registra.
    res.status(200).json({ ok: false, reason: "not configured" });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const { event, type, code, platform, referrer, destination, firstScan } = body;
    // firstScan viene de localStorage del navegador: true = primera vez que
    // ESE navegador escanea ESE code puntual. null/undefined = no se pudo
    // determinar (localStorage no disponible), queda vacío en el Sheet.
    // "si"/"no" en vez de true/false: Sheets interpreta "true"/"false" como
    // booleano con USER_ENTERED y lo devuelve como "TRUE" (mayúsculas), lo
    // que rompe la comparación exacta al leerlo después.
    const firstScanValue = firstScan === true ? "si" : firstScan === false ? "no" : "";

    const accessToken = await getAccessToken(email, privateKey, SHEETS_WRITE_SCOPE);
    const row = [
      new Date().toISOString(),
      event || "",
      type || "",
      code || "",
      platform || "",
      referrer || "",
      destination || "",
      firstScanValue,
    ];

    const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(
      SHEET_RANGE
    )}:append?valueInputOption=USER_ENTERED`;

    const sheetsResponse = await fetch(appendUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [row] }),
    });

    if (!sheetsResponse.ok) {
      const errText = await sheetsResponse.text();
      throw new Error(`Sheets API error ${sheetsResponse.status}: ${errText}`);
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err) });
  }
};
