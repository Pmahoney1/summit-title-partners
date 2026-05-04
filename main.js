/* ============================================================
   SUMMIT TITLE PARTNERS — main.js
   Handles: dark mode, nav scroll, mobile menu, splitting.js,
   scroll animations, contact form, address autocomplete
   ============================================================ */

/* ---- DARK MODE TOGGLE ---- */
(function () {
  const toggle = document.querySelector('[data-theme-toggle]');
  const root   = document.documentElement;
  let theme    = 'light';

  root.setAttribute('data-theme', theme);
  updateToggleIcon();

  if (toggle) {
    toggle.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      toggle.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
      updateToggleIcon();
    });
  }

  function updateToggleIcon() {
    if (!toggle) return;
    toggle.innerHTML = theme === 'dark'
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
})();

/* ---- STICKY NAV ---- */
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 16);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ---- MOBILE MENU ---- */
(function () {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const links      = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

  if (!hamburger || !mobileMenu) return;

  function toggle(open) {
    hamburger.classList.toggle('open', open);
    mobileMenu.classList.toggle('open', open);
    mobileMenu.setAttribute('aria-hidden', String(!open));
    hamburger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.contains('open');
    toggle(!isOpen);
  });

  links.forEach(link => {
    link.addEventListener('click', () => toggle(false));
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') toggle(false);
  });
})();

/* ---- SPLITTING.JS HERO HEADLINE ---- */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof Splitting === 'function') {
    const results = Splitting({ target: '.hero__headline', by: 'chars' });

    results.forEach(result => {
      result.chars.forEach((char, i) => {
        char.style.animationDelay = `${0.5 + i * 0.03}s`;
      });
    });
  }
});

/* ---- SCROLL-DRIVEN CARD ANIMATIONS ---- */
(function () {
  const targets = document.querySelectorAll('.fade-in');
  if (!targets.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
})();

/* ---- STAGGER CARDS ---- */
(function () {
  document.querySelectorAll('.services__grid .service-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
  });
  document.querySelectorAll('.why-us__grid .why-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
  });
  document.querySelectorAll('.reviews__grid .review-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
  });
  document.querySelectorAll('.process__step').forEach((step, i) => {
    step.style.transitionDelay = `${i * 0.12}s`;
  });
})();

/* ---- CONTACT FORM ---- */
(function () {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form || !success) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const btnText = btn.querySelector('.btn__text');

    let isValid = true;
    form.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = '#c0392b';
        field.addEventListener('input', () => {
          field.style.borderColor = '';
        }, { once: true });
      }
    });
    if (!isValid) return;

    btn.disabled = true;
    btnText.textContent = 'Sending…';

    setTimeout(() => {
      btn.disabled = false;
      btnText.textContent = 'Send Message';
      form.reset();
      success.classList.add('visible');
      if (typeof lucide !== 'undefined') lucide.createIcons();

      setTimeout(() => success.classList.remove('visible'), 8000);
    }, 1400);
  });
})();

/* ---- LUCIDE ICONS ---- */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
});

/* ---- ACTIVE NAV STATE ---- */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === '#' + id) {
            link.style.color = 'var(--color-text)';
          } else if (!link.classList.contains('nav__cta')) {
            link.style.color = '';
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));
})();
