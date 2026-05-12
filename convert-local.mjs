import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const inDir = path.join(__dirname, 'public', 'imagenes gace');
const outDir = path.join(__dirname, 'public', 'webp');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function convertImages() {
  try {
    const files = fs.readdirSync(inDir).filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.png'));
    
    console.log(`Found ${files.length} images to convert using Sharp...`);

    for (const file of files) {
      const inPath = path.join(inDir, file);
      const filenameBase = path.basename(file, path.extname(file));
      const outPath = path.join(outDir, `${filenameBase}.webp`);
      
      await sharp(inPath)
        .webp({ quality: 85 })
        .toFile(outPath);
        
      console.log(`✓ Saved ${filenameBase}.webp`);
    }
    
    console.log(`\nSuccess! All images converted locally.`);
  } catch (err) {
    console.error("Error converting images:", err.message);
  }
}

convertImages();
