import { SettingDrawerState } from '@ant-design/pro-layout';
import dayjs from 'dayjs';
import lodash from 'lodash';
import { action, configure, observable, toJS } from 'mobx';
import { create, IHydrateResult, persist } from 'mobx-persist';
import React from 'react';
import { UserAgent } from './userAgent';
configure({ enforceActions: "observed" });
const Hydrate = create({ storage: window.localStorage, jsonify: true });
lodash.set(React, 'Hydrate', (key: string, store: any, initialState?: any) => {
    const config: AppConfig = store instanceof AppConfig ? store : React.AppConfig;
    return Hydrate(config.createStorage(key), store, initialState)
})
declare type AppSettings = SettingDrawerState & {
    /** 表单弹框类型 */
    formType: 'Modal' | 'Drawer'
};
export class AppConfig {
    constructor() {
        // makeObservable(this)
        // this.onInspectVersion();
        React.Hydrate('AppConfig', this).then(() => {
            this.onChangeLanguage()
        })
    }
    @persist('object')
    @observable
    AppSettings: AppSettings = {
        language: 'zh',
        formType: 'Modal',
        fixSiderbar: true,
        fixedHeader: true,
    };
    get LayoutSettings(): SettingDrawerState {
        return lodash.omit(this.AppSettings, ['formType'])
    }
    /**
     * api 地址
     * @memberof AppConfig
     */
    target = process.env.target;
    /**
     * 环境设备信息
     * @memberof AppConfig
     */
    userAgent = new UserAgent()
    /**
     *   localStorage  前缀 
     * @memberof AppConfig
     */
    storagePrefix = "_le_";
    /**
     * 版本信息
     * @memberof AppConfig
     */
    version = process.env.REACT_APP_VERSION;
    /**
     * 构建时间戳
     * @memberof AppConfig
     */
    timestamp = process.env.REACT_APP_Timestamp;
    /**
     * Node env
     * @memberof AppConfig
     */
    NODE_ENV = process.env.NODE_ENV;
    /**
     * 环境
     * @memberof AppConfig
     */
    DEPLOY_ENV = process.env.REACT_APP_ENV;
    /**
     * 本地 dev
     * @memberof AppConfig
     */
    get dev() {
        return this.NODE_ENV === 'development'
    }
    /**
     *生产环境
     * @memberof AppConfig
     */
    get production() {
        return this.DEPLOY_ENV === 'pro'
    }
    /**
     * 更改配置
     * @param config 
     */
    @action.bound
    onChangeAppSettings(AppSettings: Partial<AppSettings>) {
        this.AppSettings = lodash.assign(toJS(this.AppSettings), AppSettings)
        this.onChangeLanguage()
        React.$Mamba.Log.warning('AppConfig ~ onChangeConfig', this)
    }
    /**
     * 更改语言
     * @param config 
     */
    onChangeLanguage() {
        dayjs.locale(this.AppSettings.language)
        React.$i18n.changeLanguage(this.AppSettings.language)
    }
    /**
     * 创建 Storage key
     * @param key 
     */
    createStorage(key: string) {
        return this.storagePrefix + key;
    }
    /**
     * 检查版本信息 
     */
    onInspectVersion() {
        if (window && window.localStorage) {
            const version = window.localStorage.getItem('version');
            // 清理 版本 不统一缓存
            if (!lodash.eq(version, this.version)) {
                lodash.mapKeys(window.localStorage, (value, key: any) => {
                    if (lodash.startsWith(key, this.storagePrefix)) {
                        window.localStorage.removeItem(key)
                    }
                })
            }
            window.localStorage.setItem('version', this.version)
        }
    }
}
lodash.set(React, 'AppConfig', new AppConfig())
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
