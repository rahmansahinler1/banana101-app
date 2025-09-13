<template>
  <Sidebar />
  <MyClothes />
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import MyClothes from '@/components/MyClothes.vue'

export default {
  name: 'app',
  components: {
    Sidebar,
    MyClothes,
  },
}
</script>
