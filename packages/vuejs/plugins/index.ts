export * from './mamba'
export * from './prototype'
export * from './vueUse/antd'
export * from '@/components'
export * from './locales'
export * from './global'
import i18n from './locales'
export default (context) => {
    i18n(context);
};
