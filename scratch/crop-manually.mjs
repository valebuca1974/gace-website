import sharp from 'sharp';
import fs from 'fs';

async function cropManually() {
  const input = 'public/GACE-PNG.png';
  if (!fs.existsSync(input)) {
    console.log('No GACE-PNG.png found');
    return;
  }

  try {
    console.log('Loading GACE-PNG.png...');
    const image = sharp(input);
    const { data, info } = await image
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const width = info.width;
    const height = info.height;
    const channels = 4;

    let minX = width;
    let maxX = 0;
    let minY = height;
    let maxY = 0;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * channels;
        const r = data[idx];
        const g = data[idx+1];
        const b = data[idx+2];
        const a = data[idx+3];

        // We check for pixels that are NOT transparent (alpha > 10)
        // and NOT near white (if they are solid background white, e.g. R, G, B > 250)
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
      console.log('No content found in image!');
      return;
    }

    // Add a tiny padding (e.g. 5 pixels) to not cut off letters
    const padding = 10;
    const cropX = Math.max(0, minX - padding);
    const cropY = Math.max(0, minY - padding);
    const cropWidth = Math.min(width - cropX, (maxX - minX) + 2 * padding);
    const cropHeight = Math.min(height - cropY, (maxY - minY) + 2 * padding);

    console.log(`Bounding Box of Logo Content:`);
    console.log(`  X: ${minX} to ${maxX} (width: ${maxX - minX})`);
    console.log(`  Y: ${minY} to ${maxY} (height: ${maxY - minY})`);
    console.log(`Cropping to:`);
    console.log(`  X: ${cropX}, Y: ${cropY}, Width: ${cropWidth}, Height: ${cropHeight}`);

    await sharp(input)
      .extract({ left: cropX, top: cropY, width: cropWidth, height: cropHeight })
      .toFile('public/gace-trimmed.png', { overwrite: true });

    console.log('Cropped image saved successfully to public/gace-trimmed.png!');

    // Let's check the size and dimensions of the new file
    const meta = await sharp('public/gace-trimmed.png').metadata();
    console.log(`New Dimensions: ${meta.width}x${meta.height}, size=${fs.statSync('public/gace-trimmed.png').size} bytes`);
  } catch (err) {
    console.error('Error during manual cropping:', err.message);
  }
}

cropManually();
