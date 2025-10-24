<template>
  <!-- Recent Generations Page -->
  <div class="container-fluid">
    <h1 class="dashboard-title mb-3 text-center">Recent Generations</h1>

    <div class="row">
      <div class="col-12 mb-4">
        <div class="card" style="min-height: 85vh">
          <div class="card-body">
            <!-- Filter Buttons -->
            <div class="gallery-filters mb-4">
              <button
                class="btn btn-sm me-2"
                :class="selectedFilter === 'all' ? 'btn-secondary' : 'btn-outline-secondary'"
                @click="selectFilter('all')"
              >
                All
                <span class="badge bg-light text-dark ms-1">{{ generationCounts.all }}</span>
              </button>
              <button
                class="btn btn-sm me-2"
                :class="selectedFilter === 'favorites' ? 'btn-secondary' : 'btn-outline-secondary'"
                @click="selectFilter('favorites')"
              >
                Favorites
                <span class="badge bg-light text-dark ms-1">{{ generationCounts.favorites }}</span>
              </button>
            </div>

            <!-- Empty State - No generations at all -->
            <div v-if="allGenerations.length === 0" class="text-center py-5">
              <i class="bi bi-images" style="font-size: 4rem; color: #5d5d5d"></i>
              <p class="nav-text text-muted mt-3">No generated outfits yet</p>
              <p class="nav-text text-muted">
                Create your first outfit in the <router-link to="/design">Design</router-link> page
              </p>
            </div>

            <!-- Empty State - No favorites -->
            <div
              v-else-if="selectedFilter === 'favorites' && getGenerationPreviews.length === 0"
              class="text-center py-5"
            >
              <i class="bi bi-heart" style="font-size: 4rem; color: #5d5d5d"></i>
              <p class="nav-text text-muted mt-3">No favorite outfits yet</p>
              <p class="nav-text text-muted">
                Click the <i class="bi bi-heart-fill" style="color: #dc3545"></i> icon on any
                generation to add it to favorites
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
                <div
                  class="gallery-image-wrapper"
                  @click="openGeneratedImageModal(generation.id)"
                  style="cursor: pointer"
                >
                  <!-- Like Button Badge -->
                  <button class="gallery-like-badge" @click.stop="toggleLike(generation.id)">
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

    <!-- Generated Image Modal -->
    <div
      class="modal fade"
      :class="{ show: showGeneratedModal, 'd-block': showGeneratedModal }"
      tabindex="-1"
      v-if="showGeneratedModal"
      @click.self="closeGeneratedModal"
    >
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title">Generated Image</h5>
            <button type="button" class="btn-close" @click="closeGeneratedModal"></button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body text-center">
            <div v-if="loadingFullImage" class="py-5">
              <div class="spinner-border text-primary mb-2" role="status"></div>
              <p class="nav-text text-muted">Loading full image...</p>
            </div>
            <img
              v-else-if="fullGeneratedImage"
              :src="fullGeneratedImage"
              alt="Generated outfit"
              class="img-fluid"
              style="max-height: 70vh"
            />
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer justify-content-between">
            <button type="button" class="btn btn-outline-secondary" @click="closeGeneratedModal">
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="downloadGeneratedImage"
              :disabled="!fullGeneratedImage"
            >
              <i class="bi bi-download me-2"></i>Download
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Backdrop -->
    <div v-if="showGeneratedModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import useUserStore from '@/stores/user'
import { mapStores } from 'pinia'
import { deleteGeneration, updateFav, getFullGeneratedImage } from '@/api/api'

export default {
  name: 'Recents',
  data() {
    return {
      deleteConfirmId: null,
      selectedFilter: 'all',
      showGeneratedModal: false,
      fullGeneratedImage: null,
      loadingFullImage: false,
    }
  },
  computed: {
    ...mapStores(useUserStore),
    allGenerations() {
      return this.userStore?.previewGenerations || []
    },
    getGenerationPreviews() {
      if (this.selectedFilter === 'favorites') {
        return this.allGenerations.filter((gen) => gen.faved)
      }
      return this.allGenerations
    },
    generationCounts() {
      return {
        all: this.allGenerations.length,
        favorites: this.allGenerations.filter((gen) => gen.faved).length,
      }
    },
  },
  methods: {
    selectFilter(filter) {
      this.selectedFilter = filter
    },
    showDeleteConfirm(imageId) {
      this.deleteConfirmId = imageId
    },
    cancelDelete() {
      this.deleteConfirmId = null
    },
    async deleteGeneration(imageId) {
      try {
        const result = await deleteGeneration(imageId)

        if (result.success) {
          this.userStore.removePreviewGeneration(imageId)
          this.userStore.updateRecentsLeft(result.data.recents_left)
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
        const result = await updateFav(generationId)

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
    async openGeneratedImageModal(generationId) {
      this.showGeneratedModal = true
      this.loadingFullImage = true
      this.fullGeneratedImage = null

      try {
        const result = await getFullGeneratedImage(generationId)

        if (result.success) {
          this.fullGeneratedImage = `data:image/jpeg;base64,${result.data.image_base64}`
        } else {
          alert('Failed to load full image')
          this.showGeneratedModal = false
        }
      } catch (error) {
        console.error('Error loading full image:', error)
        alert('Error loading image')
        this.showGeneratedModal = false
      } finally {
        this.loadingFullImage = false
      }
    },
    closeGeneratedModal() {
      this.showGeneratedModal = false
      this.fullGeneratedImage = null
    },
    downloadGeneratedImage() {
      if (!this.fullGeneratedImage) return

      const link = document.createElement('a')
      link.href = this.fullGeneratedImage
      link.download = `generated-outfit-${Date.now()}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
  },
}
</script>
