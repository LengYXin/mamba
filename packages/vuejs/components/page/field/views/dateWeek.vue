<template>
  <span>
    <template v-if="_readonly">
      <span v-text="value"></span>
    </template>
    <template v-else>
      <a-week-picker
        v-model="value"
        :placeholder="_placeholder"
        :disabled="disabled"
        v-bind="_fieldProps"
      />
    </template>
  </span>
</template>
<script lang="ts">
import { Vue, Component, Prop, Mixins, Inject } from "vue-property-decorator";
import { FieldBasics } from "../script";
@Component({ components: {} })
export default class extends Mixins(FieldBasics) {
  // 表单状态值
  @Inject() readonly declare formState;
  // 自定义校验状态
  // @Inject() readonly formValidate;
  // 实体
  @Inject() readonly declare PageEntity;
  // 表单类型
  @Inject({ default: "" }) readonly declare formType;
  async mounted() {
    // this.onRequest();
    if (this.debug) {
      console.log("");
      console.group(`Field ~ ${this.entityKey} ${this._name} `);
      console.log(this);
      console.groupEnd();
    }
  }
}
</script>
<style lang="less"></style>
