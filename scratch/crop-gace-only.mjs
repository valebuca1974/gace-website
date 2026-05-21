import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function cropGaceOnly() {
  const input = 'public/GACE-PNG.png';
  if (!fs.existsSync(input)) {
    console.error('Source GACE-PNG.png not found!');
    return;
  }

  try {
    console.log('Loading GACE-PNG.png to crop only GACE word...');
    const image = sharp(input);
    const { data, info } = await image
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const width = info.width;
    const height = info.height;
    const channels = 4;

    // We know there are two blocks separated vertically.
    // Let's find the bounding box of only the top block (Block 1).
    // From density analysis, the gap starts around Y = 521 and ends around Y = 565.
    // So we only look at pixels above Y = 530.
    const cutoffY = 530;

    let minX = width;
    let maxX = 0;
    let minY = height;
    let maxY = 0;

    for (let y = 0; y < cutoffY; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * channels;
        const r = data[idx];
        const g = data[idx+1];
        const b = data[idx+2];
        const a = data[idx+3];

        const isTransparent = a < 15;
        const isWhite = r > 250 && g > 250 && b > 250;

        if (!isTransparent && !isWhite) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (minX > maxX || minY > maxY) {
      console.error('No logo text content found in top half!');
      return;
    }

    // Add a tiny padding to prevent clipping letters
    const paddingX = 8;
    const paddingY = 8;
    const cropX = Math.max(0, minX - paddingX);
    const cropY = Math.max(0, minY - paddingY);
    const cropWidth = Math.min(width - cropX, (maxX - minX) + 2 * paddingX);
    const cropHeight = Math.min(height - cropY, (maxY - minY) + 2 * paddingY);

    console.log(`GACE Word Bounding Box:`);
    console.log(`  X: ${minX} to ${maxX} (width: ${maxX - minX})`);
    console.log(`  Y: ${minY} to ${maxY} (height: ${maxY - minY})`);
    console.log(`Cropping to:`);
    console.log(`  X: ${cropX}, Y: ${cropY}, Width: ${cropWidth}, Height: ${cropHeight}`);

    // Create the cropped image buffer
    const croppedBuffer = await sharp(input)
      .extract({ left: cropX, top: cropY, width: cropWidth, height: cropHeight })
      .png()
      .toBuffer();

    // List of all files to overwrite in public folder to ensure NO trace of the spool remains
    const outputFiles = [
      'public/gace-trimmed.png',
      'public/logo-gace-oficial-transparent.png',
      'public/logo-gace-oficial.png',
      'public/logo-gace.png',
      'public/logo-gace-final-transparent.png',
      'public/logo-gace-final-trimmed.png',
      'public/logo-gace-oficial-trimmed.png',
      'public/gace.png'
    ];

    for (const f of outputFiles) {
      await sharp(croppedBuffer).toFile(f);
      console.log(`Successfully saved correct trimmed logo to: ${f}`);
    }

    console.log('Finished cropping and overwriting all logo filenames!');
  } catch (err) {
    console.error('Error cropping logo:', err.message);
  }
}

cropGaceOnly();
