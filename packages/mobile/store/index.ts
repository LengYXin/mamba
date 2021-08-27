import { BasesController } from "@mamba/clients";
import { configure } from "mobx";
import "./global";
configure({ enforceActions: "observed" });
// basesOptions.reactive = function () {
// }
type TestEntity = {
  key: string;
  name: string;
  avatar: string;
  birthday: string;
  gender: string;
  introduce: string;
};
// 状态 导出
export default () => {
  return {
    /** 示例 瀑布流 */
    Example: new BasesController<TestEntity>({
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
    Pagination: new BasesController<TestEntity>({ target: 'http://127.0.0.1:7001/api/mock', infinite: false }),
  };
};

declare module "vue/types/vue" {
  interface Vue {

  }
}
declare module "vuex/types/index" {
  interface Store<S> {
    /**
     * 测试
     */
    readonly Example: BasesController<TestEntity>;
    readonly Pagination: BasesController<TestEntity>;
  }
}