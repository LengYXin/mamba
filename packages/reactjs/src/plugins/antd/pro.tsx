import createField from '@ant-design/pro-form/es/BaseForm/createField';
import ProFormCaptcha from '@ant-design/pro-form/es/components/Captcha';
import ProFormField from '@ant-design/pro-form/es/components/Field';
import ProFormUploadButton from '@ant-design/pro-form/es/components/UploadButton';
import ProFormUploadDragger from '@ant-design/pro-form/es/components/UploadDragger';
import DrawerForm from '@ant-design/pro-form/es/layouts/DrawerForm';
import LoginForm from '@ant-design/pro-form/es/layouts/LoginForm';
import ModalForm from '@ant-design/pro-form/es/layouts/ModalForm';
import ProForm from '@ant-design/pro-form/es/layouts/ProForm';
import QueryFilter from '@ant-design/pro-form/es/layouts/QueryFilter';
import ProLayout from '@ant-design/pro-layout/es/BasicLayout';
import PageContainer from '@ant-design/pro-layout/es/components/PageContainer';
import SettingDrawer from '@ant-design/pro-layout/es/components/SettingDrawer';
import ProCard from '@ant-design/pro-card/es/ProCard';
import StatisticCard from '@ant-design/pro-card/es/components/StatisticCard';
import ProSkeleton from '@ant-design/pro-skeleton';
import lodash from 'lodash';
import { inject } from 'mobx-react';
import React from 'react';
import ProFormText from '@ant-design/pro-form/es/components/Text';
import ProFormCheckbox from '@ant-design/pro-form/es/components/Checkbox';
// https://procomponents.ant.design/components/field-set#proformtext
const FormField = React.lazy<typeof ProFormField>(() => import('@ant-design/pro-form/es/components/Field'));
/**
 * 转换 FieldProps 从PageEntity 通过ID获取属性
 * @param props 
 * @returns 
 */
function toFieldProps(props: typeof ProFormField.propTypes): any {
    props = lodash.clone(props)
    if (lodash.has(props, 'PageEntity') && props.id) {
        const PageEntity = lodash.get(props, 'PageEntity');
        const entity = lodash.get(PageEntity, String(props.id))
        lodash.unset(props, 'PageEntity')
        lodash.assign(props, entity)
    }
    return lodash.mapValues(props, (value, key) => {
        if (lodash.includes(['label', 'placeholder', 'tooltip'], key) && lodash.isString(value)) {
            return React.$i18n.t(value)
        }
        return value
    })
}
const NewProFormField: typeof ProFormField = inject(store => lodash.pick(store, 'PageEntity'))(
    (props) => {
        return <FormField {...toFieldProps(props as any)} />
    }
)

export default {
    createField,
    ProSkeleton,
    ProForm,//: React.lazy<typeof ProForm>(() => import('@ant-design/pro-form/es/layouts/ProForm')),
    DrawerForm: React.lazy<typeof DrawerForm>(() => import('@ant-design/pro-form/es/layouts/DrawerForm')),
    ModalForm: React.lazy<typeof ModalForm>(() => import('@ant-design/pro-form/es/layouts/ModalForm')),
    LoginForm: React.lazy<typeof LoginForm>(() => import('@ant-design/pro-form/es/layouts/LoginForm')),
    QueryFilter, //React.lazy<typeof QueryFilter>(() => import('@ant-design/pro-form/es/layouts/QueryFilter')),
    // LightFilter,
    // ProFormDependency,
    // ProFormCheckbox,
    // ProFormText: React.lazy<typeof ProFormText>(() => import('@ant-design/pro-form/es/components/Text')),
    // ProFormField: React.lazy<typeof ProFormField>(() => import('@ant-design/pro-form/es/components/Field')),
    ProFormField: NewProFormField,
    ProFormCaptcha,//: React.lazy<typeof ProFormCaptcha>(() => import('@ant-design/pro-form/es/components/Captcha')),
    ProFormUploadButton: React.lazy<typeof ProFormUploadButton>(() => import('@ant-design/pro-form/es/components/UploadButton')),
    ProFormUploadDragger: React.lazy<typeof ProFormUploadDragger>(() => import('@ant-design/pro-form/es/components/UploadDragger')),
    ProCard,
    StatisticCard,
    PageContainer: React.lazy<typeof PageContainer>(() => import('@ant-design/pro-layout/es/components/PageContainer')),
    ProLayout: React.lazy<typeof ProLayout>(() => import('@ant-design/pro-layout/es/BasicLayout')),
    SettingDrawer: React.lazy<typeof SettingDrawer>(() => import('@ant-design/pro-layout/es/components/SettingDrawer')),
}