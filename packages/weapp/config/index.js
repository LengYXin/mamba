const path = require('path');
const appConfig = require('./app.config');
const webpackChain = require('./webpackChain');
const config = {
  projectName: 'weapp',
  date: '2021-8-10',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  env: appConfig,
  defineConstants: {

  },
  alias: {
    '~': path.resolve(process.cwd(), 'src'),
    'lodash-es': require.resolve("lodash").replace('lodash.js', '')
  },
  copy: {
    patterns: [
      {
        from: webpackChain.injectVant(),
        to: "dist/vant"
      },
      {
        from: 'plugins',
        to: "dist"
      },
    ],
    options: {
    }
  },
  framework: 'react',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: [
            /^.van-.*?$/,  // 这里是vant-weapp中className的匹配模式
            /^.image-.*?$/,  // 这里是vant-weapp中className的匹配模式
          ]
        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]-[local]-[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]-[local]-[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
