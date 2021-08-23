<template>
  <a-spin :spinning="spinning">
    <template v-if="_readonly">
      <span v-text="readonlyText"></span>
    </template>
    <template v-else>
      <a-radio-group
        v-model="value"
        :placeholder="_placeholder"
        :disabled="disabled"
        v-bind="_fieldProps"
      >
        <a-radio
          v-for="item in dataSource"
          :key="item.value"
          :value="item.value"
        >
          <span v-text="item.label"></span>
        </a-radio>
      </a-radio-group>
    </template>
  </a-spin>
</template>
<script lang="ts">
import lodash from "lodash";
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
  get readonlyText() {
    const filters = lodash.filter(this.dataSource, item =>
      lodash.includes(this.value, item.value)
    );
    return lodash.map(filters, "label").join(" / ");
  }
  async mounted() {
    this.onRequest();
    this.onLinkage();
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
