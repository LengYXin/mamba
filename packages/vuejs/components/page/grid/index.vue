<template>
  <div>
    <div class="w-grid-content" :style="style" ref="gridContent">
      <GridView
        :theme="theme"
        :columnDefs="getColumnDefs"
        :rowData="Pagination.dataSource"
        :gridOptions="options"
      />
    </div>
    <a-divider />
    <Pagination :PageController="PageController" />
  </div>
</template>

<script lang="ts">
import { BasesController } from "@mamba/clients";
import { ColumnApi, GridApi, GridOptions, GridReadyEvent, RowDataChangedEvent } from "ag-grid-community";
import lodash from "lodash";
import { observer } from "mobx-vue";
import { fromEvent, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { Component, Inject, Prop, Ref, Vue, Watch } from "vue-property-decorator";
import defaultOptions, { getColumnDefsAction, getColumnDefsCheckbox } from "./defaultOptions";
import framework from "./framework";
import Pagination from "./pagination.vue";
import loading from "./loading.vue";
const Cache = new Map<string, any>();
@observer
@Component({
  components: {
    Pagination,
    // 拆分 包 异步加载
    GridView: () => ({
      component: import('./agGrid.async.vue'),
      loading,
    }),
  },
})
export default class Grid extends Vue {
  // static Cache = new Map<string, any>()
  @Inject() readonly PageController: BasesController;
  @Prop({ default: () => ({}) }) readonly GridOptions: GridOptions;
  @Prop({ default: () => true }) readonly CheckboxSelection: boolean;
  @Ref("gridContent") readonly gridContent: HTMLDivElement;
  theme: "balham" | "alpine" | "material" = "material";
  style = { height: "500px" };
  GridApi: GridApi = null;
  ColumnApi: ColumnApi = null;
  ResizeEvent: Subscription;
  LanguagesEvent: Subscription;
  isAutoSizeColumn = true;
  pageKey = '';
  get Pagination() {
    return this.PageController.Pagination;
  }
  // get columnDefs() {
  //   return this.GridOptions.columnDefs
  // }
  get getColumnDefs() {
    return lodash.compact(lodash.concat(
      getColumnDefsCheckbox(this.CheckboxSelection, this.theme),
      this.GridOptions.columnDefs,
      getColumnDefsAction(this.GridOptions.frameworkComponents)
    ));
  }

  get options(): GridOptions {
    const { frameworkComponents = {}, ...gridOptions } = this.GridOptions;
    const options: GridOptions = lodash.assign(
      {
        frameworkComponents: lodash.assign(
          {},
          frameworkComponents,
          framework
        ),
        // 行数据的 id
        getRowNodeId: (data) => lodash.get(data, this.PageController.options.dataKey),
      },
      defaultOptions(this.$i18n as any),
      gridOptions,
      this.GridEvents
    );
    return options;
  }
  get GridEvents(): GridOptions {
    return {
      onSortChanged: (event) => {
        const SortModel = lodash.head(event.api.getSortModel());
        // console.log("LENG ~ Grid ~ getGridEvents ~ event", SortModel)
        const sory = SortModel && SortModel.sort ? { Direction: lodash.capitalize(SortModel.sort), Property: SortModel.colId } : {}
        this.Pagination.onLoad({ current: 1 })
        lodash.invoke(this.GridOptions, "onSortChanged", event);
      },
      // 数据选择
      onSelectionChanged: (event) => {
        this.Pagination.onSelectChange(
          event.api.getSelectedRows()
        );
        lodash.invoke(this.GridOptions, "onSelectionChanged", event);
      },
      // 初始化完成
      onGridReady: (event: GridReadyEvent) => {
        this.GridApi = event.api;
        this.ColumnApi = event.columnApi;
        event.api.sizeColumnsToFit();
        if (this.Pagination.loading) {
          this.GridApi.showLoadingOverlay();
        }
        lodash.invoke(this.GridOptions, "onGridReady", event);
        this.onReckon()
      },
      // onBodyScroll: (event) => {
      //   // console.log("LENG ~ extends ~ event", event.api);
      // },
      // 数据更新
      onRowDataChanged: lodash.debounce((event: RowDataChangedEvent) => {
        if (this.isAutoSizeColumn && this.Pagination.dataSource.length > 0) {
          event.columnApi.autoSizeColumn("RowAction");
          // event.api.sizeColumnsToFit();
          this.isAutoSizeColumn = false;
        }
        lodash.invoke(this.GridOptions, "onRowDataChanged", event);
      }, 300),
    }
  };
  /**
   * 计算 表格高度
   */
  onReckon() {
    let height = 500;
    height = window.innerHeight - this.gridContent.offsetTop - 150;
    this.style.height = height + "px";
    if (this.AppConfig.userAgent.isMobile) {
      this.style.height = "70vh";
    }
    Cache.set(this.pageKey, this.style.height)
  }
  @Watch("Pagination.loading")
  onLoading(val, old) {
    console.log("LENG ~ Grid ~ onLoading ~ val", val)
    if (this.GridApi) {
      if (val) {
        this.GridApi.showLoadingOverlay();
      } else {
        this.GridApi.hideOverlay();
      }
    }
  }
  @Watch("$route.path")
  onRoute(val, old) {
    if (lodash.eq(val, this.pageKey)) {
      // this.autoSizeColumn()
    }
  }
  // autoSizeColumn = lodash.debounce(() => {
  //   this.onReckon()
  //   this.GridApi?.sizeColumnsToFit();
  //   this.ColumnApi?.autoSizeColumn("RowAction");
  // }, 300)
  created() {
    this.pageKey = this.$route.path
    if (Cache.has(this.pageKey)) {
      this.style.height = Cache.get(this.pageKey);
    }
  }
  mounted() {
    this.$nextTick(() => this.onReckon())
    this.ResizeEvent = fromEvent(window, "resize")
      .pipe(debounceTime(200))
      .subscribe(this.onReckon);
    // this.LanguagesEvent = fromEvent(window, "languages")
    //   .pipe(debounceTime(200))
    //   .subscribe(obx => {
    //     this.ColumnApi?.autoSizeColumn("RowAction");
    //   })
  }
  unmounted() {
    this.ResizeEvent && this.ResizeEvent.unsubscribe();
    this.ResizeEvent = undefined;
  }
}
</script>
<style  lang="less">
.w-grid-content {
  height: 500px;
  transition: all 0.2s;
}
</style>
