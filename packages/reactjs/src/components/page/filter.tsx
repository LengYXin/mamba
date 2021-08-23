import { QueryFilterProps } from '@ant-design/pro-form'
import { FormInstance } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import lodash from 'lodash';
import { BindAll, Debounce } from 'lodash-decorators';
import React from 'react'
import { withRouter } from 'react-router-dom';
interface IPageFilterProps extends QueryFilterProps {
    /**
     * 页面控制器
     */
    PageController?: React.BasesController;
    /**
     * 初始化 表单默认值
     * 必须填充完整。用于回填 url 参数使用
     */
    // initialValues: { [name: string]: any; };
    onFinish?: (formData) => Promise<any>;
    [key: string]: any;
}
@withRouter
@BindAll()
export class PageFilter extends React.Component<IPageFilterProps> {
    ref = React.createRef<FormInstance>()
    get PageController() {
        return this.props.PageController
    }
    get Pagination() {
        return this.PageController.Pagination
    }
    get options() {
        return this.Pagination.PaginationParams
    }
    /** 默认数据 */
    get initialValues() {
        return this.props.initialValues
    }
    /** 当前 所有的 key */
    get FilterKeys() {
        return lodash.concat(lodash.keys(this.initialValues), [this.options.currentKey, this.options.pageSizeKey, this.options.infiniteKey])
    }
    get size(): SizeType {
        return this.AppConfig.userAgent.isMobile ? 'small' : undefined
    }
    componentDidMount() {
        const body = this.initFieldsValue();
        this.Pagination.onLoad({ body })
        this.onCollapse()
    }
    /**
     * 回填 地址栏 数据
     * 返回初始化完成 数据
     */
    initFieldsValue() {
        const oldQuery = this.$router.query;
        const query = lodash.pick(oldQuery, this.FilterKeys);
        this.ref.current.setFieldsValue(query)
        return lodash.assign({}, this.initialValues, oldQuery, query)
    }
    @Debounce(200)
    onCollapse() {
        dispatchEvent(new CustomEvent('resize'));
    }
    toQuery(values) {
        const url = this.$router.location.pathname;
        const query = lodash.pickBy(lodash.assign({}, this.$router.query, values), lodash.identity)
        const path = this.queryString.stringifyUrl({ url, query })
        this.$router.history.replace(path)
    }
    async onFinish(values) {
        this.toQuery(values)
        if (this.props.onFinish) {
            return this.props.onFinish(values)
        }
        const pro: Promise<any> = this.Pagination.onLoad()
        return pro
    }
    onReset(values) {
        this.toQuery(values)
        if (this.props.onReset) {
            return this.props.onReset(values)
        }
        this.Pagination.onLoad()
    }
    render() {
        const { staticContext, PageController, onFinish,onReset, ...props } = this.props
        return (
            <HookForm
                ref={this.ref}
                onCollapse={this.onCollapse}
                onFinish={this.onFinish}
                onReset={this.onReset}
                size={this.size}
                {...props}
            >
                {this.props.children}
            </HookForm>
        )
    }
}
const HookForm = React.forwardRef<any, QueryFilterProps>((props, ref: any) => {
    const [form] = React.Antd.Form.useForm();
    ref.current = form;
    return <React.Antd.QueryFilter
        form={form}
        {...props}
    >
        {props.children}
    </React.Antd.QueryFilter>
})
