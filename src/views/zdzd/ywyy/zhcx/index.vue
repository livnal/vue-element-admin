<template>
  <div style="width: 100%; height: 100%" class="app-container">
    <span class="topTools">
      <el-button v-if="curPage == '1'" type="text" @click="toYjsClick">
        一键搜
      </el-button>
      <el-button v-if="curPage == '2'" type="text" @click="toZhcxClick">
        综合查询
      </el-button>
      <el-button v-if="curPage == '2' && !isHistory" type="text" @click="toLsClick">
        返回历史页面
      </el-button>
    </span>
    <YJS v-if="(curPage == '2') & isHistory" ref="yjs" @searchClickYJS="toResult" />
    <YJSResult v-if="!isHistory" ref="yjs" :yjs-val="yjsVal" />
    <ZHCX v-if="curPage == '1'" ref="zhhcx" @toResult="toResult" />
  </div>
</template>

<script>
import YJS from './YJS.vue';
import ZHCX from './ZHCX.vue';
import YJSResult from './YJSResult.vue';

export default {
  components: {
    YJS,
    ZHCX,
    YJSResult
  },
  data() {
    return {
      curPage: '1',
      isHistory: true,
      yjsVal: ''
    };
  },
  methods: {
    // 跳到一键搜页面
    toYjsClick() {
      this.curPage = '2';
    },
    // 跳到
    toZhcxClick() {
      this.curPage = '1';
      this.isHistory = true;
    },
    // 跳到一键搜历史页
    toLsClick() {
      this.curPage = '2';
      this.isHistory = true;
    },
    // 跳转到一键搜结果页面
    toResult(val) {
      this.curPage = '2';
      this.isHistory = false;
      this.yjsVal = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.topTools {
  position: absolute;
  right: 20px;
  top: 10px;
}
::v-deep {
  .app-container {
    min-height: calc(100vh - 90px) !important;
  }
}
</style>
