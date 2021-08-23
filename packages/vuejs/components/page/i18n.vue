<template>
    <span v-text="$t(keypath)" />
</template>
  <script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import lodash from "lodash";
@Component({
    components: {
    },
})
export default class extends Vue {
    @Prop({ required: true }) keypath;
    created() { }
    mounted() {
        // console.log("LENG ~ extends ~ mounted ~ this.$props", this.$props)
    }
}
</script>
  <style lang="less">
</style>
  