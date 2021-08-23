import { Locale } from 'antd/es/locale-provider';
import AntdEn from 'antd/es/locale/en_US';
import AntdZh from 'antd/es/locale/zh_CN';
import 'dayjs/locale/es';
import 'dayjs/locale/zh';
import i18n from "i18next";
import lodash from 'lodash';
import React from 'react';
import { initReactI18next } from "react-i18next";
import en from './en';
import zh from './zh';
const locales = {
    en,
    zh,
}
const files = require.context('~/pages', true, /locales.ts$/) // 根据目录结构去搜索文件
files.keys().map(x => {
    const locale = files(x).default
    lodash.assign(locales.en, locale.en)
    lodash.assign(locales.zh, locale.zh)
})
i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            en: {
                translation: locales.en
            },
            zh: {
                translation: locales.zh
            }
        },
        lng: 'zh',
        keySeparator: false, // we do not use keys in form messages.welcome
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });
lodash.set(React, '$i18n', i18n)
Object.defineProperty(React.Component.prototype, '$i18n', {
    get: function () { return i18n }
})
Object.defineProperty(React.Component.prototype, 'getAntdLocale', {
    get: () => (locale) => lodash.get({ zh: AntdZh, en: AntdEn }, locale)
})
declare module 'react' {
    /**
     * 多语言
     */
    const $i18n: typeof i18n;
    interface Component {
        /**
         * 多语言
         */
        readonly $i18n: typeof i18n
        readonly getAntdLocale: (locale) => Locale
    }
}
export const Enumlocales = lodash.mapValues(lodash.cloneDeep(zh), (val, key) => key)
export default locales

