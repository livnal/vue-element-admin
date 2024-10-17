<!--
 * @Descripttion:
 * @version:
 * @Author: jiaolina
 * @Date: 2020-06-29 13:27:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-06-20 10:58:00
-->
<template>
  <section v-show="page.total" class="pagination">
    <el-pagination
      :current-page="page.curPage"
      :page-sizes="[80, 60, 40, 20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </section>
</template>
<script>
export default {
  name: 'Pagination',

  props: {
    page: {
      type: Object,
      default() {
        return {
          total: 0
        };
      }
    }
  },

  data() {
    return {};
  },

  methods: {
    handleCurrentChange(...args) {
      this.$emit('currentChange', args);
      this.$emit('toTop');
    },

    handleSizeChange(...args) {
      this.$emit('sizeChange', args);
    }
  }
};
</script>
<style lang="scss"></style>
