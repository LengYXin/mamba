import { AppEntitiesField, AppValueType } from '@/components';
import { BasesPagination } from "@mamba/clients";
import lodash from "lodash";
import Vue from "vue";
import { NavigationFailure } from "vue-router";
lodash.set(Vue, 'ValueType', AppValueType)
/**
* 跳转详情
* 合并当前页面的 query 追加 detailsVisible 触发显示
* @param {*} [query='0']
*/
Vue.prototype.__ToDetails = function (query: any = "", readonly = false) {
    if (!lodash.isObject(query)) {
        query = { 'details': query }
    }
    // 路由中已经存在 参数 且 值相同
    lodash.mapKeys(this.$route.query, (value, key) => {
        if (lodash.has(query, key) && lodash.eq(value, lodash.get(query, key))) {
            lodash.unset(query, key)
        }
    })
    if (readonly) {
        lodash.set(query, '_readonly', '')
    }
    query = lodash.assign({}, this.$route.query, query)
    this.$router.replace({ query })
}
/**
* 详情返回
* 去除当前页面的 query 中 detailsVisible 触发隐藏
*/
Vue.prototype.__BackDetails = function (queryKey?) {
    const query = lodash.omit(lodash.assign({}, this.$route.query), lodash.concat(
        [
            'details',
            '_readonly',
            queryKey,
        ]
    ))
    this.$router.replace({ query })
}
/**
 *  记录 参数 到 url query
 */
Vue.prototype.__ToQuery = function (values) {
    const query = lodash.pickBy(
        lodash.assign({}, this.$route.query, values),
        lodash.identity
    );
    if (lodash.isEqual(query, this.$route.query)) {
        return
    }
    return this.$router.replace({ query });
}

declare module 'vue/types/vue' {
    interface Vue {
        /**
          * 跳转详情
          * 合并当前页面的 query 追加 detailsVisible 触发显示
          * @param {*} [query]
          */
        readonly __ToDetails: (query?: any, readonly?: boolean) => void
        /**
         * 详情返回
         * 去除当前页面的 query 中 detailsVisible 触发隐藏
         */
        readonly __BackDetails: (queryKey?) => void
        /**
         * 记录 参数 到 url query
         * $router.replace
         * @param values 
         */
        readonly __ToQuery: (values) => Promise<void | NavigationFailure>
    }
    interface VueConstructor<V extends Vue = Vue> {
        ValueType: typeof AppValueType
    }
}
declare module 'vue/types/umd' {
    type EntitiesField = AppEntitiesField
}