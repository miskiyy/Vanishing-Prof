import { CONFIG } from './config.js';
import { state } from './state.js';
import { loadRoom } from './entities/room.js';
import { loop } from './engine/loop.js';
import { onKeyDown, onKeyUp, interact } from './engine/input.js';
import { openMap, closeMap } from './ui/map.js';
import { openPanel, closePanel, renderInventoryPanel, renderNotebookPanel, renderQuestsPanel, renderCiphersPanel, renderBoardPanel, setFlag, addInventoryItem } from './ui/panels.js';
import { advanceDialog } from './ui/dialog.js';
import { submitPuzzle, closePuzzle } from './ui/puzzles.js';
import { audio } from './audio.js';

const PROLOGUE_TEXT = [
  "Namaku [MC]. Asisten riset Profesor Arga.",
  "Semalam, beliau meneleponku dengan suara bergetar. Beliau bilang 'mereka' mengincarnya.",
  "Pagi ini, ruangannya kosong. Hanya ada secangkir kopi yang masih hangat, dan laptop yang menyala.",
  "Aku harus tahu apa yang sebenarnya terjadi pada Project Chronos..."
];
let prologueIndex = 0;
let isTyping = false;
let typeInterval = null;

function init() {
  document.getElementById("startBtn")?.addEventListener("click", () => {
    const mainMenu = document.getElementById("mainMenu");
    mainMenu.style.opacity = "0";
    setTimeout(() => {
      mainMenu.classList.add("hidden");
      document.getElementById("nameScreen").classList.remove("hidden");
    }, 1000);
  });

  document.getElementById("confirmNameBtn")?.addEventListener("click", () => {
    const nameInput = document.getElementById("playerNameInput");
    if (nameInput && nameInput.value.trim() !== "") {
      state.playerName = nameInput.value.trim();
    }
    
    document.getElementById("nameScreen").classList.add("hidden");
    document.getElementById("prologueScreen").classList.remove("hidden");
    startPrologue();
    audio.playBGM();
  });

  document.getElementById("storyBtn")?.addEventListener("click", () => {
    document.getElementById("storyScreen").classList.remove("hidden");
  });
  document.getElementById("storyCloseBtn")?.addEventListener("click", () => {
    document.getElementById("storyScreen").classList.add("hidden");
  });

  document.getElementById("creditBtn")?.addEventListener("click", () => {
    document.getElementById("creditScreen").classList.remove("hidden");
  });
  document.getElementById("creditCloseBtn")?.addEventListener("click", () => {
    document.getElementById("creditScreen").classList.add("hidden");
  });
  
  // Skip/advance prologue
  window.addEventListener("keydown", (e) => {
    const prologueScreen = document.getElementById("prologueScreen");
    if (prologueScreen && !prologueScreen.classList.contains("hidden")) {
      if (e.code === "Space" || e.code === "KeyE") {
        advancePrologue();
      }
    }
  });

  // End screen restart / credits button
  document.getElementById("endRestartBtn")?.addEventListener("click", () => {
    document.getElementById("endScreen")?.classList.add("hidden");
    state.modalOpen = false;
    state.flags = {};
    state.keywords = [];
    state.inventory = [];
    loadRoom(CONFIG.startRoom);
    renderInventoryPanel();
    renderNotebookPanel();
    renderQuestsPanel();
    renderCiphersPanel();
    renderBoardPanel();
  });

  // Global click SFX
  window.addEventListener("click", (e) => {
    if (!audio.bgmStarted) {
      audio.playBGM();
      audio.bgmStarted = true;
    }

    if (e.target.closest("button, .game-object, .map-loc, .nav-btn, .tab-btn, .panel-close, .modal-close, .puzzle-choice")) {
      audio.playClick();
    }
  });
}

function startPrologue() {
  prologueIndex = 0;
  showPrologueLine();
}

function showPrologueLine() {
  if (prologueIndex >= PROLOGUE_TEXT.length) {
    endPrologue();
    return;
  }
  const textEl = document.getElementById("prologueText");
  const hintEl = document.getElementById("prologueHint");
  textEl.innerHTML = "";
  hintEl.classList.add("hidden");
  
  isTyping = true;
  const line = PROLOGUE_TEXT[prologueIndex].replace(/\[MC\]/g, state.playerName);
  let charIndex = 0;
  
  audio.startTyping();
  if (typeInterval) clearInterval(typeInterval);
  typeInterval = setInterval(() => {
    textEl.innerHTML += line[charIndex];
    charIndex++;
    if (charIndex >= line.length) {
      clearInterval(typeInterval);
      isTyping = false;
      hintEl.classList.remove("hidden");
      audio.stopTyping();
    }
  }, 50); // Typing speed
}

