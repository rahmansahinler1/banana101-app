<template>
  <div class="app-container">
    <Sidebar />
    <div class="app-content">
      <Uploads />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Uploads from '@/components/Uploads.vue'

export default {
  name: 'Panel4',
  components: {
    Sidebar,
    Uploads,
  },
}
</script>
