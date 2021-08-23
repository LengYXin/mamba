<template>
  <page-filter :PageController="PageController" @finish="onFinish" @reset="onReset">
    <page-field entityKey="Name_Filter" />
    <page-field entityKey="Gender_Filter" />
    <page-field entityKey="Gender_Filter" />
    <template #more>
      <page-field entityKey="Gender_Filter" />
      <page-field entityKey="Gender_Filter" />
      <page-field entityKey="Gender_Filter" />
    </template>
  </page-filter>
</template>
<script lang="ts">
import { Component, Provide, Vue } from "vue-property-decorator";
import PageController from "../controller";
import { EnumLocaleLabel } from "../locales";
@Component({ components: {} })
export default class extends Vue {
  readonly PageController = PageController;
  @Provide() readonly formState = {
    name: undefined,
    gender: undefined
  };
  readonly EnumLocaleLabel = EnumLocaleLabel;
  async onFinish(values) {
    return this.PageController.onLoad({ body: values });
  }
  async onReset(values) {
    return this.onFinish(values);
  }
  mounted() { }
}
</script>
<style lang="less">
</style>
