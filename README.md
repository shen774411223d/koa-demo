
## 利用`Puppteer`生成图片

### Puppteer是什么？
  - 是一个node插件，提供了一系列API通过 DevTools 协议控制 Chromium 或 Chrome。简单来说就是在node层模拟了浏览器
### 那可以用在哪里？
  - 需要生成分享图片，批量生成图片时
  - 图片内有大量的动态数据/数据依赖服务端接口
  - 图片数量多，且有一定规律性的，可以通过代码而不用ui手动切图
  - 举个🌰：假如你是一家公司的行政同学，每天都要在群里同步当天的菜单情况（菜单是图片），你就可以通过这个插件
  来生成。只需要在脚本中填入每天的菜品就可以快速的生成菜单啦

***
> ### Q:为什么要使用Puppteer，我用html/canvas也可以实现呀
A: 这个插件的最大好处就是不受端的限制，笔者在小程序和RN都碰到了这种情况，尤其是对dom元素限制比较严格的框架，在这些框架中操作dom或者操作canvas不像浏览器的html一样方便，这时可以通过引入`node`层来解决 是一种比较优雅的解决方案。通过`node`层直接操作浏览器就没有七七八八的限制条件了
。
***
### 目录结构：
  - index.html
    - Puppteer需要打开一个浏览器地址，然后截图。我们要创建一个html 在html里自定义。就可以基于这个html截图了
  - index.js
    - 一个可执行脚本 可以在本地生成图片
  - server.js
    - 基于koa的server，功能和上述一样

***

> ## 简易DEMO
  ```js
    // server.js
    const fs = require('fs')
    const puppeteer = require('puppeteer');
    const Router = require('koa-router')
    const router = new Router()

    router.get('/page', async (ctx, next) => {
      const html = fs.readFileSync('./index.html', 'utf-8');
      ctx.body = html
      next()
    })

    router.get('/preview-page', async (ctx, next) => {
      const browser = await puppeteer.launch()
      const page = browser.newPage()
      // 以 iphone X的机型打开
      await page.emulate(puppeteer.devices['iPhone X']);
      await page.goto(`localhost:3000/page`)
      // 返回buffer格式的图片，也可规定返回base64
      // 如果返回base64格式注意返回的只有数据 没有格式，需要手动拼接
      // ctx.body = `data:image/png;base,${img}`
      const img = await page.screenshot({})
      ctx.type = 'type/image'
      ctx.body = img
    })
  ```

## [末尾附中文文档](https://zhaoqize.github.io/puppeteer-api-zh_CN)
