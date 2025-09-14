<template>
  <!-- Try Outfits Page -->
  <div id="try-outfits" class="page-content">
    <div class="container-fluid">
      <h1 class="dashboard-title mb-3">Try Outfits</h1>
      <p class="nav-text text-muted">
        Select a personal photo and clothing items to generate AI-powered outfit visualizations.
      </p>

      <div class="row">
        <!-- Photo Selection -->
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <div class="card-body">
              <h3 class="card-title mb-3">Select Your Photo</h3>
              <div class="selection-area">
                <div class="selected-photo">
                  <div class="photo-placeholder large">
                    <i class="bi bi-person-fill" style="font-size: 4rem; color: #5d5d5d"></i>
                  </div>
                  <p class="nav-text text-muted mt-2">Click to select a photo</p>
                </div>
                <div class="photo-options mt-3">
                  <div class="photo-option selected">
                    <div class="photo-placeholder small">
                      <i class="bi bi-person-fill"></i>
                    </div>
                  </div>
                  <div class="photo-option">
                    <div class="photo-placeholder small">
                      <i class="bi bi-person-fill"></i>
                    </div>
                  </div>
                  <div class="photo-option">
                    <div class="photo-placeholder small">
                      <i class="bi bi-person-fill"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Clothing Selection -->
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <div class="card-body">
              <h3 class="card-title mb-3">Select Clothing</h3>
              <div class="clothing-categories">
                <div class="category-tabs">
                  <button class="btn btn-sm btn-outline-primary active me-2 mb-2">Shirts</button>
                  <button class="btn btn-sm btn-outline-primary me-2 mb-2">Pants</button>
                  <button class="btn btn-sm btn-outline-primary me-2 mb-2">Dresses</button>
                  <button class="btn btn-sm btn-outline-primary me-2 mb-2">Jackets</button>
                </div>
                <div class="clothing-selection">
                  <div class="clothing-option selected">
                    <div class="clothing-placeholder small">
                      <i class="bi bi-bag-fill"></i>
                    </div>
                    <small class="nav-text-small">Blue Shirt</small>
                  </div>
                  <div class="clothing-option">
                    <div class="clothing-placeholder small">
                      <i class="bi bi-bag-fill"></i>
                    </div>
                    <small class="nav-text-small">White Shirt</small>
                  </div>
                  <div class="clothing-option">
                    <div class="clothing-placeholder small">
                      <i class="bi bi-bag-fill"></i>
                    </div>
                    <small class="nav-text-small">Black Shirt</small>
                  </div>
                  <div class="clothing-option">
                    <div class="clothing-placeholder small">
                      <i class="bi bi-bag-fill"></i>
                    </div>
                    <small class="nav-text-small">Red Shirt</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- AI Generation -->
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <div class="card-body">
              <h3 class="card-title mb-3">Generate Outfit</h3>
              <div class="generation-area">
                <div class="generated-result">
                  <div class="result-placeholder">
                    <i class="bi bi-magic" style="font-size: 4rem; color: #5d5d5d"></i>
                  </div>
                  <p class="nav-text text-muted mt-2">Generated outfit will appear here</p>
                </div>
                <button class="btn btn-primary w-100 mt-3">
                  <i class="bi bi-magic me-2"></i>
                  Generate AI Outfit
                </button>
                <div class="generation-info mt-3">
                  <div class="d-flex justify-content-between">
                    <span class="nav-text text-muted">Remaining trials:</span>
                    <span class="nav-text fw-bold">7/10</span>
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
