export const wpHTML = `<!-- =======================================================
     BAIZEARN - HOME PAGE (WordPress Ready HTML5)
     Class prefix: .baizearn-*
     Typography: Inter & Poppins (Google Fonts)
======================================================== -->
<div class="baizearn-root" id="baizearn-app">

  <!-- ==================== HEADER / NAVIGATION ==================== -->
  <header class="baizearn-header" id="baizearnHeader">
    <div class="baizearn-container baizearn-header-inner">
      <!-- Logo -->
      <a href="#home" class="baizearn-logo" aria-label="BaizEarn Home">
        <div class="baizearn-logo-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
        </div>
        <span class="baizearn-logo-text">Baiz<span class="baizearn-text-emerald">Earn</span></span>
      </a>

      <!-- Desktop Nav -->
      <nav class="baizearn-nav" aria-label="Primary Navigation">
        <a href="#home" class="baizearn-nav-link active">Home</a>
        <a href="#about" class="baizearn-nav-link">About</a>
        <a href="#how-it-works" class="baizearn-nav-link">How It Works</a>
        <a href="#features" class="baizearn-nav-link">Features</a>
        <a href="#referral" class="baizearn-nav-link">Referral</a>
        <a href="#faq" class="baizearn-nav-link">FAQ</a>
        <a href="#contact" class="baizearn-nav-link">Contact</a>
      </nav>

      <!-- Header Actions -->
      <div class="baizearn-header-actions">
        <a href="#login" class="baizearn-btn baizearn-btn-ghost">Login</a>
        <a href="#register" class="baizearn-btn baizearn-btn-primary">Create Account</a>
      </div>

      <!-- Hamburger Button (Mobile) -->
      <button class="baizearn-hamburger" id="baizearnMobileToggle" aria-label="Toggle Menu" aria-expanded="false">
        <span class="baizearn-hamburger-line"></span>
        <span class="baizearn-hamburger-line"></span>
        <span class="baizearn-hamburger-line"></span>
      </button>
    </div>

    <!-- Mobile Drawer -->
    <div class="baizearn-mobile-menu" id="baizearnMobileMenu">
      <div class="baizearn-mobile-nav">
        <a href="#home" class="baizearn-mobile-link">Home</a>
        <a href="#about" class="baizearn-mobile-link">About</a>
        <a href="#how-it-works" class="baizearn-mobile-link">How It Works</a>
        <a href="#features" class="baizearn-mobile-link">Features</a>
        <a href="#referral" class="baizearn-mobile-link">Referral</a>
        <a href="#faq" class="baizearn-mobile-link">FAQ</a>
        <a href="#contact" class="baizearn-mobile-link">Contact</a>
      </div>
      <div class="baizearn-mobile-actions">
        <a href="#login" class="baizearn-btn baizearn-btn-outline w-full">Login</a>
        <a href="#register" class="baizearn-btn baizearn-btn-primary w-full">Create Account</a>
      </div>
    </div>
  </header>

  <main>
    <!-- ==================== HERO SECTION ==================== -->
    <section class="baizearn-hero" id="home">
      <!-- Glow & Ambient Tech BG -->
      <div class="baizearn-hero-glow"></div>
      <div class="baizearn-hero-grid-pattern"></div>

      <div class="baizearn-container baizearn-hero-content">
        <div class="baizearn-hero-text">
          <div class="baizearn-pill-badge">
            <span class="baizearn-dot-pulse"></span>
            <span>Next-Gen Digital Rewards & Tasks Platform</span>
          </div>

          <h1 class="baizearn-hero-title">
            Earn Smarter. <br/>
            <span class="baizearn-gradient-text">Grow Faster</span> with BaizEarn.
          </h1>

          <p class="baizearn-hero-subtitle">
            Complete eligible tasks, build your network and manage your rewards through one simple and modern platform.
          </p>

          <div class="baizearn-hero-buttons">
            <a href="#register" class="baizearn-btn baizearn-btn-primary baizearn-btn-lg">
              Create Account
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#features" class="baizearn-btn baizearn-btn-secondary baizearn-btn-lg">
              Explore BaizEarn
            </a>
          </div>

          <div class="baizearn-trust-line">
            <span>Simple</span>
            <span class="baizearn-bullet">•</span>
            <span>Modern</span>
            <span class="baizearn-bullet">•</span>
            <span>Secure</span>
            <span class="baizearn-bullet">•</span>
            <span>Mobile Friendly</span>
          </div>
        </div>

        <!-- Hero Mockup / Interactive Dashboard -->
        <div class="baizearn-hero-visual">
          <div class="baizearn-dashboard-mockup">
            <!-- Top Bar -->
            <div class="baizearn-mockup-header">
              <div class="baizearn-mockup-dots">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
              </div>
              <div class="baizearn-mockup-search">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                <span>baizearn.com/dashboard</span>
              </div>
              <div class="baizearn-mockup-user">
                <span class="baizearn-status-online"></span>
                <span class="baizearn-user-tag">PRO MEMBER</span>
              </div>
            </div>

            <!-- Dashboard Body -->
            <div class="baizearn-mockup-body">
              <!-- Top Row Stats -->
              <div class="baizearn-mockup-stats-grid">
                <div class="baizearn-mockup-card">
                  <div class="card-head">
                    <span>Wallet Balance</span>
                    <span class="badge-growth">+18.4%</span>
                  </div>
                  <div class="card-value">$1,248.50</div>
                  <div class="card-sub">Available for eligible payout</div>
                </div>

                <div class="baizearn-mockup-card">
                  <div class="card-head">
                    <span>Task Activity</span>
                    <span class="badge-active">Active</span>
                  </div>
                  <div class="card-value">142 Completed</div>
                  <div class="card-sub">98.6% Approval rate</div>
                </div>
              </div>

              <!-- Mini Chart Preview -->
              <div class="baizearn-mockup-chart-box">
                <div class="chart-header">
                  <div>
                    <span class="chart-title">Weekly Growth Indicator</span>
                    <p class="chart-subtitle">Verified platform reward activity</p>
                  </div>
                  <div class="chart-legend">
                    <span class="legend-dot"></span> Tasks
                    <span class="legend-dot gold"></span> Referrals
                  </div>
                </div>
                <div class="baizearn-chart-bars">
                  <div class="bar-col"><div class="bar bar-1" style="height: 45%;"></div><span>Mon</span></div>
                  <div class="bar-col"><div class="bar bar-2" style="height: 65%;"></div><span>Tue</span></div>
                  <div class="bar-col"><div class="bar bar-3" style="height: 50%;"></div><span>Wed</span></div>
                  <div class="bar-col"><div class="bar bar-4" style="height: 85%;"></div><span>Thu</span></div>
                  <div class="bar-col"><div class="bar bar-5" style="height: 70%;"></div><span>Fri</span></div>
                  <div class="bar-col"><div class="bar bar-6" style="height: 95%;"></div><span>Sat</span></div>
                  <div class="bar-col"><div class="bar bar-7" style="height: 80%;"></div><span>Sun</span></div>
                </div>
              </div>

              <!-- Mini Live Activity Stream -->
              <div class="baizearn-mockup-activity">
                <div class="activity-item">
                  <div class="activity-icon emerald">✓</div>
                  <div class="activity-info">
                    <span class="activity-title">Digital Task Approved</span>
                    <span class="activity-time">Just now • Web Research</span>
                  </div>
                  <span class="activity-amt">+$12.50</span>
                </div>
                <div class="activity-item">
                  <div class="activity-icon blue">★</div>
                  <div class="activity-info">
                    <span class="activity-title">Referral Network Milestone</span>
                    <span class="activity-time">2h ago • Level 1 Tier</span>
                  </div>
                  <span class="activity-amt">+$25.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== STATISTICS SECTION ==================== -->
    <section class="baizearn-stats-section" id="about">
      <div class="baizearn-container">
        <!-- Structured editable demo statistics -->
        <div class="baizearn-stats-grid">
          <div class="baizearn-stat-card">
            <div class="baizearn-stat-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1769E0" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div class="baizearn-stat-number" data-target="10000">10K+</div>
            <div class="baizearn-stat-label">Registered Users</div>
            <div class="baizearn-stat-demo-tag">Global community members</div>
          </div>

          <div class="baizearn-stat-card">
            <div class="baizearn-stat-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00C853" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
            </div>
            <div class="baizearn-stat-number" data-target="50000">50K+</div>
            <div class="baizearn-stat-label">Tasks Completed</div>
            <div class="baizearn-stat-demo-tag">Verified activity submissions</div>
          </div>

          <div class="baizearn-stat-card">
            <div class="baizearn-stat-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFC107" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            </div>
            <div class="baizearn-stat-number" data-target="5000">5K+</div>
            <div class="baizearn-stat-label">Active Members</div>
            <div class="baizearn-stat-demo-tag">Engaged daily users</div>
          </div>

          <div class="baizearn-stat-card">
            <div class="baizearn-stat-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1769E0" stroke-width="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
            </div>
            <div class="baizearn-stat-number">24/7</div>
            <div class="baizearn-stat-label">Platform Support</div>
            <div class="baizearn-stat-demo-tag">Reliable help desk</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== FEATURES SECTION ==================== -->
    <section class="baizearn-features-section" id="features">
      <div class="baizearn-container">
        <div class="baizearn-section-heading">
          <span class="baizearn-section-badge">Platform Capabilities</span>
          <h2 class="baizearn-section-title">Everything You Need in One Platform</h2>
          <p class="baizearn-section-subtitle">
            Manage your tasks, referrals, earnings and account activity from one simple experience.
          </p>
        </div>

        <div class="baizearn-features-grid">
          <!-- 1. Task Center -->
          <div class="baizearn-feature-card">
            <div class="baizearn-feature-icon-box icon-blue">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/></svg>
            </div>
            <span class="baizearn-card-tag">Core Hub</span>
            <h3 class="baizearn-feature-title">Task Center</h3>
            <p class="baizearn-feature-desc">Explore available tasks and manage your task activity.</p>
          </div>

          <!-- 2. Referral Program -->
          <div class="baizearn-feature-card">
            <div class="baizearn-feature-icon-box icon-emerald">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            </div>
            <span class="baizearn-card-tag">Network</span>
            <h3 class="baizearn-feature-title">Referral Program</h3>
            <p class="baizearn-feature-desc">Build your eligible referral network and monitor your team.</p>
          </div>

          <!-- 3. Digital Wallet -->
          <div class="baizearn-feature-card">
            <div class="baizearn-feature-icon-box icon-gold">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
            </div>
            <span class="baizearn-card-tag">Fintech</span>
            <h3 class="baizearn-feature-title">Digital Wallet</h3>
            <p class="baizearn-feature-desc">View your available and pending balances in one place.</p>
          </div>

          <!-- 4. Income History -->
          <div class="baizearn-feature-card">
            <div class="baizearn-feature-icon-box icon-emerald">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
            </div>
            <span class="baizearn-card-tag">Analytics</span>
            <h3 class="baizearn-feature-title">Income History</h3>
            <p class="baizearn-feature-desc">Track your earning activity by day, week and month.</p>
          </div>

          <!-- 5. Transaction History -->
          <div class="baizearn-feature-card">
            <div class="baizearn-feature-icon-box icon-blue">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 6v12"/></svg>
            </div>
            <span class="baizearn-card-tag">Transparency</span>
            <h3 class="baizearn-feature-title">Transaction History</h3>
            <p class="baizearn-feature-desc">Review your account transactions with clear status information.</p>
          </div>

          <!-- 6. Support Center -->
          <div class="baizearn-feature-card">
            <div class="baizearn-feature-icon-box icon-gold">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/></svg>
            </div>
            <span class="baizearn-card-tag">Assistance</span>
            <h3 class="baizearn-feature-title">Support Center</h3>
            <p class="baizearn-feature-desc">Get help and manage support requests easily.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== HOW IT WORKS ==================== -->
    <section class="baizearn-steps-section" id="how-it-works">
      <div class="baizearn-container">
        <div class="baizearn-section-heading">
          <span class="baizearn-section-badge">Simple 5-Step Process</span>
          <h2 class="baizearn-section-title">How BaizEarn Works</h2>
          <p class="baizearn-section-subtitle">
            Get started with a simple step-by-step experience.
          </p>
        </div>

        <div class="baizearn-steps-timeline">
          <!-- Step 1 -->
          <div class="baizearn-step-card">
            <div class="baizearn-step-number">01</div>
            <div class="baizearn-step-content">
              <h3 class="baizearn-step-title">Create Account</h3>
              <p class="baizearn-step-desc">Create your BaizEarn account.</p>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="baizearn-step-card">
            <div class="baizearn-step-number">02</div>
            <div class="baizearn-step-content">
              <h3 class="baizearn-step-title">Verify Account</h3>
              <p class="baizearn-step-desc">Complete the required verification process.</p>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="baizearn-step-card">
            <div class="baizearn-step-number">03</div>
            <div class="baizearn-step-content">
              <h3 class="baizearn-step-title">Explore Tasks</h3>
              <p class="baizearn-step-desc">Discover available tasks and activities.</p>
            </div>
          </div>

          <!-- Step 4 -->
          <div class="baizearn-step-card">
            <div class="baizearn-step-number">04</div>
            <div class="baizearn-step-content">
              <h3 class="baizearn-step-title">Earn Eligible Rewards</h3>
              <p class="baizearn-step-desc">Complete eligible activities and receive applicable rewards.</p>
            </div>
          </div>

          <!-- Step 5 -->
          <div class="baizearn-step-card">
            <div class="baizearn-step-number">05</div>
            <div class="baizearn-step-content">
              <h3 class="baizearn-step-title">Manage Your Earnings</h3>
              <p class="baizearn-step-desc">Track your eligible earnings and account activity.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== WHY BAIZEARN ==================== -->
    <section class="baizearn-why-section" id="why">
      <div class="baizearn-container baizearn-why-grid">
        <!-- Left: Security/Tech Visual -->
        <div class="baizearn-why-visual">
          <div class="baizearn-tech-shield-card">
            <div class="baizearn-shield-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00C853" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            </div>
            <h4>Bank-Grade Security Architecture</h4>
            <p>End-to-end encrypted session controls and real-time fraud mitigation safeguards all accounts.</p>

            <div class="baizearn-security-pills">
              <div class="pill"><span>✓</span> 256-Bit SSL Protection</div>
              <div class="pill"><span>✓</span> Multi-Factor Auth</div>
              <div class="pill"><span>✓</span> 99.9% Uptime Engine</div>
            </div>
          </div>
        </div>

        <!-- Right: Why BaizEarn Content -->
        <div class="baizearn-why-content">
          <span class="baizearn-section-badge">Platform Value</span>
          <h2 class="baizearn-section-title">Built for a Better Digital Earning Experience</h2>
          <p class="baizearn-section-subtitle mb-8">
            Designed from the ground up to give users absolute control, transparent analytics, and uninterrupted reliability.
          </p>

          <div class="baizearn-benefits-grid">
            <div class="baizearn-benefit-item">
              <div class="check-icon">✓</div>
              <div class="benefit-text">
                <strong>Modern Dashboard</strong>
                <p>Clean interface optimized for swift task navigation.</p>
              </div>
            </div>

            <div class="baizearn-benefit-item">
              <div class="check-icon">✓</div>
              <div class="benefit-text">
                <strong>Easy Navigation</strong>
                <p>Structured layout for friction-free access to all features.</p>
              </div>
            </div>

            <div class="baizearn-benefit-item">
              <div class="check-icon">✓</div>
              <div class="benefit-text">
                <strong>Transparent Activity History</strong>
                <p>Detailed verification records for every submitted task.</p>
              </div>
            </div>

            <div class="baizearn-benefit-item">
              <div class="check-icon">✓</div>
              <div class="benefit-text">
                <strong>Mobile Friendly</strong>
                <p>Fully responsive layout built for all screen sizes.</p>
              </div>
            </div>

            <div class="baizearn-benefit-item">
              <div class="check-icon">✓</div>
              <div class="benefit-text">
                <strong>Secure Architecture</strong>
                <p>Guarded by multi-layer session protection standards.</p>
              </div>
            </div>

            <div class="baizearn-benefit-item">
              <div class="check-icon">✓</div>
              <div class="benefit-text">
                <strong>Dedicated Support</strong>
                <p>Round-the-clock help desk for all inquiries.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== REFERRAL SECTION ==================== -->
    <section class="baizearn-referral-section" id="referral">
      <div class="baizearn-container baizearn-referral-grid">
        <div class="baizearn-referral-text">
          <span class="baizearn-section-badge">Network Multiplier</span>
          <h2 class="baizearn-section-title">Grow Your Network with BaizEarn</h2>
          <p class="baizearn-section-subtitle">
            Share your eligible referral link and monitor your network from your personal dashboard.
          </p>

          <div class="baizearn-referral-highlights">
            <div class="highlight-point">
              <span class="point-bullet"></span>
              <span>Direct Link Sharing with real-time click tracking</span>
            </div>
            <div class="highlight-point">
              <span class="point-bullet"></span>
              <span>Multi-Tier team activity analytics</span>
            </div>
            <div class="highlight-point">
              <span class="point-bullet"></span>
              <span>Transparent reward disbursement logs</span>
            </div>
          </div>

          <div class="baizearn-referral-action">
            <a href="#register" class="baizearn-btn baizearn-btn-primary baizearn-btn-lg">
              Explore Referral Program
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>

        <!-- Visual Referral Network Diagram -->
        <div class="baizearn-referral-diagram">
          <div class="baizearn-tree-container">
            <!-- Root User -->
            <div class="tree-node root-node">
              <div class="node-avatar root-avatar">YOU</div>
              <div class="node-info">
                <strong>Primary Account</strong>
                <span>Direct Referrals: 28</span>
              </div>
            </div>

            <!-- Connecting Lines -->
            <div class="tree-connector-lines"></div>

            <!-- Tier 1 Nodes -->
            <div class="tree-row">
              <div class="tree-node child-node">
                <div class="node-avatar">A1</div>
                <div class="node-info">
                  <strong>Partner Alex</strong>
                  <span class="text-emerald">+12 Tasks</span>
                </div>
              </div>

              <div class="tree-node child-node">
                <div class="node-avatar">B2</div>
                <div class="node-info">
                  <strong>Partner Sarah</strong>
                  <span class="text-emerald">+19 Tasks</span>
                </div>
              </div>

              <div class="tree-node child-node">
                <div class="node-avatar">C3</div>
                <div class="node-info">
                  <strong>Partner David</strong>
                  <span class="text-emerald">+8 Tasks</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== MOBILE EXPERIENCE SECTION ==================== -->
    <section class="baizearn-mobile-section" id="mobile">
      <div class="baizearn-container baizearn-mobile-grid">
        <div class="baizearn-phone-visual">
          <div class="baizearn-phone-mockup">
            <div class="phone-speaker"></div>
            <div class="phone-screen">
              <div class="phone-app-bar">
                <span>BaizEarn Mobile</span>
                <span class="battery-icon">98%</span>
              </div>
              <div class="phone-wallet-card">
                <span class="label">Total Balance</span>
                <span class="amount">$1,248.50</span>
                <span class="tag">Eligible Rewards</span>
              </div>
              <div class="phone-task-list">
                <div class="phone-task-item">
                  <span>App Feedback Survey</span>
                  <span class="badge">+$5.00</span>
                </div>
                <div class="phone-task-item">
                  <span>Digital Article Review</span>
                  <span class="badge">+$8.50</span>
                </div>
                <div class="phone-task-item">
                  <span>Ad Evaluation Activity</span>
                  <span class="badge">+$3.20</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="baizearn-mobile-text">
          <span class="baizearn-section-badge">On-The-Go</span>
          <h2 class="baizearn-section-title">BaizEarn, Wherever You Go</h2>
          <p class="baizearn-section-subtitle">
            Access your account, tasks, activity and eligible rewards from a responsive mobile experience.
          </p>
          <div class="baizearn-mobile-features-list">
            <div class="item">
              <div class="bullet">📱</div>
              <div>
                <strong>Zero App Installation Required</strong>
                <p>Engineered as a lightweight progressive web experience in any mobile browser.</p>
              </div>
            </div>
            <div class="item">
              <div class="bullet">⚡</div>
              <div>
                <strong>Instant Real-time Notifications</strong>
                <p>Get alerted immediately when new eligible tasks or referral rewards unlock.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== SECURITY / TRUST SECTION ==================== -->
    <section class="baizearn-security-section" id="security">
      <div class="baizearn-container">
        <div class="baizearn-section-heading">
          <span class="baizearn-section-badge">Enterprise Safety</span>
          <h2 class="baizearn-section-title">Your Experience. Your Data. Your Security.</h2>
          <p class="baizearn-section-subtitle">
            We prioritize strict account protection and transparent infrastructure.
          </p>
        </div>

        <div class="baizearn-security-grid">
          <div class="baizearn-security-card">
            <div class="icon">🔒</div>
            <h3>Secure Authentication</h3>
            <p>Session encryption and modern sign-in security protocols.</p>
          </div>

          <div class="baizearn-security-card">
            <div class="icon">🛡️</div>
            <h3>Protected Account Access</h3>
            <p>Monitored login alerts and automated anomaly detection.</p>
          </div>

          <div class="baizearn-security-card">
            <div class="icon">📜</div>
            <h3>Transparent Activity Records</h3>
            <p>Detailed verification timestamps for every task milestone.</p>
          </div>

          <div class="baizearn-security-card">
            <div class="icon">🎧</div>
            <h3>Responsive Support</h3>
            <p>Help desk operators ready to assist with account safety.</p>
          </div>

          <div class="baizearn-security-card">
            <div class="icon">👁️‍🗨️</div>
            <h3>Privacy-Focused Architecture</h3>
            <p>Your user profile and usage data are kept strictly confidential.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== FAQ SECTION ==================== -->
    <section class="baizearn-faq-section" id="faq">
      <div class="baizearn-container">
        <div class="baizearn-section-heading">
          <span class="baizearn-section-badge">Clear Answers</span>
          <h2 class="baizearn-section-title">Frequently Asked Questions</h2>
          <p class="baizearn-section-subtitle">
            Find answers to common questions about the BaizEarn platform.
          </p>
        </div>

        <div class="baizearn-faq-accordion">
          <div class="baizearn-faq-item active">
            <button class="baizearn-faq-question" aria-expanded="true">
              <span>What is BaizEarn?</span>
              <span class="faq-icon">+</span>
            </button>
            <div class="baizearn-faq-answer">
              <p>BaizEarn is a modern digital platform designed for members to complete eligible tasks, build referral networks, and manage digital rewards securely in one intuitive hub.</p>
            </div>
          </div>

          <div class="baizearn-faq-item">
            <button class="baizearn-faq-question" aria-expanded="false">
              <span>How do I start earning on BaizEarn?</span>
              <span class="faq-icon">+</span>
            </button>
            <div class="baizearn-faq-answer">
              <p>Simply create a free account, complete the quick verification step, browse available tasks in the Task Center, and follow the instructions to receive eligible rewards.</p>
            </div>
          </div>

          <div class="baizearn-faq-item">
            <button class="baizearn-faq-question" aria-expanded="false">
              <span>How does the Referral Program work?</span>
              <span class="faq-icon">+</span>
            </button>
            <div class="baizearn-faq-answer">
              <p>Once registered, you receive a unique referral link. When eligible friends sign up and participate, both you and your invitees can earn bonus platform perks as specified in your dashboard.</p>
            </div>
          </div>

          <div class="baizearn-faq-item">
            <button class="baizearn-faq-question" aria-expanded="false">
              <span>Is BaizEarn mobile friendly?</span>
              <span class="faq-icon">+</span>
            </button>
            <div class="baizearn-faq-answer">
              <p>Yes! BaizEarn is fully responsive and optimized for smartphones, tablets, laptops, and desktop computers without needing a separate app download.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== FINAL CTA ==================== -->
    <section class="baizearn-cta-section" id="register">
      <div class="baizearn-cta-glow"></div>
      <div class="baizearn-container baizearn-cta-content">
        <h2 class="baizearn-cta-title">Ready to Get Started with BaizEarn?</h2>
        <p class="baizearn-cta-subtitle">
          Create your account and explore the BaizEarn platform.
        </p>

        <div class="baizearn-cta-buttons">
          <a href="#register" class="baizearn-btn baizearn-btn-emerald baizearn-btn-lg">
            Create Account
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href="#login" class="baizearn-btn baizearn-btn-outline-white baizearn-btn-lg">
            Login
          </a>
        </div>
      </div>
    </section>
  </main>

  <!-- ==================== FOOTER ==================== -->
  <footer class="baizearn-footer" id="contact">
    <div class="baizearn-container baizearn-footer-grid">
      <!-- Brand column -->
      <div class="baizearn-footer-col brand-col">
        <a href="#home" class="baizearn-logo">
          <div class="baizearn-logo-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <span class="baizearn-logo-text">Baiz<span class="baizearn-text-emerald">Earn</span></span>
        </a>
        <p class="baizearn-tagline">“Earn Smarter. Grow Faster.”</p>
        <p class="baizearn-footer-desc">A modern digital earning, rewards, tasks and referral platform engineered with security and transparency.</p>
        
        <div class="baizearn-social-links">
          <a href="#" class="social-btn" aria-label="Twitter / X">𝕏</a>
          <a href="#" class="social-btn" aria-label="Telegram">✈</a>
          <a href="#" class="social-btn" aria-label="LinkedIn">in</a>
          <a href="#" class="social-btn" aria-label="Facebook">f</a>
        </div>
      </div>

      <!-- Quick Links -->
      <div class="baizearn-footer-col">
        <h4 class="baizearn-footer-heading">Quick Links</h4>
        <ul class="baizearn-footer-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#referral">Referral</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
      </div>

      <!-- Support -->
      <div class="baizearn-footer-col">
        <h4 class="baizearn-footer-heading">Support</h4>
        <ul class="baizearn-footer-links">
          <li><a href="#contact">Contact</a></li>
          <li><a href="#faq">Help Center</a></li>
          <li><a href="#security">Support</a></li>
        </ul>
      </div>

      <!-- Legal -->
      <div class="baizearn-footer-col">
        <h4 class="baizearn-footer-heading">Legal</h4>
        <ul class="baizearn-footer-links">
          <li><a href="#terms">Terms & Conditions</a></li>
          <li><a href="#privacy">Privacy Policy</a></li>
        </ul>
      </div>
    </div>

    <div class="baizearn-container baizearn-footer-bottom">
      <p>© 2026 BaizEarn. All Rights Reserved.</p>
      <p class="baizearn-disclaimer">BaizEarn is a digital task and referral management platform. All rewards are subject to activity verification and applicable platform terms.</p>
    </div>
  </footer>
</div>`;

