(()=>{
  const carousel=document.querySelector('.narration-carousel');
  const scene=document.querySelector('.arrival-scene');
  if(!carousel||!scene)return;

  const slides=[
    {title:'Stormwind',category:'Place',tier:'Major',subtitle:'A first arrival, remembered.',image:'assets/comic/narration.png',audio:'assets/narration/stormwind-introduction.mp3',alt:"A druid approaches Stormwind's blue-roofed gates from Elwynn Forest.",script:'“Beyond Elwynn’s violet canopy rise the mighty walls of Stormwind. A beacon against the darkness, this fortified city stands as a bastion of hope for Azeroth. Beneath the banners of the Alliance, its gates promise sanctuary—and the courage to face the road ahead.”'},
    {title:'Warsong Gulch',category:'Place',tier:'Major',subtitle:'The Forest and the Axe',image:'assets/comic/narration/warsong-gulch.webp',audio:'assets/narration/forest-and-axe.mp3',alt:'A night elf Sentinel studies axe scars while the Warsong Outriders log the opposite side of a forested gulch.',script:'“Here, Ashenvale’s ancient green gives way to axe scars, splintered earth, and the thunder of war drums. To the Silverwing Sentinels, this forest is an ancestral home. To the Warsong Outriders, its timber promises strength and survival. Their banners change hands, but the struggle beneath them endures. Who will decide the fate of these woods—the defenders who remember them, or the conquerors who would reshape them?”'},
    {title:'Durotar',category:'Place',tier:'Major',subtitle:'Beyond the Lion’s Lands',image:'assets/comic/narration/durotar-alliance.webp',audio:'assets/narration/beyond-lions-lands.mp3',alt:'An Alliance scout watches orc outriders travel the red road toward the gates of Orgrimmar.',script:'“Red stone, hard earth, and the blood-stained banners of the Horde—this is Durotar, named for Durotan, father of Thrall. Beyond these canyons stands Orgrimmar, raised by a people who crossed worlds, survived defeat, and came here to begin again. Alliance traveler, tread with care. In this land, the lion is the foreign standard—and every canyon watches its approach.”'},
    {title:'Duskwood',category:'Place',tier:'Standard',subtitle:'Where Daylight Falters',image:'assets/comic/narration/duskwood.webp',audio:'assets/narration/where-daylight-falters.mp3',alt:'A lone traveler follows a lantern road through haunted Duskwood toward the distant lights of Darkshire.',script:'“Daylight falters beneath Duskwood’s tangled boughs. The road still leads to Darkshire, where the Night Watch holds its lamps against graveyards that do not sleep. Keep to the lanterns, traveler. In these woods, a branch may creak without wind—and footsteps may answer when yours have stopped.”'},
    {title:'The Scarlet Crusade',category:'People',tier:'Faction',subtitle:'Faith with a Blade',image:'assets/comic/narration/scarlet-crusade.webp',audio:'assets/narration/faith-with-a-blade.mp3',alt:'Scarlet Crusade soldiers inspect a traveler inside a severe, candlelit monastery chapel.',script:'“Across the ruins of Lordaeron, the Scarlet Crusade wages its merciless war against the undead. Many once stood as defenders of the living, but fear became suspicion—and suspicion became fanaticism. Beneath the scarlet flame, undeath is guilt, strangers are enemies, and mercy is corruption. Where their banners rise, faith carries a blade—and every traveler must prove that blood still warms their veins.”'},
    {title:'The Orcs',category:'People',tier:'History',subtitle:'A People Carrying Two Truths',image:'assets/comic/narration/orc-history.webp',audio:'assets/narration/people-carrying-two-truths.mp3',alt:'Three eras of orc history move from ancestral Draenor through fel corruption and captivity toward a new Kalimdor homeland.',script:'“Before the Dark Portal, the orc clans hunted beneath Draenor’s open skies. They honored their ancestors, listened to the elements, and carried the traditions of countless generations. Then came deception. Demonic blood turned strength into bloodlust, and the Horde crossed into Azeroth as conquerors. Defeat brought chains. Captivity brought despair. Thrall brought freedom—a return to shamanism and the promise of a new homeland in Kalimdor. The history of the orcs is neither a simple tale of savagery nor honor. It is the story of a people carrying what was done to them—and what they did in return.”'}
  ];

  const toast=scene.querySelector('.arrival-toast');
  const image=scene.querySelector('#narration-scene');
  const controls=document.getElementById('narration-controls');
  const play=controls.querySelector('[data-narration-play]');
  const sound=toast.querySelector('.toast-audio');
  const dismiss=toast.querySelector('.toast-dismiss');
  const feedback=controls.querySelector('[role=status]');
  const progress=toast.querySelector('.narration-progress span');
  const transcript=toast.querySelector('.narrator-script');
  const transcriptViewport=toast.querySelector('.narrator-viewport');
  const kicker=toast.querySelector('.toast-kicker');
  const heading=toast.querySelector('h3');
  const subtitle=toast.querySelector('.toast-subtitle');
  const audio=document.getElementById('wayfarer-narration');
  const dots=[...carousel.querySelectorAll('[data-narration-slide]')];
  const counter=carousel.querySelector('[data-narration-count]');
  const navTitle=carousel.querySelector('[data-narration-title]');
  let hideTimer,shown=false,attempt=0,currentIndex=0,pointerStart=null;

  scene.classList.add('narration-enhanced');
  function current(){return slides[currentIndex];}
  function reveal(){clearTimeout(hideTimer);toast.classList.remove('is-visible');void toast.offsetWidth;toast.classList.add('is-visible');toast.removeAttribute('inert');toast.setAttribute('aria-hidden','false');shown=true;}
  function hide(){clearTimeout(hideTimer);if(toast.contains(document.activeElement))play.focus();toast.classList.remove('is-visible');toast.setAttribute('inert','');toast.setAttribute('aria-hidden','true');}
  function state(playing){const slide=current();play.textContent=playing?'Stop narration':`Hear ${slide.title}`;play.setAttribute('aria-pressed',String(playing));sound.setAttribute('aria-pressed',String(playing));sound.setAttribute('aria-label',playing?`Stop ${slide.title} narration`:`Play ${slide.title} narration`);}
  function setReadingProgress(ratio){progress.style.width=(ratio*100)+'%';if(!transcript||!transcriptViewport||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const travel=Math.max(0,transcript.scrollHeight-transcriptViewport.clientHeight+12);transcript.style.transform=`translateY(${-travel*ratio}px)`;}
  function pauseAndReset(){attempt++;audio.pause();audio.currentTime=0;state(false);setReadingProgress(0);clearTimeout(hideTimer);}
  function preloadAdjacent(){[slides[(currentIndex+1)%slides.length],slides[(currentIndex-1+slides.length)%slides.length]].forEach(slide=>{const preload=new Image();preload.src=slide.image;});}
  function showSlide(index){pauseAndReset();currentIndex=(index+slides.length)%slides.length;const slide=current();image.classList.add('is-changing');image.addEventListener('load',()=>image.classList.remove('is-changing'),{once:true});image.src=slide.image;image.alt=slide.alt;kicker.textContent=`The Tome remembers · ${slide.category} · ${slide.tier}`;heading.textContent=slide.title;subtitle.textContent=slide.subtitle;transcript.textContent=slide.script;audio.src=slide.audio;audio.load();dismiss.setAttribute('aria-label',`Dismiss ${slide.title} narration`);dots.forEach((dot,dotIndex)=>dot.toggleAttribute('aria-current',dotIndex===currentIndex));counter.textContent=String(currentIndex+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');navTitle.textContent=`${slide.title} · ${slide.category}`;feedback.textContent=`Press play to hear ${slide.title}.`;state(false);setReadingProgress(0);reveal();preloadAdjacent();}
  function stop(){pauseAndReset();feedback.textContent='Narration stopped. Replay whenever you choose.';hideTimer=setTimeout(hide,2400);}
  async function start(){if(!audio.paused){stop();return;}const slide=current();const token=++attempt;reveal();audio.currentTime=0;setReadingProgress(0);feedback.textContent=`Preparing ${slide.title} narration…`;try{await audio.play();if(token!==attempt)return;state(true);feedback.textContent=`The Tome is telling ${slide.title}’s story.`;}catch{if(token!==attempt)return;state(false);feedback.textContent='Audio could not start. Press replay to try again; the story remains on the toast.';}}

  play.addEventListener('click',start);sound.addEventListener('click',start);
  dismiss.addEventListener('click',()=>{stop();hide();play.focus();feedback.textContent='Narration dismissed. Replay whenever you choose.';});
  carousel.querySelector('.carousel-prev').addEventListener('click',()=>showSlide(currentIndex-1));
  carousel.querySelector('.carousel-next').addEventListener('click',()=>showSlide(currentIndex+1));
  dots.forEach(dot=>dot.addEventListener('click',()=>showSlide(Number(dot.dataset.narrationSlide))));
  carousel.addEventListener('keydown',event=>{if(event.target.matches('input,button'))return;if(event.key==='ArrowLeft'){event.preventDefault();showSlide(currentIndex-1);}if(event.key==='ArrowRight'){event.preventDefault();showSlide(currentIndex+1);}});
  carousel.addEventListener('pointerdown',event=>{pointerStart=event.clientX;});
  carousel.addEventListener('pointerup',event=>{if(pointerStart===null)return;const distance=event.clientX-pointerStart;pointerStart=null;if(Math.abs(distance)>55)showSlide(currentIndex+(distance<0?1:-1));});
  audio.volume=.8;
  controls.querySelector('input').addEventListener('input',event=>{audio.volume=Number(event.target.value)/100;});
  audio.addEventListener('timeupdate',()=>{if(audio.duration)setReadingProgress(audio.currentTime/audio.duration);});
  audio.addEventListener('ended',()=>{state(false);setReadingProgress(1);feedback.textContent=`${current().subtitle}, remembered. Replay whenever you choose.`;hideTimer=setTimeout(hide,2400);});
  audio.addEventListener('error',()=>{state(false);feedback.textContent='This recording is unavailable. You can still read the narration.';});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&!audio.paused)stop();});
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)&&!shown){reveal();hideTimer=setTimeout(hide,14000);observer.disconnect();}},{threshold:.35});observer.observe(scene);}else{reveal();hideTimer=setTimeout(hide,14000);}
  toast.setAttribute('inert','');toast.setAttribute('aria-hidden','true');
  preloadAdjacent();
})();
