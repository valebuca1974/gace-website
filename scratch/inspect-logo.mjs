import sharp from 'sharp';

async function check() {
  try {
    const meta1 = await sharp('c:\\Users\\dean valentin\\Desktop\\WEB FABRICA DE MALLA\\public\\logo-gace-no-slogan.png').metadata();
    console.log(`logo-gace-no-slogan.png: ${meta1.width}x${meta1.height}`);
  } catch (e) {
    console.error("Error logo-gace-no-slogan.png:", e.message);
  }

  try {
    const meta2 = await sharp('c:\\Users\\dean valentin\\Desktop\\WEB FABRICA DE MALLA\\public\\GACE-PNG.png').metadata();
    console.log(`GACE-PNG.png: ${meta2.width}x${meta2.height}`);
  } catch (e) {
    console.error("Error GACE-PNG.png:", e.message);
  }

  try {
    const meta3 = await sharp('c:\\Users\\dean valentin\\Desktop\\WEB FABRICA DE MALLA\\public\\LOGO-JPEG.jpeg').metadata();
    console.log(`LOGO-JPEG.jpeg: ${meta3.width}x${meta3.height}`);
  } catch (e) {
    console.error("Error LOGO-JPEG.jpeg:", e.message);
  }
}

check();
