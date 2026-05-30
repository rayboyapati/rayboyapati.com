// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile menu toggle
const toggle = document.getElementById('nav-toggle');
const links = document.getElementById('nav-links');

toggle.addEventListener('click', () => {
  links.classList.toggle('open');
  const open = links.classList.contains('open');
  toggle.children[0].style.transform = open ? 'rotate(45deg) translate(5px, 5px)' : '';
  toggle.children[1].style.opacity = open ? '0' : '1';
  toggle.children[2].style.transform = open ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

// Close menu on link click
links.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.children[0].style.transform = '';
    toggle.children[1].style.opacity = '1';
    toggle.children[2].style.transform = '';
  });
});

// Scroll-in animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.card, .timeline-item, .pub-item, .credential-group, .speaking-gallery-item').forEach(el => {
  observer.observe(el);
});
