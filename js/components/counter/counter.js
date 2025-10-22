GlobalApp.define('counter', el => {
  // Styling can be included here if needed

  // if(!document.getElementById('counter-style')) {
  //   const link = document.createElement('link');
  //   link.id = 'counter-style';
  //   link.rel = 'stylesheet';
  //   link.href = '/components/counter/counterStyle.css';
  //   document.head.appendChild(link);
  // }

  const countEl = el.querySelector('[data-bind="count"]');
  const incBtn  = el.querySelector('[data-action="inc"]');
  const resetBtn = el.querySelector('[data-action="reset"]');

  if (!countEl) {
    console.warn('counter component forventer et element med [data-bind="count"]');
    return;
  }

  let count = parseInt(countEl.textContent, 10) || 0;

  function render() {
    countEl.textContent = String(count);
  }

  if (incBtn) {
    incBtn.addEventListener('click', () => {
      count += 1;
      render();
    });
  }
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      count = 0;
      render();
    });
  }

  render();
});