(() => {
  // Small, local-only interactions that explain the intended Tome controls.
  const bag = [
    {id:'leather', name:'Heavy Leather', amount:5, icon:'inv_misc_leatherscrap_07'},
    {id:'ore', name:'Copper Ore', amount:8, icon:'inv_ore_copper_01'},
    {id:'cloth', name:'Linen Cloth', amount:12, icon:'inv_fabric_linen_01'}
  ];
  const offer = {drafts:new Set(), published:new Map()};
  const blueprint = {item:null};
  const road = {next:3, rows:[
    {id:1, text:'Return to River Crossing', item:null, done:false, aside:false},
    {id:2, text:'Bring Heavy Leather for the bracers', item:'leather', done:false, aside:false}
  ]};
  const findItem = id => bag.find(item => item.id === id);
  const clean = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const icon = (name, className = 'game-inline-icon') => `<img class="${className}" src="assets/game-icons/${name}.jpg" alt="">`;
  const bagShelf = (attribute, verb) => `<div class="game-bag-head">${icon('inv_misc_bag_08')}<span>Backpack</span><small>3 items · select or drag</small></div><div class="game-bag-grid">${bag.map(item => `<button type="button" draggable="true" class="demo-bag-item" ${attribute}="${item.id}" aria-label="${verb} ${item.name}, ${item.amount} in bags" title="${item.name} · ${item.amount} in bags"><span class="game-item-frame">${icon(item.icon, 'game-item-icon')}<span class="game-item-count">${item.amount}</span></span><span class="game-item-name">${item.name}</span></button>`).join('')}${Array(5).fill('<span class="game-empty-slot" aria-hidden="true"></span>').join('')}</div>`;

  function mountOffer(root) {
    const inventory = root.querySelector('[data-offer-inventory]');
    if (!inventory) return;
    const picker = root.querySelector('[data-offer-picker]');
    picker.innerHTML = bag.map(item => `<option value="${item.id}">${item.name} · ${item.amount} in bags</option>`).join('');
    inventory.innerHTML = bagShelf('data-bag-item', 'Offer');
    const slot = root.querySelector('[data-offer-slot]');
    const status = root.querySelector('[data-offer-status]');
    const items = root.querySelector('[data-offer-items]');
    const tip = root.querySelector('[data-offer-tooltip]');
    const audience = root.querySelector('[data-offer-audience]');
    const expiry = root.querySelector('[data-offer-expiry]');
    const quantity = root.querySelector('[data-offer-quantity]');

    function update(message) {
      slot.classList.toggle('has-items', offer.published.size > 0);
      slot.textContent = `Drop to share · ${audience.value} · ${expiry.value} · ${quantity.checked ? 'exact amounts' : 'amounts hidden'}${offer.published.size ? ` · ${offer.published.size} live` : ''}`;
      slot.setAttribute('aria-label', slot.textContent + '. Press Enter to choose an item.');
      items.innerHTML = bag.filter(item => offer.drafts.has(item.id) || offer.published.has(item.id)).map(item => {
        const shared = offer.published.has(item.id);
        return `<div class="demo-offer-row"><span class="demo-item-link">${icon(item.icon)} ${item.name}</span><span class="demo-state ${shared ? 'shared' : ''}">${shared ? 'Shared' : 'Private draft'}</span>${shared ? '' : `<button type="button" data-offer-share="${item.id}" aria-label="Share ${item.name}">${icon('inv_misc_bag_08')} Share</button>`}<button type="button" data-offer-remove="${item.id}" aria-label="Remove ${item.name}">${icon('inv_misc_note_01')} Remove</button></div>`;
      }).join('');
      tip.innerHTML = bag.filter(item => offer.published.has(item.id)).map(item => {
        const terms = offer.published.get(item.id);
        return `${item.name} available${terms.quantity ? ` · ${item.amount} owned` : ''}<br>`;
      }).join('') || 'No shared offers yet.';
      status.textContent = message || (offer.published.size ? `${offer.published.size} live offer(s) · eligible peers may see them.` : offer.drafts.size ? `${offer.drafts.size} private draft item(s) · none shown to peers.` : 'No items offered.');
    }
    function add(id, privateDraft = false) {
      if (!findItem(id)) return;
      if (offer.published.has(id)) return update('That item is already shared. Remove it before changing its sharing choices.');
      if (privateDraft) {
        offer.drafts.add(id);
        return update(`${findItem(id).name} saved privately. It is absent from the peer tooltip.`);
      }
      offer.drafts.delete(id);
      offer.published.set(id, {audience:audience.value, expiry:expiry.value, quantity:quantity.checked});
      update(`${findItem(id).name} offered through ${audience.value} when eligible. It appears in the tooltip preview now.`);
    }
    inventory.addEventListener('dragstart', event => {
      const button = event.target.closest('[data-bag-item]');
      if (button) event.dataTransfer.setData('text/plain', button.dataset.bagItem);
    });
    slot.addEventListener('dragover', event => { event.preventDefault(); slot.classList.add('drag-over'); });
    slot.addEventListener('dragleave', () => slot.classList.remove('drag-over'));
    slot.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); picker.focus(); }
    });
    slot.addEventListener('drop', event => {
      event.preventDefault();
      slot.classList.remove('drag-over');
      add(event.dataTransfer.getData('text/plain'));
    });
    inventory.addEventListener('click', event => {
      const button = event.target.closest('[data-bag-item]');
      if (button) add(button.dataset.bagItem);
    });
    root.querySelector('[data-offer-add]').addEventListener('click', () => add(picker.value));
    root.querySelector('[data-offer-draft]').addEventListener('click', () => add(picker.value, true));
    root.querySelector('[data-offer-settings]').addEventListener('click', () => audience.focus());
    items.addEventListener('click', event => {
      const share = event.target.closest('[data-offer-share]');
      if (share) return add(share.dataset.offerShare);
      const button = event.target.closest('[data-offer-remove]');
      if (!button) return;
      offer.drafts.delete(button.dataset.offerRemove);
      offer.published.delete(button.dataset.offerRemove);
      update('Offer removed locally. Previously received peer copies expire after their short cache lifetime.');
    });
    for (const control of [audience, expiry, quantity]) control.addEventListener('change', () => {
      update('Sharing choices changed for future offers. Existing offers keep their original terms.');
    });
    root.querySelector('[data-offer-clear]').addEventListener('click', () => {
      offer.drafts.clear(); offer.published.clear();
      update('Local offers cleared. Remote copies may remain until their short cache expires.');
    });
    update();
  }

  function mountRoad(root) {
    const list = root.querySelector('[data-road-list]');
    if (!list) return;
    const text = root.querySelector('[data-road-text]');
    const picker = root.querySelector('[data-road-item]');
    const status = root.querySelector('[data-road-status]');
    picker.innerHTML = '<option value="">No item link</option>' + bag.map(item => `<option value="${item.id}">${item.name}</option>`).join('');
    function update(message) {
      list.innerHTML = road.rows.map(row => `<div class="demo-road-row ${row.done ? 'done' : ''} ${row.aside ? 'aside' : ''}" data-road-id="${row.id}"><label><input type="checkbox" data-road-check ${row.done ? 'checked' : ''}><span>${clean(row.text)}</span></label>${row.item ? `<button type="button" class="demo-item-link" data-road-inspect="${row.item}">${icon(findItem(row.item).icon)} ${findItem(row.item).name}</button>` : ''}<div><button type="button" data-road-edit>Edit</button><button type="button" data-road-aside>${row.aside ? 'Return' : 'Set aside'}</button></div></div>`).join('');
      status.textContent = message || 'Your intentions stay local. Check a line only when you decide it is done.';
    }
    root.querySelector('[data-road-add]').addEventListener('click', () => {
      const value = text.value.trim();
      if (!value) return update('Write one intention before adding it.');
      if (road.rows.filter(row => !row.done && !row.aside).length >= 5) return update('Keep the active road short: complete or set aside a line first.');
      road.rows.push({id:road.next++, text:value, item:picker.value || null, done:false, aside:false});
      text.value = ''; picker.value = '';
      update('Added to your private Road Ahead list.');
    });
    list.addEventListener('keydown', event => {
      if ((event.key === ' ' || event.key === 'Spacebar') && event.target.matches('[data-road-check]')) {
        event.preventDefault();
        const row = road.rows.find(item => item.id === Number(event.target.closest('[data-road-id]')?.dataset.roadId));
        if (!row) return;
        row.done = !row.done;
        event.target.checked = row.done;
        event.target.closest('.demo-road-row').classList.toggle('done', row.done);
        status.textContent = row.done ? 'Marked complete by you.' : 'Returned to active road.';
      }
    });
    list.addEventListener('change', event => {
      const row = road.rows.find(item => item.id === Number(event.target.closest('[data-road-id]')?.dataset.roadId));
      if (row && event.target.matches('[data-road-check]')) {
        row.done = event.target.checked;
        event.target.closest('.demo-road-row').classList.toggle('done', row.done);
        status.textContent = row.done ? 'Marked complete by you.' : 'Returned to active road.';
      }
    });
    list.addEventListener('click', event => {
      const row = road.rows.find(item => item.id === Number(event.target.closest('[data-road-id]')?.dataset.roadId));
      if (!row) return;
      if (event.target.matches('[data-road-inspect]')) { status.textContent = `Linked item: ${findItem(row.item).name}. This link does not claim current ownership.`; return; }
      if (event.target.matches('[data-road-aside]')) {
        row.aside = !row.aside;
        event.target.closest('.demo-road-row').classList.toggle('aside', row.aside);
        event.target.textContent = row.aside ? 'Return' : 'Set aside';
        status.textContent = row.aside ? 'Set aside without deleting.' : 'Returned to active road.';
      }
      if (event.target.matches('[data-road-edit]')) {
        const shell = event.target.closest('.demo-road-row');
        if (shell.querySelector('.demo-edit-controls')) return;
        shell.querySelector('label').insertAdjacentHTML('afterend', `<div class="demo-edit-controls"><input type="text" class="demo-inline-edit" value="${clean(row.text)}" maxlength="90" aria-label="Edit intention"><button type="button" data-road-save>Save</button></div>`);
        shell.querySelector('.demo-inline-edit').focus();
      }
      if (event.target.matches('[data-road-save]')) {
        const value = event.target.parentElement.querySelector('input').value.trim();
        if (!value) { status.textContent = 'Keep a short, meaningful line.'; return; }
        row.text = value;
        const shell = event.target.closest('.demo-road-row');
        shell.querySelector('label span').textContent = value;
        shell.querySelector('.demo-edit-controls').remove();
        shell.querySelector('[data-road-edit]').focus({preventScroll:true});
        status.textContent = 'Your line was edited locally.';
      }
    });
    update();
  }

  function mountBlueprint(root) {
    const shelf = root.querySelector('[data-link-bag]');
    if (!shelf) return;
    const slot = root.querySelector('[data-link-slot]');
    const picker = root.querySelector('[data-link-picker]');
    const status = root.querySelector('[data-link-status]');
    shelf.innerHTML = bagShelf('data-link-item', 'Link');
    picker.innerHTML = bag.map(item => `<option value="${item.id}">${item.name}</option>`).join('');
    function update(message) {
      slot.textContent = blueprint.item ? `Linked material · ${findItem(blueprint.item).name}` : 'Drop a material here';
      slot.classList.toggle('has-items', Boolean(blueprint.item));
      status.textContent = message || (blueprint.item ? `${findItem(blueprint.item).name} linked to this private Blueprint goal. Ownership is not guaranteed later.` : 'No material linked. This goal stays private.');
    }
    function link(id) {
      if (!findItem(id)) return;
      blueprint.item = id;
      update(`${findItem(id).name} linked to this private Blueprint goal. No Offer was shared.`);
    }
    shelf.addEventListener('dragstart', event => {
      const button = event.target.closest('[data-link-item]');
      if (button) event.dataTransfer.setData('text/plain', button.dataset.linkItem);
    });
    shelf.addEventListener('click', event => {
      const button = event.target.closest('[data-link-item]');
      if (button) link(button.dataset.linkItem);
    });
    slot.addEventListener('dragover', event => { event.preventDefault(); slot.classList.add('drag-over'); });
    slot.addEventListener('dragleave', () => slot.classList.remove('drag-over'));
    slot.addEventListener('drop', event => { event.preventDefault(); slot.classList.remove('drag-over'); link(event.dataTransfer.getData('text/plain')); });
    root.querySelector('[data-link-add]').addEventListener('click', () => link(picker.value));
    root.querySelector('[data-link-clear]').addEventListener('click', () => { blueprint.item = null; update('Material link removed. Your private goal remains.'); });
    update();
  }

  window.wayfarerInteractions = {mount(root) { mountOffer(root); mountRoad(root); mountBlueprint(root); }};
})();
