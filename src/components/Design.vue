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
            <div class="selection-card">
              <p class="nav-text text-muted">Click to select</p>
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
            <div class="selection-card">
              <p class="nav-text text-muted">Click to select</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Style -->
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <div class="card-body d-flex flex-column">
            <h3 class="card-title mb-3 text-center"><i class="bi bi-star-fill me-2"></i>Style</h3>
            <div class="selection-card">
              <p class="nav-text text-muted">Click to select</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Generate Button -->
    <div class="row">
      <div class="col-12 text-center mb-4">
        <button class="generate-btn"><i class="bi bi-magic me-2"></i>Generate</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Design',
}
</script>
