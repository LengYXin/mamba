import lodash from "lodash";

export class ClientsEnv {
    /**
     *   localStorage  前缀 
     * @memberof AppConfig
     */
    readonly storagePrefix = "_le_";
    /**
     * api 地址
     * @memberof AppConfig
     */
    readonly target = process.env.Target;
    /**
     * 客服 地址
     * @memberof AppConfig
     */
    readonly customUrl = process.env.CustomUrl;
    /**
     * 版本信息
     * @memberof AppConfig
     */
    readonly version = process.env.Version;
    /**
     * 构建时间戳
     * @memberof AppConfig
     */
    readonly timestamp = process.env.Timestamp;
    /**
     * Node env
     * @memberof AppConfig
     */
    // @ts-ignore
    readonly NODE_ENV: 'development' | 'production' | 'test' = process.env.NODE_ENV;
    /**
     * Node env production
     * @memberof AppConfig
     */
    readonly production = lodash.eq(this.NODE_ENV, 'production');
    /**
     * Node env development
     * @memberof AppConfig
     */
    readonly development = lodash.eq(this.NODE_ENV, 'development');
    /**
     * Node env test
     * @memberof AppConfig
     */
    readonly test = lodash.eq(this.NODE_ENV, 'test');
    /**
     * 环境
     * @memberof AppConfig
     */
    // @ts-ignore
    readonly APP_ENV: 'develop' | 'release' | 'trial' = process.env.APP_ENV;
    /**
     * 本地 dev
     * @memberof AppConfig
     */
    readonly develop = lodash.eq(this.APP_ENV, 'develop');
    /**
     * 生产环境
     * @memberof AppConfig
     */
    readonly release = lodash.eq(this.APP_ENV, 'release');
    /**
     * 预览环境
     * @memberof AppConfig
     */
    readonly trial = lodash.eq(this.APP_ENV, 'trial');
    /**
     * 创建 Storage key
     * @param key 
     */
    createStorage(key: string) {
        return this.storagePrefix + key;
    }
}
export default new ClientsEnv()