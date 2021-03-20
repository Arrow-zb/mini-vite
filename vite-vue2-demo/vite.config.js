import { createVuePlugin } from "vite-plugin-vue2";

export default {
  plugins: [createVuePlugin()],
  resolve: {
    alias: [
      { find: 'UTIL',  replacement: '/src/utils'}
    ]
  }
}