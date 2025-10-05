import { defineStore } from 'pinia'
import { getUser, getPreviewImages } from '@/api/api'

export default defineStore('user', {
  state: () => ({
    userLoggedIn: false,
    userCred: null,
    previewImages: { yourself: [], clothing: [] },
  }),
  getters: {
    pictureCounts(state) {
      return {
        yourself: state.previewImages.yourself.length,
        clothing: state.previewImages.clothing.length,
      }
    },
  },
  actions: {
    async initialize(userId) {
      try {
        const user_fetch = await getUser(userId)
        if (user_fetch.success) {
          this.userLoggedIn = true
          this.userCred = user_fetch.data.user_info
        }

        const preview_fetch = await getPreviewImages(userId)
        if (preview_fetch.success) {
          const previews = preview_fetch.data.previews
          this.previewImages.yourself = previews.yourself || []
          this.previewImages.clothing = previews.clothing || []
        }
      } catch (error) {
        console.log(error)
      }
    },
    addPreviewImage(category, imageData) {
      this.previewImages[category].push({
        id: imageData.picture_id,
        base64: `data:image/jpeg;base64,${imageData.preview_base64}`,
      })
    },
  },
})
