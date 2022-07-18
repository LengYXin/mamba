<template>
  <div class="home">
    <a-button type="primary" @click="onShowModal('vuejs2')">vuejs2</a-button>
    <a-modal :visible="visible" @cancel="onCancel" width="1200px">
      <div>哈哈哈哈</div>
    </a-modal>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import lodash from 'lodash';

@Options({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  get app() {
    return lodash.get(this.$route.query, 'app')
  }
  get visible() {
    return !!this.app
  }
  onShowModal(app) {
    this.$router.replace({ query: { app } })
  }
  onCancel() {
    this.$router.replace({ query: { app: '' } })
  }
}
</script>
