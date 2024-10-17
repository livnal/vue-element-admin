<template>
  <div class="">
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
        <!-- <el-button type="info" @click="clearClick">重置</el-button> -->
        <el-button @click="addTask">新增</el-button>
      </div>
    </VForm>
    <VTable
      v-loading="loading"
      class="v-table"
      border
      stripe
      size="large"
      height="450px"
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
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="500px"
      :close-on-click-modal="false"
    >
      <VForm
        ref="form2"
        v-model="formData2"
        :field-list="fieldListIn"
        label-width="auto"
      />
      <span slot="footer" class="dialog-footer">
        <!-- <el-button type="danger" @click="handleConfirm(2)">驳回</el-button>
      <el-button type="primary" @click="handleConfirm(1)">通过</el-button> -->
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm()">保存</el-button>
      </span>
    </el-dialog>
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
      dialogTitle: '创建任务',
      dialogVisible: false,
      formData: null,
      formData2: null,
      tableData: [{ name: 12 }, { name: 22 }],
      loading: false,
      userOption: [{ label: 1, value: 2 }],
      subtypeOptions: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '审批通过',
          value: '1'
        },
        {
          label: '审批驳回',
          value: '2'
        },
        {
          label: '审批中',
          value: '3'
        }
      ],
      colConfigs: [
        {
          label: '任务名称',
          prop: 'title'
        },
        {
          label: '网络技术措施种类',
          prop: 'subtype'
        },
        {
          label: '创建时间',
          prop: 'status'
        },
        {
          label: '截止日期',
          prop: 'createTime'
        },
        {
          label: '任务状态',
          prop: 'finishTime'
        },
        {
          label: '查询数',
          prop: 'createUserDeptName'
        },
        {
          label: '布控数',
          prop: 'createUserName'
        },
        {
          label: '负责人',
          prop: 'createTime'
        },
        {
          label: '备注',
          prop: 'createTime'
        },
        {
          type: 'operation',
          label: '操作',
          width: 200,
          btns: [
            {
              key: 'sp',
              icon: 'el-icon-edit-outline',
              type: 'text',
              label: '审批'
            },
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
    fieldListIn() {
      return [
        {
          type: 'input', // 类型
          label: '任务名称', // 标签
          model: 'name', // 字段名
          props: {
            placeholder: '请输入', // 占位提示
            disabled: this.dialogTitle === '编辑任务'
          },
          col: {
            // span: 7
          },
          rules: [
            {
              required: true
            }
          ]
        },
        {
          type: 'select', // 类型
          label: '审批用户', // 标签
          model: 'dealMessageTypeCode', // 字段名
          props: {
            placeholder: '默认同级或上级机构的任一审批角色', // 占位提示
            // labelKey: 'description',
            // valueKey: 'code',
            options: this.userOption
          },
          col: {
            // span: 7
          }, // 栅格
          visible: () => this.dialogTitle === '创建任务'
        },

        {
          label: '结束时间',
          model: 'applicationDate',
          type: 'datetime',
          // defaultValue: () => {
          //   return dayjs().format('YYYY-MM-DD');
          // },
          props: {
            // clearable: false
            disabled: this.dialogTitle === '编辑任务'
          },
          col: {
            // span: 8
          }
        },
        {
          label: '任务备注',
          model: 'applicationReason',
          type: 'textarea',
          // disabled: () => {
          //   return this.type == 'look';
          // },
          props: {
            clearable: false
          },
          rules: [
            {
              required: false
            }
          ]
        }
      ];
    },
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
          label: '任务状态', // 标签
          model: 'dealMessageTypeCode', // 字段名
          props: {
            placeholder: '请选择', // 占位提示
            // labelKey: 'description',
            // valueKey: 'code',
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
          label: '任务名称', // 标签
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
    clearForm2() {
      this.$refs.form2 && this.$refs.form2.resetFields();
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
    // 操作列功能
    handleBtnClick(key, row) {
      this.currentData = row;
      const handlers = {
        edit: () => {
          // 打开操作弹出框
          this.dialogTitle = '编辑任务';
          this.clearForm2();
          this.formData2 = row;
          this.dialogVisible = true;
        },
        delete: () => {
          // 删除
          this.$message({
            type: 'success',
            message: '删除成功！'
          });
        },
        sp: () => {
          // 审批
          this.$prompt('审批意见', '审批', {
            confirmButtonText: '通过',
            cancelButtonText: '驳回',
            distinguishCancelAndClose: true
          })
            .then(({ value }) => {
              this.$message({
                type: 'success',
                message: '已审批！'
              });
            })
            .catch((action) => {
              this.$message({
                type: 'info',
                message: action === 'cancel' ? '已驳回！' : '已取消审批！'
              });
            });
        }
      };
      handlers[key]();
    },
    // 行点击
    rowClick(row) {
      console.log('rowClick', row);
    },
    // 编辑弹窗保存
    handleConfirm(type) {
      this.$refs.form.submit().then((model) => {
        this.submit(model, type);
      });
    },
    async submit(params) {
      // await
      this.dialogVisible = false;
      this.getTableData();
    },
    addTask() {
      this.dialogTitle = '创建任务';
      this.clearForm2();
      this.formData2 = {};
      this.dialogVisible = true;
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
