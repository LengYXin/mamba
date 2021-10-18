const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const fs = require('fs-extra');
const lodash = require('lodash');
const path = require('path');
const appConfig = require('./app.config');
const development = process.env.NODE_ENV === 'development'
export default lodash.merge({
  server: {
    port: 5000, // default: 3000
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, 'xuantong.cn.key')),
    //   cert: fs.readFileSync(path.resolve(__dirname, 'xuantong.cn_public.crt'))
    // }
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '大联想伙伴网',
    htmlAttrs: {
      lang: 'zh'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'version', content: `v${appConfig.Version} - ${appConfig.Timestamp}` },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  router: {
    middleware: 'before',
    extendRoutes
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

}, createConfig())

function createConfig() {
  return {
    env: appConfig, 
    generate: {
      dir: appConfig.BuildDir,
    },
    // Auto import components: https://go.nuxtjs.dev/config-components
    components: false,
    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
      '@/plugins/index'
    ],
    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
      // https://go.nuxtjs.dev/typescript
      '@nuxt/typescript-build',
      '@nuxtjs/style-resources'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
      '@nuxtjs/proxy'
    ],
    loadingIndicator: {
      name: 'circle',
      color: '#097276',
      background: '#f7f3f0'
    },
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,
    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',
    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
      postcss: {
        plugins: {
          // 'postcss-px-to-viewport': {
          //   viewportWidth: 1366,
          // },
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
      plugins: [
        new MomentLocalesPlugin({ localesToKeep: ['es-us', 'zh-cn'] })
      ],
      extend(config, ctx) {
        lodash.set(config, 'devtool', 'source-map')
        lodash.update(config, 'resolve.modules', modu => lodash.concat([path.join(process.cwd(), 'node_modules')], modu));
        lodash.set(config, 'resolve.alias.lodash-es', require.resolve("lodash").replace('lodash.js', ''));
        lodash.set(config, 'resolve.alias["@ant-design/icons/lib/dist$"]', path.resolve(process.cwd(), 'plugins/vueUse/icon.ts'))
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
}
function extendRoutes(routes, resolve) {
  const home = lodash.find(routes, ['name', 'index']);
  if (home) {
    home.path = '/'
  }
  // 删除 非 page 生成的路由
  lodash.remove(routes, route => /[\\/](view|views|children)[\\/]|\.(ts)/.test(route.component));
  try {
    const pages = path.join(process.cwd(), 'plugins', 'pages.ts')
    fs.ensureFileSync(pages)
    let scriptStr = fs.readFileSync(pages).toString();
    const pagesStr = lodash.map(lodash.orderBy(routes, 'name', 'asc'), ({ name, chunkName }) => {
      return `    /** ${chunkName}  */ \n    ${lodash.capitalize(lodash.snakeCase(name))}:{name:'${name}'}`
    }).join(',\r\n')
    const writeStr = `export const PagesEnum={\r\n${pagesStr}\r\n}`;
    scriptStr = scriptStr.replace(/(\/.*@InjectPages.*\/)(\D*)(\/.*@InjectPages.*\/)/, '/** @InjectPages **/ \n'
      + writeStr +
      '\n/** @InjectPages **/')
    fs.writeFileSync(pages, scriptStr)
  } catch (error) {
    console.log("🚀 ~ file: nuxt.config.js ~ line 153 ~ extendRoutes ~ error", error)
  }
}