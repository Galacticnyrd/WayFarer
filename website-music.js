(() => {
  const audio = document.getElementById('website-track');
  const toggle = document.getElementById('music-toggle');
  const volume = document.getElementById('music-volume');
  const status = document.getElementById('music-status');
  if (!audio || !toggle || !volume || !status) return;

  audio.volume = Number(volume.value) / 100;
  const reflect = () => {
    const playing = !audio.paused && !audio.ended;
    toggle.setAttribute('aria-pressed', String(playing));
    toggle.setAttribute('aria-label', playing ? 'Pause music' : 'Play music');
  };
  audio.addEventListener('play', reflect);
  audio.addEventListener('pause', reflect);
  audio.addEventListener('ended', reflect);
  audio.addEventListener('playing', () => { status.textContent = 'A little music for the road.'; });
  audio.addEventListener('error', () => { status.textContent = 'The score could not be loaded.'; reflect(); });
  volume.addEventListener('input', () => { audio.volume = Number(volume.value) / 100; });
  toggle.addEventListener('click', async () => {
    if (!audio.paused) {
      audio.pause();
      status.textContent = 'Music paused.';
      return;
    }
    try {
      await audio.play();
      status.textContent = 'A little music for the road.';
    } catch {
      status.textContent = 'Playback is blocked. Press play again after interacting with the page.';
    }
    reflect();
  });

  audio.play().then(() => {
    status.textContent = 'A little music for the road.';
    reflect();
  }).catch(() => {
    status.textContent = 'Autoplay was blocked. Press play to listen.';
    reflect();
  });
})();
