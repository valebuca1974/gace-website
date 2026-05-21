import sharp from 'sharp';
import fs from 'fs';

async function analyzeOldTrimmed() {
  const img = 'C:\\Users\\dean valentin\\.gemini\\antigravity\\brain\\a971f7c5-8d4b-4d50-9cdd-5036142583e1\\dist_gace_trimmed.png';
  if (!fs.existsSync(img)) {
    console.log('No dist_gace_trimmed.png found');
    return;
  }

  try {
    const { data, info } = await sharp(img)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const width = info.width;
    const height = info.height;
    const channels = 4;

    const rowDensity = [];
    for (let y = 0; y < height; y++) {
      let navyCount = 0;
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * channels;
        const r = data[idx];
        const g = data[idx+1];
        const b = data[idx+2];
        const a = data[idx+3];

        if (a > 15 && b > 100 && b > r + 30 && b > g + 10) {
          navyCount++;
        }
      }
      rowDensity.push(navyCount);
    }

    let inText = false;
    let textBlocks = [];
    let startY = -1;

    for (let y = 0; y < height; y++) {
      const hasText = rowDensity[y] > 2; // more than 2 pixels in the row
      if (hasText && !inText) {
        inText = true;
        startY = y;
      } else if (!hasText && inText) {
        inText = false;
        textBlocks.push({ start: startY, end: y - 1 });
      }
    }
    if (inText) {
      textBlocks.push({ start: startY, end: height - 1 });
    }

    console.log('Detected vertical text blocks in old dist_gace_trimmed.png:');
    textBlocks.forEach((block, idx) => {
      console.log(`Block ${idx + 1}: rows ${block.start} to ${block.end} (height: ${block.end - block.start + 1})`);
    });

  } catch (err) {
    console.error('Error during vertical analysis:', err.message);
  }
}

analyzeOldTrimmed();
