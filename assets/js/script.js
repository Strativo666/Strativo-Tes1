// ========================================
// STRATIVO - Main JavaScript
// Navigation, Animations, and Interactions
// ========================================

document.addEventListener('DOMContentLoaded', function () {

  // ========================================
  // Mobile Navigation Toggle
  // ========================================
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');

  if (navbarToggle) {
    navbarToggle.addEventListener('click', function () {
      navbarToggle.classList.toggle('active');
      navbarMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link (except dropdown toggles)
    const navLinks = document.querySelectorAll('.navbar-menu > li > a:not(.dropdown-toggle)');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbarToggle.classList.remove('active');
        navbarMenu.classList.remove('active');
      });
    });

    // Mobile dropdown toggle
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          this.parentElement.classList.toggle('active');
        }
      });
    });
  }

  // ========================================
  // Navbar Scroll Effect
  // ========================================
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ========================================
  // Smooth Scrolling for Anchor Links
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Skip if it's just "#"
      if (href === '#') {
        e.preventDefault();
        return;
      }

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();

        const navbarHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========================================
  // Scroll Animation Observer
  // ========================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements with animation classes
  const animatedElements = document.querySelectorAll('.card, .problem-item, .feature, .testimonial');

  animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });

  // ========================================
  // Form Validation and Submission
  // ========================================
  const forms = document.querySelectorAll('.form');

  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(form);
      const data = {};

      formData.forEach((value, key) => {
        data[key] = value;
      });

      // Validate required fields
      let isValid = true;
      const requiredFields = form.querySelectorAll('[required]');

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = 'var(--color-accent)';
        } else {
          field.style.borderColor = 'var(--color-gray-200)';
        }
      });

      if (!isValid) {
        alert('Mohon lengkapi semua field yang diperlukan');
        return;
      }

      // Email validation
      const emailField = form.querySelector('input[type="email"]');
      if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
          alert('Format email tidak valid');
          emailField.style.borderColor = 'var(--color-accent)';
          return;
        }
      }

      // Phone validation (Indonesian format)
      const phoneField = form.querySelector('input[type="tel"]');
      if (phoneField && phoneField.value) {
        const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
        if (!phoneRegex.test(phoneField.value.replace(/\s/g, ''))) {
          alert('Format nomor WhatsApp tidak valid. Gunakan format: 08xxxxxxxxxx atau +628xxxxxxxxxx');
          phoneField.style.borderColor = 'var(--color-accent)';
          return;
        }
      }

      // If validation passes, prepare WhatsApp message
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Mengirim...';
      submitBtn.disabled = true;

      // Simulate submission delay
      setTimeout(() => {
        // Prepare WhatsApp message
        let message = '=== Pendaftaran STRATIVO ===\n\n';

        for (const [key, value] of Object.entries(data)) {
          const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
          message += `${label}: ${value}\n`;
        }

        // WhatsApp number (replace with actual number)
        const whatsappNumber = '6282124198198'; // Replace with actual number
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        // Open WhatsApp in new tab
        window.open(whatsappURL, '_blank');

        // Reset form
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // Show success message
        alert('Terima kasih! Anda akan diarahkan ke WhatsApp untuk melanjutkan pendaftaran.');
      }, 1000);
    });
  });

  // ========================================
  // WhatsApp CTA Button Tracking
  // ========================================
  const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');

  whatsappButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      // Track button click (can be integrated with analytics)
      const buttonText = this.textContent.trim();
      console.log(`WhatsApp CTA clicked: ${buttonText}`);
    });
  });

  // ========================================
  // Accordion Logic
  // ========================================
  const accordions = document.querySelectorAll('.accordion-header');

  accordions.forEach(acc => {
    acc.addEventListener('click', function () {
      // Toggle active class on parent
      const parent = this.parentElement;
      const isActive = parent.classList.contains('active');

      // Close all other accordions (optional)
      /* 
      document.querySelectorAll('.accordion').forEach(a => {
        a.classList.remove('active');
      });
      */

      if (isActive) {
        parent.classList.remove('active');
      } else {
        parent.classList.add('active');
      }
    });
  });

  // ========================================
  // Card Click Handling
  // ========================================
  const clickableCards = document.querySelectorAll('.card[data-link]');

  clickableCards.forEach(card => {
    card.style.cursor = 'pointer';

    card.addEventListener('click', function () {
      const link = this.getAttribute('data-link');
      if (link) {
        window.location.href = link;
      }
    });
  });

  // ========================================
  // Counter Animation (for stats)
  // ========================================
  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };

    updateCounter();
  }

  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        animateCounter(entry.target);
        entry.target.classList.add('counted');
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  // ========================================
  // Parallax Effect (subtle)
  // ========================================
  const parallaxElements = document.querySelectorAll('.parallax');

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach(el => {
      const speed = el.getAttribute('data-speed') || 0.5;
      const yPos = -(scrolled * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });
  });

  // ========================================
  // Lazy Loading Images
  // ========================================
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));

  // ========================================
  // Active Page Highlighting in Navigation
  // ========================================
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-menu a');

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.style.color = 'var(--color-secondary)';
      link.style.fontWeight = '600';
    }
  });

});

