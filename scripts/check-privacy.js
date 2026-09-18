// Голый /privacy -> 301 на /privacy/ (как канонический редирект хостинга).
const path = require("path");
const { spawn } = require("child_process");
const http = require("http");
const { chromium } = require("playwright");

const PORT = 8211;
const BASE = "http://localhost:" + PORT;
const ROOT = path.join(__dirname, "..", "out");

function waitPort() {
  return new Promise((resolve, reject) => {
    let tries = 0;
    const timer = setInterval(() => {
      http.get(BASE + "/", (res) => { clearInterval(timer); res.resume(); resolve(); }).on("error", () => {
        if (++tries > 50) { clearInterval(timer); reject(new Error("server not up")); }
      });
    }, 100);
  });
}

(async () => {
  const server = spawn(process.execPath, [path.join(__dirname, "static-server.js"), String(PORT)], { stdio: "ignore", detached: true });
  await waitPort();
  const browser = await chromium.launch();
  const page = await (await browser.newContext({ viewport: { width: 375, height: 812 } })).newPage();
  await page.goto(BASE + "/privacy", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  console.log("final url:", page.url());
  console.log("privacy h1:", await page.getByRole("heading", { name: "Политика конфиденциальности" }).count());
  await browser.close();
  server.kill();
  server.kill("SIGKILL");
  console.log("DONE");
})().catch((e) => { console.error("FAIL:", e); process.exit(1); });
