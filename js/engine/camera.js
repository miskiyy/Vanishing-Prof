import { state } from '../state.js';

export function updateCamera() {
  const viewport = document.getElementById("viewport");
  const world = document.getElementById("world");
  
  if (!viewport || !world || !state.room) return;

  const vw = viewport.clientWidth,  vh = viewport.clientHeight;
  const ww = state.room.size.width,    wh = state.room.size.height;
  let camX = state.player.x - vw / 2;
  let camY = state.player.y - vh / 2;
  camX = Math.max(0, Math.min(camX, Math.max(0, ww - vw)));
  camY = Math.max(0, Math.min(camY, Math.max(0, wh - vh)));
  if (ww < vw) camX = (ww - vw) / 2;
  if (wh < vh) camY = (wh - vh) / 2;
  world.style.transform = `translate(${-camX}px,${-camY}px)`;
}
