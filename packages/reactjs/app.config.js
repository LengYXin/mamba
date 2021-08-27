/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2021-08-25 17:26:01
 * @modify date 2021-08-25 17:26:01
 * @desc [全局环境变量]
 */
 const lodash = require("lodash")
 const createEnv = require("@mamba/clients/app.config")
 const env = lodash.merge(createEnv(), {})
 console.log("LENG ~ env", env)
 module.exports = env
 