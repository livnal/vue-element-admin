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
        <el-button @click="addBk">新增</el-button>
      </div>
    </VForm>
    <VTable
      v-loading="loading"
      class="v-table"
      border
      stripe
      size="large"
      height="600px"
      :col-configs="colConfigs"
      :data="tableData"
      @handleBtnClick="handleBtnClick"
    />
    <VPagination
      class="vgrid-pagination"
      :page="page"
      @currentChange="handleCurrentChange"
      @sizeChange="handleSizeChange"
    />
    <!-- 线索 -->
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
    <!-- 新增布控 -->
    <el-dialog
      title="新增布控"
      :visible.sync="addDialogVisible"
      width="850px"
      :close-on-click-modal="false"
    >
      <VForm
        ref="formBk"
        v-model="formDatBk"
        :field-list="fieldListBk"
        label-width="80px"
      />
      <span slot="footer" class="dialog-footer">
        <!-- <el-button type="danger" @click="handleConfirm(2)">驳回</el-button>
      <el-button type="primary" @click="handleConfirm(1)">通过</el-button> -->
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirmBk()">保存</el-button>
      </span>
    </el-dialog>
    <BkJgDialog ref="bkjgRef" />
  </div>
</template>

<script>
import VForm from '@/components/VForm/index.vue';
import VTable from '@/components/VTable/index.vue';
import VPagination from '@/components/VPagination/index.vue';
import { getTodayDate } from '@/utils/time';
// import FullPage from '@/components/FullPage/index.vue';
import BkJgDialog from './BkJgDialog.vue';

