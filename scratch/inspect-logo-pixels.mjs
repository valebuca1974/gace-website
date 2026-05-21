import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function analyze() {
  const folders = ['public', 'dist'];
  
  for (const folder of folders) {
    if (!fs.existsSync(folder)) continue;
    const files = fs.readdirSync(folder).filter(f => f.toLowerCase().includes('logo') || f.toLowerCase().includes('gace'));
    
    for (const file of files) {
      const img = path.join(folder, file);
      if (fs.statSync(img).isDirectory()) continue;
      if (file.endsWith('.svg')) {
        console.log(`${img}: SVG file, size=${fs.statSync(img).size}`);
        continue;
      }
      try {
        const { data, info } = await sharp(img)
          .raw()
          .toBuffer({ resolveWithObject: true });

        let navyPixels = 0;
        let whitePixels = 0;
        let transparentPixels = 0;

        for (let i = 0; i < data.length; i += info.channels) {
          const r = data[i];
          const g = data[i+1];
          const b = data[i+2];
          const a = info.channels === 4 ? data[i+3] : 255;

          if (a === 0) {
            transparentPixels++;
          } else if (r > 240 && g > 240 && b > 240) {
            whitePixels++;
          } else if (b > 100 && b > r + 30 && b > g + 10) {
            navyPixels++;
          }
        }

        const total = info.width * info.height;
        console.log(`${img}:`);
        console.log(`  Dimensions: ${info.width}x${info.height}`);
        console.log(`  Navy: ${navyPixels} (${(navyPixels/total*100).toFixed(1)}%)`);
        console.log(`  White: ${whitePixels} (${(whitePixels/total*100).toFixed(1)}%)`);
        console.log(`  Transparent: ${transparentPixels} (${(transparentPixels/total*100).toFixed(1)}%)`);
        console.log(`  Size: ${fs.statSync(img).size} bytes`);
      } catch (err) {
        console.log(`${img}: ERROR: ${err.message}`);
      }
    }
  }
}

analyze();
