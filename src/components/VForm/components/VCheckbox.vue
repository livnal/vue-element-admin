<template>
  <el-checkbox-group :value="value" v-bind="$attrs" @input="$emit('input', $event)" v-on="$listeners">
    <el-checkbox v-for="item in curOptions" :key="item[valueKey]" :label="item[valueKey]">{{
      item[labelKey]
    }}</el-checkbox>
  </el-checkbox-group>
</template>

<script>
export default {
  name: 'VCheckbox',
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

  computed: {},

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
