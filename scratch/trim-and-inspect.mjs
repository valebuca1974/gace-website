import sharp from 'sharp';

async function process() {
  try {
    const input = 'c:\\Users\\dean valentin\\Desktop\\WEB FABRICA DE MALLA\\public\\logo-gace-no-slogan.png';
    const output = 'c:\\Users\\dean valentin\\Desktop\\WEB FABRICA DE MALLA\\public\\logo-gace-no-slogan-trimmed.png';
    
    const info = await sharp(input)
      .trim()
      .toFile(output);
      
    console.log(`Trimmed logo-gace-no-slogan-trimmed.png dimensions: ${info.width}x${info.height}`);
  } catch (e) {
    console.error(e);
  }
}

process();
