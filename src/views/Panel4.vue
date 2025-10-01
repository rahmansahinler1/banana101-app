<template>
  <div class="app-container">
    <Sidebar />
    <div class="app-content">
      <Upload />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Upload from '@/components/Upload.vue'

export default {
  name: 'Panel4',
  components: {
    Sidebar,
    Upload,
  },
}
</script>
