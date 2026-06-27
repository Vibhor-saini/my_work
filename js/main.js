/**
 * main.js
 * Core interactions, animations, and form logic.
 * Vibhor Saini — Backend Software Engineer Portfolio
 */

'use strict';

/* ============================================================
   NAVIGATION
   ============================================================ */
const Nav = (() => {
  const header  = document.getElementById('navHeader');
  const toggle  = document.getElementById('navToggle');
  const links   = document.getElementById('navLinks');
  const navLinks = document.querySelectorAll('.nav-link');

  function init() {
    if (!header) return;

    // Scroll: add scrolled class + highlight active section
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile toggle
    if (toggle && links) {
      toggle.addEventListener('click', () => {
        const open = toggle.classList.toggle('open');
        links.classList.toggle('mobile-open', open);
        toggle.setAttribute('aria-expanded', String(open));
      });

      // Close on link click (mobile)
      links.addEventListener('click', e => {
        if (e.target.classList.contains('nav-link')) closeMobile();
      });

      // Close on outside click
      document.addEventListener('click', e => {
        if (!header.contains(e.target)) closeMobile();
      });
    }
  }

  function closeMobile() {
    toggle && toggle.classList.remove('open');
    links && links.classList.remove('mobile-open');
    toggle && toggle.setAttribute('aria-expanded', 'false');
  }

  function onScroll() {
    const scrollY = window.scrollY;
    header.classList.toggle('scrolled', scrollY > 20);

    // Highlight active nav link
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (scrollY >= top) current = section.id;
    });
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${current}`);
    });
  }

  return { init };
})();

/* ============================================================
   TERMINAL ANIMATION
   ============================================================ */
const Terminal = (() => {
  const lines = [
    { text: '<span class="t-comment">// Webhook → Queue → DB → Response</span>', delay: 0 },
    { text: '<span class="t-keyword">public function</span> <span class="t-func">receive</span>(Request $request): JsonResponse', delay: 60 },
    { text: '{', delay: 50 },
    { text: '  <span class="t-comment">// 1. Verify HMAC signature</span>', delay: 70 },
    { text: '  <span class="t-func">abort_unless</span>($this-><span class="t-func">validSignature</span>($request), <span class="t-number">401</span>);', delay: 90 },
    { text: '', delay: 40 },
    { text: '  <span class="t-comment">// 2. Deduplicate — skip replays</span>', delay: 70 },
    { text: '  <span class="t-keyword">if</span> (WebhookEvent::<span class="t-func">processed</span>($request-><span class="t-func">eventId</span>())) {', delay: 90 },
    { text: '    <span class="t-keyword">return</span> $this-><span class="t-func">ok</span>(); <span class="t-comment">// idempotent</span>', delay: 70 },
    { text: '  }', delay: 40 },
    { text: '', delay: 40 },
    { text: '  <span class="t-comment">// 3. Persist raw payload</span>', delay: 70 },
    { text: '  $event = WebhookEvent::<span class="t-func">record</span>($request-><span class="t-func">all</span>());', delay: 90 },
    { text: '', delay: 40 },
    { text: '  <span class="t-comment">// 4. Dispatch to queue — non-blocking</span>', delay: 70 },
    { text: '  ProcessWebhookJob::<span class="t-func">dispatch</span>($event)', delay: 80 },
    { text: '    -><span class="t-func">onQueue</span>(<span class="t-string">\'integrations\'</span>);', delay: 60 },
    { text: '', delay: 40 },
    { text: '  <span class="t-green">// ✓ Accepted — worker handles the rest</span>', delay: 70 },
    { text: '  <span class="t-keyword">return</span> $this-><span class="t-func">accepted</span>();', delay: 60 },
    { text: '}', delay: 40 },
  ];

  let timeout = null;
  const CHAR_DELAY = 18;

  function init() {
    const el = document.getElementById('terminalCode');
    if (!el) return;

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.innerHTML = lines.map(l => l.text).join('\n') + '\n<span class="terminal-cursor"></span>';
      return;
    }

    typeLines(el, lines, 0, '');
  }

  function typeLines(el, lines, lineIndex, html) {
    if (lineIndex >= lines.length) {
      el.innerHTML = html + '<span class="terminal-cursor"></span>';
      return;
    }

    const line = lines[lineIndex];

    setTimeout(() => {
      html += line.text + '\n';
      el.innerHTML = html + '<span class="terminal-cursor"></span>';
      typeLines(el, lines, lineIndex + 1, html);
    }, lineIndex === 0 ? 600 : line.delay + CHAR_DELAY * stripTags(line.text).length);
  }

  function stripTags(str) {
    return str.replace(/<[^>]*>/g, '');
  }

  return { init };
})();

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const ScrollReveal = (() => {
  function init() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal, .stagger-children').forEach(el => {
        el.classList.add('in-view');
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal, .stagger-children').forEach(el => observer.observe(el));

    // Skill bars
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.skill-bar').forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (width) bar.style.width = `${width}%`;
          });
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    const skillsSection = document.getElementById('skills');
    if (skillsSection) barObserver.observe(skillsSection);
  }

  return { init };
})();

/* ============================================================
   ENGINEERING WORKFLOW ANIMATION
   ============================================================ */
const WorkflowAnimation = (() => {
  function init() {
    const diagram = document.getElementById('wfDiagram');
    if (!diagram) return;

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      diagram.querySelectorAll('.wf-node').forEach(n => n.classList.add('wf-visible'));
      return;
    }

    if (!('IntersectionObserver' in window)) {
      diagram.querySelectorAll('.wf-node').forEach(n => n.classList.add('wf-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Sequentially fade in each node
          const nodes = diagram.querySelectorAll('.wf-node');
          nodes.forEach((node, i) => {
            setTimeout(() => node.classList.add('wf-visible'), i * 80);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(diagram);
  }

  return { init };
})();

/* ============================================================
   MODAL
   ============================================================ */
const Modal = (() => {
  function init() {
    const overlay = document.getElementById('modalOverlay');
    const closeBtn = document.getElementById('modalClose');

    if (!overlay) return;

    // Close on overlay click
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeModal();
    });

    // Close button
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal();
    });
  }

  return { init };
})();

/* ============================================================
   SCROLL TO TOP
   ============================================================ */
const ScrollTop = (() => {
  function init() {
    const btn = document.getElementById('scrollTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  return { init };
})();

/* ============================================================
   FOOTER YEAR
   ============================================================ */
function initYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ============================================================
   TOAST
   ============================================================ */
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const icon = type === 'success'
    ? '<i class="fa-solid fa-circle-check toast-icon" aria-hidden="true"></i>'
    : '<i class="fa-solid fa-circle-xmark toast-icon" aria-hidden="true"></i>';

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `${icon}<span>${message}</span>`;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4500);
}

/* ============================================================
   CONTACT FORM
   ============================================================ */
const ContactForm = (() => {
  function init() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', handleSubmit);

    // Clear field errors on input
    form.querySelectorAll('.form-input').forEach(input => {
      input.addEventListener('input', () => clearFieldError(input));
    });
  }

  function validate(form) {
    let valid = true;
    const fields = ['contactName', 'contactEmail', 'contactType', 'contactBudget', 'contactMessage'];
    const labels = {
      contactName: 'Full name is required.',
      contactEmail: 'A valid email address is required.',
      contactType: 'Please select a project type.',
      contactBudget: 'Please select a budget range.',
      contactMessage: 'Please describe your project.',
    };

    fields.forEach(id => {
      const input = document.getElementById(id);
      if (!input) return;
      const errorEl = input.closest('.form-group')?.querySelector('.field-error');

      if (!input.value.trim()) {
        showFieldError(input, errorEl, labels[id]);
        valid = false;
      } else if (id === 'contactEmail' && !isValidEmail(input.value)) {
        showFieldError(input, errorEl, 'Please enter a valid email address.');
        valid = false;
      }
    });

    // Consent
    const consent = document.getElementById('consentCheck');
    const consentError = document.getElementById('consentError');
    if (consent && !consent.checked) {
      if (consentError) consentError.textContent = 'Please confirm you agree to be contacted.';
      valid = false;
    } else if (consentError) {
      consentError.textContent = '';
    }

    return valid;
  }

  function showFieldError(input, errorEl, message) {
    input.classList.add('error');
    if (errorEl) errorEl.textContent = message;
  }

  function clearFieldError(input) {
    input.classList.remove('error');
    const errorEl = input.closest('.form-group')?.querySelector('.field-error');
    if (errorEl) errorEl.textContent = '';
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    if (!validate(form)) return;

    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn?.querySelector('.btn-text');
    const btnLoading = submitBtn?.querySelector('.btn-loading');

    // Show loading state
    if (submitBtn) submitBtn.disabled = true;
    if (btnText) btnText.style.display = 'none';
    if (btnLoading) btnLoading.style.display = 'flex';

    try {
      const formData = new FormData(form);
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();

      if (result.success) {
        showToast('Message sent! I\'ll get back to you shortly.', 'success');
        form.reset();
      } else {
        throw new Error(result.message || 'Submission failed.');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      showToast('Something went wrong. Please email me directly.', 'error');
    } finally {
      if (submitBtn) submitBtn.disabled = false;
      if (btnText) btnText.style.display = '';
      if (btnLoading) btnLoading.style.display = 'none';
    }
  }

  return { init };
})();

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  Nav.init();
  Terminal.init();
  WorkflowAnimation.init();
  Modal.init();
  ScrollTop.init();
  ContactForm.init();
  initYear();

  // Add reveal class to cards (NOT section headers — those are always visible via CSS)
  document.querySelectorAll('.expertise-card, .stat-card').forEach(el => {
    el.classList.add('reveal');
  });

  // Init scroll reveal AFTER adding reveal classes so all elements are observed
  ScrollReveal.init();

  // Observe about and contact sub-sections for their own fade-in
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          sectionObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.about-text, .about-stats-col, .contact-left, .contact-right').forEach(el => {
      sectionObserver.observe(el);
    });
  } else {
    // Fallback: just show everything
    document.querySelectorAll('.about-text, .about-stats-col, .contact-left, .contact-right').forEach(el => {
      el.classList.add('in-view');
    });
  }

  // After projects.js renders cards, pick up any .reveal not yet in-view
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.in-view)').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) el.classList.add('in-view');
    });
  }, 300);
});