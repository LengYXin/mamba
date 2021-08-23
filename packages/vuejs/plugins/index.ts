export * from './mamba'
export * from './prototype'
export * from './antd'
export * from '@/components'
export * from './locales'
import i18n from './locales'
export default (context) => {
    i18n(context);
};
