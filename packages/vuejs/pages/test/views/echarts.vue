<template>
    <a-card :title="name">
        <a-tooltip slot="extra">
            <template slot="title">设置数据源</template>
            <a-icon type="setting" @click="__ToDetails(name)"/>
        </a-tooltip>
        <app-echarts :option="option" style="height: 400px;" />
    </a-card>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
    components: {}
})
export default class extends Vue {
    @Prop() name;
    @Prop() option;
    created() { }
    mounted() { }
    updated() { }
    destroyed() { }
}
</script>
<style lang="less">
</style>
