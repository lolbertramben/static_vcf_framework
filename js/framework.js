// Vanilla Static View Framework (VCF)
window.VCF = (function(){
  const components = new Map();
  let currentView = null;

  function showView(name, pushState = true){
    document.querySelectorAll('[data-view]').forEach(v => {
      v.hidden = v.dataset.view !== name;
    });

    currentView = name;
    if(pushState) location.hash = name;
    window.dispatchEvent(new CustomEvent('viewchange', { detail: { view: name } }));
  }

  function initViews(){
    document.body.addEventListener('click', e => {
      const target = e.target.closest('[data-action^="goto:"]');
      if(!target) return;
      const [, viewName] = target.dataset.action.split(':');
      showView(viewName);
    });

    const initial = location.hash.replace('#', '') || document.querySelector('[data-view]')?.dataset.view;
    if(initial) showView(initial, false);

    window.addEventListener('hashchange', () => {
      const view = location.hash.replace('#', '');
      if(view) showView(view, false);
    });
  }

  function define(name, setupFn){
    components.set(name, setupFn);
  }

  function initComponents(root = document){
    root.querySelectorAll('[data-component]').forEach(el => {
      const name = el.dataset.component;
      const comp = components.get(name);
      if(typeof comp === 'function') comp(el);
    });
  }

  function initAll(){
    initViews();
    initComponents(document);
  }

  return { define, initAll, showView };
})();