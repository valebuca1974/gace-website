import sharp from 'sharp';
import fs from 'fs';

async function inspectLayout() {
  const p = 'public/LOGO-JPEG.jpeg';
  if (!fs.existsSync(p)) {
    console.error('File not found');
    return;
  }
  
  const { data, info } = await sharp(p)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
    
  const width = info.width;
  const height = info.height;
  const channels = 4;
  
  console.log(`Inspecting public/LOGO-JPEG.jpeg layout: ${width}x${height}`);
  
  // Find bounding box of all non-white pixels
  let minX = width;
  let maxX = 0;
  let minY = height;
  let maxY = 0;
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx+1];
      const b = data[idx+2];
      
      const isWhite = r > 240 && g > 240 && b > 240;
      if (!isWhite) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  
  console.log(`Content bounding box in JPEG:`);
  console.log(`  X: ${minX} to ${maxX} (width: ${maxX - minX})`);
  console.log(`  Y: ${minY} to ${maxY} (height: ${maxY - minY})`);
  
  // Let's divide into vertical segments
  const rowDensity = [];
  for (let y = 0; y < height; y++) {
    let nonWhiteCount = 0;
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx+1];
      const b = data[idx+2];
      if (!(r > 240 && g > 240 && b > 240)) {
        nonWhiteCount++;
      }
    }
    rowDensity.push(nonWhiteCount);
  }
  
  console.log('\nRow density in JPEG (every 10th row):');
  for (let y = 0; y < height; y += 10) {
    const bars = '#'.repeat(Math.round(rowDensity[y] / 5));
    console.log(`Row ${y.toString().padStart(3, ' ')}: ${rowDensity[y].toString().padStart(3, ' ')} ${bars}`);
  }
}

inspectLayout();
