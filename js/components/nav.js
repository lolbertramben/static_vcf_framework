GlobalApp.define('nav', el => {
  const links = el.querySelectorAll('a[data-action^="goto:"]');

  function updateActive(view){
    links.forEach(a => {
      const [, v] = a.dataset.action.split(':');
      a.classList.toggle('active', v === view);
    });
  }

  window.addEventListener('viewchange', e => updateActive(e.detail.view));
});