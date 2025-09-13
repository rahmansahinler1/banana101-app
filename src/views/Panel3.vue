<template>
  <div class="app-container">
    <Sidebar />
    <div class="app-content">
      <Recents />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Recents from '@/components/Recents.vue'

export default {
  name: 'secondPanel',
  components: {
    Sidebar,
    Recents,
  },
}
</script>