function advancePrologue() {
  if (isTyping) {
    // Skip typing
    clearInterval(typeInterval);
    document.getElementById("prologueText").innerHTML = PROLOGUE_TEXT[prologueIndex].replace(/\[MC\]/g, state.playerName);
    isTyping = false;
    document.getElementById("prologueHint").classList.remove("hidden");
    audio.stopTyping();
  } else {
    prologueIndex++;
    showPrologueLine();
  }
}

function endPrologue() {
  const prologueScreen = document.getElementById("prologueScreen");
  prologueScreen.style.opacity = "0"; // fade out
  setTimeout(() => {
    prologueScreen.classList.add("hidden");
    document.getElementById("gameContainer").classList.remove("hidden");
    startGame();
  }, 2000);
}

function startGame() {
  loadRoom(CONFIG.startRoom);

  // Initial renders
  renderInventoryPanel();
  renderNotebookPanel();
  renderQuestsPanel();
  renderCiphersPanel();
  renderBoardPanel();

  // Map location buttons
  document.querySelectorAll(".map-loc[data-room]").forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.disabled || btn.classList.contains("locked")) return;
      const room = btn.dataset.room;
      closeMap();
      loadRoom(room);
    });
  });

  // Map close button
  document.getElementById("mapCloseBtn")?.addEventListener("click", closeMap);

  // Nav buttons
  document.querySelectorAll(".nav-btn[data-panel]").forEach(btn => {
    btn.addEventListener("click", () => openPanel(btn.dataset.panel));
  });

  // Panel close buttons
  document.querySelectorAll(".panel-close[data-panel]").forEach(btn => {
    btn.addEventListener("click", () => closePanel());
  });

  // Notebook tab buttons
  document.querySelectorAll(".tab-btn[data-tab]").forEach(btn => {
    btn.addEventListener("click", () => {
      const panel = btn.closest(".side-panel");
      panel.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      panel.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab)?.classList.add("active");
    });
  });

  // Puzzle submit / close
  document.getElementById("puzzleSubmit")?.addEventListener("click", submitPuzzle);
  document.getElementById("puzzleClose")?.addEventListener("click", closePuzzle);

  // Click dialog to advance
  document.getElementById("dialog")?.addEventListener("click", advanceDialog);

  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup",   onKeyUp);
  window.addEventListener("blur", () => { state.keys = {}; });

  setupTouchControls();
  requestAnimationFrame(loop);
}

function setupTouchControls() {
  // D-pad → state.keys
  const dpadMap = { 'dpad-up': 'w', 'dpad-down': 's', 'dpad-left': 'a', 'dpad-right': 'd' };
  for (const [id, key] of Object.entries(dpadMap)) {
    const btn = document.getElementById(id);
    if (!btn) continue;
    const press   = (e) => { e.preventDefault(); state.keys[key] = true; };
    const release = (e) => { e.preventDefault(); state.keys[key] = false; };
    btn.addEventListener('touchstart',  press,   { passive: false });
    btn.addEventListener('touchend',    release, { passive: false });
    btn.addEventListener('touchcancel', release, { passive: false });
  }

  // E button — context-sensitive: advance dialog OR interact
  const eBtn = document.getElementById('touchInteract');
  if (eBtn) {
    eBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      audio.playClick();
      const dialogEl = document.getElementById('dialog');
      const puzzleEl = document.getElementById('puzzleOverlay');
      if (puzzleEl && !puzzleEl.classList.contains('hidden')) {
        submitPuzzle();
      } else if (dialogEl && !dialogEl.classList.contains('hidden')) {
        advanceDialog();
      } else {
        interact();
      }
    }, { passive: false });
  }

  // M button — open/close map
  const mBtn = document.getElementById('touchMap');
  if (mBtn) {
    mBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      audio.playClick();
      if (state.mapOpen) closeMap(); else openMap();
    }, { passive: false });
  }
}

// Dev console helpers
window.GAME = {
  state, loadRoom, CONFIG,
  setDebug(v) { 
    CONFIG.debug = v; 
    document.getElementById("viewport")?.classList.toggle("debug", v); 
  },
  setFlag, addInventoryItem, openPanel, openMap,
};

if (document.readyState === "loading")
  document.addEventListener("DOMContentLoaded", init);
else
  init();
