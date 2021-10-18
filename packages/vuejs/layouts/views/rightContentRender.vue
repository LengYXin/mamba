<template>
    <div class="w-layouts-right">
        <a-space>
            <a-avatar size="large" icon="user" />
            <a-dropdown>
                <a class="ant-dropdown-link">
                    <span v-text="$i18n.locale"></span>
                    <a-icon type="down" />
                </a>
                <a-menu slot="overlay" @click="onChangeLanguage">
                    <a-menu-item v-for="item in languages" :key="item">
                        <span v-text="item"></span>
                    </a-menu-item>
                </a-menu>
            </a-dropdown>
        </a-space>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import lodash from 'lodash';
import { observer } from "mobx-vue";
@observer
@Component({
    components: {}
})
export default class extends Vue {
    get languages() {
        return lodash.keys(this.$i18n.messages)
    }
    onChangeLanguage(event) {
        this.AppConfig.onChangeAppSettings({ type: 'language', value: event.key })
    }
    onClickLeft() { }
    onClickRight() { }

    mounted() {

    }
    updated() { }
    destroyed() { }
}
</script>
<style lang="less" >
.app-layout {
    .ant-pro-top-nav-header-menu {
        max-width: initial !important;
    }
    .ant-pro-global-header {
        display: flex;
    }
}
.w-layouts-right {
    display: inline-block;
    text-align: right;
    padding: 0 24px;
    .ant-layout-header & {
        flex: auto;
    }
}
</style>

