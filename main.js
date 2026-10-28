/* ============================================================
   SUMMIT TITLE PARTNERS — main.js
   Handles: dark mode, nav scroll, mobile menu, tagline reveal,
   scroll animations, lead forms (POST to form.action),
   GA4 events (generate_lead, phone_click), icons
   ============================================================ */

/* ---- ANALYTICS HELPER ---- */
function stpTrack(name, params) {
  if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
}

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
    if (open) mobileMenu.removeAttribute('inert'); else mobileMenu.setAttribute('inert', '');
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

/* ---- TAGLINE CHARACTER REVEAL (Splitting.js, self-hosted) ----
   Applied to the hero eyebrow tagline only. The H1 stays a single
   text node so search engines read it as one heading. */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof Splitting === 'function') {
    const results = Splitting({ target: '.hero__eyebrow--tagline', by: 'chars' });
    results.forEach(result => {
      result.chars.forEach((char, i) => {
        char.style.animationDelay = `${0.3 + i * 0.025}s`;
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
  document.querySelectorAll('.process__step').forEach((step, i) => {
    step.style.transitionDelay = `${i * 0.12}s`;
  });
})();

/* ---- LEAD FORMS ----
   Every form that posts to /api/lead (homepage contact form, service
   page sidebar + closing forms). POSTs JSON to form.action. Success is
   shown only after a 2xx response; anything else shows the error state. */
(function () {
  const forms = document.querySelectorAll('form[action="/api/lead"]');
  if (!forms.length) return;

  function markInvalid(field) {
    field.style.borderColor = '#c0392b';
    field.addEventListener('input', () => { field.style.borderColor = ''; }, { once: true });
    field.addEventListener('change', () => { field.style.borderColor = ''; }, { once: true });
  }

  forms.forEach(form => {
    const success = form.querySelector('.form-success');
    const error   = form.querySelector('.form-error');
    const btn     = form.querySelector('button[type="submit"]');
    if (!success || !error || !btn) return;
    const btnText = btn.querySelector('.btn__text');
    const idleLabel = btnText.textContent;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      success.classList.remove('visible');
      error.classList.remove('visible');

      let isValid = true;
      let firstInvalid = null;
      form.querySelectorAll('[required]').forEach(field => {
        const empty = !field.value || !String(field.value).trim();
        const badEmail = field.type === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
        if (empty || badEmail) {
          isValid = false;
          markInvalid(field);
          if (!firstInvalid) firstInvalid = field;
        }
      });
      if (!isValid) { firstInvalid && firstInvalid.focus(); return; }

      const data = Object.fromEntries(new FormData(form).entries());
      data.page = window.location.href;

      btn.disabled = true;
      btnText.textContent = 'Sending…';

      try {
        const res = await fetch(form.getAttribute('action'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);

        form.reset();
        success.classList.add('visible');
        stpTrack('generate_lead', {
          situation: data.situation || '',
          county: data.county || '',
          form_id: form.id
        });
      } catch (err) {
        error.classList.add('visible');
      } finally {
        btn.disabled = false;
        btnText.textContent = idleLabel;
        if (window.lucide) window.lucide.createIcons();
      }
    });
  });
})();

/* ---- PHONE CLICK TRACKING ---- */
(function () {
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
      stpTrack('phone_click', {
        link_url: link.getAttribute('href'),
        link_text: link.textContent.trim()
      });
    });
  });
})();

/* ---- ICONS (self-hosted lucide subset) ---- */
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) window.lucide.createIcons();
});

/* ---- ACTIVE NAV STATE ---- */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');
  if (!sections.length || !navLinks.length) return;

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
