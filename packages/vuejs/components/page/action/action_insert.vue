<template>
  <a-button v-if="isInsert" v-bind="ButtonProps" @click="__ToDetails()">
    <template v-if="isPageAction">
      <a-icon type="plus" />
    </template>
    <i18n-t :keypath="$locales.action_insert" />
  </a-button>
</template>
<script lang="ts">
import { Vue, Component, Mixins, Prop } from "vue-property-decorator";
import { BasesController } from "@mamba/clients";
import { ActionBasics } from "./script";
@Component({ components: {} })
export default class extends Mixins(ActionBasics) {
  @Prop() readonly PageController: BasesController;
  get $locales() {
    return this.$Enumlocales
  }
  created() { }
  mounted() { }
}
</script>
<style lang="less">
</style>
