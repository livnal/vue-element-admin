<template>
  <div class="app-container">
    <span class="title">一键搜</span>

    <el-input
      v-model="searchVal"
      style="width: 50%"
      clearable
      size="large"
      placeholder="输入搜索"
      class="custom-input"
    >
      <template #append>
        <el-button
          slot="append"
          type="primary"
          icon="el-icon-search"
          circle
          size="large"
          @click="searchClick"
        >搜一下</el-button>
      </template>
    </el-input>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-weight: bold; font-size: 16px; color: #606266">搜索历史</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="toMore"
        >更多</el-button>
      </div>
      <VTable
        class="v-table"
        border
        stripe
        size="small"
        height="400px"
        :col-configs="colConfigs"
        :data="tableData"
      />
      <!-- @handleBtnClick="handleBtnClick" -->
    </el-card>
    <searchLsDialog ref="searchLsRef" />
  </div>
</template>
<script>
import VTable from '@/components/VTable/index.vue';
import searchLsDialog from './searchLsDialog.vue';

export default {
  components: {
    VTable,
    searchLsDialog
  },
  data() {
    return {
      searchVal: '',
      tableData: [{}, {}],
      colConfigs: [
        // {
        //   label: '序号',
        //   type: 'index',
        //   width: 80
        // },
        {
          label: '查询参数',
          prop: 'name'
        },
        {
          label: '查询备注',
          prop: 'age'
        },
        {
          label: '查询状态',
          prop: 'gender'
        },
        {
          label: '归属案件',
          prop: 'gender'
        },
        {
          label: '创建时间',
          prop: 'gender'
        }
        // {
        //   label: '操作',
        //   prop: 'action'
        // }
      ]
    };
  },
  methods: {
    searchClick() {
      // 跳转结果页
      if (this.searchVal) {
        this.$emit('searchClickYJS', this.searchVal);
      }
    },
    toMore() {
      this.$refs.searchLsRef.show();
    }
  }
};
</script>
<style scoped lang="scss">
.app-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}
.box-card {
  width: 50%;
  margin-top: 10px;
}
</style>
