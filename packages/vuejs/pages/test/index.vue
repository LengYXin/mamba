<template>
  <page-provider :PageController="PageController" :PageEntity="PageEntity">
    <div>
      <a-row :gutter="[16, 16]">
        <a-col span="4">
          <ViewList />
        </a-col>
        <a-col span="20">
          <div class="app-chars">
            <!-- <a-col span="24">
            <a-button type="primary">添加图表行</a-button>
            </a-col>-->
            <ViewRow />
          </div>
        </a-col>
      </a-row>
      <page-view width="800px" title="设置数据源">
        <ViewDetails />
      </page-view>
    </div>
  </page-provider>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PageController, { PageEntity } from "./controller";
import ViewList from "./views/list.vue";
import ViewDetails from "./views/details.vue";
import ViewRow from "./views/row.vue";
@Component({
  components: { ViewList, ViewRow, ViewDetails }
})
export default class extends Vue {
  // 内部 this 访问
  readonly PageController = PageController;
  readonly PageEntity = PageEntity;
  created() { }
  mounted() { }
  updated() { }
  destroyed() { }
}
</script>
<style lang="less" scoped>
.app-chars {
  max-height: 90vh;
  overflow: auto;
}
</style>
