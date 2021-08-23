import { ColDef, ColGroupDef, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import { AgGridReactProps } from 'ag-grid-react/lib/interfaces';
import lodash from 'lodash';
import { BindAll } from 'lodash-decorators';
import { observer } from 'mobx-react';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import defaultOptions from './defaultOptions';
import './style.less';
const theme: 'balham' | 'alpine' | 'material' = 'material'
const Grid = React.lazy<typeof AgGridReact>(() => import('./grid'))

interface IPageGridProps extends AgGridReactProps {
    // rowKey?: string;
    PageController?: React.BasesController;
    checkboxSelection?: boolean
}
// @observer
@BindAll()
export class PageGrid extends React.Component<IPageGridProps> {
    get PageController() {
        return this.props.PageController
    }
    state = { height: window.innerHeight - 250 }
    ref = React.createRef<HTMLDivElement>()
    ResizeEvent: Subscription;
    GridReadyEvent: GridReadyEvent;
    get disparity() {
        return { material: 160, alpine: 160, balham: 130 }[theme]
    }
    onAutoHeight() {
        try {
            this.GridReadyEvent?.api?.sizeColumnsToFit()
            const height = this.AppConfig.userAgent.isMobile ? window.innerHeight - this.disparity : window.innerHeight - this.ref.current.offsetTop - this.disparity
            this.setState({ height })
        } catch (error) {
            console.error("LENG ~  onAutoHeight", error)
        }
    }
    componentDidMount() {
        lodash.defer(() => {
            this.ResizeEvent = fromEvent(window, "resize")
                .pipe(debounceTime(300))
                .subscribe(this.onAutoHeight);
        })
    }
    componentWillUnmount() {
        this.ResizeEvent.unsubscribe()
    }
    getColumnDefs(columnDefs) {
        return lodash.concat(
            getColumnDefsCheckbox(this.props.checkboxSelection),
            columnDefs,
            getColumnDefsAction(this.props.frameworkComponents))
    }
    gridOptions: AgGridReactProps = {
        onGridReady: event => this.GridReadyEvent = event,
        getRowNodeId: data => lodash.get(data, this.PageController.options.dataKey),
        onSelectionChanged: event => this.PageController.Pagination.onSelectChange(event.api.getSelectedRows())
    }
    render() {
        const { columnDefs, ...props } = this.props;
        const gridOptions: AgGridReactProps = lodash.assign(
            {},
            defaultOptions(),
            props,
            this.gridOptions,
            { columnDefs: this.getColumnDefs(columnDefs) }
        )
        return (
            <div className="wt-ag-theme" ref={this.ref} >
                <React.Antd.Divider />
                <div className={`ag-theme-${theme}`} style={{ height: this.state.height }}>
                    <GridView {...gridOptions} PageController={this.PageController} />
                </div>
                <React.Antd.Divider />
                <PageGridPagination PageController={this.PageController} />
            </div>
        )
    }
}
@observer
@BindAll()
class GridView extends React.Component<IPageGridProps> {
    fallback() {
        return <div className="grid-skeleton">
            <React.Antd.ProSkeleton type="descriptions" pageHeader={false} />
        </div>
    }
    render() {
        const { PageController, ...props } = this.props;
        const { dataSource, loading } = PageController.Pagination;
        return (
            <React.Suspense fallback={this.fallback()}>
                <React.Antd.Spin spinning={loading}>
                    <Grid key={this.AppConfig.AppSettings.language} rowData={dataSource}  {...props} />
                </React.Antd.Spin>
            </React.Suspense>
        )
    }
}
@withRouter
@observer
@BindAll()
export class PageGridPagination extends React.Component<IPageGridProps> {
    get PageController() {
        return this.props.PageController
    }
    get Pagination() {
        return this.PageController.Pagination
    }
    get options() {
        return this.Pagination.PaginationParams
    }
    get current() {
        return this.Pagination.current
    }
    get pageSize() {
        return this.Pagination.pageSize
    }
    get total() {
        return this.Pagination.total
    }
    async onChange(current: number, pageSize?: number) {
        if (!current) {
            return console.warn('没有页码')
        }
        if (lodash.isEqual({ current: this.Pagination.current, pageSize: this.Pagination.pageSize }, { current, pageSize })) {
            return console.warn('页码没变化')
        }
        const url = this.$router.location.pathname;
        const oldQuery = this.$router.query;
        const query = lodash.assign({}, oldQuery, {
            [this.options.currentKey]: current,
            [this.options.pageSizeKey]: pageSize
        })
        if (lodash.eq(this.options.defaultPageSize, pageSize)) {
            lodash.unset(query, this.options.pageSizeKey)
        }
        const path = this.queryString.stringifyUrl({ url, query });
        await this.Pagination.onLoad({ current, pageSize });
        this.$router.history.replace(path)

    }
    componentDidMount() {
        // const oldQuery = this.$router.query;
        // this.onChange(oldQuery.current, oldQuery.pageSize)
    }
    render() {
        return (
            <React.Antd.Pagination
                // disabled={this.Pagination.loading}
                size={{ material: 'default', alpine: 'small', balham: 'small' }[theme] as any}
                simple={this.AppConfig.userAgent.isMobile}
                // showQuickJumper
                pageSize={this.pageSize}
                current={this.current}
                total={this.total}
                onChange={this.onChange} />
        )
    }
}


/**
 * 行 操作
 * @param frameworkComponents 
 */
function getColumnDefsAction(frameworkComponents) {
    if (lodash.has(frameworkComponents, 'RowAction')) {
        return [{
            headerName: 'action_name',
            field: 'RowAction',
            cellRenderer: 'RowAction',
            pinned: React.AppConfig.userAgent.isMobile ? false : 'right',
            sortable: false,
            suppressMenu: true,
            suppressColumnsToolPanel: true,
        }]
    }
    return []
}
/**
 * 行 头部选择框
 * @param checkboxSelection 
 */
function getColumnDefsCheckbox(checkboxSelection): (ColGroupDef | ColDef)[] {
    if (lodash.eq(checkboxSelection, false)) {
        return []
    }
    const width = { material: 65, alpine: 50, balham: 40 }[theme]
    return [{
        pinned: React.AppConfig.userAgent.isMobile ? false : "left",
        rowDrag: false,
        dndSource: false,
        lockPosition: true,
        suppressMenu: true,
        suppressSizeToFit: true,
        suppressMovable: true,
        suppressNavigable: true,
        suppressCellFlash: true,
        enableRowGroup: false,
        enablePivot: false,
        enableValue: false,
        editable: false,
        suppressColumnsToolPanel: true,
        filter: false,
        resizable: false,
        checkboxSelection: true,
        headerCheckboxSelection: true,
        width: width,
        minWidth: width,
        maxWidth: width,
    }]
}