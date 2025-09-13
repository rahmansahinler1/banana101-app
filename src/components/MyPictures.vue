<template>
  <!-- My Pictures Page -->
  <div id="my-pictures" class="page-content active">
    <div class="container-fluid">
      <h1 class="dashboard-title mb-3">Personal Pictures</h1>
      <p class="nav-text text-muted">
        Manage your personal photos and clothing items for AI outfit generation.
      </p>

      <div class="row">
        <!-- Personal Photos Section -->
        <div class="col-md-6 mb-4">
          <div class="card h-100">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h3 class="ai-seo-title">Personal Photos</h3>
                <span class="badge bg-secondary">1 photo</span>
              </div>

              <div class="photo-grid">
                <div class="photo-item">
                  <div class="photo-placeholder">
                    <i class="bi bi-person-fill" style="font-size: 2rem; color: #5d5d5d"></i>
                  </div>
                  <small class="nav-text text-muted">Photo 1</small>
                </div>
                <div class="photo-item add-photo">
                  <div class="photo-placeholder add-placeholder">
                    <i class="bi bi-plus-lg" style="font-size: 2rem; color: #5d5d5d"></i>
                  </div>
                  <small class="nav-text text-muted">Add Photo</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Clothing Items Section -->
        <div class="col-md-6 mb-4">
          <div class="card h-100">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h3 class="ai-seo-title">Cloth Pictures</h3>
                <span class="badge bg-secondary">1 item</span>
              </div>

              <div class="clothing-grid">
                <div class="clothing-item">
                  <div class="clothing-placeholder">
                    <i class="bi bi-bag-fill" style="font-size: 1.5rem; color: #5d5d5d"></i>
                  </div>
                  <small class="nav-text text-muted">Shirt</small>
                </div>
                <div class="clothing-item add-clothing">
                  <div class="clothing-placeholder add-placeholder">
                    <i class="bi bi-plus-lg" style="font-size: 1.5rem; color: #5d5d5d"></i>
                  </div>
                  <small class="nav-text text-muted">Add Item</small>
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
import { healthCheck } from '@/api/api'

export default {
  name: 'MyPictures',
  async mounted() {
    try {
      const result = await healthCheck()
      console.log('Success, API service working ✅', result)
    } catch (error) {
      console.log(error)
    }
  },
}
</script>
