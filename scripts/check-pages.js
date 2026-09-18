const path = require("path");
const { spawn } = require("child_process");
const http = require("http");
const zlib = require("zlib");

const PORT = 8193;
const ROOT = path.join(__dirname, "..", "out");

function waitPort() {
  return new Promise((resolve, reject) => {
    let tries = 0;
    const timer = setInterval(() => {
      http
        .get("http://localhost:" + PORT + "/", (res) => {
          clearInterval(timer);
          res.resume();
          resolve();
        })
        .on("error", () => {
          if (++tries > 50) {
            clearInterval(timer);
            reject(new Error("server not up"));
          }
        });
    }, 100);
  });
}

function get(pathname) {
  return new Promise((resolve, reject) => {
    http
      .get("http://localhost:" + PORT + pathname, (res) => {
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          let body = Buffer.concat(chunks);
          if (res.headers["content-encoding"] === "gzip") body = zlib.gunzipSync(body);
          resolve({ status: res.statusCode, text: body.toString() });
        });
      })
      .on("error", reject);
  });
}

(async () => {
  const server = spawn(process.execPath, [path.join(__dirname, "static-server.js"), String(PORT)], {
    stdio: "ignore",
    detached: true,
  });
  await waitPort();

  const nf = await get("/nonexistent");
  console.log("/nonexistent ->", nf.status, "| содержит 'Страница не найдена':", nf.text.includes("Страница не найдена"));

  const pv = await get("/privacy");
  console.log("/privacy ->", pv.status, "| содержит 'Политика конфиденциальности':", pv.text.includes("Политика конфиденциальности"));

  server.kill();
  server.kill("SIGKILL");
  console.log("DONE");
})().catch((e) => {
  console.error("FAIL:", e);
  process.exit(1);
});
