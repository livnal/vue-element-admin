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
import { getTodayDate } from '@/utils/time';
import VForm from '@/components/VForm/index.vue';
import VTable from '@/components/VTable/index.vue';
import VPagination from '@/components/VPagination/index.vue';

export default {
  components: { VForm, VTable, VPagination }, //, FullPage
  data() {
    return {
      title: '查询历史',
      dialogVisible: false,
      formData: null,
      tableData: [{}, {}],
      loading: false,
      colConfigs: [
        {
          label: '查询内容',
          prop: 'title'
        },
        {
          label: '查询备注',
          prop: 'createUserDeptName'
        },
        {
          label: '应用类型',
          prop: 'createUserName'
        },
        {
          label: '归属案件',
          prop: 'createTime'
        },
        {
          label: '创建时间',
          prop: 'createTime'
        },
        {
          label: '状态',
          prop: 'createTime'
        },
        {
          label: '结果',
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
        span: 5
      };
      return [
        {
          type: 'input', // 类型
          label: '查询内容', // 标签
          model: 'name', // 字段名
          props: {
            placeholder: '请输入' // 占位提示
            // disabled: true
          },
          col // 栅格
        },
        {
          type: 'input', // 类型
          label: '查询备注', // 标签
          model: 'name', // 字段名
          props: {
            placeholder: '请输入' // 占位提示
            // disabled: true
          },
          col // 栅格
        },

        {
          type: 'select', // 类型
          label: '查询状态', // 标签
          model: 'dealMessageTypeCode', // 字段名
          props: {
            placeholder: '请选择', // 占位提示
            options: [
              { label: '成功', value: 1 },
              { label: '失败', value: 2 }
            ]
          },
          col // 栅格
        },
        {
          type: 'select', // 类型
          label: '应用类型', // 标签
          model: 'dealMessageTypeCode', // 字段名
          props: {
            placeholder: '请选择', // 占位提示
            options: [{ label: '云视通', value: 1 }]
          },
          col // 栅格
        },
        {
          type: 'datetimerange', // 类型
          label: '时间范围', // 标签
          model: 'TimeRanges', // 字段名
          defaultValue: [`${getTodayDate()} 00:00:00`, `${getTodayDate()} 23:59:59`],
          props: {
            placeholder: '请选择' // 占位提示
          },
          col: {
            span: 10
          } // 栅格
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
