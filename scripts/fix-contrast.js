// WCAG AA доступные варианты акцента:
//  accent-strong #CC4C0D — кнопки с белым текстом (4.55:1 на белом)
//  accent-text   #B84818 — акцентный текст на светлом фоне (4.8:1 на #F6F4F0)
//  accent-bright #FF8A50 — акцентный текст на тёмном фоне (6.7:1 на #202529)
// Базовый accent #F36B2C остаётся для иконок и декора (>=3:1).
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

// 1. tailwind.config.ts — добавить цвета
edit("tailwind.config.ts", [
  ['"accent-hover": "rgb(var(--color-accent-hover) / <alpha-value>)",',
   '"accent-hover": "rgb(var(--color-accent-hover) / <alpha-value>)",\n        "accent-strong": "rgb(var(--color-accent-strong) / <alpha-value>)",\n        "accent-text": "rgb(var(--color-accent-text) / <alpha-value>)",\n        "accent-bright": "rgb(var(--color-accent-bright) / <alpha-value>)",'],
]);

// 2. globals.css — переменные + классы
edit("app/globals.css", [
  ["--color-error: 201 75 67; /* #C94B43 */",
   "--color-accent-strong: 204 76 13; /* #CC4C0D — кнопки с белым текстом */\n  --color-accent-text: 184 72 24; /* #B84818 — акцентный текст на светлом */\n  --color-accent-bright: 255 138 80; /* #FF8A50 — акцентный текст на тёмном */\n  --color-error: 201 75 67; /* #C94B43 */"],
  [".btn-primary {\n    @apply bg-accent text-white hover:bg-accent-hover active:translate-y-px;\n  }",
   ".btn-primary {\n    @apply bg-accent-strong text-white hover:bg-accent-text active:translate-y-px;\n  }"],
  [".section-label {\n    @apply mb-3 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wider text-accent;\n  }",
   ".section-label {\n    @apply mb-3 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wider text-accent-text;\n  }"],
]);

// 3. header.tsx — hover телефона
edit("components/header.tsx", [
  ['hover:text-accent xl:block"', 'hover:text-accent-text xl:block"'],
]);

// 4. hero.tsx — метка и ссылка
edit("components/hero.tsx", [
  ['text-[13px] font-semibold uppercase tracking-wider text-accent md:text-[14px]', 'text-[13px] font-semibold uppercase tracking-wider text-accent-text md:text-[14px]'],
  ['font-semibold text-accent transition-colors hover:text-accent-hover"', 'font-semibold text-accent-text transition-colors hover:text-ink"'],
]);

// 5. gallery.tsx — ссылки
edit("components/gallery.tsx", [
  ['font-semibold text-accent transition-colors lg:col-start-4', 'font-semibold text-accent-text transition-colors hover:text-ink lg:col-start-4'],
]);

// 6. faq.tsx — ссылки
edit("components/faq.tsx", [
  ['font-semibold text-accent transition-colors hover:text-accent-hover"', 'font-semibold text-accent-text transition-colors hover:text-ink"'],
  ['text-accent underline underline-offset-2 transition-colors hover:text-accent-hover"', 'text-accent-text underline underline-offset-2 transition-colors hover:text-ink"'],
]);

// 7. footer.tsx — hover ссылок
edit("components/footer.tsx", [
  ['transition-colors hover:text-accent"', 'transition-colors hover:text-accent-text"'],
  ['transition-colors hover:text-accent"', 'transition-colors hover:text-accent-text"'],
]);

// 8. blocks.tsx (Process) — метка и номера на тёмном фоне
edit("components/blocks.tsx", [
  ['<p className="section-label text-accent">', '<p className="section-label text-accent-bright">'],
  ['font-extrabold leading-none text-accent"', 'font-extrabold leading-none text-accent-bright"'],
]);

// 9. contacts.tsx — метка на тёмном фоне
edit("components/contacts.tsx", [
  ['<p className="section-label text-accent">', '<p className="section-label text-accent-bright">'],
]);

// 10. services.tsx — телефон в подписи
edit("components/services.tsx", [
  ['font-semibold text-accent transition-colors hover:text-accent-hover"', 'font-semibold text-accent-text transition-colors hover:text-ink"'],
]);

console.log("ALL DONE");
