import sharp from 'sharp';

async function check() {
  try {
    const img = sharp('c:\\Users\\dean valentin\\Desktop\\WEB FABRICA DE MALLA\\public\\GACE-PNG.png');
    const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
    
    let hasTransparent = false;
    let transparentCount = 0;
    
    if (info.channels === 4) {
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] < 255) {
          hasTransparent = true;
          transparentCount++;
        }
      }
    }
    
    console.log(`GACE-PNG.png - channels: ${info.channels}, hasTransparent: ${hasTransparent}, transparentCount: ${transparentCount} out of ${info.width * info.height}`);
  } catch (e) {
    console.error(e);
  }
}

check();
