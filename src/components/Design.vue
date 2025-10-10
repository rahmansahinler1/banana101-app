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
            <div class="selection-card" @click="openModal('yourself')">
              <img
                v-if="selections.yourself"
                :src="selections.yourself.base64"
                alt="Selected yourself image"
              />
              <p v-else class="nav-text text-muted">
                <i class="bi bi-cursor-fill me-2"></i>Click to select
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
            <div class="selection-card" @click="openModal('clothing')">
              <img
                v-if="selections.clothing"
                :src="selections.clothing.base64"
                alt="Selected clothing image"
              />
              <p v-else class="nav-text text-muted">
                <i class="bi bi-cursor-fill me-2"></i>Click to select
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
            <div class="selection-card" @click="openModal('style')">
              <img
                v-if="selections.style"
                :src="selections.style.base64"
                alt="Selected style image"
              />
              <p v-else class="nav-text text-muted">
                <i class="bi bi-cursor-fill me-2"></i>Click to select
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
                  <!-- Selection Checkmark -->
                  <div v-if="selectedImageId === image.id" class="selection-checkmark">
                    <i class="bi bi-check-circle-fill"></i>
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
      this.loadingCards[this.modalCategory] = true
      const userId = window.APP_CONFIG.userId
      const fullImage = await getFullImage(userId, this.selectedImageId)

      if (fullImage) {
        this.selections[this.modalCategory] = fullImage
      }

      this.closeModal()
    },
  },
}
</script>
