import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pubDir = join(__dirname, 'public');

const crops = [
  { src: 'catalog-page-2.png', out: 'product-poliburbuja.png', left: 50, top: 350, width: 750, height: 700 },
  { src: 'catalog-page-3.png', out: 'product-poliburbuja-corte.png', left: 50, top: 350, width: 600, height: 600 },
  { src: 'catalog-page-3.png', out: 'product-poliburbuja-punteada.png', left: 700, top: 1300, width: 900, height: 700 },
  { src: 'catalog-page-4.png', out: 'product-mini-poliburbuja.png', left: 50, top: 350, width: 1550, height: 600 },
  { src: 'catalog-page-5.png', out: 'product-malla-normal.png', left: 50, top: 250, width: 700, height: 1000 },
  { src: 'catalog-page-6.png', out: 'product-malla-memoria.png', left: 700, top: 450, width: 900, height: 600 },
  { src: 'catalog-page-6.png', out: 'product-malla-suave.png', left: 50, top: 1300, width: 650, height: 600 },
  { src: 'catalog-page-7.png', out: 'product-malla-proteccion.png', left: 50, top: 350, width: 750, height: 800 },
  { src: 'catalog-page-7.png', out: 'product-malla-reforzada.png', left: 800, top: 1200, width: 800, height: 800 },
  { src: 'catalog-page-8.png', out: 'product-malla-navidad.png', left: 50, top: 250, width: 650, height: 800 },
  { src: 'catalog-page-8.png', out: 'product-broches.png', left: 50, top: 1300, width: 1550, height: 800 }
];

async function cropImages() {
  for (const crop of crops) {
    const srcPath = join(pubDir, crop.src);
    const outPath = join(pubDir, crop.out);
    
    try {
      const metadata = await sharp(srcPath).metadata();
      const left = Math.min(crop.left, metadata.width - 1);
      const top = Math.min(crop.top, metadata.height - 1);
      const width = Math.min(crop.width, metadata.width - left);
      const height = Math.min(crop.height, metadata.height - top);
      
      await sharp(srcPath)
        .extract({ left, top, width, height })
        .png({ quality: 90 })
        .toFile(outPath);
        
      console.log(`✓ ${crop.out}`);
    } catch (err) {
      console.error(`✗ ${crop.out}: ${err.message}`);
    }
  }
}

cropImages();
