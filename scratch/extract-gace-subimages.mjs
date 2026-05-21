import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function extractBlocks() {
  const input = 'public/GACE-PNG.png';
  if (!fs.existsSync(input)) {
    console.log('No GACE-PNG.png');
    return;
  }

  const brainDir = 'C:\\Users\\dean valentin\\.gemini\\antigravity\\brain\\a971f7c5-8d4b-4d50-9cdd-5036142583e1';

  try {
    // Block 1: GACE text (Y: 115 to 521, X: 121 to 908)
    const padding = 10;
    const b1_x = Math.max(0, 121 - padding);
    const b1_y = Math.max(0, 115 - padding);
    const b1_w = Math.min(1098 - b1_x, 787 + 2 * padding);
    const b1_h = Math.min(908 - b1_y, 406 + 2 * padding);

    await sharp(input)
      .extract({ left: b1_x, top: b1_y, width: b1_w, height: b1_h })
      .toFile('scratch/block-1.png');

    await sharp('scratch/block-1.png')
      .resize(400)
      .toFile(path.join(brainDir, 'block_1.png'));

    console.log('Saved Block 1 to scratch/block-1.png and thumbnail');

    // Block 2: Slogan (Y: 565 to 722, X: 121 to 908)
    const b2_x = Math.max(0, 121 - padding);
    const b2_y = Math.max(0, 565 - padding);
    const b2_w = Math.min(1098 - b2_x, 787 + 2 * padding);
    const b2_h = Math.min(908 - b2_y, 157 + 2 * padding);

    await sharp(input)
      .extract({ left: b2_x, top: b2_y, width: b2_w, height: b2_h })
      .toFile('scratch/block-2.png');

    await sharp('scratch/block-2.png')
      .resize(400)
      .toFile(path.join(brainDir, 'block_2.png'));

    console.log('Saved Block 2 to scratch/block-2.png and thumbnail');

  } catch (err) {
    console.error('Error extracting blocks:', err.message);
  }
}

extractBlocks();
