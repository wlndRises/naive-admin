const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const isPro = process.env.NODE_ENV === 'production'

// cdn
const cdn = require('./config/cdn')

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

    // html-webpack-plugin
    config.plugin('html').tap(args => {
      args[0].cdn = cdn.cdnConfig
      return args
    })
    // 从输出的 bundle 中排除依赖
    config.externals = cdn.externals

    config.module.rule('svg').exclude.add(resolve('src/assets/icons')).end()
    // add icons rule use svg-sprite-loader
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
      // https://webpack.docschina.org/plugins/split-chunks-plugin
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          Echarts: {
            name: 'chunk-Echarts',
            test: /[\\/]echarts[\\/]/,
            priority: 20,
          },
          elementUI: {
            name: 'chunk-elementUI',
            test: /[\\/]element-ui[\\/]/,
            priority: 10,
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'),
            minChunks: 2,
            priority: 0,
            reuseExistingChunk: true,
          },
        },
      })

      // Vue Cli 使用 terser-webpack-plugin 覆盖默认压缩工具(minimizer)
      // https://github.com/terser/terser#compress-options
      config.optimization.minimizer('terser').tap(args => {
        Object.assign(args[0].terserOptions.compress, {
          // drop_console: true,
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
