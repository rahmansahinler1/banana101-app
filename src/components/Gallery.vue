<template>
  <!-- Gallery Page -->
  <div class="container-fluid">
    <h1 class="dashboard-title mb-3">Gallery</h1>

    <div class="row">
      <div class="col-12 mb-4">
        <div class="card" style="min-height: 90vh">
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
                  <button class="btn btn-sm gallery-action-btn">
                    <i class="bi bi-stars"></i>
                  </button>
                  <button class="btn btn-sm gallery-action-btn">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>

              <!-- Empty state -->
              <div class="gallery-item" v-if="getPreviewImages.length === 0">
                <div class="gallery-image-wrapper">
                  <div class="gallery-placeholder">
                    <i class="bi bi-image" style="font-size: 2rem; color: #5d5d5d"></i>
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

export default {
  name: 'Gallery',
  data() {
    return {
      selectedFilter: 'all',
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
  },
}
</script>
