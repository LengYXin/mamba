import * as Mamba from '@mamba/clients';
import lodash from 'lodash';
import Vue from 'vue';
import { $AppConfig } from './global';
type TestEntity = {
  key: string;
  name: string;
  avatar: string;
  birthday: string;
  gender: string;
  introduce: string;
};
// 状态 导出
export const Store = {
 /** 示例 瀑布流 */
 Example: new Mamba.BasesController<TestEntity>({
    target: '/api/mock',
    // 开启瀑布流 无限滚动
    infinite: true,
    // 模型 持久化
    // listModel: {
    //   storageKey: '_le_example',
    // },
    // entityModel: {
    //   storageKey: '_le_example_entity'
    // }
  }),
  /** 示例 分页 */
  Pagination: new Mamba.BasesController<TestEntity>({ target: 'http://127.0.0.1:7001/api/mock', infinite: false }),
}
// 全局状态
Object.defineProperty(Vue.prototype, "$Store", {
    get: lodash.constant(Store),
});
lodash.set(Vue, '$Store', Store)
Mamba.Log.success('【 Global 】', $AppConfig, Store, Mamba)
declare module "vue/types/vue" {
    interface VueConstructor {
        /** 全局状态 */
        $Store: typeof Store
    }
    interface Vue {
        /** 全局状态 */
        $Store: typeof Store;
    }
}
declare module "@nuxt/types" {
    interface Context {
        /** 全局状态 */
        $Store: typeof Store;
    }
}