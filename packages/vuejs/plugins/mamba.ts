import * as Mamba from '@mamba/clients';
import { message } from 'ant-design-vue';
import lodash from 'lodash';
import NProgress from 'nprogress';
import Vue from 'vue';
Mamba.AjaxBasics.onStart = NProgress.start;
Mamba.AjaxBasics.onEndAll = NProgress.done;
Mamba.AjaxBasics.onError = (error, AjaxConfig) => {
    message.error('网络开小差了,请稍后再试~')
}
lodash.set(Vue, '$Mamba', Mamba)
lodash.set(Vue, 'BasesController', Mamba.BasesController)
lodash.set(Vue, 'BasesDetails', Mamba.BasesDetails)
lodash.set(Vue, 'BasesPagination', Mamba.BasesPagination)
lodash.set(Vue, 'BaseModel', Mamba.BaseModel)
declare module "vue/types/vue" {
    interface VueConstructor<V extends Vue = Vue> {
        /** Dayjs */
        $Mamba: typeof Mamba;
        /** 基础 控制器 */
        BasesController: Mamba.BasesController
        /** 基础 状态管理 */
        BaseModel: Mamba.BaseModel
        /** 基础 数据详情 */
        BasesDetails: Mamba.BasesDetails
        /** 基础 分页列表数据管理 */
        BasesPagination: Mamba.BasesPagination
    }

}