<template>
  <a-popconfirm :title="title" :disabled="getDisabled(Pagination.selectedRowKeys)" @confirm="onConfirm">
    <a-button v-if="isDelete" v-bind="ButtonProps" :disabled="getDisabled(Pagination.selectedRowKeys)">
      <template v-if="isPageAction">
        <a-icon type="delete" />
      </template>
      <i18n-t :keypath="$locales.action_delete" />
    </a-button>
  </a-popconfirm>
</template>
<script lang="ts">
import { Vue, Component, Mixins, Prop } from "vue-property-decorator";
import { BasesController } from "@mamba/clients";
import { ActionBasics } from "./script";
import { observer } from "mobx-vue";
@observer
@Component({ components: {} })
export default class extends Mixins(ActionBasics) {
  @Prop() readonly PageController: BasesController;
  get $locales() {
    return this.$Enumlocales
  }
  getDisabled(selectedRowKeys) {
    if (this.isRowAction) {
      return false;
    }
    return !selectedRowKeys.length;
  }
  get title() {
    return this.$t(this.$locales.action_deleteConfirm, { label: this.isRowAction ? 1 : this.Pagination.selectedRowKeys.length })
  }
  get successMsg() {
    return this.$t(this.$locales.tips_success_operation)
  }
  get errorMsg() {
    return this.$t(this.$locales.tips_error_operation)
  }
  async onConfirm() {
    // 得先获取 内容 删除后获取 组件卸载就娶不到了
    const { successMsg, errorMsg } = this;
    try {
      const remKey = this.isRowAction ? this.rowKey : this.Pagination.selectedRowKeys
      await this.PageController.onDelete(remKey);
      // this.$message.success(successMsg)
    } catch (error) {
      // this.$message.error(errorMsg)
    }
  }
  created() { }
  mounted() { }
}
</script>
<style lang="less">
</style>
