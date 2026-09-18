const path = require("path");
const { spawn } = require("child_process");
const http = require("http");
const { chromium } = require("playwright");

const PORT = 8207;
const BASE = "http://localhost:" + PORT;

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
  const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/nonexistent", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  console.log("h1 'Страница не найдена':", await page.getByRole("heading", { name: "Страница не найдена" }).count());
  console.log("link 'На главную':", await page.getByRole("link", { name: "На главную" }).count());
  console.log("link 'Позвонить':", await page.getByRole("link", { name: "Позвонить" }).count());

  // privacy c однозначным маркером (h1, не footer-ссылка)
  await page.goto(BASE + "/privacy", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  console.log("privacy h1:", await page.getByRole("heading", { name: "Политика конфиденциальности" }).count());
  console.log("privacy url:", page.url());

  await browser.close();
  server.kill();
  server.kill("SIGKILL");
  console.log("DONE");
})().catch((e) => { console.error("FAIL:", e); process.exit(1); });
