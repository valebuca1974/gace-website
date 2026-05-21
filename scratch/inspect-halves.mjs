import sharp from 'sharp';
import fs from 'fs';

async function inspect() {
  const img = 'public/logo-gace-clean.png';
  if (!fs.existsSync(img)) {
    console.log('No file');
    return;
  }

  try {
    const { data, info } = await sharp(img)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const width = info.width;
    const height = info.height;

    // Analyze left half (columns 0 to width/2)
    let leftCount = 0;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < Math.floor(width / 2); x++) {
        const idx = (y * width + x) * 4;
        if (data[idx + 3] > 15) leftCount++;
      }
    }

    // Analyze right half (columns width/2 to width)
    let rightCount = 0;
    for (let y = 0; y < height; y++) {
      for (let x = Math.floor(width / 2); x < width; x++) {
        const idx = (y * width + x) * 4;
        if (data[idx + 3] > 15) rightCount++;
      }
    }

    console.log(`Dimensions: ${width}x${height}`);
    console.log(`Left half non-transparent pixels: ${leftCount}`);
    console.log(`Right half non-transparent pixels: ${rightCount}`);

  } catch (e) {
    console.error(e);
  }
}

inspect();
