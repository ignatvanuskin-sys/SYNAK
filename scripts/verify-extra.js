/* Проверка 404 и privacy + корректная проверка всех якорей. */
const { spawn } = require("child_process");
const http = require("http");
const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");

const PORT = 8171;
const BASE = `http://localhost:${PORT}`;
const shotDir = path.join(__dirname, "..", "shots");

function waitPort() {
  return new Promise((resolve, reject) => {
    let tries = 0;
    const timer = setInterval(() => {
      http
        .get(BASE + "/", (res) => {
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

(async () => {
  const server = spawn(process.execPath, [require("path").join(__dirname, "static-server.js"), String(PORT)], {
    stdio: "ignore",
    detached: true,
  });
  await waitPort();

  const browser = await chromium.launch();
  const errors = [];

  // --- 404 страница ---
  {
    const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
    const page = await ctx.newPage();
    page.on("pageerror", (e) => errors.push("404 pageerror: " + e.message));
    await page.goto(BASE + "/nonexistent", { waitUntil: "networkidle" });
    await page.waitForTimeout(300);
    const h1 = await page.getByRole("heading", { name: "Страница не найдена" }).count();
    const homeLink = await page.getByRole("link", { name: "На главную" }).count();
    const callBtn = await page.getByRole("link", { name: "Позвонить" }).count();
    console.log("404: заголовок =", h1 === 1, "| на главную =", homeLink === 1, "| позвонить =", callBtn === 1);
    await page.screenshot({ path: path.join(shotDir, "not-found.png") });
    await ctx.close();
  }

  // --- privacy страница ---
  {
    const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
    const page = await ctx.newPage();
    page.on("pageerror", (e) => errors.push("privacy pageerror: " + e.message));
    await page.goto(BASE + "/privacy", { waitUntil: "networkidle" });
    await page.waitForTimeout(300);
    const h1 = await page.getByRole("heading", { name: "Политика конфиденциальности" }).count();
    console.log("privacy: заголовок =", h1 === 1);
    await page.screenshot({ path: path.join(shotDir, "privacy.png") });
    await ctx.close();
  }

  // --- Все якоря индивидуально ---
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    page.on("pageerror", (e) => errors.push("anchors pageerror: " + e.message));
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    for (const href of ["#services", "#problems", "#benefits", "#how", "#gallery", "#reviews", "#faq", "#contacts"]) {
      await page.evaluate((h) => document.querySelector(h).scrollIntoView(), href);
      await page.waitForTimeout(250);
      const visible = await page.evaluate((h) => {
        const r = document.querySelector(h).getBoundingClientRect();
        return r.top >= -40 && r.top < window.innerHeight;
      }, href);
      console.log(`якорь ${href} -> вьюпорт =`, visible);
    }
    await ctx.close();
  }

  await browser.close();
  server.kill();
  server.kill("SIGKILL");

  console.log(errors.length ? "ОШИБКИ:\n" + errors.join("\n") : "console errors: 0");
  console.log("DONE");
})().catch((e) => {
  console.error("FAIL:", e);
  process.exit(1);
});
