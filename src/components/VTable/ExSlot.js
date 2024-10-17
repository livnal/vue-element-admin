// 自定义内容的组件
export default {
  functional: true,
  props: {
    scope: Object,
    renderCell: Function
  },

  render(h, context) {
    const { scope, renderCell } = context.props;

    return renderCell(scope);
  }
};
