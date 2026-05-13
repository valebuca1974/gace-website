import sharp from 'sharp';

async function removeSlogan() {
  const img = sharp('public/logo-gace-hd.png');
  const metadata = await img.metadata();
  
  await img.extract({ left: 0, top: 0, width: metadata.width, height: 600 })
           .toFile('public/logo-gace-no-slogan.png');
           
  console.log("Logo cropped successfully!");
}

removeSlogan().catch(console.error);
