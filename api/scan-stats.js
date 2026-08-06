// Función serverless de Vercel — lee el Sheet de escaneos y devuelve totales
// por categoría (reel/post/perfil), opcionalmente filtrados por rango de
// fecha. La usa el panel de estadísticas del constructor en /smart-link.
//
// Requiere origen permitido (ver _google-sheets-auth.js) Y ?admin=CLAVE
// correcta — mismo gate que destraba el constructor, no cualquiera puede
// leer las estadísticas.

const {
  SHEETS_SCOPE,
  isAllowedOrigin,
  isAdminRequest,
  getAccessToken,
  getServiceAccountConfig,
} = require("./_google-sheets-auth");

const SHEET_RANGE = "Scans!A:H";
const KNOWN_TYPES = ["reel", "p", "profile", "url"];

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "method not allowed" });
    return;
  }

  if (!isAllowedOrigin(req) || !isAdminRequest(req)) {
    res.status(403).json({ ok: false, reason: "forbidden" });
    return;
  }

  const { email, privateKey, sheetId } = getServiceAccountConfig();

  if (!email || !privateKey || !sheetId) {
    res.status(200).json({ ok: false, reason: "not configured" });
    return;
  }

  try {
    const accessToken = await getAccessToken(email, privateKey, SHEETS_SCOPE);

    const getUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(
      SHEET_RANGE
    )}`;
    const sheetsResponse = await fetch(getUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!sheetsResponse.ok) {
      const errText = await sheetsResponse.text();
      throw new Error(`Sheets API error ${sheetsResponse.status}: ${errText}`);
    }

    const { values = [] } = await sheetsResponse.json();
    const rows = values.slice(1); // saltar header

    const from = req.query.from ? new Date(req.query.from) : null;
    const to = req.query.to ? new Date(req.query.to) : null;

    const byType = { reel: 0, p: 0, profile: 0, url: 0 };
    const uniqueByType = { reel: 0, p: 0, profile: 0, url: 0 };
    const byCodeMap = new Map();
    let total = 0;
    let uniqueTotal = 0;

    for (const row of rows) {
      const [timestamp, event, type, code, , , destination, firstScan] = row;
      if (event !== "scan") continue; // "fallback" es diagnóstico, no un escaneo nuevo
      if (!KNOWN_TYPES.includes(type)) continue;

      const scannedAt = new Date(timestamp);
      if (from && scannedAt < from) continue;
      if (to && scannedAt > to) continue;

      byType[type] += 1;
      total += 1;

      const isUnique = firstScan === "si";
      // "Usuario único" = primera vez que ESE navegador escaneó ESE code
      // puntual (ver isFirstScanForCode en SmartLink.jsx) — mismo dispositivo
      // escaneando dos códigos distintos cuenta como único en cada uno.
      if (isUnique) {
        uniqueByType[type] += 1;
        uniqueTotal += 1;
      }

      const codeKey = `${type}:${code}`;
      const entry = byCodeMap.get(codeKey) || {
        type,
        code,
        destination: destination || "",
        total: 0,
        uniqueTotal: 0,
      };
      entry.total += 1;
      if (isUnique) entry.uniqueTotal += 1;
      byCodeMap.set(codeKey, entry);
    }

    const byCode = Array.from(byCodeMap.values()).sort((a, b) => b.total - a.total);

    res.status(200).json({ ok: true, total, byType, uniqueTotal, uniqueByType, byCode });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err) });
  }
};
