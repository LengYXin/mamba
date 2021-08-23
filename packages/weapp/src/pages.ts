import queryString from 'query-string';
import lodash from "lodash";
import React from "react";
export enum Pages {
    /** 首页 */
    Home = "/tabBar/home/index",
    /** 测试详情 */
    Details = "/pages/details/index",
    /** 裁剪图片 */
    Cropper = "/pages/cropper/index",
    /** web */
    WebView = "/pages/webview/index",
}
// 页面地址
Object.defineProperty(React.Component.prototype, "$Pages", {
    get: () => Pages,
});
// 创建 页面地址 转换参数
Object.defineProperty(React.Component.prototype, "$CreatePageUrl", {
    get: () => (url, query) => {
        url = React.$Mamba.AjaxBasics.queryParamsToUrl(url, query);
        url = queryString.stringifyUrl({ url, query: lodash.pickBy(query, lodash.identity) })
        return url
    }
});
declare module "react" {
    interface Component {
        /** 页面枚举 */
        readonly $Pages: typeof Pages;
        /** 创建路由链接地址 */
        readonly $CreatePageUrl: (url: Pages, query: any) => string;
    }
}
