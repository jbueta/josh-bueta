#!/usr/bin/env node
/**
 * Converts the certificate scans and the avatar to WebP so the site ships
 * ~10x smaller images:
 *
 *   node scripts/optimize-images.mjs
 *
 * Certificate PDFs are left untouched — they stay downloadable originals.
 */
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const CERT_DIR = "public/certifications";
const CERT_WIDTH = 1400; // displayed at <= 1024 CSS px, 1400 covers 1.4dpr
const AVATAR = { input: "public/avatar-manga.jpg", width: 1024, quality: 82 };

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

async function convert(input, output, width, quality) {
  await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 5 })
    .toFile(output);
  const [before, after] = await Promise.all([
    stat(input).then((s) => s.size),
    stat(output).then((s) => s.size),
  ]);
  const meta = await sharp(output).metadata();
  console.log(
    `${path.basename(output)}: ${kb(before)} -> ${kb(after)} (${meta.width}x${meta.height})`,
  );
}

const certs = (await readdir(CERT_DIR)).filter((f) => f.endsWith(".png"));
for (const file of certs) {
  await convert(
    path.join(CERT_DIR, file),
    path.join(CERT_DIR, file.replace(/\.png$/, ".webp")),
    CERT_WIDTH,
    80,
  );
}

await convert(
  AVATAR.input,
  AVATAR.input.replace(/\.jpg$/, ".webp"),
  AVATAR.width,
  AVATAR.quality,
);
