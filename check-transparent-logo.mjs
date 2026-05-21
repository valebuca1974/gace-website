import sharp from 'sharp';

async function check() {
  const meta = await sharp('c:\\Users\\dean valentin\\Desktop\\WEB FABRICA DE MALLA\\public\\logo-gace-final-transparent.png').metadata();
  console.log(`Dimensions of transparent logo: ${meta.width}x${meta.height}`);
}

check().catch(console.error);
