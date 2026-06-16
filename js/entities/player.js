import { state } from '../state.js';
import { CONFIG } from '../config.js';
import { isWalkable } from '../engine/physics.js';
import { ASSETS } from '../data/rooms.js';

export function updatePlayerSprite(force) {
  const playerEl = document.getElementById("player");
  if (!playerEl) return;
  const frames = ASSETS.player[state.player.dir];
  const idx = state.player.moving ? state.animFrame % frames.length : 0;
  const url = frames[idx];
  if (force || playerEl.dataset.url !== url) {
    playerEl.style.backgroundImage = `url("${url}")`;
    playerEl.dataset.url = url;
  }
  playerEl.style.left = state.player.x + "px";
  playerEl.style.top  = state.player.y + "px";
}

export function handleMovement(dt) {
  if (state.modalOpen) { state.player.moving = false; return; }
  const k = state.keys;
  let dx = 0, dy = 0;
  if (k["w"] || k["arrowup"])    dy -= 1;
  if (k["s"] || k["arrowdown"])  dy += 1;
  if (k["a"] || k["arrowleft"])  dx -= 1;
  if (k["d"] || k["arrowright"]) dx += 1;
  state.player.moving = dx !== 0 || dy !== 0;
  if (!state.player.moving) return;

  if (dx < 0)      state.player.dir = "left";
  else if (dx > 0) state.player.dir = "right";
  else if (dy < 0) state.player.dir = "up";
  else             state.player.dir = "down";

  const len = Math.hypot(dx, dy) || 1;
  const isSprinting = !!state.keys["shift"];
  const step = isSprinting ? CONFIG.sprintSpeed : CONFIG.moveSpeed;
  const nx = state.player.x + (dx / len) * step;
  const ny = state.player.y + (dy / len) * step;
  const foot = CONFIG.playerSize * 0.35;
  if (isWalkable(nx, state.player.y + foot)) state.player.x = nx;
  if (isWalkable(state.player.x, ny + foot)) state.player.y = ny;

  state.animTimer += dt;
  const interval = isSprinting ? CONFIG.sprintAnimInterval : CONFIG.animInterval;
  if (state.animTimer >= interval) { state.animTimer = 0; state.animFrame++; }
}
