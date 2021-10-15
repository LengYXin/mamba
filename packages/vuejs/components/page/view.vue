/** * @author 冷 (https://github.com/LengYXin) * @email
lengyingxin8966@gmail.com * @create date 2021-03-12 17:20:19 * @modify date
2021-03-12 17:20:19 * @desc 详情视图 modal 或者 drawer 方式 根据全局配置而定 */
<template>
  <a-modal
    v-if="isModal"
    class="w-view"
    footer
    :width="_width"
    :visible="visible"
    :title="_title"
    destroyOnClose
    @cancel="onCancel"
  >
    <slot v-if="visible" />
  </a-modal>
  <a-drawer
    v-else
    class="w-view"
    :width="_width"
    :visible="visible"
    :title="_title"
    placement="right"
    destroyOnClose
    @close="onCancel"
  >
    <slot v-if="visible" />
  </a-drawer>
</template>

<script lang="ts">
import lodash from "lodash";
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class extends Vue {
  /** query参数的Key 默认取 detailsVisible */
  @Prop({ default: 'details' }) readonly queryKey: string;
  /** 固定页面 只在第一次打开的页面有效 */
  @Prop({ default: true }) readonly fixedPage: boolean;
  /** 标题  */
  @Prop() readonly title: string;
  @Prop() readonly width;
  /** 弹框类型 */
  @Prop() readonly modalType: "modal" | "drawer";

  /** 记录创建 时的 page */
  PageKey = null;
  get visibleKey() {
    return this.queryKey;
  }
  get isModal() {
    const width = window.innerWidth;
    const modalType = this.modalType || "drawer";
    return lodash.eq(modalType, "modal") && width > 701;
  }
  get query() {
    return lodash.clone(this.$route.query);
  }
  get visible() {
    const visible = lodash.has(this.query, this.visibleKey);
    if (this.fixedPage) {
      return lodash.eq(this.PageKey, this.$route.name) && visible;
    }
    return visible;
  }
  // 只读
  get readonly() {
    return lodash.has(this.$route.query, "_readonly");
  }
  get _title() {
    if (this.title) {
      return this.title;
    }
    if (lodash.get(this.query, this.visibleKey)) {
      // return this.$t(
      //   this.readonly ? this.$locales.action_info : this.$locales.action_update
      // );
      return this.readonly ? '详情' : '编辑'
    }
    return "详情";
  }
  get _width() {
    if (this.width) {
      return this.width
    }
    const width = window.innerWidth * 0.5;
    return lodash.max([500, width > 800 ? 800 : width]);
  }
  onCancel() {
    this.__BackDetails(this.visibleKey);
  }
  created() { }
  mounted() {
    console.log("LENG ~ extends ~ mounted ~ mounted", this)
    this.PageKey = this.$route.name;
  }
}
</script>
<style lang="less">
.w-view {
  &.ant-modal {
    min-width: 650px;
    .ant-modal-body {
      max-height: 75vh;
      // position: relative;
      overflow: auto;
    }
  }
  &.ant-drawer {
    .ant-drawer-content-wrapper {
      max-width: 100vw;
    }
  }
}
</style>
