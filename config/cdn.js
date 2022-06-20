const cdnConfig = []

if (process.env.NODE_ENV === 'development') {
  // 开发及测试环境CDN
  cdnConfig.concat([])
} else {
  // 生产环境CDN
  cdnConfig.concat([])
}

// https://webpack.js.org/configuration/externals/#externals
const externals = {}

module.exports = {
  cdnConfig,
  externals,
}
