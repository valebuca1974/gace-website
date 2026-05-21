import sharp from 'sharp';
import fs from 'fs';

async function check() {
  const files = [
    'public/GACE-PNG.png',
    'public/gace-trimmed.png',
    'public/logo-gace.svg',
    'public/favicon.png',
    'dist/gace-trimmed.png',
    'public/logo-gace-final-transparent.png',
    'public/logo-gace-final-trimmed.png'
  ];

  let output = '';

  for (const f of files) {
    if (fs.existsSync(f)) {
      try {
        const metadata = await sharp(f).metadata();
        const line = `${f}: width=${metadata.width}, height=${metadata.height}, format=${metadata.format}, size=${fs.statSync(f).size}\n`;
        output += line;
        console.log(line);
      } catch (err) {
        const line = `${f}: ERROR: ${err.message}, size=${fs.statSync(f).size}\n`;
        output += line;
        console.log(line);
      }
    } else {
      const line = `${f}: DOES NOT EXIST\n`;
      output += line;
      console.log(line);
    }
  }

  fs.writeFileSync('scratch/metadata-output.txt', output);
}

check();
