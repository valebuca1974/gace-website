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
  
  // Analyze Block 1 (rows 60 to 160)
  let b1_minX = width;
  let b1_maxX = 0;
  for (let y = 60; y <= 160; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx+1];
      const b = data[idx+2];
      if (!(r > 240 && g > 240 && b > 240)) {
        if (x < b1_minX) b1_minX = x;
        if (x > b1_maxX) b1_maxX = x;
      }
    }
  }
  
  // Analyze Block 2 (rows 180 to 220)
  let b2_minX = width;
  let b2_maxX = 0;
  for (let y = 180; y <= 220; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx+1];
      const b = data[idx+2];
      if (!(r > 240 && g > 240 && b > 240)) {
        if (x < b2_minX) b2_minX = x;
        if (x > b2_maxX) b2_maxX = x;
      }
    }
  }
  
  console.log(`Block 1 (Logo Content) horizontal span: X = ${b1_minX} to ${b1_maxX} (width: ${b1_maxX - b1_minX})`);
  console.log(`Block 2 (Slogan Content) horizontal span: X = ${b2_minX} to ${b2_maxX} (width: ${b2_maxX - b2_minX})`);
}

inspectLayout();
