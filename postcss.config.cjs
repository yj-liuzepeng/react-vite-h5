/*
 * @Author: lzp
 * @Date: 2022-11-07 10:54:06
 * @Description: file content
 */
module.exports = {
  "plugins": [
    require("postcss-pxtorem")({
      rootValue: 37.5,
      propList: ['*'],
      selectorBlackList: ['.norem'] // 过滤掉.norem-开头的class，不进行rem转换
    })
  ]
}