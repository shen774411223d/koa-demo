const puppeteer = require('puppeteer');
const fs = require('fs')
const users = fs.readFileSync('./user.json')
(async () => {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 450,
      height: 800,
      isMobile: true,
      deviceScaleFactor: 3
    }
  });
  const page = await browser.newPage();
  await page.emulate(puppeteer.devices['iPhone 6']);
  for(let i = 0; i < users.length; i++) {
    const filePath = await path.join(`./score-${user[i].name}.png`)
    await page.goto(targetUrl + users[i].id);
    await page.screenshot({path: filePath});
  }
  await browser.close();
})();