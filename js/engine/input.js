import { state } from '../state.js';
import { CONFIG } from '../config.js';
import { submitPuzzle, closePuzzle } from '../ui/puzzles.js';
import { advanceDialog } from '../ui/dialog.js';
import { openMap, closeMap } from '../ui/map.js';
import { openPanel, closePanel } from '../ui/panels.js';
import { startDialog } from '../ui/dialog.js';
import { pointInRect } from './physics.js';
import { dist } from './physics.js';
import { audio } from '../audio.js';

export function updateNearest() {
  const px = state.player.x, py = state.player.y;
  let best = null, bestD = Infinity;

  for (const obj of state.room.objects) {
    const d = dist(px, py, obj.x, obj.y);
    if (d <= obj.radius && d < bestD) { best = { kind: "object", ref: obj }; bestD = d; }
  }
  for (const ex of state.room.exits || []) {
    const cx = ex.rect.x + ex.rect.w / 2, cy = ex.rect.y + ex.rect.h / 2;
    if (pointInRect(px, py, ex.rect) || dist(px, py, cx, cy) < 60) {
      const d = dist(px, py, cx, cy);
      if (d < bestD) { best = { kind: "exit", ref: ex }; bestD = d; }
    }
  }
  state.nearest = best;

  const objectLayerEl = document.getElementById("objectLayer");
  const promptEl = document.getElementById("prompt");
  
  if (objectLayerEl) {
    objectLayerEl.querySelectorAll(".near").forEach(n => n.classList.remove("near"));
    objectLayerEl.querySelectorAll(".interact-glow.active").forEach(n => n.classList.remove("active"));
  }

  if (best && !state.modalOpen) {
    if (best.kind === "object") {
      objectLayerEl?.querySelectorAll(`[data-obj-id="${best.ref.id}"]`).forEach(n => {
        if (n.classList.contains("interact-glow")) {
          n.classList.add("active");
        } else if (n.classList.contains("game-object")) {
          n.classList.add("near");
        }
      });
    }
    promptEl?.classList.remove("hidden");
  } else {
    promptEl?.classList.add("hidden");
  }
}

export function interact() {
  if (state.modalOpen || !state.nearest) return;
  audio.playClick();
  const { kind, ref } = state.nearest;
  const action = ref.action;
  if (!action) return;
  if (action.type === "dialog") startDialog(action.dialogId);
  else if (action.type === "puzzle") {
    import('../ui/puzzles.js').then(m => m.openPuzzle(action.puzzleId));
  }
  else if (action.type === "map") {
    if (action.requiredFlag && !state.flags[action.requiredFlag]) {
      if (action.lockedDialog) startDialog(action.lockedDialog);
    } else {
      openMap();
    }
  }
}

export function onKeyDown(e) {
  const key = e.key.toLowerCase();

  const puzzleOverlayEl = document.getElementById("puzzleOverlay");
  const dialogEl = document.getElementById("dialog");

  // Debug toggle (Shift + K)
  if (key === "k" && e.shiftKey) {
    e.preventDefault();
    if (window.GAME) {
      window.GAME.setDebug(!CONFIG.debug);
    }
    return;
  }

  // Puzzle open
  if (puzzleOverlayEl && !puzzleOverlayEl.classList.contains("hidden")) {
    if (key === "enter")  { e.preventDefault(); submitPuzzle(); }
    if (key === "escape") { e.preventDefault(); closePuzzle(); audio.playClick(); }
    return;
  }

  // Dialog open
  if (dialogEl && !dialogEl.classList.contains("hidden")) {
    if (key === " " || key === "e" || key === "enter") {
      e.preventDefault(); 
      audio.playClick();
      advanceDialog();
    }
    return;
  }

  // Map open
  if (state.mapOpen) {
    if (key === "escape" || key === "m") { e.preventDefault(); closeMap(); }
    return;
  }

  // Panel shortcuts
  const panelKeys = { i: "inventory", n: "notebook", j: "quests", c: "ciphers", b: "board" };
  if (panelKeys[key]) { e.preventDefault(); openPanel(panelKeys[key]); return; }
  if (key === "escape" && state.openPanel) { e.preventDefault(); closePanel(); return; }
  if (key === "m") { e.preventDefault(); openMap(); return; }

  // If a panel is open, eat all other keys
  if (state.openPanel) return;

  // Movement / interact
  state.keys[key] = true;
  if (key === "e") interact();
  if (["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright","shift"].includes(key))
    e.preventDefault();
}

export function onKeyUp(e) {
  state.keys[e.key.toLowerCase()] = false;
}
