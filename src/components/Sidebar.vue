<template>
  <!-- Sidebar -->
  <div class="app-sidebar d-flex flex-column">
    <div class="sidebar-header">
      <button type="button" class="logo-button hover-btn">
        <span class="logo-text">WardrobeAI</span>
      </button>
    </div>
    <!-- Navigation Sections -->
    <div class="flex-grow-1">
      <!-- Wardrobe Section -->
      <div class="nav-section">
        <h6 class="section-title text mb-2">Wardrobe</h6>

        <a href="#my-wardrobe" class="nav-item" data-page="my-wardrobe">
          <i class="bi bi-bag nav-icon"></i>
          <span class="nav-text">My Wardrobe</span>
        </a>

        <a href="#try-outfits" class="nav-item" data-page="try-outfits">
          <i class="bi bi-palette nav-icon"></i>
          <span class="nav-text">Try Outfits</span>
        </a>

        <a href="#recent-generations" class="nav-item" data-page="recent-generations">
          <i class="bi bi-clock-history nav-icon"></i>
          <span class="nav-text">Recent Generations</span>
        </a>
      </div>

      <!-- Management Section -->
      <div class="nav-section">
        <h6 class="section-title text mb-2">Management</h6>

        <a href="#upload-photos" class="nav-item" data-page="upload-photos">
          <i class="bi bi-person-plus nav-icon"></i>
          <span class="nav-text">Upload Photos</span>
        </a>

        <a href="#upload-clothing" class="nav-item" data-page="upload-clothing">
          <i class="bi bi-bag nav-icon"></i>
          <span class="nav-text">Upload Clothing</span>
        </a>

        <a href="#usage-billing" class="nav-item" data-page="usage-billing">
          <i class="bi bi-credit-card nav-icon"></i>
          <span class="nav-text">Usage & Billing</span>
        </a>
      </div>
    </div>
    <!-- Profile Section -->
    <div class="profile-section">
      <div class="dropdown">
        <button
          type="button"
          class="profile-button dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="bi bi-person-circle fs-4 me-3" style="color: #5d5d5d"></i>
          <span class="profile-name">John Doe</span>
          <i class="bi bi-chevron-down ms-auto" style="color: #5d5d5d; font-size: 0.9rem"></i>
        </button>
        <ul class="dropdown-menu dropdown-menu-up">
          <li>
            <a class="dropdown-item nav-item" href="#profile">
              <i class="bi bi-person nav-icon"></i>
              <span class="nav-text">Edit Profile</span>
            </a>
          </li>
          <li>
            <a class="dropdown-item nav-item" href="#settings">
              <i class="bi bi-gear nav-icon"></i>
              <span class="nav-text">Account Settings</span>
            </a>
          </li>
          <li>
            <a class="dropdown-item nav-item" href="#logout">
              <i class="bi bi-box-arrow-right nav-icon"></i>
              <span class="nav-text">Sign Out</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped></style>
