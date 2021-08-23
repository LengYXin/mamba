<template>
  <a-pagination
    class="w-pagination"
    :current="Pagination.current"
    :pageSize="Pagination.pageSize"
    :total="Pagination.total"
    show-less-items
    show-size-changer
    show-quick-jumper
    @change="change"
    @showSizeChange="change"
  />
</template>

<script lang="ts">
import { BasesController } from "@mamba/clients";
import lodash from "lodash";
import { observer } from "mobx-vue";
import { Component, Prop, Vue } from "vue-property-decorator";
@observer
@Component({
  components: {},
})
export default class extends Vue {
  @Prop({ required: true }) PageController: BasesController;
  get Pagination() {
    return this.PageController.Pagination;
  }
  get currentKey() {
    return this.Pagination.PaginationParams.currentKey;
  }
  get pageSizeKey() {
    return this.Pagination.PaginationParams.pageSizeKey;
  }
  get defaultPageSize() {
    return this.Pagination.PaginationParams.defaultPageSize;
  }
  change(current, pageSize) {
    const values = {
      [this.currentKey]: current,
      [this.pageSizeKey]: pageSize,
    };
    if (this.defaultPageSize === pageSize) {
      lodash.unset(values, this.pageSizeKey);
    }
    this.__ToQuery(values);
    this.Pagination.onLoad({ current, pageSize });
  }
  created() { }
}
</script>
<style  lang="less">
.w-pagination.ant-pagination {
  margin-top: 8px;
  text-align: right;
}
</style>
