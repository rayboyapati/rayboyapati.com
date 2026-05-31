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

// Speaking carousel
const carousel = document.getElementById('speaking-carousel');
if (carousel) {
  const prevBtn = carousel.parentElement.querySelector('.carousel-btn-prev');
  const nextBtn = carousel.parentElement.querySelector('.carousel-btn-next');
  const scrollAmount = () => carousel.querySelector('.carousel-item')?.offsetWidth + 24 || 400;

  prevBtn?.addEventListener('click', () => {
    carousel.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
  });
  nextBtn?.addEventListener('click', () => {
    carousel.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
  });
}

// Contact form — AJAX submit with custom success state
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const resp = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      const wrap = form.closest('.contact-form-wrap');
      if (resp.ok) {
        wrap.innerHTML = `
          <div class="form-success">
            <div class="form-success-icon">&#10003;</div>
            <h3 class="form-heading">Message Sent</h3>
            <p class="form-success-text">
              Thank you for reaching out. My team will review your message and
              respond within 2–3 business days.
            </p>
            <a href="#hero" class="btn btn-outline" style="margin-top:24px; color:#fff; border-color:rgba(255,255,255,0.3);">Back to Top</a>
          </div>`;
      } else {
        btn.textContent = 'Error — Try Again';
        btn.disabled = false;
        setTimeout(() => { btn.textContent = originalText; }, 3000);
      }
    } catch {
      btn.textContent = 'Error — Try Again';
      btn.disabled = false;
      setTimeout(() => { btn.textContent = originalText; }, 3000);
    }
  });
}

// Scroll-in animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.card, .timeline-item, .pub-item, .credential-group, .carousel-item').forEach(el => {
  observer.observe(el);
});
