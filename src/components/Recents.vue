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
                  <!-- Like Button Badge -->
                  <button
                    class="gallery-like-badge"
                    @click="toggleLike(generation.id)"
                  >
                    <i
                      :class="generation.faved ? 'bi bi-heart-fill' : 'bi bi-heart'"
                      :style="{ color: generation.faved ? '#dc3545' : 'white' }"
                    ></i>
                  </button>
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
                      @click="toggleLike(generation.id)"
                    >
                      <i
                        :class="generation.faved ? 'bi bi-heart-fill' : 'bi bi-heart'"
                        :style="{ color: generation.faved ? '#dc3545' : 'inherit' }"
                      ></i>
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
import { deleteGeneration, updateFav } from '@/api/api'

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
    async toggleLike(generationId) {
      // Find the generation in store
      const generation = this.userStore.previewGenerations.find((g) => g.id === generationId)
      if (!generation) return

      // Optimistic update - toggle immediately in UI
      const previousState = generation.faved
      generation.faved = !generation.faved

      // Update backend
      try {
        const userId = window.APP_CONFIG.userId
        const result = await updateFav(userId, generationId)

        if (!result.success) {
          // Revert on failure
          generation.faved = previousState
          alert('Failed to update like')
        }
      } catch (error) {
        // Revert on error
        generation.faved = previousState
        console.error('Error updating like:', error)
        alert('Error updating like')
      }
    },
  },
}
</script>
