<template>
  <div class="dashboard-container">
    <el-button
      type="primary"
      @click="showDialog"
    >开启视频</el-button>   <el-button
      type="primary"
      @click="closeDialog"
    >关闭视频</el-button>
    <iframe :src="videoUrl" width="100%" height="500" allow="camera;microphone" />

    <div v-show="visible" class="dialogMeetting">
      shipin
    </div>
  </div>
</template>

<script>
// import UmVideo2 from 'umvideo2-client'

export default {
  name: 'Dashboard',
  data() {
    return {
      // videoUrl: 'https://open.umnet.cn/umrtc/#/videoMeeting?h=qaswedrf12&t=video&m=sfufirst&n=12',
      videoUrl: 'https://43.143.229.145:4443/#/videoMeeting?h=754deb587430609ad4067e413f73e3a0-282870985&t=video&m=sfufirst&n=jl',
      visible: false
    }
  },
  computed: {
  },
  created() {
  },
  mounted() {
    // console.log('>>>>', UmVideo2.version)
  },
  methods: {
    showDialog() {
      this.visible = true
    },
    closeDialog() {
      this.visible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.dashboard-container{
  position: relative;
  width: 100%;
  height: 100%;
}
.dialogMeetting{
  width: 900px;
  height: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -450px;
  margin-top: -100px;
  background: rgba(0,0,0,0.5);
}</style>
