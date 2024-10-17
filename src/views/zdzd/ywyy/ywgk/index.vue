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
      height="100%"
      show-overflow-tooltip
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
      width="800px"
      :close-on-click-modal="false"
    >
      <VForm
        ref="form2"
        v-model="formData2"
        :field-list="fieldListIn"
        label-width="100px"
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
      tableData: [],
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
          label: '管控ID',
          prop: 'title'
        },
        {
          label: '管控内容',
          prop: 'gknr',
          renderCell: ({ row }) => {
            return (
              <div>
                <el-button type='text' nativeOnClick={this.gknrClick.bind(this, row)}>
                  {row.gknr}
                </el-button>
              </div>
            );
          }
        },
        {
          label: '管控原因',
          prop: 'status'
        },
        {
          label: '应用类型',
          prop: 'createTime'
        },
        {
          label: '归属案件',
          prop: 'finishTime'
        },
        {
          label: '案件类型',
          prop: 'createUserDeptName'
        },
        {
          label: '所属任务',
          prop: 'createUserName'
        },
        {
          label: '管控时间',
          prop: 'createTime'
        },
        {
          label: '状态',
          prop: 'createTime'
        },
        {
          label: '审批用户',
          prop: 'createTime'
        },
        {
          label: '管控结果反馈意见',
          prop: 'createTime'
        },
        {
          type: 'operation',
          label: '操作',
          width: 200,
          btns: [
            // {
            //   key: 'sp',
            //   icon: 'el-icon-edit-outline',
            //   type: 'text',
            //   label: '审批'
            // },
            // {
            //   key: 'edit',
            //   icon: 'el-icon-edit-outline',
            //   type: 'text',
            //   label: '修改'
            // },
            {
              key: 'delete',
              // icon: 'el-icon-delete',
              type: 'text',
              label: '归档',
              reDelText: '归档'
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
          type: 'select', // 类型
          label: '案件', // 标签
          model: 'dealMessageTypeCode', // 字段名
          props: {
            placeholder: '请选择', // 占位提示
            // labelKey: 'description',
            // valueKey: 'code',
            options: [
              { label: '案件1', value: 1 },
              { label: '案件2', value: 2 },
              { label: '案件3', value: 3 }
            ]
          },
          col: {
            span: 12
          } // 栅格
        },
        {
          type: 'select', // 类型
          label: '任务', // 标签
          model: 'dealMessageTypeCode', // 字段名
          props: {
            placeholder: '请选择', // 占位提示
            // labelKey: 'description',
            // valueKey: 'code',
            options: [
              { label: '案件1', value: 1 },
              { label: '案件2', value: 2 },
              { label: '案件3', value: 3 }
            ]
          },
          col: {
            span: 12
          } // 栅格
        },
        {
          type: 'select', // 类型
          label: '审批人', // 标签
          model: 'dealMessageTypeCode', // 字段名
          props: {
            placeholder: '请选择', // 占位提示
            // labelKey: 'description',
            // valueKey: 'code',
            options: [
              { label: '案件1', value: 1 },
              { label: '案件2', value: 2 },
              { label: '案件3', value: 3 }
            ]
          },
          col: {
            span: 12
          } // 栅格
        },
        {
          type: 'input', // 类型
          label: '手机号码', // 标签
          model: 'name', // 字段名
          props: {
            placeholder: '请输入' // 占位提示
            // disabled: this.dialogTitle === '编辑任务'
          },
          col: {
            span: 12
          },
          rules: [
            {
              // required: true
            }
          ]
        },
        {
          type: 'select', // 类型
          label: '应用类型', // 标签
          model: 'dealMessageTypeCode', // 字段名
          props: {
            placeholder: '请选择', // 占位提示
            // labelKey: 'description',
            // valueKey: 'code',
            options: [
              {
                label: '云视通',
                value: '云视通'
              },
              {
                label: '爱城市网',
                value: '爱城市网'
              }
            ]
          },
          col: {
            span: 12
          } // 栅格
        },
        {
          type: 'select', // 类型
          label: '管控参数', // 标签
          model: 'dealMessageTypeCode', // 字段名
          props: {
            placeholder: '请选择', // 占位提示
            // labelKey: 'description',
            // valueKey: 'code',
            options: [
              // {
              //   label: '云视通',
              //   value: '云视通'
              // },
              // {
              //   label: '爱城市网',
              //   value: '爱城市网'
              // }
            ]
          },
          col: {
            span: 12
          } // 栅格
        },
        {
          type: 'select', // 类型
          label: '动作类型', // 标签
          model: 'dealMessageTypeCode', // 字段名
          props: {
            placeholder: '请选择', // 占位提示
            // labelKey: 'description',
            // valueKey: 'code',
            options: [
              {
                label: '账号冻结',
                value: '账号冻结'
              },
              {
                label: '信息删除',
                value: '信息删除'
              },
              {
                label: '屏蔽过滤',
                value: '屏蔽过滤'
              }
            ]
          },
          col: {
            span: 12
          } // 栅格
        },
        {
          label: '管控内容',
          model: 'applicationReason',
          type: 'textarea',
          props: {
            clearable: false
          }
        },
        {
          label: '管控事由',
          model: 'applicationReason',
          type: 'textarea',
          props: {
            clearable: false
          }
        },

        {
          type: 'datetimerange', // 类型
          label: '起止时间', // 标签
          model: 'TimeRanges', // 字段名
          defaultValue: [`${getTodayDate()} 00:00:00`, `${getTodayDate()} 23:59:59`],
          props: {
            placeholder: '请选择' // 占位提示
          }
          // 栅格
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
          type: 'input', // 类型
          label: '管控内容', // 标签
          model: 'messageId', // 字段名
          props: {
            placeholder: '请输入' // 占位提示
            // maxlength: 30 // 最大长度
          },
          col // 栅格
        },
        {
          type: 'select', // 类型
          label: '应用类型', // 标签
          model: 'dealMessageTypeCode', // 字段名
          props: {
            placeholder: '请选择', // 占位提示
            // labelKey: 'description',
            // valueKey: 'code',
            options: this.subtypeOptions
          },
          col // 栅格
        },
        {
          type: 'select', // 类型
          label: '所属案件', // 标签
          model: 'dealMessageTypeCode', // 字段名
          props: {
            placeholder: '请选择', // 占位提示
            // labelKey: 'description',
            // valueKey: 'code',
            options: this.subtypeOptions
          },
          col // 栅格
        },
        {
          type: 'select', // 类型
          label: '管控状态', // 标签
          model: 'dealMessageTypeCode', // 字段名
          props: {
            placeholder: '请选择', // 占位提示
            // labelKey: 'description',
            // valueKey: 'code',
            options: [
              { value: '0', label: '未归档' },
              { value: '1', label: '已归档' }
              // {value: '2', label: '已忽略'},
              // {value: '3', label: '已撤销'}
            ]
          },
          col // 栅格
        }
      ];
    }
  },
  mounted() {
    this.getTableData();
  },

  created() {},

  methods: {
    gknrClick(row) {
      this.$alert(row.gknr, '管控内容', {
        confirmButtonText: '确定'
        // callback: action => {
        //   this.$message({
        //     type: 'info',
        //     message: `action: ${ action }`
        //   });
        // }
      });
    },
    getTableData() {
      this.tableData = [{ gknr: '48461516431534663gyuguhkb' }, { gknr: 22 }];
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
      this.$message({
        type: 'success',
        message: '添加管控成功！'
      });
      this.getTableData();
    },
    addTask() {
      this.dialogTitle = '添加管控';
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
