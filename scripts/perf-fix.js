const fs = require("fs");

// 1. Hero анимация — быстрее (250ms), не задерживать первый экран
let s = fs.readFileSync("app/globals.css", "utf8");
if (!s.includes(".fade-up-quick")) {
  s = s.replace(
    "  .fade-up {\n    animation: fadeUp 450ms ease-out both;\n  }",
    "  .fade-up {\n    animation: fadeUp 450ms ease-out both;\n  }\n\n  .fade-up-quick {\n    animation: fadeUp 250ms ease-out both;\n  }"
  );
  fs.writeFileSync("app/globals.css", s);
  console.log("globals.css: fade-up-quick added");
}

// 2. hero.tsx — использовать быструю анимацию для текстовой колонки
let h = fs.readFileSync("components/hero.tsx", "utf8");
h = h.replace('className="fade-up max-w-xl"', 'className="fade-up-quick max-w-xl"');
fs.writeFileSync("components/hero.tsx", h);
console.log("hero.tsx: quick animation");

// 3. lighthouse-run.js — поднимать сжатый сервер
let l = fs.readFileSync("scripts/lighthouse-run.js", "utf8");
l = l.replace(
  'const server = spawn("py", ["-m", "http.server", String(PORT), "--directory", outDir], {\n    stdio: "ignore",\n    detached: true,\n  });',
  'const server = spawn(process.execPath, [require("path").join(__dirname, "static-server.js"), String(PORT)], {\n    stdio: "ignore",\n    detached: true,\n  });'
);
fs.writeFileSync("scripts/lighthouse-run.js", l);
console.log("lighthouse-run.js: compressed server");

// 4. verify.js — тоже сжатый сервер
let v = fs.readFileSync("scripts/verify.js", "utf8");
v = v.replace(
  'const server = spawn("py", ["-m", "http.server", String(PORT), "--directory", outDir], {\n    stdio: "ignore",\n    detached: true,\n  });',
  'const server = spawn(process.execPath, [require("path").join(__dirname, "static-server.js"), String(PORT)], {\n    stdio: "ignore",\n    detached: true,\n  });'
);
fs.writeFileSync("scripts/verify.js", v);
console.log("verify.js: compressed server");

console.log("ALL DONE");
