import fs from "fs";
import path from "path";

async function ensureSharp() {
  try {
    return (await import("sharp")).default;
  } catch (error) {
    console.error(
      '[assets:convert] Missing "sharp". Install it with: npm i -D sharp',
      error,
    );
    process.exitCode = 1;
    process.exit(1);
  }
}

const ROOT = process.cwd();
const imagesDir = path.join(ROOT, "public", "images");
const targets = [
  "pic01.jpg",
  "pic02.jpg",
  "pic03.jpg",
  "pic04.jpg",
  "pic05.jpg",
  "pic06.jpg",
];

const run = async () => {
  const sharp = await ensureSharp();
  for (const file of targets) {
    const srcPath = path.join(imagesDir, file);
    if (!fs.existsSync(srcPath)) {
      console.warn(`[assets:convert] Skip missing ${file}`);
      continue;
    }
    const base = path.parse(srcPath).name;
    const outWebp = path.join(imagesDir, `${base}.webp`);
    const outAvif = path.join(imagesDir, `${base}.avif`);
    const buf = fs.readFileSync(srcPath);
    await sharp(buf)
      .resize({ width: 96, height: 96, fit: "cover" })
      .webp({ quality: 80 })
      .toFile(outWebp);
    await sharp(buf)
      .resize({ width: 96, height: 96, fit: "cover" })
      .avif({ quality: 50 })
      .toFile(outAvif);
    console.log(
      `[assets:convert] Created ${path.basename(outWebp)} and ${path.basename(outAvif)}`,
    );
  }
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
