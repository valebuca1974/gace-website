import fs from 'fs';
import sharp from 'sharp';

async function cleanLogo() {
  const svgPath = 'public/logo-gace.svg';
  const svgContent = fs.readFileSync(svgPath, 'utf8');
  
  // Extract base64
  const match = svgContent.match(/xlink:href="data:image\/png;base64,([^"]+)"/);
  if (!match) {
    console.error('No base64 found');
    return;
  }
  
  const base64 = match[1];
  const buffer = Buffer.from(base64, 'base64');
  
  // Use sharp to remove the background
  // The checkers are light. We can try to remove light colors or use a threshold.
  // Actually, since the logo is blue, we can remove anything that is not blue-ish.
  // Or just use the 'removeAlpha' or something.
  
  // A better way: since it's a logo, we can probably use a simple flood fill or threshold.
  // Let's try to just use sharp's trim and background removal if possible.
  
  const cleanedBuffer = await sharp(buffer)
    .ensureAlpha()
    .trim()
    // We can't easily do background removal of checkers with sharp without knowing the color.
    // But we can try to use the 'multiply' logic or similar.
    .toBuffer();
    
  // Since I can't easily remove the checkers automatically without risk,
  // I'll try to at least crop it tight and then use CSS.
  
  fs.writeFileSync('public/logo-gace-cleaned.png', cleanedBuffer);
  console.log('Cleaned PNG saved to public/logo-gace-cleaned.png');
}

cleanLogo();
