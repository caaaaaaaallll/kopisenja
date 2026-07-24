/* ============================================================
   KOPI SENJA — Interactive Dashboard Script v3
   Features: Nav, Reveal, Filter, Quick Order, Stats Counter,
             Open/Close Status, Promo Bar, Floating WA
   ============================================================ */

// ─── Menu data ───────────────────────────────────────────────
const menuData = [
  { id: 'senja-hitam',    emoji: '☕', name: 'Senja Hitam',          price: 20000, category: 'kopi' },
  { id: 'kopi-susu',      emoji: '🥤', name: 'Kopi Susu Gula Aren',  price: 24000, category: 'kopi' },
  { id: 'v60',            emoji: '🫖', name: 'V60 Manual Brew',       price: 28000, category: 'kopi' },
  { id: 'americano',      emoji: '☕', name: 'Americano Senja',       price: 22000, category: 'kopi' },
  { id: 'cokelat',        emoji: '🍫', name: 'Cokelat Senja',         price: 22000, category: 'non-kopi' },
  { id: 'teh-serai',      emoji: '🍵', name: 'Teh Serai Jahe',        price: 18000, category: 'non-kopi' },
  { id: 'pisang',         emoji: '🍌', name: 'Pisang Goreng Krispi',  price: 15000, category: 'camilan' },
  { id: 'roti-bakar',     emoji: '🍞', name: 'Roti Bakar Srikaya',    price: 17000, category: 'camilan' },
  { id: 'kentang',        emoji: '🍟', name: 'Kentang Sambal Matah',  price: 19000, category: 'camilan' },
];

// Track cart state
const cart = {};

// ─── Helpers ──────────────────────────────────────────────────
const fmt = (n) => 'Rp ' + n.toLocaleString('id-ID');

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// ─── Footer year ─────────────────────────────────────────────
$('#year').textContent = new Date().getFullYear();

// ─── Promo bar close ─────────────────────────────────────────
const promoBar = $('#promoBar');
const promoClose = $('#promoClose');
if (promoClose) {
  promoClose.addEventListener('click', () => {
    promoBar.style.maxHeight = promoBar.offsetHeight + 'px';
    requestAnimationFrame(() => {
      promoBar.style.transition = 'max-height .4s ease, opacity .4s ease';
      promoBar.style.maxHeight = '0';
      promoBar.style.opacity = '0';
      promoBar.style.overflow = 'hidden';
    });
    setTimeout(() => promoBar.remove(), 450);
  });
}

// ─── Sticky header shadow ────────────────────────────────────
const siteHeader = $('.site-header');
const scrollThreshold = 60;
window.addEventListener('scroll', () => {
  siteHeader.classList.toggle('scrolled', window.scrollY > scrollThreshold);
}, { passive: true });

// ─── Mobile nav toggle ───────────────────────────────────────
const navToggle = $('#navToggle');
const navLinks = $('#navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.classList.toggle('is-open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!siteHeader.contains(e.target)) {
    navLinks.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

// ─── Active nav highlight (IntersectionObserver) ─────────────
const sections = $$('main section[id]');
const navItems = $$('.nav-link[data-nav]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navItems.forEach(link => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-35% 0px -60% 0px' });

sections.forEach(s => navObserver.observe(s));

// ─── Scroll reveal ───────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      // Also reveal child elements with delay classes
      $$('.reveal-delay-1, .reveal-delay-2, .reveal-delay-3, .timeline-item, .value-card', entry.target).forEach(el => {
        el.classList.add('is-visible');
      });
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

$$('.reveal').forEach(el => revealObserver.observe(el));

// ─── Animated stats counter ──────────────────────────────────
const statNums = $$('.stat-num');
let statsAnimated = false;

const animateStats = () => {
  if (statsAnimated) return;
  const heroSection = $('#beranda');
  const rect = heroSection.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.8) {
    statsAnimated = true;
    statNums.forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      const duration = 1800;
      const start = performance.now();

      const tick = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target + (target >= 100 ? '+' : '');
      };
      requestAnimationFrame(tick);
    });
  }
};

window.addEventListener('scroll', animateStats, { passive: true });
animateStats(); // Check immediately

// ─── Open/Closed status badge ────────────────────────────────
const openBadge = $('#openBadge');
if (openBadge) {
  const now = new Date();
  // WITA = UTC+8
  const utcOffset = 8;
  const wita = new Date(now.getTime() + (utcOffset * 60 - now.getTimezoneOffset()) * 60000);
  const hour = wita.getHours();
  const isOpen = hour >= 8 && hour < 21;
  openBadge.textContent = isOpen ? '🟢 Buka' : '🔴 Tutup';
  openBadge.classList.toggle('closed', !isOpen);
}

// ─── Menu filter ─────────────────────────────────────────────
const filterButtons = $$('.filter-btn');
const menuCards = $$('.menu-card');
const menuEmpty = $('#menuEmpty');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => {
      b.classList.remove('is-active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('is-active');
    btn.setAttribute('aria-selected', 'true');

    const filter = btn.dataset.filter;
    let visible = 0;

    menuCards.forEach((card, i) => {
      const match = filter === 'all' || card.dataset.category === filter;
      if (match) {
        card.style.display = '';
        card.style.animation = `cardFadeIn .35s ${i * 0.06}s ease both`;
        visible++;
      } else {
        card.style.display = 'none';
      }
    });

    menuEmpty.hidden = visible !== 0;
  });
});

