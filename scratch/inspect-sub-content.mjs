import sharp from 'sharp';
import fs from 'fs';

async function analyzeVerticalDensity() {
  const img = 'public/logo-gace-clean.png';
  if (!fs.existsSync(img)) {
    console.log('No gace-trimmed.png found');
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

    console.log(`Row density analysis (every 10th row, out of ${height} total rows):`);
    for (let y = 0; y < height; y += 10) {
      const bars = '#'.repeat(Math.round(rowDensity[y] / 10));
      console.log(`Row ${y.toString().padStart(3, ' ')}: ${rowDensity[y].toString().padStart(3, ' ')} ${bars}`);
    }

    // Let's find the rows where density drops significantly (valleys)
    // which indicates separate lines of text (like "GACE" and the slogan)
    let inText = false;
    let textBlocks = [];
    let startY = -1;

    for (let y = 0; y < height; y++) {
      const hasText = rowDensity[y] > 5; // more than 5 pixels in the row
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

    console.log('\nDetected vertical text blocks:');
    textBlocks.forEach((block, idx) => {
      console.log(`Block ${idx + 1}: rows ${block.start} to ${block.end} (height: ${block.end - block.start + 1})`);
    });

  } catch (err) {
    console.error('Error during vertical analysis:', err.message);
  }
}

analyzeVerticalDensity();
