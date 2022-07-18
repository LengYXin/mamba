<template>
  <div class="w-page-grid-loading">
    <a-row :gutter="16" v-for="item in 20" :key="item">
      <a-col :span="6">
        <a-skeleton :paragraph="false" />
      </a-col>
      <a-col :span="6">
        <a-skeleton :paragraph="false" />
      </a-col>
      <a-col :span="6">
        <a-skeleton :paragraph="false" />
      </a-col>
      <a-col :span="6">
        <a-skeleton :paragraph="false" />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class extends Vue {
  @Prop({ default: false }) loading;
  @Prop({ default: "material" }) theme;
  @Prop({ default: () => [] }) columnDefs;
  @Prop({}) rowData;
  @Prop({ default: () => ({}) }) gridOptions;
  created() { }
}
</script>
<style  lang="less" scoped>
.w-page-grid-loading{
  background: white;
  padding: 10px;
}
</style>
