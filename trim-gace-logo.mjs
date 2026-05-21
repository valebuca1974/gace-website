import sharp from 'sharp';

async function trimLogo() {
  try {
    const inputPath = 'public/GACE-PNG.png';
    const outputPath = 'public/gace-trimmed.png';

    await sharp(inputPath)
      .trim()
      .toFile(outputPath);

    console.log('Logo recortado con éxito.');
  } catch (err) {
    console.error('Error al recortar el logo:', err);
  }
}

trimLogo();
