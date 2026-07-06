(function () {
  'use strict';

  const roles = [
    'Product Discovery Specialist',
    'User Researcher',
    'Market Analyst',
    'UX Researcher'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typewriterEl = document.getElementById('typewriter');
  const typeSpeed = 80;
  const deleteSpeed = 40;
  const pauseTime = 2000;

  function typeWriter() {
    const current = roles[roleIndex];

    if (!isDeleting) {
      typewriterEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(typeWriter, pauseTime);
        return;
      }
    } else {
      typewriterEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    setTimeout(typeWriter, isDeleting ? deleteSpeed : typeSpeed);
  }

  if (typewriterEl) {
    setTimeout(typeWriter, 1000);
  }

  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll(
    '.exp-card, .project-card, .skill-tag, .hero-content, .skills-intro'
  ).forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
})();
