/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2021-08-25 17:26:01
 * @modify date 2021-08-25 17:26:01
 * @desc [全局环境变量]
 * @release 正式 生成环境
 * @trial 预览环境 test uat 等
 * @develop 开发环境
 */
const dayjs = require("dayjs")
const lodash = require("lodash")
const APP_ENV = process.env.APP_ENV || "develop";
const config = {
  // 路径
  BuildDir: `build/${APP_ENV}/${lodash.snakeCase(process.env.npm_package_version)}`,
  // 静态资源地址 
  Static: "",
  // 域名
  Domain: {
    release: 'http://127.0.0.1:8000',
    trial: 'http://127.0.0.1:8000',
    develop: "http://127.0.0.1:8000",
  },
  // api 地址
  Target: {
    release: 'http://127.0.0.1:8000',
    trial: "http://127.0.0.1:8000",
    develop: "http://127.0.0.1:8000",
  },
  // 版本号
  Version: process.env.npm_package_version,
  // 构建时间
  Timestamp: dayjs().format("YYYY-MM-DD HH:mm"),
  // 环境 uat release
  APP_ENV: APP_ENV,
  // NODE_ENV
  NODE_ENV: process.env.NODE_ENV,
};
module.exports = (isAll = false) => {
  if (isAll) {
    return config
  }
  return lodash.mapValues(config, value => {
    // 返回对应环境配置
    if (lodash.isObject(value) && lodash.has(value, APP_ENV)) {
      value = lodash.get(value, APP_ENV)
    }
    return value
  })
}