/* Utilidades compartidas por los demos. Todo corre en el navegador, sin red. */

// Pestañas: <div class="tabs"><button data-panel="id">…</button></div> + <section id="id" class="panel">
function initTabs(root = document) {
  root.querySelectorAll('.tabs').forEach((bar) => {
    const buttons = [...bar.querySelectorAll('button[data-panel]')];
    const show = (name) => {
      buttons.forEach((b) => b.setAttribute('aria-selected', String(b.dataset.panel === name)));
      buttons.forEach((b) => {
        const panel = document.getElementById(b.dataset.panel);
        if (panel) panel.hidden = b.dataset.panel !== name;
      });
    };
    buttons.forEach((b) => b.addEventListener('click', () => show(b.dataset.panel)));
    show(buttons[0].dataset.panel);
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Escribe líneas en un <pre class="log"> con retardo, para simular un proceso vivo
async function logLines(el, lines, delay = 380) {
  for (const line of lines) {
    el.textContent += (el.textContent ? '\n' : '') + line;
    el.scrollTop = el.scrollHeight;
    await sleep(delay);
  }
}

// Barra + toolbar de la ventana simulada
function appBar(url) {
  return `<div class="app-bar"><span class="dots"><i></i><i></i><i></i></span><span class="app-url">${url}</span></div>`;
}

// Cinta superior común a todos los demos
function demoFlag(label) {
  return `<div class="demo-flag"><b>Demo</b><span>${label}</span><a href="../index.html">Ver todos los demos</a></div>`;
}

document.addEventListener('DOMContentLoaded', () => initTabs());
