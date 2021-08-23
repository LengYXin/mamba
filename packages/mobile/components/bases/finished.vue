<template>
    <van-pull-refresh v-model="refreshing" @refresh="onLoad(true, true)">
        <van-list
            class="pagination-list"
            :loading="getLoading(Pagination)"
            :finished="getFinished(Pagination)"
            :error="Pagination.requestError"
            finished-text="没有更多了"
            @load="onLoad()"
        >
            <template #error>
                <van-empty description="出错了">
                    <van-button round type="primary" @click="onLoad(true)">刷新</van-button>
                </van-empty>
            </template>
            <slot />
        </van-list>
    </van-pull-refresh>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { observer } from "mobx-vue";
import { BasesPagination, IBasesResponse } from "@mamba/clients";
@observer
@Component({
    components: {}
})
export default class extends Vue {
    @Prop({ required: true }) Pagination: BasesPagination;
    @Prop({ required: true }) Load: (reset: boolean, refreshing: boolean) => Promise<IBasesResponse<any>>;
    refreshing = false
    async onLoad(reset = false, refreshing = false) {
        refreshing && (this.refreshing = true);
        await this.Load(reset, refreshing);
        refreshing && (this.refreshing = false);
    }
    getLoading(Pagination: BasesPagination) {
        return !this.refreshing && Pagination.loading
    }
    getFinished(Pagination: BasesPagination) {
        return !Pagination.requestError && Pagination.finished
    }
    created() { }
    mounted() { }
    updated() { }
    destroyed() { }
}
</script>
  <style lang="less" scoped>
.pagination-list {
    min-height: 50vh;
}
</style>
  