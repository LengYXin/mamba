/**
 * @author 冷 (https://github.com/LengYXin)
 * @email [lengyingxin8966@gmail.com]
 * @create date 2021-08-03 18:41:24
 * @modify date 2021-08-06 00:17:45
 * @desc [description]
 */
 const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
const lodash = require('lodash');
const path = require('path');
const dayjs = require("dayjs");
const appConfig = require('./app.config');
const development = process.env.NODE_ENV === 'development'
process.env.REACT_APP_VERSION = process.env.npm_package_version
process.env.REACT_APP_Timestamp = dayjs().format("YYYY-MM-DD HH:mm")
module.exports = {
    plugins: createPlugins(),
    eslint: {
        // enable: false,
    },
    babel: {
        plugins: ['lodash'],
    },
    webpack: {
        alias: {
            '~': path.join(process.cwd(), 'src'),
            'lodash': require.resolve("lodash").replace('lodash.js', ''),
            'lodash-es': require.resolve("lodash").replace('lodash.js', '')
        },
        plugins: [
            new webpack.DefinePlugin(lodash.mapValues(lodash.mapKeys(appConfig, (value, key) => {
                return `process.env.${key}`
            }), value => JSON.stringify(value))),
            new BundleAnalyzerPlugin({
                openAnalyzer: true,
                analyzerMode: development ? 'disabled' : 'static',
            }),
            new AntdDayjsWebpackPlugin()
        ],
        configure,
    },
};
/**
 * 创建 plugins
 * @return {*} 
 */
function createPlugins() {
    return [
        {
            plugin: require('craco-antd'),
            options: {
                customizeThemeLessPath: path.join(__dirname, 'src/assets/styles/theme.less'),
                babelPluginImportOptions: {
                    libraryName: "antd",
                    libraryDirectory: "es",
                },
            },
        },
        {
            plugin: require("craco-less"),
            options: {
                cssLoaderOptions: {
                    modules: {
                        localIdentName: '[local]-[hash:base64:5]',
                    },
                },
                modifyLessRule: function (lessRule, context) {
                    return lodash.assign(lessRule, { test: /\.module\.less$/, exclude: undefined });
                },
            },
        }
    ]
}
/**
 * 修改 webpackConfig
 * @param {*} webpackConfig
 * @param {*} { env, paths }
 * @return {*} 
 */
function configure(webpackConfig, { env, paths }) {
    paths.appBuild = lodash.replace(paths.appBuild, 'build', appConfig.BuildDir)
    const mambaSrc = require.resolve("@mamba/clients").replace('index.ts', '')
    lodash.set(webpackConfig, 'output.path', paths.appBuild)
    lodash.update(webpackConfig, 'resolve.modules', lodash.reverse)
    lodash.update(webpackConfig, 'module.rules[1].oneOf[2].include', include => ([include, mambaSrc]))
    lodash.update(webpackConfig, 'optimization.splitChunks', splitChunks => lodash.merge(splitChunks, {
        cacheGroups: development ? {} : {
            lib: {
                test: /[\\/]node_modules[\\/](react-.*|mobx.*|core.*|rxjs.*|lodash.*|dayjs.*|bowser.*|query-string.*|i18next.*|bn.*|history.*)[\\/]/,
                chunks: 'all',
            },
            icons: {
                test: /[\\/]node_modules[\\/](.*icon.*)[\\/]/,
                chunks: 'all',
            },

        }
    }))
    return webpackConfig;
}
