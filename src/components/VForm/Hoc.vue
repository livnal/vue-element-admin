<script>
import VSelect from './components/VSelect';
import VRadio from './components/VRadio';
import VCheckbox from './components/VCheckbox';
// import VUpload from './components/VUpload';
import VCascader from './components/VCascader';

export default {
  components: {
    VSelect,
    VRadio,
    VCheckbox,
    // VUpload,
    VCascader
  },
  props: {
    item: Object // formItems中的子项
  },
  render(h) {
    const { item } = this;
    const WrapComp = item.tag;

    if (item.type === 'view') {
      return h(WrapComp, this.$attrs.value);
    }

    return h(WrapComp, {
      on: {
        ...this.$listeners, //
        ...item.on // 组件event
      },
      attrs: {
        ...this.$attrs, // v-model value
        ...item.props // 自定义props
      },

      ref: item.model
    });
  }
};
</script>
