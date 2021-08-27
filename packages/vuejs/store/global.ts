import { $i18n } from '@/plugins';
import lodash from 'lodash';
import { BindAll } from 'lodash-decorators';
import { action, observable } from 'mobx';
import { create, IHydrateResult, persist } from 'mobx-persist';
import moment from 'moment';
import Vue from 'vue';
import { UserAgent } from './userAgent';
import * as Mamba from '@mamba/clients';
const Hydrate = create({ storage: window.localStorage, jsonify: true });
lodash.set(Vue, 'Hydrate', (key: string, store: any, initialState?: any) => {
    const config: AppConfig = store instanceof AppConfig ? store : Vue.AppConfig;
    return Hydrate(config.createStorage(key), store, initialState)
})
const AppSettingsDetault = {
    language: 'zh',
    formType: 'Modal',
    // navTheme: 'dark', // theme for nav menu
    // primaryColor: '#52C41A', // primary color of ant design
    // layout: 'sidemenu', // nav menu position: `sidemenu` or `topmenu`
    // contentWidth: 'Fluid', // layout of content: `Fluid` or `Fixed`, only works when layout is topmenu
    fixedHeader: true, // sticky header
    fixSiderbar: true, // sticky siderbar
    // colorWeak: false,
    // menu: {
    //     locale: true
    // },
    // title: 'Ant Design Pro',
    // pwa: false,
    // iconfontUrl: '',
    // production: false
}
@BindAll()
export class AppConfig extends Mamba.ClientsEnv {
    @persist('object')
    @observable
    AppSettings = lodash.cloneDeep(AppSettingsDetault);
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
    onChangeAppSettings(event: { type: string, value: any }) {
        lodash.set(this.AppSettings, event.type, event.value);
        this.onChangeLanguage()
    }
    /**
     * 更改语言
     * @param config 
     */
    onChangeLanguage() {
        $i18n.locale = this.AppSettings.language;
        moment.locale(lodash.get({ 'en': 'en', 'zh': 'zh-cn' }, this.AppSettings.language));
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
Vue.AppConfig.injectClients()
Vue.Hydrate('AppConfig', Vue.AppConfig).then(() => {
    Vue.AppConfig.onChangeLanguage()
})
Object.defineProperty(Vue.prototype, 'AppConfig', {
    get: function () { return Vue.AppConfig }
})
declare module 'vue/types/vue' {
    interface Vue {
        AppConfig: AppConfig
    }
    interface VueConstructor<V extends Vue = Vue> {
        Hydrate: <T extends Object>(key: string, store: T, initialState?: any) => IHydrateResult<T>;
        AppConfig: AppConfig
    }
}