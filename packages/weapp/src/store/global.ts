import * as Mamba from '@mamba/clients';
import taro from '@tarojs/taro';
import lodash from 'lodash';
import { configure } from 'mobx';
import { IHydrateResult } from 'mobx-persist';
import React from 'react';
configure({ enforceActions: "observed" });
const Hydrate = Mamba.BasesOptions.createHydrate();
lodash.set(React, 'Hydrate', (key: string, store: any, initialState?: any) => {
    const config: AppConfig = store instanceof AppConfig ? store : React.AppConfig;
    return Hydrate(config.createStorageKey(key), store, initialState)
})
export class AppConfig extends Mamba.ClientsEnv {
    /**
     * 获取小程序启动时的参数。与 App.onLaunch 的回调参数一致。
     * @memberof AppConfig
     */
    LaunchOptions = taro.getLaunchOptionsSync();
    /**
     * 小程序帐号信息
     * @memberof AppGlobal
     */
    MiniProgram = taro.getAccountInfoSync().miniProgram;
    /**
     * 获取系统信息同步接口。
     * @memberof AppGlobal
     */
    SystemInfo = taro.getSystemInfoSync();
    /**
     * 获取菜单按钮（右上角胶囊按钮）的布局位置信息。坐标信息以屏幕左上角为原点。
     * @memberof AppGlobal
     */
    ClientRect = taro.getMenuButtonBoundingClientRect()
    /**
     * 微信 appId
     * @memberof AppGlobal
     */
    readonly appId = this.MiniProgram.appId;
    /**
     * api 地址
     * @memberof AppConfig
     */
    readonly target = lodash.get(process.env.Target, this.MiniProgram.envVersion);
    /**
     * 本地 dev
     * @memberof AppConfig
     */
    readonly develop = lodash.eq(this.MiniProgram.envVersion, 'develop');
    /**
     * 生产环境
     * @memberof AppConfig
     */
    readonly release = lodash.eq(this.MiniProgram.envVersion, 'release');
    /**
     * 预览环境
     * @memberof AppConfig
     */
    readonly trial = lodash.eq(this.MiniProgram.envVersion, 'trial');
    /**
     * 创建 Storage key
     * @param key 
     */
    createStorageKey(key: string) {
        return this.storagePrefix + key;
    }
}
lodash.set(React, 'AppConfig', new AppConfig())
React.AppConfig.injectClients()
Object.defineProperty(React.Component.prototype, 'AppConfig', {
    get: function () { return React.AppConfig }
})
declare module 'react' {
    /**
     * 全局设置
     */
    const AppConfig: AppConfig;
    /**
     * mobx-persist
     */
    const Hydrate: <T extends Object>(key: string, store: T, initialState?: any) => IHydrateResult<T>;
    interface Component {
        /** 全局设置 */
        readonly AppConfig: AppConfig
    }
}
