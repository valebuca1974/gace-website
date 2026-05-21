import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function findLogo() {
  const dir = 'C:\\Users\\dean valentin\\.gemini\\antigravity\\brain\\3f883ada-7693-46bf-b62c-8e55ad03a4f4\\.tempmediaStorage';
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg'));
  
  console.log(`Analyzing ${files.length} JPG files for blue GACE logo...`);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    try {
      const { data, info } = await sharp(filePath)
        .resize(100, 100) // resize to speed up
        .raw()
        .toBuffer({ resolveWithObject: true });
        
      let bluePixels = 0;
      for (let i = 0; i < data.length; i += info.channels) {
        const r = data[i];
        const g = data[i+1];
        const b = data[i+2];
        
        // GACE blue is #1A4FA2 (R: 26, G: 79, B: 162).
        // Let's look for pixels where B > 100 and B > R + 50 and B > G + 30
        if (b > 100 && b > r + 40 && b > g + 20) {
          bluePixels++;
        }
      }
      
      console.log(`File: ${file} | Size: ${info.width}x${info.height} | Blue Pixels (out of 10,000): ${bluePixels}`);
    } catch (e) {
      console.error(`Error on ${file}:`, e.message);
    }
  }
}

findLogo();
