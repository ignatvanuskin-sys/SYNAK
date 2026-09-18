/* Тест формы записи: валидация, успешная отправка в WhatsApp, скриншоты. */
const path = require("path");
const { spawn } = require("child_process");
const http = require("http");
const { chromium } = require("playwright");

const PORT = 8261;
const BASE = "http://localhost:" + PORT;
const shotDir = path.join(__dirname, "..", "shots");

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
  const errors = [];
  const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
  await page.goto(BASE + "/", { waitUntil: "networkidle" });

  // Секция формы
  const section = page.locator("#booking");
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  console.log("секция #booking найдена:", (await section.count()) === 1);

  // 1. Пустая отправка -> ошибка обязательного поля
  await page.getByRole("button", { name: /Записаться через WhatsApp/ }).click();
  await page.waitForTimeout(300);
  const err = await page.locator("#booking-phone-error").count();
  console.log("ошибка пустого телефона:", err === 1);
  await page.screenshot({ path: path.join(shotDir, "booking-error.png") });

  // 2. Заполнение и отправка -> popup wa.me с текстом
  await page.fill("#booking-name", "Алексей");
  await page.fill("#booking-phone", "+7 701 123 45 67");
  await page.fill("#booking-car", "Toyota Camry 2015");
  await page.selectOption("#booking-service", "Кузовной ремонт");
  const popupPromise = ctx.waitForEvent("page");
  await page.getByRole("button", { name: /Записаться через WhatsApp/ }).click();
  const popup = await popupPromise;
  const popupUrl = popup.url();
  const isWa = popupUrl.startsWith("https://wa.me/77753375793") || popupUrl.startsWith("https://api.whatsapp.com/send/?phone=77753375793");
  console.log("popup открыт на WhatsApp:", isWa);
  const decoded = decodeURIComponent(popupUrl.replace(/\+/g, " "));
  console.log("текст содержит имя:", decoded.includes("Имя: Алексей"));
  console.log("текст содержит авто:", decoded.includes("Авто: Toyota Camry 2015"));
  console.log("текст содержит услугу:", decoded.includes("Услуга: Кузовной ремонт"));
  await popup.close().catch(() => {});

  // 3. Состояние успеха
  await page.waitForTimeout(300);
  const success = await page.getByText("Сообщение подготовлено. Завершите отправку в WhatsApp.").count();
  console.log("состояние успеха:", success === 1);
  await page.screenshot({ path: path.join(shotDir, "booking-success.png") });

  // 4. Desktop скриншот формы
  const dctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const dpage = await dctx.newPage();
  dpage.on("pageerror", (e) => errors.push("desktop pageerror: " + e.message));
  await dpage.goto(BASE + "/", { waitUntil: "networkidle" });
  await dpage.locator("#booking").scrollIntoViewIfNeeded();
  await dpage.waitForTimeout(800);
  await dpage.screenshot({ path: path.join(shotDir, "booking-desktop.png") });

  await browser.close();
  server.kill();
  server.kill("SIGKILL");

  console.log(errors.length ? "ОШИБКИ:\n" + errors.join("\n") : "console errors: 0");
  console.log("DONE");
})().catch((e) => { console.error("FAIL:", e); process.exit(1); });
