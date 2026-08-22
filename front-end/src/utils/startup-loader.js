const QUOTES = [
  'Next time, it will be 5x faster.',
  'Warming up the search experience.',
  'A little patience makes better search.',
  'Almost there — your results are worth it.',
];

export function setupStartupLoader() {
  const loader = document.querySelector('[data-startup-loader]');
  const percent = document.querySelector('[data-loader-percent]');
  const quote = document.querySelector('[data-loader-quote]');
  if (!loader || !percent || !quote) return;

  let quoteIndex = 0;
  let modelProgress = 0;
  let modelReady = false;
  let pageReady = document.readyState === 'complete';
  let finished = false;

  const update = (value) => {
    modelProgress = Math.max(modelProgress, Math.min(99, Math.round(value)));
    percent.textContent = `${modelProgress}%`;
    if (modelProgress > 0 && modelProgress % 20 < 4) {
      quoteIndex = (quoteIndex + 1) % QUOTES.length;
      quote.textContent = QUOTES[quoteIndex];
    }
  };

  const finish = () => {
    if (finished || !pageReady || !modelReady) return;
    finished = true;
    update(100);
    window.setTimeout(() => loader.classList.add('is-hidden'), 260);
  };

  window.addEventListener('load', () => {
    pageReady = true;
    finish();
  }, { once: true });

  window.addEventListener('mwmbl:model-progress', (event) => {
    const progress = Number(event.detail?.progress);
    if (Number.isFinite(progress)) update(progress * 100);
  });
  window.addEventListener('mwmbl:model-ready', () => {
    modelReady = true;
    finish();
  }, { once: true });
  window.addEventListener('mwmbl:model-error', () => {
    modelReady = true;
    quote.textContent = 'Search is ready without the local model.';
    finish();
  }, { once: true });

  window.setTimeout(() => {
    if (!modelReady) {
      quote.textContent = 'Local AI is still downloading — keep this tab open.';
    }
  }, 8000);

  update(0);
}
