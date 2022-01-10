const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const puppeteer = require('puppeteer');
const fetch = require('node-fetch');
const FormData = require('form-data');
const app = new Koa();
const router = new Router()
const link = fs.readFileSync('./index.html', 'utf-8');

app.use(bodyParser())

router.get('/job-view', (ctx, next) => {
  ctx.body = link
  next()
})

router.get('/job-view-to-img', async (ctx, next) => {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 450,
      height: 795,
      isMobile: true,
      deviceScaleFactor: 3
    }
  });
  const page = await browser.newPage();
  const url = `http://10.6.1.109:3031/job-view?${ctx.querystring}`
  await page.goto(url, {
    waitUntil: 'networkidle2'
  });
  const imgBuffer = await page.screenshot({});

  const filePath = await path.join(`./view-shop${new Date().valueOf()}.png`)
  fs.writeFileSync(filePath, imgBuffer)
  const formData = new FormData()
  formData.append('t', 2)
  formData.append('d', fs.createReadStream(filePath))
  let uploadResult = await fetch('http://front:8540/other/v3/upload?u=6&skip_qr_check=1', {
      method: 'post',
      body: formData
    })
  uploadResult = await uploadResult.json()
  ctx.body = uploadResult
  await browser.close();
  await next()
})


router.get('/main', async (ctx, next) => {
  // const Main = fs.readFileSync('./main.html', 'utf-8')
  ctx.body = '12333'
  await next()
})

app.use(router.routes())

app.listen(3031, () => {
  console.log('app start!')
});