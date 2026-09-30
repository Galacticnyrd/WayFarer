(() => {
  const launcher = document.getElementById('tome-launcher');
  const overlay = document.getElementById('tome-overlay');
  const frame = document.getElementById('tome-frame');
  const closeButton = document.getElementById('tome-close');
  let previousFocus = null;
  let loaded = false;
  const tomePath = new URL('complete-mockups.html', location.href).pathname;

  function openTome(route) {
    previousFocus = document.activeElement;
    if (route || !loaded) {
      const url = route || new URL('complete-mockups.html', location.href);
      url.searchParams.set('embedded', '1');
      frame.src = url.href;
      loaded = true;
    }
    overlay.hidden = false;
    document.body.classList.add('tome-open');
    launcher.setAttribute('aria-expanded', 'true');
    closeButton.focus();
  }

  function closeTome() {
    if (overlay.hidden) return;
    overlay.hidden = true;
    document.body.classList.remove('tome-open');
    launcher.setAttribute('aria-expanded', 'false');
    (previousFocus?.isConnected ? previousFocus : launcher).focus();
  }

  launcher.setAttribute('aria-expanded', 'false');
  launcher.addEventListener('click', () => overlay.hidden ? openTome() : closeTome());
  closeButton.addEventListener('click', closeTome);
  overlay.querySelector('[data-close-tome]').addEventListener('click', closeTome);
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link) return;
    const demoChapter = {player:'people', boss:'bestiary', item:'relics', recipe:'blueprint'};
    const selectedDemo = document.querySelector('[data-demo][aria-pressed="true"]')?.dataset.demo;
    const url = link.id === 'demo-link'
      ? new URL('complete-mockups.html?chapter=' + (demoChapter[selectedDemo] || 'people'), location.href)
      : new URL(link.href, location.href);
    if (url.origin !== location.origin || url.pathname !== tomePath || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    openTome(url);
  });
  document.addEventListener('keydown', event => {
    if (overlay.hidden) return;
    if (event.key === 'Escape') { event.preventDefault(); closeTome(); }
    if (event.key === 'Tab' && document.activeElement === closeButton) {
      event.preventDefault();
      frame.focus();
    }
  });
  window.addEventListener('message', event => {
    if (event.origin === location.origin && event.source === frame.contentWindow && event.data === 'wayfarer:close-tome') closeTome();
  });
})();
