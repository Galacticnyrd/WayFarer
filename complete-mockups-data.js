/* Reference-led, fictional UI records. Product contracts: Launch Hardening + Tome. */
const M = (title, body, style = '') => ({title, body, style});
const T = (label, intro, ...cards) => ({label, intro, cards});
const C = (id, group, title, subtitle, tabs, note = '') => ({id, group, title, subtitle, tabs, note});
const L = (...items) => '<ul class="mock-list">' + items.map(item => '<li>' + item + '</li>').join('') + '</ul>';
const actionIcon = label => {
  if (/bag|pack|offer|item|relic|material|trade/i.test(label)) return 'inv_misc_bag_08';
  if (/map|place|trail|road|world|route|discover/i.test(label)) return 'inv_misc_map_01';
  if (/craft|blueprint|recipe|make|setting|configure/i.test(label)) return 'inv_misc_gear_01';
  if (/write|edit|note|remember|memory|story|chronicle|record|page|reflect/i.test(label)) return 'inv_misc_note_01';
  if (/scroll|narrat|lore|rumor|read/i.test(label)) return 'inv_scroll_03';
  return 'inv_misc_book_09';
};
const A = (...labels) => '<div class="mock-actions">' + labels.map((label, i) => '<span class="mock-action' + (i ? ' light' : '') + '"><img class="game-action-icon" src="assets/game-icons/' + actionIcon(label) + '.jpg" alt="">' + label + '</span>').join('') + '</div>';
const tag = (...labels) => labels.map(label => '<span class="mock-tag">' + label + '</span>').join('');
const picture = (name, alt) => '<img class="mock-art" src="assets/comic/' + name + '.png" alt="' + alt + '">';
const tip = (name, native, label, lines, kind = '') => '<div class="atlas-tip ' + kind + '"><div class="atlas-tip-name">' + name + '</div><div class="atlas-tip-native">' + native.join('<br>') + '</div><div class="atlas-tip-label">WAYFARER · ' + label + '</div><div class="atlas-tip-lines">' + lines.join('<br>') + '</div><div class="atlas-tip-hint">Open in Forever Tome →</div></div>';
const toast = (kind, title, body) => '<div class="atlas-toast"><span>' + kind + '</span><strong>' + title + '</strong><p>' + body + '</p></div>';
const setting = (label, value) => '<div class="atlas-setting"><span>' + label + '</span><b>' + value + '</b></div>';

const ATLAS_GROUPS = [
  {id:'story', label:'Story', icon:'journal'},
  {id:'people', label:'People', icon:'people'},
  {id:'world', label:'World', icon:'world'},
  {id:'journey', label:'Journey & Craft', icon:'journey'},
  {id:'camp', label:'Camp & Fire', icon:'camp'},
  {id:'system', label:'Shared systems', icon:'journal'}
];

