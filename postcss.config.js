module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        'Android 4.1',
        'iOS 7.1',
        'Chrome > 31',
        'ff > 31',
        'ie >= 8',
        'last 10 versions' // 所有主流浏览器最近10版本用
      ],
      grid: true
    },
    'postcss-pxtorem': {
      rootValue: 144, // 设计稿宽度的1/ 10 例如设计稿按照 1920设计 此处就为192
      propList: ['*', '!border'], // 除 border 外所有px 转 rem
      exclude: (e) => {
        if (/components(\\|\/)WaveFont.vue/.test(e)) {
          return true
        }
        if (/components(\\|\/)BirdButton.vue/.test(e)) {
          return true
        }
        return false
      }
    }
  }
}
