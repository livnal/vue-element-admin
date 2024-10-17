<template>
  <div class="app-container">
    <div class="left-box">
      <div style="margin: 10px 0">
        <span style="font-size: 20px; font-weight: bold">案件列表 </span><el-button class="fr" size="mini" @click="showAjModal('')"> 新增 </el-button>
      </div>

      <div
        v-for="(card, index) in cards"
        :key="index"
        class="card-box"
        :class="{ 'card-box-active': card.id === activeCard.id }"
        @click="updateRight(card)"
      >
        <div class="top">
          <div class="title">
            <h3>{{ card.title }}</h3>
          </div>
          <el-button
            style="width: 25px; height: 25px; font-size: 12px; margin: 0; padding: 0"
            icon="el-icon-edit"
            circle
            @click="showAjModal(card)"
          />
          <el-popconfirm title="这是一段内容确定删除吗？">
            <el-button
              slot="reference"
              style="
                width: 25px;
                height: 25px;
                font-size: 12px;
                margin: 0;
                padding: 0;
                margin-left: 5px;
              "
              icon="el-icon-delete"
              circle
              @click="delAj(card)"
            />
          </el-popconfirm>
        </div>
        <div class="bottom">
          <span>{{ card.username }}</span>
          <span>{{ card.modifiedTime }}</span>
        </div>
      </div>
      <!-- 新增和修改模态框 -->
      <el-dialog :title="ajTitle" :visible.sync="dialogVisibleLeft">
        <!-- 表单内容 -->
        <el-form :model="formAj" label-width="120px">
          <el-form-item label="案件名称:" prop="text">
            <el-input
              v-model="formAj.text"
              placeholder="请输入案件名称"
              :disabled="ajTitle === '编辑案件'"
            />
          </el-form-item>
          <el-form-item v-if="ajTitle === '编辑案件'" label="最近修改人:" prop="text">
            <el-input v-model="formAj.text" disabled />
          </el-form-item>
          <el-form-item v-if="ajTitle === '编辑案件'" label="最近修改时间:" prop="text">
            <el-input v-model="formAj.text" disabled />
          </el-form-item>
          <el-form-item v-if="ajTitle !== '编辑案件'" label="案件类型:" prop="select2">
            <el-select v-model="formAj.select2" placeholder="请选择案件类型" clearable>
              <el-option label="选项1" value="option1" />
              <el-option label="选项2" value="option2" />
            </el-select>
          </el-form-item>
          <el-form-item label="简要案情:" prop="text">
            <el-input
              v-model="formAj.text"
              placeholder="请输入简要案情"
              type="textarea"
              maxlength="340"
            />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleLeft = false">取 消</el-button>
          <el-button type="primary" @click="saveAj">确定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="right-box">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-weight: 800; font-size: 19px; margin-right: 5px">{{
            activeCard.title
          }}</span>
          <el-tag>{{ '网安类' }}</el-tag>
        </div>
        <div>
          <el-row :gutter="20" style="">
            <el-col :span="8" class="text-left">
              负责人：{{ activeCard.username }}
            </el-col>
            <el-col :span="8" class="text-left">
              创建人：{{ activeCard.username }}
            </el-col>
            <el-col :span="8" class="text-left">
              创建时间：{{ activeCard.modifiedTime }}
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top: 12px">
            <el-col :span="24" class="text-left">
              简要案情：{{ activeCard.username }}
            </el-col>
          </el-row>
        </div>
      </el-card>
      <div class="bottom-con">
        <el-card class="box-card" style="height: 100%">
          <div slot="header" class="clearfix">
            <span style="font-size: 20px; font-weight: bold">任务列表</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">
              操作按钮
            </el-button> -->
          </div>
          <RightTable />
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
import RightTable from './RightTable.vue';
export default {
  name: 'Ajgl',
  components: { RightTable },
  data() {
    return {
      formAj: {},
      cards: [], // 卡片数据
      dialogVisibleLeft: false,
      ajTitle: '创建案件',
      activeCard: {},
      tableDataR: []
    };
  },
  mounted() {
    this.getLeftData();
  },
  methods: {
    getLeftData() {
      this.cards = [
        {
          id: 1,
          title: '卡片1',
          username: '张三',
          modifiedTime: '2021-01-01'
        },
        {
          id: 2,
          title: '卡片2',
          username: '李四',
          modifiedTime: '2021-01-02'
        },
        {
          id: 3,
          title: '卡片3',
          username: '王五',
          modifiedTime: '2021-01-03'
        },
        {
          id: 4,
          title: '卡片4',
          username: '赵六',
          modifiedTime: '2021-01-04'
        }
      ];
      this.activeCard = this.cards[0];
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
    delAj() {},
    updateRight(data) {
      console.log('当前左侧选择', data);
      this.activeCard = data;
    }
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
    background: #f0f0f0;
    display: flex;
    flex-direction: column;
    margin-left: 15px;
    .top-con {
      width: 100%;
      /* height: 50%; */
      background: #fff;
      display: flex;
      flex-direction: column;
    }
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
.info-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    margin: 0;
  }
}
</style>
