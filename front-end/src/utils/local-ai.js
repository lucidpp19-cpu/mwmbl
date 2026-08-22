import { CreateMLCEngine } from '@mlc-ai/web-llm';

const MODEL = 'Llama-3.2-1B-Instruct-q4f16_1-MLC';
let enginePromise;

function setStatus(text, state = 'idle') {
  const status = document.querySelector('[data-local-ai-status]');
  if (status) {
    status.textContent = text;
    status.dataset.state = state;
  }
}

async function getEngine() {
  if (!enginePromise) {
    setStatus('Downloading local model…', 'loading');
    enginePromise = CreateMLCEngine(MODEL, {
      initProgressCallback: (progress) => {
        const percent = Math.round((progress.progress || 0) * 100);
        setStatus(`Local model ${percent}%`, 'loading');
      },
    }).then((engine) => {
      setStatus('Local AI ready', 'ready');
      return engine;
    }).catch((error) => {
      enginePromise = undefined;
      setStatus('Local AI unavailable — search still works', 'error');
      throw error;
    });
  }
  return enginePromise;
}

function scoreResult(result, terms) {
  const text = `${result.querySelector('.title')?.textContent || ''} ${result.querySelector('.extract')?.textContent || ''}`.toLowerCase();
  return terms.reduce((score, term) => score + (text.includes(term) ? 1 : 0), 0);
}

async function enrichSearch(query) {
  const results = [...document.querySelectorAll('.results .result')];
  if (!query || !results.length || !navigator.gpu) return;

  try {
    const engine = await getEngine();
    const response = await engine.chat.completions.create({
      messages: [{
        role: 'user',
        content: `Extract 3 concise search keywords from this query. Return only lowercase words separated by spaces: ${query}`,
      }],
      temperature: 0,
      max_tokens: 20,
    });
    const keywords = response.choices[0]?.message?.content?.toLowerCase().match(/[a-z0-9-]+/g) || [];
    const terms = [...new Set([query.toLowerCase(), ...keywords])];
    results.sort((a, b) => scoreResult(b, terms) - scoreResult(a, terms));
    const list = document.querySelector('.results');
    results.forEach((result) => list.appendChild(result));
  } catch {
    // Local AI is an enhancement; never block the core Mwmbl search flow.
  }
}

export function setupLocalAI() {
  const input = document.querySelector('.search-bar-input');
  const button = document.querySelector('[data-local-ai-toggle]');
  if (!input || !button) return;

  if (!navigator.gpu) {
    button.disabled = true;
    button.title = 'WebGPU is required for local AI';
    setStatus('WebGPU unavailable', 'error');
    return;
  }

  button.addEventListener('click', async () => {
    button.disabled = true;
    try {
      await getEngine();
      await enrichSearch(input.value.trim());
    } finally {
      button.disabled = false;
    }
  });

  input.addEventListener('change', () => enrichSearch(input.value.trim()));
}
