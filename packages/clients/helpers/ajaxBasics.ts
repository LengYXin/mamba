/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2018-09-12 18:52:37
 * @modify date 2018-09-12 18:52:37
 * @desc [Ajax]
 */
import lodash from "lodash";
import { BindAll } from "lodash-decorators";
import { lastValueFrom, Observable, of, TimeoutError } from "rxjs";
import { ajax, AjaxConfig, AjaxError, AjaxResponse } from "rxjs/ajax";
import { catchError, concatMap, filter, map } from "rxjs/operators";
import { Log } from "./log";
import { Encryption } from "./encryption";
import { Regulars } from "./regulars";
export interface IAjaxConfig extends Partial<AjaxConfig> {
    /**
     * 路径
     * @type {string}
     * @memberof IAjaxConfig
     */
    target?: string;
    /**
     * 缓存当前请求
     */
    // cache?: boolean;
    /**
     * 自定义 状态码 
     * @default xhr.status
     */
    statusPath?: string;
    /**
     * 自定义 response 数据集
     * @default xhr.response
     */
    responsePath?: string;
    /**
     * 自定义 错误信息
     * @default  xhr.message
     */
    messagePath?: string;
    /**
     * merge AjaxConfig
     * 一般用于 等待 加入 用户或者校验 token
     */
    // merge?: (AjaxConfig: IAjaxConfig) => IAjaxConfig | Promise<IAjaxConfig>
}
@BindAll()
export class AjaxBasics {
    /**
     * Ajax
     * @param AjaxConfig 
     */
    constructor(AjaxConfig?: IAjaxConfig) {
        this.resetConfig(AjaxConfig)
    }
    /**
     * 全局默认 AjaxConfig
     * @type {IAjaxConfig}
     * @memberof AjaxBasics
     */
    static defaultAjaxConfig: IAjaxConfig = {
        target: "/",
        timeout: 120000,
        headers: {},
    };
    /**
     * 请求队列
     * @static
     * @memberof AjaxBasics
     */
    static Queue = new Map<string, Observable<any>>();
    static Cache = new Map<string, Promise<any>>();
    /**
     * AjaxConfig
     * @type {IAjaxConfig}
     * @memberof AjaxBasics
     */
    readonly AjaxConfig: IAjaxConfig = {};
    /**
     * 重置 当前对象配置
     * @param {IAjaxConfig} AjaxConfig
     * @return {*} 
     * @memberof AjaxBasics
     */
    resetConfig(AjaxConfig: IAjaxConfig) {
        lodash.merge(this.AjaxConfig, AjaxBasics.defaultAjaxConfig, AjaxConfig);
        return this
    }
    /**
     * get
     * @param url 
     * @param queryParams 
     * @param AjaxConfig 
     * @returns 
     */
    get<T>(url: string, body?: any, AjaxConfig?: IAjaxConfig) {
        return this.request<T>(lodash.assign({ url, body, method: "get" }, AjaxConfig));
    }
    /**
     * post
     * @param url 
     * @param body 
     * @param AjaxConfig 
     * @returns 
     */
    post<T>(url: string, body?: any, AjaxConfig?: IAjaxConfig) {
        return this.request<T>(lodash.assign({ url, body, method: "post" }, AjaxConfig));
    }
    /**
     * put
     * @param url 
     * @param body 
     * @param AjaxConfig 
     * @returns 
     */
    put<T>(url: string, body?: any, AjaxConfig?: IAjaxConfig) {
        return this.request<T>(lodash.assign({ url, body, method: "put" }, AjaxConfig));
    }
    /**
     * patch
     * @param url 
     * @param body 
     * @param AjaxConfig 
     * @returns 
     */
    patch<T>(url: string, body?: any, AjaxConfig?: IAjaxConfig) {
        return this.request<T>(lodash.assign({ url, body, method: "patch" }, AjaxConfig));
    }
    /**
     * delete
     * @param url 
     * @param body 
     * @param AjaxConfig 
     * @returns 
     */
    delete<T>(url: string, body?: any, AjaxConfig?: IAjaxConfig) {
        return this.request<T>(lodash.assign({ url, body, method: "delete" }, AjaxConfig));
    }
    /**
     * request
     * @param AjaxConfig 
     * @returns 
     */
    request<T>(AjaxConfig: IAjaxConfig) {
        return AjaxBasics.request<T>(lodash.assign({}, this.AjaxConfig, AjaxConfig));
    }
    /**
     * ajax request
     * @param AjaxConfig 
     * @returns 
     */
    static async request<T>(AjaxConfig: IAjaxConfig | string) {
        if (lodash.isString(AjaxConfig)) {
            AjaxConfig = { url: AjaxConfig }
        }
        return AjaxBasics.toPromise(AjaxBasics.requestObservable<T>(AjaxConfig));
    }
    /**
     * ajax request 缓存模式
     * @param AjaxConfig 
     * @returns 
     */
    static async requestEnum(AjaxConfig: IAjaxConfig | string, options?: IRequestEnumOptions): Promise<any> {
        if (lodash.isString(AjaxConfig)) {
            AjaxConfig = { url: AjaxConfig }
        }
        const key = Encryption.MD5(AjaxConfig);
        let request: Promise<Array<{}>>;
        if (AjaxBasics.Cache.has(key)) {
            request = AjaxBasics.Cache.get(key);
        } else {
            options = lodash.merge({ separator: ' - ' }, options)
            const obs = AjaxBasics.requestObservable(AjaxConfig)
                .pipe(
                    // 获取 response 对应的数据列表
                    map(res => {
                        if (lodash.isArray(res))
                            return res
                        if (options?.responseKey)
                            return lodash.get(res, options.responseKey)
                    }),
                    // 转换 list 数据列表
                    map(data => lodash.map(data, item => {
                        return lodash.assign(
                            {
                                label: lodash.isArray(options.labelKey) ?
                                    lodash.map(options.labelKey, key => lodash.get(item, key)).join(options.separator) :
                                    lodash.get(item, options.labelKey),
                                value: lodash.isArray(options.valueKey) ?
                                    lodash.map(options.valueKey, key => lodash.get(item, key)).join(options.separator) :
                                    lodash.get(item, options.valueKey),
                            },
                            { original: item }
                        )
                    }))
                );
            request = AjaxBasics.toPromise(obs);
            AjaxBasics.Cache.set(key, request);
        }
        return request;
    }
    /**
     * ajax Observable 转换 Promise
     * @param source 
     * @returns 
     */
    static async toPromise<T>(source: Observable<T>): Promise<T> {
        return lastValueFrom<T, any>(source, { defaultValue: false })
    }
    /**
     * ajax Observable
     * @param AjaxConfig 
     * @returns 
     */
    static requestObservable<T>(AjaxConfig: IAjaxConfig) {
        const obs = of(AjaxConfig).pipe(
            map(AjaxBasics.queryParams),
            map(AjaxBasics.joinUrl),
            concatMap(AjaxBasics.merge),
            concatMap(value => {
                lodash.set(value, 'headers.timestamp', Date.now())
                AjaxBasics.onStart(value);
                const obs: Observable<T> = AjaxBasics.createAjax(value).pipe(
                    // 错误处理
                    catchError((err) => {
                        if (err instanceof Error) {
                            AjaxBasics.onEnd(err, AjaxConfig);
                            AjaxBasics.ClearQueue(AjaxConfig)
                            throw err
                        }
                        return of(err)
                    }),
                    // 过滤
                    filter(AjaxBasics.filter(AjaxConfig)),
                    // 转换数据
                    map(AjaxBasics.map(AjaxConfig))
                );
                AjaxBasics.Queue.set(Encryption.MD5(value), obs);
                return obs;
            })
        );
        lodash.set(obs, 'AjaxConfig', AjaxConfig)
        return obs;
    }
    /**
     * ajax Observable
     * @param AjaxConfig 
     * @returns 
     */
    static createAjax(AjaxConfig: IAjaxConfig): Observable<any> {
        return ajax(AjaxConfig as AjaxConfig)
    }
    /**
     * 处理 get 请求 body 为 queryParams
     * @static
     * @param {IAjaxConfig} AjaxConfig
     * @return {*} 
     * @memberof AjaxBasics
     */
    static queryParams(AjaxConfig: IAjaxConfig) {
        if (lodash.eq(lodash.toLower(AjaxConfig.method), 'get') && !AjaxConfig.queryParams) {
            AjaxConfig.queryParams = lodash.pickBy(AjaxConfig.body, x => !lodash.includes([null, undefined, ''], x))
        }
        return AjaxConfig
    }
    /**
     * 处理 参数 地址Url
     * @param url 链接地址
     * @param params 参数
     * @returns 'url/{id}' {id:1} => 'url/1'
     */
    static queryParamsToUrl(url: string, params: any) {
        const interpolate = /{([\s\S]+?)}/g;
        lodash.uniq(url.match(interpolate)).map(par => {
            const key = lodash.trimEnd(lodash.trimStart(par, "{"), "}")
            const reg = new RegExp(`(\\${par})`, "g");
            url = lodash.replace(url, reg, lodash.get(params, key, ''))
        });
        return url
    }
    /**
     * join url AjaxConfig.target+AjaxConfig.url
     * 转换 url 参数 test/{id}/{name} body:{id:1,name:2} > test/1/2
     * @param AjaxConfig 
     * @returns 
     */
    static joinUrl(AjaxConfig: IAjaxConfig) {
        // join target
        if (AjaxConfig.target && !Regulars.url.test(AjaxConfig.target)) {
            AjaxConfig.target = lodash.join(lodash.compact([AjaxBasics.defaultAjaxConfig.target, AjaxConfig.target]).map(str => lodash.trim(str, '/')), '/')
        }
        // join url
        if (!Regulars.url.test(AjaxConfig.url)) {
            AjaxConfig.url = lodash.join(lodash.compact([AjaxConfig.target, AjaxConfig.url]).map(str => lodash.trim(str, '/')), '/')
        }
        AjaxConfig.url = AjaxBasics.queryParamsToUrl(AjaxConfig.url, AjaxConfig.body)
        lodash.unset(AjaxConfig, 'target');
        return AjaxConfig
    }

