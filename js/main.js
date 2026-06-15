/* =============================================
   MAIN.JS — Portfolio JavaScript
   =============================================
   Handles:
   - Navigation scroll + mobile toggle
   - Reveal animations
   - Project filtering
   - Modal system
   - Contact form (Web3Forms)
   - Toast notifications
   - File upload UI
   - Scroll to top
   ============================================= */

// ---- Utilities ----
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// ---- DOM Ready ----
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
  initFilters();
  initContactForm();
  initFileUpload();
  initScrollTop();
  initModal();
  initYear();
  initNavHighlight();
  initCardScreenshots();
});

// ============ NAVIGATION ============
function initNav() {
  const nav = $('#nav');
  const toggle = $('#navToggle');
  const links = $('#navLinks');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
    $('#scrollTop').classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  toggle?.addEventListener('click', () => {
    links.classList.toggle('open');
    const isOpen = links.classList.contains('open');
    toggle.setAttribute('aria-expanded', isOpen);
    toggle.querySelectorAll('span')[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
    toggle.querySelectorAll('span')[1].style.opacity = isOpen ? '0' : '1';
    toggle.querySelectorAll('span')[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });

  // Close on link click (mobile)
  $$('.nav-links a').forEach(link => {
    link.addEventListener('click', () => links.classList.remove('open'));
  });
}

// ---- Active nav link on scroll ----
function initNavHighlight() {
  const sections = $$('section[id]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        $$('.nav-links a').forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });
  sections.forEach(s => observer.observe(s));
}

// ============ REVEAL ANIMATIONS ============
function initReveal() {
  const elements = $$('.project-card, .tcard, .skill-group, .av-item, .section-header, .about-text, .about-visual, .ci-item, .hc-stat');
  elements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 60);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));
}

// ============ PROJECT FILTERS ============
function initFilters() {
  const tabs = $$('.ftab');
  const cards = $$('.project-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      cards.forEach(card => {
        const cats = card.dataset.category?.split(' ') || [];
        const show = filter === 'all' || cats.includes(filter);
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        if (show) {
          card.classList.remove('hidden');
          card.style.opacity = '1';
          card.style.transform = '';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => card.classList.add('hidden'), 300);
        }
      });
    });
  });
}

