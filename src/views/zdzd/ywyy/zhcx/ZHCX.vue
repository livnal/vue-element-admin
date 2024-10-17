<template>
  <div class="app-container">
    <span class="title">综合查询</span>
    <el-form ref="form" class="form-container" :model="form" label-width="70px">
      <el-form-item label="时间">
        <el-button
          size="small"
          @click="
            form.date = [
              now.subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
              now.format('YYYY-MM-DD HH:mm:ss')
            ]
          "
        >
          近一天
        </el-button>
        <el-button
          size="small"
          @click="
            form.date = [
              now.subtract(3, 'day').format('YYYY-MM-DD HH:mm:ss'),
              now.format('YYYY-MM-DD HH:mm:ss')
            ]
          "
        >
          近三天
        </el-button>
        <el-button
          size="small"
          @click="
            form.date = [
              now.subtract(7, 'day').format('YYYY-MM-DD HH:mm:ss'),
              now.format('YYYY-MM-DD HH:mm:ss')
            ]
          "
        >
          近一周
        </el-button>
        <el-button
          style="margin-right: 10px"
          size="small"
          @click="
            form.date = [
              now.subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss'),
              now.format('YYYY-MM-DD HH:mm:ss')
            ]
          "
        >
          近一月
        </el-button>
        <el-date-picker
          v-model="form.date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        />
      </el-form-item>
      <p style="color: #909399; margin-left: 40px; font-size: 12px">
        （注意：注册类资源的查询不受时间限制）
      </p>
      <el-form-item label="应用">
        <el-checkbox-group v-model="form.app">
          <el-checkbox label="云视通" name="app" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="资源">
        <el-checkbox-group v-model="form.resource">
          <el-checkbox label="资源1" name="resource" />
          <el-checkbox label="资源2" name="resource" />
          <el-checkbox label="资源3" name="resource" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="位置">
        <el-select v-model="form.location" placeholder="请选择位置" clearable>
          <el-option label="属地" value="sd" />
          <el-option label="网站" value="wz" />
        </el-select>
      </el-form-item>
      <el-form-item label="线索">
        <el-select v-model="form.clue" placeholder="线索类型" clearable>
          <el-option label="用户账号" value="yhzh" />
          <el-option label="用户ID" value="id" />
          <el-option label="设备号" value="sbh" />
        </el-select>
        <el-input v-model="form.content" placeholder="请输入查询内容" />
      </el-form-item>
      <el-form-item label="所属案件">
        <el-select v-model="form.location" placeholder="请选择所属案件" clearable>
          <el-option label="属地" value="sd" />
          <el-option label="网站" value="wz" />
        </el-select>
      </el-form-item>
      <el-form-item label="所属任务">
        <el-select v-model="form.location" placeholder="请选择所属任务" clearable>
          <el-option label="属地" value="sd" />
          <el-option label="网站" value="wz" />
        </el-select>
      </el-form-item>
      <el-form-item label="备注:">
        <el-input v-model="form.text" placeholder="请输入查询备注" type="textarea" />
      </el-form-item>

      <el-button
        type="primary"
        icon="el-icon-search"
        size="large"
        style="width: 100%"
        @click="onSubmit"
      >查询</el-button>
    </el-form>
    <!-- <SearchInfoDialog ref="searchInfoRef" /> -->
  </div>
</template>

<script>
import dayjs from 'dayjs';
// import SearchInfoDialog from './SearchInfoDialog.vue';

export default {
  components: {
    // SearchInfoDialog
  },
  data() {
    return {
      now: dayjs(),
      form: {
        date: '',
        app: [],
        resource: [],
        location: '',
        clue: ''
      }
    };
  },
  methods: {
    onSubmit() {
      console.log('查询信息:', this.form);
      this.$emit('toResult', this.form);
    }
  }
};
</script>
<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .form-container {
    width: 800px;
    border: 1px solid #ccc;
    padding: 15px;
    border-radius: 5px;
  }
}
::v-deep {
  .el-form-item__content {
    display: flex;
  }
}
</style>
