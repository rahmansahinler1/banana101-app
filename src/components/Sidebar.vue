<template>
  <!-- Sidebar -->
  <div class="app-sidebar d-flex flex-column">
    <div class="sidebar-header">
      <button type="button" class="logo-button hover-btn">
        <span class="logo-text">Banana App</span>
      </button>
    </div>
    <!-- Navigation Sections -->
    <div class="flex-grow-1">
      <!-- Image Section -->
      <div class="nav-section">
        <h6 class="section-title text mb-2">Dress Up</h6>

        <router-link to="/gallery" class="nav-item">
          <i class="bi bi-bag nav-icon"></i>
          <span class="nav-text">Gallery</span>
        </router-link>

        <router-link to="/design" class="nav-item">
          <i class="bi bi-palette nav-icon"></i>
          <span class="nav-text">Design</span>
        </router-link>

        <router-link to="/recents" class="nav-item">
          <i class="bi bi-clock-history nav-icon"></i>
          <span class="nav-text">Recents</span>
        </router-link>

        <router-link to="/upload" class="nav-item">
          <i class="bi bi-person-plus nav-icon"></i>
          <span class="nav-text">Upload</span>
        </router-link>

        <router-link to="/usage" class="nav-item">
          <i class="bi bi-person-vcard nav-icon"></i>
          <span class="nav-text">Profile</span>
        </router-link>
      </div>
    </div>
    <!-- Profile Section -->
    <div class="profile-section">
      <div class="dropdown">
        <button
          type="button"
          class="profile-button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="bi bi-person-circle fs-4 me-3" style="color: #5d5d5d"></i>
          <span class="profile-name">Ebru Saki</span>
          <i class="bi bi-chevron-down ms-auto" style="color: #5d5d5d; font-size: 0.9rem"></i>
        </button>
        <ul class="dropdown-menu dropdown-menu-up">
          <li>
            <a class="dropdown-item nav-item" href="#profile">
              <i class="bi bi-person nav-icon"></i>
              <span class="nav-text">Profile</span>
            </a>
          </li>
          <li>
            <a class="dropdown-item nav-item" href="#settings">
              <i class="bi bi-gear nav-icon"></i>
              <span class="nav-text">Settings</span>
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
