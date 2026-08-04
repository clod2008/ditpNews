// Función serverless de Vercel — recibe los premios entregados por /sorteo y
// los agrega como fila a un Google Sheet vía la API de Sheets, autenticado
// con el mismo service account que ya usa log-scan.js (ver
// _google-sheets-auth.js). Misma planilla (GOOGLE_SHEET_ID), pestaña
// "Premios" en vez de "Scans".
//
// Env vars requeridas (las mismas tres que ya usa log-scan.js — no hace
// falta nada nuevo si el Sheet ID es el mismo):
//   GOOGLE_SERVICE_ACCOUNT_EMAIL
//   GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
//   GOOGLE_SHEET_ID
//
// Sin esas tres variables configuradas, responde 200 sin hacer nada — no
// bloquea el sorteo, solo no registra.

const {
  SHEETS_WRITE_SCOPE,
  isAllowedOrigin,
  getAccessToken,
  getServiceAccountConfig,
} = require("./_google-sheets-auth");

const SHEET_RANGE = "Premios!A:E";

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
    res.status(200).json({ ok: false, reason: "not configured" });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const { id, premioNombre, stockRestante, timestamp } = body;

    if (!id || !premioNombre) {
      res.status(400).json({ ok: false, reason: "missing fields" });
      return;
    }

    const accessToken = await getAccessToken(email, privateKey, SHEETS_WRITE_SCOPE);
    // Orden pedido por Claudio: momento exacto, premio entregado, cuánto
    // queda de ese premio después de esta entrega — id/origin al final,
    // son metadata técnica (dedup / debug), no lo primero que se quiere leer.
    const row = [
      timestamp || new Date().toISOString(),
      premioNombre,
      stockRestante ?? "",
      id,
      req.headers.origin || "",
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
