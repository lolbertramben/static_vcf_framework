// Vanilla Static View Framework
window.GlobalApp = (function(){
  const components = new Map();
  let currentView = null;

  // Global Media Query Breakpoints
  const media = {
    small: window.matchMedia('(max-width: 599.5px)'),
    large: window.matchMedia('(min-width: 600px)'),
  };

  // Husk seneste state
  let lastState = {
    small: media.small.matches,
    large: media.large.matches,
  };
  
  // Opdatering + check om noget ændrer sig
  let mediaInitialized = false;
  function refreshMediaState() {
    let changed = false;
  
    for (const key in media) {
      const now = media[key].matches;
      if (now !== lastState[key]) {
        lastState[key] = now;
        changed = true;
      }
    }

    if (changed || !mediaInitialized) {
      mediaInitialized = true;
      window.dispatchEvent(new Event('mediachange'));
    }
  }
  
  // Lyt for ændringer
  for (const key in media) {
    media[key].addEventListener('change', refreshMediaState);
    //console.log("Listening to media query changes for:", key);
  }
  
  // Initial run (trigger én gang)
  refreshMediaState();

  // Show a view by name, hide others, and update URL hash if pushState is true
  function showView(name, pushState = true){
    const views = document.querySelectorAll('[data-view]')
    const targetView = document.querySelector(`[data-view="${name}"]`);

    // Hvis view ikke findes, fallback til 404
    if(!targetView) {
      console.warn(`\nPage not found "${name}".`);
      name = '404';
    }

    // Hide all views except the one to show
    views.forEach(v => {
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
  function initComponents(root = document) {
    root.querySelectorAll('[data-component]').forEach(el => {
      const names = el.dataset.component.split(',').map(n => n.trim());
      names.forEach(name => {
        const comp = components.get(name);
        if (typeof comp === 'function') comp(el);
      });
    });
  }

  // Initialize views and components on the entire document
  function initAll(){
    initViews();
    initComponents(document);
  }

  return { define, initAll, showView, media };
})();