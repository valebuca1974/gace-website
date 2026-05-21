import sharp from 'sharp';
import fs from 'fs';

async function crop() {
  try {
    const input = 'c:\\Users\\dean valentin\\Desktop\\WEB FABRICA DE MALLA\\public\\logo-gace-no-slogan-hd.png';
    const output = 'c:\\Users\\dean valentin\\Desktop\\WEB FABRICA DE MALLA\\public\\logo-gace-clean.png';
    
    if (!fs.existsSync(input)) {
      console.error(`Input file not found at ${input}`);
      return;
    }

    // Crop ONLY the first block (spools + GACE wordmark)
    // minX: 120, maxX: 909 (width = 790)
    // minY: 115, maxY: 522 (height = 408)
    const info = await sharp(input)
      .extract({ left: 120, top: 115, width: 790, height: 408 })
      .toFile(output);
      
    console.log(`Successfully cropped logo saved to ${output}`);
    console.log(`Dimensions: ${info.width}x${info.height}`);
  } catch (e) {
    console.error(e);
  }
}

crop();
