/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2021-08-25 17:26:01
 * @modify date 2021-08-25 17:26:01
 * @desc [全局环境变量]
 */
const dayjs = require("dayjs")
const lodash = require("lodash")
const APP_ENV = process.env.APP_ENV || "dev"
module.exports = {
  // 路径
  BuildDir: `build/${lodash.snakeCase(process.env.npm_package_version)}_${APP_ENV}`,
  // 静态资源地址 
  Static: "",
  // 微信 App id
  // Appid: getWXAppid(),
  // 微信 开放平台 App id
  // OpenAppid: getOpenWXAppid(),
  // 阿里云日志
  // logger: getLogger(),
  // 域名
  Domain: getDomain(),
  // api 地址
  Target: getTarget(),
  // 版本号
  Version: process.env.npm_package_version,
  // 构建时间
  Timestamp: dayjs().format("YYYY-MM-DD HH:mm"),
  // 环境 uat pro
  APP_ENV: APP_ENV,
  // NODE_ENV
  NODE_ENV: process.env.NODE_ENV,
}
/**
 * API target
 * @param {*} env
 */
function getTarget() {
  const config = {
    pro: 'https://api.xuantong.cn',
    test: "https://testing-apigateway.xuantong.cn",
    dev: "https://dev-apigateway.xuantong.cn",
  }
  return lodash.get(config, APP_ENV, config.dev)
}

/**
 * BrowerLogger Pid
 * @param {*} env
 */
function getLogger() {
  const config = {
    pro: "eezf26fnf7@28cba52101faf87",
    test: "eezf26fnf7@6a3127b144fee09",
    dev: "eezf26fnf7@6e838dc7df22228",
  }
  return lodash.get(config, APP_ENV, config.dev)
}
/**
 * 微信 微信 Appid
 * @param {*} env
 */
function getWXAppid() {
  const config = {
    pro: 'wx0a9411aa3ac42890',
    test: 'wx6a0d56eb1c12553b',
    dev: "wx8dc5947f8f9a3d8a",
  }
  return lodash.get(config, APP_ENV, config.dev)
}
/**
 * 开放平台 微信 Appid pc扫码登录
 * @param {*} env
 */
function getOpenWXAppid() {
  const config = {
    pro: 'wx86b9c08d1269ab6e',
    test: 'wxe3c9b33fb107e610',
    dev: "wxf569186c8e22c135",
  }
  return lodash.get(config, APP_ENV, config.dev)
}
/**
 * 域名
 * @param {*} env
 */
function getDomain() {
  const config = {
    pro: 'https://www.xuantong.cn',
    test: 'https://testing.xuantong.cn',
    dev: "https://dev.xuantong.cn",
  }
  return lodash.get(config, APP_ENV, config.dev)
}
