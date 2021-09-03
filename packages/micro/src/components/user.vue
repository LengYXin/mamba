<template>
  <div class="user">
    <a-space>
      <a-avatar>U</a-avatar>
      {{ System.User.value }}
      <span v-if="System.LoginIn" @click="System.onLoginOut()">你好</span>
      <span v-else @click="onShowModal">请登录</span>
    </a-space>
    <a-modal :visible="visible" @cancel="onCancel" width="1200px">
      <a-spin :spinning="spinning">
        <micro-app
          name="reactjs"
          :url="MicroApp.React"
          :data="{ System }"
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
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Options, Vue, Inject } from "vue-property-decorator";
import lodash from "lodash";
import { SystemController } from "@mamba/clients";
import { notification } from "ant-design-vue";
import { reaction, autorun, trace } from "mobx";
@Options({
  components: {},
})
export default class Home extends Vue {
  @Inject()
  System: SystemController//=new SystemController();
  spinning = true;
  appData = {};
  get visible() {
    return !!lodash.get(this.$route.query, "login");
  }
  onShowModal() {
    this.$router.replace({ query: { login: "true" }, hash: "#/login" });
  }
  onCancel() {
    this.$router.replace({ query: { login: "" } });
  }
  onDataChange(event) {
    this.appData = event.detail.data;
    notification.destroy();
    notification.success({
      message: JSON.stringify(event.detail.data, null, 4),
    });
  }
  onCreated(event) {
    console.log("LENG ~ onCreated", event);
  }
  onBeforemount(event) {
    console.log("LENG ~ onBeforemount", event);
  }
  onMounted(event) {
    console.log("LENG ~ onMounted", event);
    this.spinning = false;
  }
  onUnmount(event) {
    console.log("LENG ~ onUnmount", event);
  }
  onError(event) {
    console.log("LENG ~ onError", event);
  }
  created() { }
  mounted() {
    // autorun(() => {
    //   console.warn(
    //     "🚀 ~ file: user.vue ~ line 81 ~ Home ~ created ~ this.System.LoginIn",
    //     this.System.LoginIn
    //   );
    //   trace()
    // });
    // reaction(
    //   () => this.System.LoginIn,
    //   () => {
    //     console.log(
    //       "🚀 ~ file: user.vue ~ line 81 ~ Home ~ created ~ this.System.LoginIn",
    //       this.System.LoginIn
    //     );
    //     this.$forceUpdate();
    //   }
    // );
    // reaction(
    //   () => this.System.User.value,
    //   () => {
    //     console.log(
    //       "🚀 ~ file: user.vue ~ line 81 ~ Home ~ created ~ this.System.LoginIn",
    //       this.System
    //     );
    //     this.$forceUpdate();
    //   }
    // );
  }
}
</script>
