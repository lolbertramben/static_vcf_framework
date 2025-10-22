GlobalApp.define('nav', el => {
  // Styling can be included here if needed

  // if(!document.getElementById('nav-style')) {
  //   const link = document.createElement('link');
  //   link.id = 'nav-style';
  //   link.rel = 'stylesheet';
  //   link.href = '/components/nav/navStyle.css';
  //   document.head.appendChild(link);
  // }

  const navLinks = el.querySelectorAll('a[data-action^="goto:"]');

  function updateActive(view){
    navLinks.forEach(a => {
      const [, v] = a.dataset.action.split(':');
      a.classList.toggle('active', v === view);
    });
  }

  window.addEventListener('viewchange', e => updateActive(e.detail.view));
});