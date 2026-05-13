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
      
      const isGrayscale = Math.abs(r - g) < 20 && Math.abs(g - b) < 20 && Math.abs(r - b) < 20;
      const isLight = r > 180 && g > 180 && b > 180;
      
      if (isGrayscale && isLight) {
        data[i+3] = 0; 
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
    .sharpen({ sigma: 1, m1: 0, m2: 20 }) // Aumentar nitidez
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(outputPath);

    console.log('Logo procesado con nitidez aumentada.');
  } catch (err) {
    console.error(err);
  }
}

processLogo();
