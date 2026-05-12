import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const tightDir = join(__dirname, 'public', 'tight');
const webpDir = join(__dirname, 'public', 'tight-webp');

if (!fs.existsSync(webpDir)) {
  fs.mkdirSync(webpDir);
}

async function convert() {
  const files = fs.readdirSync(tightDir).filter(f => f.endsWith('.png'));
  for (const file of files) {
    const inPath = join(tightDir, file);
    const outPath = join(webpDir, file.replace('.png', '.webp'));
    await sharp(inPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(outPath);
    console.log(`✓ Converted: ${file} -> webp`);
  }
}

convert();