// ============ PROJECT MODAL ============
function initModal() {
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

function openModal(id) {
  const project = PROJECTS_DATA[id];
  if (!project) return;

  const overlay = $('#modalOverlay');
  const body = $('#modalBody');

  const githubBtn = project.isPrivate
    ? `<span class="btn-ghost mod-nda-btn" style="flex:1; justify-content:center; opacity:0.6; cursor:default;">
        <i class="fa-solid fa-lock"></i> NDA Protected
      </span>`
    : (project.github && project.github !== '#'
        ? `<a href="${project.github}" target="_blank" class="btn-ghost" style="flex:1; justify-content:center;">
            <i class="fa-brands fa-github"></i> View Code
           </a>`
        : `<span class="btn-ghost mod-nda-btn" style="flex:1; justify-content:center; opacity:0.5; cursor:default;">
            <i class="fa-brands fa-github"></i> Private Repo
           </span>`);

  const liveBtn = project.live && project.live !== '#'
    ? `<a href="${project.live}" target="_blank" class="btn-primary" style="flex:1; justify-content:center;">
        <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
       </a>`
    : `<span class="btn-primary" style="flex:1; justify-content:center; opacity:0.5; cursor:default;">
        <i class="fa-solid fa-eye-slash"></i> Private Deployment
       </span>`;

  const thumbHtml = project.screenshots && project.screenshots.length > 0
    ? `<div class="mod-screenshots">
        <div class="mod-ss-wrap" id="modSsWrap">
          ${project.screenshots.map((s, i) => `<img src="${s}" alt="Screenshot ${i+1}" class="mod-ss-img${i===0?' mod-ss-active':''}" />`).join('')}
        </div>
        ${project.screenshots.length > 1 ? `
        <div class="mod-ss-dots">
          ${project.screenshots.map((_, i) => `<button class="mod-ss-dot${i===0?' active':''}" onclick="modSsGo(${i})" aria-label="Screenshot ${i+1}"></button>`).join('')}
        </div>` : ''}
      </div>`
    : `<div class="pc-thumb" style="height:180px; border-radius:12px; overflow:hidden; margin-bottom:24px; position:relative;">
        <div class="pc-thumb-placeholder" style="background:${project.bgColor}; height:180px; font-size:3.5rem;">
          <i class="fa-solid ${project.icon}"></i>
        </div>
        ${project.isPrivate ? '<div style="position:absolute;top:12px;right:12px;background:rgba(0,0,0,0.7);backdrop-filter:blur(8px);color:#e8e8f0;font-size:0.75rem;font-weight:600;padding:4px 10px;border-radius:6px;display:flex;align-items:center;gap:6px;"><i class="fa-solid fa-shield-halved" style="color:#7c6eff"></i> Private Client Project</div>' : ''}
      </div>`;

  body.innerHTML = `
    ${thumbHtml}
    <h2 style="font-family:var(--font-display);font-size:1.4rem;font-weight:700;margin-bottom:8px;">${project.title}</h2>
    <div class="mod-tags" style="margin-bottom:20px;">${project.tech.map(t => `<span>${t}</span>`).join('')}</div>

    <div class="mod-impact">
      <i class="fa-solid fa-chart-line"></i>
      <span>${project.impact}</span>
    </div>

    <div class="case-study-grid">
      <div class="cs-block cs-problem">
        <div class="cs-label"><i class="fa-solid fa-circle-exclamation"></i> Problem</div>
        <p>${project.problem}</p>
      </div>
      <div class="cs-block cs-solution">
        <div class="cs-label"><i class="fa-solid fa-lightbulb"></i> Solution</div>
        <p>${project.solution}</p>
      </div>
      <div class="cs-block cs-result">
        <div class="cs-label"><i class="fa-solid fa-trophy"></i> Result</div>
        <p>${project.result}</p>
      </div>
      <div class="cs-block cs-role">
        <div class="cs-label"><i class="fa-solid fa-user-gear"></i> My Role</div>
        <p>${project.myRole}</p>
      </div>
    </div>

    <div class="cs-challenges">
      <div class="cs-label" style="margin-bottom:10px;"><i class="fa-solid fa-bolt"></i> Key Challenge Solved</div>
      <p style="color:var(--text2);font-size:0.88rem;">${project.challenges}</p>
    </div>

    <b style="display:block;margin-bottom:12px;color:var(--text);font-size:0.9rem;">Key Features</b>
    <ul class="mod-features">
      ${project.features.map(f => `<li>${f}</li>`).join('')}
    </ul>
    <div class="modal-links">
      ${githubBtn}
      ${liveBtn}
    </div>
  `;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = $('#modalOverlay');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Expose globally
window.openModal = openModal;
window.closeModal = closeModal;

// Modal screenshot navigation
window.modSsGo = function(idx) {
  const imgs = document.querySelectorAll('.mod-ss-img');
  const dots = document.querySelectorAll('.mod-ss-dot');
  imgs.forEach((img, i) => img.classList.toggle('mod-ss-active', i === idx));
  dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
};

// Auto-cycle project card screenshots
function initCardScreenshots() {
  document.querySelectorAll('.project-card').forEach(card => {
    const shots = card.querySelectorAll('.pc-screenshot');
    if (shots.length < 2) return;
    let idx = 0;
    card.addEventListener('mouseenter', () => {
      card._ssInterval = setInterval(() => {
        shots[idx].classList.remove('pc-screenshot-active');
        idx = (idx + 1) % shots.length;
        shots[idx].classList.add('pc-screenshot-active');
      }, 1400);
    });
    card.addEventListener('mouseleave', () => {
      clearInterval(card._ssInterval);
      shots.forEach(s => s.classList.remove('pc-screenshot-active'));
      shots[0].classList.add('pc-screenshot-active');
      idx = 0;
    });
  });
}

// ============ FILE UPLOAD UI ============
function initFileUpload() {
  const zone = $('#fileUploadZone');
  const input = $('#fileInput');
  const list = $('#fileList');
  let files = [];

  if (!zone) return;

  zone.addEventListener('click', () => input.click());

  zone.addEventListener('dragover', e => {
    e.preventDefault();
    zone.classList.add('drag-over');
  });

  zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));

  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('drag-over');
    addFiles([...e.dataTransfer.files]);
  });

  input.addEventListener('change', () => addFiles([...input.files]));

  function addFiles(newFiles) {
    newFiles.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        showToast('error', 'File Too Large', `${file.name} exceeds 5MB limit.`);
        return;
      }
      if (!files.find(f => f.name === file.name)) {
        files.push(file);
      }
    });
    renderFileList();
  }

  function renderFileList() {
    list.innerHTML = '';
    files.forEach((file, i) => {
      const ext = file.name.split('.').pop().toLowerCase();
      const iconMap = { pdf: 'fa-file-pdf', png: 'fa-file-image', jpg: 'fa-file-image', jpeg: 'fa-file-image', docx: 'fa-file-word' };
      const icon = iconMap[ext] || 'fa-file';
      const item = document.createElement('div');
      item.className = 'file-item';
      item.innerHTML = `
        <i class="fa-solid ${icon}"></i>
        <span>${file.name}</span>
        <small style="color:var(--text3);flex-shrink:0;">${(file.size/1024).toFixed(0)} KB</small>
        <button type="button" onclick="removeFile(${i})" title="Remove"><i class="fa-solid fa-xmark"></i></button>
      `;
      list.appendChild(item);
    });
  }

  window.removeFile = (i) => {
    files.splice(i, 1);
    renderFileList();
  };
}

