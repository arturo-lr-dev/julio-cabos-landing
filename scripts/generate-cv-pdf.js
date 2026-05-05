const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const inputPath = path.resolve(__dirname, '../public/cv-template.html');
  const outputPath = path.resolve(__dirname, '../public/files/CV-Julio-Cabos.pdf');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('file://' + inputPath, { waitUntil: 'networkidle' });

  // Wait for fonts to load
  await page.waitForTimeout(2000);

  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
  });

  await browser.close();

  console.log('✓ PDF generado:', outputPath);
})();
