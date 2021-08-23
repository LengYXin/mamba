<template>
  <div class="w-uploader" :class="{ 'w-uploader-readonly': _readonly }">
    <a-upload
      v-model="value"
      :disabled="disabled || _readonly"
      :multiple="true"
      :action="action"
      :before-upload="beforeUpload"
      :remove="onRemove"
      @change="onChange"
      v-bind="_fieldProps"
    >
      <a-button>
        <upload-outlined />Upload
      </a-button>
    </a-upload>
  </div>
</template>
<script lang="ts">
import lodash from "lodash";
import { Vue, Component, Watch, Mixins, Inject } from "vue-property-decorator";
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
  @Inject({ default: '' }) readonly declare formType;
  get action() {
    return //$System.FilesController.getUploadUrl()
  }
  get value() {
    return lodash.get(this.formState, this._name);
  }
  set value(value) {
    lodash.set(this.formState, this._name, value);
  }
  async mounted() {
    if (this.debug) {
      console.log("");
      console.group(`Field ~ ${this.entityKey} ${this._name} `);
      console.log(this);
      console.groupEnd();
    }
  }
  beforeUpload() { }
  onChange(event) {
    // if (event.file.status === 'uploading') {
    //   this.spinning = true
    // } else {
    //   this.spinning = false
    // }
  }
  onRemove(file) {
    const response = lodash.get(file, 'response')
    return response //? $System.FilesController.deleteFiles(response) : true
  }
}

</script>
<style lang="less">
.w-uploader {
  &-readonly {
    .ant-upload {
      display: none;
    }
  }
  .ant-upload-list-item-info {
    padding-right: 60px;
  }
}
</style>
