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
import { of, delay } from 'rxjs';
@BindAll()
export class SystemController {
    constructor() {
    }
    User = new BaseModel({ type: 'object', storageKey: '_le_user' });
    Menu = new BaseModel({ type: "list" });
    get LoginIn() {
        return lodash.has(this.User.value, 'username')
    }
    async onLogin(formData) {
        this.User.toggleLoading(true)
        await of(1).pipe(delay(1500)).toPromise()
        this.User.set(formData)
        this.User.toggleLoading(false)
        return true
    }
    async onLoginOut() {
        this.User.set({})
        return true
    }
}