const ATLAS_CHAPTERS = [
  C('index','system','The Forever Tome','A single book for a life lived in Azeroth.',[
    T('Cover','Your story lives on. Return to the places, people and choices that made the journey yours.',
      M('The Forever Tome','<div class="cover-emblem"><img src="assets/wayfarer-emblem.png" alt="Wayfarer compass emblem"><p>PLACES · PEOPLE · STORIES THAT LAST.</p></div>'+A('Open Tome','Action bar shortcut'),'highlight'),
      M('One book, many roads','The Tome opens from a bindable action. A valid last page can resume directly; Index and five bookmarks always remain reachable.'),
      M('Your story stays yours','Private memories stay local. Sharing begins only when you explicitly choose a structured Traveler Card line.')),
    T('Contents','Five bookmarks lead to the complete Index. The Tome resumes a useful page when you return.',
      M('The five bookmarks',L('<b>Story</b><span>Chronicle · Born Days · Scrapbook · Relics · Fallen</span>','<b>People</b><span>People · Rivals · Crossroads</span>','<b>World</b><span>Discovery & Lore · Landmark Archive · Trailmarks · Rumor · Bestiary</span>','<b>Journey & Craft</b><span>Blueprint · Legacy Loom · Pack · Road Ahead</span>','<b>Camp & Fire</b><span>Campwright · Fireside</span>'),'highlight'),
      M('A route, not a stack of windows','Open a chapter, follow a related memory, and use Back to return to the prior selection and reading position. A true spread appears only when two facing pages tell one story.'+A('Open last useful page','Help','Settings')),
      M('First opening','A short introduction explains local memory, deliberate sharing, and quiet in-world prompts. You can browse or write immediately; there is no forced tour.'),
      M('When records are absent','Every chapter has a truthful empty state and one useful first action. Unknown information stays unknown; the Tome never fills a page with invented sample history.')),
    T('Navigation','The cover, Index, group bookmarks, section tabs, deep links and Back all share one history.',
      M('Example path','People → Ari Vale → River Crossing memory → Scrapbook page → Back → River Crossing memory → Back → Ari Vale.'),
      M('Keyboard, mouse and controller','Every primary action has a focus path. There are no hover-only steps. Narrow screens linearize spreads without losing their reading order.'),
      M('Motion and sound','Cover, page and chapter transitions are brief decoration. Reduced motion uses instant changes. Page sounds are separate from narration volume.')),
    T('Read or do?','The Tome should always show whether a page is remembering, asking for a choice, or preparing something to share.',
      M('Reading page',tag('READ')+'<p>Chronicle and Lore have generous text, a source label and named links. There are no decorative controls that look like editable fields.</p>','highlight'),
      M('Working page',tag('DO')+'<p>Road Ahead uses real checkboxes and Add / Edit / Complete actions beside each line. Pack and Blueprint place their working controls beside the preparation they change.</p>'),
      M('Sharing page',tag('SHARE')+'<p>Crossroads makes the audience and expiry visible before an item reaches the shared Offer slot. Dropping there shares it immediately; a separate private draft stays local. Shared lines have Clear controls.</p>'),
      M('One visual grammar','Pencil = your writing. Checkbox = a local action. Linked item = inspectable record. Gold seal = deliberately shared. Every cue also has a text label and a controller focus state.'))
  ],'The current development build already has a modular Tome shell and some authored Road Ahead and Chronicle flow; these mockups cover the intended launch experience.'),

  C('chronicle','story','Chronicle','A readable history of your character, selected for meaning.',[
    T('Life chapters','The Chronicle chooses significant eras and preserved moments, not every event.',
      M('A life in chapters',L('<b>The first road</b><span>Beginning and earliest trustworthy memory</span>','<b>Growing into the world</b><span>Significant level and place eras</span>','<b>A change of calling</b><span>Class, specialization, role and profession eras when supported</span>','<b>People beside you</b><span>Meaningful companions, dungeons and shared journeys</span>'),'highlight'),
      M('Memory threads','A meaningful chapter may link a Relic, Scrapbook page, Born Day, profession milestone, Bestiary victory, Trailmark or unfinished Road Ahead intention. The linked owners keep their own records.'),
      M('A quiet opening',picture('elwynn-camp','Comic illustration of a night elf, paladin and dwarf around a campfire')+'<p>Selected life eras can open as two coordinated pages; ordinary memories remain easy to read in one page.</p>')),
    T('Memory detail','The Tome tells what it knows, and leaves your interpretation to you.',
      M('The night at the crossing',tag('Player preserved','Place known','Time approximate')+'<p>River Crossing · after the storm. Ari, Thorin and I stopped long enough to make a fire.</p>'+A('Edit my words','Open people','Open place'),'highlight'),
      M('Truth and provenance','A witnessed place, a player-authored note, and an inferred link are labeled differently. Unsupported motives, friendships or exact dates are never asserted.'),
      M('Return here','The Tome can link back to the selected memory from a person, place, Scrapbook page or Relic and restore the prior reading position.'))
  ]),

  C('born','story','Born Days','Your beginning, held with the certainty it deserves.',[
    T('Beginning','A ceremonial page shows when this character became known to the Tome.',
      M('Your first page',tag('FIRST REMEMBERED')+'<p>The Tome first remembers you beneath the boughs of Elwynn.</p><p><strong>First remembered</strong> is not the same as character creation.</p>'+A('Open early memories'),'highlight'),
      M('Three honest origins',L('<b>Witnessed beginning</b><span>Creation was reliably observed</span>','<b>First remembered</b><span>Only the earliest Wayfarer record is known</span>','<b>Player recorded</b><span>You entered a date yourself</span>')),
      M('An editable truth','When the date is player recorded, its source stays visible. The Tome does not silently upgrade a first memory to a creation date.')),
    T('Anniversaries','A restrained anniversary cue invites reflection without inventing a history.',
      M('A remembered day','“Another turning of the seasons since the first page I can keep.”'+A('Reflect on this year','Open Chronicle'),'highlight'),
      M('Quiet controls','Anniversary whispers use the shared attention budget and can be turned off. Reopening Born Days never forces narration.'))
  ]),

  C('scrapbook','story','Scrapbook','Give a chosen memory a page worth returning to.',[
    T('Album','The album shows composed keepsakes, not an automatically captured photo feed.',
      M('A fire worth remembering',picture('elwynn-camp','Sample illustrated memory of a camp in Elwynn')+'<p>“For a little while, the road could wait.”</p>'+A('Open page'),'highlight'),
      M('Your pages',L('<b>A fire worth remembering</b><span>Camp · linked people, Relic and Trailmark</span>','<b>The road after rain</b><span>Journey · written memory</span>')+A('Create a page')),
      M('A photo is optional','Your words and memory remain even if a local image is missing or photo support is unavailable. Only visible pages load their media.')),
    T('Create a page','A deliberate eight-template flow keeps the creative choice yours.',
      M('The five steps',L('<b>1 · Choose a memory</b><span>Select a preserved moment</span>','<b>2 · Choose a layout</b><span>Eight page templates, including text-first options</span>','<b>3 · Write</b><span>Title and your own note</span>','<b>4 · Add optional keepsake or media</b><span>Link a chosen bag item; local photo and accents only when supported</span>','<b>5 · Preview and save</b><span>Return to the editable page</span>'),'highlight'),
      M('The layout shelf',tag('01','02','03','04','05','06','07','08')+'<p>These are layout choices, not eight different memory stores. Photo capture and exact image association still require client proof.</p>'),
      M('What the page links','People, place, Relics and Trailmarks are typed links back to their owners. A chosen keepsake can be linked from supported bags in Edit mode; the link stays local. Editing controls stay out of normal reading.'))
  ]),

  C('relics','story','Relics','The life of an item you chose to remember.',[
    T('Keepsake shelf','Only meaningful possessions you preserve or promote become Relics.',
      M('Remembered belongings',L('<b>Balanced Quarterstaff</b><span>First remembered on the road</span>','<b>A weathered cloak</b><span>Preserved by choice</span>')+A('Remember from bags'),'highlight'),
      M('This is not an inventory log','The shelf is a curated set of Keepsakes and significant possessions. Unknown acquisition, loss or item-instance identity is shown as unknown rather than a guessed story.'),
      M('Useful ways to browse','By chosen journey, supported origin or remembered era; search known preserved Relics when the shelf grows.')),
    T('Item biography','The object becomes a thread through time, with provenance visible.',
      M('Balanced Quarterstaff',tag('Relic','First remembered · date known')+'<p>Carried through four preserved Chronicle chapters.</p><p>Your note: “I kept it longer than I expected.”</p>'+A('Open linked memory','Edit note'),'highlight'),
      M('Known history',L('<b>Identity</b><span>Exact item instance when supported</span>','<b>Origin</b><span>Proven, player confirmed, or first remembered</span>','<b>First/last equipped</b><span>Only when reliably observed</span>','<b>Carrying eras</b><span>Broad periods, not every equip event</span>','<b>Ending</b><span>Unknown unless reliably witnessed</span>')),
      M('A learned drop is separate','Bestiary can know a creature dropped an item without claiming you owned that specific instance. The Relic page only concerns an item you deliberately preserved.'))
  ]),

  C('fallen','story','Chronicle of the Fallen','A supported Hardcore life receives a quiet final page.',[
    T('Memorial','The memorial joins beginning, journeys, people and ending without scoring death.',
      M('A life remembered',picture('elwynn-camp','Quiet sample camp memory')+'<p>Beginning · a chosen road · those who traveled beside you · final known chapter</p>'+A('Read Chronicle'),'highlight'),
      M('No invented obituary','The Tome can preserve memories and your words. It cannot invent a cause, heroic intent, final conversation or exact killer.'),
      M('A familiar reading path','The same Index, Back, links, focus and spread grammar as Chronicle remain available.')),
    T('Capability state','An honest gate prevents false memorials.',
      M('When Hardcore status is unverified','This chapter explains that reliable ruleset and death evidence are required. It stays inactive until both are proven in the live client. Existing memories remain safe.','highlight'),
      M('If support later arrives','A supported beginning and ending can be joined to already preserved Chronicle, Scrapbook, People and Relic records.'))
  ]),

  C('people','people','People','Remember why a name mattered, then notice a reason to reconnect.',[
    T('Remembered people','Meaningful history and accepted shared facts, not a proximity census.',
      M('Names with a story',L('<b>Ari Vale</b><span>Companion · first remembered at River Crossing</span>','<b>Thorin Emberhand</b><span>A camp and a shared road</span>','<b>Selene Moonbough</b><span>One preserved journey</span>')+A('Open Ari'),'highlight'),
      M('Useful filters','Familiar, Shared Memories, Open Promises and Place can narrow known people. Native Contacts still owns online status, friends and ordinary contact actions.'),
      M('A new connection','A Signal match alone does not create People history. An independently proven meaningful journey or deliberately saved memory may do so.')),
    T('Person page','A person-owned view gathers real memories and your private interpretation.',
      M('Ari Vale',tag('Friend · your words')+'<p>First trustworthy memory: River Crossing. Last preserved memory: Emberlight Ridge. Three selected shared moments.</p>'+A('Open history','Open a memory'),'highlight'),
      M('Your private note','“Curious, steady, hopeful.” This text stays in your Tome. A tooltip may show only that a note exists if you opt in; it never sends the note to peers.'),
      M('Shared facts, separate stories','An accepted event anchor may be shared by both players; each keeps private prose, photos and interpretation. Places, keepsakes and Chronicle links return to their owning chapter.'),
      M('Introductions & Witnesses','A supported witness link can attach someone to a meaningful event. A claim about who introduced whom usually needs acknowledgment; simple co-presence never proves social meaning.')),
    T('Promises & Favors','Track an acknowledged human promise without turning friendship into a debt score.',
      M('A promise to return',L('<b>Find the stargazer’s lens</b><span>Ari acknowledged · open</span>','<b>Bring the leatherworking tool</b><span>Player reminder · local only</span>')+A('Acknowledge proposal','Mark settled'),'highlight'),
      M('Consent and correction','A proposed shared fact needs each person’s deliberate acceptance. A one-sided reminder stays local. Declined revisions leave the last accepted state unchanged.'),
      M('Four kinds, no score','Loan, Promise, Gift and Favor can move through proposed, confirmed, partial, fulfilled, cancelled or forgiven states where appropriate. A gift is not debt; an amount is player declared until trade evidence is proven.'),
      M('Reunion cue','After enough time, a rare Memory Whisper may say a familiar name has returned. It follows quiet settings and cannot disclose their private notes.'))
  ]),

  C('rivals','people','Rivals','Remember a past opponent without advising your next fight.',[
    T('Remembered rivals','An adversary belongs here only after a supported past clash or chosen memory.',
      M('Gorhazak',tag('Old adversary','Sample record')+'<p>First remembered: Ashen Road. Last remembered: the moonlit crossing.</p><p>Open-world clashes and battleground memories stay separate.</p>'+A('Open rivalry history'),'highlight'),
      M('An honest count','Credited defeats, deaths and historical outcomes appear only when attribution is reliable. Unknown is not zero. The Tome does not calculate a build recommendation or public ranking.'),
      M('A private recollection','You may write what that rivalry meant to you and link a chosen Scrapbook page. Your note never becomes enemy-facing data.')),
    T('Past results','Detailed history waits until combat is over.',
      M('After the fight',L('<b>First and latest remembered clash</b><span>Place and time when supported</span>','<b>Open-world and battleground results</b><span>Credited categories, not a guessed kill log</span>','<b>Your own past role or spec</b><span>Historical context only</span>'),'highlight'),
      M('During combat','At most a short recognition cue such as “An old adversary,” if identity is safe. No current enemy spec, cooldowns, inventory, intentions or tactical suggestions.'))
  ]),

  C('crossroads','people','Crossroads','The Traveler Card gives other players a reason to say hello.',[
    T('My road & needs','Private plans and explicitly shared projections are separate.',
      M('My Road',L('<b>Deadmines</b><span>Explicitly shared dungeon intent · current session</span>','<b>Return to River Crossing</b><span>Private Road Ahead goal</span>')+A('Share a road','Clear shared intent'),'highlight'),
      M('What I Need',L('<b>Heavy Leather</b><span>Blueprint needs three · private local goal</span>','<b>Healer for Deadmines</b><span>Only shared if you choose the projection</span>')+A('Preview a need')),
      M('What I Can Offer',L('<b>Leatherworking help</b><span>Declared capability · chosen audience</span>','<b>Heavy Leather available</b><span>Explicit offer; quantity hidden by default</span>')),
      M('Looking for Company','Dungeon, PvP, exploration, questing or help interest is player chosen. Known class or spec never advertises willingness by itself.'),
      M('Other safe intersections','A safe explicitly shared quest ID, already-known Rumor interest or camp contribution can match only when each subject and audience are eligible. Otherwise show a general intent without progress or hidden details.')),
    T('Opportunities','Matches describe a direction and reason; no automatic conversation follows.',
      M('They can help you','Thorin marked Heavy Leather available. Your local Blueprint needs it. Your private goal stays local.'+A('Inspect connection'),'highlight'),
      M('You can help them','Ari explicitly shared a need for a leatherworker. You marked that capability available.'),
      M('Shared road','Aldric and you deliberately chose the same dungeon plan. Compatible roles may be shown only when each player selected that role.'),
      M('Ask About This','A short draft is prepared for your review. You choose whether to send it, invite, trade or ignore it. No match creates a People record by itself.')),
    T('Sharing & safety','Every shared line has an audience, lifetime and revocation path.',
      M('Sharing choices at the action',L('<b>What peers see</b><span>Selected structured Need, Offer, Intent or Capability only</span>','<b>Audience</b><span>Target query, Group or Guild when eligible and enabled</span>','<b>Duration</b><span>Session or chosen expiry</span>','<b>Quantity</b><span>Off by default; separate explicit consent</span>')+'<p>The material Offer slot displays these choices before a drop; other Signals use a review step.</p>','highlight'),
      M('My card only','Your Chronicle, Scrapbook, People, Relics, Rivals, full bags, quest log and notes are never part of the Traveler Card. The card has a small size limit; a peer sees a partial view.'),
      M('Pause, expire, clear','Sharing starts off. Stale or unknown availability suspends an offer. Leaving an audience invalidates its matches. Remote copies may linger briefly until their short cache expires; Help states that limit.'),
      M('Exact queries reveal their subject','An optional recipe or safe quest query shows the exact ID/intent it would disclose before sending. A recipe answer is Yes, No or Unknown only with explicit recipient consent and authoritative evidence; no full recipe list is exchanged.'),
      M('Nearby boundary','Gentle nearby pings are a creative target, subject to transport, identity, range and privacy proof. Open world broadcast is disabled until validated; a local/manual card remains useful.')),
    T('Try an item offer','The Offer slot is the sharing action. Its audience, lifetime and quantity choice are visible before you drop anything.',
      M('Bag items','<div class="offer-demo-inventory" data-offer-inventory></div><p>Drag into the Offer slot, click a bag item, or use the focusable picker. Each shares under the visible choices. Nothing leaves your bags.</p>','highlight'),
      M('What I Can Offer','<div class="offer-demo-slot" data-offer-slot tabindex="0" aria-label="Shared item offer slot">Drop here to share</div><button type="button" class="demo-choice-link" data-offer-settings>Change audience, lifetime or amount</button><div data-offer-items></div><div class="mock-actions"><label class="demo-picker-label">Choose item <select data-offer-picker></select></label><button type="button" class="demo-button" data-offer-add>Offer this item</button><button type="button" class="demo-button light" data-offer-draft>Save privately</button></div><p class="demo-status" data-offer-status role="status">No items offered.</p>'),
      M('Visible sharing choices','<div class="demo-share-controls"><label>Audience <select data-offer-audience><option>Target query</option><option>Group</option><option>Guild (when eligible)</option></select></label><label>Expires <select data-offer-expiry><option>End of session</option><option>In 30 minutes</option><option>In 2 hours</option></select></label><label class="demo-check"><input type="checkbox" data-offer-quantity> Include exact amount on new offers</label></div><div class="mock-actions"><button type="button" class="demo-button light" data-offer-clear>Clear all offers</button></div><p>Drop or Offer this item uses these choices immediately. Changing them later affects new items only. Save privately does not add anything to your tooltip.</p>'),
      M('Your tooltip to eligible peers','<div class="atlas-tip"><div class="atlas-tip-name">Thorin Emberhand</div><div class="atlas-tip-native">THE WAYWARD COMPANY<br>Level 22 Dwarf (Player)<br>Shaman · Alliance · PvP</div><div class="atlas-tip-label">WAYFARER · What I Can Offer</div><div class="atlas-tip-lines" data-offer-tooltip>No shared offers yet.</div></div><p>Only confirmed, eligible, current offers appear beneath normal game information. Dragging does not open trade or send a whisper.</p>','highlight'))
  ]),

  C('discovery','world','Discovery & Lore','Azeroth introduces itself; the Tome remembers your own arrival.',[
    T('Places Encountered','The character’s witnessed places are separate from account lore familiarity.',
      M('Stormwind',picture('narration','Comic illustration of the entrance to Stormwind')+'<p>First Wayfarer discovery · a written introduction and optional voice.</p>'+A('Open place record'),'highlight'),
      M('A broad world',L('<b>Regions and zones</b><span>Broad orientation and safe history</span>','<b>Cities and settlements</b><span>Identity and verified services</span>','<b>Dungeon thresholds</b><span>Atmosphere, not route or boss spoilers</span>','<b>Battlegrounds</b><span>Historical context, not tactics</span>','<b>Personal places</b><span>Player authored Trailmarks, never world canon</span>')),
      M('First, return, uncertain','A qualifying native first discovery records before its toast and narration. Normal returns stay silent; rare long-absence or personal-memory lines are separate. Ambiguous recognition shows no factual discovery.'),
      M('Old Roads & The Last Time','Meaningful road transitions can become compact aggregates, not a movement log. A rare local return cue can mention the last supported memory here; no coordinates or absence history are shared.')),
    T('Lore & replay','Approved lore and personal memory sit side by side without blending.',
      M('Place record',tag('First discovered by this character')+'<p>Stormwind · written place introduction and complete transcript.</p>'+A('Play narration','Read transcript'),'highlight'),
      M('Lore by place or topic','Curated Forever facts show source and spoiler status. An approved reading remains available without voice. Unverified or conflicting lore never plays as settled narration.'),
      M('Your memories here','A local Chronicle entry, person, Scrapbook page or Trailmark may be linked here, but personal writing never becomes official world lore.'),
      M('If audio is unavailable','The discovery record, toast text and archive remain complete. Opening the page never autoplays; Play, Stop and Replay are deliberate and controller reachable.')),
    T('Narrated arrival','One original recurring voice changes weight with the place.',
      M('Three narration tiers',L('<b>Major · about 18–35 seconds</b><span>Capitals, significant sites and dungeon thresholds</span>','<b>Standard · about 8–18 seconds</b><span>Zones, settlements and substantial landmarks</span>','<b>Light · about 4–8 seconds</b><span>Small qualifying places</span>'),'highlight'),
      M('A coordinated moment','Place record → arrival toast → locally packaged voice → complete subtitle/transcript → archived replay. The toast may fade while the voice finishes.'),
      M('The world keeps priority','Combat, cinematics, dialogue and fast travel defer or archive unheard clips. One voice plays at a time; the waiting queue is bounded. No backlog is spoken minutes later.'),
      M('Character and account','Each character gets its own qualifying arrival by default. Account familiarity may select a shorter authored variant, but never invents this character’s visit.'))
  ]),

  C('landmarks','world','Landmark Archive','A place can be remembered without becoming a collectible checklist.',[
    T('Places by region','A readable list works even when exact map integration is unavailable.',
      M('Known places',L('<b>Stormwind gates</b><span>Reliable region context</span>','<b>River Crossing</b><span>Sample personal place record</span>','<b>Old stone marker</b><span>Known landmark · location precision unverified</span>')+A('Open selected place'),'highlight'),
      M('Recognition threshold','A landmark enters the archive only when location and identity are reliable. Passing near something ambiguous does not count as discovery.'),
      M('Not a checklist','No map full of undiscovered silhouettes. The archive groups known places by region or zone, with linked personal history.')),
    T('Place detail','One place identity connects discovery, approved lore and personal records.',
      M('River Crossing',tag('Sample place')+'<p>A worn crossing where the old road meets the river.</p>'+A('Open my Trailmark','Open memory'),'highlight'),
      M('Known orientation','Area, approach or location appears only at supported precision. Native directions keep their job; Wayfarer does not become a GPS.'),
      M('Related history','A discovered place can link Chronicle memories, Scrapbook pages, people, Relics and Trailmarks without copying any of their private text into the world record.'))
  ]),

  C('trailmarks','world','Trailmarks','Give a place a name and a reason to return.',[
    T('My Trailmarks','Personal marks stay personal, and the list remains the reliable route.',
      M('Marks along the road',L('<b>Our quiet camp</b><span>Camp · Elwynn · linked memory</span>','<b>The ford after rain</b><span>Return point · linked Road Ahead intention</span>')+A('Mark Here'),'highlight'),
      M('By place','Browse your own marks under known regions or a place record. If map pins are unavailable, the title and list still work.'),
      M('Map precision','Mark Here uses the current reliably known position. It does not require a tiny cursor or guess at floors or instances.')),
    T('Mark editor','A short note is enough to make a location yours.',
      M('Our quiet camp',tag('Camp mark')+'<p>“The first place we stayed after the storm.”</p>'+A('Save mark','Attach memory'),'highlight'),
      M('Fields you control','Title, short note, compact type and optional link to a memory or landmark. A mark is player authored, not an approved canon fact.'),
      M('Back to the road','An attached Road Ahead item or Chronicle memory can return you to this mark and back to the originating page.'))
  ]),

  C('rumor','world','Rumor','A mystery opens only as far as you ask.',[
    T('Following','Keep known rumors at the stage you chose.',
      M('The stone beneath the bridge',tag('Whisper · sample rumor')+'<p>“Someone left a mark where the old road bends.”</p>'+A('Read next hint','Set aside'),'highlight'),
      M('Your shelves',L('<b>Following</b><span>Stories still on your road</span>','<b>Set aside</b><span>Return later without losing the stage</span>','<b>Preserved or resolved</b><span>Known answers and chosen memories</span>')),
      M('Curated and personal','Curated rumors need approved lore and spoiler metadata. A player-authored rumor stays private by default. Unknown or unapproved tokens cannot reveal a title.')),
    T('Hint levels','The next clue is a deliberate choice, never a tooltip accident.',
      M('A staged page',L('<b>Whisper</b><span>Atmosphere without answer</span>','<b>Hint</b><span>A gentle direction</span>','<b>Strong Hint</b><span>A clearer lead</span>','<b>Reveal</b><span>Explicit consequence before opening</span>')+A('Advance to Hint','Return to Whisper'),'highlight'),
      M('Spoiler protection','Unrevealed names, answers, icons and controller labels stay absent from previews and search. A shared interest token never teaches an unknown stage.'),
      M('Optional social bridge','A safe, already-known curated interest can support a deliberate “Anyone following this Rumor?” draft. No private rumor text is posted automatically.'))
  ]),

  C('bestiary','world','Bestiary','The Tome learns the foes you meet, one true encounter at a time.',[
    T('Known foes','Only encountered creatures appear in the index.',
      M('Recently encountered',picture('boss','Comic illustration of a remembered foe')+L('<b>Ornery Galestrider</b><span>Sample encountered creature</span>','<b>A notable foe</b><span>Sample rare · classification requires proof</span>')+A('Open foe record'),'highlight'),
      M('Ways to browse','Recently Encountered · Notable Foes · Dungeon Bosses · Rare Creatures · By Zone. Search covers known entries only.'),
      M('An honest empty page','“The Tome will learn the foes you meet.” No unknown boss gallery or secret loot silhouettes appear.')),
    T('Encounter history','Observed death, credited victory and killing blow are distinct facts.',
      M('A remembered adversary',tag('Encounter recorded')+'<p>First remembered near the old road. Two credited defeats only if authoritative credit was observed.</p>'+A('Open linked memory'),'highlight'),
      M('Defeat truth',L('<b>Observed death</b><span>Foe died; credit not established</span>','<b>Credited defeat</b><span>Authoritative participation or reward</span>','<b>Killing blow</b><span>Only exact supported finishing action</span>','<b>Boss victory</b><span>Verified encounter success and participation</span>')),
      M('Deaths near a foe','Exact killer, encounter-associated death and unattributed death remain separate. Nearby corpse, last damage or party membership cannot establish a personal kill or death.'),
      M('Lore and memories','Safe approved lore, selected Chronicle/Scrapbook memories and intentionally owned Relics are links. The Bestiary does not duplicate the item’s life.')),
    T('Learned spoils','Discovery is earned; hidden identities stay truly hidden.',
      M('Spoils you know',L('<b>Personally seen and source verified</b><span>Only validated item identities appear</span>','<b>Historical discovery</b><span>Old knowledge keeps its observed build</span>')+A('Open known spoil'),'highlight'),
      M('What stays concealed','Unknown names, icons, types, slots, links, prefetches, search entries and focus labels never enter the view. An undiscovered count appears only when a complete exact-variant total is proven.'),
      M('Scope remains conditional','Account-wide learned loot is a design recommendation pending real SavedVariables and alt tests. Character combat history remains character owned.'))
  ]),

  C('blueprint','journey','Blueprint','A small crafting plan with evidence you can trust.',[
    T('Selected goals','Chosen crafts lead; profession history gives them meaning.',
      M('Leather Bracers',tag('Pinned craft · sample')+'<p>Make one pair for the next road.</p>'+A('Open material state','Mark complete'),'highlight'),
      M('Crafting Ledger','Known recipes where the client exposes them, selected milestones, and completed crafts. This is not a full recipe database or market optimizer.'),
      M('A profession with history','A meaningful craft may become a Chronicle milestone or a Relic when you deliberately preserve the resulting item.')),
    T('Material state','Have, Need and Missing say only what the addon can prove.',
      M('Leather Bracers',L('<b>Heavy Leather</b><span>Have 2 · Need 5 · Missing 3</span>','<b>Thread</b><span>Ready</span>')+A('Update materials','Draft shared Need'),'highlight'),
      M('When observation is unavailable','A selected goal and manual material note remain. Unknown inventory is not rendered as zero; bank, alts and unsupported storage are not silently counted.'),
      M('A separate social choice','Your Blueprint stays private. Share Need creates a reviewed projection in Crossroads with chosen audience and expiry; completing the goal invalidates it.')),
    T('Link from bags','Link the exact material or result you mean instead of retyping an uncertain name.',
      M('Selected craft','<p><strong>Leather Bracers</strong> · chosen result</p><div class="offer-demo-inventory" data-link-bag></div><div class="offer-demo-slot" data-link-slot aria-label="Private material link slot">Drop a material here</div><div class="mock-actions"><label class="demo-picker-label">Choose from bags <select data-link-picker></select></label><button type="button" class="demo-button" data-link-add>Link material</button><button type="button" class="demo-button light" data-link-clear>Remove link</button></div><p class="demo-status" data-link-status role="status">No material linked. This goal stays private.</p><p>Drag or choose a supported bag item. The link identifies the material; it does not promise that the stack is still owned later.</p>','highlight'),
      M('Where links belong','Blueprint result/material · Pack preset · Road Ahead to-do · preserved Relic · chosen Scrapbook keepsake. Each link stays local unless a separate, eligible Crossroads projection is confirmed.'),
      M('What a link is not','No whole-bag scan becomes a public list. A link never initiates a native trade, equips an item, or automatically creates a Relic. Unknown item identity stays unlinked.'))
  ]),

  C('loom','journey','Legacy Loom','Let past journeys suggest a new one, without ranking characters.',[
    T('Journey Seeds','A small set of ideas grounded in your owned history.',
      M('A different road',L('<b>Return to the old forest</b><span>Because your Chronicle remembers its first camp</span>','<b>Try a healer’s path</b><span>Because a prior journey preserved that role</span>')+A('Open seed'),'highlight'),
      M('Why this fits','Each seed names the known class, role, profession, region or approved Legacy fact behind it. No invented alt history or “best” build advice.'),
      M('When Legacy data is unavailable','Memory-only prompts remain useful. Unsupported cross-character state stays unknown.')),
    T('Choose a seed','An idea becomes a player-chosen intention, not a quest.',
      M('Return to the old forest',tag('History grounded')+'<p>Related memory: “A fire worth remembering.”</p>'+A('Pin to Road Ahead','Dismiss seed'),'highlight'),
      M('No optimization ranking','The Loom never ranks characters, predicts power or prescribes a route. Dismissed and pinned choices remain yours.'))
  ]),

  C('pack','journey','Pack','Prepare for your chosen journey by your own rules.',[
    T('Journey Presets','Open directly to the selected preparation list.',
      M('Woodland journey',L('<b>Food for the road</b><span>Pinned consumable · observed available</span>','<b>Repair equipment</b><span>Observed condition where supported</span>','<b>Bag space</b><span>Known only when supported</span>','<b>Bring the weathered compass</b><span>Player reminder</span>','<b>Leather for the craft</b><span>Pinned material</span>')+A('Check preparation','Edit preset'),'highlight'),
      M('Other roads','A dungeon evening and a quiet exploration walk can have different player-authored presets. Link a chosen bag item to a preset entry without sharing the preset or promising future ownership. Nothing is prescribed as a meta loadout.'),
      M('The useful distinction','Observed item or durability state, a manual reminder, and unavailable data use distinct labels. Unknown does not become a false alarm.')),
    T('Current Preparation','A quick glance before leaving.',
      M('Ready enough',tag('2 observed ready','1 player reminder')+'<p>Food is in your supported inventory. Check repairs. Remember your chosen tool.</p>'+A('Mark reminder done'),'highlight'),
      M('No unnecessary scans','The check is bounded and event-driven where possible. It does not continuously scan every bag or turn the Tome into a gear scorer.'))
  ]),

  C('road','journey','Road Ahead','A short personal to-do list for the next adventure.',[
    T('Active road','Your own intentions, written in plain language.',
      M('What I mean to do',L('<b>Return to River Crossing</b><span>Linked preserved memory</span>','<b>Finish my leather bracers</b><span>Linked Blueprint goal</span>','<b>Find a safe place to rest</b><span>Personal reminder</span>')+A('Add a to-do'),'highlight'),
      M('Direct actions','Select a line to edit, complete, set aside or open its linked place, craft, Rumor or camp. None of these tasks is tracked automatically.'),
      M('Unfinished Stories','A dormant intention can reconnect an existing Road Ahead item, Rumor, Trailmark or memory. It resurfaces rarely without deadlines, guilt or a second productivity system.'),
      M('A small list on purpose','Completed and set-aside items remain secondary. There are no nested productivity trees, automatic quests or rankings.')),
    T('Return to the road','A brief return cue can remind you of one chosen intention.',
      M('On returning','“The old road was passable after the rain.”'+A('Open linked memory','Complete to-do'),'highlight'),
      M('Quiet by design','Login/session summary and Road Whispers share the attention budget. A reminder may be delayed or stay silent during busy moments.')),
    T('Try a to-do','This is a working page: write a line, optionally link a bag item, and mark it done yourself.',
      M('My active road','<div data-road-list></div><div class="road-demo-compose"><label>New intention <input data-road-text maxlength="90" placeholder="What do you mean to do?"></label><label>Optional item <select data-road-item></select></label><button type="button" class="demo-button" data-road-add>Add to my road</button></div><p class="demo-status" data-road-status role="status">Your intentions stay local.</p>','highlight'),
      M('Reading versus doing','A Chronicle paragraph is read. This list is worked: checkbox, Edit and Set Aside live on each row, and a linked item opens its detail. Nothing completes automatically.'),
      M('Controller path','Focus the list → choose a row → Complete / Edit / Open linked item. Add uses the same item picker as drag input, so no task depends on a mouse.'))
  ]),

  C('campwright','camp','Campwright','Notice what is here and what you chose to bring.',[
    T('Here & Now','A camp is a useful pause even when the client reveals little.',
      M('Tonight’s setting',tag('Camp details unverified')+'<p>The fireside remains available for local reflection.</p>'+A('Open Fireside'),'highlight'),
      M('Known utilities','Show a camp utility or capacity only when the client exposes and validates it. Unknown occupancy, resources and deficiencies stay unknown.'),
      M('Remembered camps','A known place can link a Trailmark, Scrapbook page or camp memory without claiming a current camp still exists there.')),
    T('Contribute & reflect','Practical generosity remains a human choice.',
      M('What I can contribute',L('<b>Bring food</b><span>Player chosen reminder</span>','<b>Leatherworking help</b><span>Declared capability, never inferred from a profession alone</span>')+A('Edit contribution','Open shared preview'),'highlight'),
      M('A truthful fallback','When camp inspection is unavailable, show location and your own contribution knowledge. A shared camp Need or Capability requires reliable context and explicit consent.'),
      M('Camp Reflection','A private prompt asks who mattered here and what you want to remember. Nothing is posted, whispered or shared automatically.'))
  ]),

  C('fireside','camp','Fireside','Five gentle ways to begin a story together.',[
    T('The five choices','One large choice opens one readable prompt.',
      M('Sit by the fire',L('<b>Ask the Fire</b><span>A reflective question for this moment</span>','<b>Tale of This Land</b><span>An approved story of this place</span>','<b>Tell a Story</b><span>Choose your own recollection</span>','<b>Road Ahead</b><span>Return to a chosen intention</span>','<b>Rumor</b><span>Follow a lead already known to you</span>')+A('Choose a prompt'),'highlight'),
      M('Works without a recognized camp','Fireside can still offer a local quiet prompt. It never needs to invent a tent, utility or other players nearby.'),
      M('Sources stay distinct','Approved world lore, a player memory and a social suggestion carry different labels. The Tome never passes private notes into a group prompt by implication.')),
    T('A quiet conversation','The player reads, writes and decides whether any words leave the Tome.',
      M('Ask the Fire',tag('Private prompt')+'<p>“What would you want to remember about this road?”</p>'+A('Write a reflection','Choose another'),'highlight'),
      M('An optional bridge','A reviewed “Anyone heading to Deadmines?” message can come from an explicitly shared Road projection. The player sends it manually; no automatic chat, invite or trade.'),
      M('Tale of This Land','Only approved, spoiler-safe, source-backed prose appears as the land’s history. A longer reading may be available deliberately, never as a surprise interruption.'))
  ]),

  C('whispers','system','Tome Whispers & Toasts','The closed Tome speaks rarely, and at the right moment.',[
    T('A shared attention budget','Every chapter submits to one quiet presentation system.',
      M('Ten kinds of Whisper',tag('Memory','Discovery','Lore','Journey','Road','Fireside','Craft','War','Rumor','Relic')+'<p>Small cues recall a meaningful link. They never replace the structured first-area Discovery Toast + Narration.</p>','highlight'),
      M('A remembered road',toast('ROAD','The old crossing','You have been here before. A page waits in your Tome.')+A('Open memory','Dismiss')),
      M('A new thing learned','A verified first loot discovery may ask for one restrained Bestiary cue. Repeated loot quantities stay silent.'),
      M('One queue, not ten alarms','Combat, cinematics, dialogue, rapid travel, dungeon intensity and recent notifications defer or suppress cues. Stale whispers expire instead of forming a backlog.')),
    T('A narrated arrival','A discovery toast establishes a place while voice adds atmosphere.',
      M('Stormwind · first arrival',picture('narration','Comic illustration of Stormwind city gate')+toast('DISCOVERY','Stormwind','“Beyond Elwynn’s violet canopy rise the mighty walls of Stormwind…”')+A('Play / Stop','Open transcript'),'highlight'),
      M('Toast controls','The corner banner and icon identify the kind of moment. A small audio control plays or stops narration; dismiss hides the toast without erasing the place record.'),
      M('Deferred or unheard','If the moment is unsafe, the record persists. An expired voice becomes archived and deliberately replayable; the Tome does not narrate a travel backlog.')),
    T('Nearby alignment','Participating travelers may learn why their roads cross, if transport and privacy pass live proof.',
      M('Your roads align',toast('NEARBY','Your roads align','Aldric · Tank · Deadmines<br>Thorin · Heavy Leather available<br>Matches your local craft need')+A('View connections'),'highlight'),
      M('A gentle signal','The ping and toast respect quiet settings, cooldowns and busy moments. A private need can match locally without being sent.'),
      M('Release boundary','Open-world nearby discovery is currently a conditional target. LOCAL audience and world broadcast remain disabled until transport, range, identity and privacy are validated.'))
  ]),

  C('tooltips','system','Contextual Tooltips','The native tooltip stays; Wayfarer adds only a little meaning.',[
    T('Friendly player','A remembered face or eligible shared road can make a stranger worth speaking to.',
      M('Thorin Emberhand',picture('player','Comic illustration of a traveler meeting another character')+tip('Thorin Emberhand',['THE WAYWARD COMPANY','Level 22 Dwarf (Player)','Shaman · Alliance · PvP'],'A shared road',['Healer · Looking for Deadmines','Heavy Leather marked available','Matches your local craft need']),'highlight'),
      M('History and opportunity','A first preserved memory, at most three active opportunities, and an Open in Tome affordance fit the bounded added-row budget. Private note text stays hidden by default.'),
      M('Three directions','They Can Help You · You Can Help Them · Shared Road. These are explicit, current shared choices rather than personality scores.')),
    T('Hostile player','Rivalry remembers past clashes; it never analyzes this fight.',
      M('Gorhazak',picture('pvp','Comic illustration of druid and warlock meeting in a moonlit forest')+tip('Gorhazak',['Level 40 Orc (Player)','Warlock · Horde · PvP'],'An old adversary',['First clash · Moonlit Road','Supported past results only','Details wait until after combat'],'hostile'),'highlight'),
      M('Combat budget','In combat, at most “An old adversary” if safe. No current specialization, cooldown, inventory, intent, tactical advantage or win advice.'),
      M('Your own past context','After combat, a Tome page may show your historical spec for each supported clash. It does not claim that spec caused the result.')),
    T('Creature, rare & boss','Truthful encounters and learned spoils stay concise.',
      M('A foe remembered',picture('boss','Comic illustration of a remembered foe')+tip('Remembered creature',['Level 26 Beast'],'Bestiary',['Credited defeats · 2','First remembered near the old road','Two spoils discovered'],'hostile'),'highlight'),
      M('Boss and rare depth','Boss victory and encounter-associated death counts require stronger proof. Detailed histories live in Bestiary; combat tooltips contract to one safe cue or disappear.'),
      M('Undiscovered means absent','Unknown loot identity never appears in names, silhouettes, icons, links or accessible labels. A count requires complete exact-variant proof.')),
    T('Item, recipe & landmark','Objects add a brief personal connection to their ordinary native tooltip.',
      M('Item / Relic',tip('Balanced Quarterstaff',['Soulbound','Two-Hand Staff','15–24 Damage'],'Relic',['First remembered · Deadmines','Carried through four selected chapters'])+'<p>Instance history appears only when reliably identified. Unknown origin is omitted.</p>','highlight'),
      M('Recipe / Blueprint',tip('Leather Bracers',['Leatherworking recipe'],'Crafting goal',['Heavy Leather · Need 3'])+'<p>No price or optimization advice.</p>'),
      M('Landmark / Place',tip('River Crossing',['Known landmark'],'A place remembered',['First Wayfarer discovery recorded','Two memories preserved here'])+'<p>Full lore remains in the Tome.</p>'),
      M('A controller equivalent','A selected subject opens a focusable Inspect Context card with the same bounded view model. No core fact depends on mouse hover.')),
    T('Density & safety','One compositor protects the native tooltip and each optional contributor.',
      M('Four modes',tag('Off','Minimal','Standard','Detailed')+'<p>Detailed still has strict row budgets and no tactical or spoiler exceptions.</p>','highlight'),
      M('Subject certainty','Player, foe, item, recipe and place identity must be exact enough. Late data from an old hover or focus generation is discarded; names alone never join histories.'),
      M('Native first','If a Wayfarer contribution fails or a hook is unavailable, Blizzard’s tooltip remains intact. Inspect Context or the Tome carries the safe fallback.'))
  ]),

  C('settings','system','Settings','Choose how often the Tome speaks, what it shows, and what it shares.',[
    T('Experience & Reading','A few clear choices, with accessibility close at hand.',
      M('Reading',setting('Text scale','Comfortable')+setting('Reduced motion','Off')+setting('Chapter visibility','Choose')+'<p>Large text and narrow pages keep the same reading order and focus path.</p>','highlight'),
      M('Photos','Capture preference: Off · Invite Me · Capture Milestones. Invite Me is the intended default; automatic milestone capture remains unavailable until exact client support is proven.')),
    T('Whispers & Discovery','Keep the world, quiet the interruptions.',
      M('Attention level',setting('Tome attention','Normal')+tag('Quiet','Normal','Talkative')+'<p>Category toggles: Memory, Discovery, Lore, Journey, Road, Fireside, Craft, War, Rumor and Relic.</p>','highlight'),
      M('Discovery','The place record persists even when voice or notifications are reduced. Busy-state suppression is shared by all categories.')),
    T('Narration & Sound','One voice, complete text equivalent and separate controls.',
      M('Narration',setting('Voice','On')+setting('Volume','80%')+setting('Subtitles','With Toast')+setting('Account familiarity','Full each character')+'<p>Other choices: concise known, first-account voice, major only or voice off. The written entry stays reachable.</p>','highlight'),
      M('Page sounds','Page and UI cues are independently adjustable and lower priority than narration or game audio. Replay and Stop are deliberate controls.')),
    T('Sharing & Privacy','Nothing about a private memory becomes a peer Signal by accident.',
      M('Sharing starts off',L('<b>Audiences</b><span>Target query · Group · Guild when eligible</span>','<b>Quantity</b><span>Separate explicit consent</span>','<b>Private note marker</b><span>Off unless chosen</span>','<b>Block and revoke</b><span>Immediate local effect, short remote cache limit</span>'),'highlight'),
      M('Retention','Peer matches are session-only. Your authored history remains local, with deliberate retention and correction controls. LOCAL broadcast stays disabled until proven.')),
    T('Records & Maintenance','Data health, backup and safe diagnostics are understandable here.',
      M('Your records',tag('Local SavedVariables')+'<p>Health summary, schema version, backup guidance and bounded export when practical.</p>'+A('Read backup instructions'),'highlight'),
      M('Reset and delete','A destructive action explains exactly which local data it affects and requires a deliberate confirmation. An unknown future schema stays read-only, never silently wiped.'),
      M('Compatibility status','A broken optional adapter disables its own path while preserving the Tome and authored records. User-initiated diagnostics exclude private notes and memories.'))
  ]),

  C('help','system','Help & Provenance','A readable answer to what the Tome knows and what it cannot know.',[
    T('How to begin','Chapter Help follows the page you are using.',
      M('A short guide',L('<b>Remember something</b><span>Write a memory or personal to-do</span>','<b>Explore a chapter</b><span>Five bookmarks and the Index</span>','<b>Share deliberately</b><span>Preview each Traveler Card line</span>','<b>Stay in control</b><span>Quiet, voice, tooltip and privacy settings</span>'),'highlight'),
      M('Controller and keyboard','A chapter topic gives its exact focus path and Back action. The same content is reachable without hover.'),
      M('When a feature is unavailable','Help names the missing capability and truthful fallback without asking you to debug the client.')),
    T('What a fact means','The Tome’s facts can be inspected, corrected or left uncertain.',
      M('Evidence labels',tag('Witnessed','Player confirmed','Player authored','Imported','Inferred')+'<p>A first Wayfarer memory is not a claim about everything that happened before installation.</p>','highlight'),
      M('Private and shared','Personal prose and photos stay local. An eligible structured Signal exposes only chosen fields, audience and duration. A Shared Moment fact needs bilateral acceptance; interpretations remain private.'),
      M('No combat advice','Rivals and Bestiary preserve history after the fact. Wayfarer never suggests a live tactic or infers another player’s private state.'))
  ]),

  C('records','system','Records & Compatibility','The story survives client changes and ordinary failures.',[
    T('Local memory','Versioned records protect years of authored history.',
      M('One local memory model',L('<b>Typed records and links</b><span>People, places, items and moments each have an owner</span>','<b>Provenance</b><span>Witnessed and authored facts are distinct</span>','<b>Retention</b><span>Compact significant records, bounded indices and media references</span>'),'highlight'),
      M('Backup and export','The Tome explains SavedVariables backup and offers a bounded text export when practical. It does not promise a cloud account or seamless photo import.'),
      M('Safe migrations','Validate before writes. Preserve unknown fields. An unsupported future version becomes read-only, never a blank new book.')),
    T('Client changes','Compatibility failures should degrade one feature, not erase the Tome.',
      M('A narrow boundary',tag('Build fingerprint','Capability registry','Adapters','Circuit breakers')+'<p>Each client-dependent path has a truthful fallback and a smoke check.</p>','highlight'),
      M('A user-readable status','“Narration playback unavailable in this build. Your discovery and transcript are saved.” Diagnostics are copied only when you choose, with private authored data excluded.'),
      M('Repair path','The shipped addon remains local and offline. Update packages can repair compatibility while preserving history; an unproven beta capability is never presented as a passed live test.'))
  ])
];

// Five bookmark indexes and one clearly separate system index.
for (const group of ATLAS_GROUPS) {
  const members = ATLAS_CHAPTERS.filter(chapter => chapter.group === group.id && chapter.id !== 'index');
  ATLAS_CHAPTERS.push(C('group-' + group.id, group.id, group.id === 'system' ? 'In-world systems' : group.label,
    group.id === 'system' ? 'Quiet prompts, contextual information and your controls.' : 'Choose a chapter for this part of your journey.', [
      T('Chapters', 'This bookmark opens a short contents page. Choose the chapter that matches what you want to do.',
        ...members.map(chapter => M(chapter.title, '<p>' + chapter.subtitle + '</p><button type="button" class="mock-link" data-atlas-target="' + chapter.id + '">Open ' + chapter.title + ' →</button>')))
    ]));
}

const ATLAS_BY_ID = Object.fromEntries(ATLAS_CHAPTERS.map(chapter => [chapter.id, chapter]));
