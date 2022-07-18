/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2021-07-29 14:09:17
 * @modify date 2021-07-29 14:09:17
 * @desc [配置定义]
 */
import { IAjaxConfig } from "../../helpers";
export interface IBaseModelOptions {
    /** 存储的数据类型 */
    type?: 'object' | 'list' | 'map',
    /** 持久化存储 vlaue 的唯一storage Key */
    storageKey?: string;
    /** 
     * 持久化存储 setStorage 中的 对象 
     * @docs https://github.com/pinqy520/mobx-persist
     * */
    schema?: any;
    /**
     * storage 回填过程中是否更新 加载状态
     * @default true
     */
    storageLoading?: boolean;
    /** 持久化存储 回填 成功 事件 */
    // onSuccess?: () => void;
    // /** 持久化存储 回填 失败 事件 */
    // onError?: (error?) => void;
}
/**
 * 基础配置
 * @export
 * @interface IBasesOptions
 */
export interface IBasesOptions {
    /**
     * Ajax Api target
     * @type {string}
     * @default ''
     */
    target?: string;
    /**
     * 数据的 唯一标识 默认
     * @type {string}
     * @default 'key'
     */
    dataKey?: string;
}
/**
 * 控制器配置
 * @export
 * @interface IBasesControllerOptions
 * @extends {IBasesDetailsOptions} 详情配置
 * @extends {IBasesPaginationOptions} 分页配置
 */
export interface IBasesControllerOptions extends IBasesDetailsOptions, IBasesPaginationOptions {
    /** 详情配置  */
    DetailsOptions?: IBasesDetailsOptions;
    /** 分页配置  */
    PaginationOptions?: IBasesPaginationOptions;
    /**
     * 添加 Api Url | IAjaxConfig
     * @type {(string | IAjaxConfig)}
     * @default { method: 'post' }
     */
    insert?: string | IAjaxConfig;
    /**
     * 修改 Api Url | IAjaxConfig
     * @type {(string | IAjaxConfig)}
     * @default { method: 'update' }   
     */
    update?: string | IAjaxConfig;
    /**
     * 删除 Api Url | IAjaxConfig
     * @type {(string | IAjaxConfig)}
     * @default { method: 'delete' }   
     */
    delete?: string | IAjaxConfig;
    /**
    * 其他 Api Url | IAjaxConfig
    * @type {(string | IAjaxConfig)}
    */
    other?: { [key: string]: string | IAjaxConfig }
}

/**
 * 详情配置
 * @export
 * @interface IBasesDetailsOptions
 */
export interface IBasesDetailsOptions extends IBasesOptions {
    /**
     * 详情的 Api Url | IAjaxConfig
     * @type {(string | IAjaxConfig)}
     * @default { method: 'post' }   
     */
    details?: string | IAjaxConfig;
    /**
    * details 参数配置
    * @type {IBasesDetailsOptions}
    */
    detailsParams?: {
        /**
         * 数据值 Response dataSource
         * @type {string}
         * @default 'dataSource' > Response.dataSource
         */
        dataSource?: string;
        /**
        * 响应数据的 自定义 获取
        * @type {string}
        * @default null
        */
        valueGetter?: (response, AjaxConfig: IAjaxConfig) => any | Promise<any>;
    }
    /**
     * 详情 Model 配置
     * @type {IBaseModelOptions}
     * @memberof IBasesPaginationOptions
     */
    entityModel?: IBaseModelOptions;
}

/**
 * 分页配置
 * @export
 * @interface IBasesPaginationOptions
 */
export interface IBasesPaginationOptions extends IBasesOptions {
    /**
     * 分页 Api Url | IAjaxConfig
     * @type {(string | IAjaxConfig)}
     * @default { method: 'get' }   
     */
    pagination?: string | IAjaxConfig;
    /**
     * pagination 参数配置
     *
     * @type {IBasesPaginationParams}
     * @default 
     * {
     *   currentKey: 'current',
     *   pageSizeKey: 'pageSize',
     *   defaultCurrent: 1,
     *   defaultPageSize: 20,
     * }
     */
    paginationParams?: IBasesPaginationParams;
    /**
    * 是否 无限滚动模式
    * @type {boolean}
    * @default false
    */
    infinite?: boolean;
    /**
     * 列表 Model 配置
     * @type {IBaseModelOptions}
     * @memberof IBasesPaginationOptions
     */
    listModel?: IBaseModelOptions;
}
/**
 * 分页参数配置
 * @export
 * @interface IBasesPaginationParams
 */
export interface IBasesPaginationParams {
    /**
     * 页码 入参 对应的参数名称
     * @type {string}
     * @default 'current'
     */
    currentKey?: string;
    /**
    * 条数 入参 对应的参数名称
    * @type {string}
    * @default 'pageSize'
    */
    pageSizeKey?: string;
    /**
    * 搜索条件 入参 对应的参数名称
    * @type {string}
    * @default undefined
    */
    filterKey?: string;
    /**
    * 排序 入参 对应的参数名称
    * @type {string}
    * @default undefined
    */
    sortKey?: string;
    /**
     * 页码 入参数 默认值
     * @type {number}
     * @default 1
     */
    defaultCurrent?: number;
    /**
     * 条数 入参数 默认值
     * @type {number}
     * @default 20
     */
    defaultPageSize?: number;
    /**
     * 无限滚动模式 lastKey 入参 对应的参数名称
     * @type {string}
     * @default 'lastKey'
     */
    infiniteKey?: string;
    /**
     * 最后一条数据的 入参数 key [用于无限滚动 瀑布流]
     * @type {string}
     * @default dataKey ['key']
     */
    // lastKey?: string;
    /**
     * 响应值 Key 配置
     * @type {Object}
     * @default 
     * {
     *    total:'total',       
     *    dataSource:'dataSource',       
     * }
     */
    response?: IBasesResponseKey
}
/**
* 响应值 Key 配置
* @type {Object}
* @default 
* {  
*    current'current',
*    pageSize'pageSize',
*    total:'total',       
*    dataSource:'dataSource',
*    valueGetter: undefined  
* }
*/
export interface IBasesResponseKey {
    /**
    * current Response key
    * @type {string}
    * @default 'total' > Response.current
    */
    current?: string;
    /**
    * pageSize 总数 Response key
    * @type {string}
    * @default 'total' > Response.pageSize
    */
    pageSize?: string;
    /**
    * 数据总数 Response key
    * @type {string}
    * @default 'total' > Response.total
    */
    total?: string;
    /**
    * 数据值 Response dataSource
    * @type {string}
    * @default 'dataSource' > Response.dataSource
    */
    dataSource?: string;
    /**
    * 响应数据的 自定义 获取
    * @type {string}
    * @default null
    */
    valueGetter?: (response, AjaxConfig: IAjaxConfig) => IBasesResponse | Promise<IBasesResponse>;
}
export interface IBasesResponse<T = any> {
    current?: number;
    pageSize?: number;
    total?: number;
    dataSource?: Array<T>;
}
/**
 * 分页 AjaxConfig
 * @export
 * @interface IBasesPaginationIAjaxConfig
 * @extends {IAjaxConfig}
 */
export interface IBasesPaginationIAjaxConfig extends IAjaxConfig {
    /** 当前页数 */
    current?: number;
    /** pageSize */
    pageSize?: number;
}