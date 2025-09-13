<template>
  <div class="app-container">
    <Sidebar />
    <div class="app-content">
      <TryOutfits />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import TryOutfits from '@/components/TryOutfits.vue'

export default {
  name: 'secondPanel',
  components: {
    Sidebar,
    TryOutfits,
  },
}
</script>
