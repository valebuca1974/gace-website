import sharp from 'sharp';

async function findBounds() {
  try {
    const img = sharp('c:\\Users\\dean valentin\\Desktop\\WEB FABRICA DE MALLA\\public\\logo-gace-no-slogan-hd.png');
    const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
    
    // Find bounding box of non-transparent pixels below y = 550
    let minX = info.width;
    let maxX = 0;
    let minY = info.height;
    let maxY = 0;
    
    for (let y = 550; y < info.height; y++) {
      for (let x = 0; x < info.width; x++) {
        const idx = (y * info.width + x) * 4;
        const alpha = data[idx + 3];
        
        if (alpha > 50) { // Solid enough pixel
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    
    console.log(`GACE Text Bounding Box for y > 550:`);
    console.log(`  Width: ${info.width}, Height: ${info.height}`);
    console.log(`  minX: ${minX}, maxX: ${maxX} (Span: ${maxX - minX}px)`);
    console.log(`  minY: ${minY}, maxY: ${maxY} (Height: ${maxY - minY}px)`);
    console.log(`  Left Margin: ${(minX / info.width * 100).toFixed(2)}%`);
    console.log(`  Right Margin: ${((info.width - maxX) / info.width * 100).toFixed(2)}%`);
    console.log(`  Text width relative to image: ${((maxX - minX) / info.width * 100).toFixed(2)}%`);
  } catch (e) {
    console.error(e);
  }
}

findBounds();
