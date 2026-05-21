import sharp from 'sharp';
import fs from 'fs';

async function analyze() {
  const p = 'public/GACE-PNG.png';
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
  
  console.log(`Analyzing public/GACE-PNG.png: ${width}x${height}`);
  
  // Let's divide the image into 10 vertical slices and count navy/colored pixels
  const sliceHeight = Math.floor(height / 10);
  for (let slice = 0; slice < 10; slice++) {
    const startY = slice * sliceHeight;
    const endY = Math.min(height, (slice + 1) * sliceHeight);
    
    let coloredPixels = 0;
    let minX = width;
    let maxX = 0;
    
    for (let y = startY; y < endY; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * channels;
        const r = data[idx];
        const g = data[idx+1];
        const b = data[idx+2];
        const a = data[idx+3];
        
        // Check if pixel is colored (not white and not transparent)
        if (a > 10 && !(r > 240 && g > 240 && b > 240)) {
          coloredPixels++;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
        }
      }
    }
    
    console.log(`Slice ${slice} (Y: ${startY} to ${endY}):`);
    console.log(`  Colored Pixels: ${coloredPixels}`);
    if (coloredPixels > 0) {
      console.log(`  X Bounding Box: ${minX} to ${maxX} (width: ${maxX - minX})`);
    }
  }
}

analyze();
