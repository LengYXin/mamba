<template>
    <div>
        <!-- <a-button type="primary" @click="onAddRow">添加行</a-button>
        <a-row v-for="(row,index) in rows" :key="index" :gutter="[16, 16]">
            <draggable  class="app-draggable" v-bind="dragOptions" @change="log">
                <ViewEcharts
                    class="app-item"
                    v-for="item in dataSource"
                    :key="item.name"
                    v-bind="item"
                />
            </draggable>
        </a-row>-->
        <a-divider>拖拽图表</a-divider>
        <draggable class="app-draggable" v-bind="dragOptions" @change="log">
            <ViewEcharts
                class="app-item"
                v-for="item in dataSource"
                :key="item.name"
                v-bind="item"
            />
        </draggable>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ViewEcharts from "./echarts.vue";
@Component({
    components: { ViewEcharts }
})
export default class extends Vue {
    rows = [
        { col: 1 }
    ]
    editable = false
    isDragging = false
    get dragOptions() {
        return {
            list: this.dataSource,
            animation: 0,
            group: "people",
            ghostClass: "ghost"
        };
    }
    dataSource = []
    log(evt) {
        console.log(evt);
    }
    onAddRow() {
        this.rows.push({ col: 1 })
    }
    created() { }
    mounted() { }
    updated() { }
    destroyed() { }
}
</script>
<style lang="less" scoped>
.app-draggable {
    min-height: 200px;
    padding: 20px;
}
.app-item {
    cursor: move;
}
</style>
