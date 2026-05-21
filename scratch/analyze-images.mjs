import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function analyze() {
  const brainDir = 'C:\\Users\\dean valentin\\.gemini\\antigravity\\brain\\a971f7c5-8d4b-4d50-9cdd-5036142583e1';
  const brainFiles = fs.readdirSync(brainDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));
  
  let output = '=== Brain Images ===\n';
  for (const f of brainFiles) {
    const fullPath = path.join(brainDir, f);
    try {
      const meta = await sharp(fullPath).metadata();
      output += `${f}: width=${meta.width}, height=${meta.height}, format=${meta.format}, size=${fs.statSync(fullPath).size}\n`;
    } catch (e) {
      output += `${f}: ERROR: ${e.message}\n`;
    }
  }

  output += '\n=== Public/Dist Images ===\n';
  const publicFiles = fs.readdirSync('public').filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));
  for (const f of publicFiles) {
    const fullPath = path.join('public', f);
    try {
      const meta = await sharp(fullPath).metadata();
      output += `public/${f}: width=${meta.width}, height=${meta.height}, format=${meta.format}, size=${fs.statSync(fullPath).size}\n`;
    } catch (e) {
      output += `public/${f}: ERROR: ${e.message}\n`;
    }
  }

  fs.writeFileSync('scratch/images-analysis.txt', output);
  console.log(output);
}

analyze();
