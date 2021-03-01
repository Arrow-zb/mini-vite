const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const compilerSfc = require('@vue/compiler-sfc');

const rewriteImport = require('./utils/rewriteImport');

const app = new Koa();

app.use(ctx => {
  const { url, query } = ctx.request;
  if(url === '/') {
    let html = fs.readFileSync("./index.html", 'utf-8');
    html = html.replace("<script", `
      <script>
        window.process = {
          env: { NODE_ENV: 'dev' }
        }
      </script>
      <script
    `)
    ctx.type = "text/html";
    ctx.body = html;
  }else if(url.endsWith('.js')) {
    // @todo
    // 1. 支持 npm 包的 import
      // import xx from 'vue' 替换成 import xx from '/@module/vue'
      // koa 监听到以 /@modules 开头的，就去 node_modules 里面去查找
    // 2. 支持 .vue 单文件组件的解析
      // .vue 文件浏览器是不认识的 浏览器只认识 js
      // .vue 单文件组件，拆分 script template
      // template => render 函数， 拼成一个对象
      // script.render = render
    // 3. 支持 import css
    // 比如热更新， ts 支持
    const p = path.resolve(__dirname, url.slice(1));
    ctx.type = "application/javascript";
    // 1. 支持 npm 包的 import
      // import xx from 'vue' 替换成 import xx from '/@module/vue'
    const file = fs.readFileSync(p, 'utf-8');
    ctx.body = rewriteImport(file);
  }else if(url.startsWith('/@modules/')) {
    // 这个模块，不是本地文件，而是 node_modules 连查找
    const prefix = path.resolve(__dirname, 'node_modules', url.replace("/@modules/", ""));
    const module = require(`${prefix}/package.json`).module;
    const file = fs.readFileSync(path.resolve(prefix, module), 'utf-8');
    ctx.type = "application/javascript";
    ctx.body = rewriteImport(file);
  }else if(url.endsWith(".vue")) {
    // import xx from 'xx.vue';
    // 1. 单文件组件解析
    const p = path.resolve(__dirname, url.split('?')[0].slice(1));
    // 解析单文件组件，需要官方的库   @vue/compiler-sfc
    const { descriptor } =  compilerSfc.parse(fs.readFileSync(p, 'utf-8'));
    console.log(descriptor);
  }
});

const port = 6090;
app.listen(port, err => {
  if(err) throw err;
  console.log(`app start at ${port}`);
});