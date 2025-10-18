<template>
  <!-- Profile Page -->
  <div id="profile" class="page-content">
    <div class="container-fluid" style="max-width: 700px">
      <h1 class="profile-page-title mb-4">Profile</h1>

      <!-- Profile Information -->
      <div class="mb-4">
        <div class="d-flex align-items-center p-3 border rounded">
          <div class="profile-picture me-3">
            <img
              src="https://via.placeholder.com/70"
              alt="Profile"
              class="rounded-circle"
              style="width: 70px; height: 70px; object-fit: cover"
            />
          </div>
          <div class="profile-info">
            <h6 class="profile-header mb-1">{{ userCred.name }} {{ userCred.surname }}</h6>
            <p class="profile-text text-muted mb-0">{{ userCred.email }}</p>
          </div>
        </div>
      </div>

      <!-- Plan Information -->
      <div class="mb-4">
        <div class="p-3 border rounded">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div>
              <div class="d-flex align-items-center mb-1">
                <i class="bi bi-droplet-half me-2" style="font-size: 1.75rem; color: #00b7ed"></i>
                <h6 class="profile-header mb-0">{{ isPremium ? 'Premium' : 'Trial' }}</h6>
              </div>
              <p v-if="isPremium" class="profile-text-small text-muted mb-1">Monthly</p>
              <p v-if="isPremium" class="profile-text-small text-muted mb-0">
                Auto renews Oct 30, 2025
              </p>
            </div>
          </div>
          <div class="pt-3 border-top d-flex justify-content-between align-items-start">
            <p v-if="!isPremium" class="profile-text text-muted mb-0" style="max-width: 400px">
              Get premium, design freely!
            </p>
            <p v-if="isPremium" class="profile-text text-muted mb-0" style="max-width: 400px">
              Your access will continue until the end of your billing period.
            </p>
            <button v-if="!isPremium" class="btn btn-sm profile-btn upgrade-btn">
              <i class="bi bi-stars me-1" style="color: #00b7ed"></i>Upgrade your plan
            </button>
            <button v-if="isPremium" class="btn btn-outline-danger btn-sm profile-btn">
              Cancel Subscription
            </button>
          </div>
        </div>
      </div>

      <!-- Usage -->
      <div class="mb-4 pb-4 border-bottom">
        <div class="row g-3">
          <!-- Uploads Card -->
          <div class="col-6">
            <div class="border rounded p-3 d-flex align-items-center">
              <div class="me-3">
                <i class="bi bi-cloud-upload-fill" style="font-size: 1.75rem; color: #00b7ed"></i>
              </div>
              <div>
                <div class="nav-text fw-bold mb-0">{{ userLimits.uploadsLeft }}</div>
                <div class="nav-text-small text-muted">Uploads left</div>
              </div>
            </div>
          </div>

          <!-- Generations Card -->
          <div class="col-6">
            <div class="border rounded p-3 d-flex align-items-center">
              <div class="me-3">
                <i class="bi bi-stars" style="font-size: 1.75rem; color: #00b7ed"></i>
              </div>
              <div>
                <div class="nav-text fw-bold mb-0">{{ userLimits.generationsLeft }}</div>
                <div class="nav-text-small text-muted">Generations left</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Feedback -->
      <div class="mb-4">
        <div class="p-3 border rounded">
          <textarea
            v-model="feedbackText"
            class="form-control mb-2 nav-text-small"
            rows="3"
            placeholder="Anything you want to share?"
            maxlength="150"
          ></textarea>
          <div class="d-flex justify-content-between align-items-center mb-2">
            <div></div>
            <small class="nav-text-small text-muted">{{ feedbackText.length }}/150</small>
          </div>
          <div class="d-flex justify-content-end">
            <button class="btn btn-outline-secondary btn-sm profile-btn">Send</button>
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
  name: 'Profile',
  data() {
    return {
      feedbackText: '',
    }
  },
  computed: {
    ...mapStores(useUserStore),
    userCred() {
      return this.userStore?.userCred || { name: '', surname: '', email: '', type: 'trial' }
    },
    userLimits() {
      return this.userStore?.userLimits || { uploadsLeft: 0, generationsLeft: 0 }
    },
    isPremium() {
      return this.userCred.type === 'premium'
    },
  },
}
</script>
