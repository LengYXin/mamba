import { Context } from '@nuxt/types';
import lodash from 'lodash';
import { $AppConfig } from './global';
import { Store } from './store';
export * from './mamba';
export * from './prototype';
export * from './vueUse/vant';
export default async (ctx: Context) => {
    lodash.set(ctx, '$Store', Store)
    lodash.set(ctx, 'AppConfig', $AppConfig)
};