/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2021-08-23 11:24:19
 * @modify date 2021-08-23 11:24:19
 * @desc [枚举]
 */
/** x-client-info:platform={平台};version={版本号}  */
export enum EnumPlatform {
    /** 桌面PC */
    desktop = 'desktop',
    /** 手机H5 */
    mobile = 'mobile',
    /** 后台管理 */
    bgm = 'bgm',
    /** 微信小程序 */
    weapp = 'weapp',
    /** 微信公众号 */
    wechat = 'wechat',
}
/**
 * 页面操作 枚举
 */
export enum EnumActionType {
    /** 详情 */
    Info = 'details',
    /** 添加 */
    Insert = 'insert',
    /** 修改编辑 */
    Update = 'update',
    /** 删除 */
    Delete = 'delete',
    /** 导入 */
    Import = 'import',
    /** 模板 */
    Template = 'template',
    /** 导出 */
    Export = 'export',
    /** 选择导出 */
    ExportIds = 'exportIds',
}