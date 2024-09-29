const path = require('path')
const { defineConfig } = require('@vue/cli-service')

const host = 'dev'
const SriPlugin = require('webpack-subresource-integrity')
require('events').EventEmitter.defaultMaxListeners = 0 // 解除限制 node报错

module.exports = defineConfig({
  transpileDependencies: false,
  lintOnSave: false,
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, './src'),
        vue: path.resolve('./node_modules/vue'),
      },
    },
    output: {
      // 此处省略1万字...
      // crossOriginLoading: 'anonymous',
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
  // devServer: {
  //   host: '127.0.0.1',
  //   port: 8089,
  //   https: false,
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  //     'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
  //   },
  //   proxy: {
  //     '/gw': {
  //       target: `https://dev.yygongzi.com/gw`,
  //       secure: false,
  //       changeOrigin: false,
  //       ws: false,
  //       pathRewrite: {
  //         '^/gw': '',
  //       },
  //       cookieDomainRewrite: {
  //         '*': '',
  //       },
  //     },
  //   }
  // },
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
