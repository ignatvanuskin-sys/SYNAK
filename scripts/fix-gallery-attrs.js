const fs = require("fs");

function edit(file, pairs) {
  let s = fs.readFileSync(file, "utf8");
  for (const [from, to] of pairs) {
    if (!s.includes(from)) {
      console.error("NOT FOUND in " + file + ": " + from.slice(0, 80));
      process.exit(1);
    }
    s = s.split(from).join(to);
  }
  fs.writeFileSync(file, s);
  console.log("edited", file);
}

// gallery.tsx — исправить атрибуты lightbox и grid изображений
edit("components/gallery.tsx", [
  ["width={1400}\n              height={1050}", "width={1440}\n              height={1080}"],
  ["width={i === 0 ? 1200 : 800}", "width={i === 0 ? 1440 : 1200}"],
  ["height={i === 0 ? 900 : 600}", "height={i === 0 ? 1080 : 900}"],
]);

console.log("DONE");
