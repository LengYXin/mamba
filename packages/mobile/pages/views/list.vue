<template>
    <div>
        <van-sticky>
            <van-search v-model="search" placeholder="请输入搜索关键词" @search="onLoad(true)" />
        </van-sticky>
        <bases-finished :Pagination="Pagination" :Load="onLoad">
            <ViewCard v-for="item in Pagination.dataSource" :key="item.key" :dataSource="item" />
        </bases-finished>
    </div>
</template>
  <script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import ViewCard from "./card.vue";
@Observer
@Component({
    components: { ViewCard }
})
export default class extends Vue {
    search = ""
    get Pagination() {
        return this.$store.Example.Pagination
    }
    async onLoad(reset?, refreshing?) {
        reset && this.Pagination.reset();
        return this.Pagination.onLoad({ body: { search: this.search } });
    }
    created() { }
    async mounted() {
        this.$toast('模拟了持久化场景')
        // 持久化初始化完成
        await this.Pagination.Model.HydrateAsync;
        this.search = this.Pagination.Model.getStorage('request.body.search')
        console.log("LENG ~ extends ~ onLoad ~ this.Pagination", this.Pagination)
    }
    updated() { }
    destroyed() { }
}
</script>
  <style lang="less">
</style>
  