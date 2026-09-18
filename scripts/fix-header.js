const fs = require("fs");

function edit(file, pairs) {
  let s = fs.readFileSync(file, "utf8");
  for (const [from, to] of pairs) {
    if (!s.includes(from)) {
      console.error("NOT FOUND in " + file + ": " + from.slice(0, 70));
      process.exit(1);
    }
    s = s.split(from).join(to);
  }
  fs.writeFileSync(file, s);
  console.log("edited", file);
}

// backdrop-filter создаёт containing block для position:fixed потомков,
// из-за чего off-canvas меню позиционировалось относительно 64px header.
// Заменяем полупрозрачный фон + blur на непрозрачный.
edit("components/header.tsx", [
  ["bg-surface/95 backdrop-blur-sm", "bg-surface"],
]);

edit("components/mobile-cta.tsx", [
  ["bg-surface/95 backdrop-blur-sm", "bg-surface"],
]);

console.log("DONE");
