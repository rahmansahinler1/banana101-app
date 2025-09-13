<template>
  <div class="app-container">
    <Sidebar />
    <div class="app-content">
      <MyPictures />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import MyPictures from '@/components/MyPictures.vue'

export default {
  name: 'firstPanel',
  components: {
    Sidebar,
    MyPictures,
  },
}
</script>
