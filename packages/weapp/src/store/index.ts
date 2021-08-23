import React from "react";
import './global'
type TestEntity = {
    key: string;
    name: string;
    avatar: string;
    birthday: string;
    gender: string;
    introduce: string;
};
export const Store = {
    Test: new React.BasesController<TestEntity>({
        target: 'http://127.0.0.1:7001/api/mock',
        infinite: true,
        // listModel: { storageKey: React.AppConfig.createStorageKey('Test') }
    })
}
// 全局状态
Object.defineProperty(React.Component.prototype, "$Store", {
    get: () => Store,
});
declare module "react" {
    interface Component {
        /** 全局状态 */
        readonly $Store: typeof Store;
    }
}
