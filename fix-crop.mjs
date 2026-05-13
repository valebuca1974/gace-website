import sharp from 'sharp';

async function fixCrop() {
  const img = sharp('public/logo-gace-hd.png');
  const metadata = await img.metadata();
  
  await img.extract({ left: 0, top: 0, width: metadata.width, height: metadata.height - 200 })
           .toFile('public/logo-gace-no-slogan.png');
           
  console.log("Logo cropped successfully!");
}

fixCrop().catch(console.error);
