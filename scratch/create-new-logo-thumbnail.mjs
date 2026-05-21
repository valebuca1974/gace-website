import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function createThumbnail() {
  const src = 'public/gace-trimmed.png';
  const brainDir = 'C:\\Users\\dean valentin\\.gemini\\antigravity\\brain\\a971f7c5-8d4b-4d50-9cdd-5036142583e1';
  const dest = path.join(brainDir, 'new_cropped_logo.png');

  if (fs.existsSync(src)) {
    try {
      await sharp(src)
        .resize(400)
        .toFile(dest);
      console.log('Thumbnail created: new_cropped_logo.png');
    } catch (err) {
      console.error('Error creating thumbnail:', err.message);
    }
  } else {
    console.log('Source file not found');
  }
}

createThumbnail();
