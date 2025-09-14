<template>
  <!-- Upload Clothing Page -->
  <div id="upload-clothing" class="page-content">
    <div class="container-fluid">
      <h1 class="dashboard-title mb-3">Upload Picture</h1>
      <p class="nav-text text-muted">Upload photos of yourself or your clothes</p>

      <div class="row">
        <div class="col-md-8 mb-4">
          <div class="card h-100">
            <div class="card-body">
              <div class="upload-area">
                <h3 class="card-title mb-3">Your Selection</h3>
                <div v-if="!hasSelection" class="upload-dropzone">
                  <i class="bi bi-bag-plus" style="font-size: 3rem; color: #5d5d5d"></i>
                  <h5 class="mt-3">Drag and drop your photos here</h5>
                  <p class="nav-text text-muted">or click to browse files</p>
                  <button class="btn btn-outline-primary" @click="triggerFileSelection">
                    Browse Files
                  </button>
                  <input
                    ref="fileInput"
                    type="file"
                    class="d-none"
                    accept="image"
                    @change="handleFileSelect"
                  />
                  <input type="file" class="d-none" accept="image/*" multiple />
                </div>
                <div v-else class="upload-dropzone">
                  <img :src="previewUrl" alt="Selected image" class="preview-image" />
                  <div class="preview-actions">
                    <button class="btn btn-outline-danger btn-sm" @click="removeFile">
                      <i class="bi bi-trash"></i> Remove
                    </button>
                    <button class="btn btn-outline-secondary btn-sm" @click="triggerFileSelection">
                      <i class="bi bi-arrow-repeat"></i>
                      Replace
                    </button>
                  </div>
                </div>
              </div>

              <div class="clothing-categories mt-4">
                <h6 class="section-title">Category Selection</h6>
                <div class="category-buttons">
                  <button class="btn btn-sm btn-outline-secondary me-2 mb-2">Yourself</button>
                  <button class="btn btn-sm btn-outline-secondary me-2 mb-2">Clothing</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <div class="card-body">
              <h3 class="card-title mb-3">Upload Guidelines</h3>
              <ul class="nav-text text-muted">
                <li>Supported file formats: JPG, PNG, WEBP</li>
                <li>Maximum file size is 5MB</li>
                <li>Use neutral backgrounds for your pictures</li>
                <li>Ensure clothing is wrinkle-free</li>
                <li>Good lighting is essential</li>
                <li>One item per photo</li>
                <li>Include full garment in frame</li>
              </ul>

              <div class="mt-4">
                <h6 class="section-title">Current Pictures</h6>
                <div class="wardrobe-summary">
                  <div class="d-flex justify-content-between">
                    <span class="nav-text text-muted">Yourself:</span>
                    <span class="nav-text fw-bold">0</span>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span class="nav-text text-muted">Clothes:</span>
                    <span class="nav-text fw-bold">0</span>
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
export default {
  data() {
    return {
      selectedFile: null,
      previewUrl: null,
      selectedCategoty: null,
      isUploading: false,
    }
  },
  computed: {
    canUpload() {
      return this.selectedFile && this.selectedCategoty && !this.isUploading
    },
    hasSelection() {
      return this.selectedFile !== null
    },
  },
  methods: {
    triggerFileSelection() {
      this.$refs.fileInput.click()
    },
    handleFileSelect(event) {
      const file = event.target.files[0]

      if (!file) return

      const maxSize = 5 * 1024 * 1024
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid iamge file (JPG, PNG, WEBP)')
        return
      }

      if (file.size > maxSize) {
        alert('Please upload files smaller than 5MB')
        return
      }

      if (this.previewUrl) {
        URL.revokeObjectURL(this.previewUrl)
      }

      this.selectedFile = file
      this.previewUrl = URL.createObjectURL(file)
      event.target.value = ''
    },
    removeFile() {
      if (this.previewUrl) {
        URL.revokeObjectURL(this.previewUrl)
      }
      this.selectedFile = null
      this.previewUrl = null
      this.selectedCategoty = null
    },
  },
}
</script>
