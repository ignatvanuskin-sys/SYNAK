/* Lighthouse прогон для / (мобильная эмуляция, headless Chromium). */
const { spawn } = require("child_process");
const http = require("http");
const path = require("path");

const PORT = 8157;
const BASE = `http://localhost:${PORT}`;
const outDir = path.join(__dirname, "..", "out");
const reportPath = path.join(__dirname, "..", "shots", "lighthouse.json");

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

  const lighthouse = require("lighthouse").default;
  const chromeLauncher = require("chrome-launcher");

  const chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless=new", "--no-first-run", "--disable-gpu"],
  });

  const result = await lighthouse(
    BASE + "/",
    {
      port: chrome.port,
      output: "json",
      onlyCategories: ["performance", "accessibility", "seo", "best-practices"],
    }
  );

  const cats = result.lhr.categories;
  console.log("=== LIGHTHOUSE ===");
  for (const key of Object.keys(cats)) {
    console.log(key, Math.round(cats[key].score * 100));
  }

  // Топ-проблемы
  const audits = result.lhr.audits;
  for (const key of Object.keys(audits)) {
    const a = audits[key];
    if (a.score !== null && a.score < 0.9 && !a.scoreDisplayMode.includes("PASS")) {
      console.log("!", key, a.score, a.displayValue || "");
    }
  }

  require("fs").writeFileSync(reportPath, JSON.stringify(result.lhr, null, 2));

  await chrome.kill();
  server.kill();
  server.kill("SIGKILL");
  console.log("DONE");
})().catch((e) => {
  console.error("FAIL:", e);
  process.exit(1);
});
