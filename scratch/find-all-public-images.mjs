import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function listImages() {
  const publicDir = 'public';
  if (!fs.existsSync(publicDir)) {
    console.error('No public folder');
    return;
  }

  const files = fs.readdirSync(publicDir);
  console.log(`All files in public folder:`);
  
  for (const f of files) {
    const fullPath = path.join(publicDir, f);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      console.log(`[DIR] ${f}`);
      continue;
    }
    
    if (f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.svg')) {
      try {
        if (f.endsWith('.svg')) {
          console.log(`[SVG] ${f} - Size: ${stat.size} bytes`);
        } else {
          const meta = await sharp(fullPath).metadata();
          console.log(`[IMG] ${f} - Size: ${stat.size} bytes - Dimensions: ${meta.width}x${meta.height}`);
        }
      } catch (err) {
        console.log(`[IMG] ${f} - Size: ${stat.size} bytes - ERROR: ${err.message}`);
      }
    } else {
      console.log(`[FILE] ${f} - Size: ${stat.size} bytes`);
    }
  }
}

listImages();
