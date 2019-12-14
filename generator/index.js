/*
 * @Author: isboyjc
 * @Date: 2019-12-13 10:35:14
 * @LastEditors: isboyjc
 * @LastEditTime: 2019-12-14 13:35:39
 * @Description: generator 允许一个 generator 向 package.json 注入额外的依赖或字段，并向项目中添加文件
*/
module.exports = (api, options, rootOptions) => {
  // 拓展 package.json，默认merge已有依赖项，可以设置参数 merge: false
  api.extendPackage({
    dependencies: {
      "axios": "^0.18.0" 
    }
  })

  // 文件写入回调
  api.onCreateComplete(() => {
    const fs = require('fs')
    // 添加字串
    const iviewLines = `\nimport request from '@/utils/request'\n\nVue.use(request)`
    // 获取文件内容 字符串
    // api.entryFile 判断typescript的输入文件是否存在
    // api.entryFile = fs.existsSync(this.resolve('src/main.ts')) ? 'src/main.ts' : 'src/main.js
    let contentMain = fs.readFileSync(api.entryFile, { encoding: 'utf-8' })
    // 字符串切割 数组内容反转
    const lines = contentMain.split(/\r?\n/g).reverse()
    // 找到import的下标
    const importIndex = lines.findIndex(line => line.match(/^import/))
    // 在反转第一个import的下面添加引入语句
    lines[importIndex] += iviewLines
    // main内容还原
    contentMain = lines.reverse().join('\n')
    // 写入文件
    fs.writeFileSync(api.entryFile, contentMain, { encoding: 'utf-8' })
  })

  // 渲染模板
  api.render('./template')
}