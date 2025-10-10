<template>
  <div class="container-fluid h-100 d-flex flex-column">
    <h1 class="dashboard-title mb-3 text-center">Create Your Outfit</h1>

    <div class="row flex-grow-1 align-items-center">
      <!-- Yourself -->
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <div class="card-body d-flex flex-column">
            <h3 class="card-title mb-3 text-center">
              <i class="bi bi-person-fill me-2"></i>Yourself
            </h3>
            <div
              class="selection-card"
              :class="{ disabled: loadingCards.yourself || errorCards.yourself }"
              @click="!loadingCards.yourself && !errorCards.yourself && openModal('yourself')"
            >
              <!-- Error State -->
              <div v-if="errorCards.yourself" class="card-error-overlay">
                <i class="bi bi-exclamation-circle text-danger" style="font-size: 3rem"></i>
                <p class="nav-text text-danger mb-0 mt-2">{{ errorCards.yourself }}</p>
                <button
                  class="btn btn-sm btn-outline-danger mt-2"
                  @click.stop="dismissError('yourself')"
                >
                  Dismiss
                </button>
              </div>

              <!-- Loading State -->
              <div v-else-if="loadingCards.yourself" class="card-loading-overlay">
                <div class="spinner-border text-primary mb-2" role="status"></div>
                <p class="nav-text text-muted mb-0">Loading image...</p>
              </div>

              <!-- Selected Image -->
              <img
                v-else-if="selections.yourself"
                :src="selections.yourself.base64"
                alt="Selected yourself image"
              />

              <!-- Placeholder -->
              <p v-else class="nav-text text-muted">
                <i class="bi bi-hand-index-thumb me-2"></i>Click to select
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Clothing -->
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <div class="card-body d-flex flex-column">
            <h3 class="card-title mb-3 text-center">
              <i class="bi bi-tencent-qq me-2"></i>Clothing
            </h3>
            <div
              class="selection-card"
              :class="{ disabled: loadingCards.clothing || errorCards.clothing }"
              @click="!loadingCards.clothing && !errorCards.clothing && openModal('clothing')"
            >
              <!-- Error State -->
              <div v-if="errorCards.clothing" class="card-error-overlay">
                <i class="bi bi-exclamation-circle text-danger" style="font-size: 3rem"></i>
                <p class="nav-text text-danger mb-0 mt-2">{{ errorCards.clothing }}</p>
                <button
                  class="btn btn-sm btn-outline-danger mt-2"
                  @click.stop="dismissError('clothing')"
                >
                  Dismiss
                </button>
              </div>

              <!-- Loading State -->
              <div v-else-if="loadingCards.clothing" class="card-loading-overlay">
                <div class="spinner-border text-primary mb-2" role="status"></div>
                <p class="nav-text text-muted mb-0">Loading image...</p>
              </div>

              <!-- Selected Image -->
              <img
                v-else-if="selections.clothing"
                :src="selections.clothing.base64"
                alt="Selected clothing image"
              />

              <!-- Placeholder -->
              <p v-else class="nav-text text-muted">
                <i class="bi bi-hand-index-thumb me-2"></i>Click to select
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Style -->
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <div class="card-body d-flex flex-column">
            <h3 class="card-title mb-3 text-center"><i class="bi bi-star-fill me-2"></i>Style</h3>
            <div
              class="selection-card"
              :class="{ disabled: loadingCards.style || errorCards.style }"
              @click="!loadingCards.style && !errorCards.style && openModal('style')"
            >
              <!-- Error State -->
              <div v-if="errorCards.style" class="card-error-overlay">
                <i class="bi bi-exclamation-circle text-danger" style="font-size: 3rem"></i>
                <p class="nav-text text-danger mb-0 mt-2">{{ errorCards.style }}</p>
                <button
                  class="btn btn-sm btn-outline-danger mt-2"
                  @click.stop="dismissError('style')"
                >
                  Dismiss
                </button>
              </div>

              <!-- Loading State -->
              <div v-else-if="loadingCards.style" class="card-loading-overlay">
                <div class="spinner-border text-primary mb-2" role="status"></div>
                <p class="nav-text text-muted mb-0">Loading image...</p>
              </div>

              <!-- Selected Image -->
              <img
                v-else-if="selections.style"
                :src="selections.style.base64"
                alt="Selected style image"
              />

              <!-- Placeholder -->
              <p v-else class="nav-text text-muted">
                <i class="bi bi-hand-index-thumb me-2"></i>Click to select
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Generate Button -->
    <div class="row">
      <div class="col-12 text-center mb-4">
        <button class="generate-btn">
          <span>Generate</span>
          <span><i class="bi bi-magic"></i> 20</span>
        </button>
      </div>
    </div>

    <!-- Selection Modal -->
    <div
      class="modal fade"
      :class="{ show: showModal, 'd-block': showModal }"
      tabindex="-1"
      v-if="showModal"
      @click.self="closeModal"
    >
      <div class="modal-dialog modal-xl modal-dialog-scrollable">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h5 class="modal-title">Select {{ modalCategory }}</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body">
            <!-- Empty State -->
            <div v-if="filteredImages.length === 0" class="text-center py-5">
              <p class="nav-text text-muted">No images available. Please upload images first.</p>
            </div>

            <!-- Gallery Grid -->
            <div v-else class="gallery-grid">
              <div
                v-for="image in filteredImages"
                :key="image.id"
                class="gallery-item"
                :class="{ selected: selectedImageId === image.id }"
                @click="selectImage(image.id)"
                @dblclick="handleDoubleClick(image.id)"
              >
                <div class="gallery-image-wrapper">
                  <img :src="image.base64" :alt="modalCategory" />
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" @click="closeModal">
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-primary"
              :disabled="!selectedImageId"
              @click="confirmSelection"
            >
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Backdrop -->
    <div v-if="showModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import useUserStore from '@/stores/user'
