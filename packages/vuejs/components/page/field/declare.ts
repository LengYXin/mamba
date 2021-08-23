
// import { ValidationRule } from 'ant-design-vue/lib/form/Form';
declare type InternalNamePath = (string | number)[];
declare type NamePath = string | number | InternalNamePath;


/**
 * 类型定义
 */
export declare type ProFieldRequestData = (props?: any) => Promise<{
    label: any;
    value: any;
    [key: string]: any;
}[]>;
export declare type AppEntitiesField = {
    /** 表单 Name  */
    name: NamePath;
    /** 表单 label  */
    label?: string;
    /** 描述 */
    placeholder?: string;
    /** 默认值 */
    initialValue?: any;
    /** 校验规则 */
    rules?: ValidationRule[];
    /** 数据源 */
    request?: ProFieldRequestData | undefined;
    /** 联动字段 */
    linkage?: Array<string>;
    /** 数据类型 */
    valueType?: AppValueType;
    /**
     * 传递给 Field 的 props
     */
    fieldProps?: any;
}
// https://procomponents.ant.design/components/field-set
export enum AppValueType {
    /** 密码框 */
    password = "password",
    /** 文本域 */
    textarea = "textarea",
    /** 时间 */
    date = "date",
    dateWeek = "dateWeek",
    dateMonth = "dateMonth",
    dateRange = "dateRange",
    /** 文本 */
    text = "text",
    /** 选择框 */
    select = "select",
    /** 滑动输入 */
    slider = "slider",
    /** 多选框 */
    checkbox = "checkbox",
    /** 评分 */
    rate = "rate",
    /** 单选 */
    radio = "radio",
    /** 开关 */
    switch = "switch",
    /** 图片上传 */
    image = "image",
    /** 穿梭框 */
    transfer = "transfer",
    /** 文件 */
    // upload = "upload",
    /** 可编辑表格 */
    // grid = "grid",
    /** 富文本 */
    editor = "editor",
    // icons = "icons",
    // radioButton = "radioButton",
    // progress = "progress",
    // money = "money",
    // option = "option",
    // dateQuarter = "dateQuarter",
    // dateYear = "dateYear",
    // dateTimeRange = "dateTimeRange",
    // dateTime = "dateTime",
    // time = "time",
    // timeRange = "timeRange",
    // index = "index",
    // indexBorder = "indexBorder",
    // percent = "percent",
    // digit = "digit",
    // second = "second",
    // avatar = "avatar",
    // code = "code",
    // fromNow = "fromNow",
    // jsonCode = "jsonCode"
}
declare interface ValidationRule {
    // trigger?: 'blur' | 'change' | ['change', 'blur'];
    /**
     * validation error message
     * @type string | Function
     */
    message?: string | (() => string);

    /**
     * built-in validation type, available options: https://github.com/yiminghe/async-validator#type
     * @default 'string'
     * @type string
     */
    type?: string;

    /**
     * indicates whether field is required
     * @default false
     * @type boolean
     */
    required?: boolean;

    /**
     * treat required fields that only contain whitespace as errors
     * @default false
     * @type boolean
     */
    whitespace?: boolean;

    /**
     * validate the exact length of a field
     * @type number
     */
    len?: number;

    /**
     * validate the min length of a field
     * @type number
     */
    min?: number;

    /**
     * validate the max length of a field
     * @type number
     */
    max?: number;

    /**
     * validate the value from a list of possible values
     * @type string | string[]
     */
    enum?: string | string[];

    /**
     * validate from a regular expression
     * @type boolean
     */
    pattern?: RegExp;

    /**
     * transform a value before validation
     * @type Function
     */
    transform?: (value: any) => any;

    /**
     * custom validate function (Note: callback must be called)
     * @type Function
     */
    validator?: (rule: any, value: any, callback: Function) => any;
}
