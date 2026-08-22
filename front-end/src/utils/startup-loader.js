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

  let progress = 0;
  let quoteIndex = 0;
  const interval = window.setInterval(() => {
    progress = Math.min(progress + Math.ceil(Math.random() * 12), 92);
    percent.textContent = `${progress}%`;
    if (progress > 35 && progress < 92 && progress % 3 === 0) {
      quoteIndex = (quoteIndex + 1) % QUOTES.length;
      quote.textContent = QUOTES[quoteIndex];
    }
  }, 110);

  const finish = () => {
    window.clearInterval(interval);
    percent.textContent = '100%';
    window.setTimeout(() => loader.classList.add('is-hidden'), 180);
  };

  if (document.readyState === 'complete') finish();
  else window.addEventListener('load', finish, { once: true });
  window.setTimeout(finish, 2800);
}
