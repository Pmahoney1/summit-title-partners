/* ============================================================
   /california/sacramento-county/ — page-only script
   Handles this page's two lead forms (sidebar + closing).
   Loaded after /main.js, which provides stpTrack(), icons,
   nav, and phone_click tracking.
   ============================================================ */

/* ---- LEAD FORMS ----
   POSTs JSON to form.action. Success is shown only after a 2xx
   response; anything else shows the error state. */
(function () {
  document.querySelectorAll('form[action="/api/lead"]').forEach(form => {
    const success = form.querySelector('[role="status"]');
    const error   = form.querySelector('[role="alert"]');
    const btn     = form.querySelector('button[type="submit"]');
    if (!success || !error || !btn) return;

    const btnText = btn.querySelector('.btn__text');
    const idleLabel = btnText.textContent;

    function markInvalid(field) {
      field.style.borderColor = '#c0392b';
      field.addEventListener('input', () => { field.style.borderColor = ''; }, { once: true });
      field.addEventListener('change', () => { field.style.borderColor = ''; }, { once: true });
    }

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
        if (typeof stpTrack === 'function') {
          stpTrack('generate_lead', {
            situation: data.situation || '',
            county: data.county || '',
            form_id: form.id
          });
        }
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
