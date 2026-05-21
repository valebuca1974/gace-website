import sharp from 'sharp';

async function findFullBounds() {
  try {
    const img = sharp('c:\\Users\\dean valentin\\Desktop\\WEB FABRICA DE MALLA\\public\\logo-gace-no-slogan-hd.png');
    const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
    
    let minX = info.width;
    let maxX = 0;
    let minY = info.height;
    let maxY = 0;
    
    for (let y = 0; y < info.height; y++) {
      for (let x = 0; x < info.width; x++) {
        const idx = (y * info.width + x) * 4;
        const alpha = data[idx + 3];
        
        if (alpha > 5) { // Any non-fully-transparent pixel
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    
    console.log(`Full Logo Bounding Box:`);
    console.log(`  Width: ${info.width}, Height: ${info.height}`);
    console.log(`  minX: ${minX}, maxX: ${maxX} (Span: ${maxX - minX}px)`);
    console.log(`  minY: ${minY}, maxY: ${maxY} (Height: ${maxY - minY}px)`);
  } catch (e) {
    console.error(e);
  }
}

findFullBounds();
