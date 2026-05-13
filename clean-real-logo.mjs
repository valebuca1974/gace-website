import sharp from 'sharp';

async function processLogo() {
  try {
    const inputPath = 'C:/Users/dean valentin/.gemini/antigravity/brain/af5f6434-a6d8-4aaf-87b2-c49ac49c10aa/media__1778647334953.jpg';
    const outputPath = 'public/logo-gace-oficial.png';

    const { data, info } = await sharp(inputPath)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i+1];
      const b = data[i+2];
      
      // Umbral más permisivo para el gris del checkerboard
      const isGrayscale = Math.abs(r - g) < 25 && Math.abs(g - b) < 25 && Math.abs(r - b) < 25;
      const brightness = (r + g + b) / 3;
      
      // Eliminamos agresivamente cualquier cosa que parezca el fondo (blanco/gris claro)
      if (isGrayscale && brightness > 150) {
        // Transparencia total para el fondo
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
    .resize({ height: 480, kernel: 'lanczos3' })
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(outputPath);

    console.log('Logo procesado con transparencia total y optimización senior.');
  } catch (err) {
    console.error(err);
  }
}

processLogo();
