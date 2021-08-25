const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const lodash = require('lodash');
const path = require('path');
const development = process.env.NODE_ENV === 'development'
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  server: {
    port: 5000, // default: 3000
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, 'xuantong.cn.key')),
    //   cert: fs.readFileSync(path.resolve(__dirname, 'xuantong.cn_public.crt'))
    // }
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'vuejs',
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
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'nprogress/nprogress.css',
    // 'ant-design-vue/es/style/index.less'
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
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/index'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,
  router: {
    middleware: 'auth',
  },
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
  build: createBuild()
}

function createBuild() {
  return {
    postcss: {
      plugins: {
        // 'postcss-px-to-viewport': {
        //   viewportWidth: 1366,
        // },
      }
    },
    corejs: 3,
    extractCSS: !development,
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
    plugins: [
      new MomentLocalesPlugin({ localesToKeep: ['es-us', 'zh-cn'] })
    ],
    extend(config, ctx) {
      lodash.update(config, 'resolve.modules', modu => lodash.concat([path.join(process.cwd(), 'node_modules')], modu));
      lodash.set(config, 'resolve.alias.lodash-es', require.resolve("lodash").replace('lodash.js', ''));
      lodash.set(config, 'resolve.alias["@ant-design/icons/lib/dist$"]', path.resolve(process.cwd(), 'plugins/icon.ts'))
    },
    babel: {
      plugins: [
        'lodash',
        ['import', {
          libraryName: 'ant-design-vue',
          libraryDirectory: 'es',
          style: (name) => `${name}/style/index.js`
        }],
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
      ],
    }
  }
}