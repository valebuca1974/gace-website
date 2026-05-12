import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const inDir = path.join(__dirname, 'public', 'webp');
const outDir = path.join(__dirname, 'public', 'webp-trimmed');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function trimImages() {
  try {
    const files = fs.readdirSync(inDir).filter(f => f.toLowerCase().endsWith('.webp'));
    
    console.log(`Found ${files.length} images to trim...`);

    for (const file of files) {
      const inPath = path.join(inDir, file);
      const outPath = path.join(outDir, file);
      
      // We trim twice just in case. sharp.trim() defaults to top-left pixel.
      // If there's a complex border, it might not be perfect, but threshold helps.
      await sharp(inPath)
        .trim({ threshold: 15 }) // Trim borders (black or white)
        .toFile(outPath);
        
      console.log(`✓ Trimmed ${file}`);
    }
    
    console.log(`\nSuccess! All images trimmed.`);
  } catch (err) {
    console.error("Error trimming images:", err.message);
  }
}

trimImages();
