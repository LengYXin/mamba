<template>
    <draggable
        v-bind="dragOptions"
        @start="isDragging = true"
        @end="isDragging = false"
        :move="onMove"
    >
        <div class="app-item" v-for="item in dataSource" :key="item.name">
            <a-card :title="item.name">
                <a-tooltip slot="extra">
                    <template slot="title">设置数据源</template>
                    <a-icon type="setting" @click="__ToDetails(item.name)" />
                </a-tooltip>
            </a-card>
        </div>
    </draggable>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import options from "./options";
@Component({
    components: {}
})
export default class extends Vue {
    editable = false
    isDragging = false
    get dragOptions() {
        return {
            list: this.dataSource,
            animation: 0,
            group: { name: 'people', pull: 'clone', put: false },
            // disabled: !this.editable,
            sort: false,
            ghostClass: "ghost"
        };
    }
    dataSource = options
    onMove({ relatedContext, draggedContext }) {
        const relatedElement = relatedContext.element;
        const draggedElement = draggedContext.element;
        return (
            (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
        );
    }
    created() { }
    mounted() { }
    updated() { }
    destroyed() { }
}
</script>
<style lang="less" scoped>
.app-item {
    cursor: move;
}
</style>
