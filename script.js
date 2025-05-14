document.addEventListener('DOMContentLoaded', function() {
  // Get current year for footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Display current time on elevator interface
  function updateCurrentTime() {
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      timeElement.textContent = `${hours}:${minutes}`;
    }
  }
  
  updateCurrentTime();
  setInterval(updateCurrentTime, 60000); // Update time every minute
  
  // Mobile Menu Toggle
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function() {
      menuBtn.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
      });
    });
  }
  
  // Sticky Header
  const header = document.querySelector('.header');
  
  function checkScroll() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Initial check
  
  // Scroll to Top Button
  const scrollTopBtn = document.querySelector('.scroll-top');
  
  function toggleScrollBtn() {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }
  
  window.addEventListener('scroll', toggleScrollBtn);
  
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Scroll Reveal Animation
  function revealElements() {
    const elements = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', revealElements);
  window.addEventListener('load', revealElements);
  
  // Animate elevator positions
  const positions = [
    { a: '9rem', b: '3rem', c: '6rem' },  // Starting positions
    { a: '6rem', b: '9rem', c: '3rem' },  // Second positions
    { a: '3rem', b: '6rem', c: '9rem' },  // Third positions
    { a: '6rem', b: '3rem', c: '9rem' }   // Back to varied positions
  ];
  
  let currentPositionIndex = 0;
  
  function animateElevators() {
    const elevatorA = document.querySelector('.elevator-a');
    const elevatorB = document.querySelector('.elevator-b');
    const elevatorC = document.querySelector('.elevator-c');
    
    if (elevatorA && elevatorB && elevatorC) {
      const newPosition = positions[currentPositionIndex];
      
      elevatorA.style.top = newPosition.a;
      elevatorB.style.top = newPosition.b;
      elevatorC.style.top = newPosition.c;
      
      currentPositionIndex = (currentPositionIndex + 1) % positions.length;
    }
  }
  
  // Set initial positions
  animateElevators();
  
  // Animate elevators every 3 seconds
  setInterval(animateElevators, 3000);
  
  // App Tab Switching
  const tabs = document.querySelectorAll('.tab');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetId = this.getAttribute('data-tab') + '-tab';
      
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      // Show corresponding tab content
      tabPanes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === targetId) {
          pane.classList.add('active');
        }
      });
    });
  });
  
  // Form Submission
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  const toastClose = document.querySelector('.toast-close');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        company: document.getElementById('company').value,
        message: document.getElementById('message').value
      };
      
      // In a real application, you would send this data to a server
      console.log('Form submitted:', formData);
      
      // Reset form
      contactForm.reset();
      
      // Show success toast
      if (toast) {
        toast.classList.add('visible');
        
        // Hide toast after 5 seconds
        setTimeout(() => {
          toast.classList.remove('visible');
        }, 5000);
      }
    });
  }
  
  // Close toast when clicking the close button
  if (toastClose) {
    toastClose.addEventListener('click', function() {
      toast.classList.remove('visible');
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});