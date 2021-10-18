<template>
  <a-button v-if="isInsert" v-bind="ButtonProps" @click="__ToDetails()">
    <template v-if="isPageAction">
      <a-icon type="plus" />
    </template>
    <i18n-t :keypath="$locales.action_insert" />
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
  get $locales() {
    return this.$Enumlocales
  }
  created() { }
  mounted() { }
}
</script>
<style lang="less">
</style>
