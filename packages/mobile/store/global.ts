import * as Mamba from '@mamba/clients';
import lodash from 'lodash';
import { BindAll } from 'lodash-decorators';
import Vue from 'vue';
import { UserAgent } from './userAgent';
@BindAll()
export class AppConfig {
    constructor() {
        Mamba.Log.info('AppConfig', this)
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
lodash.set(Vue, 'AppConfig', new AppConfig())
Object.defineProperty(Vue.prototype, 'AppConfig', {
    get: function () { return Vue.AppConfig }
})
declare module 'vue/types/vue' {
    interface Vue {
        AppConfig: AppConfig
    }
    interface VueConstructor<V extends Vue = Vue> {
        AppConfig: AppConfig
    }
}