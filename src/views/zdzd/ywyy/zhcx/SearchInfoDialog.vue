<template>
  <el-dialog
    :visible.sync="dialogVisible"
    title="案件、任务、备注"
    width="50%"
    append-to-body
    :close-on-click-modal="false"
  >
    <el-form :model="form" label-width="120px" label-position="top">
      <el-form-item label="请为当前查询选择所属案件:">
        <el-select v-model="form.select1" placeholder="请选择所属案件" clearable>
          <el-option label="选项1" value="option1" />
          <el-option label="选项2" value="option2" />
        </el-select>
      </el-form-item>
      <el-form-item label="请为当前查询选择所属任务:">
        <el-select v-model="form.select2" placeholder="请选择所属任务" clearable>
          <el-option label="选项1" value="option1" />
          <el-option label="选项2" value="option2" />
        </el-select>
      </el-form-item>
      <el-form-item label="请为当前查询填写备注:">
        <el-input v-model="form.text" placeholder="请输入查询备注" type="textarea" />
      </el-form-item>
      <p style="color: #909399; font-size: 12px">
        （<b>注意：</b>您当前选择的<b> 案件 </b>将作为后续查询的默认案件选择！）
      </p>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="goUrl">继续</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        select1: '',
        select2: '',
        text: ''
      }
    };
  },
  methods: {
    show() {
      this.dialogVisible = true;
    },
    goUrl() {
      this.$router.push({
        path: '/ywyy/ajgl',
        query: {
          select1: this.form.select1,
          select2: this.form.select2,
          text: this.form.text
        }
      });
    }
  }
};
</script>
