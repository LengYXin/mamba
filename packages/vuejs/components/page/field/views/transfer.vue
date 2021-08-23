<template>
  <a-spin :spinning="spinning">
    <template v-if="_readonly">
      <span v-html="readonlyText"></span>
    </template>
    <template v-else>
      <a-transfer
        :dataSource="dataSource"
        :target-keys="targetKeys"
        :selected-keys="selectedKeys"
        :render="renderTitle"
        :placeholder="_placeholder"
        :disabled="disabled"
        show-search
        @change="onChange"
        @selectChange="onSelectChange"
        v-bind="_fieldProps"
      />
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
      lodash.includes(this.value, String(item.value))
    );
    return lodash.map(filters, "label").join(" <br/> ");
  }
  get targetKeys() {
    return this.value;
  }
  get selectedKeys() {
    return;
  }
  get titles() {
    return [];
  }
  renderTitle(item) {
    return item.label;
  }
  onChange(nextTargetKeys: string[], direction: string, moveKeys: string[]) {
    this.value = nextTargetKeys;
  }
  onSelectChange(sourceSelectedKeys: string[], targetSelectedKeys: string[]) {
    console.log(
      "🚀 ~ file: transfer.vue",
      sourceSelectedKeys,
      targetSelectedKeys,
      this
    );
  }
  // 加载数据源
  async onRequest() {
    this.spinning = true;
    try {
      const res = await lodash.invoke(
        this,
        "_request",
        lodash.cloneDeep(this.formState)
      );
      this.dataSource = lodash.map(res, item => {
        return lodash.assign(
          { title: item.label, description: item.label, disabled: false },
          item
        );
      });
    } catch (error) {
      console.error("LENG ~ onRequest", error);
    }
    this.spinning = false;
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
  beforeUnmount() {
    // this.dataSource = []
  }
}
</script>
<style lang="less"></style>
