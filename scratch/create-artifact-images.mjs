import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function createThumbnails() {
  const brainDir = 'C:\\Users\\dean valentin\\.gemini\\antigravity\\brain\\a971f7c5-8d4b-4d50-9cdd-5036142583e1';
  
  const tasks = [
    { src: 'public/GACE-PNG.png', dest: 'logo_gace_png.png', width: 400 },
    { src: 'public/gace-trimmed.png', dest: 'logo_gace_trimmed.png', width: 400 },
    { src: 'public/LOGO-JPEG.jpeg', dest: 'logo_jpeg.png', width: 337 },
    { src: 'dist/gace-trimmed.png', dest: 'dist_gace_trimmed.png', width: 400 }
  ];

  for (const t of tasks) {
    if (fs.existsSync(t.src)) {
      try {
        const destPath = path.join(brainDir, t.dest);
        await sharp(t.src)
          .resize(t.width)
          .toFile(destPath);
        console.log(`Created: ${t.dest}`);
      } catch (err) {
        console.error(`Error on ${t.src}:`, err.message);
      }
    } else {
      console.log(`Source does not exist: ${t.src}`);
    }
  }
}

createThumbnails();
