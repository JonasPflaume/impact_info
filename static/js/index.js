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

document.querySelectorAll('video[data-playback-rate]').forEach(video => {
  const playbackRate = Number.parseFloat(video.dataset.playbackRate);

  if (!Number.isFinite(playbackRate) || playbackRate <= 0) {
    return;
  }

  const setPlaybackRate = () => {
    video.defaultPlaybackRate = playbackRate;
    video.playbackRate = playbackRate;
  };

  setPlaybackRate();
  video.addEventListener('loadedmetadata', setPlaybackRate);
  video.addEventListener('play', setPlaybackRate);
});

document.querySelectorAll('video[data-mobile-src][data-desktop-src]').forEach(video => {
  const desktopQuery = window.matchMedia('(min-width: 901px)');

  const setResponsiveSource = () => {
    const src = desktopQuery.matches ? video.dataset.desktopSrc : video.dataset.mobileSrc;

    if (!src || video.getAttribute('src') === src) {
      return;
    }

    video.setAttribute('src', src);
    video.load();

    if (video.autoplay) {
      video.play().catch(() => {});
    }
  };

  setResponsiveSource();
  if (typeof desktopQuery.addEventListener === 'function') {
    desktopQuery.addEventListener('change', setResponsiveSource);
  } else {
    desktopQuery.addListener(setResponsiveSource);
  }
});

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
