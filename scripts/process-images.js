const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const srcDir = "C:\\Users\\Пользователь\\.verdent\\generate_images";
const outDir = path.join(__dirname, "..", "public", "images");

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

/*
 * Соответствие файлов результатам генерации:
 *  generate_20260918_180245_3e87f223.png -> hero (мастерская, осмотр седана)   [batch 1]
 *  generate_20260918_180347_24d8dc54.png -> ремонт вмятины                    [batch 2, 1]
 *  generate_20260918_180347_8feb4fc6_1.png -> сварка                          [batch 2, 2]
 *  generate_20260918_180347_a8aa6a0a_2.png -> металлообработка                [batch 2, 3]
 *  generate_20260918_180347_7d2d71a5_3.png -> автоэлектрика                   [batch 2, 4]
 *  generate_20260918_180424_39a63773.png -> вход с улицы                      [batch 3]
 */
const jobs = [
  { src: "generate_20260918_180245_3e87f223.png", out: "workshop-hero.jpg", width: 1600, height: 1200 },
  { src: "generate_20260918_180347_24d8dc54.png", out: "body-repair.jpg", width: 1280, height: 960 },
  { src: "generate_20260918_180347_8feb4fc6_1.png", out: "welding.jpg", width: 1280, height: 960 },
  { src: "generate_20260918_180347_a8aa6a0a_2.png", out: "metalworking.jpg", width: 1280, height: 960 },
  { src: "generate_20260918_180347_7d2d71a5_3.png", out: "auto-electronics.jpg", width: 1280, height: 960 },
  { src: "generate_20260918_180424_39a63773.png", out: "workshop-exterior.jpg", width: 1600, height: 1200 },
];

(async () => {
  for (const job of jobs) {
    await sharp(path.join(srcDir, job.src))
      .resize(job.width, job.height, { fit: "cover", position: "centre" })
      .jpeg({ quality: 80, progressive: true, mozjpeg: true })
      .toFile(path.join(outDir, job.out));
    console.log("written", job.out);
  }

  // og-image: 1200x630 из hero
  await sharp(path.join(srcDir, "generate_20260918_180245_3e87f223.png"))
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(path.join(__dirname, "..", "public", "og-image.jpg"));
  console.log("written og-image.jpg");
})();
