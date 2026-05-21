import sharp from 'sharp';
import fs from 'fs';

async function processLogo() {
  const inputPath = 'C:\\Users\\dean valentin\\.gemini\\antigravity\\brain\\3f883ada-7693-46bf-b62c-8e55ad03a4f4\\.tempmediaStorage\\media_3f883ada-7693-46bf-b62c-8e55ad03a4f4_1779089688948.jpg';
  
  if (!fs.existsSync(inputPath)) {
    console.error('Input file does not exist:', inputPath);
    return;
  }
  
  console.log('Processing correct logo from:', inputPath);
  
  // Read image
  const image = sharp(inputPath);
  
  // We want to make all near-white pixels transparent.
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
    
  // Loop through pixels and make white transparent
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i+1];
    const b = data[i+2];
    
    // If pixel is near white (R, G, B > 245)
    if (r > 245 && g > 245 && b > 245) {
      data[i+3] = 0; // Alpha = 0 (transparent)
    }
  }
  
  // Save transparent PNG
  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  })
  .trim() // Crop extra transparent borders
  .png()
  .toFile('c:\\Users\\dean valentin\\Desktop\\WEB FABRICA DE MALLA\\public\\logo-gace-final-transparent.png');
  
  console.log('Transparent logo saved successfully to public/logo-gace-final-transparent.png');
}

processLogo().catch(console.error);
