import { SettingDrawerState } from '@ant-design/pro-layout';
import dayjs from 'dayjs';
import lodash from 'lodash';
import { action, configure, observable, toJS } from 'mobx';
import { create, IHydrateResult, persist } from 'mobx-persist';
import React from 'react';
import { UserAgent } from './userAgent';
import * as Mamba from '@mamba/clients';
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
export class AppConfig extends Mamba.ClientsEnv {
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
     * 环境设备信息
     * @memberof AppConfig
     */
    readonly userAgent = new UserAgent()

    /**
     * 更改配置
     * @param config 
     */
    @action.bound
    onChangeAppSettings(AppSettings: Partial<AppSettings>) {
        const AppSettingsJS = toJS(this.AppSettings)
        if (lodash.isEqual(lodash.pick(AppSettingsJS, lodash.keys(AppSettings)), AppSettings)) {
            return
        }
        this.AppSettings = lodash.assign(AppSettingsJS, AppSettings)
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
React.AppConfig.injectClients()
React.Hydrate('AppConfig', React.AppConfig).then(() => {
    React.AppConfig.onChangeLanguage()
})
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