    /**
     * merge AjaxConfig
     * 一般用于 等待 加入 用户或者校验 token
     * @param AjaxConfig 
     * @returns 
     */
    static async merge(AjaxConfig: IAjaxConfig) {
        // if (lodash.isFunction(AjaxConfig.merge)) {
        //     AjaxConfig = await AjaxConfig.merge(AjaxConfig)
        // }
        return AjaxConfig
    }
    /**
     * 过滤请求结果
     * @param value 
     * @returns 
     */
    static filter(AjaxConfig: IAjaxConfig) {
        return <T>(response: AjaxResponse<T> | AjaxError | TimeoutError) => {
            try {
                AjaxBasics.onEnd(response, AjaxConfig);
                AjaxBasics.ClearQueue(AjaxConfig);
                if (response instanceof AjaxError || response instanceof TimeoutError) {
                    throw response.message
                }
                // 自定义 状态码
                if (AjaxConfig.statusPath && lodash.has(response.response, AjaxConfig.statusPath)) {
                    const code = lodash.get(response.response, AjaxConfig.statusPath);
                    if (!lodash.eq(code, 200)) {
                        throw lodash.has(response.response, AjaxConfig.messagePath) ? lodash.get(response.response, AjaxConfig.messagePath) : response.response
                    }
                }
                // 兼容小程序 request:fail
                if (lodash.has(response, 'errMsg')) {
                    if (lodash.includes(lodash.get(response, 'errMsg'), 'request:fail') || lodash.get(response, 'statusCode') !== 200) {
                        throw response
                    }
                }
                return true
            } catch (error) {
                AjaxBasics.onError(error, AjaxConfig);
                Log.error(`【${lodash.toUpper(AjaxConfig.method)}】Error - ${AjaxConfig.url}`, AjaxConfig, response)
                // return false
                throw error
            }
        }
    }
    /**
     * 转换获取 请求数据
     * @param AjaxConfig 
     * @returns 
     */
    static map(AjaxConfig: IAjaxConfig) {
        return <T>(value: AjaxResponse<T>) => {
            // 兼容微信小程序
            if (lodash.has(value, 'statusCode') && lodash.has(value, 'errMsg')) {
                value = lodash.assign<Partial<AjaxResponse<T>>, any>({
                    response: lodash.get(value, 'data'),
                    status: lodash.get(value, 'statusCode'),
                    responseHeaders: lodash.get(value, 'header'),
                }, value)
            }
            // 执行 对应的状态码处理
            if (lodash.has(AjaxBasics.statusMap, String(value.status))) {
                return lodash.invoke(AjaxBasics.statusMap, String(value.status), value, AjaxConfig)
            }
            return value
        }
    }
    /**
     * 状态码处理 
     * @static
     * @memberof AjaxBasics
     */
    static statusMap: { [key: string]: (value: AjaxResponse<any>, AjaxConfig: IAjaxConfig) => any } = {
        /** status = 200 */
        '200': (value: AjaxResponse<any>, AjaxConfig: IAjaxConfig) => {
            // 自定义 response 数据集
            if (AjaxConfig.responsePath && lodash.has(value.response, AjaxConfig.responsePath)) {
                return lodash.get(value.response, AjaxConfig.responsePath)
            }
            return value.response
        }
    }
    /**
     * 清理队列
     * @param AjaxConfig 
     */
    static ClearQueue(AjaxConfig: IAjaxConfig) {
        AjaxBasics.Queue.delete(Encryption.MD5(AjaxConfig));
        lodash.eq(AjaxBasics.Queue.size, 0) && AjaxBasics.onEndAll();
    }
    /**
     * 错误信息处理
     * @param error 
     * @param AjaxConfig 
     */
    static onError(error, AjaxConfig: IAjaxConfig) {
        console.warn("LENG ~  onError", error, AjaxConfig)
    }
    /**
     * 开始
     * @param error 
     * @param AjaxConfig 
     */
    static onStart(AjaxConfig: IAjaxConfig): void | Promise<any> {
        // console.info("LENG ~  onStart", AjaxConfig)
    }
    /**
     * 结束
     * @param error 
     * @param AjaxConfig 
     */
    static onEnd(response: any, AjaxConfig: IAjaxConfig) {
        // console.error("LENG ~   onEnd", response, AjaxConfig)
    }
    /**
     * 全部 请求 结束 请求队列清空
     */
    static onEndAll() {

    }
}
interface IRequestEnumOptions {
    responseKey?: string;
    labelKey?: string | Array<string>;
    valueKey?: string | Array<string>;
    /**
     * join 的 separator
     * @default ' - '
     */
    separator?: string;
}

// // 微信小程序 返回值
// interface SuccessCallbackResult<T extends string | ArrayBuffer = any | any> extends CallbackResult {
//     /** 开发者服务器返回的数据 */
//     data: T
//     /** 开发者服务器返回的 HTTP Response Header */
//     header: any
//     /** 开发者服务器返回的 HTTP 状态码 */
//     statusCode: number
//     /** 调用结果 */
//     errMsg: string
//     /** cookies */
//     cookies?: string[]
// }
// interface CallbackResult {
//     /** 错误信息 */
//     errMsg: string
// }