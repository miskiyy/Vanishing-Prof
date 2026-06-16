import { handleMovement, updatePlayerSprite } from '../entities/player.js';
import { updateCamera } from './camera.js';
import { updateNearest } from './input.js';

let lastT = performance.now();

export function loop(now) {
  const dt = now - lastT; 
  lastT = now;
  
  handleMovement(dt);
  updatePlayerSprite(false);
  updateCamera();
  updateNearest();
  
  requestAnimationFrame(loop);
}
