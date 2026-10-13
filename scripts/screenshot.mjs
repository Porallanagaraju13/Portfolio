import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const screenshots = [
  { name: 'hero-desktop', width: 1440, height: 900, selector: '#home' },
  { name: 'hero-mobile', width: 390, height: 844, selector: '#home' },
  { name: 'projects-desktop', width: 1440, height: 900, selector: '#projects' },
  { name: 'projects-mobile', width: 390, height: 844, selector: '#projects' },
  { name: 'about-desktop', width: 1440, height: 900, selector: '#about' },
  { name: 'full-desktop', width: 1440, height: 2400, fullPage: true },
  { name: 'full-mobile', width: 390, height: 2400, fullPage: true }
];

async function capture() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Loading site...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  // Wait for content
  await page.waitForSelector('#home', { timeout: 10000 });
  await page.waitForTimeout(2000); // Let animations settle

  for (const shot of screenshots) {
    await page.setViewportSize({ width: shot.width, height: shot.height });
    await page.waitForTimeout(500);

    if (shot.selector) {
      const element = await page.$(shot.selector);
      if (element) {
        console.log(`Capturing ${shot.name}...`);
        await element.screenshot({
          path: join(__dirname, `../public/screenshots/${shot.name}.png`)
        });
      }
    } else if (shot.fullPage) {
      console.log(`Capturing ${shot.name}...`);
      await page.screenshot({
        path: join(__dirname, `../public/screenshots/${shot.name}.png`),
        fullPage: true
      });
    }
  }

  await browser.close();
  console.log('Done! Screenshots saved to public/screenshots/');
}

capture().catch(console.error);
