import { ICellRendererParams } from 'ag-grid-community';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import lodash from 'lodash';
import { BindAll } from 'lodash-decorators';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import style from './style.module.less';
type PageActionEnum = 'Info' | 'Insert' | 'Update' | 'Delete' | 'Import' | 'Export';
interface IPageActionProps {
    PageController?: React.BasesController;
    /**
     * url 地址详情的key
     * @default details
     */
    visibleKey?: string
    /** 排除的操作 */
    excludes?: Array<PageActionEnum>
    /** 包含的操作 */
    includes?: Array<PageActionEnum>
}
@withRouter
@observer
@BindAll()
export class PageAction extends React.Component<IPageActionProps> {
    get PageController() {
        return this.props.PageController
    }
    get Pagination() {
        return this.PageController.Pagination
    }
    /** url 参数 显示 key */
    get visibleKey() {
        return this.props.visibleKey || 'details'
    }
    get size(): SizeType {
        return this.AppConfig.userAgent.isMobile ? 'small' : undefined
    }
    get excludes() {
        let excludes = [];
        if (lodash.size(this.props.excludes)) {
            return this.props.excludes
        }
        return excludes
    }
    get includes() {
        let includes = ['Info', 'Insert', 'Update', 'Delete', 'Import', 'Export'];
        if (lodash.size(this.props.includes)) {
            includes = this.props.includes
        }
        return lodash.difference(includes, this.excludes)
    }
    isInclude(Action: PageActionEnum) {
        return lodash.includes(this.includes, Action)
    }
    renderInsert() {
        if (!this.isInclude('Insert')) {
            return
        }
        return <React.Antd.Button size={this.size} type="primary" onClick={() => this.onToDetails({ [this.visibleKey]: '' })}>
            <React.Icons.PlusOutlined />
            <React.Antd.I18n i18nKey={this.$Enumlocales.action_insert} />
        </React.Antd.Button>
    }
    renderEdit() {
        if (!this.isInclude('Update')) {
            return
        }
        const { selectedRowKeys } = this.Pagination;
        const disabled = !lodash.eq(lodash.size(selectedRowKeys), 1);
        const dataKey = this.Pagination.getDataKey(lodash.head(selectedRowKeys));
        return <React.Antd.Button
            disabled={disabled}
            size={this.size}
            type="primary"
            onClick={() => {
                this.onToDetails({ [this.visibleKey]: dataKey })
            }}>
            <React.Icons.EditOutlined />
            <React.Antd.I18n i18nKey={this.$Enumlocales.action_update} />
        </React.Antd.Button>
    }
    renderDelete() {
        if (!this.isInclude('Delete')) {
            return
        }
        const { selectedRowKeys } = this.Pagination;
        const size = lodash.size(selectedRowKeys)
        const disabled = !size
        return <React.Antd.Popconfirm
            disabled={disabled}
            title={this.$i18n.t(this.$Enumlocales.action_deleteConfirm, { label: size })}
            onConfirm={() => this.PageController.onDelete(selectedRowKeys)}
            okText={this.$i18n.t(this.$Enumlocales.tips_bool_true)}
            cancelText={this.$i18n.t(this.$Enumlocales.tips_bool_false)}
        >
            <React.Antd.Button disabled={disabled} size={this.size} type="primary">
                <React.Icons.DeleteOutlined />
                <React.Antd.I18n i18nKey={this.$Enumlocales.action_delete} />
            </React.Antd.Button>
        </React.Antd.Popconfirm>
    }
    renderImport() {
        if (!this.isInclude('Import')) {
            return
        }
        return <React.Antd.Button size={this.size} type="primary">
            <React.Icons.CloudUploadOutlined />
            <React.Antd.I18n i18nKey={this.$Enumlocales.action_import} />
        </React.Antd.Button>
    }
    renderExport() {
        if (!this.isInclude('Export')) {
            return
        }
        return <React.Antd.Button size={this.size} type="primary">
            <React.Icons.CloudDownloadOutlined />
            <React.Antd.I18n i18nKey={this.$Enumlocales.action_export} />
        </React.Antd.Button>
    }
    render() {
        return (
            <div className={style.pageAction}>
                <React.Antd.Space wrap align="center" >
                    {this.renderInsert()}
                    {this.renderEdit()}
                    {this.renderDelete()}
                    {this.renderImport()}
                    {this.renderExport()}
                    {this.props.children}
                </React.Antd.Space>
            </div>

        )
    }
}
@withRouter
@BindAll()
export class PageGridRowAction extends React.Component<Partial<ICellRendererParams> & IPageActionProps> {
    get PageController(): any {
        return this.props.PageController
    }
    get rowKey() {
        return this.props.node.id
    }
    get data() {
        return lodash.get(this.props, 'data', {})
    }
    get excludes() {
        let excludes = [];
        if (lodash.size(this.props.excludes)) {
            return this.props.excludes
        }
        return excludes
    }
    get includes() {
        let includes = ['Info', 'Insert', 'Update', 'Delete', 'Import', 'Export'];
        if (lodash.size(this.props.includes)) {
            includes = this.props.includes
        }
        return lodash.difference(includes, this.excludes)
    }
    isInclude(Action: PageActionEnum) {
        return lodash.includes(this.includes, Action)
    }
    onToDtl() {
        this.onToDetails(this.rowKey)
    }
    onToInfo() {
        this.onToDetails(this.rowKey, true)
    }
    renderInfo() {
        if (!this.isInclude('Info')) {
            return
        }
        return <React.Antd.Button size="small" type="link" onClick={this.onToInfo} >
            <React.Icons.EyeOutlined />
        </React.Antd.Button>
    }
    renderEdit() {
        if (!this.isInclude('Update')) {
            return
        }
        return <React.Antd.Button size="small" type="link" onClick={this.onToDtl} >
            <React.Icons.EditOutlined />
        </React.Antd.Button>
    }
    renderDelete() {
        if (!this.isInclude('Delete')) {
            return
        }
        return <React.Antd.Popconfirm
            title={this.$i18n.t(this.$Enumlocales.action_deleteConfirm, { label: 1 })}
            onConfirm={() => this.PageController.onDelete(this.rowKey)}
            okText={this.$i18n.t(this.$Enumlocales.tips_bool_true)}
            cancelText={this.$i18n.t(this.$Enumlocales.tips_bool_false)}
        >
            <React.Antd.Button size="small" type="link" >
                <React.Icons.DeleteOutlined />
            </React.Antd.Button>
        </React.Antd.Popconfirm>
    }
    render() {
        return (
            <React.Antd.Space wrap>
                {this.renderInfo()}
                {this.renderEdit()}
                {this.renderDelete()}
                {this.props.children}
            </React.Antd.Space>
        )
    }
}
