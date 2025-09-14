<template>
  <!-- Recent Generations Page -->
  <div id="recent-generations" class="page-content">
    <div class="container-fluid">
      <h1 class="dashboard-title mb-3">Recent Generations</h1>
      <p class="nav-text text-muted">
        View and manage your previously generated AI outfit combinations.
      </p>

      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-4">
                <h3 class="card-title">Generated Outfits</h3>
                <div class="filter-controls">
                  <button class="btn btn-sm btn-outline-secondary me-2">All</button>
                  <button class="btn btn-sm btn-outline-secondary me-2">Favorites</button>
                  <button class="btn btn-sm btn-outline-secondary">Recent</button>
                </div>
              </div>

              <div class="generations-grid">
                <div class="generation-item">
                  <div class="generation-image">
                    <div class="result-placeholder">
                      <i class="bi bi-image" style="font-size: 2rem; color: #5d5d5d"></i>
                    </div>
                  </div>
                  <div class="generation-info">
                    <small class="nav-text text-muted">Generated 2 hours ago</small>
                    <div class="generation-actions mt-1">
                      <button class="btn btn-sm btn-outline-primary me-1">
                        <i class="bi bi-heart"></i>
                      </button>
                      <button class="btn btn-sm btn-outline-primary me-1">
                        <i class="bi bi-download"></i>
                      </button>
                      <button class="btn btn-sm btn-outline-danger">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div class="generation-item">
                  <div class="generation-image">
                    <div class="result-placeholder">
                      <i class="bi bi-image" style="font-size: 2rem; color: #5d5d5d"></i>
                    </div>
                  </div>
                  <div class="generation-info">
                    <small class="nav-text text-muted">Generated 1 day ago</small>
                    <div class="generation-actions mt-1">
                      <button class="btn btn-sm btn-primary me-1">
                        <i class="bi bi-heart-fill"></i>
                      </button>
                      <button class="btn btn-sm btn-outline-primary me-1">
                        <i class="bi bi-download"></i>
                      </button>
                      <button class="btn btn-sm btn-outline-danger">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div class="generation-item">
                  <div class="generation-image">
                    <div class="result-placeholder">
                      <i class="bi bi-image" style="font-size: 2rem; color: #5d5d5d"></i>
                    </div>
                  </div>
                  <div class="generation-info">
                    <small class="nav-text text-muted">Generated 3 days ago</small>
                    <div class="generation-actions mt-1">
                      <button class="btn btn-sm btn-outline-primary me-1">
                        <i class="bi bi-heart"></i>
                      </button>
                      <button class="btn btn-sm btn-outline-primary me-1">
                        <i class="bi bi-download"></i>
                      </button>
                      <button class="btn btn-sm btn-outline-danger">
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div class="generation-item">
                  <div class="generation-image">
                    <div class="result-placeholder">
                      <i class="bi bi-image" style="font-size: 2rem; color: #5d5d5d"></i>
                    </div>
                  </div>
                  <div class="generation-info">
                    <small class="nav-text text-muted">Generated 1 week ago</small>
                    <div class="generation-actions mt-1">
                      <button class="btn btn-sm btn-outline-primary me-1">
                        <i class="bi bi-heart"></i>
                      </button>
                      <button class="btn btn-sm btn-outline-primary me-1">
                        <i class="bi bi-download"></i>
                      </button>
                      <button class="btn btn-sm btn-outline-danger">
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
    </div>
  </div>
</template>

<script></script>
