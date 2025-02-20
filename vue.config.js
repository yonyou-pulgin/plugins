const path = require('path')
const { defineConfig } = require('@vue/cli-service')
// 在configureWebpack配置段内补充：
const MiniCssExtractPlugin = require('mini-css-extract-plugin')



const host = 'dev'
const SriPlugin = require('webpack-subresource-integrity')
require('events').EventEmitter.defaultMaxListeners = 0 // 解除限制 node报错

module.exports = defineConfig({
  transpileDependencies: false,
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production' ? 'https://uat.yygongzi.com/uatplugin/static/' : './',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: true,
  filenameHashing: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, './src'),
        vue: path.resolve('./node_modules/vue'),
      },
    },
    plugins: [
      // 此处省略1万字...
      // new SriPlugin({
      //   hashFuncNames: ['sha256', 'sha384'],
      //   enabled: process.env.NODE_ENV === 'production',
      // }),
    ],
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      // development 模式下
      // if (process.env.NODE_ENV !== 'development') {
      //   // eslint-disable-next-line max-len
      //   args[0].metaContent = 'default-src data: wss: \'self\' \'unsafe-inline\' \'unsafe-eval\' *.aliyuncs.com *.effirst.com *.qwps.cn *.kdocs.cn *.wpscdn.cn *.ksyun.com dw-online.ksosoft.com shuc-js.ksord.com *.wps.cn *.yygongzi.com *.qq.com *.dingtalk.com *.alicdn.com *.npsmeter.cn *.ahc.ink *.rumt-zh.com rumt-zh.com *.aihecong.com *.myqcloud.com *.giocdn.com *.bytegoofy.com clarity.ms *.clarity.ms cdn-go.cn *.cdn-go.cn *.growingio.com *.xinfushe.com xinfushe.com;img-src data: wss: \'self\' \'unsafe-inline\' \'unsafe-eval\' *;'
      //   args[0].httpEquiv = 'Content-Security-Policy'
      // }
      args[0].configVersion = Date.now()
      args[0].title = '插件'
      return args
    })
    config.module
    .rule('vue')
    .use('vue-loader')
    .tap(options => ({
      ...options,
      compilerOptions: {
        // 将所有以 ww- 或者 dt- 开头的标签都视为自定义元素
        isCustomElement: tag => tag.startsWith('ww-') || tag.startsWith('dt-') || tag.startsWith('micro-app'),
      },
    }))
  },
    // 配置 webpack 的 output
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
     // 生成时间戳
      const timestamp = new Date().getTime(); // 获取当前时间的时间戳

      // 指定 CDN 路径并添加时间戳
      config.output = {
        ...config.output,
        filename: `[name].js?key=${timestamp}`,
        chunkFilename: `[name].chunk.js?key=${timestamp}`,
        // publicPath: 'https://www.yygongzi.com/demoplugin/' // CDN 路径后添加时间戳
      };
      // 生产环境配置段内添加：
      config.plugins = config.plugins.map(plugin => {
        if (plugin instanceof MiniCssExtractPlugin) {
          return new MiniCssExtractPlugin({
            filename: `[name].css?key=${timestamp}`,
            chunkFilename: `[name].chunk.css?key=${timestamp}`
          })
        }
        return plugin
      })
    }
  },
  devServer: {
    host: '127.0.0.1',
    port: 8089,
    https: true,
    hot: true,
    compress: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    client: {
      overlay: false,
    },
    proxy: {
      '/gw': {
        target: `https://${host}.yygongzi.com/gw`,
        secure: false,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/gw': '',
        },
        cookieDomainRewrite: {
          '*': '',
        },
      },
    },
  },
})
