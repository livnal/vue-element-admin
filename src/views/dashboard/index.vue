<template>
  <div class="dashboard-container">
    <iframe :src="videoUrl" width="100%" height="500" />
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      videoUrl: 'https://open.umnet.cn/umrtc/#/videoMeeting?h=qaswedrf12&t=video&m=sfufirst&n=12'
    }
  },
  computed: {
  },
  created() {
  }
}
</script>
