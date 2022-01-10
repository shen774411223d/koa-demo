const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const path = require('path')
const bodyParser = require('koa-bodyparser');
const static = require('koa-static')
const app = new Koa();
const router = new Router()

app.use(bodyParser())
// app.use(static(path.join(__dirname, '/src')));
app.use(static(path.join(__dirname, '/dist')));


// router.get('/main', async (ctx, next) => {
//   const Main = fs.readFileSync('./src/main.html', 'utf-8')
//   ctx.body = Main
//   await next()
// })


router.get('/', async (ctx, next) => {
  const Main = fs.readFileSync('./dist/index.html', 'utf-8')
  ctx.body = Main
  await next()
})

app.use(router.routes())

app.listen(3031, () => {
  console.log('app start!')
});