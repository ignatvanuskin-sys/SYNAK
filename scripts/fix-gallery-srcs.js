const fs = require("fs");

let s = fs.readFileSync("components/gallery.tsx", "utf8");
s = s.split("workshop-hero.jpg").join("workshop-hero.webp");
s = s.split("body-repair.jpg").join("body-repair.webp");
s = s.split("welding.jpg").join("welding.webp");
s = s.split("metalworking.jpg").join("metalworking.webp");
s = s.split("auto-electronics.jpg").join("auto-repair.webp");
s = s.split("workshop-exterior.jpg").join("workshop-exterior.webp");
fs.writeFileSync("components/gallery.tsx", s);
console.log("gallery srcs -> webp");

let h = fs.readFileSync("components/hero.tsx", "utf8");
if (h.includes("workshop-hero.jpg")) {
  h = h.split("workshop-hero.jpg").join("workshop-hero.webp");
  fs.writeFileSync("components/hero.tsx", h);
  console.log("hero src -> webp");
} else {
  console.log("hero already webp");
}
