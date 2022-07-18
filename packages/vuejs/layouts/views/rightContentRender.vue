<template>
    <div class="w-layouts-right">
        <a-space>
            <a-button shape="circle" icon="customer-service" />
            <a-button shape="circle" icon="bell" />
            <a-button shape="circle" icon="search" />
            <a-dropdown>
                <a-button type="link">
                    <a-icon type="global" />
                    <span v-text="$i18n.locale"></span>
                    <a-icon type="down" />
                </a-button>

                <a-menu slot="overlay" @click="onChangeLanguage">
                    <a-menu-item v-for="item in languages" :key="item">
                        <span v-text="getLanguageIcons(item)"></span>
                        <a-divider type="vertical" style="margin: 0 3px;" />
                        <span v-text="item"></span>
                    </a-menu-item>
                </a-menu>
            </a-dropdown>
            <a-popover placement="bottom">
                <template slot="content">
                    <p>Content</p>
                    <p>Content</p>
                </template>
                <template slot="title">
                    <span>UserName</span>
                </template>
                <div>
                    <a-avatar size="large" icon="user" />
                    <span>UserName</span>
                </div>
            </a-popover>
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
    getLanguageIcons(key) {
        return lodash.get({
            'zh': '🇨🇳',
            // 'zh-TW': '🇭🇰',
            'en': '🇬🇧',
            // 'pt-BR': '🇧🇷',
        }, key)
    };
    onChangeLanguage(event) {
        this.AppConfig.onChangeAppSettings({ type: 'language', value: event.key })
    }
    onSearch() { }

    mounted() { }
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

