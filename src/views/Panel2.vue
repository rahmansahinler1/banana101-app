<template>
  <div class="app-container">
    <Sidebar />
    <div class="app-content">
      <Design />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Design from '@/components/Design.vue'

export default {
  name: 'secondPanel',
  components: {
    Sidebar,
    Design,
  },
}
</script>
