import sharp from 'sharp';
import path from 'path';

const INPUT = 'public/logo-gace-hd.png';
const OUTPUT = 'public/logo-gace-hd-clean.png';

async function cleanLogo() {
  const img = sharp(INPUT);
  const { width, height } = await img.metadata();
  
  // Get raw pixel data
  const { data, info } = await img
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  
  const pixels = new Uint8Array(data);
  const channels = info.channels; // 4 (RGBA)
  
  // The checkered background has two alternating colors:
  // Light gray (~204,204,204) and white (~255,255,255) in a grid pattern
  // We want to make all non-blue pixels transparent
  
  for (let i = 0; i < pixels.length; i += channels) {
    const r = pixels[i];
    const g = pixels[i + 1]; 
    const b = pixels[i + 2];
    
    // Detect checkered background: high brightness, low saturation (grayish/white)
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const lightness = (max + min) / 2;
    const saturation = max === 0 ? 0 : (max - min) / max;
    
    // Background pixels: very low saturation AND high lightness (gray/white)
    // The logo is BLUE so it has high saturation and specific hue
    if (saturation < 0.15 && lightness > 170) {
      // This is background - make transparent
      pixels[i + 3] = 0;
    } else if (saturation < 0.08 && lightness > 140) {
      // Slightly darker gray background
      pixels[i + 3] = 0;
    }
  }
  
  // Write cleaned image
  await sharp(Buffer.from(pixels), {
    raw: {
      width: info.width,
      height: info.height,
      channels: channels,
    }
  })
  .png({ quality: 100 })
  .toFile(OUTPUT);
  
  console.log(`✅ Logo limpio guardado: ${OUTPUT} (${info.width}x${info.height})`);
}

cleanLogo().catch(console.error);
