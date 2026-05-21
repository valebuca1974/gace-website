import sharp from 'sharp';
import fs from 'fs';

async function inspectLayout() {
  const p = 'scratch/logo-gace-from-svg.png';
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
  
  console.log(`Inspecting scratch/logo-gace-from-svg.png layout: ${width}x${height}`);
  
  // Let's divide into horizontal slices to see what vertical segments exist
  const rowDensity = [];
  for (let y = 0; y < height; y++) {
    let nonWhiteCount = 0;
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx];
      const g = data[idx+1];
      const b = data[idx+2];
      const a = data[idx+3];
      
      // If not transparent and not white
      if (a > 15 && !(r > 245 && g > 245 && b > 245)) {
        nonWhiteCount++;
      }
    }
    rowDensity.push(nonWhiteCount);
  }
  
  let inContent = false;
  let startY = -1;
  const verticalBlocks = [];
  
  for (let y = 0; y < height; y++) {
    const hasContent = rowDensity[y] > 5;
    if (hasContent && !inContent) {
      inContent = true;
      startY = y;
    } else if (!hasContent && inContent) {
      inContent = false;
      verticalBlocks.push({ start: startY, end: y - 1 });
    }
  }
  if (inContent) {
    verticalBlocks.push({ start: startY, end: height - 1 });
  }
  
  console.log('\nDetected vertical blocks in SVG-rendered logo:');
  verticalBlocks.forEach((block, idx) => {
    console.log(`Block ${idx + 1}: rows ${block.start} to ${block.end} (height: ${block.end - block.start + 1})`);
    
    // Check horizontal span of this block
    let minX = width;
    let maxX = 0;
    for (let y = block.start; y <= block.end; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * channels;
        const r = data[idx];
        const g = data[idx+1];
        const b = data[idx+2];
        const a = data[idx+3];
        if (a > 15 && !(r > 245 && g > 245 && b > 245)) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
        }
      }
    }
    console.log(`  Horizontal span: X = ${minX} to ${maxX} (width: ${maxX - minX})`);
  });
}

inspectLayout();
