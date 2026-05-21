import sharp from 'sharp';
import fs from 'fs';

async function inspectLayout() {
  const p = 'public/gace-trimmed.png';
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
  
  console.log(`Inspecting public/gace-trimmed.png layout: ${width}x${height}`);
  
  // Let's count how many non-transparent pixels we have in each column
  const colDensity = [];
  for (let x = 0; x < width; x++) {
    let coloredCount = 0;
    for (let y = 0; y < height; y++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx+1];
      const b = data[idx+2];
      const a = data[idx+3];
      
      if (a > 15 && !(r > 250 && g > 250 && b > 250)) {
        coloredCount++;
      }
    }
    colDensity.push(coloredCount);
  }
  
  // Find continuous segments of content
  let inContent = false;
  let startX = -1;
  const segments = [];
  
  for (let x = 0; x < width; x++) {
    const hasContent = colDensity[x] > 2; // more than 2 pixels in the column
    if (hasContent && !inContent) {
      inContent = true;
      startX = x;
    } else if (!hasContent && inContent) {
      inContent = false;
      segments.push({ start: startX, end: x - 1 });
    }
  }
  if (inContent) {
    segments.push({ start: startX, end: width - 1 });
  }
  
  console.log('\nDetected horizontal content segments:');
  segments.forEach((seg, idx) => {
    console.log(`Segment ${idx + 1}: cols ${seg.start} to ${seg.end} (width: ${seg.end - seg.start + 1})`);
  });
}

inspectLayout();
