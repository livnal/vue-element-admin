<template>
  <el-select :loading="loading" :value="value" v-bind="newAttrs" @input="$emit('input', $event)" v-on="$listeners">
    <el-option
      v-for="item in curOptions"
      :key="item[valueKey]"
      :label="item[labelKey]"
      :value="item[valueKey]"
    />
  </el-select>
</template>

<script>
export default {
  name: 'VSelect',
  props: {
    value: null,
    labelKey: {
      default: 'label'
    },
    valueKey: {
      default: 'value'
    },
    options: {
      type: null
    }
  },

  data() {
    return {
      curOptions: [],
      loading: false
    };
  },

  computed: {
    newAttrs() {
      const {
        $attrs,
        $attrs: { remoteMethod }
      } = this;
      let newRemoteMethod = null;

      if (remoteMethod) {
        newRemoteMethod = query => {
          this.loading = true;
          const promise = new Promise(resolve => {
            remoteMethod(query, resolve);
          });
          promise
            .then(data => {
              this.curOptions = data;
            })
            .finally(() => {
              this.loading = false;
            });
        };
      }

      return {
        ...$attrs,
        filterable: true,
        remote: !!remoteMethod,
        remoteMethod: newRemoteMethod
      };
    }
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