// Card fade-in keyframe
if (!document.querySelector('#dynamicStyles')) {
  const style = document.createElement('style');
  style.id = 'dynamicStyles';
  style.textContent = `
    @keyframes cardFadeIn {
      from { opacity: 0; transform: translateY(16px) scale(.97); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
  `;
  document.head.appendChild(style);
}

// ─── Contact form ─────────────────────────────────────────────
const contactForm = $('#contactForm');
const formSuccess = $('#formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name    = $('#fname').value.trim();
  const email   = $('#femail').value.trim();
  const phone   = $('#fphone').value.trim();
  const message = $('#fmessage').value.trim();

  const subject = encodeURIComponent(`Pesan dari ${name} melalui website Kopi Senja`);
  const phoneInfo = phone ? `\nNo. WA: ${phone}` : '';
  const body    = encodeURIComponent(`${message}${phoneInfo}\n\n— ${name} (${email})`);

  window.location.href = `mailto:haykalbastian.hb.hb@gmail.com?subject=${subject}&body=${body}`;

  // Show success state
  const submitBtn = $('#submitContact');
  const origText  = submitBtn.innerHTML;
  submitBtn.innerHTML = '✅ Mengirim...';
  submitBtn.disabled  = true;

  setTimeout(() => {
    formSuccess.hidden  = false;
    submitBtn.innerHTML = origText;
    submitBtn.disabled  = false;
    contactForm.reset();
    setTimeout(() => { formSuccess.hidden = true; }, 5000);
  }, 800);
});

// ─── Quick Order System ───────────────────────────────────────
const quickMenuGrid = $('#quickMenuGrid');
const summaryEmpty  = $('#summaryEmpty');
const summaryItems  = $('#summaryItems');
const summaryList   = $('#summaryList');
const summaryTotal  = $('#summaryTotal');
const submitQuickOrder = $('#submitQuickOrder');

// Build quick menu items
menuData.forEach(item => {
  const el = document.createElement('div');
  el.className = 'quick-item';
  el.dataset.id = item.id;
  el.innerHTML = `
    <span class="quick-item-emoji">${item.emoji}</span>
    <span class="quick-item-name">${item.name}</span>
    <span class="quick-item-price">${fmt(item.price)}</span>
    <span class="quick-item-qty" id="qty-${item.id}">1</span>
  `;

  el.addEventListener('click', () => toggleQuickItem(item, el));
  quickMenuGrid.appendChild(el);
});

function toggleQuickItem(item, el) {
  if (cart[item.id]) {
    // Already in cart — increase qty or deselect on second click
    cart[item.id].qty += 1;
    const qtyEl = $(`#qty-${item.id}`);
    if (qtyEl) qtyEl.textContent = cart[item.id].qty;
  } else {
    cart[item.id] = { ...item, qty: 1 };
    el.classList.add('selected');
  }
  renderSummary();
}

function removeCartItem(id) {
  delete cart[id];
  const el = $(`.quick-item[data-id="${id}"]`);
  if (el) {
    el.classList.remove('selected');
    const qtyEl = $(`#qty-${id}`);
    if (qtyEl) { qtyEl.textContent = '1'; }
  }
  renderSummary();
}

function renderSummary() {
  const items = Object.values(cart);
  const isEmpty = items.length === 0;

  summaryEmpty.hidden  = !isEmpty;
  summaryItems.hidden  =  isEmpty;

  if (isEmpty) return;

  // Build list
  summaryList.innerHTML = items.map(item => `
    <li class="summary-item" data-id="${item.id}">
      <span class="summary-item-name">${item.emoji} ${item.name} ×${item.qty}</span>
      <span class="summary-item-price">${fmt(item.price * item.qty)}</span>
      <button class="summary-item-remove" data-id="${item.id}" aria-label="Hapus ${item.name}">✕</button>
    </li>
  `).join('');

  // Remove button handlers
  $$('.summary-item-remove', summaryList).forEach(btn => {
    btn.addEventListener('click', () => removeCartItem(btn.dataset.id));
  });

  // Total
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  summaryTotal.textContent = fmt(total);

  // Build WhatsApp link
  const lines = items.map(item => `- ${item.name} ×${item.qty} = ${fmt(item.price * item.qty)}`).join('%0A');
  const totalLine = `%0A%0ATotal: ${fmt(total)}`;
  const msg = `Halo%20Kopi%20Senja!%20Saya%20mau%20pesan%3A%0A${lines}${totalLine}`;
  submitQuickOrder.href = `https://wa.me/+6289680710351?text=${msg}`;
}

// ─── Smooth scroll for anchor links ──────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const headerHeight = siteHeader.offsetHeight;
      const y = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});

// ─── Floating WA button – show after scroll ──────────────────
const fabWa = $('#fabWa');
if (fabWa) {
  window.addEventListener('scroll', () => {
    fabWa.style.opacity = window.scrollY > 300 ? '1' : '0';
    fabWa.style.pointerEvents = window.scrollY > 300 ? 'auto' : 'none';
  }, { passive: true });
  fabWa.style.opacity = '0';
  fabWa.style.transition = 'opacity .4s ease';
}

// ─── Hero badge float animation stagger ──────────────────────
// Already handled via CSS, nothing extra needed

// ─── Init: trigger stats if already visible ───────────────────
document.addEventListener('DOMContentLoaded', () => {
  animateStats();
});
