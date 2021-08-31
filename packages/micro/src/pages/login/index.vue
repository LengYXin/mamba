<template>
  <div>
    <micro-app
      :name="$route.name"
      url="http://localhost:3000/"
      :baseurl="'/' + String($route.name)"
      :data="baseData"
    >
      <!-- destory inline -->
    </micro-app>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
@Options({
  components: {}
})
export default class extends Vue {
  baseData = { data: '123' }
  mounted() { }
  updated() { }
  destroyed() { }
}
</script>
<style lang="less" scoped>
</style>
