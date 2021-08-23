
import { Context } from '@nuxt/types';
import AntdEn from 'ant-design-vue/es/locale/en_US';
import AntdZh from 'ant-design-vue/es/locale/zh_CN';
import lodash from 'lodash';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from './en';
import zh from './zh';
Vue.use(VueI18n)
const locales = {
    en,
    zh,
}
const files = require.context('@/pages', true, /locales.ts$/) // 根据目录结构去搜索文件
files.keys().map(x => {
    const locale = files(x).default
    lodash.assign(locales.en, locale.en)
    lodash.assign(locales.zh, locale.zh)
})
const Enumlocales = lodash.mapValues(lodash.cloneDeep(zh), (val, key) => key)
Object.defineProperty(Vue.prototype, '$Enumlocales', {
    get: function () { return Enumlocales }
})
Object.defineProperty(Vue.prototype, 'getAntdLocale', {
    get: () => (locale) => lodash.get({ zh: AntdZh, en: AntdEn }, locale)
})
export const $i18n = new VueI18n({
    locale: 'zh',
    fallbackLocale: 'zh',
    messages: locales
})
export default (context: Context) => {
    context.app.i18n = $i18n
}
declare module 'vue/types/vue' {
    interface Vue {
        /**
          * 语言包
          */
        readonly $Enumlocales: typeof Enumlocales
        readonly getAntdLocale: (locale) => any

    }

}