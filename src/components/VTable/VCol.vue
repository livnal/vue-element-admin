<!--
 * @Descripttion:
 * @version:
 * @Author: xyy
 * @Date: 2020-11-26 10:37:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-06-21 17:59:37
-->
<template>
  <el-table-column v-if="curColConfig.renderCell" v-bind="curColConfig" resizable>
    <template slot-scope="scope">
      <ExSlot :render-cell="curColConfig.renderCell" :scope="scope" />
    </template>
  </el-table-column>
  <el-table-column
    v-else-if="curColConfig.type === 'operation'"
    v-bind="curColConfig"
    resizable
    @click.stop.prevent
  >
    <template slot-scope="scope">
      <template v-for="btn in curColConfig.btns">
        <el-popconfirm
          v-if="btn.key === 'delete'"
          v-show="btn.visible(scope.row)"
          :key="btn.key"
          class="el-popconfirm-btn"
          :title="`确定要${btn.reDelText ? btn.reDelText : '删除'}这条记录？`"
          @onConfirm="handleBtnClick(btn.key, scope.row, scope.$index)"
        >
          <el-button slot="reference" :disabled="btn.disabled(scope.row)" v-bind="btn">{{
            btn.label
          }}</el-button>
        </el-popconfirm>
        <el-popconfirm
          v-else-if="btn.key === 'publicTMC'"
          v-show="btn.visible(scope.row)"
          :key="btn.key"
          class="el-popconfirm-btn"
          title="发布之后不可更改或删除！！！"
          @onConfirm="handleBtnClick(btn.key, scope.row, scope.$index)"
        >
          <el-button slot="reference" :disabled="btn.disabled(scope.row)" v-bind="btn">{{
            btn.label
          }}</el-button>
        </el-popconfirm>
        <el-button
          v-else
          v-show="btn.visible(scope.row)"
          :key="btn.key"
          :disabled="btn.disabled(scope.row)"
          v-bind="btn"
          @click.stop="handleBtnClick(btn.key, scope.row, scope.$index)"
        >{{ btn.label }}</el-button>
      </template>
    </template>
  </el-table-column>
  <el-table-column v-else-if="curColConfig.icon" v-bind="curColConfig" resizable>
    <template slot-scope="scope">
      <i :class="curColConfig.icon" />
      <span style="margin-left: 5px">{{ scope.row[curColConfig.prop] }}</span>
    </template>
  </el-table-column>
  <el-table-column v-else-if="curColConfig.children" v-bind="curColConfig" resizable>
    <template v-for="childConfig in curColConfig.children">
      <VCol :key="childConfig._uid" :col-config="childConfig" />
    </template>
  </el-table-column>
  <el-table-column v-else v-bind="curColConfig" resizable />
</template>

<script>
import ExSlot from './ExSlot';
import checkPermission from '@/utils/permission';
export default {
  name: 'VCol',
  components: {
    ExSlot
  },
  props: {
    colConfig: {
      type: Object,
      required: true
    }
  },
  computed: {
    curColConfig() {
      const { colConfig } = this;
      if (colConfig.btns) {
        console.log('you btns', colConfig);
        // colConfig.btns = colConfig.btns.filter((item) =>
        //   checkPermission(item.permissionCode)
        // );
        colConfig.btns = colConfig.btns.map((item) => {
          item.visible =
            typeof item.visible === 'function'
              ? item.visible
              : () => item.visible !== false;
          item.disabled =
            typeof item.disabled === 'function'
              ? item.disabled
              : () => item.disabled === true;
          return {
            size: 'small',
            ...item
          };
        });
      }
      return { ...colConfig };
    }
  },
  methods: {
    handleBtnClick(key, row, rowIndex) {
      this.$emit('handleBtnClick', key, row, rowIndex);
    }
  }
};
</script>

<style lang="scss">
.el-popover {
  /* background: #100f47; */
  /* color: #fff; */
  border: 0;
}
</style>
