<template>
  <div v-resize="getTableHeight" class="vrtable">
    <VForm
      ref="form"
      v-bind="layout"
      :inline="true"
      :field-list="fieldList"
      :transform-model="transformModel"
      @change="handleFormChange"
    >
      <div class="vform-btns">
        <el-button
          v-for="btn in formBtns"
          :key="btn.key"
          v-permission="btn.pmCode"
          v-bind="btn"
          @click="handleFormBtnClick(btn.key)"
        >{{ btn.label }}</el-button>
        <el-divider v-if="exportBtn || printBtn" direction="vertical" />
        <!-- <span class="vform-export-btn" @click="printTable" v-if="exportBtn"> -->
        <span
          v-if="exportBtn"
          class="vform-export-btn"
          @click="
            page.total || formConfig.printTable
              ? printTable()
              : handleExport2Excel()
          "
        >
          <el-button type="text">
            <i class="iconfont icondaoru" />
          </el-button>
          <!-- <img src="@/assets/index/导出.svg" alt /> -->
        </span>
        <!-- <span class="vform-print-btn" @click="handlePrintTable" v-if="printBtn">
          <el-button type="text">
            <i class="iconfont icondayin"></i>
          </el-button>-->
        <!-- <img src="@/assets/index/打印.svg" alt /> -->
        <!-- </span>  -->
      </div>
    </VForm>
    <div class="vrtable-body">
      <div
        v-if="title"
        :class="{
          vrTitle: title != '',
          'vrtable-title': true,
          vrLittleTitle: littleTitle
        }"
      >
        {{ title }}
      </div>
      <VTable
        :id="id"
        ref="table"
        v-loading="tableLoading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 30,0.5)"
        :data="tableData"
        :col-configs="colConfigs"
        :table-config="currentTableConfig"
        @handleBtnClick="handleTableBtnClick"
        v-on="$listeners"
        @selection-change="handleSelectionChange"
        @sort-change="handleSortChange"
      />
    </div>

    <VPagination
      class="VPagination"
      :page="page"
      @currentChange="handleCurrentChange"
      @toTop="toTop"
      @sizeChange="handleSizeChange"
    />
  </div>
</template>

<script>
import VForm from '@/components/VForm'
import VTable from '@/components/VTable'
import VPagination from '@/components/VPagination'
import tableListMixin from './table-list'
import { createUUID } from '@/utils/util'
import formMixin from './form'

export default {
  components: {
    VForm,
    VTable,
    VPagination
  },
  mixins: [tableListMixin, formMixin],
  props: {
    title: {
      type: String,
      default: ''
    },
    littleTitle: {
      type: Boolean,
      default: false
    },
    /**
     * 表格数据接口配置
     * {
     *   list: {api: '', resultKey: 'list'}
     * }
     */
    tableApi: {
      type: Object,
      required: true
    },

    /**
     * 表格配置项
     */
    tableConfig: {
      type: Object,
      default() {
        return {}
      }
    },
    // 是否一进入页面就调取接口
    auto: {
      type: Boolean,
      default: true
    },
    /**
     * 列配置项
     */
    colConfigs: {
      type: Array,
      default() {
        return []
      }
    },

    /**
     * 表单配置项
     */
    formConfig: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      id: createUUID(),
      selectedRows: [],
      tableHeight: 0
    }
  },
  computed: {
    /**
     * 对外暴露表格引用
     */
    table() {
      return this.$refs.table
    },

    /**
     * 对外暴露表单引用
     */
    form() {
      return this.$refs.form
    },
    currentTableConfig() {
      const { tableConfig, tableHeight } = this

      if (tableHeight) {
        return {
          ...tableConfig,
          height: tableHeight
        }
      }
      return {
        ...tableConfig
      }
    }
  },

  mounted() {
    this.getTableHeight()
    if (this.auto) {
      const formModel = this.form.getTransformModel()
      this.searchTableData(formModel)
    }
  },

  methods: {
    // 切换分页时让列表数据置顶显示
    toTop() {
      if (this.$refs.table.$el) {
        this.$refs.table.$el.querySelector('.el-table__body-wrapper').scrollTop = 0
      }
    },
    handleTableBtnClick(key, row, rowIndex) {
      const handlers = {
        delete: () => {
          this.handleDelete(row)
        }
      }
      if (handlers[key]) {
        handlers[key]()
      } else {
        this.$emit('handleTableBtnClick', key, row, rowIndex)
      }
    },
    getTableHeight() {
      const { currentTableConfig } = this
      const eleTable = this.$refs.table.$el
      const bodyTable = eleTable.querySelector('.el-table__body-wrapper')
      if (eleTable) {
        this.tableHeight = eleTable.offsetHeight

        // 存在合计行时手动计算高度
        if (currentTableConfig['show-summary'] || currentTableConfig.showSummary) {
          this.$nextTick(() => {
            const headerTableHeight = eleTable.querySelector('.el-table__header-wrapper')
              .offsetHeight
            const bodyTableHeight = bodyTable.offsetHeight
            const bodyInnerTableHeight = bodyTable.querySelector('table').offsetHeight
            const footerTableHeihgt = eleTable.querySelector('.el-table__footer-wrapper')
              .offsetHeight

            if (
              bodyTableHeight <= bodyInnerTableHeight &&
              // height auto 情况下二次查询.+2是因为可能存在border
              headerTableHeight + bodyTableHeight + footerTableHeihgt + 2 >=
                this.tableHeight
            ) {
              this.$refs.table.table.layout.setHeight(this.tableHeight)
            } else {
              bodyTable.style.height = 'auto'
            }
          })
        }
        // this.tableHeight = 0;
      }
    },
    printTable() {
      this.$emit('printTable')
    }
  }
}
</script>

<style lang="scss" scoped>
.iconfont {
  font-size: 20px;
}
.el-divider--vertical {
  width: 2px;
  height: 20px;
}

.vrtable ::v-deep {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .vrtable-body {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .vtable {
    flex: 1;
    overflow: hidden;
  }
}
.vrtable {
  .vrTitle {
    display: flex;
    font-size: 18px;
    justify-content: center;
    font-weight: 800;
    margin-bottom: 30px;
    &.vrLittleTitle {
      font-size: 14px;
      font-weight: 500;
      justify-content: flex-start;
      margin-bottom: 10px;
    }
  }
}
.vrtable ::v-deep {
  .vform {
    background: #04102b;
    display: flex;
    padding: 15px 20px;
  }

  .el-form {
    flex: 1;
  }

  //修改样式
  .el-form-item {
    .el-form-item__content {
      //input框的样式
      .el-input {
        background-color: #101e41;
        .el-input__inner {
          background-color: #101e41;
          border: 1px solid #101e41;
          color: #ffffff;
        }
      }

      //时间日期样式
      .el-date-editor {
        background-color: #101e41;
        .el-range-input {
          background-color: #101e41;
          color: #ffffff;
        }
      }
      .el-date-editor--datetimerange.el-input__inner {
        border: 1px solid red;
      }
    }
  }

  .el-row--flex {
    justify-content: space-between;
  }
}
.vform-btns {
  white-space: nowrap;
}

.vform-export-btn {
  display: inline-block;
  vertical-align: middle;
  margin-left: 0px;
  cursor: pointer;
  img {
    width: 30px;
    height: 30px;
  }
}

.vform-print-btn {
  display: inline-block;
  margin-left: 10px;
  vertical-align: middle;
  cursor: pointer;
  img {
    width: 24px;
    height: 24px;
  }
}
</style>
