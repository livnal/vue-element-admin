<template>
  <el-dialog
    :title="curTitle"
    :visible.sync="visible"
    :width="width"
    v-bind="$attrs"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <VForm ref="form" :field-list="fieldList" :label-width="labelWidth" :transform-model="transformModel" />
    <span slot="footer" class="dialog-footer">
      <slot name="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" :disabled="isDisable" @click="handleConfirm">保存</el-button>
      </slot>
    </span>
  </el-dialog>
</template>

<script>
import VForm from '@/components/VForm';

export default {
  components: { VForm },
  props: {
    /**
     * 弹窗标题
     */
    title: {
      type: String,
      default: ''
    },

    /**
     * 弹窗宽度
     */
    width: {
      type: String,
      default: '600px'
    },

    /**
     * 标签宽度
     */
    labelWidth: {
      type: String,
      default: 'auto'
    },
    /**
     * 表单字段列表
     */
    fieldList: {
      type: Array,
      required: true,
      default() {
        return [];
      }
    },

    /**
     * 编辑状态下获取详情
     *
     * @param {Object} row - 当前行数据
     * @param {Function} resolve - Promise resolve
     */
    getDetail: {
      type: Function
    },
    /**
     * 新增和编辑 api
     *
     * @param {Object} row - 当前行数据
     * @param {Function} resolve - Promise resolve
     */
    api: {
      type: Object,
      required: true
    },

    /**
     * 表单数据提交转换函数
     */
    transformModel: {
      type: Function
    }
  },
  data() {
    return {
      visible: false,
      type: 'add',
      row: null,
      isDisable: false // 表单重复提交
    };
  },
  computed: {
    curTitle() {
      const { type, title } = this;

      if (type === 'edit') {
        return `${title}编辑`;
      }

      return `${title}新增`;
    },
    // 暴露form
    form() {
      return this.$refs.form;
    }
  },
  methods: {
    /**
     * 弹窗显示
     * @param {String} type - add/edit
     * @param {Object} row - 编辑状态下传递当前行数据
     *
     * @public
     */
    async show(type, row) {
      this.resetFields();
      this.type = type;
      this.visible = true;

      if (row) {
        this.$nextTick(() => {
          this.row = row;
          this.initModel(row).then(() => {
            // trick model 变更后会触发表单校验，默认清除
            setTimeout(() => {
              this.clearValidate();
            }, 20);
          });
        });
      }
    },

    // 编辑的时候初始化 model 数据
    initModel(row) {
      // this.isDisable = false;
      const { getDetail } = this;

      if (getDetail) {
        const promise = new Promise(resolve => {
          getDetail(row, resolve);
        });
        return promise.then(data => {
          this.$refs.form.setModel(data);
        });
      }
    },

    close() {
      this.visible = false;
    },

    resetFields() {
      this.$refs.form && this.$refs.form.resetFields();
    },

    clearValidate(props) {
      this.$refs.form && this.$refs.form.clearValidate(props);
    },

    handleConfirm() {
      // console.log('dis', this.isDisable);
      if (this.isDisable) {
        return;
      }
      this.isDisable = true;
      this.$refs.form
        .submit()
        .then(model => {
          this.submit(model);
        })
        .catch(e => {
          console.log('e', e);
          this.isDisable = false;
        });
    },

    submit(params) {
      const { type, api } = this;

      api[type](params)
        .then(() => {
          this.close();
          this.$emit('ok');
        })
        .finally(() => {
          setTimeout(() => {
            this.isDisable = false; // 点击一次时隔两秒后才能再次点击
          }, 2000);
          // this.isDisable = false; //点击一次时隔两秒后才能再次点击
        }); // 不管成功与否都会走finally
    }
  }
};
</script>

<style lang="scss"></style>
