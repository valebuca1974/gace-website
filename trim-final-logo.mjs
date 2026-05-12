import sharp from 'sharp';
import path from 'path';

const logoPath = 'public/logo-gace-final.png';
const outputPath = 'public/logo-gace-final-trimmed.png';

async function processLogo() {
  try {
    await sharp(logoPath)
      .trim()
      .toFile(outputPath);
    console.log('Logo trimmed successfully:', outputPath);
  } catch (error) {
    console.error('Error processing logo:', error);
  }
}

processLogo();
