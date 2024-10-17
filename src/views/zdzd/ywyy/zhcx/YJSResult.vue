<template>
  <div class="app-container">
    <div>
      <span style="font-size: 20px; font-weight: 700; margin-right: 10px">一键搜</span>
      <el-input
        v-model="searchVal"
        style="width: 50%"
        clearable
        size="large"
        placeholder="输入搜索"
        class="custom-input"
      >
        <template #append>
          <el-button
            slot="append"
            type="primary"
            icon="el-icon-search"
            circle
            size="large"
            @click="searchClick"
          >
            搜一下
          </el-button>
        </template>
      </el-input>
    </div>
    <el-divider />
    <div>
      <span style="font-size: 18px; font-weight: 700; margin-right: 10px">搜索结果 |</span><span style="font-size: 12px">共查出 {{ result.length }} 条结果</span>
    </div>
    <div class="conBox">
      <div class="conLeft">
        <div v-for="(item, index) in result" :key="index" class="resultItem">
          <div class="appName">
            {{ item.app }}
          </div>
          <div class="rightBox">
            <div class="rightItem">
              <span class="label">用户账号：</span><span class="val">{{ item.number }}</span>
            </div>
            <div class="rightItem">
              <span class="label">姓名：</span><span class="val">{{ item.name }}</span>
            </div>
            <div class="rightItem">
              <span class="label">手机号码：</span><span class="val">{{ item.phone }}</span>
            </div>
            <div class="rightItem">
              <span class="label">证件号码：</span><span class="val">{{ item.cardId }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="conRight">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-size: 17px; font-weight: 800">相关应用</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <div class="cardCon">
            <span v-for="i in result" :key="i.app" style="padding: 0 5px">{{
              i.app
            }}</span>
          </div>
        </el-card>
        <el-card class="box-card" style="margin-top: 10px">
          <div slot="header" class="clearfix">
            <span style="font-size: 17px; font-weight: 800">信息聚合</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <div class="cardCon" style="display: flex; line-height: 25px">
            <div>用户账号：</div>
            <div>
              <div v-for="x in result" :key="x.app">{{ x.number }}</div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    yjsVal: {
      type: String
    }
  },
  data() {
    return {
      searchVal: this.yjsVal && typeof this.yjsVal === 'string' ? this.yjsVal : '',

      // 搜索结果
      result: [
        {
          app: '应用名称',
          number: '1234243',
          name: '李四',
          phone: 12676323,
          cardId: 762378232324231123
          // tags:[{label:'手机号码',value:'465484'}]
        },
        {
          app: '应用名称2',
          number: '1234243',
          name: '李四',
          phone: 12676323,
          cardId: 762378232324231123
          // tags:[{label:'手机号码',value:'465484'}]
        }
      ]
    };
  },
  methods: {
    searchClick() {}
  }
};
</script>
<style lang="scss" scoped>
.app-container {
  display: flex;
  flex-direction: column;
  .conBox {
    flex: 1;
    margin-top: 15px;
    /* overflow: auto; */
    display: flex;
  }
}
.conLeft {
  flex: 1;
  overflow: auto;
  .resultItem {
    display: flex;
    margin-bottom: 10px;
    .appName {
      width: 150px;
      background: #f5f5f5;
      padding: 5px 10px;
      margin-right: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 15px;
      color: #333;
    }
    .rightBox {
      flex: 1;
      display: flex;
      /* flex-direction: column; */
      padding: 10px 0;
      .rightItem {
        padding: 0 10px;
        border-right: 1px solid #e6e6e6;
        .label {
          /* color: #999; */
          font-weight: bold;
        }
        .val {
          color: #333;
        }
      }
    }
  }
}
.resultItem + .resultItem {
  border-top: 1px dashed #e6e6e6;
  padding-top: 10px;
}
.conRight {
  width: 450px;
  /* background: #f5f5f5; */
  /* padding: 20px; */
  margin-left: 10px;
}
.cardCon {
  min-height: 100px;
  max-height: 300px;
  overflow: auto;
}
::v-deep {
  .el-card__header {
    padding: 10px 20px;
    background: #f5f5f5;
  }
  .el-card__body {
    padding: 10px 20px;
  }
}
</style>
