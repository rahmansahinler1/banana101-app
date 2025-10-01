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
              <button class="btn btn-sm btn-secondary me-2">
                All
                <span class="badge bg-light text-dark ms-1">{{ getTotalPictureCount }}</span>
              </button>
              <button class="btn btn-sm btn-outline-secondary me-2">
                Yourself
                <span class="badge bg-light text-dark ms-1">{{
                  userStore.pictureCounts.yourself
                }}</span>
              </button>
              <button class="btn btn-sm btn-outline-secondary">
                Clothing
                <span class="badge bg-light text-dark ms-1">{{
                  userStore.pictureCounts.clothing
                }}</span>
              </button>
            </div>

            <!-- Gallery Grid -->
            <div class="gallery-grid">
              <!-- Gallery items will go here -->
              <div class="gallery-item">
                <div class="gallery-image-wrapper">
                  <!-- Category Label -->
                  <span class="gallery-category-badge">Yourself</span>

                  <div class="gallery-placeholder">
                    <i class="bi bi-image" style="font-size: 2rem; color: #5d5d5d"></i>
                  </div>
                </div>

                <!-- Action Buttons (appear on hover) -->
                <div class="gallery-actions">
                  <button class="btn btn-sm gallery-action-btn">
                    <i class="bi bi-stars"></i>
                  </button>
                  <button class="btn btn-sm gallery-action-btn">
                    <i class="bi bi-trash"></i>
                  </button>
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
  computed: {
    ...mapStores(useUserStore),
    userCred() {
      return this.userStore?.userCred || null
    },
    getTotalPictureCount() {
      return (
        (this.userStore?.pictureCounts?.yourself || 0) +
        (this.userStore?.pictureCounts?.clothing || 0)
      )
    },
  },
}
</script>
