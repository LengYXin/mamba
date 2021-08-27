const lodash = require('lodash');
const path = require('path');
const appConfig = require('./app.config');
const development = process.env.NODE_ENV === 'development'
export default lodash.merge({
  server: {
    port: 4000, // default: 3000
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, 'xuantong.cn.key')),
    //   cert: fs.readFileSync(path.resolve(__dirname, 'xuantong.cn_public.crt'))
    // }
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'mobile',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      // { src: 'https://unpkg.com/vconsole/dist/vconsole.min.js' },
    ],

  },
  router: {
    middleware: 'before',
    extendRoutes
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'nprogress/nprogress.css',
    'vant/lib/index.less'
  ],
  styleResources: {
    // // your settings here
    // sass: [],
    // scss: [],
    // less: [
    //   '@/assets/themes/modifyVars.less',
    // ],
    // stylus: []
  },

}, createConfig())
function createConfig() {
  return {
    env: appConfig, 
    generate: {
      dir: appConfig.BuildDir,
    },
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',
    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
      '@/plugins/index'
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,
    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
      // https://go.nuxtjs.dev/typescript
      '@nuxt/typescript-build',
      '@nuxtjs/style-resources'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
    ],
    loadingIndicator: {
      name: 'circle',
      color: '#097276',
      background: '#f7f3f0'
    },
    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
      postcss: {
        plugins: {
          'postcss-px-to-viewport': {
            viewportWidth: 375,
          },
        }
      },
      corejs: 3,
      extractCSS: !development,
      splitChunks: {
        layouts: false,
        pages: false,
        commons: false
      },
      analyze: {
        openAnalyzer: true,
        analyzerMode: development ? 'disabled' : 'static',
      },
      loaders: {
        less: {
          lessOptions: {
            // modifyVars: modifyVars,
            modifyVars: {
              // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
              hack: `true; @import "${path.join(process.cwd(), 'assets/themes/modifyVars.less')}";`,
            },
            javascriptEnabled: true
          }
        }
      },
      extend(config, ctx) {
        lodash.update(config, 'resolve.modules', modu => lodash.concat([path.join(process.cwd(), 'node_modules')], modu));
        lodash.set(config, 'resolve.alias.lodash-es', require.resolve("lodash").replace('lodash.js', ''));
      },
      babel: {
        plugins: [
          'lodash',
          ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
        ],
      }
    }
  }
}
function extendRoutes(routes, resolve) {
  // 删除 非 page 生成的路由
  const remRoutes = lodash.remove(routes, route => /[\\/](view|views|children)[\\/]|\.(ts)/.test(route.component));
}