<template>
  <div class="full_page">
    <VForm
      ref="form"
      v-model="formData"
      class="full_page_header"
      :field-list="fieldList"
      label-width="90px"
    >
      <div class="btn">
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="searchClick"
        >查询</el-button>
        <el-button type="info" @click="clearClick">重置</el-button>
        <!-- <el-button type="primary">导出</el-button> -->
      </div>
    </VForm>
    <VTable
      v-loading="loading"
      class="v-table"
      border
      stripe
      size="large"
      height="100%"
      :col-configs="colConfigs"
      :data="tableData"
      @handleBtnClick="handleBtnClick"
      @row-click="rowClick"
    />
    <VPagination
      class="vgrid-pagination"
      :page="page"
      @currentChange="handleCurrentChange"
      @sizeChange="handleSizeChange"
    />
  </div>
</template>

<script>
import VForm from '@/components/VForm/index.vue';
import VTable from '@/components/VTable/index.vue';
import VPagination from '@/components/VPagination/index.vue';
import { getTodayDate } from '@/utils/time';
// import FullPage from '@/components/FullPage/index.vue';

export default {
  components: { VForm, VTable, VPagination }, //, FullPage

  data() {
    return {
      formData: null,
      tableData: [{}, {}],
      loading: false,
      colConfigs: [
        {
          label: '业务',
          prop: 'title'
        },
        {
          label: '部门',
          prop: 'createUserDeptName'
        },
        {
          label: '用户',
          prop: 'createUserName'
        },
        {
          label: '发布时间',
          prop: 'createTime'
        },
        {
          type: 'operation',
          label: '操作',
          width: 200,
          btns: [
            {
              key: 'edit',
              icon: 'el-icon-edit-outline',
              type: 'text',
              label: '修改'
            },
            {
              key: 'delete',
              icon: 'el-icon-delete',
              type: 'text',
              label: '删除'
            }
          ]
        }
      ],
      page: {
        curPage: 1, // 当前页
        size: 15, // 每页size
        total: 0 // 总数据
      }
    };
  },
  computed: {
    fieldList() {
      const col = {
        span: 7
      };
      return [
        {
          type: 'datetimerange', // 类型
          label: '时间范围', // 标签
          model: 'TimeRanges', // 字段名
          defaultValue: [`${getTodayDate()} 00:00:00`, `${getTodayDate()} 23:59:59`],
          props: {
            placeholder: '请选择' // 占位提示
          },
          col // 栅格
        },
        {
          type: 'select', // 类型
          label: '消息子类型', // 标签
          model: 'dealMessageTypeCode', // 字段名
          props: {
            placeholder: '请选择', // 占位提示
            labelKey: 'description',
            valueKey: 'code',
            options: this.subtypeOptions
          },
          col // 栅格
        },

        // {
        //   type: 'switch', // 类型
        //   label: '异常确认',
        //   model: 'as',
        //   col: {
        //     span: 3
        //   }
        // },
        {
          type: 'input', // 类型
          label: '消息标识', // 标签
          model: 'messageId', // 字段名
          props: {
            placeholder: '请输入' // 占位提示
            // maxlength: 30 // 最大长度
          },
          col // 栅格
        }
        // {
        //   type: 'select', // 类型
        //   label: '消息主类型', // 标签
        //   model: 'dealMessageCategoryCode', // 字段名
        //   props: {
        //     placeholder: '请选择', // 占位提示
        //     labelKey: 'description',
        //     valueKey: 'code',
        //     options: this.mainTypeOptions.map(i => {
        //       return { ...i, description: `${i.description}(${i.code})` };
        //     })
        //   },
        //   on: {
        //     change: val => {
        //       if (val) {
        //         const selectObj = this.mainTypeOptions.find(item => item.code === val);
        //         this.$api.logAndAudit.findMessageCategoryById({ id: selectObj.id }).then(({ data }) => {
        //           // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        //           this.subtypeOptions = data.map(i => {
        //             return { ...i, description: `${i.description}(${i.code})` };
        //           });
        //         });
        //       } else {
        //         // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        //         this.subtypeOptions = [];
        //       }
        //     }
        //   },
        //   col // 栅格
        // },
      ];
    }
  },
  mounted() {
    this.getTableData();
  },

  created() {},

  methods: {
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
    },
    handleBtnClick(key, row) {
      this.currentData = row;
      const handlers = {
        // 消息追踪
        msgTracing: () => {
          // this.$refs.msgTracingDialog.show(row); //打开操作弹出框
        }
      };
      handlers[key]();
    },
    // 行点击
    rowClick(row) {
      console.log('rowClick', row);
    }
  }
};
</script>

<style lang="scss" scoped>
.full_page {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 84px);
  padding: 10px 20px;
  overflow: auto;
  .full_page_header {
    /* border-bottom: 1px solid #ebeef5; */
  }
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
