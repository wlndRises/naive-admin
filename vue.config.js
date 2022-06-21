const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const isDev = process.env.NODE_ENV == 'development'
const isPro = !isDev

// cdn
const cdn = require('./config/cdn.js')

// gzip
const CompressionPlugin = require('compression-webpack-plugin')
const isGZIP = process.env.VUE_APP_GZIP == 'ON'

const port = process.env.npm_config_port || 4396 // dev port

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: 'warning',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    before: require('./mock/mock-server.js'),
  },
  chainWebpack(config) {
    config.resolve.alias.set('#', resolve('src/views'))

    // inject cdn
    config.plugin('html').tap(args => {
      args[0].cdn = cdn.cdnConfig
      return args
    })

    // 从输出的 bundle 中排除依赖
    config.externals = cdn.externals

    // set svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/assets/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()

    config.when(isPro, config => {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'),
            // 表示要被提取的模块最小被引用次数
            // 引用次数超过或等于minChunks值 才能被提取
            minChunks: 3,
            priority: 5,
            // 如果当前要提取的模块 在已经在打包生成的js文件中存在 则将重用该模块
            // 而不是把当前要提取的模块打包生成新的 js 文件
            reuseExistingChunk: true,
          },
          libs: {
            chunks: 'initial',
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
          },
          Echarts: {
            name: 'chunk-Echarts',
            priority: 20,
            test: /[\\/]echarts[\\/]/,
          },
          elementUI: {
            name: 'chunk-elementUI',
            priority: 20,
            test: /[\\/]element-ui[\\/]/,
          },
        },
      })

      // terser-webpack-plugin
      // https://github.com/terser/terser#compress-options
      config.optimization.minimizer('terser').tap(args => {
        Object.assign(args[0].terserOptions.compress, {
          pure_funcs: ['console.log'],
        })
        return args
      })
    })
  },
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件
  // 如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来
  transpileDependencies: [],
  configureWebpack() {
    if (isGZIP) {
      return {
        plugins: [
          new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.(js|css)$/, // 匹配文件名
            threshold: 10240, // 对超过10k的数据压缩
            deleteOriginalAssets: false, // 不删除源文件
            minRatio: 0.8, // 压缩比
          }),
        ],
      }
    }
  },
}
