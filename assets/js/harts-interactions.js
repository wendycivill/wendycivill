/**
 * HART'S Haiti - Interactive JavaScript
 * Add this script to your WordPress site via:
 * - Customizer > Additional JavaScript (if supported)
 * - A custom JavaScript plugin
 * - Theme functions.php with wp_enqueue_script
 */

(function() {
  'use strict';

  // ==========================================================================
  // Configuration
  // ==========================================================================
  const CONFIG = {
    animationThreshold: 0.15,
    counterDuration: 2000,
    debounceDelay: 10,
    scrollTopThreshold: 300
  };

  // ==========================================================================
  // Utility Functions
  // ==========================================================================

  /**
   * Debounce function for performance optimization
   */
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

  /**
   * Check if element is in viewport
   */
  function isInViewport(element, threshold = 0) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    return (
      rect.top <= windowHeight * (1 - threshold) &&
      rect.bottom >= 0
    );
  }

  // ==========================================================================
  // Page Loader
  // ==========================================================================

  function initPageLoader() {
    // Create loader element if it doesn't exist
    let loader = document.querySelector('.harts-page-loader');

    if (!loader) {
      loader = document.createElement('div');
      loader.className = 'harts-page-loader';
      loader.innerHTML = '<div class="harts-loader-spinner"></div>';
      document.body.prepend(loader);
    }

    // Hide loader when page is fully loaded
    window.addEventListener('load', function() {
      setTimeout(function() {
        loader.classList.add('loaded');
        // Remove from DOM after animation
        setTimeout(function() {
          loader.remove();
        }, 500);
      }, 300);
    });
  }

  // ==========================================================================
  // Scroll Progress Indicator
  // ==========================================================================

  function initScrollProgress() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'harts-scroll-progress';
    document.body.prepend(progressBar);

    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = progress + '%';
    }

    window.addEventListener('scroll', debounce(updateProgress, CONFIG.debounceDelay));
  }

  // ==========================================================================
  // Scroll Animations (Intersection Observer)
  // ==========================================================================

  function initScrollAnimations() {
    // Add animation classes to elements
    const animatableSelectors = [
      '.wp-block-columns',
      '.wp-block-image',
      '.wp-block-heading',
      '.wp-block-group',
      '.wp-block-button',
      '.is-style-section-2'
    ];

    // Find and mark elements for animation
    animatableSelectors.forEach((selector, index) => {
      document.querySelectorAll(selector).forEach((el, i) => {
        if (!el.classList.contains('harts-animate') &&
            !el.classList.contains('harts-animate-left') &&
            !el.classList.contains('harts-animate-right')) {

          // Alternate animation directions for variety
          if (selector === '.wp-block-columns') {
            el.classList.add('harts-animate');
          } else if (selector === '.wp-block-image') {
            el.classList.add('harts-animate-scale');
          } else {
            el.classList.add('harts-animate');
          }

          // Add staggered delays
          const delayClass = `harts-delay-${(i % 5) + 1}`;
          el.classList.add(delayClass);
        }
      });
    });

    // Create intersection observer
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: CONFIG.animationThreshold
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          // Optional: unobserve after animation
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.harts-animate, .harts-animate-left, .harts-animate-right, .harts-animate-scale').forEach(el => {
      observer.observe(el);
    });
  }

  // ==========================================================================
  // Animated Counter for Stats
  // ==========================================================================

  function initCounters() {
    // Find stats section
    const statsSection = document.querySelector('.alignwide');

    if (!statsSection) return;

    // Find all stat numbers (h3 elements with numbers)
    const statHeadings = statsSection.querySelectorAll('h3.has-x-large-font-size');

    statHeadings.forEach(heading => {
      const text = heading.textContent.trim();
      const match = text.match(/^(\d+)(\+?)$/);

      if (match) {
        const targetNumber = parseInt(match[1], 10);
        const suffix = match[2] || '';

        // Store original values
        heading.setAttribute('data-target', targetNumber);
        heading.setAttribute('data-suffix', suffix);
        heading.classList.add('harts-counter');
        heading.textContent = '0' + suffix;
      }
    });

    // Create observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-target'), 10);
          const suffix = counter.getAttribute('data-suffix') || '';

          animateCounter(counter, 0, target, suffix, CONFIG.counterDuration);
          counterObserver.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.harts-counter').forEach(counter => {
      counterObserver.observe(counter);
    });
  }

  /**
   * Animate number from start to end
   */
  function animateCounter(element, start, end, suffix, duration) {
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (end - start) * easeOut);

      element.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ==========================================================================
  // Back to Top Button
  // ==========================================================================

  function initBackToTop() {
    // Create button
    const backToTop = document.createElement('button');
    backToTop.className = 'harts-back-to-top';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.innerHTML = `
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4l-8 8h5v8h6v-8h5z"/>
      </svg>
    `;
    document.body.appendChild(backToTop);

    // Show/hide based on scroll position
    function toggleBackToTop() {
      if (window.scrollY > CONFIG.scrollTopThreshold) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }

    window.addEventListener('scroll', debounce(toggleBackToTop, CONFIG.debounceDelay));

    // Scroll to top on click
    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================================================
  // Smooth Scroll for Anchor Links
  // ==========================================================================

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ==========================================================================
  // Image Lazy Loading Enhancement
  // ==========================================================================

  function initLazyImages() {
    const images = document.querySelectorAll('.wp-block-image img');

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;

          // Add loaded class for CSS transitions
          img.addEventListener('load', function() {
            img.classList.add('loaded');
          });

          imageObserver.unobserve(img);
        }
      });
    }, { rootMargin: '100px' });

    images.forEach(img => imageObserver.observe(img));
  }

  // ==========================================================================
  // Parallax Effect for Hero Images
  // ==========================================================================

  function initParallax() {
    const parallaxElements = document.querySelectorAll('.harts-parallax img');

    if (parallaxElements.length === 0) return;

    function updateParallax() {
      parallaxElements.forEach(img => {
        const rect = img.getBoundingClientRect();
        const scrolled = window.scrollY;
        const rate = 0.3;

        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const yPos = (rect.top - window.innerHeight / 2) * rate;
          img.style.transform = `translateY(${yPos}px)`;
        }
      });
    }

    window.addEventListener('scroll', debounce(updateParallax, CONFIG.debounceDelay));
  }

  // ==========================================================================
  // Interactive Program Cards
  // ==========================================================================

  function initProgramCards() {
    // Add hover effect class to program columns
    const programSection = document.querySelector('.has-tertiary-background-color');

    if (programSection) {
      const programCards = programSection.querySelectorAll('.wp-block-column');

      programCards.forEach(card => {
        card.classList.add('harts-program-card');

        // Add tilt effect on mouse move
        card.addEventListener('mousemove', function(e) {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = (y - centerY) / 20;
          const rotateY = (centerX - x) / 20;

          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', function() {
          card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
      });
    }
  }

  // ==========================================================================
  // Typing Animation for Headings (Optional)
  // ==========================================================================

  function initTypingEffect() {
    const typingElements = document.querySelectorAll('.harts-typing');

    typingElements.forEach(element => {
      const text = element.textContent;
      element.textContent = '';
      element.style.opacity = '1';

      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(typeInterval);
        }
      }, 50);
    });
  }

  // ==========================================================================
  // Event Card Hover Effects
  // ==========================================================================

  function initEventCards() {
    const eventCards = document.querySelectorAll('.is-style-section-2');

    eventCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        // Add subtle scale to button inside
        const button = card.querySelector('.wp-block-button__link');
        if (button) {
          button.style.transform = 'scale(1.05)';
        }
      });

      card.addEventListener('mouseleave', function() {
        const button = card.querySelector('.wp-block-button__link');
        if (button) {
          button.style.transform = 'scale(1)';
        }
      });
    });
  }

  // ==========================================================================
  // Stats Section Enhancement
  // ==========================================================================

  function initStatsSection() {
    // Find the stats section and add class
    const columns = document.querySelectorAll('.alignwide > .wp-block-columns');

    columns.forEach(col => {
      const hasStats = Array.from(col.querySelectorAll('h3')).some(h3 =>
        /^\d+\+?$/.test(h3.textContent.trim())
      );

      if (hasStats) {
        col.classList.add('harts-stats-section');
      }
    });
  }

  // ==========================================================================
  // Form Enhancements
  // ==========================================================================

  function initFormEnhancements() {
    const forms = document.querySelectorAll('.wp-block-jetpack-contact-form');

    forms.forEach(form => {
      const inputs = form.querySelectorAll('input, textarea');

      inputs.forEach(input => {
        // Add focus animations
        input.addEventListener('focus', function() {
          this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
          this.parentElement.classList.remove('focused');
          if (this.value) {
            this.parentElement.classList.add('has-value');
          } else {
            this.parentElement.classList.remove('has-value');
          }
        });
      });
    });
  }

  // ==========================================================================
  // Mobile Menu Enhancement
  // ==========================================================================

  function initMobileMenu() {
    // This adds smooth animation to mobile menu if present
    const menuToggle = document.querySelector('.wp-block-navigation__responsive-container-open');
    const menuClose = document.querySelector('.wp-block-navigation__responsive-container-close');

    if (menuToggle) {
      menuToggle.addEventListener('click', function() {
        document.body.classList.add('menu-open');
      });
    }

    if (menuClose) {
      menuClose.addEventListener('click', function() {
        document.body.classList.remove('menu-open');
      });
    }
  }

  // ==========================================================================
  // Initialize All Features
  // ==========================================================================

  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeAll);
    } else {
      initializeAll();
    }
  }

  function initializeAll() {
    // Core features
    initPageLoader();
    initScrollProgress();
    initBackToTop();
    initSmoothScroll();

    // Visual enhancements
    initStatsSection();
    initScrollAnimations();
    initCounters();
    initLazyImages();

    // Interactive features
    initProgramCards();
    initEventCards();
    initFormEnhancements();
    initMobileMenu();

    // Optional features (uncomment to enable)
    // initParallax();
    // initTypingEffect();

    console.log('HART\'s Haiti Interactive Features Loaded');
  }

  // Start the initialization
  init();

})();
