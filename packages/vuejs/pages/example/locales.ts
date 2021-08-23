export enum EnumPageMeta {
    title = "示例页面"
}
/**
 * 字段描述 枚举
 */
export enum EnumLocaleLabel {
    /** 姓名 */
    Name = "example.name",
    /** 头像 */
    Avatar = "example.avatar",
    /** 生日 */
    Birthday = "example.birthday",
    /** 年龄 */
    Age = "example.Age",
    /** 性别 */
    Gender = "example.gender",
    Gender_Male = "Male",
    Gender_Girl = "Girl",
    /** 介绍 */
    Introduce = "example.introduce",
    /** 创建时间 */
    CreateDate = "example.createDate",
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
        [EnumLocaleLabel.Avatar]: 'Avatar',
        [EnumLocaleLabel.Birthday]: 'Birthday',
        [EnumLocaleLabel.Age]: 'Age',
        [EnumLocaleLabel.Gender]: 'Gender',
        [EnumLocaleLabel.Gender_Male]: 'Male',
        [EnumLocaleLabel.Gender_Girl]: 'Girl',
        [EnumLocaleLabel.Introduce]: 'Introduce',
        [EnumLocaleLabel.CreateDate]: 'CreateDate',
    },
    zh: {
        [EnumLocaleLabel.Name]: '姓名',
        [EnumLocaleLabel.Avatar]: '头像',
        [EnumLocaleLabel.Birthday]: '生日',
        [EnumLocaleLabel.Age]: '年龄',
        [EnumLocaleLabel.Gender]: '性别',
        [EnumLocaleLabel.Gender_Male]: '男',
        [EnumLocaleLabel.Gender_Girl]: '女',
        [EnumLocaleLabel.Introduce]: '简介',
        [EnumLocaleLabel.CreateDate]: '创建时间',
    }
}