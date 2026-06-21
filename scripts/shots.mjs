import puppeteer from 'puppeteer-core';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const sites = [
  ['microview', 'https://microview-ai.vercel.app/'],
  ['iwas-huli', 'https://iwas-huli-ph.vercel.app'],
  ['synaps', 'https://synaps-ai.vercel.app'],
  ['senyas', 'https://senyas-ivory.vercel.app'],
  ['sigla', 'https://sigla-ai.vercel.app'],
  ['sk-828', 'https://barangay-828-website.vercel.app'],
  ['yolanda', 'https://dip-finals-yolanda-flood-risk-zone.streamlit.app/'],
  ['purrfectchoys', 'https://purrfectchoys.vercel.app/'],
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--hide-scrollbars'],
});

for (const [name, url] of sites) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1.5 });
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
    await new Promise((r) => setTimeout(r, 3500)); // let animations/fonts settle
    await page.screenshot({ path: `public/shots/${name}.png`, clip: { x: 0, y: 0, width: 1280, height: 800 } });
    console.log('OK   ', name);
  } catch (e) {
    console.log('FAIL ', name, '-', e.message.split('\n')[0]);
  }
  await page.close();
}

await browser.close();
console.log('done');
