VCF.define('counter', el => {
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