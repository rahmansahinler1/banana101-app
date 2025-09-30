import { defineStore } from 'pinia'
import { initializeUser } from '@/api/api'

export default defineStore('user', {
  state: () => ({
    userLoggedIn: false,
    userCred: null,
    pictureCounts: { yourself: 0, clothing: 0 },
  }),
  actions: {
    async initialize(userId) {
      try {
        const result = await initializeUser(userId)
        this.userLoggedIn = true
        this.userCred = result.data.user_info
        this.pictureCounts = result.data.picture_counts
      } catch (error) {
        console.log(error)
      }
    },
    incrementPictureCounts(category) {
      this.pictureCounts[category]++
    },
  },
})
