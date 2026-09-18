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

// hero.tsx — webp + новые размеры
edit("components/hero.tsx", [
  ['src="/images/workshop-hero.jpg"', 'src="/images/workshop-hero.webp"'],
  ["width={1200}\n              height={900}", "width={1440}\n              height={1080}"],
]);

// gallery.tsx — webp + корректный auto-repair.webp
edit("components/gallery.tsx", [
  ["workshop-hero.jpg", "workshop-hero.webp"],
  ["body-repair.jpg", "body-repair.webp"],
  ["welding.jpg", "welding.webp"],
  ["metalworking.jpg", "metalworking.webp"],
  ["auto-electronics.jpg", "auto-repair.webp"],
  ["workshop-exterior.jpg", "workshop-exterior.webp"],
  ["width={1200}\n              height={900}", "width={1440}\n              height={1080}"],
  ["width={i === 0 ? 1200 : 800}\n                    height={i === 0 ? 900 : 600}", "width={i === 0 ? 1440 : 1200}\n                    height={i === 0 ? 1080 : 900}"],
]);

// package.json — современные цели сборки (меньше legacy JS)
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
pkg.browserslist = [
  "chrome >= 87",
  "firefox >= 78",
  "safari >= 14",
  "edge >= 88",
];
fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2) + "\n");
console.log("browserslist added");

console.log("ALL DONE");
