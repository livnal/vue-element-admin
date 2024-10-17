<template>
  <el-radio-group :value="value" v-bind="$attrs" @input="$emit('input', $event)" v-on="$listeners">
    <el-radio v-for="item in curOptions" :key="item[valueKey]" :label="item[valueKey]">{{ item[labelKey] }}</el-radio>
  </el-radio-group>
</template>

<script>
export default {
  name: 'VRadio',
  props: {
    value: null,
    labelKey: {
      default: 'label'
    },
    valueKey: {
      default: 'value'
    },
    options: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  data() {
    return {
      curOptions: []
    };
  },

  created() {
    this.getOptions();
  },

  methods: {
    getOptions() {
      const { options } = this;

      if (typeof options === 'function') {
        const promise = new Promise(resolve => {
          options(resolve);
        });
        promise.then(data => {
          this.curOptions = data;
        });
      } else {
        this.curOptions = options;
      }
    },

    setOptions(options) {
      this.curOptions = options;
    }
  }
};
</script>

<style lang="scss" scoped></style>
