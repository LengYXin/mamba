import lodash from 'lodash';
/**
 * 默认语音包
 */
export const defaultLocales = {
    'zh': lodash.merge({}),
    'en': lodash.merge({}),
};
/**
 *  语音包扩展
 */
export function getlocales(locales?: { 'zh'?: any, 'en'?: any }) {
    return lodash.merge({}, defaultLocales, locales)
}