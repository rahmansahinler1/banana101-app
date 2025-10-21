import { defineStore } from 'pinia'
import { getUser, getPreviewImages } from '@/api/api'

export default defineStore('user', {
  state: () => ({
    userId: null,
    userLoggedIn: false,
    userCred: {
      name: '',
      surname: '',
      email: '',
      type: 'trial',
      pictureUrl: '',
      nextRenewalDate: null,
    },
    userLimits: { uploadsLeft: null, generationsLeft: null, recentsLeft: null },
    previewImages: { yourself: [], clothing: [] },
    previewGenerations: [],
  }),
  getters: {
    imageCounts(state) {
      return {
        yourself: state.previewImages.yourself.length,
        clothing: state.previewImages.clothing.length,
        all: state.previewImages.yourself.length + state.previewImages.clothing.length,
      }
    },
  },
  actions: {
    async initialize(userId) {
      this.userId = userId

      try {
        const user_fetch = await getUser(userId)
        if (user_fetch.success) {
          this.userLoggedIn = true
          this.userCred.name = user_fetch.data.user_info['name']
          this.userCred.surname = user_fetch.data.user_info['surname']
          this.userCred.email = user_fetch.data.user_info['email']
          this.userCred.type = user_fetch.data.user_info['type']
          this.userCred.pictureUrl = user_fetch.data.user_info['picture_url']
          this.userCred.nextRenewalDate = user_fetch.data.user_info['next_renewal_date']
          this.userLimits.uploadsLeft = user_fetch.data.user_info['uploads_left']
          this.userLimits.generationsLeft = user_fetch.data.user_info['generations_left']
          this.userLimits.recentsLeft = user_fetch.data.user_info['recents_left']
        }

        const preview_fetch = await getPreviewImages(userId)
        if (preview_fetch.success) {
          // Map and add data for images
          const image_previews = preview_fetch.data.image_previews

          this.previewImages.yourself = (image_previews.yourself || []).map((img) => ({
            id: img.id,
            base64: `data:image/jpeg;base64,${img.base64}`,
            faved: img.faved,
            created_at: img.created_at,
          }))

          this.previewImages.clothing = (image_previews.clothing || []).map((img) => ({
            id: img.id,
            base64: `data:image/jpeg;base64,${img.base64}`,
            faved: img.faved,
            created_at: img.created_at,
          }))

          // Map and add data for generations
          const generation_previews = preview_fetch.data.generation_previews

          this.previewGenerations = (generation_previews || []).map((img) => ({
            id: img.id,
            base64: `data:image/jpeg;base64,${img.base64}`,
            faved: img.faved,
            created_at: img.created_at,
          }))
        }
      } catch (error) {
        console.log(error)
      }
    },
    addPreviewImage(category, imageData) {
      this.previewImages[category].push({
        id: imageData.image_id,
        base64: `data:image/jpeg;base64,${imageData.preview_base64}`,
        created_at: imageData.created_at,
      })
    },
    removePreviewImage(category, imageId) {
      this.previewImages[category] = this.previewImages[category].filter(
        (img) => img.id !== imageId,
      )
    },
    addPreviewGeneration(imageData) {
      this.previewGenerations.push({
        id: imageData.image_id,
        base64: `data:image/jpeg;base64,${imageData.preview_base64}`,
        created_at: imageData.created_at,
      })
    },
    removePreviewGeneration(imageId) {
      this.previewGenerations = this.previewGenerations.filter((img) => img.id !== imageId)
    },
    updateUploadsLeft(newValue) {
      this.userLimits.uploadsLeft = newValue
    },
    updateGenerationsLeft(newValue) {
      this.userLimits.generationsLeft = newValue
    },
    updateRecentsLeft(newValue) {
      this.userLimits.recentsLeft = newValue
    },
  },
})
