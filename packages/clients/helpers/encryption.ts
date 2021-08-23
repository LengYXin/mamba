/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2021-08-23 11:23:50
 * @modify date 2021-08-23 11:23:50
 * @desc [算法]
 */
import CryptoJSMD5 from 'crypto-js/md5';
import lodash from 'lodash';
export class Encryption {
    static GUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    static uniqueId() {
        return Encryption.MD5(Encryption.GUID())
    }
    static MD5(params: any) {
        if (!lodash.isString(params)) {
            params = JSON.stringify(params)
        }
        return CryptoJSMD5(params).toString()
    }
}
