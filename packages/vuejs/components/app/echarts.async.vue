<template>
    <div class="app-echarts">
        <v-chart class="app-echarts-chart" :option="option" />
    </div>
</template>
  <script lang="ts">
// import { PieChart } from "echarts/charts";
// import { LegendComponent, TitleComponent, TooltipComponent } from "echarts/components";
// import { use } from "echarts/core";
// import { CanvasRenderer } from "echarts/renderers";
import VChart, { THEME_KEY } from "vue-echarts";
import { Component, Prop, Provide, Vue } from "vue-property-decorator";
import "echarts";
// 文档地址 https://echarts.apache.org/handbook/zh/basics/import
// use([
//     CanvasRenderer,
//     PieChart,
//     TitleComponent,
//     TooltipComponent,
//     LegendComponent
// ]);

@Component({
    components: { VChart },
})
export default class extends Vue {
    @Prop({ required: true, type: Object }) option;
    @Provide() [THEME_KEY] = ''
    created() { }
    mounted() { }
}
</script>
  <style lang="less" >
.app-echarts {
    display: block;
    height: 100%;
    width: 100%;
}
</style>
  