<template>
    <div class="w-page-provider">
        <slot />
    </div>
</template>
  <script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
    components: {},
    provide() {
        return this.$attrs
    }
})
export default class extends Vue {
    created() { }
    mounted() { }
}
</script>
  <style lang="less" >
.w-page-provider {
    .ant-divider-horizontal {
        margin: 5px 0;
    }
}
</style>
  