<template>
  <div class="app-container">
    <Sidebar />
    <div class="app-content">
      <Profile />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Profile from '@/components/Profile.vue'

export default {
  name: 'Panel5',
  components: {
    Sidebar,
    Profile,
  },
}
</script>
