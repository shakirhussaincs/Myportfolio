// ============================================
// MODERN PORTFOLIO - JAVASCRIPT
// Complete functionality and interactivity
// ============================================

// ============================================
// 1. INITIALIZE EMAIL.JS & THREE.JS
// ============================================

// Initialize (EmailJS removed for Formspree)

// Initialize Three.js 3D Background
const initThreeJS = () => {
  const canvas = document.querySelector('#bg-canvas');
  if (!canvas) return;

  const scene = new THREE.Scene();
  
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 35;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });
  
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  // --- 1. NEURAL STARFIELD ---
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 2000;
  const posArray = new Float32Array(particlesCount * 3);

  for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 120;
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.12,
    color: 0x6366f1,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  // --- 2. THE TECH CORE (Central Centerpiece) ---
  const coreGroup = new THREE.Group();
  scene.add(coreGroup);

  // Outer Wireframe Sphere
  const outerGeo = new THREE.SphereGeometry(15, 32, 32);
  const outerMat = new THREE.MeshBasicMaterial({
    color: 0x6366f1,
    wireframe: true,
    transparent: true,
    opacity: 0.1
  });
  const outerSphere = new THREE.Mesh(outerGeo, outerMat);
  coreGroup.add(outerSphere);

  // Inner Icosahedron (The "Engine")
  const innerGeo = new THREE.IcosahedronGeometry(8, 1);
  const innerMat = new THREE.MeshBasicMaterial({
    color: 0xec4899,
    wireframe: true,
    transparent: true,
    opacity: 0.25
  });
  const innerMesh = new THREE.Mesh(innerGeo, innerMat);
  coreGroup.add(innerMesh);

  // --- 3. FLOATING GEOMETRY ---
  const shapes = [];
  const floatersCount = 25;
  
  for(let i = 0; i < floatersCount; i++) {
    const size = Math.random() * 0.8 + 0.2;
    const geometry = Math.random() > 0.5 
      ? new THREE.IcosahedronGeometry(size, 0) 
      : new THREE.OctahedronGeometry(size, 0);
      
    const material = new THREE.MeshBasicMaterial({ 
      color: Math.random() > 0.5 ? 0x6366f1 : 0xec4899, 
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(
      (Math.random() - 0.5) * 80,
      (Math.random() - 0.5) * 80,
      (Math.random() - 0.5) * 40 - 10
    );
    
    mesh.userData = {
      rotX: (Math.random() - 0.5) * 0.015,
      rotY: (Math.random() - 0.5) * 0.015,
      posY: mesh.position.y,
      speed: Math.random() * 0.01 + 0.005,
      offset: Math.random() * 10
    };
    
    shapes.push(mesh);
    scene.add(mesh);
  }

  // Handle Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Handle Mouse Movement for Advanced Parallax
  let mouseX = 0;
  let mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) / 100;
    mouseY = (e.clientY - window.innerHeight / 2) / 100;
  });

  // Animation Loop
  const clock = new THREE.Clock();

  const animate = () => {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    // Subtle Core Rotations
    outerSphere.rotation.y += 0.002;
    outerSphere.rotation.z += 0.001;
    innerMesh.rotation.y -= 0.005;
    innerMesh.rotation.x += 0.003;

    // Follow Mouse with smoothing
    coreGroup.rotation.x += (mouseY * 0.05 - coreGroup.rotation.x) * 0.05;
    coreGroup.rotation.y += (mouseX * 0.05 - coreGroup.rotation.y) * 0.05;

    particlesMesh.rotation.y += 0.0005;
    particlesMesh.position.x += (mouseX * 0.2 - particlesMesh.position.x) * 0.05;
    particlesMesh.position.y += (-mouseY * 0.2 - particlesMesh.position.y) * 0.05;

    // Animate Floaties
    shapes.forEach((s) => {
      s.rotation.x += s.userData.rotX;
      s.rotation.y += s.userData.rotY;
      s.position.y = s.userData.posY + Math.sin(time * s.userData.speed + s.userData.offset) * 3;
    });

    renderer.render(scene, camera);
  };

  animate();
};

document.addEventListener('DOMContentLoaded', initThreeJS);

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

// Single rAF-throttled scroll handler drives both the active nav link
// and the scroll-to-top button, instead of two separate listeners.
let scrollTicking = false;

window.addEventListener('scroll', () => {
  if (scrollTicking) return;
  scrollTicking = true;

  requestAnimationFrame(() => {
    updateActiveNavLink();
    scrollToTopBtn.classList.toggle('visible', window.pageYOffset > 300);
    scrollTicking = false;
  });
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

  try {
    // Send email via Google Apps Script using Fetch
    // We use URLSearchParams which is most compatible with Apps Script e.parameter
    const formData = new FormData(contactForm);
    const params = new URLSearchParams(formData);

    // We use a try-catch with a more robust fetch
    try {
      await fetch(contactForm.action, {
        method: 'POST',
        body: params,
        mode: 'no-cors', // This is the secret for Google Apps Script
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      // With 'no-cors', we can't read the response, but if it doesn't throw, 
      // it almost certainly reached Google's servers.
      showFormFeedback('✓ Message sent successfully! I\'ll get back to you soon.', 'success');
      contactForm.reset();
    } catch (fetchError) {
      console.error('Fetch error:', fetchError);
      showFormFeedback('Connection error. Please try again or email me directly.', 'error');
    }
  } catch (error) {
    console.error('Submission Error:', error);
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
    link.href = 'cv.pdf'; // Update path to your resume PDF
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
// 10. DYNAMIC YEAR IN FOOTER
// ============================================

const footerYear = document.querySelector('.footer p');
if (footerYear) {
  const currentYear = new Date().getFullYear();
  footerYear.textContent = footerYear.textContent.replace('2024', currentYear);
}

// ============================================
// 11. KEYBOARD NAVIGATION
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
// 12. SMOOTH PAGE TRANSITIONS
// ============================================

window.addEventListener('beforeunload', () => {
  document.body.style.opacity = '0.5';
});

// ============================================
// 13. LOG INITIALIZATION
// ============================================

console.log('%cWelcome to Shakir Hussain Portfolio! 👋', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%cFor inquiries, contact: shakirhussain.bssef23@ibasuk.edu.pk', 'color: #06b6d4; font-size: 14px;');
console.log('%cPhone: +92 325 4045153', 'color: #06b6d4; font-size: 14px;');

// ============================================
// 14. ACCESSIBILITY
// ============================================

// Focus visible for keyboard navigation
document.addEventListener('keydown', () => {
  document.body.classList.add('keyboard-active');
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-active');
});

// ============================================
// 15. INITIALIZATION ON LOAD
// ============================================

window.addEventListener('load', () => {
  // Update active nav on initial load
  updateActiveNavLink();

  // Fade in hero content
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '1';
  }

  // Refresh AOS to ensure all sections are detected correctly
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
});

// ============================================
// END OF SCRIPT
// ============================================
