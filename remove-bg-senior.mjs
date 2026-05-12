import sharp from 'sharp';

async function removeBackground() {
  try {
    const inputPath = 'public/logo-gace-final.png';
    const outputPath = 'public/logo-gace-final-transparent.png';

    const { data, info } = await sharp(inputPath)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Umbral de blanco ajustado para mayor precisión (230-255)
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i+1];
      const b = data[i+2];
      
      if (r > 235 && g > 235 && b > 235) {
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
    .toFile(outputPath);

    console.log('Logo procesado impecablemente: ' + outputPath);
  } catch (err) {
    console.error('Error procesando el logo:', err);
  }
}

removeBackground();
