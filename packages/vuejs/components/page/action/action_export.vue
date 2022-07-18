<template>
  <a-dropdown v-if="isExport">
    <template #overlay>
      <a-menu @click="onMenuClick">
        <a-menu-item :key="EnumActionType.Export" v-if="onAuthority(EnumActionType.Export)">
          <i18n-t :keypath="$locales.action_exportAll" />
        </a-menu-item>
        <a-menu-item :key="EnumActionType.ExportIds" v-if="onAuthority(EnumActionType.ExportIds)">
          <i18n-t :keypath="$locales.action_exportSelect" />
        </a-menu-item>
      </a-menu>
    </template>
    <a-button v-bind="ButtonProps">
      <template v-if="isPageAction">
        <a-icon type="cloud-download" />
      </template>
      <i18n-t :keypath="$locales.action_export" />
    </a-button>
  </a-dropdown>
</template>
<script lang="ts">
import { BasesController, EnumActionType } from "@mamba/clients";
import lodash from "lodash";
import { observer } from "mobx-vue";
import { Component, Mixins, Prop, Inject } from "vue-property-decorator";
import { ActionBasics } from "./script";
@observer
@Component({ components: {} })
export default class extends Mixins(ActionBasics) {
  /** 页面控制器 */
  @Inject() readonly PageController: BasesController;
  EnumActionType = EnumActionType
  get $locales() {
    return this.$Enumlocales
  }
  onExport() {
    // this.PageController.onExport()
  }
  onMenuClick(event) {
    console.log("LENG ~ extends ~ onMenuClick ~ event", event)

  }
  created() { }
  mounted() { }
}
</script>
<style lang="less">
</style>
