import sharp from 'sharp';

async function processLogo() {
  try {
    const inputPath = 'C:/Users/dean valentin/.gemini/antigravity/brain/af5f6434-a6d8-4aaf-87b2-c49ac49c10aa/media__1778645180440.jpg';
    const outputPath = 'public/logo-gace-oficial.png';

    const { data, info } = await sharp(inputPath)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i+1];
      const b = data[i+2];
      
      // Remover el checkerboard (píxeles blancos o grises claros donde R, G, B son similares)
      const isGrayscale = Math.abs(r - g) < 15 && Math.abs(g - b) < 15 && Math.abs(r - b) < 15;
      const isLight = r > 180 && g > 180 && b > 180;
      
      if (isGrayscale && isLight) {
        data[i+3] = 0; // Transparente
      }
    }

    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    })
    .trim()
    .toFile(outputPath);

    console.log('Logo procesado impecablemente.');
  } catch (err) {
    console.error(err);
  }
}

processLogo();
