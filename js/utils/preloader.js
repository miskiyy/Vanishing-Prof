import { ROOMS, ASSETS } from '../data/rooms.js';

export function preloadAssets(onProgress, onComplete) {
  const imageUrls = new Set();
  const audioUrls = new Set();

  // 1. Gather images from ASSETS bg & player
  if (ASSETS.bg) {
    Object.values(ASSETS.bg).forEach(url => imageUrls.add(url));
  }
  if (ASSETS.player) {
    Object.values(ASSETS.player).forEach(frames => {
      if (Array.isArray(frames)) {
        frames.forEach(url => imageUrls.add(url));
      }
    });
  }

  // 2. Gather images from room objects dynamically
  if (ROOMS) {
    Object.values(ROOMS).forEach(room => {
      if (room.objects) {
        room.objects.forEach(obj => {
          if (obj.sprite) imageUrls.add(obj.sprite);
        });
      }
    });
  }

  // 3. Add UI/Static assets
  imageUrls.add("Asset/bg/tile.png");
  imageUrls.add("Asset/UI/bag.png");
  imageUrls.add("Asset/UI/notebook.png");
  imageUrls.add("Asset/UI/quest.png");
  imageUrls.add("Asset/UI/cipher.png");
  imageUrls.add("Asset/UI/board.png");

  // 4. Gather audio assets
  audioUrls.add("Asset/music/mystery ambience.mp3");
  audioUrls.add("Asset/music/click sfx.mp3");
  audioUrls.add("Asset/music/correct sfx.mp3");
  audioUrls.add("Asset/music/error sfx.mp3");
  audioUrls.add("Asset/music/typing sfx.mp3");
  audioUrls.add("Asset/music/server reboot sfx.mp3");
  audioUrls.add("Asset/music/glitch sfx.mp3");

  const totalAssets = imageUrls.size + audioUrls.size;
  let loadedCount = 0;

  if (totalAssets === 0) {
    onProgress(100, "Selesai");
    onComplete();
    return;
  }

  function itemLoaded(url) {
    loadedCount++;
    const percent = Math.floor((loadedCount / totalAssets) * 100);
    onProgress(percent, url);
    if (loadedCount === totalAssets) {
      onComplete();
    }
  }

  // Load Images
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
    img.onload = () => itemLoaded(url);
    img.onerror = () => {
      console.warn("Failed to load image asset:", url);
      itemLoaded(url); // Count as loaded to avoid blocking progress
    };
  });

  // Load Audio
  audioUrls.forEach(url => {
    const aud = new Audio();
    aud.src = url;
    // canplaythrough is a reliable way to verify audio is ready
    aud.addEventListener('canplaythrough', function handler() {
      aud.removeEventListener('canplaythrough', handler);
      itemLoaded(url);
    });
    aud.addEventListener('error', () => {
      console.warn("Failed to load audio asset:", url);
      itemLoaded(url); // Count as loaded to avoid blocking progress
    });
    aud.load(); // Force pre-buffering
  });
}
