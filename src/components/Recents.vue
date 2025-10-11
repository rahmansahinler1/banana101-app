<template>
  <!-- Recent Generations Page -->
  <div class="container-fluid">
    <h1 class="dashboard-title mb-3 text-center">Recent Generations</h1>

    <div class="row">
      <div class="col-12 mb-4">
        <div class="card" style="min-height: 85vh">
          <div class="card-body">
            <!-- Empty State -->
            <div v-if="getGenerationPreviews.length === 0" class="text-center py-5">
              <i class="bi bi-images" style="font-size: 4rem; color: #5d5d5d"></i>
              <p class="nav-text text-muted mt-3">No generated outfits yet</p>
              <p class="nav-text text-muted">
                Create your first outfit in the <router-link to="/design">Design</router-link> page
              </p>
            </div>

            <!-- Gallery Grid -->
            <div v-else class="gallery-grid">
              <!-- Generation items -->
              <div
                class="gallery-item"
                v-for="generation in getGenerationPreviews"
                :key="generation.id"
              >
                <div class="gallery-image-wrapper">
                  <!-- Image -->
                  <div class="gallery-placeholder">
                    <img :src="generation.base64" alt="Generated outfit" />
                  </div>
                </div>
                <!-- Action Buttons -->
                <div class="gallery-actions">
                  <!-- Show confirmation if this image is being deleted -->
                  <template v-if="deleteConfirmId === generation.id">
                    <button
                      class="btn btn-sm gallery-action-btn"
                      @click="deleteGeneration(generation.id)"
                    >
                      <i class="bi bi-check-lg"></i>
                    </button>
                    <button class="btn btn-sm gallery-action-btn" @click="cancelDelete">
                      <i class="bi bi-x-lg"></i>
                    </button>
                  </template>

                  <!-- Normal buttons -->
                  <template v-else>
                    <button
                      class="btn btn-sm gallery-action-btn"
                      @click="downloadGeneratedImage(generation.base64)"
                    >
                      <i class="bi bi-download"></i>
                    </button>
                    <button
                      class="btn btn-sm gallery-action-btn"
                      @click="showDeleteConfirm(generation.id)"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useUserStore from '@/stores/user'
import { mapStores } from 'pinia'
import { deleteGeneration } from '@/api/api'

export default {
  name: 'Recents',
  data() {
    return {
      deleteConfirmId: null,
    }
  },
  computed: {
    ...mapStores(useUserStore),
    getGenerationPreviews() {
      return this.userStore?.previewGenerations || []
    },
  },
  methods: {
    showDeleteConfirm(imageId) {
      this.deleteConfirmId = imageId
    },
    cancelDelete() {
      this.deleteConfirmId = null
    },
    async deleteGeneration(imageId) {
      try {
        const userId = window.APP_CONFIG.userId
        const result = await deleteGeneration(userId, imageId)

        if (result.success) {
          // Remove from store
          this.userStore.removePreviewGeneration(imageId)
          this.deleteConfirmId = null
        } else {
          alert('Failed to delete image')
        }
      } catch (error) {
        console.error('Delete error:', error)
        alert('Error deleting image')
      }
    },
    downloadGeneratedImage(imageBase64) {
      const link = document.createElement('a')
      link.href = imageBase64
      link.download = `generated-outfit-${Date.now()}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
  },
}
</script>
