import { action, observable } from 'mobx';
import Vue from 'vue';
import { EnumGender, EnumLocaleLabel } from '../locales';

/**
 * 页面实体
 * 配置参考 https://procomponents.ant.design/components/field-set/
 */
class Entity {
    /**
     * Key
     * @readonly
     * @memberof Entity
     */
    get Key(): Vue.EntitiesField {
        return {
            name: 'key',
            label: 'key'
        }
    }
    get Name_Filter(): Vue.EntitiesField {
        return {
            name: 'name',
            label: EnumLocaleLabel.Name,
            valueType: Vue.ValueType.select,
            request: async () => Vue.$Mamba.AjaxBasics.requestEnum('http://127.0.0.1:7001/api/mock',
                {
                    responseKey: 'dataSource',
                    labelKey: 'name',
                    valueKey: 'key'
                })
        }
    }
    get Gender_Filter(): Vue.EntitiesField {
        return {
            name: 'gender',
            label: EnumLocaleLabel.Gender,
            valueType: Vue.ValueType.select,
            request: async () => {
                return [{ value: String(EnumGender.Male), label: '男' }, { value: String(EnumGender.Girl), label: '女' }]
            }
        }
    }
    /**
     * Name
     * @readonly
     * @memberof Entity
     */
    get Name(): Vue.EntitiesField {
        return {
            name: 'name',
            label: EnumLocaleLabel.Name,
            rules: [{ required: true }],
        }
    }
    /**
     * Avatar
     * @readonly
     * @memberof Entity
     */
    get Avatar(): Vue.EntitiesField {
        return {
            name: 'avatar',
            label: EnumLocaleLabel.Avatar,
            rules: [{ required: true }],
        }
    }
    /**
     * Birthday
     * @readonly
     * @memberof Entity
     */
    get Birthday(): Vue.EntitiesField {
        return {
            name: 'birthday',
            label: EnumLocaleLabel.Birthday,
            valueType: Vue.ValueType.date,
            rules: [{ required: true }],
        }
    }
    /**
     * Gender
     * @readonly
     * @memberof Entity
     */
    get Gender(): Vue.EntitiesField {
        return {
            name: 'gender',
            label: EnumLocaleLabel.Gender,
            valueType: Vue.ValueType.radio,
            // valueEnum: {
            //     1: '男',
            //     2: '女',
            // },
            request: async () => {
                return [{ value: EnumGender.Male, label: '男' }, { value: EnumGender.Girl, label: '女' }]
            },
            rules: [{ required: true }],
        }
    }
    /**
     * Introduce
     * @readonly
     * @memberof Entity
     */
    get Introduce(): Vue.EntitiesField {
        return {
            name: 'introduce',
            label: EnumLocaleLabel.Introduce,
            valueType: Vue.ValueType.textarea,
            rules: [],
        }
    }
}
export const PageEntity = new Entity()