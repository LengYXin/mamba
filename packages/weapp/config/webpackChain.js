/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2021-03-16 16:42:29
 * @modify date 2021-03-16 16:42:29
 * @desc [description]
 */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const fs = require('fs-extra');
const lodash = require('lodash');
const path = require('path');
module.exports = {
    /**
     * 添加 源码分析地图
     * @param {*} chain 
     */
    analyzer: chain => {
        chain
            .plugin("analyzer")
            .use(BundleAnalyzerPlugin, [
                {
                    openAnalyzer: true,
                    analyzerMode: "static",
                    reportFilename: path.resolve(process.cwd(), "report.html")
                }
            ]);
    },
    optimization: chain => {
        chain.merge({
            optimization: {
                minimize: true,
                mangleWasmImports: true,
                namedChunks: false,
                namedModules: false
            }
        })
    },
    compile: chain => {
        const mod = path.join(process.cwd(), 'node_modules')
        chain.resolve.modules.prepend(mod);
        chain.module
            .rule('compile_node_modules')
            .test(/\.(js|ts|tsx)$/)
            .exclude
            .add(path.join(process.cwd(), 'src'))
            .add(path.join(path.dirname(process.cwd()), 'clients'))
            .end()
            .use('babel')
            .loader('babel-loader')
            .options({
                presets: [
                    ['@babel/preset-env', {}]
                ]
            });
    },
    /**
     * 自动注入 Vant
     * @returns 
     */
    injectVant: () => {
        const vant = require.resolve("@vant/icons").split(path.sep).join('/').replace('icons/src/config.js', 'weapp/lib');
        const dirs = readdirSync(vant)
        // inject app.config.ts
        console.log('@inject app.config.ts')
        const inject = dirs.map(x => {
            return `'van-${x}':'vant/${x}/index'`
        }).join(',\n    ')
        const conPath = path.resolve(process.cwd(), 'src/app.config.ts')
        let conStr = fs.readFileSync(conPath).toString();
        conStr = conStr.replace(/(\/.*@InjectVant.*\/)(\D*)(\/.*@InjectVant.*\/)/, '/** @InjectVant **/ \n    '
            + inject +
            '\n    /** @InjectVant **/')
        fs.writeFileSync(conPath, conStr);
        // inject van.d.ts
        const injectDts = dirs.map(x => {
            return `'van-${x}':React.DetailedHTMLProps<van.StandardProps, any>`
        }).join(',\n    ')
        console.log('@inject van.d.ts')
        const conPathDts = path.resolve(process.cwd(), 'van.d.ts')
        let conStrDts = fs.readFileSync(conPathDts).toString();
        conStrDts = conStrDts.replace(/(\/.*@InjectVant.*\/)(\D*)(\/.*@InjectVant.*\/)/, '/** @InjectVant **/ \n    '
            + injectDts +
            '\n    /** @InjectVant **/')
        fs.writeFileSync(conPathDts, conStrDts);
        return vant
    }
};
function readdirSync(dir, files = []) {
    fs.readdirSync(dir).map(item => {
        const fsPath = path.join(dir, item)
        const stat = fs.statSync(fsPath);
        if (stat.isDirectory() && fs.existsSync(path.resolve(fsPath, 'index.wxml'))) {
            files.push(path.basename(fsPath))
        }
    })
    return files
}