<template>
  <div class="vcolfilter-dialog">
    <el-dialog
      ref="columnFieldConfig"
      title="列表排序"
      :visible.sync="visible"
      :close-on-click-modal="false"
    >
      <!-- 列表 -->
      <el-table
        ref="table"
        :data="curColConfigs"
        stripe
        height="400px"
        :row-class-name="rowClassName"
        :row-key="rowKey"
        :tree-props="{ children: 'childrenList' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="label" label="字段" align="center" />
        <el-table-column width="50" type="selection" align="center" />
      </el-table>
      <div class="dialog-footer">
        <el-button
          type="text"
          class="dialog-footer-left"
          @click="fieldConfigReset"
        >恢复默认</el-button>
        <div class="dialog-footer-button">
          <el-button @click="close">取 消</el-button>
          <el-button type="primary" @click="handleFiledConfigClick">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Sortable from 'sortablejs';

export default {
  props: {
    colConfigs: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      visible: false,
      sortable: null,
      curColConfigs: [],
      selections: []
    };
  },
  mounted() {},

  beforeDestroy() {
    this.sortable && this.sortable.destroy();
  },

  methods: {
    show() {
      this.visible = true;

      this.$nextTick(() => {
        this.filterColConfigs();
        this.initSort();
      });
    },

    close() {
      this.visible = false;
    },

    filterColConfigs() {
      const { colConfigs } = this;
      const newColConfigs = colConfigs.filter((item) => {
        // type=index/selection/expand/action 不显示在列里边
        if (item.type) {
          return false;
        }

        return true;
      });

      this.curColConfigs = newColConfigs;

      setTimeout(() => {
        this.toggleSelection();
      }, 50);
    },

    toggleSelection() {
      this.curColConfigs.forEach((row) => {
        if (row.visible !== false) {
          this.selections.push(row);
          this.$refs.table.toggleRowSelection(row, true);
        }
      });
    },

    handleSelectionChange(rows) {
      this.selections = rows;
    },

    rowClassName({ rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'even-number';
      }
      return 'odd-number';
    },

    rowKey(row) {
      return `${row.prop}${row.label}`;
    },

    initSort() {
      const tbody = this.$refs.table.$el.querySelector(
        '.el-table__body-wrapper table tbody'
      );
      const $this = this;
      if (!this.sortable) {
        // 拖拽方法配置
        this.sortable = Sortable.create(tbody, {
          animation: 200,
          filter: '.ignore-elements',
          forceFallback: true,
          scroll: true,
          scrollSpeed: 50,
          // bubbleScroll: true,
          scrollSensitivity: 80,
          onMove(evt) {
            return evt.related.className.indexOf('ignore-elements') === -1;
          },
          onEnd({ newIndex, oldIndex }) {
            const currRow = $this.curColConfigs.splice(oldIndex, 1);
            $this.curColConfigs.splice(newIndex, 0, currRow[0]);
          }
        });
      }
    },

    handleFiledConfigClick() {
      const { selections, curColConfigs, colConfigs } = this;
      const beforeColConfigs = colConfigs.filter(
        (item) =>
          item.type === 'index' || item.type === 'selection' || item.type === 'expand'
      );
      const afterColConfigs = colConfigs.filter((item) => item.type === 'operation');

      let newColConfigs = [...beforeColConfigs];
      const hasColumn = (column) => {
        for (let i = 0; i < selections.length; i++) {
          const col = this.selections[i];
          if (`${column.prop}${column.label}` === `${col.prop}${col.label}`) {
            return true;
          }
        }
        return false;
      };

      curColConfigs.forEach((item) => {
        if (hasColumn(item)) {
          item.visible = true;
        } else {
          item.visible = false;
        }

        newColConfigs.push(item);
      });

      newColConfigs = newColConfigs.concat(afterColConfigs);

      this.$emit('filterColumns', newColConfigs);

      this.close();
    },

    fieldConfigReset() {}
  }
};
</script>

<style lang="scss" scoped>
.vcolfilter-dialog ::v-deep {
  .el-dialog {
    width: 450px;
    /* background: #101e41; */
    .el-dialog__header {
      /* background: #1b2e56; */
      .el-dialog__title {
        /* color: #fff; */
      }
    }
    .el-table {
      //position: absolute;
      //缩小 padding
      margin: 0 !important;
      td,
      th {
        /* background: #101e41; */
      }
    }
    .dialog-footer {
      margin-top: 15px;
      overflow: hidden;
      .dialog-footer-left {
        float: left;
      }
      .dialog-footer-button {
        float: right;
      }
    }
  }
}
</style>
