/**
 * ==========================================================================
 * DHARA PATEL — Digital Marketer & Social Media Manager
 * Client-Side JavaScript & Central Client Data Structure
 * ==========================================================================
 */

/**
 * ==========================================================================
 * 1. CENTRAL CLIENT DATA STRUCTURE
 * All client cards are dynamically rendered from this single source of truth.
 * To add, edit, or remove a client, simply update this array.
 * ==========================================================================
 */
const clients = [
  {
    clientName: "Sparkle & Stitch Gallery",
    businessCategory: "Fashion / Clothing / Designer Wear",
    city: "Vadodara",
    state: "Gujarat",
    country: "India",
    logo: "assets/sparkle_and_stitch_logo.jpg",
    instagramUrl: "https://www.instagram.com/d_h_aa_r_a",
    services: [
      "Social Media Creatives",
      "Promotional Posts",
      "Festival Content",
      "Brand Communication"
    ]
  },
  {
    clientName: "SV Baker's by Heta",
    businessCategory: "Home Bakery",
    city: "Surat",
    state: "Gujarat",
    country: "India",
    logo: "assets/svbakers_logo.jpg",
    instagramUrl: "https://www.instagram.com/d_h_aa_r_a",
    services: [
      "Social Media Content",
      "Reels",
      "SEO Captions",
      "Promotional Creatives",
      "Local Content"
    ]
  },
  {
    clientName: "Chaina Delights",
    businessCategory: "Chinese & Indo-Chinese Restaurant",
    city: "Pal, Surat",
    state: "Gujarat",
    country: "India",
    logo: "assets/chaina_delights_logo.jpg",
    instagramUrl: "https://www.instagram.com/d_h_aa_r_a",
    services: [
      "Food Reels",
      "Promotional Creatives",
      "SEO Captions",
      "Local Keywords",
      "Festival Campaigns"
    ]
  },
  {
    clientName: "SV Food",
    businessCategory: "Food Business",
    city: "Gujarat",
    state: "Gujarat",
    country: "India",
    logo: "assets/svfoods_logo.jpg",
    instagramUrl: "https://www.instagram.com/d_h_aa_r_a",
    services: [
      "Food Presentation Content",
      "Promotional Content",
      "Customer Messaging"
    ]
  }
];

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  renderClientCards();
  initMobileMenu();
  initWhatsAppEnquiryForm();
  initScrollSpy();
});

/**
 * 2. Reusable Client Card Generator
 * Dynamically builds and injects client cards from the central clients array.
 */
function renderClientCards() {
  const container = document.getElementById('client-work-grid');
  if (!container) return;

  container.innerHTML = '';

  clients.forEach((client) => {
    const card = document.createElement('article');
    card.className = 'client-card';

    const tagsHtml = client.services
      .map((svc) => `<span class="client-service-tag">${escapeHtml(svc)}</span>`)
      .join('');

    card.innerHTML = `
      <div class="client-card-header">
        <div class="client-logo-box">
          <img 
            src="${escapeHtml(client.logo)}" 
            alt="${escapeHtml(client.clientName)} Logo" 
            class="client-logo-img" 
            loading="lazy" 
          />
        </div>
        <div class="client-meta-info">
          <h3 class="client-name">${escapeHtml(client.clientName)}</h3>
          <span class="client-category">${escapeHtml(client.businessCategory)}</span>
          <span class="client-location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:-2px;margin-right:2px;">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            ${escapeHtml(client.city)}, ${escapeHtml(client.state)}, ${escapeHtml(client.country)}
          </span>
        </div>
      </div>

      <div class="client-services-wrap">
        <div class="client-services-label">Services Provided</div>
        <div class="client-services-tags">
          ${tagsHtml}
        </div>
      </div>

      <div class="client-card-footer">
        <a 
          href="${escapeHtml(client.instagramUrl)}" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="client-instagram-link"
          aria-label="View Instagram for ${escapeHtml(client.clientName)}"
        >
          <span>View Instagram</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>
    `;

    container.appendChild(card);
  });
}

/**
 * 3. Mobile Navigation Drawer
 */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburger-toggle');
  const mobileNav = document.getElementById('mobile-drawer');
  if (!hamburgerBtn || !mobileNav) return;

  function toggleMenu(show) {
    const isExpanded = show !== undefined ? show : hamburgerBtn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    } else {
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      mobileNav.classList.add('open');
    }
  }

  hamburgerBtn.addEventListener('click', () => {
    const currentlyExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
    toggleMenu(!currentlyExpanded);
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      toggleMenu(false);
    }
  });
}

/**
 * 4. WhatsApp Form Submission Handler
 */
function initWhatsAppEnquiryForm() {
  const form = document.getElementById('enquiry-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = (document.getElementById('form-name')?.value || '').trim();
    const business = (document.getElementById('form-business')?.value || '').trim();
    const contact = (document.getElementById('form-contact')?.value || '').trim();
    const details = (document.getElementById('form-details')?.value || '').trim();

    if (!name || !details) {
      alert('Please fill in your name and what you need help with.');
      return;
    }

    const message = [
      "Hi Dhara, I'm interested in your digital marketing/social media services.",
      "",
      "Name:",
      name,
      "",
      "Business:",
      business || "Not specified",
      "",
      "Contact:",
      contact || "Not specified",
      "",
      "What I need help with:",
      details
    ].join("\n");

    const waUrl = `https://wa.me/919601907678?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });
}

/**
 * 5. ScrollSpy Navigation Highlighting
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[data-nav-target]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('data-nav-target') === id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -65% 0px',
    threshold: 0
  });

  sections.forEach((sec) => observer.observe(sec));
}

/**
 * Helper: Simple HTML Escaping
 */
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
