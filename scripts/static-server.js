/* Статический сервер с редиректами как у реального хостинга: /privacy -> /privacy/. */
const http = require("http");
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const ROOT = path.join(__dirname, "..", "out");
const PORT = Number(process.argv[2] || 8143);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

function resolvePath(urlPath) {
  let p = decodeURIComponent(urlPath.split("?")[0]);
  const clean = p.replace(/\/+$/, "");
  // 1. /privacy/ -> privacy/index.html
  const dirIndex = path.join(ROOT, clean, "index.html");
  if (fs.existsSync(dirIndex)) return { status: 200, file: dirIndex };
  // 2. /privacy -> /privacy/
  const bare = path.join(ROOT, clean);
  if (fs.existsSync(bare) && fs.statSync(bare).isDirectory()) {
    return { status: 301, redirect: p.replace(/\/+$/, "") + "/" };
  }
  // 3. файл целиком
  const file = path.join(ROOT, clean);
  if (fs.existsSync(file) && fs.statSync(file).isFile()) return { status: 200, file };
  // 4. файл.html (чистые URL)
  const html = path.join(ROOT, clean + ".html");
  if (fs.existsSync(html)) return { status: 200, file: html };
  // 5. 404
  return { status: 404, file: path.join(ROOT, "404.html") };
}

http
  .createServer((req, res) => {
    const p = resolvePath(req.url);
    if (p.redirect) {
      res.writeHead(301, { Location: p.redirect });
      return res.end();
    }
    const ext = path.extname(p.file).toLowerCase();
    const data = fs.readFileSync(p.file);
    const compressible = /\.(html|css|js|json|svg|xml|txt)$/.test(ext);
    res.writeHead(p.status, {
      "Content-Type": MIME[ext] || "application/octet-stream",
      "Cache-Control": /\.(woff2|webp|jpg|png|svg)$/.test(ext)
        ? "public, max-age=31536000, immutable"
        : "public, max-age=3600",
      ...(compressible ? { "Content-Encoding": "gzip", Vary: "Accept-Encoding" } : {}),
    });
    res.end(compressible ? zlib.gzipSync(data) : data);
  })
  .listen(PORT, () => console.log("static server on :" + PORT));
