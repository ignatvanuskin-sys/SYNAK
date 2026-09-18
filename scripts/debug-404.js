const path = require("path");
const { spawn } = require("child_process");
const http = require("http");
const { chromium } = require("playwright");

const PORT = 8223;
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
  page.on("response", (r) => r.status() >= 400 && console.log("RESPONSE", r.status(), r.url()));
  await page.goto(BASE + "/", { waitUntil: "networkidle" });

  // повторы действий из verify.js
  await page.getByRole("button", { name: "Открыть меню" }).click();
  await page.waitForTimeout(250);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);
  await page.getByRole("button", { name: "Открыть меню" }).click();
  await page.waitForTimeout(200);
  await page.getByRole("link", { name: "Услуги" }).click();
  await page.waitForTimeout(600);
  const faqBtn = page.getByRole("button", { name: "Когда работает СТО?" });
  await faqBtn.click();
  await page.waitForTimeout(200);
  const galleryBtn = page.getByLabel(/Увеличить фото/).first();
  await galleryBtn.scrollIntoViewIfNeeded();
  await galleryBtn.click();
  await page.waitForTimeout(400);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);
  console.log("DEBUG DONE");
  await browser.close();
  server.kill();
  server.kill("SIGKILL");
})().catch((e) => { console.error("FAIL:", e); process.exit(1); });
