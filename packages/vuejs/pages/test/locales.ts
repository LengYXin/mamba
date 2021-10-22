export enum EnumPageMeta {
    title = "示例页面"
}
/**
 * 字段描述 枚举
 */
export enum EnumLocaleLabel {
    /** 姓名 */
    Name = "example.name",
    DataUrl = "example.DataUrl",
    /** 头像 */
    Option = "example.Option",
}
export enum EnumGender {
    /** 男 */
    Male = 1,
    /** 女 */
    Girl = 2
}
export default {
    en: {
        [EnumLocaleLabel.Name]: 'Name',
        [EnumLocaleLabel.DataUrl]: 'DataUrl',
        [EnumLocaleLabel.Option]: 'Option',

    },
    zh: {
        [EnumLocaleLabel.Name]: '名称',
        [EnumLocaleLabel.DataUrl]: '数据源',
        [EnumLocaleLabel.Option]: '数据配置',

    }
}