<template>
    <van-swipe-cell>
        <nuxt-link :to="{ name: 'example-details', query: { key: dataSource.key } }">
            <van-card
                :desc="dataSource.introduce"
                :title="dataSource.name"
                :thumb="dataSource.avatar"
            />
        </nuxt-link>
        <template #right>
            <van-button square text="删除" type="danger" class="delete-button" @click="onDelete" />
        </template>
    </van-swipe-cell>
</template>
  <script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Observer } from "mobx-vue";
@Observer
@Component({
    components: {}
})
export default class extends Vue {
    @Prop() dataSource;
    get PageController() {
        return this.$store.Pagination
    }
    async onDelete() {
        await this.$dialog.confirm({ title: '确定删除这条数据么' })
        this.PageController.onDelete(this.dataSource)
    }
    created() { }
    mounted() { }
    updated() { }
    destroyed() { }
}
</script>
  <style lang="less">
</style>
  