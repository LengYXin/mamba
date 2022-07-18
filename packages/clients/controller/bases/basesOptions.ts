/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2021-08-23 11:19:54
 * @modify date 2021-08-23 11:19:54
 * @desc [默认配置]
 */
// import { makeObservable } from "mobx";
import { create } from "mobx-persist";
// import { AnnotationsMap, CreateObservableOptions } from "mobx/dist/internal";
import { IAjaxConfig } from "../../helpers";
import { IBasesPaginationParams } from "./basesInterface";
declare type NoInfer<T> = [T][T extends any ? 0 : never];
export class BasesOptions {
    /** 调试日志 */
    static debug = true//process.env.NODE_ENV === 'development';
    /** 数据唯一 Key [标识] */
    static dataKey = 'key';
    /** 请求 pagination */
    static pagination: IAjaxConfig = { method: 'get' };
    /** 请求 details */
    static details: IAjaxConfig = { method: 'get', url: '/{key}', loading: true };
    /** 请求 insert */
    static insert: IAjaxConfig = { method: 'post' };
    /** 请求 update */
    static update: IAjaxConfig = { method: 'put', url: '/{key}' };
    /** 请求 delete */
    static delete: IAjaxConfig = { method: 'delete' };
    /** 列表 无限滚动 瀑布流模式 */
    static infinite: boolean = false;
    /** 分页参数配置 */
    static paginationParams: IBasesPaginationParams = {
        currentKey: 'current',
        pageSizeKey: 'pageSize',
        filterKey: undefined,
        sortKey: undefined,
        defaultCurrent: 1,
        defaultPageSize: 20,
        infiniteKey: 'lastKey',
        // lastKey: 'lastKey',
        response: {
            current: 'current',
            pageSize: 'pageSize',
            total: 'total',
            dataSource: 'dataSource',
        }
    }
    /**
     * 状态 响应 初始化配置 
     * mobx 6 的makeObservable
     * vue 3 reactive
     * @param target 
     * @param annotations 
     * @param options 
     */
    // static reactive<T extends object, AdditionalKeys extends PropertyKey = never>(target, annotations?: AnnotationsMap<T, NoInfer<AdditionalKeys>>, options?: CreateObservableOptions) {
    static reactive(target) {
        // mobx 6 的makeObservable
        // makeObservable && makeObservable(target, annotations, options)
    }
    /**
     * localStorage Hydrate 使用
     * 小程序 需要 重新配置
     * @returns 
     */
    static createStorage(): any {
        return localStorage
    }
    /**
     * 持久化 mobx-persist
     * @static
     * @memberof basesOptions
     */
    static createHydrate() {
        return create({
            storage: BasesOptions.createStorage(),
            jsonify: true,
            // debounce: 500
        })
    };
}
export enum EnumBasesKeys {
    request = 'request',
    response = 'response',
    /** 当前请求的 生成时间戳 */
    timestamp = 'timestamp',
    /** 是否已加载完成，加载完成后不再触发 */
    finished = 'finished',
    /** 请求出错 */
    requestError = 'requestError',
}
export enum EnumActionKeys {
    pagination = 'pagination',
    details = 'details',
    insert = 'insert',
    update = 'update',
    delete = 'delete',
}