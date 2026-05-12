const files = [
  'product-poliburbuja.png',
  'product-poliburbuja-corte.png', 
  'product-poliburbuja-punteada.png',
  'product-mini-poliburbuja.png',
  'product-malla-normal.png',
  'product-malla-memoria.png',
  'product-malla-suave.png',
  'product-malla-proteccion.png',
  'product-malla-reforzada.png',
  'product-malla-navidad.png',
  'product-broches.png',
  'about-factory.png',
  'gace.png',
  'malla-rolls.png',
  'hero-mesh-machine.png'
];

import { existsSync, statSync } from 'fs';
import { join } from 'path';

const pubDir = 'c:/Users/dean valentin/Desktop/WEB FABRICA DE MALLA/public';

console.log('=== Asset Verification ===\n');
let allOk = true;
for (const f of files) {
  const p = join(pubDir, f);
  if (existsSync(p)) {
    const size = statSync(p).size;
    console.log(`  ✓ ${f} (${(size/1024).toFixed(0)} KB)`);
  } else {
    console.log(`  ✗ MISSING: ${f}`);
    allOk = false;
  }
}
console.log(`\n${allOk ? '✅ All assets present!' : '❌ Some assets missing!'}`);
