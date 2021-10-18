<template>
  <page-grid :GridOptions="GridOptions" />
</template>

<script lang="ts">
import { ColDef, ColGroupDef, GridOptions } from "ag-grid-community";
import { Component, Vue } from "vue-property-decorator";
import { EnumLocaleLabel } from "../locales";
import RowAction from "./action.vue";
@Component({
  components: {},
})
export default class PageView extends Vue {
  columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: EnumLocaleLabel.Name, field: 'name',
    },
    {
      headerName: EnumLocaleLabel.Avatar, field: 'avatar',
      // // 渲染图片
      // cellRenderer: React.AgGridFrameworks.image,
      // 给 image 的 props
      cellRendererParams: { width: 45 }
    },
    {
      headerName: EnumLocaleLabel.Gender, field: 'gender',
      // valueFormatter: data => React.$i18n.t(lodash.get(EnumGender, data.value))
    },
    {
      headerName: EnumLocaleLabel.Birthday, field: 'birthday',
      // valueFormatter: data => React.DataFormat(data.value)
    },
    {
      headerName: EnumLocaleLabel.Age, field: 'birthday',
      // valueFormatter: data => React.Dayjs().diff(data.value, 'years').toString()
    },
    {
      headerName: EnumLocaleLabel.Introduce, field: 'introduce',
    },
    {
      headerName: EnumLocaleLabel.CreateDate, field: 'createDate',
      // valueFormatter: data => React.DataFormat(data.value)
    },
  ];
  GridOptions: GridOptions = {
    columnDefs: this.columnDefs,
    frameworkComponents: {
      // 传递 行 操作组件 自动注册 Action 列
      RowAction,
    }
  };
  created() { }
  mounted() { }
  updated() { }
  destroyed() { }
}
</script>
<style lang="less">
</style>

