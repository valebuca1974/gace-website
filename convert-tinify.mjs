import tinify from 'tinify';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Set API Key
tinify.key = "968931ece8f45b8a4b0481e06aeed82b";

const inDir = path.join(__dirname, 'public', 'imagenes gace');
const outDir = path.join(__dirname, 'public', 'webp');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function convertImages() {
  try {
    const files = fs.readdirSync(inDir).filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.png'));
    
    console.log(`Found ${files.length} images to convert using Tinify...`);

    for (const file of files) {
      const inPath = path.join(inDir, file);
      const filenameBase = path.basename(file, path.extname(file));
      const outPath = path.join(outDir, `${filenameBase}.webp`);
      
      console.log(`Converting ${file}...`);
      await new Promise((resolve, reject) => {
        tinify.fromFile(inPath)
          .convert({ type: ["image/webp"] })
          .toFile(outPath, (err) => {
            if (err) return reject(err);
            console.log(`✓ Saved ${filenameBase}.webp`);
            resolve();
          });
      });
    }
    
    console.log(`\nSuccess! Validated against Tinify API. Compressions this month: ${tinify.compressionCount}`);
  } catch (err) {
    console.error("Error converting images:", err.message);
  }
}

convertImages();
