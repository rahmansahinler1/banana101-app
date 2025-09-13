<template>
  <div class="app-container">
    <Sidebar />
    <div class="app-content">
      <Usage />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Usage from '@/components/Usage.vue'

export default {
  name: 'Panel5',
  components: {
    Sidebar,
    Usage,
  },
}
</script>
