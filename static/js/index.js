/* ================================================================
   IMPACT — Paper Website JS
   ================================================================ */

const copyBtn = document.getElementById('copy-btn');
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
      const range = document.createRange();
      range.selectNodeContents(bibtexCode);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  });
}

const autoplayVideos = document.querySelectorAll('video[autoplay]');

if ('IntersectionObserver' in window) {
  const videoObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const video = entry.target;
        video.muted = true;
        video.playsInline = true;

        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.25 }
  );

  autoplayVideos.forEach(video => videoObserver.observe(video));
} else {
  autoplayVideos.forEach(video => {
    video.muted = true;
    video.playsInline = true;
    video.play().catch(() => {});
  });
}

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
