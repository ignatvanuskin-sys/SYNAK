const fs = require("fs");

function edit(file, pairs) {
  let s = fs.readFileSync(file, "utf8");
  for (const [from, to] of pairs) {
    if (!s.includes(from)) {
      console.error("NOT FOUND in " + file + ": " + from.slice(0, 60));
      process.exit(1);
    }
    s = s.split(from).join(to);
  }
  fs.writeFileSync(file, s);
  console.log("edited", file);
}

// gallery.tsx — ссылка (исправленный матч)
edit("components/gallery.tsx", [
  ["font-semibold text-accent lg:col-start-4", "font-semibold text-accent-text hover:text-ink lg:col-start-4"],
]);

// footer.tsx — hover ссылок (2 вхождения через join)
edit("components/footer.tsx", [
  ['transition-colors hover:text-accent"', 'transition-colors hover:text-accent-text"'],
]);

// blocks.tsx (Process) — метка и номера на тёмном фоне
edit("components/blocks.tsx", [
  ['<p className="section-label text-accent">', '<p className="section-label text-accent-bright">'],
  ['font-extrabold leading-none text-accent"', 'font-extrabold leading-none text-accent-bright"'],
]);

// contacts.tsx — метка на тёмном фоне
edit("components/contacts.tsx", [
  ['<p className="section-label text-accent">', '<p className="section-label text-accent-bright">'],
]);

// services.tsx — телефон в подписи
edit("components/services.tsx", [
  ['font-semibold text-accent transition-colors hover:text-accent-hover"', 'font-semibold text-accent-text transition-colors hover:text-ink"'],
]);

// faq.tsx — ссылки
edit("components/faq.tsx", [
  ['font-semibold text-accent transition-colors hover:text-accent-hover"', 'font-semibold text-accent-text transition-colors hover:text-ink"'],
  ['text-accent underline underline-offset-2 transition-colors hover:text-accent-hover"', 'text-accent-text underline underline-offset-2 transition-colors hover:text-ink"'],
]);

console.log("ALL DONE");
