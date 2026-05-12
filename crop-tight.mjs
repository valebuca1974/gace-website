import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pubDir = join(__dirname, 'public');
const outDir = join(pubDir, 'tight');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}

// Pixel-perfect coordinates for 1655x2340 catalog pages (Scaling factor 2.78 from A4)
const crops = [
  // Page 2: Poliburbuja rolls (Top center-right)
  { src: 'catalog-page-2.png', out: 'product-poliburbuja.png', left: 100, top: 160, width: 1450, height: 1850 },
  
  // Page 3: Poliburbuja Con Corte (Top left stack)
  { src: 'catalog-page-3.png', out: 'product-poliburbuja-corte.png', left: 80, top: 160, width: 600, height: 950 },
  
  // Page 3: Poliburbuja Punteada (Bottom right hand)
  { src: 'catalog-page-3.png', out: 'product-poliburbuja-punteada.png', left: 580, top: 600, width: 1000, height: 1500 },
  
  // Page 4: Mini Poliburbuja (Set of rolls)
  { src: 'catalog-page-4.png', out: 'product-mini-poliburbuja.png', left: 90, top: 160, width: 1475, height: 1340 },
  
  // Page 5: Malla Normal (White roll - capture left column)
  { src: 'catalog-page-5.png', out: 'product-malla-normal.png', left: 0, top: 0, width: 550, height: 2340 },
  
  // Page 6: Malla Con Memoria (Purple roll - Top Right)
  { src: 'catalog-page-6.png', out: 'product-malla-memoria.png', left: 750, top: 185, width: 850, height: 910 },
  
  // Page 6: Malla Suave (Sponges - Bottom Left)
  { src: 'catalog-page-6.png', out: 'product-malla-suave.png', left: 40, top: 1195, width: 780, height: 900 },
  
  // Page 7: Malla Protección (Set of products - Top)
  { src: 'catalog-page-7.png', out: 'product-malla-proteccion.png', left: 40, top: 445, width: 1580, height: 805 },
  
  // Page 7: Malla Reforzada (Coke bottles - Bottom)
  { src: 'catalog-page-7.png', out: 'product-malla-reforzada.png', left: 450, top: 1300, width: 1150, height: 980 },
  
  // Page 8: Malla Navidad (Tree - Top)
  { src: 'catalog-page-8.png', out: 'product-malla-navidad.png', left: 100, top: 130, width: 1450, height: 1050 },
  
  // Page 8: Broches (Clips - Bottom)
  { src: 'catalog-page-8.png', out: 'product-broches.png', left: 20, top: 1150, width: 1600, height: 1150 }
];

async function cropImages() {
  for (const crop of crops) {
    const srcPath = join(pubDir, crop.src);
    const outPath = join(outDir, crop.out);
    
    try {
      const metadata = await sharp(srcPath).metadata();
      const left = Math.min(Math.max(0, Math.round(crop.left)), metadata.width - 1);
      const top = Math.min(Math.max(0, Math.round(crop.top)), metadata.height - 1);
      const width = Math.min(Math.round(crop.width), metadata.width - left);
      const height = Math.min(Math.round(crop.height), metadata.height - top);
      
      await sharp(srcPath)
        .extract({ left, top, width, height })
        .png({ quality: 100 })
        .toFile(outPath);
        
      console.log(`✓ Tight crop: ${crop.out}`);
    } catch (err) {
      console.error(`✗ ${crop.out}: ${err.message}`);
    }
  }
}

cropImages();