// ============ CONTACT FORM ============
function initContactForm() {
  const form = $('#contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm(form)) return;

    setLoading(true);

    // Prepare form data for Web3Forms
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Add communication method (radio)
    const comm = form.querySelector('input[name="communication"]:checked');
    if (comm) data.communication = comm.value;

    // Add readable subject
    data.subject = `New Project Inquiry: ${data.project_type || 'General'} — from ${data.name}`;

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.success) {
        showToast('success', 'Message Sent! 🎉', `Thanks ${data.name}! I'll get back to you within a few hours.`);
        form.reset();
        // Optional: redirect to WhatsApp after short delay
        // setTimeout(() => window.open('https://wa.me/919876543210?text=Hi!+I+just+submitted+a+project+inquiry.', '_blank'), 2000);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Form error:', err);
      showToast('error', 'Something Went Wrong', 'Please try again or reach me on WhatsApp directly.');
    } finally {
      setLoading(false);
    }
  });

  function setLoading(loading) {
    const btn = $('#submitBtn');
    const text = btn.querySelector('.btn-text');
    const spin = btn.querySelector('.btn-loading');
    btn.disabled = loading;
    text.style.display = loading ? 'none' : 'flex';
    spin.style.display = loading ? 'flex' : 'none';
  }
}

// ---- Form Validation ----
function validateForm(form) {
  let valid = true;
  clearErrors(form);

  // Required text / email / tel / select / textarea fields
  form.querySelectorAll('[required]').forEach(field => {
    if (field.type === 'checkbox') {
      if (!field.checked) {
        const err = field.closest('.form-group')?.querySelector('.field-error') || $('#consentError');
        if (err) err.textContent = 'Please accept to continue.';
        valid = false;
      }
    } else if (!field.value.trim()) {
      showFieldError(field, 'This field is required.');
      valid = false;
    } else if (field.type === 'email' && !isValidEmail(field.value)) {
      showFieldError(field, 'Please enter a valid email address.');
      valid = false;
    }
  });

  // Communication radio check
  const comm = form.querySelector('input[name="communication"]:checked');
  if (!comm) {
    const err = $('#commError');
    if (err) err.textContent = 'Please select a preferred contact method.';
    valid = false;
  }

  if (!valid) {
    const firstErr = form.querySelector('.form-input.error, .field-error:not(:empty)');
    firstErr?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return valid;
}

function showFieldError(field, msg) {
  field.classList.add('error');
  const err = field.closest('.form-group')?.querySelector('.field-error');
  if (err) err.textContent = msg;
}

function clearErrors(form) {
  form.querySelectorAll('.form-input').forEach(f => f.classList.remove('error'));
  form.querySelectorAll('.field-error').forEach(e => e.textContent = '');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ============ TOAST NOTIFICATIONS ============
function showToast(type, title, message) {
  const container = $('#toastContainer');
  const iconMap = { success: 'fa-circle-check', error: 'fa-circle-xmark', info: 'fa-circle-info' };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-icon"><i class="fa-solid ${iconMap[type] || 'fa-circle-info'}"></i></div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${message}</div>
    </div>
    <div class="toast-progress"></div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}

window.showToast = showToast;

// ============ SCROLL TO TOP ============
function initScrollTop() {
  const btn = $('#scrollTop');
  btn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ============ FOOTER YEAR ============
function initYear() {
  const el = $('#year');
  if (el) el.textContent = new Date().getFullYear();
}
