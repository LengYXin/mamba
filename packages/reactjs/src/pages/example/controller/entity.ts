import { action, observable } from 'mobx';
import React from 'react';
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
    get Key(): React.EntitiesField {
        return {
            name: 'key',
            label: 'key'
        }
    }
    get Name_Filter(): React.EntitiesField {
        return {
            name: 'name',
            label: EnumLocaleLabel.Name,
            valueType: "select",
            request: async () => React.$Mamba.AjaxBasics.requestEnum('http://127.0.0.1:7001/api/mock',
                {
                    responseKey: 'dataSource',
                    labelKey: 'name',
                    valueKey: 'key'
                })
        }
    }
    get Gender_Filter(): React.EntitiesField {
        return {
            name: 'gender',
            label: EnumLocaleLabel.Gender,
            valueType: "select",
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
    get Name(): React.EntitiesField {
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
    get Avatar(): React.EntitiesField {
        return {
            name: 'avatar',
            label: EnumLocaleLabel.Avatar,
            valueType: "image",
            rules: [{ required: true }],
        }
    }
    /**
     * Birthday
     * @readonly
     * @memberof Entity
     */
    get Birthday(): React.EntitiesField {
        return {
            name: 'birthday',
            label: EnumLocaleLabel.Birthday,
            valueType: "date",
            rules: [{ required: true }],
        }
    }
    /**
     * Gender
     * @readonly
     * @memberof Entity
     */
    get Gender(): React.EntitiesField {
        return {
            name: 'gender',
            label: EnumLocaleLabel.Gender,
            valueType: "radio",
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
    get Introduce(): React.EntitiesField {
        return {
            name: 'introduce',
            label: EnumLocaleLabel.Introduce,
            valueType: "textarea",
            rules: [],
        }
    }
}
export const PageEntity = new Entity()