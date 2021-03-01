# 前言  
## Vue 3 新增了什么
- 性能（比 vue2 快了 2 倍） 真正的做到了按需更新，基于位运算
- tree shaking (按需编译代码) 
- composition api (类似于 hooks)
- ts support (ts)
- custom renderer api (自定义渲染)

## composition api
option api: 
- 维护时，上下反复横跳
- 
composition api
基于函数组合的 api


编译时的优化是 Vue3 最大的特点

vite， 按需加载
现在浏览器支持 es6 的import
当 script 标签中 type = module 时， 可以支持 import
import xx from module 就会发起一个网络请求

vite 拦截这个请求，去做相应的 vue 的编译、解析等，实现按需加载的能力

vite 的好处就是不再打包了，而是基于浏览器支持来实现的
dev 秒开， build 为 rollup

# 思路
