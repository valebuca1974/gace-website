import sharp from 'sharp';

async function cleanLogo() {
  try {
    const inputPath = 'C:/Users/dean valentin/.gemini/antigravity/brain/af5f6434-a6d8-4aaf-87b2-c49ac49c10aa/.tempmediaStorage/media_af5f6434-a6d8-4aaf-87b2-c49ac49c10aa_1778630315053.png';
    const outputPath = 'public/logo-gace-oficial.png';

    const { data, info } = await sharp(inputPath)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i+1];
      const b = data[i+2];
      
      // Umbral más agresivo para el checkerboard
      // Si el pixel es muy claro (cerca de blanco o gris claro), lo hacemos transparente
      const isVeryLight = r > 180 && g > 180 && b > 180;
      
      if (isVeryLight) {
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

    console.log('Logo procesado con éxito.');
  } catch (err) {
    console.error(err);
  }
}

cleanLogo();
