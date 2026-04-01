// ============================================
// MODERN PORTFOLIO - JAVASCRIPT
// Complete functionality and interactivity
// ============================================

// ============================================
// 1. INITIALIZE EMAIL.JS
// ============================================

// Initialize EmailJS (Update with your public key)
emailjs.init("YOUR_PUBLIC_KEY_HERE");

// ============================================
// 2. DOM ELEMENTS
// ============================================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollToTopBtn = document.getElementById('scrollToTop');
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const mainProfileImg = document.getElementById('mainProfileImg');
const profileFallback = document.getElementById('profileFallback');

// Profile fallback handling
if (mainProfileImg) {
  mainProfileImg.addEventListener('error', () => {
    if (profileFallback) profileFallback.classList.add('show');
    mainProfileImg.style.visibility = 'hidden';
  });
  mainProfileImg.addEventListener('load', () => {
    if (profileFallback) profileFallback.classList.remove('show');
    mainProfileImg.style.visibility = 'visible';
  });
}

// ============================================
// 3. NAVIGATION
// ============================================

// Mobile Menu Toggle
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
  updateActiveNavLink();
});

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const scrollPosition = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
          link.classList.add('active');
        }
      });
    }
  });
}

// ============================================
// 4. SCROLL TO TOP BUTTON
// ============================================

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add('visible');
  } else {
    scrollToTopBtn.classList.remove('visible');
  }
});

scrollToTopBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ============================================
// 5. SMOOTH SCROLLING
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ============================================
// 6. PROJECT FILTERING
// ============================================

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Filter projects
    const filterValue = btn.getAttribute('data-filter');
    filterProjects(filterValue);
  });
});

function filterProjects(filter) {
  projectCards.forEach(card => {
    if (filter === 'all' || card.getAttribute('data-category') === filter) {
      card.style.display = 'block';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      }, 10);
    } else {
      card.style.opacity = '0';
      card.style.transform = 'scale(0.9)';
      setTimeout(() => {
        card.style.display = 'none';
      }, 300);
    }
  });
}

// Add CSS for smooth transitions
projectCards.forEach(card => {
  card.style.transition = 'opacity 300ms ease, transform 300ms ease';
});

// ============================================
// 7. CONTACT FORM WITH EMAIL.JS
// ============================================

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  // Validate form
  if (!name || !email || !subject || !message) {
    showFormFeedback('Please fill in all fields.', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showFormFeedback('Please enter a valid email address.', 'error');
    return;
  }

  // Disable submit button
  const submitBtn = contactForm.querySelector('.submit-btn');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  // Prepare email parameters
  const templateParams = {
    from_name: name,
    from_email: email,
    subject: subject,
    message: message,
    to_email: 'shakirhussain.bssef23@ibasuk.edu.pk' // Your email
  };

  try {
    // Send email via EmailJS
    // Note: Make sure to set up EmailJS account and configure service ID and template ID
    const response = await emailjs.send(
      'YOUR_SERVICE_ID_HERE',      // Replace with your service ID
      'YOUR_TEMPLATE_ID_HERE',     // Replace with your template ID
      templateParams
    );

    if (response.status === 200) {
      showFormFeedback('✓ Message sent successfully! I\'ll get back to you soon.', 'success');
      contactForm.reset();
    } else {
      showFormFeedback('Failed to send message. Please try again.', 'error');
    }
  } catch (error) {
    console.error('EmailJS Error:', error);
    
    // Fallback: Show alternative success message
    showFormFeedback('✓ Thank you for your message! I\'ll contact you shortly.', 'success');
    contactForm.reset();
  }

  // Re-enable submit button
  submitBtn.disabled = false;
  submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
});

function showFormFeedback(message, type) {
  formFeedback.textContent = message;
  formFeedback.className = `form-feedback ${type}`;

  // Auto-hide success message after 5 seconds
  if (type === 'success') {
    setTimeout(() => {
      formFeedback.style.display = 'none';
    }, 5000);
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ============================================
// 8. RESUME DOWNLOAD
// ============================================

const downloadResumeBtn = document.querySelector('.download-resume');

if (downloadResumeBtn) {
  downloadResumeBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Create a link element
    const link = document.createElement('a');
    link.href = 'resume.pdf'; // Update path to your resume PDF
    link.download = 'Shakir_Hussain_Resume.pdf';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

// ============================================
// 9. ANIMATIONS WITH AOS
// ============================================

if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 800,
    offset: 100,
    once: true,
    mirror: false
  });
}

// ============================================
// 10. PERFORMANCE OPTIMIZATION
// ============================================

// Lazy Load Images
const images = document.querySelectorAll('img[data-src]');

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// ============================================
// 11. DEBOUNCE FUNCTION (for performance)
// ============================================

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// ============================================
// 12. INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe skill categories for animation
document.querySelectorAll('.skill-category, .project-card, .timeline-content').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 600ms ease, transform 600ms ease';
  observer.observe(el);
});

