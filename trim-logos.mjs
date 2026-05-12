import sharp from 'sharp';

async function trimLogos() {
  try {
    console.log("Trimming gace.png...");
    await sharp('public/gace.png').trim().toFile('public/gace-trimmed.png');
    console.log("Trimming logo-gace-oficial.png...");
    await sharp('public/logo-gace-oficial.png').trim().toFile('public/logo-gace-oficial-trimmed.png');
    console.log("Done trimming logos!");
  } catch (err) {
    console.error("Error:", err);
  }
}

trimLogos();
