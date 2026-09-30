(() => {
  const rail = document.getElementById('atlas-rail');
  const tabs = document.getElementById('local-tabs');
  const page = document.getElementById('atlas-page');
  const content = document.getElementById('page-content');
  const backStack = [];
  const railGroups = new Map();
  let current = {chapter: 'index', tab: 0};
  let keyboardMode = false;
  let gamepadFocus = null;
  const focusSelector = 'button:not([disabled]), a[href], select, input:not([disabled]), [tabindex="0"]';

  function setGamepadFocus(element) {
    if (!element || !element.getClientRects().length) return;
    gamepadFocus?.classList.remove('gamepad-focus');
    gamepadFocus = element;
    gamepadFocus.classList.add('gamepad-focus');
    gamepadFocus.focus({preventScroll:true});
    gamepadFocus.scrollIntoView({block:'nearest', inline:'nearest'});
  }
  function visibleFocusables() {
    return [...document.querySelectorAll(`#atlas ${focusSelector}`)].filter(element => element.getClientRects().length && !element.closest('[hidden]'));
  }
  function moveFocus(direction) {
    const choices = visibleFocusables();
    const origin = choices.includes(gamepadFocus) ? gamepadFocus : choices.includes(document.activeElement) ? document.activeElement : choices[0];
    if (!origin) return;
    const box = origin.getBoundingClientRect();
    const x = box.left + box.width / 2;
    const y = box.top + box.height / 2;
    let winner = null;
    let best = Infinity;
    for (const candidate of choices) {
      if (candidate === origin) continue;
      const rect = candidate.getBoundingClientRect();
      const dx = rect.left + rect.width / 2 - x;
      const dy = rect.top + rect.height / 2 - y;
      const primary = direction === 'left' ? -dx : direction === 'right' ? dx : direction === 'up' ? -dy : dy;
      if (primary <= 6) continue;
      const secondary = direction === 'left' || direction === 'right' ? Math.abs(dy) : Math.abs(dx);
      const score = primary + secondary * 2.4;
      if (score < best) { best = score; winner = candidate; }
    }
    setGamepadFocus(winner || origin);
  }
  function turnPage(step) {
    const length = ATLAS_BY_ID[current.chapter].tabs.length;
    if (length > 1) render({chapter: current.chapter, tab: (current.tab + step + length) % length});
  }
  function changeBookmark(step) {
    const groups = ATLAS_GROUPS.filter(group => group.id !== 'system');
    const chapter = ATLAS_BY_ID[current.chapter];
    const at = groups.findIndex(group => group.id === chapter.group);
    const next = groups[(at + step + groups.length) % groups.length];
    render({chapter: 'group-' + next.id, tab: 0});
  }

  function icon(group) {
    return ATLAS_GROUPS.find(item => item.id === group)?.icon || 'journal';
  }
  function validRoute(chapter, tab) {
    const entry = ATLAS_BY_ID[chapter] || ATLAS_BY_ID.index;
    const index = Number.isInteger(tab) && tab >= 0 && tab < entry.tabs.length ? tab : 0;
    return {chapter: entry.id, tab: index};
  }
  function render(route, record = true) {
    const next = validRoute(route.chapter, route.tab);
    if (record && (current.chapter !== next.chapter || current.tab !== next.tab)) backStack.push({...current});
    current = next;
    const entry = ATLAS_BY_ID[current.chapter];
    const active = entry.tabs[current.tab];
    const group = ATLAS_GROUPS.find(item => item.id === entry.group);
    document.getElementById('chapter-icon').src = `assets/tome-icons/${icon(entry.group)}.png`;
    document.getElementById('chapter-group').textContent = entry.id === 'index' ? 'The Enchanted Tome' : group?.label || 'The Tome';
    document.getElementById('chapter-title').textContent = entry.title;
    document.getElementById('chapter-subtitle').textContent = entry.subtitle;
    document.getElementById('route-label').textContent = `${entry.title} / ${active.label}`;
    const mode = entry.id === 'index' && current.tab === 0 ? 'COVER' :
      entry.id === 'crossroads' && current.tab >= 2 ? 'SHARE' :
      ['road','pack','blueprint','crossroads','settings','diagnostics'].includes(entry.id) ? 'DO' :
      ['signals','tooltips'].includes(entry.id) ? 'SHARE' : 'READ';
    document.getElementById('page-mode').textContent = mode;
    page.dataset.mode = mode.toLowerCase();
    tabs.innerHTML = '';
    entry.tabs.forEach((tab, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.role = 'tab';
      button.textContent = tab.label;
      button.setAttribute('aria-selected', String(index === current.tab));
      button.addEventListener('click', () => render({chapter: entry.id, tab: index}));
      tabs.append(button);
    });
    content.innerHTML = `<p class="page-intro">${active.intro}</p><div class="mock-grid">${active.cards.map((card, index) => `<section class="mock-card ${index === 0 ? 'lead-card' : ''} ${card.style}"><h3>${card.title}</h3>${card.body}</section>`).join('')}</div>${entry.note ? `<p class="page-footnote">${entry.note}</p>` : ''}`;
    if (entry.id === 'crossroads' && current.tab === 3) {
      const cards = content.querySelectorAll('.mock-card');
      const offerCard = cards[1];
      const choicesCard = cards[2];
      offerCard.querySelector('[data-offer-slot]').before(choicesCard.querySelector('.demo-share-controls'));
      offerCard.append(choicesCard.querySelector('.mock-actions'), choicesCard.querySelector('p'));
      choicesCard.remove();
    }
    window.wayfarerInteractions?.mount(content);
    content.querySelectorAll('button.demo-button, button.mock-link, button.demo-choice-link').forEach(button => {
      const name = actionIcon(button.textContent);
      button.insertAdjacentHTML('afterbegin', `<img class="game-action-icon" src="assets/game-icons/${name}.jpg" alt="">`);
    });
    rail.querySelectorAll('[data-chapter]').forEach(button => button.setAttribute('aria-current', button.dataset.chapter === entry.id ? 'page' : 'false'));
    const openGroup = entry.id === 'index' ? null : entry.group;
    for (const [groupId, nodes] of railGroups) {
      const expanded = openGroup === groupId;
      nodes.button.setAttribute('aria-expanded', String(expanded));
      nodes.button.setAttribute('aria-current', entry.id === 'group-' + groupId ? 'page' : 'false');
      nodes.list.hidden = !expanded;
    }
    page.scrollTop = 0;
    const url = new URL(location.href);
    url.searchParams.set('chapter', entry.id);
    url.searchParams.set('page', String(current.tab + 1));
    history.replaceState(null, '', url);
    document.title = `Wayfarer mockups — ${entry.title} · ${active.label}`;
    if (keyboardMode) setGamepadFocus(tabs.querySelector('[aria-selected="true"]'));
  }
  const tomeButton = document.createElement('button');
  tomeButton.className = 'rail-link tome-link';
  tomeButton.type = 'button';
  tomeButton.dataset.chapter = 'index';
  tomeButton.innerHTML = '<img class="rail-icon" src="assets/wayfarer-emblem.png" alt=""><span>The Forever Tome</span>';
  tomeButton.addEventListener('click', () => render({chapter:'index', tab:0}));
  rail.append(tomeButton);
  for (const group of ATLAS_GROUPS) {
    const heading = document.createElement('button');
    heading.className = 'rail-group-button' + (group.id === 'system' ? ' utility' : '');
    heading.type = 'button';
    heading.dataset.group = group.id;
    heading.innerHTML = `<img class="rail-icon" src="assets/tome-icons/${group.icon}.png" alt=""><span>${group.id === 'system' ? 'Systems & Help' : group.label}</span><b aria-hidden="true">›</b>`;
    heading.addEventListener('click', () => render({chapter:'group-' + group.id, tab:0}));
    rail.append(heading);
    const list = document.createElement('div');
    list.className = 'rail-sub';
    list.hidden = true;
    for (const chapter of ATLAS_CHAPTERS.filter(item => item.group === group.id && item.id !== 'index')) {
      if (chapter.id.startsWith('group-')) continue;
      const button = document.createElement('button');
      button.className = 'rail-link';
      button.type = 'button';
      button.dataset.chapter = chapter.id;
      button.innerHTML = `<img class="rail-icon" src="assets/tome-icons/${group.icon}.png" alt=""><span>${chapter.title}</span>`;
      button.addEventListener('click', () => render({chapter: chapter.id, tab: 0}));
      list.append(button);
    }
    rail.append(list);
    railGroups.set(group.id, {button:heading, list});
    if (group.id === 'camp') rail.append(Object.assign(document.createElement('div'), {className:'rail-separator'}));
  }
  content.addEventListener('click', event => {
    const target = event.target.closest('[data-atlas-target]');
    if (target) render({chapter:target.dataset.atlasTarget, tab:0});
  });
  document.getElementById('atlas-back').addEventListener('click', () => render(backStack.pop() || {chapter:'index', tab:1}, false));
  document.getElementById('atlas-index').addEventListener('click', () => render({chapter:'index', tab:1}));
  document.getElementById('atlas-cover').addEventListener('click', () => render({chapter:'index', tab:0}));
  document.getElementById('atlas').addEventListener('pointerdown', event => {
    const target = event.target.closest(focusSelector);
    if (target) { keyboardMode = false; gamepadFocus?.classList.remove('gamepad-focus'); gamepadFocus = null; }
  });
  document.addEventListener('keydown', event => {
    const withinAtlas = document.getElementById('atlas').contains(document.activeElement) || document.activeElement === document.body;
    if (!withinAtlas || event.altKey || event.ctrlKey || event.metaKey) return;
    const editing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
    if (editing && !['Escape'].includes(event.key)) return;
    const direction = {ArrowUp:'up', ArrowDown:'down', ArrowLeft:'left', ArrowRight:'right'}[event.key];
    if (direction) { event.preventDefault(); keyboardMode = true; moveFocus(direction); return; }
    if (event.key === 'PageDown' || event.key === 'PageUp') { event.preventDefault(); keyboardMode = true; turnPage(event.key === 'PageDown' ? 1 : -1); return; }
    if (event.key.toLowerCase() === 'q' || event.key.toLowerCase() === 'e') { event.preventDefault(); keyboardMode = true; changeBookmark(event.key.toLowerCase() === 'e' ? 1 : -1); return; }
    if (event.key === 'Escape' || event.key === 'Backspace') { event.preventDefault(); if (event.key === 'Escape' && document.body.classList.contains('embedded') && current.chapter === 'index' && current.tab === 0 && backStack.length === 0) { parent.postMessage('wayfarer:close-tome', location.origin); return; } keyboardMode = true; render(backStack.pop() || {chapter:'index', tab:1}, false); return; }
    if (event.key.toLowerCase() === 'x') { event.preventDefault(); keyboardMode = true; render({chapter:'index', tab:1}); return; }
    if (event.key.toLowerCase() === 'y') { event.preventDefault(); keyboardMode = true; render({chapter:'index', tab:0}); return; }
    if (event.key === 'Enter' && gamepadFocus && document.activeElement !== gamepadFocus) { event.preventDefault(); gamepadFocus.click(); }
  });
  const query = new URLSearchParams(location.search);
  if (query.has('embedded')) document.body.classList.add('embedded');
  if (query.has('capture')) document.body.classList.add('capture');
  render({chapter:query.get('chapter') || 'index', tab:Number(query.get('page') || 1) - 1}, false);
})();
