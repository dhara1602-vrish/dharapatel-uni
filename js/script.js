/**
 * ==========================================================================
 * DHARA PATEL — Digital Marketer & Social Media Manager
 * Client-side JavaScript (Lightweight, Accessible, Zero Dependencies)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initWhatsAppEnquiryForm();
  initCaseStudyModal();
  initScrollSpy();
});

/**
 * 1. Mobile Menu Drawer Navigation
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

  // Close when clicking any nav link
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      toggleMenu(false);
    }
  });
}

/**
 * 2. WhatsApp Form Integration
 * On submit, constructs a pre-filled WhatsApp message in exact requested format:
 *
 * Hi Dhara, I'm interested in your digital marketing/social media services.
 *
 * Name:
 * [entered name]
 *
 * Business:
 * [entered business]
 *
 * Contact:
 * [entered contact]
 *
 * What I need help with:
 * [entered message]
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
 * 3. Case Study Presentation Modal
 * Authentic case studies for the 4 verified projects only
 */
const CASE_STUDIES = {
  'sv-bakers': {
    title: "SV Baker's by Heta",
    category: "Home Bakery",
    location: "Surat, Gujarat",
    image: "assets/heta_desai_mockup.jpg",
    goal: "Establish a distinct local digital identity for an artisanal home bakery, driving local awareness and customer orders across Surat.",
    approach: "Took charge of social media content planning, product photography direction, high-appeal dessert reel concepts, and localized SEO captions.",
    deliverables: [
      "Social Media Content",
      "Reels",
      "SEO Captions",
      "Promotional Creatives",
      "Local Content"
    ],
    results: "Focus: consistent content, stronger brand presentation and improved local visibility."
  },
  'chaina-delights': {
    title: "Chaina Delights",
    category: "Chinese & Indo-Chinese Restaurant",
    location: "Pal, Surat",
    image: "assets/heta_desai_mockup.jpg",
    goal: "Showcase food quality, sizzling dishes, and festival food specials to attract local walk-ins and direct inquiries from Surat food enthusiasts.",
    approach: "Created appetizing reel hooks, clear promotional offer graphics, localized keywords, and festive campaign announcements.",
    deliverables: [
      "Food Reels",
      "Promotional Creatives",
      "SEO Captions",
      "Local Keywords",
      "Festival Campaigns",
      "Offer Creatives"
    ],
    results: "Focus: consistent content, stronger brand presentation and improved local visibility."
  },
  'sparkle-stitch': {
    title: "Sparkle & Stitch Gallery",
    category: "Fashion & Creative Studio",
    location: "Vadodara, Gujarat",
    image: "assets/sparkle_stitch_mockup.jpg",
    goal: "Highlight custom designer craftsmanship, intricate embroidery, and bespoke tailoring to build trust with high-intent fashion clientele.",
    approach: "Designed clean, elegant aesthetic visuals and storytelling reels that emphasize fabric details, custom fits, and studio artistry.",
    deliverables: [
      "Social Media Creatives",
      "Promotional Posts",
      "Festival Content",
      "Brand Communication"
    ],
    results: "Focus: consistent content, stronger brand presentation and improved local visibility."
  },
  'sv-food': {
    title: "SV Food",
    category: "Food Business",
    location: "Gujarat, India",
    image: "assets/sv_foods_mockup.jpg",
    goal: "Build customer appetite and brand consistency through clear food presentation, special deals, and trustworthy messaging.",
    approach: "Curated appealing menu highlights, customer-first messaging, and regular social updates to keep the brand top-of-mind.",
    deliverables: [
      "Food Presentation Content",
      "Promotional Graphics",
      "Customer-Focused Messaging"
    ],
    results: "Focus: consistent content, stronger brand presentation and improved local visibility."
  }
};

function initCaseStudyModal() {
  const modalOverlay = document.getElementById('case-study-modal');
  const closeBtn = document.getElementById('modal-close');
  if (!modalOverlay || !closeBtn) return;

  const modalTitle = document.getElementById('modal-project-title');
  const modalCategory = document.getElementById('modal-project-category');
  const modalLocation = document.getElementById('modal-project-location');
  const modalImage = document.getElementById('modal-project-img');
  const modalGoal = document.getElementById('modal-project-goal');
  const modalApproach = document.getElementById('modal-project-approach');
  const modalDeliverables = document.getElementById('modal-project-deliverables');
  const modalResults = document.getElementById('modal-project-results');

  function openCaseStudy(id) {
    const data = CASE_STUDIES[id];
    if (!data) return;

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalCategory) modalCategory.textContent = data.category;
    if (modalLocation) modalLocation.textContent = data.location;
    if (modalGoal) modalGoal.textContent = data.goal;
    if (modalApproach) modalApproach.textContent = data.approach;
    if (modalResults) modalResults.textContent = data.results;

    if (modalImage) {
      modalImage.src = data.image;
      modalImage.alt = `${data.title} Work Showcase`;
    }

    if (modalDeliverables) {
      modalDeliverables.innerHTML = '';
      data.deliverables.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        li.style.fontSize = '0.925rem';
        li.style.color = 'var(--text-secondary)';
        li.style.marginBottom = '0.4rem';
        modalDeliverables.appendChild(li);
      });
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Trigger buttons
  document.querySelectorAll('[data-case-study]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-case-study');
      openCaseStudy(id);
    });
  });

  closeBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/**
 * 4. Active Navigation State Tracking (ScrollSpy)
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
