<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :title="title"
    width="80%"
    append-to-body
    :close-on-click-modal="false"
  >
    <div class="full_page">
      <VForm
        ref="form"
        v-model="formData"
        class="full_page_header"
        :field-list="fieldList"
        label-width="90px"
      >
        <div class="btn">
          <el-button type="primary" icon="el-icon-search" @click="searchClick">
            查询
          </el-button>
        </div>
      </VForm>
      <VTable
        v-loading="loading"
        class="v-table"
        border
        stripe
        size="large"
        height="400px"
        :col-configs="colConfigs"
        :data="tableData"
      />
      <VPagination
        class="vgrid-pagination"
        :page="page"
        @currentChange="handleCurrentChange"
        @sizeChange="handleSizeChange"
      />
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import VForm from '@/components/VForm/index.vue';
import VTable from '@/components/VTable/index.vue';
import VPagination from '@/components/VPagination/index.vue';

export default {
  components: { VForm, VTable, VPagination }, //, FullPage
  data() {
    return {
      title: '布控结果',
      dialogVisible: false,
      formData: null,
      tableData: [{}, {}],
      loading: false,
      colConfigs: [
        {
          label: '用户账号',
          prop: 'title'
        },
        {
          label: '用户ID',
          prop: 'createUserDeptName'
        },
        {
          label: '终端类型',
          prop: 'createUserName'
        },
        {
          label: '终端型号',
          prop: 'createTime'
        },
        {
          label: '动作类型',
          prop: 'createTime'
        },
        {
          label: '动作时间',
          prop: 'createTime'
        },
        {
          label: 'IP地址',
          prop: 'createTime'
        },
        {
          label: '登录平台',
          prop: 'createTime'
        },
        {
          label: '操作系统类型',
          prop: 'createTime'
        },
        {
          label: '操作系统版本',
          prop: 'createUserName'
        },
        {
          label: '端口号',
          prop: 'createTime'
        },
        {
          label: 'MAC地址',
          prop: 'createTime'
        },
        {
          label: 'IMEI',
          prop: 'createTime'
        },
        {
          label: 'IMSI',
          prop: 'createTime'
        },
        {
          label: '经度',
          prop: 'createTime'
        },
        {
          label: '纬度',
          prop: 'createTime'
        },
        {
          label: '手机基站号',
          prop: 'createTime'
        },
        {
          label: '基站地址',
          prop: 'createTime'
        },
        {
          label: '硬件特征串',
          prop: 'createTime'
        },
        {
          label: '所在地行政区划',
          prop: 'createTime'
        },
        {
          label: 'IPv6',
          prop: 'createTime'
        },
        {
          label: 'IPv6端口',
          prop: 'createTime'
        },
        {
          label: '手机号',
          prop: 'createTime'
        }
      ],
      page: {
        curPage: 1, // 当前页
        size: 15, // 每页size
        total: 0 // 总数据
      },
      tableRowData: {}
    };
  },
  computed: {
    fieldList() {
      const col = {
        span: 7
      };
      return [
        {
          type: 'select', // 类型
          label: '数据类型', // 标签
          model: 'dealMessageTypeCode', // 字段名
          props: {
            placeholder: '请选择', // 占位提示
            options: [
              { label: '登录日志信息', value: 1 },
              { label: '下载信息', value: 2 }
            ]
          },
          col // 栅格
        },
        {
          type: 'select', // 类型
          label: '应用', // 标签
          model: 'dealMessageTypeCode', // 字段名
          props: {
            placeholder: '请选择', // 占位提示
            options: [{ label: '云视通', value: 1 }]
          },
          col // 栅格
        }
      ];
    }
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    show(data) {
      this.tableRowData = data;
      this.dialogVisible = true;
    },
    getTableData() {
      this.tableData = [{}, {}];
      this.page.total = this.tableData.length;
      // const params = {
      //   ...this.formData,
      //   pageNum: this.page.page,
      //   pageSize: this.page.size
      // };
      // this.$api.logAndAudit.findMessageList(params).then(({ data }) => {
      //   this.tableData = data.list;
      //   this.page.total = data.total;
      // });
    },
    // 重置
    clearClick() {
      this.$refs.form && this.$refs.form.resetFields();
    },
    // 切换分页
    handlePageChange(page) {
      this.pageNum = page;
      this.getTableData();
    },
    // 切换每页条数
    handlePageSizeChange(size) {
      this.pageSize = size;
      this.getTableData();
    },
    /**
     * 查询点击方法
     */
    searchClick() {
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.page.page = val;
      this.getTableData();
    },
    handleSizeChange(val) {
      this.page.size = val[0];
      this.getTableData();
    }
  }
};
</script>
<style lang="scss" scoped>
.full_page {
  display: flex;
  flex-direction: column;
  /* height: calc(100vh - 84px); */
  /* padding: 10px 20px; */
  overflow: auto;
}
::v-deep .v-table {
  flex: 1;
  .el-table {
    height: 100%;
  }
}
.vgrid-pagination {
  margin-top: 10px;
}
.btn {
  display: flex;
  padding-left: 10px;
  /* justify-content: flex-end; */
}
</style>
