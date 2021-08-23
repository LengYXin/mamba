<template>
  <page-action :PageController="PageController" :params="params" />
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PageController from "../controller";
@Component({ components: {} })
export default class extends Vue {
  readonly PageController = PageController;
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
