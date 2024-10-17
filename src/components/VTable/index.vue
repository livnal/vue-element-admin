<template>
  <div class="vtable">
    <el-table
      ref="table"
      :data="data"
      v-bind="currentTableConfig"
      highlight-current-row
      border
      v-on="$listeners"
    >
      <template v-for="colConfig in currentColConfigs">
        <VCol
          v-if="colConfig.visible !== false"
          :key="colConfig._uid"
          :col-config="colConfig"
          @handleBtnClick="handleBtnClick"
        />
      </template>
      <template slot="empty">
        <!-- <img src="@/assets/ControlScreen/noData.png" alt /> -->
        <span class="noCart">暂无此类数据</span>
      </template>
    </el-table>
    <VColFilterDialog
      ref="vColFilterDialog"
      :col-configs="currentColConfigs"
      @filterColumns="handleFilterColumns"
    />
  </div>
</template>

<script>
import calc from 'calculatorjs';
import VCol from './VCol';
import VColFilterDialog from './VColFilterDialog';
import { createUUID } from '@/utils/util';
export default {
  name: 'VTable',
  components: {
    VCol,
    VColFilterDialog
  },
  props: {
    /**
     * 表格数据
     */
    data: {
      type: Array,
      required: true
    },

    /**
     * table 配置项
     */
    tableConfig: {
      type: Object,
      default() {
        return {};
      }
    },

    /**
     * 列配置项
     */
    colConfigs: {
      type: Array,
      default() {
        return [];
      }
    },

    /**
     * tableCode
     */
    tableCode: {
      type: String
    }
  },

  data() {
    return {
      currentColConfigs: []
    };
  },

  computed: {
    table() {
      return this.$refs.table;
    },
    currentTableConfig() {
      const { tableConfig, $attrs } = this;

      return {
        size: 'small',
        'row-class-name': ({ rowIndex }) => {
          if (rowIndex % 2 === 0) {
            return 'even-number';
          }
          return 'odd-number';
        },
        'header-cell-style': ({ rowIndex }) => {
          if (rowIndex === 0) {
            // #20315C,#1890ff
            return 'background-color:#304156 ;color: #fff;font-weight: 500;';
          }
        },
        ...tableConfig,
        ...$attrs
      };
    }
  },

  watch: {
    colConfigs: {
      handler() {
        this.currentColConfigs = this.extendColConfigs(this.colConfigs);
      },
      deep: true,
      immediate: true
    }
  },

  mounted() {},

  created() {
    this.getColConfigs();
  },

  methods: {
    extendColConfigs(colConfigs) {
      const defualtColConfig = {
        showOverflowTooltip: true,
        align: 'center',
        formatter(row, column, cellValue) {
          return typeof cellValue === 'undefined' || cellValue === null ? '-' : cellValue;
        }
      };

      return colConfigs.map((item) => {
        // update
        item._uid = createUUID();

        if (item.sortable === true && !item.sortMethod && item.sortType === 'front') {
          item.sortMethod = (a, b) => {
            let valueA = a[item.prop] || '';
            let valueB = b[item.prop] || '';

            if (item.formatter) {
              valueA = item.formatter(a, item, valueA);
              valueB = item.formatter(b, item, valueB);
            }

            valueA = Number(valueA.replace(/[^0-9.-]/gi, ''));
            valueB = Number(valueB.replace(/[^0-9.-]/gi, ''));

            // 非数字
            if (isNaN(valueA) && isNaN(valueB)) {
              return 0;
            }
            if (isNaN(valueA)) {
              return -1;
            }
            if (isNaN(valueB)) {
              return 1;
            }

            return calc.sub(valueA, valueB);
          };
        }

        if (item.children) {
          return {
            ...item,
            ...defualtColConfig,
            children: this.extendColConfigs(item.children)
          };
        }

        return { ...defualtColConfig, ...item };
      });
    },
    handleBtnClick(key, row, rowIndex) {
      this.$emit('handleBtnClick', key, row, rowIndex);
    },

    // TODO:显示配置和后端映射
    getColConfigs() {
      const { tableCode } = this;

      if (tableCode) {
        this.$api.table
          .getTableConfig({ tableCode }, { showLoading: false })
          .then((res) => {
            const {
              data: { configDtos }
            } = res;

            const isShowColumn = (column) => {
              for (let i = 0; i < configDtos.length; i++) {
                const col = configDtos[i];
                if (
                  `${column.prop}${column.label}` === `${col.prop}${col.label}` &&
                  col.columnVisible === 'Y'
                ) {
                  return true;
                }
              }
              return false;
            };

            this.currentColConfigs = this.currentColConfigs.map((item) => {
              if (isShowColumn(item)) {
                item.visible = true;
              } else {
                item.visible = false;
              }
            });
          });
      }
    },

    /**
     * 显示列筛选排序弹框
     *
     * @public
     */
    showColFilterDialog() {
      this.$refs.vColFilterDialog.show();
    },

    handleFilterColumns(colConfigs) {
      this.currentColConfigs = colConfigs;
    }
  }
};
</script>
<style lang="scss" scoped>
.vtable ::v-deep {
  .el-button + .el-popconfirm-btn {
    margin-left: 10px;
  }
  .el-table__empty-text {
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      margin-top: 20px;
    }
  }
}
</style>
