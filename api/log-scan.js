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

const crypto = require("crypto");

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const SHEET_RANGE = "Scans!A:F";
// Solo el sitio de producción puede escribir en el Sheet — cualquier otro
// origen (curl directo, otro sitio, previews de Vercel) queda afuera.
const ALLOWED_ORIGINS = ["https://www.ditp.com.ar", "https://ditp.com.ar"];

function isAllowedOrigin(req) {
  const origin = req.headers.origin || "";
  const referer = req.headers.referer || "";
  return ALLOWED_ORIGINS.some(
    (allowed) => origin.startsWith(allowed) || referer.startsWith(allowed)
  );
}

function base64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function getAccessToken(email, privateKey) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(
    JSON.stringify({
      iss: email,
      scope: SHEETS_SCOPE,
      aud: TOKEN_URL,
      exp: now + 3600,
      iat: now,
    })
  );
  const unsigned = `${header}.${claims}`;
  const signature = crypto.sign("RSA-SHA256", Buffer.from(unsigned), privateKey);
  const jwt = `${unsigned}.${base64url(signature)}`;

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  const data = await response.json();
  if (!data.access_token) {
    throw new Error(`No se pudo obtener access_token: ${JSON.stringify(data)}`);
  }
  return data.access_token;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method not allowed" });
    return;
  }

  if (!isAllowedOrigin(req)) {
    res.status(403).json({ ok: false, reason: "forbidden origin" });
    return;
  }

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || "").replace(/\\n/g, "\n");
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!email || !privateKey || !sheetId) {
    // No configurado todavía — no rompe el smart link, solo no registra.
    res.status(200).json({ ok: false, reason: "not configured" });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const { event, type, code, platform, referrer } = body;

    const accessToken = await getAccessToken(email, privateKey);
    const row = [
      new Date().toISOString(),
      event || "",
      type || "",
      code || "",
      platform || "",
      referrer || "",
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
