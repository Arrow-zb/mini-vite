module.exports = function rewriteImport(content) {
  // 目的是改造 .js 文件内容， 不是 "/", "./", or "../" 开头的 import，替换成 /@modules/ 开头
  return content.replace(/from\s+['|"]([^'"]+)['|"]/g, ($0, $1) => {
    if($1[0] !== '.' && $1[0] !== '/') {
      return `from "/@modules/${$1}"`
    }else {
      return $0
    }
  })
};