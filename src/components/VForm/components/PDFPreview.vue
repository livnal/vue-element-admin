<!--
 * @Descripttion:
 * @version:
 * @Author: xyy
 * @Date: 2021-01-19 14:38:06
 * @LastEditors: xyy
 * @LastEditTime: 2021-01-21 14:23:35
-->
<template>
  <el-dialog
    title="文件预览"
    width="50%"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    append-to-body
    fullscreen
    @closed="close"
  >
    <div v-for="i in numPages" :key="i">
      <pdf :src="src" :page="i" />
    </div>
  </el-dialog>
</template>
<script>
import apiConfig from '@/api/http/config';
import pdf from 'vue-pdf';
import CMapReaderFactory from 'vue-pdf/src/CMapReaderFactory.js'; // 加载中文的包
export default {
  components: {
    pdf
  },
  props: {
    path: {
      // pdf的地址，例如：/testFile.pdf
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false,
      numPages: '',
      src: ''
    };
  },
  created() {
    const baseUrl = apiConfig.baseURL; // 项目当前的域名
    this.src = pdf.createLoadingTask({
      // url:'http://localhost:8080'+this.path,
      url: baseUrl + this.path,
      CMapReaderFactory
    });
    // console.log(this.src, 'this.src');
    // 让所有页数一次性加载完，否则就只会加载第一页
    this.src.promise
      .then(item => {
        this.numPages = item.numPages;
      })
      .catch(() => {});
  },
  methods: {
    show() {
      this.dialogVisible = true;
    },
    close() {
      this.src = '';
      this.dialogVisible = false;
    }
  }
};
</script>
