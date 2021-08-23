const webpackChain = require('./webpackChain');
module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {
  },
  mini: {
    enableSourceMap: true,
    sourceMapType: 'source-map',
    webpackChain(chain, webpack) {
      webpackChain.analyzer(chain)
      webpackChain.compile(chain)
    }
  },
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  }
}
