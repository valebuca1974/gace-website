import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function analyze() {
  const dir = 'C:\\Users\\dean valentin\\.gemini\\antigravity\\brain\\3f883ada-7693-46bf-b62c-8e55ad03a4f4\\.tempmediaStorage';
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
  
  console.log(`Analyzing ${files.length} files...`);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    try {
      const stats = fs.statSync(filePath);
      const meta = await sharp(filePath).metadata();
      console.log(`File: ${file} | Size: ${meta.width}x${meta.height} | Bytes: ${stats.size}`);
    } catch (e) {
      console.error(`Error on ${file}:`, e.message);
    }
  }
}

analyze();
