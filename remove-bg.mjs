import sharp from 'sharp';

async function removeBackground() {
  try {
    const inputPath = 'public/logo-gace-final.png';
    const outputPath = 'public/logo-gace-final-transparent.png';

    const { data, info } = await sharp(inputPath)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Recorremos los píxeles y convertimos el blanco en transparencia
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i+1];
      const b = data[i+2];
      
      // Si el píxel es muy cercano al blanco (umbral 240)
      if (r > 240 && g > 240 && b > 240) {
        data[i+3] = 0; // Transparencia total
      }
    }

    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    })
    .trim() // Eliminamos espacios vacíos alrededor
    .toFile(outputPath);

    console.log('Logo procesado con éxito: ' + outputPath);
  } catch (err) {
    console.error('Error procesando el logo:', err);
  }
}

removeBackground();
