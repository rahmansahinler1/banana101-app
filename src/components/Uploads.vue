<template>
  <!-- Upload Clothing Page -->
  <div class="container-fluid">
    <h1 class="dashboard-title mb-3">Upload Picture</h1>
    <p class="nav-text text-muted">Select the picture, select category then upload</p>

    <div class="row">
      <div class="col-md-8 mb-4">
        <div class="card h-100" style="min-height: 85vh">
          <div class="card-body d-flex flex-column">
            <h3 class="card-title mb-3">Selection</h3>
            <div
              v-if="!hasSelection"
              class="upload-dropzone flex-grow-1 justify-content-center"
              @click="triggerFileSelection"
              @dragover.prevent
              @drop.prevent="handleDrop"
            >
              <i class="bi bi-bag-plus" style="font-size: 3rem; color: #5d5d5d"></i>
              <h5>Drag and drop your picture here</h5>
              <p class="nav-text text-muted">or click to browse files</p>
              <button class="btn btn-outline-primary">Browse Files</button>
              <input
                ref="fileInput"
                type="file"
                class="d-none"
                accept="image"
                @change="handleFileSelect"
              />
            </div>
            <div v-else class="upload-dropzone mb-2">
              <img :src="previewUrl" alt="Selected image" class="preview-image" />
            </div>

            <div class="d-flex flex-row mt-4 justify-content-between align-items-start">
              <div>
                <h6 class="section-title">Category</h6>
                <button
                  class="btn btn-sm me-2 mb-2"
                  :class="
                    selectedCategory === 'yourself' ? 'btn-secondary' : 'btn-outline-secondary'
                  "
                  :disabled="!selectedFile"
                  @click="selectCategory('yourself')"
                >
                  <i class="bi bi-person-fill"></i> Yourself
                </button>
                <button
                  class="btn btn-sm me-2 mb-2"
                  :class="
                    selectedCategory === 'clothing' ? 'btn-secondary' : 'btn-outline-secondary'
                  "
                  :disabled="!selectedFile"
                  @click="selectCategory('clothing')"
                >
                  <i class="bi bi-tencent-qq"></i> Clothing
                </button>
              </div>
              <div class="preview-actions">
                <h6 class="section-title">Action</h6>
                <button
                  class="btn btn-outline-danger btn-sm me-2 mb-2"
                  @click="removeFile"
                  :disabled="!selectedFile"
                >
                  <i class="bi bi-trash"></i> Remove
                </button>
                <button
                  class="btn btn-outline-success btn-sm me-2 mb-2"
                  @click="uploadFile"
                  :disabled="!selectedFile || !selectedCategory"
                >
                  <i class="bi bi-upload"></i> Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <div class="card-body">
            <h3 class="card-title mb-3">Guideline</h3>
            <ul class="nav-text text-muted">
              <li>
                First, select your picture from your device, then select your category, then upload
                it if you like
              </li>
              <li>Supported file formats: JPG, PNG, WEBP</li>
              <li>Maximum file size is 5MB</li>
              <li>Use neutral backgrounds for your pictures</li>
              <li>Ensure clothing is visible</li>
              <li>Good lighting is essential</li>
              <li>One item per photo</li>
            </ul>

            <div class="mt-4">
              <h6 class="section-title">Current Pictures</h6>
              <div class="upload-summary">
                <div class="d-flex justify-content-between">
                  <span class="nav-text text-muted">Yourself:</span>
                  <span class="nav-text fw-semibold">0</span>
                </div>
                <div class="d-flex justify-content-between">
                  <span class="nav-text text-muted">Clothes:</span>
                  <span class="nav-text fw-semibold">0</span>
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
import { uploadFile } from '@/api/api'

export default {
  data() {
    return {
      selectedFile: null,
      previewUrl: null,
      selectedCategory: null,
      isUploading: false,
    }
  },
  computed: {
    canUpload() {
      return this.selectedFile && this.selectedCategory && !this.isUploading
    },
    hasSelection() {
      return this.selectedFile !== null
    },
  },
  methods: {
    triggerFileSelection() {
      this.$refs.fileInput.click()
    },
    selectCategory(category) {
      this.selectedCategory = category
    },
    handleFileSelect(event) {
      const file = event.target.files[0]
      this.processFile(file)
      event.target.value = ''
    },
    handleDrop(event) {
      const file = event.dataTransfer.files[0]
      this.processFile(file)
      event.target.value = ''
    },
    processFile(file) {
      if (!file) return

      const maxSize = 5 * 1024 * 1024
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid image file (JPG, PNG, WEBP)')
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
    },
    async uploadFile() {
      // Checks
      if (!this.selectedFile || !this.selectedCategory) {
        alert('Please select picture and category')
        return
      }
      this.isUploading = true
      // File conversion
      const fileBytes = await this.convertFile(this.selectedFile)
      // Upload
      try {
        const userId = window.APP_CONFIG.userId
        const result = await uploadFile(userId, this.selectedCategory, fileBytes)

        if (result.success) {
          alert('Picture uploaded successfully!')
          this.removeFile()
        } else {
          alert(`Upload failed ${result.error}`)
        }
      } catch (error) {
        alert(`Upload error: ${error}`)
      } finally {
        this.isUploading = false
      }
    },
    convertFile(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          const base64String = reader.result.split(',')[1]
          resolve(base64String)
        }
        reader.onerror = (error) => reject(error)
      })
    },
    removeFile() {
      if (this.previewUrl) {
        URL.revokeObjectURL(this.previewUrl)
      }
      this.selectedFile = null
      this.previewUrl = null
      this.selectedCategory = null
    },
  },
}
</script>
