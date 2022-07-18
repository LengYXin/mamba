/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2021-08-16 18:31:46
 * @modify date 2021-08-16 18:31:46
 * @desc [description]
 */
import dayjs from 'dayjs';
import lodash from 'lodash';
import queryString from 'query-string';
import React from 'react';
import { RouteChildrenProps } from 'react-router';
Object.defineProperty(React.Component.prototype, '$router', {
    get: function () {
        const search = lodash.get(this.props, 'location.search', '')
        return lodash.assign(lodash.pick(this.props, ['history', 'location', 'match']), {
            query: lodash.assign({}, queryString.parse(search))
        })
    }
})
Object.defineProperty(React.Component.prototype, 'Dayjs', {
    get: function () { return dayjs }
})
Object.defineProperty(React.Component.prototype, 'DataFormat', {
    get: function () { return React.DataFormat }
})
Object.defineProperty(React.Component.prototype, 'queryString', {
    get: function () { return queryString }
})
Object.defineProperty(React.Component.prototype, 'onToDetails', {
    get: function () {
        return (query: string | any = '', readonly = false) => {
            if (lodash.isString(query)) {
                query = { details: query }
            }
            query = lodash.assign({}, this.$router.query, query)
            if (readonly) {
                lodash.set(query, 'readonly', '')
            }
            const url = this.$router.location.pathname;
            const path = queryString.stringifyUrl({ url, query })
            this.$router.history.replace(path)
        }
    }
})
Object.defineProperty(React.Component.prototype, 'onBackDetails', {
    get: function () {
        return (detailsKey = 'details') => {
            const query = lodash.omit(this.$router.query, [detailsKey, 'readonly']);
            const url = this.$router.location.pathname;
            const path = queryString.stringifyUrl({ url, query })
            this.$router.history.replace(path)
        }
    }
})
declare module 'react' {
    /** Dayjs */
    const Dayjs: typeof dayjs;
    /** 格式化时间 默认 YYYY-MM-DD HH:mm:ss */
    const DataFormat: (date?: string | number | Date | dayjs.Dayjs, template?: string) => string
    interface Component {
        /** 路由 */
        readonly $router: RouteChildrenProps & { query: any }
        /** queryString */
        readonly queryString: typeof queryString
        /** dayjs */
        readonly Dayjs: typeof dayjs
        /** 格式化时间 默认 YYYY-MM-DD HH:mm:ss */
        readonly DataFormat: (date?: string | number | Date | dayjs.Dayjs, template?: string) => string
        /**
         * 跳转 详情
         * @query 参数 默认 details 字符串 ?details=
         * {abc:'123'} ?abc=123
         */
        readonly onToDetails: (query?: string | any, readonly?: boolean) => void
        /**
         * 跳转 详情 返回 清除 url 中的参数
         * @detailsKey 参数 默认 details 清除字符串 ?details=
         */
        readonly onBackDetails: (detailsKey?: string) => void
    }
    /**
     * wtm Field 基础属性
     * ant.ProFormField 组件中提取的部分属性
     * https://procomponents.ant.design/components/field-set
     * https://procomponents.ant.design/components/field
     */
    interface EntitiesField {
        /** 表单 Name  */
        name: import("antd/es/form/interface").NamePath;
        /** 表单 label  */
        label?: string;
        /** 描述 */
        placeholder?: string;
        /** 默认值 */
        initialValue?: any;
        /** 表单 校验 */
        rules?: import("antd/es/form").Rule[];
        /** 远程 数据 */
        request?: import("@ant-design/pro-utils").ProFieldRequestData<any> | undefined;
        /** 数据的枚举 */
        valueEnum?: import("@ant-design/pro-utils").ProFieldValueEnumType;
        valueType?: (import("@ant-design/pro-field").ProFieldValueType | import("@ant-design/pro-utils").ProFieldValueObjectType) | ((entity: any, type: import("@ant-design/pro-utils").ProSchemaComponentTypes) => import("@ant-design/pro-field").ProFieldValueType | import("@ant-design/pro-utils").ProFieldValueObjectType) | undefined;
    }
}
declare type IReactComponent<P = any> = React.ClassicComponentClass<P> | React.ComponentClass<P> | React.FunctionComponent<P> | React.ForwardRefExoticComponent<P>;
declare module 'react-router' {
    function withRouter<T extends IReactComponent>(component: T): T;
}