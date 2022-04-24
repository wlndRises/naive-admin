const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const isDev = process.env.NODE_ENV == 'development'
const isPro = !isDev

// gzip 相关
const CompressionPlugin = require('compression-webpack-plugin')
const isGZIP = process.env.VUE_APP_GZIP == 'ON'

const port = process.env.port || process.env.npm_config_port || 4396 // dev port

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
    // 它可以提高首屏加载的速度，建议打开 预加载
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // 忽略runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial',
      },
    ])

    // 当有很多页面时，忽略rust，会导致太多无意义的requestsntime.js
    config.plugins.delete('prefetch')

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
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // "runtime"必须与runtimeecchunk名称相同。默认是"runtime"
            inline: /runtime\..*\.js$/,
          },
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial', // 只打包最初依赖的第三方
          },
          elementUI: {
            name: 'chunk-elementUI', // 将elementUI拆分为单个包
            priority: 20, // 权重需要大于libs和app 否则它将被打包成libs或app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // 为了适应CNPM
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // 可以自定义规则
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      })
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk('single')
    })
  },
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件
  // 如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来
  // transpileDependencies: [],
  configureWebpack: () => {
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
