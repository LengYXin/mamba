/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2018-09-12 18:52:37
 * @modify date 2018-09-12 18:52:37
 * @desc [Ajax]
 */
import lodash from "lodash";
import { BindAll } from "lodash-decorators";
import { lastValueFrom, Observable, of, TimeoutError, catchError, concatMap, filter, map, Subject } from "rxjs";
import { ajax, AjaxConfig, AjaxError, AjaxResponse } from "rxjs/ajax";
import { Log } from "./log";
import { Encryption } from "./encryption";
import { Regulars } from "./regulars";
const ENV_TEST = process.env.NODE_ENV === 'test'
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
    cache?: boolean;
    /**
     * 加载
     */
    loading?: boolean;
    /**
     * 自定义 状态码 
     * @default xhr.status
     */
    statusPath?: Array<string>;
    /**
     * 自定义 response 数据集
     * @default xhr.response
     */
    responsePath?: Array<string>;
    /**
     * 自定义 错误信息
     * @default  xhr.message
     */
    messagePath?: Array<string>;
    /**
     * 等待身份认证完成
     * @default 默认 null
     */
    awaitAuthenticated?: boolean
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
    static readonly defaultAjaxConfig: IAjaxConfig = {
        target: "/",
        timeout: 30000,
        headers: {},
    };
    /**
     * 请求队列
     * @static
     * @memberof AjaxBasics
     */
    static Queue = new Map<string, Observable<any>>();
    /**
     * 缓存队列
     * @static
     */
    static Cache = new Map<string, Promise<any>>();
    /**
     * 缓存时长 
     */
    static CacheTime = 60000;
    // static CacheSubject = new Subject<string>();
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
     * 重置 默认配置
     * @static
     * @param {IAjaxConfig} AjaxConfig
     * @param {boolean} [merge=true]
     * @memberof AjaxBasics
     */
    static resetDefault(AjaxConfig: IAjaxConfig, merge = true) {
        lodash.merge(AjaxBasics.defaultAjaxConfig, AjaxConfig)
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
        if (lodash.isEmpty(AjaxConfig)) {
            throw AjaxConfig
        }
        return AjaxBasics.toPromise(AjaxBasics.requestObservable<T>(AjaxConfig), AjaxConfig);
    }
    /**
     * ajax request 缓存模式
     * @param AjaxConfig 默认 cache
     * @returns 
     */
    static async requestEnum(AjaxConfig: IAjaxConfig | string, options?: IRequestEnumOptions): Promise<Array<{ label: string, value: any, [key: string]: any }>> {
        if (lodash.isString(AjaxConfig)) {
            AjaxConfig = { url: AjaxConfig }
        }
        options = lodash.merge({ separator: ' - ' }, options);
        // 获取 response 对应的数据列表
        const mapResponse = map(res => {
            if (lodash.isArray(res))
                return res
            if (options?.responseKey)
                return lodash.get(res, options.responseKey)
        });
        // 获取对应值
        const toLabelValue = (item, optionKey) => {
            if (lodash.isArray(optionKey)) {
                return lodash.map(optionKey, key => lodash.get(item, key)).join(options.separator)
            }
            return lodash.get(item, optionKey)
        }
        // 转换 list 数据列表
        const mapList = map<any, any>(data => lodash.map(data, item => ({
            label: toLabelValue(item, options.labelKey),
            value: toLabelValue(item, options.valueKey),
            original: item
        })))
        const obs = AjaxBasics
            .requestObservable(AjaxConfig)
            .pipe(mapResponse, mapList);
        return AjaxBasics.toPromise(obs, AjaxConfig);
    }
    /**
     * ajax Observable 转换 Promise
     * @param source 
     * @returns 
     */
    static async toPromise<T>(source: Observable<T>, AjaxConfig?: IAjaxConfig): Promise<T> {
        // 请求
        let request: Promise<T>;
        let key: string;
        // 存在缓存
        if (AjaxConfig?.cache) {
            // 唯一Key
            key = AjaxBasics.getMD5(AjaxConfig);
            const CacheRequest = AjaxBasics.Cache.get(key)
            const CacheBeginTime = lodash.get(CacheRequest, 'CacheBeginTime')
            const time = Date.now()
            if (!lodash.isEmpty(CacheRequest) && lodash.subtract(time, lodash.sum([CacheBeginTime, AjaxBasics.CacheTime])) < 0) {
                request = AjaxBasics.Cache.get(key);
                Log.warning(`【 Cache ${key} ${AjaxConfig.url} 】`, {
                    AjaxConfig,
                    request,
                    Cache: AjaxBasics.Cache
                })
            } else {
                // 清理过期缓存
                if (!lodash.isEmpty(CacheRequest)) {
                    AjaxBasics.Cache.delete(key);
                }
                request = lastValueFrom<T, any>(source, { defaultValue: false });
                // 设置 原始 AjaxConfig
                lodash.set(request, 'AjaxConfig', AjaxConfig)
                // 设置 缓存开始时间
                lodash.set(request, 'CacheBeginTime', Date.now())
                AjaxBasics.Cache.set(key, request);
            }
        } else {
            request = lastValueFrom<T, any>(source, { defaultValue: false })
        }
        return request
            .catch(reason => {
                key && AjaxBasics.Cache.delete(key)
                throw reason
            })
    }
    /**
     * ajax Observable
     * @param AjaxConfig 
     * @returns 
     */
    static requestObservable<T>(AjaxConfig: IAjaxConfig) {
        const obs = of(lodash.merge({}, AjaxBasics.defaultAjaxConfig, AjaxConfig)).pipe(
            map(AjaxBasics.queryParams),
            map(AjaxBasics.joinUrl),
            concatMap(AjaxBasics.merge),
            concatMap(value => {
                if (!lodash.hasIn(value, 'headers.timestamp')) {
                    lodash.set(value, 'headers.timestamp', Date.now())
                }
                AjaxBasics.onStart(value);
                const obs: Observable<T> = AjaxBasics.createAjax(value).pipe(
                    // 错误处理
                    catchError((err) => {
                        if (err instanceof Error && lodash.isEmpty(lodash.get(err, 'response'))) {
                            AjaxBasics.ClearQueue(value);
                            AjaxBasics.onError(err, value);
                            AjaxBasics.onEnd(err, value);
                            throw err
                        }
                        return of(err)
                    }),
                    // 兼容小程序
                    map(AjaxBasics.weappCompatible),
                    // 过滤
                    filter(AjaxBasics.filter(value)),
                    // 转换数据
                    map(AjaxBasics.map(value))
                );
                AjaxBasics.Queue.set(Encryption.MD5(value), obs);
                return obs;
            })
        );
        // lodash.set(obs, 'AjaxConfig', AjaxConfig)
        return obs;
    }
    /**
     * 获取 MD5 key
     * @param AjaxConfig 
     * @returns 
     */
    static getMD5(AjaxConfig) {
        AjaxConfig = lodash.cloneDeep(AjaxConfig)
        lodash.unset(AjaxConfig, 'headers.timestamp');
        // 生成唯一Key
        return Encryption.MD5(AjaxConfig);
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
        const isGet = lodash.isNil(AjaxConfig.method) || lodash.eq(lodash.toLower(AjaxConfig.method), 'get')
        if (isGet && !AjaxConfig.queryParams) {
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
        if (!Regulars.url.test(AjaxConfig.target)) {
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
     * 兼容小程序
     * @param res 
     * @returns 
     */
    static weappCompatible<T>(res: AjaxResponse<T>) {
        // 兼容微信小程序
        if (lodash.has(res, 'statusCode') && lodash.has(res, 'errMsg')) {
            res = lodash.assign<Partial<AjaxResponse<T>>, any>({
                response: lodash.get(res, 'data'),
                status: lodash.get(res, 'statusCode'),
                responseHeaders: lodash.get(res, 'header'),
            }, res)
        }
        return res
    }
    /**
     * 过滤请求结果
     * @param value 
     * @returns 
     */
    static filter(AjaxConfig: IAjaxConfig) {
        return <T>(res: AjaxResponse<T> | AjaxError | TimeoutError) => {
            try {
                AjaxBasics.ClearQueue(AjaxConfig);
                AjaxBasics.onEnd(res, AjaxConfig);
                const response = lodash.get(res, 'response')
                if ((res instanceof AjaxError || res instanceof TimeoutError) && lodash.isEmpty(response)) {
                    throw res
                }
                // 自定义 状态码
                const statusKeys = lodash.intersection(lodash.keys(response), AjaxConfig.statusPath)
                if (lodash.size(AjaxConfig.statusPath) && lodash.size(statusKeys)) {
                    const code = lodash.get(response, lodash.head(statusKeys));
                    if (!lodash.eq(code, 200)) {
                        const messageKeys = lodash.intersection(lodash.keys(response), AjaxConfig.messagePath)
                        if (lodash.size(messageKeys)) {
                            throw { message: lodash.get(response, lodash.head(messageKeys)), status: code }
                        }
                        throw res
                    }
                }
                return true
            } catch (error) {
                AjaxBasics.onError(error, AjaxConfig);
                Log.error(`【${lodash.toUpper(AjaxConfig.method)}】Error - ${AjaxConfig.url}`, AjaxConfig, res)
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
        return <T>(res: AjaxResponse<T>) => {
            // 执行 对应的状态码处理
            if (lodash.has(AjaxBasics.statusMap, String(res.status))) {
                return lodash.invoke(AjaxBasics.statusMap, String(res.status), res, AjaxConfig)
            }
            return res
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
            const responseKeys = lodash.intersection(lodash.keys(value.response), AjaxConfig.responsePath)
            if (lodash.size(AjaxConfig.responsePath) && lodash.size(responseKeys)) {
                return lodash.get(value.response, lodash.head(responseKeys))
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
        lodash.delay(() => {
            lodash.eq(AjaxBasics.Queue.size, 0) && AjaxBasics.onEndAll()
        }, 100)
    }
    /**
     * 错误信息处理
     * @param error 
     * @param AjaxConfig 
     */
    static onError(error, AjaxConfig: IAjaxConfig) {
        // console.warn("LENG ~  onError", error, AjaxConfig)
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
        ENV_TEST && Log.success(`【 Ajax End 】`, response)
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