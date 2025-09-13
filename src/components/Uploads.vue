<template>
  <!-- Upload Clothing Page -->
  <div id="upload-clothing" class="page-content">
    <div class="container-fluid">
      <h1 class="dashboard-title mb-3">Upload Clothing Items</h1>
      <p class="nav-text text-muted">
        Upload photos of clothing items to build your virtual wardrobe.
      </p>

      <div class="row">
        <div class="col-md-8 mb-4">
          <div class="card h-100">
            <div class="card-body">
              <h3 class="ai-seo-title mb-3">Upload Clothing</h3>
              <div class="upload-area">
                <div class="upload-dropzone">
                  <i class="bi bi-bag-plus" style="font-size: 3rem; color: #5d5d5d"></i>
                  <h5 class="mt-3">Drag and drop clothing photos here</h5>
                  <p class="nav-text text-muted">or click to browse files</p>
                  <button class="btn btn-outline-primary">Browse Files</button>
                  <input type="file" class="d-none" accept="image/*" multiple />
                </div>
              </div>

              <div class="clothing-categories mt-4">
                <h6 class="section-title">Category Selection</h6>
                <div class="category-buttons">
                  <button class="btn btn-sm btn-outline-secondary me-2 mb-2">Shirts</button>
                  <button class="btn btn-sm btn-outline-secondary me-2 mb-2">Pants</button>
                  <button class="btn btn-sm btn-outline-secondary me-2 mb-2">Dresses</button>
                  <button class="btn btn-sm btn-outline-secondary me-2 mb-2">Jackets</button>
                  <button class="btn btn-sm btn-outline-secondary me-2 mb-2">Skirts</button>
                  <button class="btn btn-sm btn-outline-secondary me-2 mb-2">Accessories</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <div class="card-body">
              <h3 class="ai-seo-title mb-3">Clothing Guidelines</h3>
              <ul class="nav-text text-muted">
                <li>Flat lay or hanger photos work best</li>
                <li>Use neutral backgrounds</li>
                <li>Ensure clothing is wrinkle-free</li>
                <li>Good lighting is essential</li>
                <li>One item per photo</li>
                <li>Include full garment in frame</li>
              </ul>

              <div class="mt-4">
                <h6 class="section-title">Current Wardrobe</h6>
                <div class="wardrobe-summary">
                  <div class="d-flex justify-content-between">
                    <span class="nav-text text-muted">Shirts:</span>
                    <span class="nav-text fw-bold">3</span>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span class="nav-text text-muted">Pants:</span>
                    <span class="nav-text fw-bold">2</span>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span class="nav-text text-muted">Dresses:</span>
                    <span class="nav-text fw-bold">2</span>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span class="nav-text text-muted">Jackets:</span>
                    <span class="nav-text fw-bold">1</span>
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

<script></script>
