/* ================================================================
   IMPACT — Paper Website JS
   ================================================================ */

/* ----------------------------------------------------------------
   1. Navbar: transparent → solid on scroll
---------------------------------------------------------------- */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ----------------------------------------------------------------
   2. Mobile nav toggle
---------------------------------------------------------------- */
const navToggle = document.getElementById('nav-toggle');
const navMenu   = document.getElementById('nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });

  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('open'));
  });
}

/* ----------------------------------------------------------------
   3. Results tab switching
---------------------------------------------------------------- */
document.querySelectorAll('.tab-pill').forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.dataset.tab;
    const parent = btn.closest('.tabs');

    parent.querySelectorAll('.tab-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    parent.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    const pane = parent.querySelector('#tab-' + tabId);
    if (pane) pane.classList.add('active');
  });
});

/* ----------------------------------------------------------------
   4. Copy BibTeX to clipboard
---------------------------------------------------------------- */
const copyBtn    = document.getElementById('copy-btn');
const bibtexCode = document.getElementById('bibtex-code');

if (copyBtn && bibtexCode) {
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(bibtexCode.textContent);
      copyBtn.classList.add('copied');
      copyBtn.innerHTML = '<i class="fas fa-check"></i><span>&thinsp;Copied!</span>';
      setTimeout(() => {
        copyBtn.classList.remove('copied');
        copyBtn.innerHTML = '<i class="far fa-copy"></i><span>&thinsp;Copy</span>';
      }, 2500);
    } catch {
      /* Fallback: select text for manual copy */
      const range = document.createRange();
      range.selectNodeContents(bibtexCode);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  });
}

/* ----------------------------------------------------------------
   5. Scroll-reveal (IntersectionObserver)
---------------------------------------------------------------- */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ----------------------------------------------------------------
   6. Active nav-link highlight on scroll
---------------------------------------------------------------- */
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  },
  { threshold: 0.35 }
);

sections.forEach(s => sectionObserver.observe(s));
