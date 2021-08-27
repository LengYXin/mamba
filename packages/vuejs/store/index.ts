import { BasesController } from "@mamba/clients";
import { configure } from "mobx";
import "./global";
configure({ enforceActions: "observed", isolateGlobalState: true });
// 状态 导出
export default () => {
  return {
   
  };
};

declare module "vue/types/vue" {
  interface Vue {

  }
}
declare module "vuex/types/index" {
  interface Store<S> {
   
  }
}