<template>
  <Layout />
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import lodash from 'lodash';
import Layout from './layouts/default.vue';
@Options({
  components: { Layout }
})
export default class extends Vue {
  mounted() {
  }
  updated() { }
  destroyed() { }
}
</script>
<style lang="less" scoped>
</style>
