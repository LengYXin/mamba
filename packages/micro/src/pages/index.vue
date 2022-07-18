<template>
  <div>
    <a-button type="primary" @click="onShowModal('vuejs2')">vuejs2</a-button>
    <a-divider type="vertical" />
    <a-button type="primary" @click="onShowModal('vuejs3')">vuejs3</a-button>
    <a-divider type="vertical" />
    <a-button type="primary" @click="onShowModal('reactjs')">reactjs</a-button>
    <a-modal :visible="visible" @cancel="onCancel" width="1200px">
      <div slot="title" v-text="app"></div>
      <div>
        <component :is="app"></component>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import lodash from 'lodash';
import vuejs2 from './vuejs2/index.vue';
import vuejs3 from './vuejs3/index.vue';
import reactjs from './reactjs/index.vue';

@Options({
  components: {
    vuejs2,
    vuejs3,
    reactjs
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
  onSendData() {

  }
}
</script>
