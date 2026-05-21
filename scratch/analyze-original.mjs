import sharp from 'sharp';
import fs from 'fs';

async function analyze() {
  const img = 'public/logo-gace-no-slogan.png';
  if (!fs.existsSync(img)) {
    console.log('No public/GACE-PNG.png');
    return;
  }

  try {
    const { data, info } = await sharp(img)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const width = info.width;
    const height = info.height;

    // Check vertical density: how many non-transparent, non-white pixels are in each row
    const rowDensity = [];
    for (let y = 0; y < height; y++) {
      let count = 0;
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const r = data[idx];
        const g = data[idx+1];
        const b = data[idx+2];
        const a = data[idx+3];
        if (a > 15 && !(r > 250 && g > 250 && b > 250)) {
          count++;
        }
      }
      rowDensity.push(count);
    }

    console.log(`Height: ${height}, Width: ${width}`);
    console.log('\nRow density analysis (grouped by 30 rows):');
    for (let y = 0; y < height; y += 30) {
      let sum = 0;
      let count = 0;
      for (let i = y; i < Math.min(height, y + 30); i++) {
        sum += rowDensity[i];
        count++;
      }
      const avg = Math.round(sum / count);
      const bars = '#'.repeat(Math.round(avg / 20));
      console.log(`Rows ${y.toString().padStart(3, ' ')}-${Math.min(height-1, y+29).toString().padStart(3, ' ')}: avg ${avg.toString().padStart(4, ' ')} ${bars}`);
    }

    // Check horizontal density: how many non-transparent, non-white pixels in each col
    const colDensity = [];
    for (let x = 0; x < width; x++) {
      let count = 0;
      for (let y = 0; y < height; y++) {
        const idx = (y * width + x) * 4;
        const r = data[idx];
        const g = data[idx+1];
        const b = data[idx+2];
        const a = data[idx+3];
        if (a > 15 && !(r > 250 && g > 250 && b > 250)) {
          count++;
        }
      }
      colDensity.push(count);
    }

    console.log('\nCol density analysis (grouped by 40 cols):');
    for (let x = 0; x < width; x += 40) {
      let sum = 0;
      let count = 0;
      for (let i = x; i < Math.min(width, x + 40); i++) {
        sum += colDensity[i];
        count++;
      }
      const avg = Math.round(sum / count);
      const bars = '#'.repeat(Math.round(avg / 20));
      console.log(`Cols ${x.toString().padStart(4, ' ')}-${Math.min(width-1, x+39).toString().padStart(4, ' ')}: avg ${avg.toString().padStart(4, ' ')} ${bars}`);
    }

  } catch (err) {
    console.error(err);
  }
}

analyze();
