/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2021-04-01 16:35:28
 * @modify date 2021-04-01 16:35:28
 * @desc 兼容小程序的 Store
 */
import taro from "@tarojs/taro";
function clear() {
    return new Promise(function (resolve, reject) {
        try {
            taro.clearStorageSync();
            resolve(null);
        }
        catch (err) {
            reject(err);
        }
    });
}
function getItem(key) {
    return new Promise(function (resolve, reject) {
        try {
            var value = taro.getStorageSync(key);
            resolve(value);
        }
        catch (err) {
            reject(err);
        }
    });
}
function removeItem(key) {
    return new Promise(function (resolve, reject) {
        try {
            taro.removeStorageSync(key);
            resolve(null);
        }
        catch (err) {
            reject(err);
        }
    });
}
function setItem(key, value) {
    return new Promise(function (resolve, reject) {
        try {
            taro.setStorageSync(key, value);
            resolve(null);
        }
        catch (err) {
            reject(err);
        }
    });
}
export default {
    clear,
    setItem,
    removeItem,
    getItem,

}
