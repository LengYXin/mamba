<template>
  <div>
    <ViewList />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ViewList from "./views/list.vue";
@Component({
  components: { ViewList }
})
export default class extends Vue {
  created() { }
  mounted() { }
  updated() { }
  destroyed() { }
}
</script>
<style lang="less">
</style>
