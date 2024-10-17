<template>
  <el-row class="vform">
    <el-form ref="form" v-bind="formConfig" :model="model">
      <template v-for="item in curFieldList">
        <el-col
          v-if="!formConfig.inline"
          :key="item.model + item.type"
          :span="(item.col && item.col.span) || 24"
          :offset="(item.col && item.col.offset) || 0"
        >
          <el-form-item
            v-show="item.visible"
            :key="item.model + item.type"
            :label="item.label"
            :prop="item.model"
            :rules="item.rules"
            :label-width="item['label-width']"
          >
            <Hoc :ref="item.model" v-model="model[item.model]" :item="item" />
          </el-form-item>
        </el-col>
        <el-form-item
          v-else
          v-show="item.visible"
          :key="item.model + item.type"
          :label="item.label"
          :prop="item.model"
          :rules="item.rules"
        >
          <Hoc :ref="item.model" v-model="model[item.model]" :item="item" />
        </el-form-item>
      </template>
    </el-form>
    <!-- @slot 额外插槽，可放置按钮等 -->
    <slot />
  </el-row>
</template>

<script>
import _ from 'lodash';
import deepMerge from 'deepmerge';
import tagMap from './tagMap';
import Hoc from './Hoc';

/**
 * 配置化表单组件
 */
export default {
  name: 'VForm',
  components: {
    Hoc
  },
  props: {
    /**
     * 表单字段列表
     */
    fieldList: {
      type: Array,
      default() {
        return [];
      },
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
      model: {}
    };
  },

  computed: {
    curFieldList() {
      return this.fieldList.map(item => this.formatItem(item, this.model));
    },

    formConfig() {
      return { size: 'small', ...this.$attrs };
    }
  },

  created() {
    this.generateModel();
  },

  methods: {
    generateModel() {
      const { curFieldList } = this;
      const getDefaultValue = item => {
        const defaultValue = item.defaultValue;
        if (typeof defaultValue !== 'undefined') {
          return typeof defaultValue === 'function' ? defaultValue(item) : defaultValue;
        }
        return null;
      };

      curFieldList.forEach(item => {
        this.$set(this.model, item.model, getDefaultValue(item));
      });
    },

    formatItem(item, model) {
      const config = _.cloneDeep(item);
      config.type = config.type || 'input';
      config.visible = typeof config.visible === 'function' ? config.visible(model) : config.visible !== false;
      config.disabled = typeof config.disabled === 'function' ? config.disabled(model) : config.disabled === false;
      config.on = {
        ...(config.on || {}),
        change: val => {
          /**
           * 表单字段改变时触发
           * @event change
           * @param {any} value - 当前改变的表单字段值
           * @param {String} fieldConfig - 当前改变的表单项配置
           * @param {Object} form - 表单数据
           */
          this.$emit('change', val, item, this.model);
          item.on && item.on.change && item.on.change(val, item, this.model);
        }
      };

      config.props = {
        disabled: config.disabled,
        ...(config.props || {})
      };

      return deepMerge.all([{}, tagMap[config.type], config]);
    },

    /**
     * 设置 radio/checkbox/select 组件的 options
     *
     * @param {String} fieldName 表单字段
     * @param {Array} options 传入的 options
     *
     * @public 这是个公共方法
     */
    setOptions(fieldName, options) {
      if (this.$refs[fieldName]) {
        this.$refs[fieldName][0].$refs[fieldName].setOptions(options);
      } else {
        console.error(`form上不存在${fieldName}`);
      }
    },

    /**
     * 获取 form 转换后的提交数据
     * @public
     */
    getTransformModel() {
      const { transformModel } = this;
      const formatedModel = transformModel ? transformModel({ ...this.model }) : this.model;

      return formatedModel;
    },

    /**
     * 表单提交，会默认进行表单校验
     * @public
     */
    submit() {
      const transformModel = this.getTransformModel();
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
          if (valid) {
            resolve(transformModel);
          } else {
            reject();
          }
        });
      });
    },

    /**
     * 表单重置
     * @public
     */
    reset() {
      return new Promise(resolve => {
        this.$refs.form.resetFields();
        const transformModel = this.getTransformModel();
        resolve(transformModel);
      });
    },

    /**
     * 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
     * @public
     */
    resetFields() {
      this.$refs.form && this.$refs.form.resetFields();
    },

    /**
     * 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果
     * @param {String|Array} props 表单字段
     * @public
     */
    clearValidate(props) {
      this.$refs.form && this.$refs.form.clearValidate(props);
    },

    /**
     * 设置 model 数据
     * @param {Object} model 表单数据
     *
     * @public
     */
    setModel(model) {
      const fields = this.fieldList.map(item => item.model);

      fields.forEach(key => {
        this.$set(this.model, key, typeof model[key] !== undefined ? model[key] : this.model[key]);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.vform ::v-deep {
  .el-form-item__content {
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 100%;
    }

    .el-select {
      width: 100%;
    }
  }
}
</style>
