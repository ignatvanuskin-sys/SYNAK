// Конвертация фото в WebP для perf (hero — LCP элемент).
// og-image.jpg остаётся JPG для соцсетей.
const path = require("path");
const sharp = require("sharp");
const srcDir = "C:\\Users\\Пользователь\\.verdent\\generate_images";

const jobs = [
  { src: "generate_20260918_180245_3e87f223.png", out: "workshop-hero.webp", width: 1440, height: 1080, q: 78 },
  { src: "generate_20260918_180347_24d8dc54.png", out: "body-repair.webp", width: 1200, height: 900, q: 76 },
  { src: "generate_20260918_180347_8feb4fc6_1.png", out: "welding.webp", width: 1200, height: 900, q: 76 },
  { src: "generate_20260918_180347_a8aa6a0a_2.png", out: "metalworking.webp", width: 1200, height: 900, q: 76 },
  { src: "generate_20260918_180347_7d2d71a5_3.png", out: "auto-repair.webp", width: 1200, height: 900, q: 76 },
  { src: "generate_20260918_180424_39a63773.png", out: "workshop-exterior.webp", width: 1440, height: 1080, q: 78 },
];

(async () => {
  for (const j of jobs) {
    await sharp(path.join(srcDir, j.src))
      .resize(j.width, j.height, { fit: "cover", position: "centre" })
      .webp({ quality: j.q, effort: 5 })
      .toFile(path.join(__dirname, "..", "public", "images", j.out));
    console.log("written", j.out);
  }
  // Размеры для отчёта
  const fs = require("fs");
  for (const j of jobs) {
    const s = fs.statSync(path.join(__dirname, "..", "public", "images", j.out));
    console.log(j.out, Math.round(s.size / 1024) + " KB");
  }
})();
