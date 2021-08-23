import taro from '@tarojs/taro';
import React from 'react';
// 路由
Object.defineProperty(React.Component.prototype, "$Router", {
    get: () => taro.getCurrentInstance().router
});
declare module 'react' {
    interface Component {
        /** 路由参数 */
        readonly $Router: taro.RouterInfo;
    }
}