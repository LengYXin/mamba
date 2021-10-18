import { Avatar, Skeleton, Tooltip, Button, Card, Checkbox, Col, ConfigProvider, DatePicker, Divider, Drawer, Dropdown, Empty, FormModel, Icon, Input, InputNumber, List, Menu, message, Modal, notification, Pagination, Popconfirm, Radio, Row, Select, Space, Spin, Statistic, Steps, Switch, Table, Tabs, Transfer, Upload } from 'ant-design-vue';
import Base from 'ant-design-vue/es/base';
import ProLayout, { SettingDrawer } from '@ant-design-vue/pro-layout';
import Vue from 'vue';
import Momentjs from 'moment';
const components = [Base, Skeleton, Tooltip, Avatar, Button, Card, Checkbox, Col,
    DatePicker, Divider, Dropdown, FormModel, Icon, Input,
    InputNumber, List, Menu, Modal, Pagination, Popconfirm, Radio,
    Row, Select, Spin, Statistic, Steps, Switch, Table, Transfer,
    Tabs, Upload, Drawer,
    ConfigProvider, Empty, Space];
components.map(function (component) {
    // @ts-ignore
    Vue.use(component);
});
Vue.component('ProLayout', ProLayout)
Vue.component('SettingDrawer', SettingDrawer)
Vue.prototype.moment = Momentjs;
Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
Vue.prototype.$info = Modal.info;
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
Vue.prototype.$warning = Modal.warning;
Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$destroyAll = Modal.destroyAll;
declare module 'vue/types/vue' {
    interface Vue {
        moment: typeof Momentjs;
    }
}