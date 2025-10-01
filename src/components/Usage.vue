<template>
  <!-- Usage & Billing Page -->
  <div id="usage-billing" class="page-content">
    <div class="container-fluid">
      <h1 class="dashboard-title mb-3">Usage & Billing</h1>
      <p class="nav-text text-muted">
        Monitor your AI generation usage and manage your subscription.
      </p>

      <div class="row">
        <!-- Usage Stats -->
        <div class="col-md-6 mb-4">
          <div class="card h-100">
            <div class="card-body">
              <h3 class="card-title mb-3">Current Usage</h3>
              <div class="usage-stats">
                <div class="usage-item mb-3">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="nav-text">Free Trial Generations</span>
                    <span class="nav-text fw-bold">3/10 used</span>
                  </div>
                  <div class="progress">
                    <div class="progress-bar bg-primary" style="width: 30%"></div>
                  </div>
                  <small class="nav-text-small text-muted">7 generations remaining</small>
                </div>

                <div class="usage-item mb-3">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="nav-text">Storage Used</span>
                    <span class="nav-text fw-bold">245 MB / 1 GB</span>
                  </div>
                  <div class="progress">
                    <div class="progress-bar bg-success" style="width: 25%"></div>
                  </div>
                  <small class="nav-text-small text-muted">755 MB available</small>
                </div>
              </div>

              <div class="subscription-status mt-4">
                <div class="status-badge">
                  <span class="badge bg-success">Free Trial</span>
                </div>
                <p class="nav-text text-muted mt-2">Trial expires in 7 days</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Billing Information -->
        <div class="col-md-6 mb-4">
          <div class="card h-100">
            <div class="card-body">
              <h3 class="card-title mb-3">Subscription Plans</h3>

              <div class="plan-options">
                <div class="plan-option current">
                  <div class="plan-header">
                    <h6 class="section-title">Free Trial</h6>
                    <div class="plan-price">
                      <span class="price">$0</span>
                      <span class="period nav-text text-muted">/month</span>
                    </div>
                  </div>
                  <ul class="nav-text-small text-muted">
                    <li>10 AI generations</li>
                    <li>1 GB storage</li>
                    <li>Basic support</li>
                  </ul>
                  <button class="btn btn-outline-secondary w-100 mt-2" disabled>
                    Current Plan
                  </button>
                </div>

                <div class="plan-option">
                  <div class="plan-header">
                    <h6 class="section-title">Pro</h6>
                    <div class="plan-price">
                      <span class="price">$9.99</span>
                      <span class="period nav-text text-muted">/month</span>
                    </div>
                  </div>
                  <ul class="nav-text-small text-muted">
                    <li>Unlimited AI generations</li>
                    <li>10 GB storage</li>
                    <li>Priority support</li>
                    <li>Advanced features</li>
                  </ul>
                  <button class="btn btn-primary w-100 mt-2">Upgrade</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Usage History -->
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title mb-3">Usage History</h3>
              <div class="table-responsive">
                <table class="table">
                  <thead class="table-light">
                    <tr>
                      <th>Date</th>
                      <th>Activity</th>
                      <th>Generations Used</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="nav-text">2024-01-15</td>
                      <td class="nav-text">AI Outfit Generation</td>
                      <td class="nav-text">2</td>
                      <td><span class="badge bg-success">Completed</span></td>
                    </tr>
                    <tr>
                      <td class="nav-text">2024-01-14</td>
                      <td class="nav-text">AI Outfit Generation</td>
                      <td class="nav-text">1</td>
                      <td><span class="badge bg-success">Completed</span></td>
                    </tr>
                    <tr>
                      <td class="nav-text">2024-01-13</td>
                      <td class="nav-text">Account Created</td>
                      <td class="nav-text">-</td>
                      <td><span class="badge bg-secondary">System</span></td>
                    </tr>
                  </tbody>
                </table>
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
  name: 'Usage',
}
</script>
