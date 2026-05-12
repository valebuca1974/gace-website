import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pubDir = join(__dirname, 'public');
const outDir = join(pubDir, 'webp-trimmed'); 

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

// THE IMPECCABLE COLLECTION - Pure product focus
const crops = [
  { src: 'catalog-page-2.png', out: 'CATÁLOGO GACE-2-0.webp', left: 140, top: 880, width: 680, height: 650 },
  { src: 'catalog-page-3.png', out: 'CATÁLOGO GACE-3-0.webp', left: 130, top: 460, width: 500, height: 480 },
  { src: 'catalog-page-4.png', out: 'CATÁLOGO GACE-4-0.webp', left: 650, top: 900, width: 850, height: 650 },
  { src: 'catalog-page-4.png', out: 'CATÁLOGO GACE-5-0.webp', left: 100, top: 620, width: 1450, height: 400 },
  { src: 'catalog-page-5.png', out: 'CATÁLOGO GACE-6-0.webp', left: 140, top: 300, width: 350, height: 1300 },
  { src: 'catalog-page-6.png', out: 'CATÁLOGO GACE-7-0.webp', left: 880, top: 380, width: 650, height: 500 },
  { src: 'catalog-page-6.png', out: 'CATÁLOGO GACE-8-0.webp', left: 100, top: 1350, width: 650, height: 550 },
  { src: 'catalog-page-7.png', out: 'CATÁLOGO GACE-11-0.webp', left: 120, top: 580, width: 1400, height: 350 },
  { src: 'catalog-page-7.png', out: 'CATÁLOGO GACE-12-0.webp', left: 520, top: 1420, width: 1050, height: 600 },
  { src: 'catalog-page-8.png', out: 'CATÁLOGO GACE-13-0.webp', left: 520, top: 280, width: 650, height: 700 },
  { src: 'catalog-page-8.png', out: 'CATÁLOGO GACE-15-0.webp', left: 100, top: 1450, width: 1450, height: 600 }
];

async function cropImages() {
  console.log("Generating IMPECCABLE assets...");
  for (const crop of crops) {
    const srcPath = join(pubDir, crop.src);
    const outPath = join(outDir, crop.out);
    if (!fs.existsSync(srcPath)) continue;
    try {
      await sharp(srcPath)
        .extract({ left: Math.round(crop.left), top: Math.round(crop.top), width: Math.round(crop.width), height: Math.round(crop.height) })
        .webp({ quality: 100, lossless: true })
        .toFile(outPath);
      console.log(`✓ ${crop.out}`);
    } catch (err) { console.error(`✗ ${crop.out}: ${err.message}`); }
  }
  console.log("IMPECCABLE ASSETS READY.");
}

cropImages();