export default {
  components: { VForm, VTable, VPagination, BkJgDialog }, //, FullPage
  prop: {
    // 左侧选中数据
    activeLeft: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dialogTitle: '线索',
      dialogVisible: false,
      addDialogVisible: false,
      formDatBk: null,
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
          label: '布控内容',
          prop: 'title'
        },
        // {
        //   label: '应用类型',
        //   prop: 'title'
        // },
        // {
        //   label: '用户ID',
        //   prop: 'title'
        // },
        {
          label: '布控资源',
          prop: 'title'
        },
        {
          label: '布控用户',
          prop: 'subtype'
        },
        {
          label: '案件名称',
          prop: 'status'
        },
        {
          label: '布控时间',
          prop: 'createTime'
        },
        {
          label: '审批用户',
          prop: 'finishTime'
        },
        {
          label: '任务名称',
          prop: 'createUserDeptName'
        },
        {
          label: '布控状态',
          prop: 'createUserName'
        },
        {
          label: '布控结果',
          prop: 'createTime',
          renderCell: ({ row }) => {
            return (
              <div>
                <el-button type='text' nativeOnClick={this.bkjgClick.bind(this, row)}>
                  {row.jg}
                </el-button>
              </div>
            );
          }
        },
        {
          label: '线索信息',
          prop: 'createTime'
        },
        {
          type: 'operation',
          label: '操作',
          width: 200,
          btns: [
            {
              key: 'bk',
              // icon: 'el-icon-edit-outline',
              type: 'text',
              label: '布控'
              // visible: () => false
            },
            // 布控结果有值则展示
            {
              key: 'export',
              // icon: 'el-icon-delete',
              type: 'text',
              label: '导出',
              visible: (row) => Number(row.jg) > 0
            },
            {
              key: 'xs',
              // icon: 'el-icon-delete',
              type: 'text',
              label: '线索'
              // visible: (row) => Number(row.jg) > 0
            },
            {
              key: 'delete',
              // icon: 'el-icon-edit-outline',
              type: 'text',
              label: '撤销',
              reDelText: '撤销'
              // visible: () => false
            }
          ]
        }
      ],
      page: {
        curPage: 1, // 当前页
        size: 15, // 每页size
        total: 0 // 总数据
      },
      fieldListIn: [
        {
          type: 'input', // 类型
          label: '布控内容', // 标签
          model: 'name', // 字段名
          props: {
            placeholder: '请输入', // 占位提示
            disabled: true
          }
        },
        {
          type: 'input', // 类型
          label: '最近一次修改人', // 标签
          model: 'name', // 字段名
          props: {
            placeholder: '请输入', // 占位提示
            disabled: true
          }
        },
        {
          type: 'input', // 类型
          label: '最近一次修改时间', // 标签
          model: 'name', // 字段名
          props: {
            placeholder: '请输入', // 占位提示
            disabled: true
          }
        },
        {
          label: '线索信息',
          model: 'applicationReason',
          type: 'textarea',
          // disabled: () => {
          //   return this.type == 'look';
          // },
          props: {
            // clearable: false
          },
          rules: [
            {
              required: false
            }
          ]
        }
      ],
      fieldListBk: [
        {
          type: 'select', // 类型
          label: '案件', // 标签
          model: 'aj', // 字段名
          props: {
            placeholder: '请选择', // 占位提示
            // labelKey: 'description',
            // valueKey: 'code',
            options: this.ajOption
          },
          col: {
            span: 11
          } // 栅格
        },
        {
          type: 'select', // 类型
          label: '任务', // 标签
          model: 'rw', // 字段名
          props: {
            placeholder: '请选择', // 占位提示
            // labelKey: 'description',
            // valueKey: 'code',
            options: this.rwOption
          },
          col: {
            span: 11
          } // 栅格
        },
        {
          label: '截止时间',
          model: 'endTime',
          type: 'datetime',
          // defaultValue: () => {
          //   return dayjs().format('YYYY-MM-DD');
          // },
          props: {
            // clearable: false
            // disabled: this.dialogTitle !== '创建任务'
          },
          col: {
            span: 11
          }
        },
        {
          type: 'select', // 类型
          label: '审批人', // 标签
          model: 'dealMessageTypeCode', // 字段名
          props: {
            placeholder: '同级或上级审批员', // 占位提示
            // labelKey: 'description',
            // valueKey: 'code',
            options: this.userOption
          },
          col: {
            span: 11
          } // 栅格
        },
        {
          type: 'select', // 类型
          label: '应用大类', // 标签
          model: 'rw', // 字段名
          props: {
            placeholder: '请选择', // 占位提示
            options: [
              { label: '常见应用', value: 1 },
              { label: '通信辅助', value: 2 }
            ]
          },
          col: {
            span: 11
          } // 栅格
        },
        {
          type: 'select', // 类型
          label: '应用', // 标签
          model: 'yy', // 字段名
          props: {
            placeholder: '请选择', // 占位提示
            options: [{ label: '云视通', value: 1 }]
          },
          col: {
            span: 11
          } // 栅格
        },
        {
          type: 'select', // 类型
          label: '位置', // 标签
          model: 'wz', // 字段名
          props: {
            placeholder: '请选择', // 占位提示
            options: [
              { label: '属地', value: 1 },
              { label: '网站', value: 1 }
            ]
          },
          col: {
            span: 11
          } // 栅格
        },
        {
          type: 'checkbox', // 类型
          label: '资源', // 标签
          model: 'zy', // 字段名
          props: {
            placeholder: '请选择', // 占位提示
            options: [
              { label: '登录日志信息', value: 1 },
              { label: '下载信息', value: 2 }
            ]
          },

          col: {
            span: 24
          } // 栅格
        },
        {
          type: 'select', // 类型
          label: '布控参数', // 标签
          model: 'wz', // 字段名
          props: {
            placeholder: '请选择', // 占位提示
            options: [
              { label: '用户账号', value: 1 },
              { label: '手机号', value: 2 },
              { label: '设备号', value: 3 }
            ]
          },
          col: {
            span: 11
          } // 栅格
        },

        {
          label: '布控内容',
          model: 'applicationReason',
          type: 'textarea',
          // disabled: () => {
          //   return this.type == 'look';
          // },
          props: {
            // clearable: false
          },
          rules: [
            {
              required: false
            }
          ]
        },
        {
          label: '线索信息',
          model: 'applicationReason',
          type: 'textarea',
          // disabled: () => {
          //   return this.type == 'look';
          // },
          props: {
            // clearable: false
          },
          rules: [
            {
              required: false
            }
          ]
        }
      ],
      ajOption: [],
      rwOption: []
    };
  },
  computed: {
    fieldList() {
      const col = {
        span: 6
      };
      return [
        // {
        //   label: '展示内容',
        //   model: 'listType',
        //   type: 'radio',
        //   props: {
        //     labelKey: 'description',
        //     valueKey: 'code',
        //     options: [
        //       {
        //         code: '1',
        //         description: '我下发的'
        //       },
        //       {
        //         code: '2',
        //         description: '我参与的'
        //       },
        //       {
        //         code: '3',
        //         description: '所有可见'
        //       }
        //     ]
        //   },
        //   col // 栅格
        // },
        {
          type: 'select', // 类型
          label: '展示内容', // 标签
          model: 'listType', // 字段名
          defaultValue: '1',
          props: {
            placeholder: '请选择', // 占位提示
            labelKey: 'description',
            valueKey: 'code',
            options: [
              {
                code: '1',
                description: '我下发的'
              },
              {
                code: '2',
                description: '我参与的'
              },
              {
                code: '3',
                description: '所有可见'
              }
            ],
            clearable: false
          },
          col // 栅格
        },
        {
          type: 'input', // 类型
          label: '布控内容', // 标签
          model: 'messageId', // 字段名
          props: {
            placeholder: '请输入' // 占位提示
            // maxlength: 30 // 最大长度
          },
          col // 栅格
        },
        {
          type: 'input', // 类型
          label: '线索信息', // 标签
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
            options: [
              {
                value: '',
                label: '全部'
              },
              {
                value: '2',
                label: '云视通'
              }
            ]
          },
          col // 栅格
        },
        {
          type: 'select', // 类型
          label: '侦控状态', // 标签
          model: 'dealMessageTypeCode', // 字段名
          props: {
            placeholder: '请选择', // 占位提示
            options: [
              {
                value: '',
                label: '全部'
              },
              {
                value: '2',
                label: '在控'
              },
              {
                value: '3',
                label: '停控'
              },
              {
                value: '4',
                label: '额度超限未执行'
              },
              {
                value: '5',
                label: '即将到期'
              }
            ]
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
          col // 栅格
        },
        {
          type: 'select', // 类型
          label: '布控状态', // 标签
          model: 'dealMessageTypeCode', // 字段名
          props: {
            placeholder: '请选择', // 占位提示
            // labelKey: 'description',
            // valueKey: 'code',
            options: [
              {
                value: '',
                label: '全部'
              },
              {
                value: '1',
                label: '布控中'
              },
              {
                value: '2',
                label: '布控结束'
              }
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
    getTableData() {
      this.tableData = [{ jg: 10 }, { jg: 0 }];
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
    clearFormBk() {
      this.$refs.formBk && this.$refs.formBk.resetFields();
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
        xs: () => {
          // 打开操作弹出框
          this.dialogTitle = '线索';
          this.clearForm2();
          this.formData2 = row;
          this.dialogVisible = true;
        },
        delete: () => {
          // 撤销
          this.$message({
            type: 'success',
            message: '撤销成功！'
          });
        },
        bk: () => {
          // 布控----Todo:待确定布控条件及交互
          // //
          // this.clearFormBk();
          // this.formDatBk = {};
          // this.addDialogVisible = true;
          // this.$prompt('审批意见', '审批', {
          //   confirmButtonText: '通过',
          //   cancelButtonText: '驳回',
          //   distinguishCancelAndClose: true
          // })
          //   .then(({ value }) => {
          //     this.$message({
          //       type: 'success',
          //       message: '已审批！'
          //     });
          //   })
          //   .catch((action) => {
          //     this.$message({
          //       type: 'info',
          //       message: action === 'cancel' ? '已驳回！' : '已取消审批！'
          //     });
          //   });
        },
        export: () => {
          // 导出布控结果
          this.$message({
            type: 'success',
            message: '导出成功！'
          });
        }
      };
      handlers[key]();
    },
    // 行点击
    rowClick(row) {
      console.log('rowClick', row);
    },
    // 线索弹窗保存
    handleConfirm(type) {
      this.$refs.form2.submit().then((model) => {
        this.submit(model, type);
      });
    },
    async submit(params) {
      // await
      this.dialogVisible = false;
      this.getTableData();
    },
    // 布控保存
    handleConfirmBk() {
      this.$refs.formBk.submit().then((model) => {
        this.addDialogVisible = false;
        this.getTableData();
      });
    },
    // 新增布控
    addBk() {
      this.clearFormBk();
      this.formDatBk = {};
      this.addDialogVisible = true;
    },
    bkjgClick(row) {
      this.$refs.bkjgRef.show(row);
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
