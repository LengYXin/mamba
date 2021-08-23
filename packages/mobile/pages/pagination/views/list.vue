<template>
    <div>
        <van-sticky>
            <van-search v-model="search" placeholder="请输入搜索关键词" @search="onLoad(true)" />
        </van-sticky>
        <van-pagination
            :value="Pagination.current"
            :total-items="Pagination.total"
            :items-per-page="Pagination.pageSize"
            force-ellipses
            @change="onLoad"
        />
        <ViewCard v-for="item in Pagination.dataSource" :key="item.key" :dataSource="item" />
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
    refreshing = false
    get Pagination() {
        return this.$store.Pagination.Pagination
    }
    async onLoad(current?) {
        this.Pagination.onLoad({ current });
    }
    created() {
        this.onLoad()
    }
    mounted() { }
    updated() { }
    destroyed() { }
}
</script>
  <style lang="less">
</style>
  