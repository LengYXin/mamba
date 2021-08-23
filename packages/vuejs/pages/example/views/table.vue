<template>
  <page-table :PageController="PageController" :columns="columns">
    <template #action="{ record }">
      <span>
        <a-button size="small" type="link" @click="__ToDetails(record.key, true)">详情</a-button>
        <a-button size="small" type="link" @click="__ToDetails(record.key)">编辑</a-button>
        <a-popconfirm
          title="确定删除这条数据?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="PageController.onDelete(record)"
        >
          <a-button size="small" type="link">删除</a-button>
        </a-popconfirm>
      </span>
    </template>
  </page-table>
</template>

<script lang="ts">
import { BasesController } from "@mamba/clients";
import lodash from "lodash";
import { Component, Inject, Vue } from "vue-property-decorator";
import { EnumLocaleLabel } from "../locales";
@Component({
  components: {},
})
export default class PageView extends Vue {
  @Inject()
  PageController: BasesController;
  get columns() {
    return [
      {
        title: EnumLocaleLabel.Name,
        dataIndex: "name",
      },
      {
        title: EnumLocaleLabel.Avatar,
        dataIndex: "avatar",
      },
      {
        title: EnumLocaleLabel.Gender,
        dataIndex: "gender",
      },
      {
        title: EnumLocaleLabel.Birthday,
        dataIndex: "birthday",
      },
      {
        title: EnumLocaleLabel.Age,
        dataIndex: "age",
      },
      {
        title: EnumLocaleLabel.Introduce,
        dataIndex: "introduce",
      },
      {
        title: EnumLocaleLabel.CreateDate,
        dataIndex: "createDate",
      },
      {
        title: "操作",
        key: "operation",
        fixed: "right",
        width: 200,
        scopedSlots: { customRender: "action" },
      },
    ];
  }
  created() { }
  mounted() { }
  updated() { }
  destroyed() { }
}
</script>
<style lang="less">
</style>

