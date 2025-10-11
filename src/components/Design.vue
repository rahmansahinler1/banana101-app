<template>
  <div class="container-fluid h-100 d-flex flex-column">
    <h1 class="dashboard-title mb-3 text-center">Create Your Outfit</h1>

    <div class="row h-100 align-items-center justify-content-center px-3 gx-3">
      <!-- Yourself Card -->
      <div class="col-auto">
        <h3 class="card-title mb-3 text-center"><i class="bi bi-person-fill me-2"></i>Yourself</h3>
        <div
          class="selection-card"
          :class="{ disabled: loadingCards.yourself || errorCards.yourself || isGenerating }"
          @click="
            !loadingCards.yourself && !errorCards.yourself && !isGenerating && openModal('yourself')
          "
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
          <p v-else class="nav-text"><i class="bi bi-hand-index-thumb me-1"></i>Click to select</p>
        </div>
        <div class="d-flex justify-content-center mt-3">
          <button
            class="btn btn-outline-secondary btn-sm"
            :disabled="!selections.yourself || isGenerating"
            @click="openModal('yourself')"
          >
            <i class="bi bi-arrow-clockwise me-1"></i> Replace
          </button>
        </div>
      </div>

      <!-- Plus Icon -->
      <div class="col-auto d-flex align-items-center" style="margin-top: 3rem">
        <img src="/assets/img/ic_swap_add.svg" alt="plus" class="separator-icon" />
      </div>

      <!-- Clothing Card -->
      <div class="col-auto">
        <h3 class="card-title mb-3 text-center"><i class="bi bi-tencent-qq me-2"></i>Clothing</h3>
        <div
          class="selection-card"
          :class="{ disabled: loadingCards.clothing || errorCards.clothing || isGenerating }"
          @click="
            !loadingCards.clothing && !errorCards.clothing && !isGenerating && openModal('clothing')
          "
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
          <p v-else class="nav-text"><i class="bi bi-hand-index-thumb me-1"></i>Click to select</p>
        </div>
        <div class="d-flex justify-content-center mt-3">
          <button
            class="btn btn-outline-secondary btn-sm"
            :disabled="!selections.clothing || isGenerating"
            @click="openModal('clothing')"
          >
            <i class="bi bi-arrow-clockwise me-1"></i> Replace
          </button>
        </div>
      </div>

      <!-- Result Arrow Icon -->
      <div class="col-auto d-flex align-items-center" style="margin-top: 3rem">
        <img src="/assets/img/ic_swap_result.svg" alt="result" class="separator-icon" />
      </div>

      <!-- Generated Result Card -->
      <div class="col-auto">
        <h3 class="card-title mb-3 text-center"><i class="bi bi-camera-fill me-1"></i>Result</h3>
        <div
          class="selection-card"
          :class="{ clickable: generatedImage }"
          @click="generatedImage && openGeneratedImageModal()"
        >
          <!-- Generating State -->
          <div v-if="isGenerating" class="card-loading-overlay">
            <div class="spinner-border text-primary mb-2" role="status"></div>
          </div>

          <!-- Generated Image -->
          <img v-else-if="generatedImage" :src="generatedImage" alt="Generated result" />

          <!-- Select Pictures condition -->
          <p v-else-if="!canGenerate" class="nav-text">
            <i class="bi bi-arrow-left-circle-fill me-1"></i>Select Pictures
          </p>

          <!-- Can generate trigger -->
          <p v-else class="nav-text"><i class="bi bi-magic me-1"></i>Click Generate Button</p>
        </div>

        <!-- Download button -->
        <div class="d-flex justify-content-center mt-3">
          <button
            class="btn btn-outline-secondary btn-sm"
            :disabled="!generatedImage"
            @click="downloadGeneratedImage"
          >
            <i class="bi bi-download me-2"></i> Download
          </button>
        </div>
      </div>
    </div>

    <!-- Generate Button -->
    <div class="row">
      <div class="col-12 text-center mb-4">
        <button
          class="generate-btn"
          :class="{ 'generate-btn-active': canGenerate }"
          :disabled="!canGenerate"
          @click="generateImage"
        >
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
            <h5 class="modal-title">
              {{ modalCategory === 'yourself' ? 'Select Your Picture' : 'Select Clothing Picture' }}
            </h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body">
            <!-- Gallery Grid -->
            <div class="gallery-grid">
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
              <!-- Upload button -->
              <div class="gallery-item">
                <div class="gallery-image-wrapper">
                  <div class="gallery-upload-content">
                    <i
                      class="bi bi-plus-circle-fill gallery-upload-icon"
                      @click="this.$router.push('/upload')"
                    ></i>
                  </div>
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
            <img
              v-if="generatedImage"
              :src="generatedImage"
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
            <button type="button" class="btn btn-primary" @click="downloadGeneratedImage">
              <i class="bi bi-download me-2"></i>Download
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Generated Modal Backdrop -->
    <div v-if="showGeneratedModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import useUserStore from '@/stores/user'
import { mapStores } from 'pinia'
import { getFullImage, generateImage } from '@/api/api'

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
      },
      loadingCards: {
        yourself: false,
        clothing: false,
      },
      errorCards: {
        yourself: null,
        clothing: null,
      },
      errorTimeouts: {
        yourself: null,
        clothing: null,
      },
      pendingRequests: {
        yourself: null,
        clothing: null,
      },
      showGeneratedModal: false,
      generatedImage: null,
      isGenerating: false,
    }
  },
  computed: {
    ...mapStores(useUserStore),
    canGenerate() {
      return this.selections.yourself && this.selections.clothing && !this.isGenerating
    },
    filteredImages() {
      if (!this.modalCategory) return []

      if (this.modalCategory === 'yourself') {
        return this.userStore?.previewImages?.yourself || []
      } else if (this.modalCategory === 'clothing') {
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
    async generateImage() {
      if (!this.selections.yourself || !this.selections.clothing) return

      this.isGenerating = true

      try {
        const userId = window.APP_CONFIG.userId
        const result = await generateImage(
          userId,
          this.selections.yourself.id,
          this.selections.clothing.id,
        )

        if (result.success) {
          this.generatedImage = `data:image/jpeg;base64,${result.data.image_base64}`
        } else {
          alert(`Generation failed: ${result.error || 'Unknown error'}`)
        }
      } catch (error) {
        alert(`Generation error: ${error.message}`)
      } finally {
        this.isGenerating = false
      }
    },
    openGeneratedImageModal() {
      if (this.generatedImage) {
        this.showGeneratedModal = true
      }
    },
    closeGeneratedModal() {
      this.showGeneratedModal = false
    },
    downloadGeneratedImage() {
      if (!this.generatedImage) return

      const link = document.createElement('a')
      link.href = this.generatedImage
      link.download = `generated-outfit-${Date.now()}.jpg`

      document.body.appendChild(link)
      link.click()

      document.body.removeChild(link)
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
