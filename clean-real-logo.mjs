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
      
      const isGrayscale = Math.abs(r - g) < 15 && Math.abs(g - b) < 15 && Math.abs(r - b) < 15;
      const brightness = (r + g + b) / 3;
      
      // Aplicamos un umbral suave para evitar bordes "serruchados" (pixeleados)
      if (isGrayscale && brightness > 180) {
        // Cuanto más blanco, más transparente, pero con transición suave (anti-aliasing)
        const alpha = Math.max(0, Math.min(255, Math.floor((255 - brightness) * (255 / (255 - 180)))));
        data[i+3] = alpha;
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
    .resize({ height: 400, kernel: 'lanczos3' }) // Redimensionado de alta calidad
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(outputPath);

    console.log('Logo procesado con anti-aliasing suavizado.');
  } catch (err) {
    console.error(err);
  }
}

processLogo();
