/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2021-03-12 17:19:19
 * @modify date 2021-03-12 17:19:19
 * @desc 详情表单 
 */
<template>
  <a-form-model
    class="w-form"
    ref="formRef"
    layout="vertical"
    :rules="rules"
    :model="formState"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    @submit.native.prevent
    @submit="onSubmit"
  >
    <!-- @validate="onValidate" -->
    <a-spin :spinning="spinning || loading">
      <div class="w-form-items">
        <slot />
      </div>
    </a-spin>
    <a-space class="w-form-space" align="center">
      <a-spin :spinning="spinning || loading">
        <template v-slot:indicator>
          <div></div>
        </template>
        <!-- 非只读状态显示底部按钮 -->
        <template v-if="!readonly">
          <a-button type="primary" html-type="submit">提交</a-button>
          <a-divider type="vertical" />
          <!-- <a-button @click.stop.prevent="onReset">重置</a-button> -->
          <a-button @click.stop.prevent="__BackDetails(queryKey)">取消</a-button>
        </template>
      </a-spin>
    </a-space>
  </a-form-model>
</template>

<script lang="ts">
import lodash from "lodash";
import {
Component, Inject, Prop, Provide, Ref,
Vue
} from "vue-property-decorator";
@Component({
  components: {},
})
export default class extends Vue {
  /** 表单状态 */
  @Inject() readonly formState;
  /** 自定义 校验状态 用于服务器返回 错误*/
  @Provide() formValidate = {};
  // 只读
  @Provide() formType = "details";
  /** 表单 ref */
  @Ref("formRef") readonly formRef;
  /** 表单 rules */
  @Prop({}) readonly rules;
  /** 加载中 */
  @Prop({ default: false }) readonly loading;
  @Prop({ default: "details" }) readonly queryKey: string;
  /** 数据 提交 函数 */
  @Prop({ type: Function, required: true }) readonly onFinish;
  // 只读
  get readonly() {
    return lodash.has(this.$route.query, "_readonly");
  }
  get successMsg() {
    return '成功';
  }
  get errorMsg() {
    return '失败';
  }
  spinning = false;
  labelCol = { span: 24 };
  wrapperCol = { span: 24 };
  async onSubmit(values) {
    try {
      await this.onValidate()
      this.spinning = true;
      await this.onFinish(lodash.cloneDeep(this.formState));
      this.onComplete();
    } catch (error) {
      this.onFail(error);
    }
  }
  async onReset() {
    await lodash.result(this.formRef, "resetFields");
    this.formValidate = {};
    // const values = await lodash.result(this.formRef, "validateFields");
  }
  onValidate() {
    return new Promise((res, rej) => {
      console.warn("LENG ~ Validate", lodash.cloneDeep(this.formState))
      this.formRef.validate(valid => {
        if (valid) {
          res(true)
        } else {
          rej(false)
        }
      });
    })
  }
  // 成功
  onComplete() {
    this.spinning = false;
    this.__BackDetails(this.queryKey);
    this.$message.success(this.successMsg);
  }
  // 失败
  onFail(error) {
    // const formErrors = lodash.get(error, "response.Form");
    // this.formValidate = lodash.mapValues(formErrors, (msg, key) => {
    //   return {
    //     help: msg,
    //     validateStatus: "error",
    //   };
    // });
    // console.error("LENG  ~ onFail ", this.formRef, formErrors, error);
    this.spinning = false;
    // error && this.$message.error(error)
  }
  created() { }
  mounted() {
    // this.onLoading();
    // console.log("LENG ~ extends ~ mounted ~ this", this);
  }
}
</script>
<style lang="less" scoped>
.w-form-space {
  width: 100%;
  justify-content: center;
}
</style>
<style lang="less">
.ant-modal-body,
.ant-drawer-body {
  .w-form {
    padding-bottom: 55px;
  }
  .w-form-space {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 10px 16px;
    border-top: 1px solid #e9e9e9;
    background: white;
    z-index: 1;
  }
}
.w-form-items {
  .ant-space {
    width: 100%;
    @media screen and (max-width: 785px) {
      display: block;
    }
  }

  .ant-space-item {
    flex: 1;
  }
}
</style>