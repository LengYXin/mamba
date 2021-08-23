<template>
    <a-table
        v-bind="getTableBind(Pagination)"
        :columns="columns"
        :data-source="Pagination.dataSource"
        :scroll="scrollOption"
    >
        <template v-for="item in slots" #[item]="record">
            <slot :name="item" v-bind="{  record  }" />
        </template>
    </a-table>
</template>
  
  <script lang="ts">
import { BasesController, BasesPagination } from "@mamba/clients";
import lodash from "lodash";
import { observer } from "mobx-vue";
import { Component, Prop, Vue } from "vue-property-decorator";
@observer
@Component({
    components: {},
})
export default class PageView extends Vue {
    @Prop({ required: true }) PageController: BasesController;
    get Pagination() {
        return this.PageController.Pagination;
    }
    // 列配置
    @Prop({ required: true }) columns: Array<any>;
    @Prop({}) scroll;
    @Prop({}) rowSelection;
    get scrollOption() {
        return lodash.assign({
            x: lodash.reduce(this.columns, (prev, curr) => {
                return prev + lodash.get(curr, 'width', 200)
            }, 0), y: '70vh'
        }, this.scroll)
    }
    get slots() {
        return lodash.compact(lodash.map(this.columns, 'scopedSlots.customRender'))
    }
    getTableBind(Pagination) {
        return lodash.merge(this.TableBind(Pagination), { rowSelection: this.rowSelection })
    }
    TableBind(Pagination: BasesPagination) {
    // https://www.antdv.com/components/table-cn/
    let options = {
        // https://www.antdv.com/components/table-cn/#components-table-demo-grouping-table-head
        rowSelection: {
            fixed: true,
            getCheckboxProps: (record) => {
                return { props: {} };
            },
            selectedRowKeys: Pagination.selectedRowKeys,
            // 选中项发生变化时的回调
            onChange: (selectedRowKeys, selectedRows) => {
                console.log("LENG ~ selectedRowKeys", selectedRowKeys)
                Pagination.onSelectChange(selectedRowKeys)
            },
            // 用户手动选择/取消选择某列的回调
            onSelect: (record, selected, selectedRows, nativeEvent) => {
                console.log("LENG ~ record, selected, selectedRows, nativeEvent", record, selected, selectedRows, nativeEvent)

            },
            // 用户手动选择/取消选择所有列的回调
            onSelectAll: (selected, selectedRows, changeRows) => {
                console.log("LENG ~ selected, selectedRows, changeRows", selected, selectedRows, changeRows)

            },
            // 用户手动选择反选的回调
            onSelectInvert: (selectedRows) => {
                console.log("LENG ~ selectedRows", selectedRows)

            }
        },
        rowKey: Pagination.options.dataKey,
        dataSource: Pagination.dataSource,
        loading: Pagination.loading,
    }
    // https://www.antdv.com/components/pagination-cn/
    if (Pagination.total) {
        lodash.set(options, 'pagination', {
            total: Pagination.total,
            current: Pagination.current,
            pageSize: Pagination.pageSize,
            onChange: (current, pageSize) => {
                this.__ToQuery({
                    [Pagination.options.paginationParams.currentKey]:current,
                    [Pagination.options.paginationParams.pageSizeKey]:pageSize,
                })
                Pagination.onLoad({ current, pageSize })
            }
        })
    }
    return options
}
    created() { }
    mounted() {
    }
    updated() { }
    destroyed() { }
}
</script>
  <style lang="less" >
</style>