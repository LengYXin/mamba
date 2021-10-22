<template>
  <span>
    <template v-if="_readonly">
      <span v-text="value"></span>
    </template>
    <template v-else>
      <codemirror class="app-codeMirror" v-model="value" :options="cmOptions" />
    </template>
  </span>
</template>
<script lang="ts">
import { Vue, Component, Prop, Mixins, Inject } from "vue-property-decorator";
import { FieldBasics } from "../script";
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import lodash from "lodash";
@Component({
  components: {
    codemirror
  }
})
export default class extends Mixins(FieldBasics) {
  // 表单状态值
  @Inject() readonly declare formState;
  // 自定义校验状态
  // @Inject() readonly formValidate;
  // 实体
  @Inject() readonly declare PageEntity;
  // 表单类型
  @Inject({ default: "" }) readonly declare formType;
  get value() {
    return JSON.stringify(lodash.get(this.formState, this._name), null, 4);
  }
  set value(value) {
    lodash.set(this.formState, this._name, JSON.parse(value));
    this.onChangeValue()
  }
  cmOptions = {
    tabSize: 4,
    mode: 'text/javascript',
    theme: 'base16-dark',
    lineNumbers: true,
    line: true,
  }
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
<style lang="less">
.app-codeMirror {
  .CodeMirror {
    height: 800px;
  }
}
</style>
