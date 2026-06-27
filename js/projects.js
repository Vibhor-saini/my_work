/**
 * projects.js
 * Enterprise case study data and project card rendering.
 * Vibhor Saini — Backend Software Engineer Portfolio
 */

'use strict';

const PROJECTS = [
  {
    id: 'hubspot-crm',
    title: 'HubSpot CRM Integration',
    category: 'CRM Integration',
    thumbClass: 'thumb-blue',
    thumbIcon: 'fa-solid fa-arrows-rotate',
    nda: true,
    impact: 'Automated the full lead lifecycle — contact creation, deal progression, and follow-up sequences — eliminating hours of manual CRM entry per week.',
    businessImpact: 'Real-time CRM synchronization replaced manual data entry across the full lead lifecycle.',
    tags: ['HubSpot API', 'Laravel', 'Webhooks', 'OAuth2', 'MySQL'],
    github: null,
    live: null,
    caseStudy: {
      role: 'Backend Engineer',
      problem: 'A service business was managing leads manually across email, spreadsheets, and their CRM. New contacts from web forms weren\'t syncing to HubSpot reliably, deal stages were updated by hand, and there was no automated follow-up when a deal went cold. The sales team spent significant time on CRM data entry rather than selling.',
      solution: 'Built a Laravel-based integration layer between the client\'s web platform and HubSpot CRM. Implemented OAuth2 authentication with automatic token refresh, a bidirectional contact sync engine, and a webhook listener that responds to HubSpot deal stage changes to trigger downstream actions.',
      challenges: [
        'HubSpot\'s OAuth token expiry required a silent refresh mechanism without interrupting background sync jobs.',
        'Preventing duplicate contact creation when leads came through multiple channels simultaneously — solved with a unique-key lookup before insert and queue-level deduplication.',
        'Webhook signature verification to ensure all incoming events from HubSpot were authentic.'
      ],
      metrics: [
        { value: '~15 hrs/week', desc: 'manual CRM work eliminated' },
        { value: '100%', desc: 'lead capture reliability' }
      ],
      result: 'Every new lead now lands in HubSpot within seconds of form submission. Deal stage changes trigger automated email sequences and internal Slack notifications. The sales team works entirely within HubSpot without touching backend data manually.'
    }
  },
  {
    id: 'meta-pixel-capi',
    title: 'Meta Pixel & Conversions API',
    category: 'Ad Tracking',
    thumbClass: 'thumb-purple',
    thumbIcon: 'fa-solid fa-chart-line',
    nda: true,
    impact: 'Restored full ad tracking accuracy post-iOS 14 by implementing server-side event mirroring, recovering conversion data that browser-side tracking lost to ad blockers and consent restrictions.',
    businessImpact: 'Server-side event tracking restored attribution accuracy lost to ad blockers and iOS restrictions.',
    tags: ['Meta CAPI', 'Laravel', 'JavaScript', 'Facebook SDK', 'Queues'],
    github: null,
    live: null,
    caseStudy: {
      role: 'Backend & Integration Engineer',
      problem: 'An e-commerce client\'s Meta ad campaigns were severely under-reporting conversions after iOS 14 ATT changes and growing browser extension adoption. Browser-only pixel tracking was missing 40–60% of purchase events, causing the Meta algorithm to under-optimize and ROAS to drop significantly.',
      solution: 'Implemented a dual-track event system: the existing Meta Pixel continued firing browser-side, while a new Laravel-powered server-side layer sent the same events directly to Meta\'s Conversions API. Implemented event deduplication using a shared event_id to prevent double-counting in Meta\'s attribution engine.',
      challenges: [
        'Event deduplication: matching browser pixel events with server CAPI events using the same event_id hash across both channels.',
        'User data hashing: PII fields (email, phone, name) required SHA256 hashing client-side and server-side before transmission.',
        'Timing: server events needed to fire close to the browser events to maintain accurate attribution windows.'
      ],
      metrics: [
        { value: 'ROAS ↑', desc: 'improvement within days of go-live' },
        { value: '~98%', desc: 'event match quality score achieved' }
      ],
      result: 'Conversion tracking accuracy recovered significantly. Meta\'s attribution had full visibility into the purchase funnel, allowing the algorithm to re-optimize. The client saw measurable ROAS improvement within the first week of deployment.'
    }
  },
  {
    id: 'xero-automation',
    title: 'Xero Accounting Automation',
    category: 'Finance Automation',
    thumbClass: 'thumb-teal',
    thumbIcon: 'fa-solid fa-file-invoice-dollar',
    nda: true,
    impact: 'Eliminated manual invoice creation and reconciliation by automatically syncing job completions from field service software to Xero, reducing billing cycle time from days to minutes.',
    businessImpact: 'Automated invoice generation reduced billing cycle from 2–3 days to under a minute.',
    tags: ['Xero API', 'Laravel', 'OAuth2', 'Webhooks', 'Queue Workers'],
    github: null,
    live: null,
    caseStudy: {
      role: 'Backend Engineer',
      problem: 'A field service company was manually re-entering completed job data from their operations platform into Xero for invoicing. This two-step process introduced errors, delayed billing by 2–3 days, and required dedicated admin time after every job completion.',
      solution: 'Built a Laravel automation service that listens for job completion webhooks from the field service platform and automatically creates draft invoices in Xero. Implemented Xero OAuth2 with token refresh, contact matching (or auto-creation), and line item mapping from job data to Xero invoice structure.',
      challenges: [
        'Xero\'s contact system required exact matching to avoid duplicates — implemented a lookup-first strategy with fuzzy name matching as fallback.',
        'Handling Xero API rate limits (60 req/min) using Laravel queues with rate-limited job dispatch.',
        'Token refresh race condition when multiple jobs fired simultaneously — solved with atomic lock on the token store.'
      ],
      metrics: [
        { value: '2–3 days → mins', desc: 'invoice generation time' },
        { value: '0 hrs/week', desc: 'manual re-entry eliminated' }
      ],
      result: 'Invoice drafts now appear in Xero within seconds of a job being marked complete. Billing accuracy improved and the admin team\'s time was freed for higher-value work.'
    }
  },
  {
    id: 'hubspot-make-billdotcom',
    title: 'HubSpot + Make + Bill.com Pipeline',
    category: 'Multi-Platform Automation',
    thumbClass: 'thumb-indigo',
    thumbIcon: 'fa-solid fa-diagram-project',
    nda: true,
    impact: 'Automated the full accounts-payable workflow from CRM deal closure to payment approval, removing all manual handoffs between sales, finance, and vendors.',
    businessImpact: 'End-to-end AP workflow automated from deal close to payment approval — zero manual handoffs.',
    tags: ['HubSpot', 'Make (Integromat)', 'Bill.com API', 'Laravel', 'Webhooks'],
    github: null,
    live: null,
    caseStudy: {
      role: 'Automation & Integration Engineer',
      problem: 'When a deal closed in HubSpot, a multi-step manual process began: a finance team member was notified by email, they created a vendor bill in Bill.com, uploaded supporting documents, and routed it for approval. Every step was manual, error-prone, and took 1–2 days.',
      solution: 'Designed and implemented a Make (formerly Integromat) automation scenario backed by a Laravel webhook receiver. When HubSpot fires a deal-closed event, the pipeline: extracts deal and contact data, creates a vendor bill in Bill.com with correct GL coding, attaches relevant documents, and routes for automated approval based on deal value thresholds.',
      challenges: [
        'Bill.com\'s API requires specific vendor and chart-of-accounts IDs — built a mapping layer that resolves HubSpot deal properties to Bill.com entity IDs.',
        'Make scenario error recovery: implemented a dead-letter pattern so failed steps don\'t silently drop records.',
        'Document attachment required pre-signing S3 URLs and streaming them into Bill.com\'s document upload endpoint.'
      ],
      metrics: [
        { value: '1–2 days → <5 min', desc: 'AP workflow cycle time' },
        { value: '100%', desc: 'manual steps automated' }
      ],
      result: 'Finance team no longer manually processes vendor bills for standard deals. The pipeline handles creation, coding, document attachment, and routing automatically, with error alerts sent to Slack for any exceptions.'
    }
  },
  {
    id: 'wix-zapier-jobber',
    title: 'Wix + Zapier + Jobber Integration',
    category: 'Service Business Automation',
    thumbClass: 'thumb-green',
    thumbIcon: 'fa-solid fa-wrench',
    nda: true,
    impact: 'Connected a Wix lead capture form to Jobber\'s job management platform via Zapier and a custom Laravel middleware, turning new inquiries into scheduled jobs automatically.',
    businessImpact: 'Automated lead creation and job scheduling — form submissions appear in Jobber within seconds.',
    tags: ['Wix API', 'Zapier', 'Jobber API', 'Laravel', 'Webhooks'],
    github: null,
    live: null,
    caseStudy: {
      role: 'Integration Engineer',
      problem: 'A home services company collected lead enquiries through their Wix website, but manually transferred these into Jobber to create client records and schedule jobs. With high inquiry volume, leads were getting lost in the gap between submission and entry.',
      solution: 'Built a custom Laravel webhook receiver that acts as middleware between Wix form submissions (routed through Zapier) and the Jobber API. The middleware normalizes Wix form data, deduplicates contacts by email/phone, creates or updates client records in Jobber, and creates a draft request for scheduling — all within seconds of form submission.',
      challenges: [
        'Wix doesn\'t natively support custom webhook payloads — used Zapier as a relay with a custom payload format mapped to our receiver.',
        'Jobber contact deduplication: implemented a search-before-create pattern using the Jobber GraphQL API.',
        'Phone number normalization: incoming formats varied widely; built a normalization layer that standardizes to E.164 before lookup and creation.'
      ],
      metrics: [
        { value: '0', desc: 'leads lost in transfer' },
        { value: '<10 sec', desc: 'form-to-Jobber record time' }
      ],
      result: 'Every Wix form submission is now immediately visible in Jobber as a client request. The operations team works entirely from Jobber\'s scheduling interface without manually copying data from the website.'
    }
  },
  {
    id: 'woocommerce-api',
    title: 'WooCommerce API Integration',
    category: 'E-Commerce Backend',
    thumbClass: 'thumb-orange',
    thumbIcon: 'fa-solid fa-bag-shopping',
    nda: false,
    impact: 'Built a custom REST API layer on top of WooCommerce to expose order, product, and customer data to an external inventory management system, enabling real-time stock synchronization.',
    businessImpact: 'Real-time stock synchronization via REST API eliminated overselling and manual export cycles.',
    tags: ['WooCommerce REST API', 'PHP', 'Laravel', 'MySQL', 'Webhooks'],
    github: null,
    live: null,
    caseStudy: {
      role: 'Backend Engineer',
      problem: 'An e-commerce brand was managing inventory manually between their WooCommerce store and a warehouse management system. Overselling was common because stock levels weren\'t synced, and order fulfillment required manual export/import of data between systems.',
      solution: 'Built a Laravel-based integration service that uses the WooCommerce REST API to: sync product stock levels bidirectionally, listen to order webhooks for real-time fulfillment triggers, and expose a normalized internal API endpoint for the warehouse system to consume. Implemented optimistic locking to prevent stock race conditions during high-traffic periods.',
      challenges: [
        'WooCommerce webhook delivery is not guaranteed — implemented idempotent webhook handlers and a reconciliation cron that catches missed events.',
        'Stock race conditions during flash sales: used database-level pessimistic locking for stock decrement operations.',
        'Rate-limiting WooCommerce API calls during bulk sync operations to avoid hitting their per-minute request ceiling.'
      ],
      metrics: [
        { value: '~0%', desc: 'overselling incidents after deployment' },
        { value: 'Real-time', desc: 'stock level accuracy' }
      ],
      result: 'Inventory is now synchronized across WooCommerce and the warehouse system in real time. Order data flows automatically from WooCommerce to fulfillment, eliminating manual export/import operations.'
    }
  },
  {
    id: 'laravel-rest-api',
    title: 'Laravel REST API Platform',
    category: 'API Development',
    thumbClass: 'thumb-red',
    thumbIcon: 'fa-solid fa-code',
    nda: false,
    impact: 'Designed and built a versioned REST API with role-based authentication, rate limiting, and structured JSON responses to serve a mobile application and third-party partner integrations.',
    businessImpact: 'Secure versioned API serving 3 consumers from a single codebase with consistent response contracts.',
    tags: ['Laravel', 'Sanctum', 'MySQL', 'Redis', 'API Versioning'],
    github: 'https://github.com/Vibhor-saini',
    live: null,
    caseStudy: {
      role: 'Backend Engineer',
      problem: 'A product company was serving a web frontend and mobile app from unstructured, tightly-coupled PHP endpoints. Adding new consumers (a partner API, a mobile app) required duplicating logic. There was no authentication standardization, rate limiting, or consistent error response format.',
      solution: 'Designed and implemented a versioned Laravel REST API (/api/v1/...) with Laravel Sanctum token authentication, resource transformers for consistent JSON output, custom exception handlers for structured error responses, and Redis-backed rate limiting per API key. Implemented role-based access policies at the route middleware layer.',
      challenges: [
        'Response consistency: every controller previously returned different shapes — standardized via API Resource classes with a shared BaseResource transformer.',
        'Rate limiting: different consumer tiers needed different limits — implemented a configurable tier system backed by Redis counters.',
        'Versioning strategy: used URL-based versioning with namespace-separated controllers to allow v1 and future v2 to coexist without breaking consumers.'
      ],
      metrics: [
        { value: '3 consumers', desc: 'served from single API' },
        { value: '100%', desc: 'response format consistency' }
      ],
      result: 'The API now serves the web frontend, mobile app, and a partner integration from a single, documented, versioned codebase. New endpoints can be added without breaking existing consumers, and all requests are authenticated, rate-limited, and return consistent error structures.'
    }
  },
  {
    id: 'payment-gateway',
    title: 'Payment Gateway Integration',
    category: 'Payment Engineering',
    thumbClass: 'thumb-indigo',
    thumbIcon: 'fa-solid fa-credit-card',
    nda: true,
    impact: 'Integrated Stripe and Razorpay with server-side payment verification, subscription lifecycle handling, and webhook-driven order status updates for a SaaS billing system.',
    businessImpact: 'Secure server-side payment verification with automated subscription renewal and dunning logic.',
    tags: ['Stripe', 'Razorpay', 'Laravel', 'Webhooks', 'Queues'],
    github: null,
    live: null,
    caseStudy: {
      role: 'Backend Engineer',
      problem: 'A SaaS company was using a basic payment flow without server-side verification. Payments were trusted on the client\'s confirmation alone, subscription renewals were managed manually, and failed payments had no automated recovery flow.',
      solution: 'Implemented a secure dual-gateway payment system (Stripe for international, Razorpay for India) with: server-side payment intent creation and verification, webhook listeners for payment.succeeded, payment.failed, and subscription events, automated dunning logic for failed renewals, and idempotent order creation tied to payment verification.',
      challenges: [
        'Preventing duplicate order creation on webhook retry: implemented idempotent processing using Stripe\'s payment intent ID as a unique key.',
        'Subscription state management: built a local subscription model that mirrors Stripe\'s subscription object and updates via webhooks.',
        'Testing webhook flows locally: used Stripe CLI for local webhook forwarding during development, which became a repeatable development pattern.'
      ],
      metrics: [
        { value: '100%', desc: 'server-side payment verification' },
        { value: 'Automated', desc: 'subscription renewal & dunning' }
      ],
      result: 'Payment processing is fully server-verified. Subscription events update the platform\'s access control automatically. Failed payments trigger a 3-attempt dunning sequence before subscription suspension — with zero manual intervention required.'
    }
  },
  {
    id: 'realtime-chat',
    title: 'Realtime Chat Application',
    category: 'Realtime Systems',
    thumbClass: 'thumb-dark',
    thumbIcon: 'fa-solid fa-comments',
    nda: false,
    impact: 'Built a WebSocket-powered team chat system with persistent message history, presence indicators, and real-time sidebar sync — replacing async email threads for internal team coordination.',
    businessImpact: 'Queue-based WebSocket architecture with full message persistence and real-time presence tracking.',
    tags: ['Laravel', 'Laravel Reverb', 'Livewire', 'MySQL', 'WebSockets'],
    github: 'https://github.com/Vibhor-saini/baseline_chat',
    live: null,
    caseStudy: {
      role: 'Backend & Fullstack Engineer',
      problem: 'A team was coordinating project updates over email threads, causing communication delays, context loss, and version confusion. They needed a lightweight internal messaging tool with real-time delivery and message persistence — without the overhead of a third-party SaaS chat tool.',
      solution: 'Built a Laravel-based chat application using Laravel Reverb as the WebSocket server. Implemented: channel-based messaging with user presence, real-time sidebar updates when new messages arrive, persistent message storage in MySQL with pagination for history, and authentication-gated channels using Laravel Echo on the frontend.',
      challenges: [
        'Concurrent WebSocket connections causing sidebar state desync — resolved by broadcasting channel-level events that all connected clients subscribe to.',
        'Message ordering guarantees: used database-level auto-increment IDs as canonical message ordering, not client-generated timestamps.',
        'Presence channel scaling: optimized the presence event payload to avoid broadcasting full user lists on every join/leave, using delta updates instead.'
      ],
      metrics: [
        { value: 'Real-time', desc: 'message delivery via WebSockets' },
        { value: 'Full history', desc: 'persisted and paginated' }
      ],
      result: 'Team members communicate in real time with zero message delay. Channel presence indicators show who\'s online, message history is fully searchable, and the system handles concurrent connections reliably. Open-source on GitHub.'
    }
  }
];

