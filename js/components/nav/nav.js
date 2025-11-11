GlobalApp.define('nav', el => {
  // Styling can be included here if needed

  // if(!document.getElementById('nav-style')) {
  //   const link = document.createElement('link');
  //   link.id = 'nav-style';
  //   link.rel = 'stylesheet';
  //   link.href = './js/components/nav/navStyle.css';
  //   document.head.appendChild(link);
  // }

  const navLinks = el.querySelectorAll('a[data-action^="goto:"]');

  function updateActive(view){
    navLinks.forEach(a => {
      const [, v] = a.dataset.action.split(':');
      a.classList.toggle('active', v === view);
    });
  }

  function checkMedia(){
    if (GlobalApp.media.small.matches) {
      console.log('Small screen - mobile navigation');
      // Implement mobile-specific navigation behavior if needed
    } else {
      console.log('Large screen - desktop navigation');
      // Implement desktop-specific navigation behavior if needed
    }
  }

  // Initial check
  checkMedia();

  window.addEventListener('viewchange', e => updateActive(e.detail.view));
  window.addEventListener('resize', checkMedia);
});