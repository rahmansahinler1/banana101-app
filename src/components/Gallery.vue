<template>
  <!-- Gallery Page -->
  <div class="container-fluid">
    <h1 class="dashboard-title mb-3 text-center">Gallery</h1>

    <div class="row">
      <div class="col-12 mb-4">
        <div class="card" style="min-height: 85vh">
          <div class="card-body">
            <!-- Filter Buttons -->
            <div class="gallery-filters mb-4">
              <button
                class="btn btn-sm me-2"
                :class="this.selectedFilter === 'all' ? 'btn-secondary' : 'btn-outline-secondary'"
                @click="selectFilter('all')"
              >
                All
                <span class="badge bg-light text-dark ms-1">{{ userStore.pictureCounts.all }}</span>
              </button>
              <button
                class="btn btn-sm me-2"
                :class="
                  this.selectedFilter === 'yourself' ? 'btn-secondary' : 'btn-outline-secondary'
                "
                @click="selectFilter('yourself')"
              >
                Yourself
                <span class="badge bg-light text-dark ms-1">{{
                  userStore.pictureCounts.yourself
                }}</span>
              </button>
              <button
                class="btn btn-sm me-2"
                :class="
                  this.selectedFilter === 'clothing' ? 'btn-secondary' : 'btn-outline-secondary'
                "
                @click="selectFilter('clothing')"
              >
                Clothing
                <span class="badge bg-light text-dark ms-1">{{
                  userStore.pictureCounts.clothing
                }}</span>
              </button>
            </div>

            <!-- Gallery Grid -->
            <div class="gallery-grid">
              <!-- Gallery items will go here -->
              <div class="gallery-item" v-for="image in getPreviewImages" :key="image.id">
                <div class="gallery-image-wrapper">
                  <!-- Category Badge -->
                  <span class="gallery-category-badge">{{ image.category }}</span>
                  <!-- Image -->
                  <div class="gallery-placeholder">
                    <img :src="image.base64" :alt="image.category" />
                  </div>
                </div>
                <!-- Action Buttons -->
                <div class="gallery-actions">
                  <!-- Show confirmation if this image is being deleted -->
                  <template v-if="deleteConfirmId === image.id">
                    <button
                      class="btn btn-sm gallery-action-btn"
                      @click="deleteImage(image.id, image.category)"
                    >
                      <i class="bi bi-check-lg"></i>
                    </button>
                    <button class="btn btn-sm gallery-action-btn" @click="cancelDelete">
                      <i class="bi bi-x-lg"></i>
                    </button>
                  </template>

                  <!-- Normal buttons -->
                  <template v-else>
                    <button class="btn btn-sm gallery-action-btn">
                      <i class="bi bi-stars"></i>
                    </button>
                    <button
                      class="btn btn-sm gallery-action-btn"
                      @click="showDeleteConfirm(image.id)"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </template>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useUserStore from '@/stores/user'
import { mapStores } from 'pinia'
import { deleteImage } from '@/api/api'

export default {
  name: 'Gallery',
  data() {
    return {
      selectedFilter: 'all',
      deleteConfirmId: null,
    }
  },
  computed: {
    ...mapStores(useUserStore),
    userCred() {
      return this.userStore?.userCred || null
    },
    getPreviewImages() {
      const yourself = this.userStore?.previewImages?.yourself || []
      const clothing = this.userStore?.previewImages?.clothing || []

      let images = []

      if (this.selectedFilter === 'yourself') {
        images = yourself.map((img) => ({ ...img, category: 'Yourself' }))
      } else if (this.selectedFilter === 'clothing') {
        images = clothing.map((img) => ({ ...img, category: 'Clothing' }))
      } else {
        images = [
          ...yourself.map((img) => ({ ...img, category: 'Yourself' })),
          ...clothing.map((img) => ({ ...img, category: 'Clothing' })),
        ]
      }

      return images.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at)
      })
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
    async deleteImage(imageId, category) {
      try {
        const userId = window.APP_CONFIG.userId
        const result = await deleteImage(userId, imageId)

        if (result.success) {
          // Remove from store
          this.userStore.removePreviewImage(category.toLowerCase(), imageId)
          this.deleteConfirmId = null
        } else {
          alert('Failed to delete image')
        }
      } catch (error) {
        console.error('Delete error:', error)
        alert('Error deleting image')
      }
    },
  },
}
</script>
