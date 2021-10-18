<template>
  <a-button v-if="isInfo" v-bind="ButtonProps" :disabled="getDisabled(Pagination.selectedRowKeys)" @click="onToDetails">
    <template v-if="isPageAction">
      <a-icon type="eye" />
    </template>
    <i18n-t :keypath="$locales.action_info" />
  </a-button>
</template>
<script lang="ts">
import { BasesController } from "@mamba/clients";
import lodash from "lodash";
import { observer } from "mobx-vue";
import { Component, Mixins, Prop, Inject } from "vue-property-decorator";
import { ActionBasics } from "./script";
@observer
@Component({ components: {} })
export default class extends Mixins(ActionBasics) {
  /** 页面控制器 */
  @Inject() readonly PageController: BasesController;
  /** 请求参数 */
  @Prop({}) toQuery;
  get $locales() {
    return this.$Enumlocales
  }
  getDisabled(selectedRowKeys) {
    if (this.isRowAction) {
      return false;
    }
    return !lodash.eq(selectedRowKeys.length, 1);
  }
  getRowData() {
    if (this.isRowAction) {
      return lodash.cloneDeep(this.rowParams.data);
    }
    return lodash.cloneDeep(lodash.head(this.Pagination.selectedRowKeys))
  }
  onToDetails() {
    const rowData = this.getRowData()
    let query = {

    }
    if (lodash.hasIn(this.$props, 'toQuery')) {
      query = lodash.invoke(this.$props, 'toQuery', rowData, this)
    }
    this.__ToDetails(lodash.assign({ 'details': lodash.get(rowData, this.PageController.options.dataKey) }, query, { _readonly: '' }))
  }
  created() { }
  mounted() { }
}
</script>
<style lang="less">
</style>
