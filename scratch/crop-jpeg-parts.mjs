import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function cropParts() {
  const input = 'public/LOGO-JPEG.jpeg';
  if (!fs.existsSync(input)) {
    console.error('Source LOGO-JPEG.jpeg not found!');
    return;
  }

  const brainDir = 'C:\\Users\\dean valentin\\.gemini\\antigravity\\brain\\a971f7c5-8d4b-4d50-9cdd-5036142583e1';

  try {
    console.log('Loading LOGO-JPEG.jpeg...');
    const image = sharp(input);

    // Part 1: Logo Content (rows 50 to 170)
    await sharp(input)
      .extract({ left: 30, top: 50, width: 280, height: 120 })
      .trim()
      .png()
      .toFile('scratch/jpeg-part1.png');

    await sharp('scratch/jpeg-part1.png')
      .resize(400)
      .toFile(path.join(brainDir, 'jpeg_part1.png'));

    console.log('Saved Part 1 (Logo Content) to scratch/jpeg-part1.png and thumbnail');

    // Part 2: Slogan Content (rows 175 to 230)
    await sharp(input)
      .extract({ left: 30, top: 175, width: 280, height: 60 })
      .trim()
      .png()
      .toFile('scratch/jpeg-part2.png');

    await sharp('scratch/jpeg-part2.png')
      .resize(400)
      .toFile(path.join(brainDir, 'jpeg_part2.png'));

    console.log('Saved Part 2 (Slogan Content) to scratch/jpeg-part2.png and thumbnail');

    // Part 3: Whole Content (rows 50 to 250)
    await sharp(input)
      .extract({ left: 30, top: 50, width: 280, height: 200 })
      .trim()
      .png()
      .toFile('scratch/jpeg-whole.png');

    await sharp('scratch/jpeg-whole.png')
      .resize(400)
      .toFile(path.join(brainDir, 'jpeg_whole.png'));

    console.log('Saved Part 3 (Whole Content) to scratch/jpeg-whole.png and thumbnail');

  } catch (err) {
    console.error('Error cropping parts:', err.message);
  }
}

cropParts();