import { mapStores } from 'pinia'
import { getFullImage } from '@/api/api'

export default {
  name: 'Design',
  data() {
    return {
      showModal: false,
      modalCategory: null,
      selectedImageId: null,
      selections: {
        yourself: null,
        clothing: null,
        style: null,
      },
      loadingCards: {
        yourself: false,
        clothing: false,
        style: false,
      },
      errorCards: {
        yourself: null,
        clothing: null,
        style: null,
      },
      errorTimeouts: {
        yourself: null,
        clothing: null,
        style: null,
      },
      pendingRequests: {
        yourself: null,
        clothing: null,
        style: null,
      },
    }
  },
  computed: {
    ...mapStores(useUserStore),
    filteredImages() {
      if (!this.modalCategory) return []

      if (this.modalCategory === 'yourself') {
        return this.userStore?.previewImages?.yourself || []
      } else if (this.modalCategory === 'clothing') {
        return this.userStore?.previewImages?.clothing || []
      } else if (this.modalCategory === 'style') {
        // For now, use clothing images for style
        // Can be updated later to use style presets
        return this.userStore?.previewImages?.clothing || []
      }

      return []
    },
  },
  methods: {
    openModal(category) {
      this.modalCategory = category
      this.showModal = true
      this.selectedImageId = null
    },
    closeModal() {
      this.showModal = false
      this.selectedImageId = null
      this.modalCategory = null
    },
    selectImage(imageId) {
      this.selectedImageId = imageId
    },
    handleDoubleClick(imageId) {
      this.selectedImageId = imageId
      this.confirmSelection()
    },
    async confirmSelection() {
      if (!this.selectedImageId || !this.modalCategory) return

      // Store values before clearing state
      const selectedId = this.selectedImageId
      const category = this.modalCategory

      // Create unique request ID to handle race conditions
      const requestId = Date.now()
      this.pendingRequests[category] = requestId

      // Close modal and reset state
      this.showModal = false
      this.selectedImageId = null
      this.modalCategory = null

      this.loadingCards[category] = true

      try {
        const userId = window.APP_CONFIG.userId
        const result = await getFullImage(userId, selectedId)

        // Check if this is still the latest request (race condition protection)
        if (this.pendingRequests[category] !== requestId) {
          return // Ignore outdated response
        }

        if (result.success) {
          this.selections[category] = {
            id: selectedId,
            base64: `data:image/jpeg;base64,${result.data.image_base64}`,
          }
          this.loadingCards[category] = false
          this.pendingRequests[category] = null
        } else {
          // API returned success: false
          this.loadingCards[category] = false
          this.pendingRequests[category] = null
          this.showError(category, result.error || 'Failed to load image')
        }
      } catch (error) {
        // Only show error if still latest request
        if (this.pendingRequests[category] === requestId) {
          this.loadingCards[category] = false
          this.pendingRequests[category] = null
          this.showError(category, 'Network error. Please try again.')
        }
      }
    },
    showError(category, message) {
      // Clear existing timeout if any
      if (this.errorTimeouts[category]) {
        clearTimeout(this.errorTimeouts[category])
      }

      this.errorCards[category] = message

      // Store timeout ID for cleanup
      this.errorTimeouts[category] = setTimeout(() => {
        this.errorCards[category] = null
        this.errorTimeouts[category] = null
      }, 5000)
    },
    dismissError(category) {
      // Clear timeout if exists
      if (this.errorTimeouts[category]) {
        clearTimeout(this.errorTimeouts[category])
        this.errorTimeouts[category] = null
      }
      this.errorCards[category] = null
    },
    handleEscape(event) {
      if (event.key === 'Escape' && this.showModal) {
        this.closeModal()
      }
    },
  },
  mounted() {
    window.addEventListener('keydown', this.handleEscape)
  },
  beforeUnmount() {
    // Clear all timeouts on component destroy
    Object.values(this.errorTimeouts).forEach((timeout) => {
      if (timeout) clearTimeout(timeout)
    })
    // Remove event listener
    window.removeEventListener('keydown', this.handleEscape)
  },
}
</script>
