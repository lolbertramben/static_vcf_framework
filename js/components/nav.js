VCF.define('nav', el => {
  el.innerHTML = `
    <nav class="flex gap">
      <a href="#home" data-action="goto:home">Forside</a>
      <a href="#about" data-action="goto:about">Om os</a>
    </nav>
  `;

  const links = el.querySelectorAll('a[data-action^="goto:"]');
  function updateActive(view){
    links.forEach(a => {
      const [, v] = a.dataset.action.split(':');
      a.classList.toggle('active', v === view);
    });
  }

  window.addEventListener('viewchange', e => updateActive(e.detail.view));
});