// ========================================
// Utility Functions
// ========================================

// Format phone number for WhatsApp
function formatPhoneForWhatsApp(phone) {
  // Remove all non-numeric characters
  let cleaned = phone.replace(/\D/g, '');

  // If starts with 0, replace with 62
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.substring(1);
  }

  // If doesn't start with 62, add it
  if (!cleaned.startsWith('62')) {
    cleaned = '62' + cleaned;
  }

  return cleaned;
}

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    formatPhoneForWhatsApp,
    debounce
  };
}

// === HVP Page Enhancements ===

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const update = () => {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(update);
    } else {
      element.textContent = target;
    }
  };
  update();
}

// Trigger counter animation when in view
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = parseInt(counter.getAttribute('data-target'));
      animateCounter(counter, target);
      counterObserver.unobserve(counter);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(counter => {
  counterObserver.observe(counter);
});

// Card hover micro-interactions
document.querySelectorAll('.service-card-premium').forEach(card => {
  card.addEventListener('mouseenter', function () {
    this.style.zIndex = '10';
  });

  card.addEventListener('mouseleave', function () {
    this.style.zIndex = '1';
  });
});

// Smooth scroll for anchor links with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Track service card clicks (for analytics)
document.querySelectorAll('[data-service]').forEach(card => {
  card.addEventListener('click', function (e) {
    const service = this.getAttribute('data-service');
    console.log(`Service interest tracked: ${service}`);
    // Optional: Send to analytics
    // gtag('event', 'service_click', { 'service_name': service });
  });
});

// Add fade-in animation on scroll for service cards
const serviceObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100); // Staggered animation
      serviceObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card-premium').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  serviceObserver.observe(card);
});

// ========================================
// HVP Strategic Page Enhancements
// ========================================

// Smooth scroll for anchor links with navbar offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Fade-in animation for solution steps on scroll
const solutionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.classList.add('animated');
      }, index * 150);
      solutionObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.solution-step').forEach(step => {
  step.style.opacity = '0';
  step.style.transform = 'translateY(20px)';
  step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  solutionObserver.observe(step);
});

// Track CTA clicks for analytics (optional)
document.querySelectorAll('[href*="contact.html?service"]').forEach(link => {
  link.addEventListener('click', function () {
    const service = new URLSearchParams(this.search).get('service');
    console.log(`CTA Clicked - Service: ${service}`);
    // Optional: Send to analytics
    // gtag('event', 'cta_click', { 'service': service });
  });
});

// Add subtle hover effect enhancement for problem cards
document.querySelectorAll('.problem-card').forEach(card => {
  card.addEventListener('mouseenter', function () {
    this.style.zIndex = '5';
  });
  card.addEventListener('mouseleave', function () {
    this.style.zIndex = '1';
  });
});

