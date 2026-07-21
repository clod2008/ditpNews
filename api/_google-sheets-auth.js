// Helper compartido entre las funciones serverless de /api que necesitan
// autenticarse contra la API de Google Sheets con un service account.
// No es una ruta — el prefijo _ hace que Vercel no la trate como endpoint.

const crypto = require("crypto");

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets.readonly";
const SHEETS_WRITE_SCOPE = "https://www.googleapis.com/auth/spreadsheets";

// Producción + el alias fijo de la rama dev — cualquier otro origen (curl
// directo, otro sitio, previews por deployment) queda afuera.
const ALLOWED_ORIGINS = [
  "https://www.ditp.com.ar",
  "https://ditp.com.ar",
  "https://ditp-news-git-dev-clod.vercel.app",
];

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

async function getAccessToken(email, privateKey, scope) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(
    JSON.stringify({
      iss: email,
      scope,
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

function getServiceAccountConfig() {
  return {
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    privateKey: (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
    sheetId: process.env.GOOGLE_SHEET_ID,
  };
}

function isAdminRequest(req) {
  const adminKey = process.env.REACT_APP_SMART_LINK_ADMIN_KEY;
  if (!adminKey) return false;
  const provided = (req.query && req.query.admin) || "";
  return provided === adminKey;
}

module.exports = {
  SHEETS_SCOPE,
  SHEETS_WRITE_SCOPE,
  isAllowedOrigin,
  isAdminRequest,
  getAccessToken,
  getServiceAccountConfig,
};
