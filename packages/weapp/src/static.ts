import React from "react";

/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:13:07
 * @modify date 2020-08-05 14:13:07
 * @desc 静态资源
 */
export const Static = {

}
// 静态资源
Object.defineProperty(React.Component.prototype, "$Static", {
    get: () => Static,
});
declare module "react" {
    interface Component {
        /** 静态资源 */
        readonly $Static: typeof Static;
    }
}