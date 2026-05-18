import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';
import path from 'path';

async function extractText(filePath) {
  const loadingTask = pdfjsLib.getDocument({
    url: filePath,
    disableFontFace: true
  });
  
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;
  
  let fullText = "";
  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(' ');
    fullText += `\n--- PAGE ${i} ---\n${pageText}\n`;
  }
  return fullText;
}

async function main() {
  const docsDir = 'public/documentos';
  const files = fs.readdirSync(docsDir).filter(f => f.endsWith('.pdf'));
  
  for (const file of files) {
    console.log(`Extracting: ${file}`);
    const text = await extractText(path.join(docsDir, file));
    fs.writeFileSync(`text-${file}.txt`, text);
    console.log(`Saved to text-${file}.txt`);
  }
}

main().catch(console.error);