/**
 * Render project cards into the grid.
 */
function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  grid.innerHTML = PROJECTS.map((project, index) => `
    <article
      class="project-card reveal"
      role="listitem"
      data-index="${index}"
      tabindex="0"
      aria-label="View case study: ${project.title}"
      onclick="openModal(${index})"
      onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openModal(${index});}"
    >
      <div class="project-thumb ${project.thumbClass}">
        <i class="${project.thumbIcon} project-thumb-icon" aria-hidden="true"></i>
        <div class="project-thumb-overlay">
          <button class="project-thumb-btn" tabindex="-1" aria-hidden="true">
            <i class="fa-solid fa-file-lines"></i> Case Study
          </button>
        </div>
        <span class="project-badge">${project.category}</span>
        ${project.nda ? `<span class="project-nda-badge"><i class="fa-solid fa-lock" aria-hidden="true"></i> NDA</span>` : ''}
      </div>

      <div class="project-body">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-impact">${project.impact}</p>
        ${project.businessImpact ? `<p class="project-business-impact"><i class="fa-solid fa-arrow-trend-up" aria-hidden="true"></i> ${project.businessImpact}</p>` : ''}

        <div class="project-tags">
          ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
        </div>

        <div class="project-footer">
          ${project.github ? `
            <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-action" onclick="event.stopPropagation()" aria-label="View on GitHub">
              <i class="fa-brands fa-github" aria-hidden="true"></i> GitHub
            </a>
          ` : project.nda ? `
            <span class="project-action">
              <i class="fa-solid fa-lock" aria-hidden="true"></i> NDA Protected
            </span>
          ` : ''}
          <span class="project-action project-action-primary" aria-hidden="true">
            Read Case Study <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </span>
        </div>
      </div>
    </article>
  `).join('');

  // Trigger reveal animations
  requestAnimationFrame(() => {
    const cards = grid.querySelectorAll('.reveal');
    cards.forEach((card, i) => {
      card.style.transitionDelay = `${i * 60}ms`;
    });
    observeElements(cards);

    // Also let main.js ScrollReveal pick up any newly visible cards
    setTimeout(() => {
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight) card.classList.add('in-view');
      });
    }, 200);
  });
}

