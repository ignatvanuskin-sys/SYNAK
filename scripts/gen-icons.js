// Генерация PNG-фоллбеков favicon из favicon.svg (шarp рендерит SVG).
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const svgPath = path.join(__dirname, "..", "public", "favicon.svg");

(async () => {
  await sharp(svgPath, { density: 300 })
    .resize(32, 32)
    .png()
    .toFile(path.join(__dirname, "..", "public", "favicon-32.png"));
  console.log("favicon-32.png");

  await sharp(svgPath, { density: 300 })
    .resize(180, 180)
    .png()
    .toFile(path.join(__dirname, "..", "public", "apple-touch-icon.png"));
  console.log("apple-touch-icon.png");
})();