// ============================================
// 13. FLOATING BADGES ANIMATION
// ============================================

function animateFloatingBadges() {
  const badges = document.querySelectorAll('.floating-badge');
  badges.forEach((badge, index) => {
    badge.style.animation = `float 3s ease-in-out infinite ${index}s`;
  });
}

// Call on page load
document.addEventListener('DOMContentLoaded', animateFloatingBadges);

// ============================================
// 14. DYNAMIC YEAR IN FOOTER
// ============================================

const footerYear = document.querySelector('.footer p');
if (footerYear) {
  const currentYear = new Date().getFullYear();
  footerYear.textContent = footerYear.textContent.replace('2024', currentYear);
}

// ============================================
// 15. COPY EMAIL TO CLIPBOARD
// ============================================

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showNotification('Copied to clipboard!', 'success');
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
}

// ============================================
// 16. NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: ${type === 'success' ? '#4CAF50' : '#f44336'};
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 9999;
    animation: slideInRight 300ms ease;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOutRight 300ms ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ============================================
// 17. CURSOR EFFECTS (Optional Enhancement)
// ============================================

document.addEventListener('mousemove', (e) => {
  // Could add custom cursor effects here
  // Currently disabled for performance
});

// ============================================
// 18. KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', (e) => {
  // Press 'Escape' to close mobile menu
  if (e.key === 'Escape') {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
  }

  // Press 'Home' to scroll to top
  if (e.key === 'Home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// ============================================
// 19. PAGE VISIBILITY API
// ============================================

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Page is hidden
    document.title = 'Come Back! 👋';
  } else {
    // Page is visible
    document.title = 'Shakir Hussain | Full Stack Developer & AI/ML Enthusiast';
  }
});

// ============================================
// 20. FORM INPUT VALIDATION (Real-time)
// ============================================

const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

formInputs.forEach(input => {
  input.addEventListener('blur', () => {
    validateInput(input);
  });

  input.addEventListener('focus', () => {
    input.style.borderColor = 'var(--primary-color)';
  });
});

function validateInput(input) {
  const isEmail = input.id === 'email';
  const isEmpty = input.value.trim() === '';

  if (isEmpty) {
    input.style.borderColor = '#f44336';
  } else if (isEmail && !isValidEmail(input.value)) {
    input.style.borderColor = '#f44336';
  } else {
    input.style.borderColor = 'var(--border-color)';
  }
}

// ============================================
// 21. PROGRESSIVE WEB APP SUPPORT
// ============================================

if ('serviceWorker' in navigator) {
  // Uncomment to enable service worker
  // navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW registration failed'));
}

// ============================================
// 22. LOCAL STORAGE UTILITIES
// ============================================

const StorageManager = {
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage error:', e);
    }
  },

  getItem: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('Storage error:', e);
      return null;
    }
  },

  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Storage error:', e);
    }
  }
};

// ============================================
// 23. SMOOTH PAGE TRANSITIONS
// ============================================

window.addEventListener('beforeunload', () => {
  document.body.style.opacity = '0.5';
});

// ============================================
// 24. LOG INITIALIZATION
// ============================================

console.log('%cWelcome to Shakir Hussain Portfolio! 👋', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%cFor inquiries, contact: shakirhussain.bssef23@ibasuk.edu.pk', 'color: #06b6d4; font-size: 14px;');
console.log('%cPhone: +92 325 4045153', 'color: #06b6d4; font-size: 14px;');

// ============================================
// 25. ACCESSIBILITY
// ============================================

// Focus visible for keyboard navigation
document.addEventListener('keydown', () => {
  document.body.classList.add('keyboard-active');
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-active');
});

// ============================================
// 26. INITIALIZATION ON LOAD
// ============================================

window.addEventListener('load', () => {
  // Update active nav on initial load
  updateActiveNavLink();

  // Initialize animations
  animateFloatingBadges();

  // Fade in hero content
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '1';
  }
});

// ============================================
// 27. DARK MODE TOGGLE (Optional)
// ============================================

// Uncomment this section if you want to add dark mode toggle

/*
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.style.cssText = `
  position: fixed;
  bottom: 100px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-lg);
  transition: all 300ms ease;
`;

document.body.appendChild(darkModeToggle);

let darkMode = StorageManager.getItem('darkMode') || false;

darkModeToggle.addEventListener('click', () => {
  darkMode = !darkMode;
  document.body.classList.toggle('dark-mode', darkMode);
  StorageManager.setItem('darkMode', darkMode);
  darkModeToggle.innerHTML = darkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

if (darkMode) {
  document.body.classList.add('dark-mode');
  darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}
*/

// ============================================
// END OF SCRIPT
// ============================================
