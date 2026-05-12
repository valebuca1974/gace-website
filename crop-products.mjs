import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pubDir = join(__dirname, 'public');

// Page dimensions: 1654x2339
// We'll crop product photos from each catalog page

const crops = [
  // Page 2: Poliburbuja - the large roll photo on the left (1/2")
  {
    src: 'catalog-page-2.png',
    out: 'product-poliburbuja.png',
    left: 50, top: 120, width: 750, height: 900
  },
  // Page 3: Poliburbuja con Corte - the cut rolls on upper left
  {
    src: 'catalog-page-3.png',
    out: 'product-poliburbuja-corte.png',
    left: 50, top: 200, width: 600, height: 600
  },
  // Page 3: Poliburbuja Punteada - person handling bubble wrap bottom right  
  {
    src: 'catalog-page-3.png',
    out: 'product-poliburbuja-punteada.png',
    left: 700, top: 1200, width: 900, height: 700
  },
  // Page 4: Mini Poliburbuja - the small rolls
  {
    src: 'catalog-page-4.png',
    out: 'product-mini-poliburbuja.png',
    left: 50, top: 120, width: 1554, height: 900
  },
  // Page 5: Malla Normal - the large roll
  {
    src: 'catalog-page-5.png',
    out: 'product-malla-normal.png',
    left: 0, top: 0, width: 750, height: 1200
  },
  // Page 6: Malla con Memoria - the purple roll upper right
  {
    src: 'catalog-page-6.png',
    out: 'product-malla-memoria.png',
    left: 700, top: 100, width: 900, height: 700
  },
  // Page 6: Malla Suave - the colorful bath puffs bottom left
  {
    src: 'catalog-page-6.png',
    out: 'product-malla-suave.png',
    left: 50, top: 1200, width: 650, height: 600
  },
  // Page 7: Malla Proteccion - the blue mesh on the left + tequila bottle
  {
    src: 'catalog-page-7.png',
    out: 'product-malla-proteccion.png',
    left: 50, top: 100, width: 1554, height: 1000
  },
  // Page 7: Malla Reforzada - Coca Cola bottles in mesh bottom
  {
    src: 'catalog-page-7.png',
    out: 'product-malla-reforzada.png',
    left: 400, top: 1100, width: 800, height: 1000
  },
  // Page 8: Malla Navidad - the tree wrapped top
  {
    src: 'catalog-page-8.png',
    out: 'product-malla-navidad.png',
    left: 50, top: 80, width: 650, height: 800
  },
  // Page 8: Broches - campana and asa bottom
  {
    src: 'catalog-page-8.png',
    out: 'product-broches.png',
    left: 50, top: 1200, width: 1554, height: 800
  }
];

async function cropImages() {
  for (const crop of crops) {
    const srcPath = join(pubDir, crop.src);
    const outPath = join(pubDir, crop.out);
    
    try {
      // Get source image dimensions first
      const metadata = await sharp(srcPath).metadata();
      
      // Clamp coordinates to actual image dimensions
      const left = Math.min(crop.left, metadata.width - 1);
      const top = Math.min(crop.top, metadata.height - 1);
      const width = Math.min(crop.width, metadata.width - left);
      const height = Math.min(crop.height, metadata.height - top);
      
      await sharp(srcPath)
        .extract({ left, top, width, height })
        .resize(800, 600, { fit: 'cover', position: 'center' })
        .png({ quality: 90 })
        .toFile(outPath);
      
      console.log(`✓ ${crop.out} (from ${crop.src})`);
    } catch (err) {
      console.error(`✗ ${crop.out}: ${err.message}`);
    }
  }
  
  console.log('\nAll product images cropped!');
}

cropImages();
