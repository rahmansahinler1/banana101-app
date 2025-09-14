import { defineStore } from 'pinia'
import { initializeUser } from '@/api/api'

export default defineStore('user', {
  state: () => ({
    userLoggedIn: false,
    userCred: null,
  }),
  actions: {
    async initialize(userId) {
      try {
        const userCred = await initializeUser(userId)
        this.userCred = userCred
        this.userLoggedIn = true
        console.log(userCred)
      } catch (error) {
        console.log(error)
      }
    },
  },
})
