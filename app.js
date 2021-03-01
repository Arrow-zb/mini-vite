const fs = require('fs');
const path = require('path');
const Koa = require('koa');

const rewriteImport = require('./utils/rewriteImport');

const app = new Koa();

app.use(ctx => {
  const { url, query } = ctx.request;
  if(url === '/') {
    const html = fs.readFileSync("./index.html");
    ctx.type = "text/html";
    ctx.body = html;
  }else if(url.endsWith('.js')) {
    // @todo
    // 1. 支持 npm 包的 import
      // import xx from 'vue' 替换成 import xx from '/@module/vue'
      // koa 监听到以 /@modules 开头的，就去 node_modules 里面去查找
    // 2. 支持 .vue 单文件组件的解析
    // 3. 支持 import css
    // 比如热更新， ts 支持
    const p = path.resolve(__dirname, url.slice(1));
    ctx.type = "application/javascript";
    // 1. 支持 npm 包的 import
      // import xx from 'vue' 替换成 import xx from '/@module/vue'
    const file = rewriteImport(fs.readFileSync(p, 'utf-8'));
    ctx.body = file;
  }else if(url.startsWith('/@modules')) {
    const module = path.resolve(__dirname, 'node_modules', url.slice(10));
    const main = JSON.parse(fs.readFileSync(path.resolve(module, 'package.json'), 'utf-8'))['jsnext:main'];
    const file = fs.readFileSync(path.resolve(module, main), 'utf-8');
    ctx.type = "application/javascript";
    ctx.body = file;
  }
});

const port = 6090;
app.listen(port, err => {
  if(err) throw err;
  console.log(`app start at ${port}`);
});