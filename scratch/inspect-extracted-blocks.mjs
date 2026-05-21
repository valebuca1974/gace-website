import sharp from 'sharp';
import fs from 'fs';

async function inspect() {
  const b1 = 'scratch/block-1.png';
  const b2 = 'scratch/block-2.png';
  
  if (fs.existsSync(b1)) {
    const meta = await sharp(b1).metadata();
    console.log(`Block 1 (block-1.png) dimensions: ${meta.width}x${meta.height}`);
    
    // Check horizontal layout of block-1
    const { data, info } = await sharp(b1)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
      
    let minX = info.width;
    let maxX = 0;
    for (let y = 0; y < info.height; y++) {
      for (let x = 0; x < info.width; x++) {
        const idx = (y * info.width + x) * 4;
        if (data[idx+3] > 15 && !(data[idx] > 250 && data[idx+1] > 250 && data[idx+2] > 250)) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
        }
      }
    }
    console.log(`Block 1 Content span: X = ${minX} to ${maxX} (width: ${maxX - minX})`);
  } else {
    console.log('No block-1.png found');
  }

  if (fs.existsSync(b2)) {
    const meta = await sharp(b2).metadata();
    console.log(`Block 2 (block-2.png) dimensions: ${meta.width}x${meta.height}`);
  } else {
    console.log('No block-2.png found');
  }
}

inspect();
