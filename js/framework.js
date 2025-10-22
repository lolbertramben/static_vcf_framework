// Vanilla Static View Framework
window.GlobalApp = (function(){
  const components = new Map();
  let currentView = null;

  // Show a view by name, hide others, and update URL hash if pushState is true
  function showView(name, pushState = true){
    // Hide all views except the one to show
    document.querySelectorAll('[data-view]').forEach(v => {
      v.hidden = v.dataset.view !== name;
    });

    // Trigger view change and update hash
    //if(currentView === name) return;
    currentView = name;
    if(pushState) location.hash = name;
    window.dispatchEvent(new CustomEvent('viewchange', { detail: { view: name } }));
  }

  // If onCLick on an element with data-action="goto:VIEWNAME", show that view
  // Also handle initial view based on hash or data-view attribute
  // And listen to hashchange events to switch views
  function initViews(){
    // Delegate click events for view navigation -> Dynamic navigation
    document.body.addEventListener('click', e => {
      const target = e.target.closest('[data-action^="goto:"]');
      if(!target) return;
      const [, viewName] = target.dataset.action.split(':');
      showView(viewName);
    });

    // Show initial view based on URL hash or data-view attribute
    const initial = location.hash.replace('#', '') || document.querySelector('[data-view]')?.dataset.view;
    if(initial) showView(initial, false);

    // Listen to hashchange events for back/forward navigation
    window.addEventListener('hashchange', () => {
      const view = location.hash.replace('#', '');
      if(view && currentView !== view) showView(view, false);
    });
  }

  // Define a component with a setup function by adding it to the components map
  function define(name, setupFn){
    components.set(name, setupFn);
  }

  // Initialize all components within the given root element (default: document)
  // by finding elements with data-component and calling their setup functions from the components map
  function initComponents(root = document){
    root.querySelectorAll('[data-component]').forEach(el => {
      const name = el.dataset.component;
      const comp = components.get(name);
      if(typeof comp === 'function') comp(el);
    });
  }

  // Initialize views and components on the entire document
  function initAll(){
    initViews();
    initComponents(document);
  }

  return { define, initAll, showView };
})();