/**
 * Observe elements for scroll-based reveal.
 * @param {NodeList|Array} elements
 */
function observeElements(elements) {
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('in-view'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

/**
 * Open modal with project case study.
 * @param {number} index
 */
function openModal(index) {
  const project = PROJECTS[index];
  if (!project) return;

  const overlay = document.getElementById('modalOverlay');
  const body = document.getElementById('modalBody');
  if (!overlay || !body) return;

  const cs = project.caseStudy;

  body.innerHTML = `
    <div class="modal-header">
      <p class="modal-eyebrow">${project.category}</p>
      <h2 class="modal-title">${project.title}</h2>
      <p class="modal-subtitle">Role: ${cs.role}</p>
      <div class="modal-tags">
        ${project.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join('')}
      </div>
    </div>

    <div class="case-study">
      <div class="case-section">
        <p class="case-label">Problem</p>
        <p>${cs.problem}</p>
      </div>

      <div class="case-section">
        <p class="case-label">Solution</p>
        <p>${cs.solution}</p>
      </div>

      <div class="case-section">
        <p class="case-label">Technical Challenges</p>
        <ul>${cs.challenges.map(c => `<li>${c}</li>`).join('')}</ul>
      </div>

      <div class="case-section">
        <p class="case-label">Business Impact</p>
        <div class="impact-metric">
          ${cs.metrics.map(m => `
            <div class="metric-item">
              <div class="metric-value">${m.value}</div>
              <div class="metric-desc">${m.desc}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="case-section">
        <p class="case-label">Result</p>
        <p>${cs.result}</p>
      </div>

      ${project.github ? `
        <div>
          <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn-ghost-sm">
            <i class="fa-brands fa-github" aria-hidden="true"></i> View on GitHub
          </a>
        </div>
      ` : ''}
    </div>
  `;

  overlay.setAttribute('aria-hidden', 'false');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Focus close button
  const closeBtn = document.getElementById('modalClose');
  if (closeBtn) setTimeout(() => closeBtn.focus(), 100);
}

/**
 * Close the modal.
 */
function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  if (!overlay) return;
  overlay.classList.remove('active');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', renderProjects);