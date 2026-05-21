import sharp from 'sharp';
import fs from 'fs';

async function checkBorders() {
  const img = 'public/GACE-PNG.png';
  if (!fs.existsSync(img)) {
    console.log(`${img} does not exist`);
    return;
  }

  const { data, info } = await sharp(img)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels;

  // Let's check if the edges have non-transparent pixels
  let topNonTrans = 0;
  let bottomNonTrans = 0;
  let leftNonTrans = 0;
  let rightNonTrans = 0;

  for (let x = 0; x < width; x++) {
    // Top border (y = 0)
    const idxTop = (0 * width + x) * channels;
    const aTop = channels === 4 ? data[idxTop + 3] : 255;
    if (aTop > 0) topNonTrans++;

    // Bottom border (y = height - 1)
    const idxBottom = ((height - 1) * width + x) * channels;
    const aBottom = channels === 4 ? data[idxBottom + 3] : 255;
    if (aBottom > 0) bottomNonTrans++;
  }

  for (let y = 0; y < height; y++) {
    // Left border (x = 0)
    const idxLeft = (y * width + 0) * channels;
    const aLeft = channels === 4 ? data[idxLeft + 3] : 255;
    if (aLeft > 0) leftNonTrans++;

    // Right border (x = width - 1)
    const idxRight = (y * width + (width - 1)) * channels;
    const aRight = channels === 4 ? data[idxRight + 3] : 255;
    if (aRight > 0) rightNonTrans++;
  }

  console.log(`Top border non-transparent pixels: ${topNonTrans} / ${width}`);
  console.log(`Bottom border non-transparent pixels: ${bottomNonTrans} / ${width}`);
  console.log(`Left border non-transparent pixels: ${leftNonTrans} / ${height}`);
  console.log(`Right border non-transparent pixels: ${rightNonTrans} / ${height}`);
}

checkBorders();
