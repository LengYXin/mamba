const webpackChain = require('./webpackChain');
module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
  },
  mini: {
    sourceMapType: 'source-map',
    webpackChain(chain, webpack) {
      webpackChain.optimization(chain)
      webpackChain.compile(chain)
    }
  },
  h5: {}
}
