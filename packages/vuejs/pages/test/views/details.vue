<template>
  <page-details :loading="PageController.Details.loading" :onFinish="onFinish">
    <page-field entityKey="Name" />
    <page-field entityKey="DataUrl" />
    <page-field entityKey="Option" />
  </page-details>
</template>

<script lang="ts">
import { PageDetailsBasics } from "@/components";
import lodash from "lodash";
import { Component, Mixins, Provide } from "vue-property-decorator";
import PageController from "../controller";
import options from "./options";
@Component({ components: {} })
export default class extends Mixins(PageDetailsBasics) {
  readonly PageController = PageController;
  @Provide() readonly formState = {
    name: '',
    option: {},
  };
  async onLoading() {
    if (this.dataKey) {
      try {
        lodash.assign(this.formState, lodash.find(options, ['name', this.dataKey]))
      } catch (error) {
      }
    }
  }
  /**
     * 传递给 details 组件的 提交函数 返回一个 Promise
     * @param values 
     * @returns 
     */
  async onFinish(values) {
    const option = lodash.find(options, ['name', this.dataKey])
    lodash.merge(option, values)
  }
  created() { }
  async mounted() {
    this.onLoading();
  }
}
</script>
<style lang="less">
</style>
