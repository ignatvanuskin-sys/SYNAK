/* Комплексная проверка качества landing page.
 * Поднимает статический сервер, рендерит страницу в Chromium,
 * делает скриншоты, проверяет интеракции, overflow и console errors.
 */
const { spawn } = require("child_process");
const http = require("http");
const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");

const outDir = path.join(__dirname, "..", "out");
const shotDir = path.join(__dirname, "..", "shots");
if (!fs.existsSync(shotDir)) fs.mkdirSync(shotDir, { recursive: true });

const PORT = 8137;
const BASE = `http://localhost:${PORT}`;

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

  const contexts = [
    { name: "mobile-375", width: 375, height: 812 },
    { name: "mobile-375", width: 375, height: 812, dsf: 2, label: "mobile-375" },
    { name: "desktop-1440", width: 1440, height: 900 },
  ];

  // --- Мобильный проход: скриншоты на ширинах чеклиста + overflow + interакции ---
  for (const width of [320, 375, 390]) {
    const ctx = await browser.newContext({ viewport: { width, height: 812 } });
    const page = await ctx.newPage();
    page.on("console", (m) => m.type() === "error" && errors.push(`[375w] console: ${m.text()}`));
    page.on("pageerror", (e) => errors.push(`[375w] pageerror: ${e.message}`));
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await page.waitForTimeout(400);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    console.log(`width=${width} horizontal overflow=${overflow}px`);
    await page.screenshot({ path: path.join(shotDir, `mobile-${width}.png`), fullPage: false });
    if (width === 375) {
      await page.screenshot({ path: path.join(shotDir, `mobile-375-full.png`), fullPage: true });
    }
    await ctx.close();
  }

  // --- Планшет + desktop скриншоты ---
  for (const [label, width, height] of [["tablet-768", 768, 1024], ["desktop-1024", 1024, 768], ["desktop-1440", 1440, 900]]) {
    const ctx = await browser.newContext({ viewport: { width, height } });
    const page = await ctx.newPage();
    page.on("console", (m) => m.type() === "error" && errors.push(`[${label}] console: ${m.text()}`));
    page.on("pageerror", (e) => errors.push(`[${label}] pageerror: ${e.message}`));
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await page.waitForTimeout(400);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    console.log(`${label} overflow=${overflow}px`);
    await page.screenshot({ path: path.join(shotDir, `${label}-full.png`), fullPage: true });
    await ctx.close();
  }

  // --- Мобильные интеракции: меню, FAQ, lightbox, scroll lock ---
  {
    const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
    const page = await ctx.newPage();
    page.on("console", (m) => m.type() === "error" && errors.push(`[int mobile] console: ${m.text()}`));
    page.on("pageerror", (e) => errors.push(`[int mobile] pageerror: ${e.message}`));
    await page.goto(BASE + "/", { waitUntil: "networkidle" });

    // Открыть меню
    await page.getByRole("button", { name: "Открыть меню" }).click();
    await page.waitForTimeout(300);
    const scrollLocked = await page.evaluate(() => document.body.style.overflow === "hidden");
    console.log("меню открыто, scroll lock =", scrollLocked);
    await page.screenshot({ path: path.join(shotDir, "menu-open.png") });

    // Escape закрывает
    await page.keyboard.press("Escape");
    await page.waitForTimeout(200);
    const menuGone = (await page.getByRole("dialog", { label: "Меню" }).count()) === 0;
    console.log("меню закрыто по Escape =", menuGone);

    // Открыть снова и кликнуть пункт
    await page.getByRole("button", { name: "Открыть меню" }).click();
    await page.waitForTimeout(200);
    await page.getByRole("link", { name: "Услуги" }).click();
    await page.waitForTimeout(500);
    const menuGone2 = (await page.getByRole("dialog", { label: "Меню" }).count()) === 0;
    console.log("меню закрыто при выборе пункта =", menuGone2);

    // FAQ с клавиатуры: фокус на первый вопрос и Tab/Enter
    const faqBtn = page.getByRole("button", { name: "Когда работает СТО?" });
    await faqBtn.click();
    await page.waitForTimeout(200);
    const expanded = await faqBtn.getAttribute("aria-expanded");
    console.log("FAQ aria-expanded после клика =", expanded);

    // Lightbox: открыть фото и закрыть по Escape
    const galleryBtn = page.getByLabel(/Увеличить фото/).first();
    await galleryBtn.scrollIntoViewIfNeeded();
    await galleryBtn.click();
    await page.waitForTimeout(300);
    const lightboxOpen = await page.getByRole("dialog", { label: "Просмотр фото" }).count();
    console.log("lightbox открыт =", lightboxOpen === 1);
    await page.screenshot({ path: path.join(shotDir, "lightbox.png") });
    await page.keyboard.press("Escape");
    await page.waitForTimeout(200);
    const lightboxClosed = (await page.getByRole("dialog", { label: "Просмотр фото" }).count()) === 0;
    console.log("lightbox закрыт по Escape =", lightboxClosed);

    await ctx.close();
  }

  // --- Desktop интеракции: FAQ, lightbox, lightbox nav ---
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    page.on("console", (m) => m.type() === "error" && errors.push(`[int desktop] console: ${m.text()}`));
    page.on("pageerror", (e) => errors.push(`[int desktop] pageerror: ${e.message}`));
    await page.goto(BASE + "/", { waitUntil: "networkidle" });

    // Якоря
    for (const href of ["#services", "#how", "#reviews", "#contacts", "#gallery", "#faq"]) {
      await page.evaluate((h) => document.querySelector(h).scrollIntoView(), href);
      await page.waitForTimeout(150);
      const visible = await page.evaluate(
        (h) => {
          const r = document.querySelector(h).getBoundingClientRect();
          return r.top >= 0 && r.top < window.innerHeight;
        },
        href
      );
      console.log(`якорь ${href} видим в вьюпорте =`, visible);
    }

    // Lightbox стрелки
    const galleryBtn = page.getByLabel(/Увеличить фото/).first();
    await galleryBtn.scrollIntoViewIfNeeded();
    await galleryBtn.click();
    await page.waitForTimeout(250);
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(150);
    const counter = await page.getByText("2 / 6").count();
    console.log("lightbox навигация стрелкой (2/6) =", counter === 1);
    await page.keyboard.press("Escape");

    // Hover на кнопке — не ломает
    const primary = page.getByRole("link", { name: "Позвонить" }).first();
    await primary.hover();

    await ctx.close();
  }

  await browser.close();
  server.kill();
  server.kill("SIGKILL");

  if (errors.length) {
    console.log("\n=== ОШИБКИ ===");
    errors.forEach((e) => console.log(e));
  } else {
    console.log("\nconsole errors: 0");
  }
  console.log("DONE");
})().catch((e) => {
  console.error("FAIL:", e);
  process.exit(1);
});
