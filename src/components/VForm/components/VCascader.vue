<template>
  <el-cascader
    :value="value"
    :options="curOptions"
    v-bind="$attrs"
    @input="$emit('input', $event)"
    v-on="$listeners"
  />
</template>

<script>
export default {
  name: 'VCascader',
  props: {
    value: null,
    options: {
      type: null
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

<style lang="scss" scoped>
</style>