// === HVP Service Page Enhancements ===
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for anchor links (if any)
  document.querySelectorAll('.hvp-service-page a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Simple fade-in on scroll (progressive enhancement)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.hvp-service-page section').forEach(sec => {
    sec.style.opacity = 0;
    sec.style.transform = 'translateY(20px)';
    sec.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(sec);
  });
});

// ========================================
// HERO PRODUCTION - ENHANCEMENTS
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  // Parallax effect on scroll for orbs
  const orbs = document.querySelectorAll('.hero-production__orb');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        orbs.forEach((orb, index) => {
          const speed = 0.3 + (index * 0.1);
          const yPos = scrolled * speed;
          orb.style.transform = `translateY(${yPos}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  });

  // Smooth reveal on scroll for hero content
  const heroContent = document.querySelector('.hero-production__content');
  if (heroContent) {
    heroContent.style.opacity = '1';
    heroContent.style.transform = 'translateY(0)';
  }

  // CTA button micro-interactions
  const primaryCta = document.querySelector('.hero-production__cta--primary');
  const secondaryCta = document.querySelector('.hero-production__cta--secondary');

  if (primaryCta) {
    primaryCta.addEventListener('mouseenter', () => {
      primaryCta.style.transform = 'translateY(-3px) scale(1.02)';
    });
    primaryCta.addEventListener('mouseleave', () => {
      primaryCta.style.transform = 'translateY(0) scale(1)';
    });
  }

  if (secondaryCta) {
    secondaryCta.addEventListener('mouseenter', () => {
      secondaryCta.style.transform = 'translateY(-3px) scale(1.02)';
    });
    secondaryCta.addEventListener('mouseleave', () => {
      secondaryCta.style.transform = 'translateY(0) scale(1)';
    });
  }

  // Track hero CTA clicks
  document.querySelectorAll('.hero-production__cta a').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const label = btn.textContent.trim();
      console.log(`Hero CTA Clicked: ${label}`);
      // Optional: Send to analytics
      // gtag('event', 'hero_cta_click', { 'button': label });
    });
  });
});


// Horizontal Scroll Navigation
function initSolutionScroll() {
  const containers = document.querySelectorAll('.solution-scroll-container');

  containers.forEach(container => {
    const wrapper = container.parentElement;
    const prevBtn = wrapper.querySelector('.scroll-nav-btn.prev');
    const nextBtn = wrapper.querySelector('.scroll-nav-btn.next');

    if (!prevBtn || !nextBtn) return;

    const scrollAmount = 350;

    prevBtn.addEventListener('click', () => {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // Update button states
    container.addEventListener('scroll', () => {
      prevBtn.disabled = container.scrollLeft === 0;
      nextBtn.disabled = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
    });

    // Initial check
    prevBtn.disabled = true;
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initSolutionScroll);

document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.service-carousel-track');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const cards = document.querySelectorAll('.service-carousel-track .service-card-premium');

  if (!track || !prevBtn || !nextBtn || cards.length === 0) return;

  let currentIndex = 0;

  function getVisibleCards() {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function updateButtons() {
    const visible = getVisibleCards();
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= cards.length - visible;
  }

  function slide() {
    const visible = getVisibleCards();
    const cardWidth = cards[0].offsetWidth;
    const gap = parseFloat(getComputedStyle(track).gap) || 32;
    track.scrollTo({
      left: currentIndex * (cardWidth + gap),
      behavior: 'smooth'
    });
    updateButtons();
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      slide();
    }
  });

  nextBtn.addEventListener('click', () => {
    const visible = getVisibleCards();
    if (currentIndex < cards.length - visible) {
      currentIndex++;
      slide();
    }
  });

  // Reset position on resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      currentIndex = Math.min(currentIndex, cards.length - getVisibleCards());
      slide();
    }, 200);
  });

  updateButtons();
});

