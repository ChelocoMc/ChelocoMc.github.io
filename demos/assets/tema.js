/* Tema compartido con el portafolio.
   Va en el <head> y sin defer a propósito: aplica el atributo antes del
   primer pintado para que no haya un destello claro al venir del sitio en
   oscuro. La clave de localStorage es la misma que usa index.html, así que
   la elección del visitante viaja entre el portafolio y los demos. */
(function () {
  try {
    var t = localStorage.getItem('theme');
    if (t) document.documentElement.setAttribute('data-theme', t);
  } catch (e) {}

  var SOL = '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.6v2.2M12 19.2v2.2M4.4 12H2.2M21.8 12h-2.2M6.3 6.3 4.8 4.8M19.2 19.2l-1.5-1.5M17.7 6.3l1.5-1.5M4.8 19.2l1.5-1.5"/>';
  var LUNA = '<path d="M20 13.4A8.2 8.2 0 0 1 10.6 4a8.4 8.4 0 1 0 9.4 9.4Z"/>';

  function actual() {
    var fijo = document.documentElement.getAttribute('data-theme');
    if (fijo) return fijo;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'tema-btn';
    btn.setAttribute('aria-label', 'Cambiar entre tema claro y oscuro');

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '1.9');
    svg.setAttribute('stroke-linecap', 'round');
    btn.appendChild(svg);

    function pintar() { svg.innerHTML = actual() === 'dark' ? SOL : LUNA; }
    pintar();

    btn.addEventListener('click', function () {
      var nuevo = actual() === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nuevo);
      try { localStorage.setItem('theme', nuevo); } catch (e) {}
      pintar();
    });

    document.body.appendChild(btn);
  });
})();
