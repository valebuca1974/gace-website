import sharp from 'sharp';
import fs from 'fs';

async function testTrim() {
  const input = 'public/GACE-PNG.png';
  if (!fs.existsSync(input)) {
    console.log('No GACE-PNG.png');
    return;
  }
  
  try {
    const image = sharp(input);
    const { data, info } = await image
      .trim()
      .toBuffer({ resolveWithObject: true });
      
    console.log(`Trimmed image dimensions: ${info.width}x${info.height}, size=${data.length}`);
    
    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: info.channels
      }
    })
    .png()
    .toFile('scratch/test-trimmed.png');
    
    console.log('Saved to scratch/test-trimmed.png');
  } catch (err) {
    console.error('Error:', err.message);
  }
}

testTrim();
