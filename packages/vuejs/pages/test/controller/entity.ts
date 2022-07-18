import { action, observable } from 'mobx';
import Vue from 'vue';
import { EnumGender, EnumLocaleLabel } from '../locales';

/**
 * 页面实体
 * 配置参考 https://procomponents.ant.design/components/field-set/
 */
class Entity {
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
    get DataUrl(): Vue.EntitiesField {
        return {
            name: 'dataUrl',
            label: EnumLocaleLabel.DataUrl,
        }
    }
    /**
     * Name
     * @readonly
     * @memberof Entity
     */
    get Option(): Vue.EntitiesField {
        return {
            name: 'option',
            label: EnumLocaleLabel.Option,
            valueType: Vue.ValueType.codemirror,
            rules: [{ required: true }],
        }
    }
}
export const PageEntity = new Entity()