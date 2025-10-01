<template>
  <div class="app-container">
    <Sidebar />
    <div class="app-content">
      <Gallery />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Gallery from '@/components/Gallery.vue'

export default {
  name: 'firstPanel',
  components: {
    Sidebar,
    Gallery,
  },
}
</script>
