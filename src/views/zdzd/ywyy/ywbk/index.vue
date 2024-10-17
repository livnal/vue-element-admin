<template>
  <div class="app-container">
    <div class="left-box">
      <div class="head-container">
        <el-input
          v-model="leftFilterText"
          clearable
          size="small"
          placeholder="所有案件"
          prefix-icon="el-icon-search"
          class="filter-item"
        />
        <!-- @input="getLeftData" -->
      </div>
      <el-tree
        ref="tree"
        class="filter-tree"
        :data="leftData"
        :props="defaultProps"
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
      >
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span>
            {{ data.number }}
          </span>
        </span>
      </el-tree>
    </div>
    <div class="right-box">
      <el-tabs v-model="tabActive">
        <el-tab-pane label="布控列表" name="lb" />
        <el-tab-pane label="结果分析" name="jg" />
      </el-tabs>
      <div class="bottom-con">
        <RightTable v-show="tabActive === 'lb'" :active-left="activeLeft" />
        <ResultFx v-show="tabActive === 'jg'" />
      </div>
    </div>
  </div>
</template>
<script>
import RightTable from './RightTable.vue';
import ResultFx from './ResultFx.vue';

export default {
  name: 'Ajgl',
  components: { RightTable, ResultFx },
  data() {
    return {
      formAj: {},
      dialogVisibleLeft: false,
      ajTitle: '创建案件',
      activeLeft: {},
      tableDataR: [],
      leftFilterText: '',
      leftData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tabActive: 'lb'
    };
  },
  watch: {
    leftFilterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  mounted() {
    this.getLeftData();
  },
  methods: {
    // 左边树子项点击
    handleNodeClick(data) {
      console.log('>>>左侧选中数据', data);
      this.activeLeft = data;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getLeftData() {
      this.leftData = [
        {
          id: 1,
          label: '一级 1',
          number: 12,
          children: [
            {
              id: 4,
              label: '二级 1-1',
              number: 12,
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1',
                  number: 12
                },
                {
                  id: 10,
                  label: '三级 1-1-2',
                  number: 0
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          number: 12,
          children: [
            {
              id: 5,
              label: '二级 2-1',
              number: 12
            },
            {
              id: 6,
              label: '二级 2-2',
              number: 12
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          number: 12,
          children: [
            {
              id: 7,
              label: '二级 3-1',
              number: 12
            },
            {
              id: 8,
              label: '二级 3-2',
              number: 12
            }
          ]
        }
      ];
      // this.activeLeft = this.cards[0];
    },

    showAjModal(card) {
      console.log(card);
      // 设置表单数据为当前卡片数据
      if (card) {
        this.ajTitle = '编辑案件';
        this.formAj = card || {};
      } else {
        this.ajTitle = '创建案件';
        this.formAj = {};
      }
      this.dialogVisibleLeft = true;
    },
    saveAj() {},
    delAj() {}
  }
};
</script>
<style lang="scss" scoped>
.app-container {
  display: flex;
  .left-box {
    width: 20%;
    border: 1px solid #ccc;
    border-radius: 5px;

    padding: 5px;
    /* background: #ccc; */
    .top {
      display: flex;
      .title {
        flex: 1;
        text-align: left;
      }
    }
  }
  .right-box {
    width: 80%;
    /* background: #f0f0f0; */
    display: flex;
    flex-direction: column;
    margin-left: 15px;
    .bottom-con {
      width: 100%;
      flex: 1;
      background: #fff;
    }
  }
}
.card-box {
  width: 100%;
  height: 65px;
  /* backgroud: #ccc; */
  margin-bottom: 10px;
  padding: 10px;
  border-bottom: 1px solid #ccc;

  /* cursor: pointer; */
  .top {
    /* height: 70%; */
    display: flex;
    align-items: center;
    h3 {
      margin: 0;
    }
  }
  .bottom {
    /* height: 30%; */
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #999;
  }
}
.card-box-active {
  background: rgba(0, 128, 192, 0.3);
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
