<template>
  <!-- Profile Page -->
  <div id="profile" class="page-content">
    <div class="container-fluid" style="max-width: 700px">
      <h1 class="profile-page-title mb-4">Profile</h1>

      <!-- Profile Information -->
      <div class="mb-4">
        <div class="d-flex align-items-center p-4 border rounded">
          <div class="profile-picture me-3">
            <img
              src="https://via.placeholder.com/70"
              alt="Profile"
              class="rounded-circle"
              style="width: 70px; height: 70px; object-fit: cover"
            />
          </div>
          <div class="profile-info">
            <h6 class="profile-header mb-1">John Doe</h6>
            <p class="profile-text text-muted mb-0">john.doe@example.com</p>
          </div>
        </div>
      </div>

      <!-- Plan Information -->
      <div class="mb-4">
        <div class="p-4 border rounded">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div>
              <div class="d-flex align-items-center mb-1">
                <i class="bi bi-diagram-3-fill me-2" style="font-size: 1.25rem"></i>
                <h6 class="profile-header mb-0">Pro plan</h6>
              </div>
              <p class="profile-text-small text-muted mb-1">Monthly</p>
              <p class="profile-text-small text-muted mb-0">Auto renews Oct 30, 2025</p>
            </div>
            <button class="btn btn-outline-secondary btn-sm profile-btn">Adjust plan</button>
          </div>
          <div class="pt-3 border-top">
            <p class="profile-text text-muted mb-2">
              Cancel your subscription. Your access will continue until the end of your billing
              period.
            </p>
            <button class="btn btn-outline-danger btn-sm profile-btn">Cancel Subscription</button>
          </div>
        </div>
      </div>

      <!-- Usage -->
      <div class="mb-4 pb-4 border-bottom">
        <div class="usage-item mb-4">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="profile-text">Image Uploads</span>
            <span class="profile-text fw-bold">12/20 used</span>
          </div>
          <div class="progress mb-1" style="height: 6px">
            <div class="progress-bar bg-primary" style="width: 60%"></div>
          </div>
          <small class="profile-text-small text-muted">8 uploads remaining</small>
        </div>

        <div class="usage-item">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="profile-text">AI Generations</span>
            <span class="profile-text fw-bold">15/20 used</span>
          </div>
          <div class="progress mb-1" style="height: 6px">
            <div class="progress-bar bg-success" style="width: 75%"></div>
          </div>
          <small class="profile-text-small text-muted">5 generations remaining</small>
        </div>
      </div>

      <!-- Feedback -->
      <div class="mb-4">
        <textarea
          class="form-control mb-3 profile-text"
          rows="3"
          placeholder="Share your feedback with us..."
        ></textarea>
        <button class="btn btn-primary btn-sm profile-btn">Submit Feedback</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
}
</script>