export const wpCSS = `/* =======================================================
   BAIZEARN - HOME PAGE STYLES (WordPress Compatible)
   All classes scoped to .baizearn-*
   Colors:
   - Primary Deep Navy: #071A35
   - Secondary Royal Blue: #1769E0
   - Success Emerald Green: #00C853
   - Accent Gold: #FFC107
   - Light Background: #F5F8FC
   - Main Text: #172033
   - Secondary Text: #667085
======================================================== */

.baizearn-root {
  --bz-navy: #071A35;
  --bz-navy-dark: #040e1e;
  --bz-blue: #1769E0;
  --bz-blue-hover: #1255b8;
  --bz-emerald: #00C853;
  --bz-emerald-hover: #00a846;
  --bz-gold: #FFC107;
  --bz-white: #FFFFFF;
  --bz-bg-light: #F5F8FC;
  --bz-text-main: #172033;
  --bz-text-muted: #667085;
  --bz-border: rgba(23, 105, 224, 0.12);

  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: var(--bz-text-main);
  background-color: var(--bz-bg-light);
  line-height: 1.6;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

.baizearn-root * {
  box-sizing: border-box;
}

.baizearn-container {
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px;
  padding-right: 20px;
}

/* ==================== BUTTONS ==================== */
.baizearn-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s ease;
  border: 1px solid transparent;
  white-space: nowrap;
}

.baizearn-btn-lg {
  padding: 14px 28px;
  font-size: 16px;
  border-radius: 10px;
}

.baizearn-btn-primary {
  background-color: var(--bz-blue);
  color: var(--bz-white);
  box-shadow: 0 4px 14px rgba(23, 105, 224, 0.35);
}
.baizearn-btn-primary:hover {
  background-color: var(--bz-blue-hover);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(23, 105, 224, 0.45);
}

.baizearn-btn-secondary {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--bz-white);
  border-color: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(8px);
}
.baizearn-btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: var(--bz-white);
  transform: translateY(-2px);
}

.baizearn-btn-ghost {
  background-color: transparent;
  color: var(--bz-white);
}
.baizearn-btn-ghost:hover {
  color: var(--bz-gold);
}

.baizearn-btn-emerald {
  background-color: var(--bz-emerald);
  color: #042410;
  font-weight: 700;
  box-shadow: 0 4px 14px rgba(0, 200, 83, 0.4);
}
.baizearn-btn-emerald:hover {
  background-color: var(--bz-emerald-hover);
  color: #042410;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 200, 83, 0.5);
}

.baizearn-btn-outline-white {
  background-color: transparent;
  border-color: rgba(255, 255, 255, 0.4);
  color: var(--bz-white);
}
.baizearn-btn-outline-white:hover {
  background-color: rgba(255, 255, 255, 0.15);
  border-color: var(--bz-white);
}

/* ==================== HEADER ==================== */
.baizearn-header {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  background-color: rgba(7, 26, 53, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
}

.baizearn-header.scrolled {
  background-color: rgba(7, 26, 53, 0.98);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.baizearn-header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}

.baizearn-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.baizearn-logo-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--bz-blue), var(--bz-emerald));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(23, 105, 224, 0.4);
}

.baizearn-logo-text {
  font-family: 'Poppins', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: var(--bz-white);
  letter-spacing: -0.5px;
}
.baizearn-text-emerald {
  color: var(--bz-emerald);
}

.baizearn-nav {
  display: flex;
  align-items: center;
  gap: 28px;
}

.baizearn-nav-link {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s ease;
  position: relative;
}
.baizearn-nav-link:hover,
.baizearn-nav-link.active {
  color: var(--bz-white);
}

.baizearn-header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.baizearn-hamburger {
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  flex-direction: column;
  gap: 5px;
}
.baizearn-hamburger-line {
  width: 24px;
  height: 2px;
  background-color: var(--bz-white);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.baizearn-mobile-menu {
  display: none;
  background-color: var(--bz-navy);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px;
}
.baizearn-mobile-menu.open {
  display: block;
}
.baizearn-mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
}
.baizearn-mobile-link {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
}
.baizearn-mobile-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* ==================== HERO ==================== */
.baizearn-hero {
  position: relative;
  background-color: var(--bz-navy);
  color: var(--bz-white);
  padding: 90px 0 110px;
  overflow: hidden;
}

.baizearn-hero-glow {
  position: absolute;
  top: -150px;
  right: -100px;
  width: 550px;
  height: 550px;
  background: radial-gradient(circle, rgba(23, 105, 224, 0.35) 0%, rgba(0, 200, 83, 0.15) 50%, transparent 70%);
  filter: blur(60px);
  pointer-events: none;
}

.baizearn-hero-grid-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
  background-size: 28px 28px;
  opacity: 0.4;
  pointer-events: none;
}

.baizearn-hero-content {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 50px;
  align-items: center;
  position: relative;
  z-index: 2;
}

.baizearn-pill-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(23, 105, 224, 0.2);
  border: 1px solid rgba(23, 105, 224, 0.4);
  color: #93c5fd;
  padding: 6px 14px;
  border-radius: 30px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 20px;
}

.baizearn-dot-pulse {
  width: 8px;
  height: 8px;
  background-color: var(--bz-emerald);
  border-radius: 50%;
  box-shadow: 0 0 0 3px rgba(0, 200, 83, 0.3);
}

.baizearn-hero-title {
  font-family: 'Poppins', sans-serif;
  font-size: 46px;
  font-weight: 800;
  line-height: 1.15;
  color: var(--bz-white);
  margin-top: 0;
  margin-bottom: 18px;
}

.baizearn-gradient-text {
  background: linear-gradient(135deg, #60a5fa, #34d399);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.baizearn-hero-subtitle {
  font-size: 18px;
  color: #cbd5e1;
  max-width: 520px;
  margin-bottom: 30px;
  line-height: 1.6;
}

.baizearn-hero-buttons {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.baizearn-trust-line {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 500;
  color: #94a3b8;
  letter-spacing: 0.3px;
}
.baizearn-bullet {
  color: var(--bz-emerald);
}

/* Hero Mockup Card */
.baizearn-dashboard-mockup {
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5), 0 0 30px rgba(23, 105, 224, 0.2);
  overflow: hidden;
  backdrop-filter: blur(16px);
}

.baizearn-mockup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 18px;
  background: rgba(7, 26, 53, 0.9);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.baizearn-mockup-dots {
  display: flex;
  gap: 6px;
}
.baizearn-mockup-dots .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.dot.red { background-color: #ef4444; }
.dot.yellow { background-color: #f59e0b; }
.dot.green { background-color: #10b981; }

.baizearn-mockup-search {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.06);
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 12px;
  color: #94a3b8;
}
.baizearn-mockup-user {
  display: flex;
  align-items: center;
  gap: 6px;
}
.baizearn-status-online {
  width: 8px;
  height: 8px;
  background-color: var(--bz-emerald);
  border-radius: 50%;
}
.baizearn-user-tag {
  font-size: 10px;
  font-weight: 700;
  background: rgba(255, 193, 7, 0.2);
  color: var(--bz-gold);
  padding: 2px 6px;
  border-radius: 4px;
}

.baizearn-mockup-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.baizearn-mockup-stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.baizearn-mockup-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  padding: 14px;
}
.baizearn-mockup-card .card-head {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 6px;
}
.badge-growth {
  color: var(--bz-emerald);
  font-weight: 600;
}
.badge-active {
  color: #60a5fa;
  font-weight: 600;
}
.baizearn-mockup-card .card-value {
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: var(--bz-white);
}
.baizearn-mockup-card .card-sub {
  font-size: 11px;
  color: #64748b;
  margin-top: 4px;
}

.baizearn-mockup-chart-box {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  padding: 14px;
}
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}
.chart-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--bz-white);
}
.chart-subtitle {
  font-size: 11px;
  color: #64748b;
  margin: 0;
}
.chart-legend {
  font-size: 11px;
  color: #94a3b8;
  display: flex;
  gap: 8px;
  align-items: center;
}
.legend-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--bz-blue);
}
.legend-dot.gold {
  background-color: var(--bz-emerald);
}

.baizearn-chart-bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 80px;
  padding-top: 10px;
}
.bar-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex: 1;
}
.bar-col .bar {
  width: 14px;
  border-radius: 4px 4px 0 0;
  background: linear-gradient(to top, var(--bz-blue), #38bdf8);
  transition: height 0.4s ease;
}
.bar-col span {
  font-size: 10px;
  color: #64748b;
}

.baizearn-mockup-activity {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.activity-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 8px 12px;
}
.activity-icon {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}
.activity-icon.emerald { background: rgba(0, 200, 83, 0.2); color: var(--bz-emerald); }
.activity-icon.blue { background: rgba(23, 105, 224, 0.2); color: #60a5fa; }
.activity-info {
  flex: 1;
}
.activity-title {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: var(--bz-white);
}
.activity-time {
  font-size: 10px;
  color: #64748b;
}
.activity-amt {
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: var(--bz-emerald);
}

/* ==================== STATS SECTION ==================== */
.baizearn-stats-section {
  padding: 40px 0;
  margin-top: -30px;
  position: relative;
  z-index: 10;
}
.baizearn-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.baizearn-stat-card {
  background: var(--bz-white);
  border: 1px solid var(--bz-border);
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(7, 26, 53, 0.05);
  transition: all 0.3s ease;
}
.baizearn-stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(7, 26, 53, 0.09);
  border-color: rgba(23, 105, 224, 0.3);
}
.baizearn-stat-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(23, 105, 224, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
}
.baizearn-stat-number {
  font-family: 'Poppins', sans-serif;
  font-size: 32px;
  font-weight: 800;
  color: var(--bz-navy);
  line-height: 1.1;
  margin-bottom: 4px;
}
.baizearn-stat-label {
  font-size: 15px;
  font-weight: 600;
  color: var(--bz-text-main);
  margin-bottom: 4px;
}
.baizearn-stat-demo-tag {
  font-size: 12px;
  color: var(--bz-text-muted);
}

/* ==================== SECTION HEADINGS ==================== */
.baizearn-section-heading {
  text-align: center;
  max-width: 680px;
  margin: 0 auto 50px;
}
.baizearn-section-badge {
  display: inline-block;
  background: rgba(23, 105, 224, 0.08);
  color: var(--bz-blue);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 12px;
}
.baizearn-section-title {
  font-family: 'Poppins', sans-serif;
  font-size: 34px;
  font-weight: 700;
  color: var(--bz-navy);
  margin-top: 0;
  margin-bottom: 14px;
  line-height: 1.25;
}
.baizearn-section-subtitle {
  font-size: 16px;
  color: var(--bz-text-muted);
  line-height: 1.6;
}

/* ==================== FEATURES SECTION ==================== */
.baizearn-features-section {
  padding: 80px 0;
}
.baizearn-features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.baizearn-feature-card {
  background: var(--bz-white);
  border: 1px solid var(--bz-border);
  border-radius: 14px;
  padding: 30px;
  position: relative;
  transition: all 0.3s ease;
}
.baizearn-feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(7, 26, 53, 0.08);
  border-color: rgba(23, 105, 224, 0.3);
}
.baizearn-feature-icon-box {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
}
.icon-blue { background: rgba(23, 105, 224, 0.1); color: var(--bz-blue); }
.icon-emerald { background: rgba(0, 200, 83, 0.1); color: var(--bz-emerald); }
.icon-gold { background: rgba(255, 193, 7, 0.15); color: #d97706; }

.baizearn-card-tag {
  position: absolute;
  top: 24px;
  right: 24px;
  font-size: 11px;
  font-weight: 600;
  color: var(--bz-text-muted);
  background: #f1f5f9;
  padding: 3px 8px;
  border-radius: 6px;
}
.baizearn-feature-title {
  font-family: 'Poppins', sans-serif;
  font-size: 19px;
  font-weight: 600;
  color: var(--bz-navy);
  margin: 0 0 10px;
}
.baizearn-feature-desc {
  font-size: 14px;
  color: var(--bz-text-muted);
  margin: 0;
  line-height: 1.6;
}

/* ==================== HOW IT WORKS ==================== */
.baizearn-steps-section {
  padding: 80px 0;
  background: var(--bz-white);
  border-top: 1px solid var(--bz-border);
  border-bottom: 1px solid var(--bz-border);
}
.baizearn-steps-timeline {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}
.baizearn-step-card {
  background: var(--bz-bg-light);
  border: 1px solid var(--bz-border);
  border-radius: 12px;
  padding: 24px 18px;
  transition: all 0.3s ease;
  position: relative;
}
.baizearn-step-card:hover {
  background: var(--bz-white);
  border-color: var(--bz-blue);
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(23, 105, 224, 0.08);
}
.baizearn-step-number {
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: var(--bz-blue);
  margin-bottom: 14px;
}
.baizearn-step-title {
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: var(--bz-navy);
  margin: 0 0 8px;
}
.baizearn-step-desc {
  font-size: 13px;
  color: var(--bz-text-muted);
  margin: 0;
  line-height: 1.5;
}

/* ==================== WHY BAIZEARN ==================== */
.baizearn-why-section {
  padding: 90px 0;
}
.baizearn-why-grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 50px;
  align-items: center;
}
.baizearn-tech-shield-card {
  background: linear-gradient(145deg, #071A35, #0d274c);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  padding: 40px;
  color: var(--bz-white);
  box-shadow: 0 20px 45px rgba(7, 26, 53, 0.15);
  text-align: center;
}
.baizearn-shield-icon {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: rgba(0, 200, 83, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}
.baizearn-tech-shield-card h4 {
  font-family: 'Poppins', sans-serif;
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 12px;
}
.baizearn-tech-shield-card p {
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 24px;
}
.baizearn-security-pills {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
}
.baizearn-security-pills .pill {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 13px;
  color: #cbd5e1;
  display: flex;
  align-items: center;
  gap: 10px;
}
.baizearn-security-pills .pill span {
  color: var(--bz-emerald);
  font-weight: bold;
}

.baizearn-benefits-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.baizearn-benefit-item {
  display: flex;
  gap: 12px;
  background: var(--bz-white);
  border: 1px solid var(--bz-border);
  padding: 18px;
  border-radius: 10px;
}
.baizearn-benefit-item .check-icon {
  width: 24px;
  height: 24px;
  background: rgba(0, 200, 83, 0.15);
  color: var(--bz-emerald);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  flex-shrink: 0;
}
.benefit-text strong {
  display: block;
  font-size: 15px;
  color: var(--bz-navy);
  margin-bottom: 4px;
}
.benefit-text p {
  font-size: 13px;
  color: var(--bz-text-muted);
  margin: 0;
  line-height: 1.4;
}

/* ==================== REFERRAL SECTION ==================== */
.baizearn-referral-section {
  padding: 90px 0;
  background: var(--bz-white);
  border-top: 1px solid var(--bz-border);
}
.baizearn-referral-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
}
.baizearn-referral-highlights {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 24px 0 30px;
}
.highlight-point {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  color: var(--bz-text-main);
  font-weight: 500;
}
.point-bullet {
  width: 8px;
  height: 8px;
  background-color: var(--bz-blue);
  border-radius: 50%;
}

.baizearn-referral-diagram {
  background: var(--bz-bg-light);
  border: 1px solid var(--bz-border);
  border-radius: 16px;
  padding: 30px;
  text-align: center;
}
.baizearn-tree-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}
.tree-node {
  background: var(--bz-white);
  border: 1px solid var(--bz-border);
  padding: 12px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(7, 26, 53, 0.05);
  display: flex;
  align-items: center;
  gap: 12px;
}
.root-node {
  border-color: var(--bz-blue);
  background: #eff6ff;
}
.node-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #cbd5e1;
  color: #334155;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: bold;
}
.root-avatar {
  background: var(--bz-blue);
  color: white;
}
.node-info {
  text-align: left;
}
.node-info strong {
  display: block;
  font-size: 13px;
  color: var(--bz-navy);
}
.node-info span {
  font-size: 11px;
  color: var(--bz-text-muted);
}

.tree-connector-lines {
  width: 2px;
  height: 20px;
  background: #cbd5e1;
}
.tree-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}
.child-node {
  padding: 10px 14px;
}

/* ==================== MOBILE EXPERIENCE ==================== */
.baizearn-mobile-section {
  padding: 90px 0;
}
.baizearn-mobile-grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 60px;
  align-items: center;
}
.baizearn-phone-visual {
  display: flex;
  justify-content: center;
}
.baizearn-phone-mockup {
  width: 260px;
  background: #0f172a;
  border: 10px solid #1e293b;
  border-radius: 36px;
  padding: 16px 12px;
  box-shadow: 0 25px 60px rgba(7, 26, 53, 0.2);
  color: white;
}
.phone-speaker {
  width: 50px;
  height: 4px;
  background: #334155;
  border-radius: 4px;
  margin: 0 auto 14px;
}
.phone-app-bar {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #94a3b8;
  margin-bottom: 12px;
}
.phone-wallet-card {
  background: linear-gradient(135deg, var(--bz-blue), #0d47a1);
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 16px;
}
.phone-wallet-card .label { font-size: 11px; color: #bfdbfe; display: block; }
.phone-wallet-card .amount { font-family: 'Poppins', sans-serif; font-size: 20px; font-weight: 700; display: block; margin: 4px 0; }
.phone-wallet-card .tag { font-size: 10px; background: rgba(255, 255, 255, 0.2); padding: 2px 6px; border-radius: 4px; }

.phone-task-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.phone-task-item {
  background: #1e293b;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
}
.phone-task-item .badge {
  background: rgba(0, 200, 83, 0.2);
  color: var(--bz-emerald);
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 4px;
}

.baizearn-mobile-features-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 24px;
}
.baizearn-mobile-features-list .item {
  display: flex;
  gap: 14px;
}
.baizearn-mobile-features-list .bullet {
  font-size: 20px;
}
.baizearn-mobile-features-list strong {
  display: block;
  font-size: 16px;
  color: var(--bz-navy);
  margin-bottom: 4px;
}
.baizearn-mobile-features-list p {
  font-size: 14px;
  color: var(--bz-text-muted);
  margin: 0;
}

/* ==================== SECURITY SECTION ==================== */
.baizearn-security-section {
  padding: 90px 0;
  background: var(--bz-white);
  border-top: 1px solid var(--bz-border);
}
.baizearn-security-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}
.baizearn-security-card {
  background: var(--bz-bg-light);
  border: 1px solid var(--bz-border);
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  transition: all 0.3s ease;
}
.baizearn-security-card:hover {
  transform: translateY(-4px);
  border-color: var(--bz-blue);
  box-shadow: 0 10px 25px rgba(7, 26, 53, 0.05);
}
.baizearn-security-card .icon {
  font-size: 28px;
  margin-bottom: 12px;
}
.baizearn-security-card h3 {
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: var(--bz-navy);
  margin: 0 0 8px;
}
.baizearn-security-card p {
  font-size: 13px;
  color: var(--bz-text-muted);
  margin: 0;
}

/* ==================== FAQ SECTION ==================== */
.baizearn-faq-section {
  padding: 90px 0;
}
.baizearn-faq-accordion {
  max-width: 780px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.baizearn-faq-item {
  background: var(--bz-white);
  border: 1px solid var(--bz-border);
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
}
.baizearn-faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 22px;
  background: none;
  border: none;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: var(--bz-navy);
  text-align: left;
  cursor: pointer;
}
.faq-icon {
  font-size: 20px;
  font-weight: bold;
  color: var(--bz-blue);
  transition: transform 0.3s ease;
}
.baizearn-faq-item.active .faq-icon {
  transform: rotate(45deg);
}
.baizearn-faq-answer {
  padding: 0 22px 18px;
  display: none;
  font-size: 14px;
  color: var(--bz-text-muted);
  line-height: 1.6;
}
.baizearn-faq-item.active .baizearn-faq-answer {
  display: block;
}

/* ==================== FINAL CTA ==================== */
.baizearn-cta-section {
  position: relative;
  background: var(--bz-navy);
  color: var(--bz-white);
  padding: 100px 0;
  text-align: center;
  overflow: hidden;
}
.baizearn-cta-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(0, 200, 83, 0.15) 0%, rgba(23, 105, 224, 0.2) 50%, transparent 70%);
  filter: blur(80px);
  pointer-events: none;
}
.baizearn-cta-content {
  position: relative;
  z-index: 2;
  max-width: 650px;
}
.baizearn-cta-title {
  font-family: 'Poppins', sans-serif;
  font-size: 38px;
  font-weight: 800;
  color: var(--bz-white);
  margin-top: 0;
  margin-bottom: 16px;
}
.baizearn-cta-subtitle {
  font-size: 18px;
  color: #cbd5e1;
  margin-bottom: 34px;
}
.baizearn-cta-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

/* ==================== FOOTER ==================== */
.baizearn-footer {
  background: var(--bz-navy-dark);
  color: #94a3b8;
  padding: 80px 0 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}
.baizearn-footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 60px;
}
.brand-col .baizearn-tagline {
  color: #cbd5e1;
  font-weight: 600;
  font-size: 15px;
  margin: 14px 0 10px;
}
.brand-col .baizearn-footer-desc {
  font-size: 13px;
  line-height: 1.6;
  max-width: 320px;
  margin-bottom: 20px;
}
.baizearn-social-links {
  display: flex;
  gap: 10px;
}
.social-btn {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;
  transition: all 0.2s ease;
}
.social-btn:hover {
  background: var(--bz-blue);
  transform: translateY(-2px);
}

.baizearn-footer-heading {
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: var(--bz-white);
  margin-top: 0;
  margin-bottom: 18px;
}
.baizearn-footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.baizearn-footer-links a {
  color: #94a3b8;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s ease;
}
.baizearn-footer-links a:hover {
  color: var(--bz-white);
}

.baizearn-footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  flex-wrap: wrap;
  gap: 14px;
}
.baizearn-disclaimer {
  max-width: 500px;
  margin: 0;
  font-size: 11px;
  color: #64748b;
}

/* ==================== RESPONSIVE MEDIA QUERIES ==================== */
@media (max-width: 1024px) {
  .baizearn-hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .baizearn-hero-subtitle {
    margin-left: auto;
    margin-right: auto;
  }
  .baizearn-hero-buttons {
    justify-content: center;
  }
  .baizearn-trust-line {
    justify-content: center;
  }
  .baizearn-features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .baizearn-steps-timeline {
    grid-template-columns: repeat(3, 1fr);
  }
  .baizearn-why-grid,
  .baizearn-referral-grid,
  .baizearn-mobile-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .baizearn-footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .baizearn-nav,
  .baizearn-header-actions {
    display: none;
  }
  .baizearn-hamburger {
    display: flex;
  }
  .baizearn-hero-title {
    font-size: 34px;
  }
  .baizearn-stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .baizearn-steps-timeline {
    grid-template-columns: 1fr;
  }
  .baizearn-features-grid {
    grid-template-columns: 1fr;
  }
  .baizearn-benefits-grid {
    grid-template-columns: 1fr;
  }
  .baizearn-footer-grid {
    grid-template-columns: 1fr;
  }
  .baizearn-footer-bottom {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .baizearn-stats-grid {
    grid-template-columns: 1fr;
  }
  .baizearn-mockup-stats-grid {
    grid-template-columns: 1fr;
  }
  .baizearn-hero-title {
    font-size: 28px;
  }
  .baizearn-btn-lg {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .baizearn-root * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`;

export const wpJS = `/**
 * BAIZEARN - Vanilla JavaScript for WordPress Integration
 * Scoped safely inside DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', function () {
  // 1. Sticky Header Shadow on Scroll
  const header = document.getElementById('baizearnHeader');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('baizearnMobileToggle');
  const mobileMenu = document.getElementById('baizearnMobileMenu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when clicking navigation links
    const mobileLinks = mobileMenu.querySelectorAll('.baizearn-mobile-link, .baizearn-btn');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. FAQ Accordion Interaction
  const faqItems = document.querySelectorAll('.baizearn-faq-item');
  faqItems.forEach(function (item) {
    const questionBtn = item.querySelector('.baizearn-faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', function () {
        const isCurrentActive = item.classList.contains('active');
        
        // Close other items
        faqItems.forEach(function (other) {
          other.classList.remove('active');
          const btn = other.querySelector('.baizearn-faq-question');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });

        if (!isCurrentActive) {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // 4. Smooth Anchor Link Scrolling
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});
`;
