// <template>
  //   <div>
    //     <el-upload
//       ref="elUpload"
//       class="vupload"
//       :action="baseUrl + action"
//       :file-list="fileList"
//       :on-success="handleSuccess"
//       :on-remove="handelRemove"
//       :on-error="handleError"
//       :on-exceed="handleExceed"
//       :before-upload="beforeUpload"
//       :on-preview="handlePreview"
//       :on-change="fileChange"
//       v-bind="$attrs"
//     >
      //       <i v-if="$attrs['list-type'] === 'picture-card'" class="el-icon-plus" />
      //       <template v-else>
        //         <div v-if="specialUpload" class="specialUpload">
          //           <i v-if="$attrs['auto-upload']" class="el-icon-upload"> 点击上传</i>
          //           <i v-else class="el-icon-document-add"> 选取文件</i>
          //         </div>
        //         <el-button v-else size="small" type="primary" :loading="loading">{{
//           $attrs['auto-upload'] ? '上传' : '选取文件'
        //         }}</el-button>
        //       </template>
      //       <div v-if="tip" slot="tip" class="el-upload__tip">{{ tip }}</div>
      //     </el-upload>
    //     <el-dialog title="图片详情" :visible.sync="dialogVisible" append-to-body>
      //       <el-row type="flex" justify="center">
        //         <img :src="currentImg" alt class="preview-img">
        //       </el-row>
      //     </el-dialog>
    //   </div>
  // </template>
<script>
// import imgUtil from '@/utils/img';
// // import apiConfig from '@/api/http/config';
// export default {
//   name: 'VUpload',
//   props: {
//     value: {
//       type: Array,
//       default() {
//         return [];
//       }
//     },
//     name: {
//       type: String,
//       default: 'file'
//     },
//     action: {
//       type: String,
//       default: '/api/file/upload'
//     },
//     fileSize: {
//       type: Number,
//       default: 20
//     },
//     fileType: {
//       type: Array,
//       default() {
//         return [];
//       }
//     },
//     tip: {
//       type: String,
//       default: ''
//     },
//     specialUpload: {
//       type: Boolean,
//       default: false
//     }
//   },
//   data() {
//     return {
//       fileList: [],
//       loading: false,
//       currentImg: '',
//       dialogVisible: false,
//       baseUrl: '' // `${apiConfig.baseURL}`
//     };
//   },
//   watch: {
//     value: {
//       handler(val) {
//         this.fileList = val || [];
//       },
//       immediate: true,
//       deep: true
//     },
//     fileList: {
//       handler(val) {
//         this.$emit('input', val);
//       },
//       deep: true
//     }
//   },
//   methods: {
//     // 此为button上的加载效果方法
//     closeLoading() {
//       this.loading = false;
//     },
//     handleExceed() {
//       this.$message.error('文件超出个数限制');
//     },
//     handleSuccess(res, file) {
//       this.closeLoading();
//       this.$wait.end('load');
//       if (res.code == 200) {
//         this.$emit('VUploadSuccess', res);
//         this.$message.success('上传成功');
//         this.fileList.push(file);
//         //
//       } else {
//         this.$message.error(res.msg || '上传出错，请稍后重试！');
//         this.fileList = [];
//       }
//       // const { status, data, msg } = res;
//       // if (status === 1) {
//       //   file.id = data;
//       //   if (data.fid) {
//       //     file.id = data.fid;
//       //     this.$emit('parse', data.summary || '');
//       //   }
//       // } else {
//       //   this.$message.error(msg || '上传出错，请稍后重试！');
//       // }
//     },
//     handleError(err) {
//       this.$message.error(err.message || '上传失败，请稍后重试！');
//       this.closeLoading();
//     },
//     beforeUpload(file) {
//       this.$wait.start('load');
//       const { fileSize, fileType } = this;
//       const { listType } = this.$refs.elUpload;
//       const fileName = file.name;
//       const uploadType = fileName.substring(fileName.lastIndexOf('.') + 1);
//       const isFileType =
//         fileType && fileType.length ? fileType.indexOf(uploadType) > -1 : true;
//       const isLtSize = file.size / 1024 / 1024 <= fileSize;
//       let flag = false;
//       const self = this;
//       if (!isFileType) {
//         this.$message.error('上传文件格式错误!');
//       }

//       if (!isLtSize) {
//         const unit = fileSize < 1 ? `${fileSize * 1000}KB` : `${fileSize}MB`;
//         this.$message.error(`上传文件大小不能超过${unit}!`);
//       }

//       flag = isFileType && isLtSize;

//       if (!flag) {
//         return flag;
//       }
//       if (listType !== 'picture-card') {
//         this.loading = true;
//         return flag;
//       }
//       const { uploadFiles } = self.$refs.elUpload;
//       const currentFileIndex = uploadFiles.findIndex((item) => item.uid === file.uid);
//       const currentFile = uploadFiles[currentFileIndex];

//       this.loading = true;
//       return new Promise((resolve) => {
//         imgUtil.getOrientation(file).then((orient) => {
//           if (orient && orient !== '' && orient !== 1) {
//             currentFile.url = '';

//             const reader = new FileReader();
//             const img = new Image();
//             reader.onload = (e) => {
//               img.src = e.target.result;
//               img.onload = function () {
//                 const data = imgUtil.rotateImage(img, img.width, img.height, orient);
//                 const newFile = imgUtil.dataURLtoFile(data, file.name);

//                 currentFile.url = URL.createObjectURL(newFile);

//                 uploadFiles.splice(currentFileIndex, 1, currentFile);
//                 for (const p in newFile) {
//                   if (Object.prototype.hasOwnProperty.call(newFile, p)) {
//                     file[p] = newFile[p];
//                   }
//                 }
//                 file.url = URL.createObjectURL(newFile);
//                 resolve(newFile);
//               };
//             };
//             reader.readAsDataURL(file);
//           } else {
//             resolve(file);
//           }
//         });
//       });
//     },
//     handelRemove(file) {
//       const fileId = file.id;
//       for (let index = this.fileList.length - 1; index >= 0; index--) {
//         const element = this.fileList[index];
//         if (element.id === fileId) {
//           this.fileList.splice(index, 1);
//         }
//       }
//     },
//     handlePreview(file) {
//       if (file.url) {
//         this.dialogVisible = true;
//         this.currentImg = file.url;
//       }
//     },
//     // 清空文件列表方法
//     clearFiles() {
//       this.$refs.elUpload.clearFiles();
//     },
//     // 手动上传文件方法
//     submit() {
//       this.$refs.elUpload.submit();
//       this.closeLoading();
//       this.$wait.end('load');
//     },
//     // 文件状态改变时的钩子
//     fileChange(file, fileList) {
//       if (file.status === 'success' || file.status === 'ready') {
//         this.$emit('fileChange', fileList);
//         const showNum = this.$attrs.showFileNum;
//         if (showNum) {
//           this.fileList = fileList.slice(-showNum);
//         }
//       }
//     }
//   }
// };
// </script>
// <style lang="scss" scoped>
// .preview-img {
//   width: 100%;
// }
// .vupload {
//   float: left;
//   .specialUpload {
//     color: #409eff;
//   }
// }
// </style>
