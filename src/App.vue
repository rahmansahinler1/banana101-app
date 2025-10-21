<template>
  <RouterView />
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      cookieCheckInterval: null
    }
  },
  mounted() {
    window.addEventListener('storage', this.handleStorageChange)
    this.startCookieValidation()
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.handleStorageChange)
    if (this.cookieCheckInterval) {
      clearInterval(this.cookieCheckInterval)
    }
  },
  methods: {
    handleStorageChange(event) {
      if (event.key === 'logout-event') {
        const domain = import.meta.env.VITE_COOKIE_DOMAIN
        document.cookie = `authToken=; domain=${domain}; path=/; max-age=0`
        window.location.href = import.meta.env.VITE_WEBSITE_URL
      }
    },
    startCookieValidation() {
      this.cookieCheckInterval = setInterval(() => {
        const cookieMatch = document.cookie.match(/authToken=([^;]+)/)
        if (!cookieMatch) {
          window.location.href = import.meta.env.VITE_WEBSITE_URL
        }
      }, 60000)
    }
  }
}
</script>
