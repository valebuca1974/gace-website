import sharp from 'sharp';

async function crop() {
  try {
    const input = 'c:\\Users\\dean valentin\\Desktop\\WEB FABRICA DE MALLA\\public\\logo-gace-no-slogan-hd.png';
    const output = 'c:\\Users\\dean valentin\\Desktop\\WEB FABRICA DE MALLA\\public\\logo-gace-clean.png';
    
    // Bounding Box from previous analysis:
    // minX: 120, maxX: 909 (width = 909 - 120 + 1 = 790)
    // minY: 115, maxY: 722 (height = 722 - 115 + 1 = 608)
    
    const info = await sharp(input)
      .extract({ left: 120, top: 115, width: 790, height: 608 })
      .toFile(output);
      
    console.log(`Successfully cropped logo saved to ${output}`);
    console.log(`Dimensions: ${info.width}x${info.height}`);
  } catch (e) {
    console.error(e);
  }
}

crop();
