<template>
  <page-action :PageController="PageController" :params="params" />
</template>
<script lang="ts">
import { Inject, Component, Vue } from "vue-property-decorator";
import { PageController } from "../controller";
@Component({ components: {} })
export default class extends Vue {
  // page Inject 注入 row 为 toRowAction 注入
  @Inject() readonly PageController: PageController;
  /**
   * 行 操作 aggrid 传入
   * @type {ICellRendererParams}
   * @memberof Action
   */
  readonly params = {};
  mounted() { }
}
</script>
<style lang="less">
</style>
