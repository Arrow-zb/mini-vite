// 这是浏览器直接支持的， 这也是 vite 的原理
import relative from "./relative.js";
const res = relative();
console.log(res);

// 如果不是 "/", "./", or "../" 开头的，就认为是来源自 node_module
// 那么就需要去 node_modules 里面找
import { createApp } from 'vue';
// console.log(createApp)
import App from './test.vue';
import './index.css'

createApp(App).mount('#app');
