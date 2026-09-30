(()=>{
  const scene=document.querySelector('.arrival-scene');
  if(!scene)return;
  const toast=scene.querySelector('.arrival-toast');
  const controls=document.getElementById('narration-controls');
  const play=controls.querySelector('[data-narration-play]');
  const sound=toast.querySelector('.toast-audio');
  const dismiss=toast.querySelector('.toast-dismiss');
  const feedback=controls.querySelector('[role=status]');
  const progress=toast.querySelector('.narration-progress span');
  const transcript=toast.querySelector('.narrator-script');
  const transcriptViewport=toast.querySelector('.narrator-viewport');
  const audio=document.getElementById('stormwind-narration');
  let hideTimer,shown=false,attempt=0;
  scene.classList.add('narration-enhanced');
  function reveal(){clearTimeout(hideTimer);toast.classList.remove('is-visible');void toast.offsetWidth;toast.classList.add('is-visible');toast.removeAttribute('inert');toast.setAttribute('aria-hidden','false');shown=true;}
  function hide(){clearTimeout(hideTimer);if(toast.contains(document.activeElement))play.focus();toast.classList.remove('is-visible');toast.setAttribute('inert','');toast.setAttribute('aria-hidden','true');}
  function state(playing){play.textContent=playing?'Stop narration':'Replay Stormwind arrival';play.setAttribute('aria-pressed',String(playing));sound.setAttribute('aria-pressed',String(playing));sound.setAttribute('aria-label',playing?'Stop Stormwind narration':'Play Stormwind narration');}
  function setReadingProgress(ratio){
    progress.style.width=(ratio*100)+'%';
    if(!transcript||!transcriptViewport||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const travel=Math.max(0,transcript.scrollHeight-transcriptViewport.clientHeight+12);
    transcript.style.transform=`translateY(${-travel*ratio}px)`;
  }
  function stop(){attempt++;audio.pause();audio.currentTime=0;state(false);setReadingProgress(0);feedback.textContent='Narration stopped. Replay whenever you choose.';clearTimeout(hideTimer);hideTimer=setTimeout(hide,2400);}
  async function start(){
    if(!audio.paused){stop();return;}
    const token=++attempt;
    reveal();audio.currentTime=0;setReadingProgress(0);feedback.textContent='Preparing Stormwind narration…';
    try{await audio.play();if(token!==attempt)return;state(true);feedback.textContent='The Tome is telling Stormwind’s story.';}
    catch{if(token!==attempt)return;state(false);feedback.textContent='Audio could not start. Press replay to try again; the story remains on the toast.';}
  }
  play.addEventListener('click',start);sound.addEventListener('click',start);
  dismiss.addEventListener('click',()=>{stop();hide();play.focus();feedback.textContent='Arrival dismissed. Replay whenever you choose.';});
  audio.volume=.8;
  controls.querySelector('input').addEventListener('input',event=>{audio.volume=Number(event.target.value)/100;});
  audio.addEventListener('timeupdate',()=>{if(audio.duration)setReadingProgress(audio.currentTime/audio.duration);});
  audio.addEventListener('ended',()=>{state(false);feedback.textContent='A first arrival, remembered. Replay whenever you choose.';hideTimer=setTimeout(hide,2400);});
  audio.addEventListener('error',()=>{state(false);feedback.textContent='The recording is unavailable. You can still read the introduction.';});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&!audio.paused)stop();});
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)&&!shown){reveal();hideTimer=setTimeout(hide,14000);observer.disconnect();}},{threshold:.35});observer.observe(scene);}else{reveal();hideTimer=setTimeout(hide,14000);}
  toast.setAttribute('inert','');toast.setAttribute('aria-hidden','true');

  const filters=document.querySelectorAll('[data-lore-filter]');
  const auditions=document.querySelectorAll('[data-lore-category]');
  const empty=document.querySelector('[data-lore-empty]');
  filters.forEach(button=>button.addEventListener('click',()=>{
    const category=button.dataset.loreFilter;
    filters.forEach(candidate=>candidate.setAttribute('aria-pressed',String(candidate===button)));
    let visible=0;
    auditions.forEach(card=>{const show=category==='all'||card.dataset.loreCategory===category;card.hidden=!show;if(show)visible++;});
    empty.hidden=visible!==0;
  }));
  document.querySelectorAll('[data-copy-narration]').forEach(button=>button.addEventListener('click',async()=>{
    const card=button.closest('.narration-audition');
    const prompt=[card.querySelector('.audition-direction').textContent.replace('ElevenLabs direction: ',''),card.querySelector('blockquote').textContent.trim()].join('\n\n');
    try{await navigator.clipboard.writeText(prompt);button.textContent='Copied';button.classList.add('is-copied');setTimeout(()=>{button.textContent='Copy ElevenLabs prompt';button.classList.remove('is-copied');},1800);}
    catch{button.textContent='Select and copy the text above';}
  }));
})();
