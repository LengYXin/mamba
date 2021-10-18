<template>
  <page-provider :PageController="PageController" :PageEntity="PageEntity">
    <ViewFilter />
    <ViewAction />
    <a-divider />
    <ViewGrid />
    <page-view width="800px">
      <ViewDetails />
    </page-view>
  </page-provider>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PageController, { PageEntity } from "./controller";
import { EnumPageMeta } from "./locales";
import ViewAction from "./views/action.vue";
import ViewDetails from "./views/details.vue";
import ViewFilter from "./views/filter.vue";
import ViewGrid from "./views/grid.vue";
@Component({
  head: EnumPageMeta,
  components: {
    ViewAction,
    ViewFilter,
    ViewGrid,
    ViewDetails,
  },
})
export default class extends Vue {
  // 外部 访问
  static PageController = PageController;
  static PageEntity = PageEntity;
  // 内部 this 访问
  readonly PageController = PageController;
  readonly PageEntity = PageEntity;
  created() { }
  mounted() {
    Vue.$Mamba.Log.success(`Page [${EnumPageMeta.title}]`, this)
  }
}
</script>
<style lang="less">
</style>
