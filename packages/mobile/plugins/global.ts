import * as Mamba from '@mamba/clients';
import lodash from 'lodash';
import { BindAll } from 'lodash-decorators';
import Vue from 'vue';
import { UserAgent } from './userAgent';
@BindAll()
export class AppConfig extends Mamba.ClientsEnv {
    /**
     * 环境设备信息
     * @memberof AppConfig
     */
    readonly userAgent = new UserAgent()
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
export const $AppConfig = new AppConfig();
Object.defineProperty(Vue.prototype, "AppConfig", {
    get: lodash.constant($AppConfig),
});
declare module 'vue/types/vue' {
    interface Vue {
        AppConfig: AppConfig
    }
    interface VueConstructor<V extends Vue = Vue> {
        AppConfig: AppConfig
    }
}