<template>
  <page-details :loading="PageController.Details.loading" :onFinish="onFinish">
    <page-field entityKey="Key" />
    <page-field entityKey="Name" />
    <page-field entityKey="Avatar" />
    <page-field entityKey="Birthday" />
    <page-field entityKey="Gender" />
    <page-field entityKey="Introduce" />
  </page-details>
</template>

<script lang="ts">
import { PageDetailsBasics } from "@/components";
import { Component, Mixins, Provide } from "vue-property-decorator";
import PageController from "../controller";
@Component({ components: {} })
export default class extends Mixins(PageDetailsBasics) {
  readonly PageController = PageController;
  @Provide() readonly formState = {
    key: '',
    name: '',
    avatar: '',
    birthday: '',
    gender: '',
    introduce: '',
  };
  created() { }
  async mounted() {
    this.onLoading();
  }
}
</script>
<style lang="less">
</style>
