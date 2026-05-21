import sharp from 'sharp';
import fs from 'fs';

async function analyze() {
  const p = 'scratch/svg-embedded.png';
  if (!fs.existsSync(p)) {
    console.error('File not found');
    return;
  }
  
  const meta = await sharp(p).metadata();
  console.log(`Metadata for extracted image:`);
  console.log(`  Width: ${meta.width}`);
  console.log(`  Height: ${meta.height}`);
  console.log(`  Format: ${meta.format}`);
  console.log(`  Channels: ${meta.channels}`);
  console.log(`  Has Alpha: ${meta.hasAlpha}`);
  
  // Check pixel densities
  const { data, info } = await sharp(p)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
    
  let navyPixels = 0;
  let transparentPixels = 0;
  let whitePixels = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i+1];
    const b = data[i+2];
    const a = data[i+3];
    
    if (a === 0) {
      transparentPixels++;
    } else if (r > 240 && g > 240 && b > 240) {
      whitePixels++;
    } else if (b > 100 && b > r + 30 && b > g + 10) {
      navyPixels++;
    }
  }
  
  console.log(`Pixel analysis:`);
  console.log(`  Navy: ${navyPixels} (${(navyPixels / (info.width * info.height) * 100).toFixed(1)}%)`);
  console.log(`  White: ${whitePixels} (${(whitePixels / (info.width * info.height) * 100).toFixed(1)}%)`);
  console.log(`  Transparent: ${transparentPixels} (${(transparentPixels / (info.width * info.height) * 100).toFixed(1)}%)`);
}

analyze();
