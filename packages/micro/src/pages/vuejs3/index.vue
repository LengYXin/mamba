<template>
  <div>
    <a-button type="primary" @click="onSendData()">发送数据</a-button>
    <div>{{ appData }}</div>
    <a-spin :spinning="spinning">
      <micro-app
        name="vue3"
        :url="MicroApp.Vue3"
        :baseurl="'/' + String($route.name)"
        :data="baseData"
        @created="onCreated"
        @beforemount="onBeforemount"
        @mounted="onMounted"
        @unmount="onUnmount"
        @error="onError"
        @datachange="onDataChange"
      >
        <!-- destory inline -->
      </micro-app>
    </a-spin>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-property-decorator";
import { notification } from "ant-design-vue";
@Options({
  components: {}
})
export default class extends Vue {
  spinning = true;
  appData = {}
  baseData = { data: '数据' }
  onSendData() {
    this.baseData = { data: `数据${Date.now()}` }
  }
  onDataChange(event) {
    this.appData = event.detail.data
    notification.destroy()
    notification.success({ message: JSON.stringify(event.detail.data, null, 4) })
  }
  onCreated(event) {
    console.log("LENG ~ onCreated", event)
  }
  onBeforemount(event) {
    console.log("LENG ~ onBeforemount", event)
  }
  onMounted(event) {
    console.log("LENG ~ onMounted", event)
    this.spinning = false
  }
  onUnmount(event) {
    console.log("LENG ~ onUnmount", event)
  }
  onError(event) {
    console.log("LENG ~ onError", event)
  }
  mounted() { }
  updated() { }
  destroyed() { }
}
</script>
<style lang="less" scoped>
</style>
