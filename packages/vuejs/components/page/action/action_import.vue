<template>
  <a-popconfirm overlayClassName="x-action-import" @confirm="onConfirm">
    <!-- <template #icon>
      <div></div>
    </template> -->
    <template #title>
      <!-- <div v-if="__wtmAuthority(EnumActionType.Template, PageController)">
        <i18n-t keypath="tips.text.importExplain" />
        <a-divider type="vertical" />
        <a-button @click="onGetTemplate">
          <template #icon>
            <CloudUploadOutlined />
          </template>
          <i18n-t :keypath="$locales.action_downloadTemplate" />
        </a-button>
        <a-divider style="margin:8px" />
      </div>-->
      <a-upload-dragger
        name="file"
        :multiple="true"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        @change="onChange"
      >
        <p class="ant-upload-drag-icon">
          <inbox-outlined />
        </p>
        <p class="ant-upload-text">
          <i18n-t :keypath="$locales.tips_text_upload" />
        </p>
      </a-upload-dragger>
    </template>
    <a-button v-if="isImport" v-bind="ButtonProps">
      <template v-if="isPageAction">
        <a-icon type="cloud-upload" />
      </template>
      <i18n-t :keypath="$locales.action_import" />
    </a-button>
  </a-popconfirm>
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
  onConfirm() {

  }
  onChange() {

  }
  created() { }
  mounted() { }
}
</script>
<style lang="less">
.x-action-import {
  .ant-popover-message-title {
    padding: 0;
  }
  .ant-upload.ant-upload-drag .ant-upload {
    padding: 16px;
  }
}
</style>
