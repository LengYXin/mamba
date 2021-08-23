<template>
  <div>
    <ViewFilter />
    <ViewAction />
    <a-divider />
    <ViewGrid />
    <page-view width="1000px">
      <ViewDetails />
    </page-view>
  </div>
</template>
<script lang="ts">
import { Component, Provide, Vue } from "vue-property-decorator";
import PageController, { PageEntity } from "./controller";
import { EnumPageMeta } from "./locales";
import ViewAction from "./views/action.vue";
import ViewDetails from "./views/details.vue";
import ViewFilter from "./views/filter.vue";
import ViewGrid from "./views/grid.vue";
@Component({
  components: {
    ViewAction,
    ViewFilter,
    ViewGrid,
    ViewDetails,
  },
})
export default class extends Vue {
  /**
   * 当前页面控制器
   * 子组件 通过 Inject 均可访问
   */
  @Provide() readonly PageController = PageController;
  /**
   * 当前实体配置
   * 子组件 通过 Inject 均可访问
   */
  @Provide() readonly PageEntity = PageEntity;
  created() { }
  mounted() {
    Vue.$Mamba.Log.success(`Page [${EnumPageMeta.title}]`, this)
  }
}
</script>
<style lang="less">
</style>
