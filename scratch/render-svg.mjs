import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function renderSvg() {
  const src = 'public/logo-gace.svg';
  const dest = 'scratch/logo-gace-from-svg.png';
  const brainDir = 'C:\\Users\\dean valentin\\.gemini\\antigravity\\brain\\a971f7c5-8d4b-4d50-9cdd-5036142583e1';
  const destThumb = path.join(brainDir, 'svg_logo.png');

  if (!fs.existsSync(src)) {
    console.log('No logo-gace.svg found');
    return;
  }

  try {
    console.log('Rendering SVG...');
    await sharp(src)
      .resize(800) // render at a readable resolution
      .toFile(dest);
    console.log('Saved rendered SVG to scratch/logo-gace-from-svg.png');

    await sharp(dest)
      .resize(400)
      .toFile(destThumb);
    console.log('Saved SVG thumbnail to brain folder');
  } catch (err) {
    console.error('Error rendering SVG:', err.message);
  }
}

renderSvg();
