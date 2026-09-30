/* Small, code-native chapter ribbons for the site's sample toasts. */
(() => {
  const types = {
    discovery: ['Discovery', '<circle cx="12" cy="12" r="7"/><path d="m12 3 1.6 7.4L21 12l-7.4 1.6L12 21l-1.6-7.4L3 12l7.4-1.6z"/>'],
    road: ['Shared road', '<path d="M4 20c2-7 6-7 8-11 2 4 6 4 8 11M12 9V3M4 20h16"/><circle cx="12" cy="3" r="1"/>'],
    memory: ['Memory', '<circle cx="9" cy="12" r="5"/><circle cx="15" cy="12" r="5"/><path d="M7 4V2m10 20v-2"/>'],
    craft: ['Craft', '<path d="m5 19 11-11m-3-3 6 6m-7-7 8 8M3 21l5-1-4-4z"/>'],
    nearby: ['Nearby', '<circle cx="12" cy="12" r="2"/><path d="M6.3 6.3a8 8 0 0 0 0 11.4m11.4-11.4a8 8 0 0 1 0 11.4M3.5 3.5a12 12 0 0 0 0 17m17-17a12 12 0 0 1 0 17"/>'],
    rival: ['Rival', '<path d="M4 4 19 19m1-15L5 19M3 17l4 4m10 0 4-4M3 3l4 1-3 4m17-5-4 1 3 4"/>']
  };
  const storyKinds = {dungeon: 'road', loan: 'memory', materials: 'craft', alignment: 'nearby', pvp: 'rival'};
  function decorate() {
    document.querySelectorAll('[data-toast-kind]:not([data-ornamented]), .connection-toast:not([data-ornamented]), .world .toast:not([data-ornamented])').forEach(toast => {
      if (!toast.dataset.toastKind) {
        const story = toast.closest('.connections-demo')?.querySelector('[data-story][aria-pressed="true"]')?.dataset.story;
        toast.dataset.toastKind = storyKinds[story] || 'discovery';
      }
      const [label, paths] = types[toast.dataset.toastKind] || types.discovery;
      const ribbon = document.createElement('div');
      ribbon.className = 'toast-corner';
      ribbon.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${paths}</svg><span>${label}</span>`;
      toast.prepend(ribbon);
      toast.dataset.ornamented = 'true';
    });
  }
  decorate();
  new MutationObserver(decorate).observe(document.body, {childList: true, subtree: true});
})();
