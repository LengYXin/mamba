/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2021-08-16 18:31:26
 * @modify date 2021-08-16 18:31:26
 * @desc [description]
 */
import lodash from 'lodash';
import { BindAll } from 'lodash-decorators';
import { BaseModel } from '../bases/baseModel';
import { of, delay, Subject } from 'rxjs';
import { Encryption } from '../../helpers/encryption';
@BindAll()
export class SystemController {
    constructor() {
        this.onVerify()
    }
    /**
     * 用户信息
     * @memberof SystemController
     */
    readonly User = new BaseModel({ type: 'object', storageKey: '_le_user', storageLoading: false });
    /**
     * 菜单信息
     * @memberof SystemController
     */
    readonly Menu = new BaseModel({ type: "list" });
    /**
     * 用户异步数据加载订阅
     * @type {Promise<any>}
     * @memberof ControllerUser
     */
    readonly UserSubject = new Subject()
    get AccessToken() {
        return lodash.get(this.User.value, 'access_token')
    }
    /**
     * 登陆状态
     * @readonly
     * @memberof SystemController
     */
    get LoginIn() {
        if (this.User.loading) {
            return false
        }
        return !lodash.isEmpty(this.AccessToken)
    }
    /**
     * 登陆
     * @param {*} formData
     * @return {*} 
     * @memberof SystemController
     */
    async onLogin(formData) {
        this.User.toggleLoading(true)
        await of(1).pipe(delay(1500)).toPromise()
        this.User.merge({ access_token: Encryption.MD5(formData) })
        await this.onGetUserInfo()
    }
    /**
     * 校验登陆状态
     * @memberof SystemController
     */
    async onVerify() {
        this.User.toggleLoading(true)
        await this.User.HydrateAsync
        await of(1).pipe(delay(1500)).toPromise()
        await this.onGetUserInfo()
    }
    async onGetUserInfo() {
        if (lodash.isEmpty(this.AccessToken)) {
            return
        }
        this.User.merge({ username: 'admin' })
        this.User.toggleLoading(false)
    }
    /**
     * 退出登录
     * @return {*} 
     * @memberof SystemController
     */
    async onLoginOut() {
        this.User.set({})
        return true
    }
}