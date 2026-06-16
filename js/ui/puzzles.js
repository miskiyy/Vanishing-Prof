import { state } from '../state.js';
import { PUZZLES } from '../data/rooms.js';
import { addKeyword, setFlag, addInventoryItem } from './panels.js';
import { startDialog } from './dialog.js';
import { showEnding } from './map.js';
import { audio } from '../audio.js';

export function openPuzzle(puzzleId) {
  const p = PUZZLES[puzzleId];
  if (!p) return;
  if (p.onSolveFlag && state.flags[p.onSolveFlag]) { showPuzzleSuccessDialog(p); return; }

  // Dependency Check
  if (p.requiresFlag && !state.flags[p.requiresFlag]) {
    startDialog(p.lockedDialog || "puzzleLocked");
    return;
  }

  // Pre-puzzle Dialog Intercept
  if (p.preDialogId && !state.flags[p.preDialogId + "_done"]) {
    state.flags[p.preDialogId + "_done"] = true;
    startDialog(p.preDialogId, () => {
      openPuzzle(puzzleId);
    });
    return;
  }

  const promptEl = document.getElementById("prompt");
  const puzzleTitleEl = document.getElementById("puzzleTitle");
  const puzzleKindEl = document.getElementById("puzzleKind");
  const puzzlePromptEl = document.getElementById("puzzlePrompt");
  const puzzleCipherEl = document.getElementById("puzzleCipher");
  const puzzleInputEl = document.getElementById("puzzleInput");
  const puzzleFeedbackEl = document.getElementById("puzzleFeedback");
  const puzzleOverlayEl = document.getElementById("puzzleOverlay");
  const simContainer = document.getElementById("puzzleSimulatorContainer");
  const cipherContainer = document.getElementById("puzzleCipherContainer");
  const bentoRight = document.getElementById("bentoRight");

  state.modalOpen = true;
  promptEl?.classList.add("hidden");
  puzzleTitleEl.textContent    = p.title;
  puzzleKindEl.textContent     = p.kind;
  puzzlePromptEl.textContent   = p.prompt;
  puzzleCipherEl.textContent   = p.cipher;
  puzzleInputEl.value          = "";
  puzzleFeedbackEl.textContent = "";
  puzzleFeedbackEl.className   = "";
  puzzleOverlayEl.dataset.puzzleId = puzzleId;

  // Render tutorial on the right if available
  if (p.tutorial) {
    bentoRight.classList.remove("hidden");
    document.getElementById("tutorialTitle").textContent = "Panduan: " + p.kind;
    document.getElementById("tutSejarah").textContent = p.tutorial.sejarah;
    document.getElementById("tutKeunggulan").textContent = p.tutorial.keunggulan;
    document.getElementById("tutKekurangan").textContent = p.tutorial.kekurangan;
    document.getElementById("tutCaraKerja").textContent = p.tutorial.caraKerja;
  } else {
    bentoRight.classList.add("hidden");
  }

  // Reset Simulator UI
  simContainer.innerHTML = "";
  simContainer.classList.add("hidden");
  puzzleInputEl.classList.remove("hidden");
  puzzleInputEl.oninput = null; // clear previous events
  cipherContainer.classList.remove("hidden");

  if (p.kind.includes("Caesar")) renderCaesarSimulator(p, simContainer, puzzleInputEl, cipherContainer);
  else if (p.kind.includes("Atbash")) renderAtbashSimulator(p, simContainer, puzzleInputEl, cipherContainer);
  else if (p.kind.includes("Morse")) renderMorseSimulator(p, simContainer, puzzleInputEl);
  else if (p.kind.includes("Binary")) renderBinarySimulator(p, simContainer, puzzleInputEl);
  else if (p.kind.includes("Vigenère")) renderVigenereSimulator(p, simContainer, puzzleInputEl);
  else setTimeout(() => puzzleInputEl.focus(), 30);

  const origInput = puzzleInputEl.oninput;
  puzzleInputEl.oninput = (e) => {
    audio.startTyping();
    clearTimeout(puzzleInputEl.typeTimeout);
    puzzleInputEl.typeTimeout = setTimeout(() => audio.stopTyping(), 300);
    if (origInput) origInput(e);
  };

  puzzleOverlayEl.classList.remove("hidden");
}

function shiftChar(c, shift) {
  if (c < 'A' || c > 'Z') return c;
  let code = c.charCodeAt(0) - 65 + shift;
  code = ((code % 26) + 26) % 26;
  return String.fromCharCode(code + 65);
}

function renderCaesarSimulator(p, simContainer, inputEl, cipherContainer) {
  inputEl.classList.add("hidden");
  cipherContainer.classList.add("hidden");
  simContainer.classList.remove("hidden");
  
  let currentShift = 0;
  
  simContainer.innerHTML = `
    <div class="sim-caesar-controls">
      <button class="sim-btn" id="simDown">-</button>
      <div class="sim-shift-val" id="simShiftVal">0</div>
      <button class="sim-btn" id="simUp">+</button>
    </div>
    <div class="sim-alphabet-box">
      <div class="sim-alpha-row">
        <span class="alpha-label">Plain :</span>
        <span class="alpha-text">A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</span>
      </div>
      <div class="sim-alpha-row">
        <span class="alpha-label">Cipher:</span>
        <span class="alpha-text" id="simAlphaCipher">A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</span>
      </div>
    </div>
    <div class="sim-preview-box">
      <div class="sim-preview-text" id="simPreviewText"></div>
    </div>
  `;

  const updatePreview = () => {
    // Decrypt the cipher text by shifting backwards
    const shifted = p.cipher.split('').map(c => shiftChar(c, -currentShift)).join('');
    document.getElementById("simPreviewText").textContent = shifted;
    document.getElementById("simShiftVal").textContent = currentShift;
    inputEl.value = shifted; 
    
    // Show the cipher alphabet shifted forwards
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const cipherAlpha = alphabet.split('').map(c => shiftChar(c, currentShift)).join(' ');
    document.getElementById("simAlphaCipher").textContent = cipherAlpha;
  };

  document.getElementById("simUp").onclick = () => { currentShift = (currentShift + 1) % 26; updatePreview(); };
  document.getElementById("simDown").onclick = () => { currentShift = (currentShift - 1 + 26) % 26; updatePreview(); };
  
  updatePreview();
}

function renderAtbashSimulator(p, simContainer, inputEl, cipherContainer) {
  inputEl.classList.add("hidden");
  cipherContainer.classList.add("hidden");
  simContainer.classList.remove("hidden");
  
  let currentText = p.cipher;
  
  simContainer.innerHTML = `
    <div style="color:var(--accent); margin-bottom:10px; text-align:center; font-size:13px;">Klik teks di bawah untuk membalikkan alfabet (A↔Z)!</div>
    <button id="simAtbashBtn" style="padding:15px; background:#2a3043; color:#fff; border:2px solid var(--accent); border-radius:8px; font-family:'Consolas', monospace; font-size:20px; cursor:pointer; width:100%; letter-spacing:2px; transition:0.2s;">
      ${currentText}
    </button>
  `;

  document.getElementById("simAtbashBtn").onclick = (e) => {
    currentText = currentText.split('').map(c => {
      if (c >= 'A' && c <= 'Z') return String.fromCharCode(90 - (c.charCodeAt(0) - 65));
      return c;
    }).join('');
    e.target.textContent = currentText;
    inputEl.value = currentText;
    e.target.style.background = "#4a5a80";
    setTimeout(() => e.target.style.background = "#2a3043", 150);
  };
}

const MORSE_DICT = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
  'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
  'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', ' ': '/'
};

function renderMorseSimulator(p, simContainer, inputEl) {
  simContainer.classList.remove("hidden");
  simContainer.innerHTML = `
    <div style="font-size:12px; color:var(--dim); margin-bottom:5px;">Live Translation ke Morse:</div>
    <div id="simMorseLive" style="font-family:Consolas,monospace; font-size:20px; color:var(--accent); letter-spacing:2px; min-height:24px;"></div>
  `;
  inputEl.oninput = (e) => {
    const text = e.target.value.toUpperCase();
    const morseStr = text.split('').map(c => MORSE_DICT[c] || '').join(' ').replace(/ \/ /g, ' / ');
    document.getElementById("simMorseLive").textContent = morseStr;
  };
  setTimeout(() => inputEl.focus(), 30);
}

function renderBinarySimulator(p, simContainer, inputEl) {
  simContainer.classList.remove("hidden");
  simContainer.innerHTML = `
    <div style="font-size:12px; color:var(--dim); margin-bottom:5px;">Live Teks ke Binary:</div>
    <div id="simBinLive" style="font-family:Consolas,monospace; font-size:16px; color:#66aaff; letter-spacing:1px; min-height:20px; word-wrap:break-word; word-break:normal;"></div>
  `;
  inputEl.oninput = (e) => {
    const text = e.target.value.toUpperCase();
    const binStr = text.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
    document.getElementById("simBinLive").textContent = binStr;
  };
  setTimeout(() => inputEl.focus(), 30);
}

function renderVigenereSimulator(p, simContainer, inputEl) {
  simContainer.classList.remove("hidden");
  simContainer.innerHTML = `
    <div style="font-size:12px; color:var(--dim); margin-bottom:5px;">Live Enkripsi dengan Kunci 'CHRONOS':</div>
    <div id="simVigLive" style="font-family:Consolas,monospace; font-size:20px; color:#ff6b6b; letter-spacing:3px; min-height:24px;"></div>
  `;
  const key = "CHRONOS";
  inputEl.oninput = (e) => {
    let text = e.target.value.toUpperCase();
    let res = "";
    let j = 0;
    for(let i=0; i<text.length; i++) {
      let c = text[i];
      if (c >= 'A' && c <= 'Z') {
        let shift = key[j % key.length].charCodeAt(0) - 65;
        let code = c.charCodeAt(0) - 65 + shift;
        res += String.fromCharCode((code % 26) + 65);
        j++;
      } else {
        res += c;
      }
    }
    document.getElementById("simVigLive").textContent = res;
  };
  setTimeout(() => inputEl.focus(), 30);
}

function normalize(s) { return s.trim().toUpperCase().replace(/\s+/g, " "); }

export function submitPuzzle() {
  const puzzleOverlayEl = document.getElementById("puzzleOverlay");
  const puzzleInputEl = document.getElementById("puzzleInput");
  const puzzleFeedbackEl = document.getElementById("puzzleFeedback");

  const id = puzzleOverlayEl.dataset.puzzleId;
  const p  = PUZZLES[id];
  if (!p) return;
  if (normalize(puzzleInputEl.value) === normalize(p.answer)) {
    if (id === "caesarServer") {
      audio.playReboot();
      audio.stopGlitch();
    } else {
      audio.playCorrect();
    }
    puzzleFeedbackEl.textContent = "✓ Benar! Mengakses sistem...";
    puzzleFeedbackEl.className   = "ok";
    if (p.onSolveFlag) setFlag(p.onSolveFlag);
    if (p.keywords)  p.keywords.forEach(addKeyword);
    if (p.inventory) p.inventory.forEach(addInventoryItem);
    const afterSuccess = p.onSolveFlag === "gameSolved"
      ? () => startDialog("serverEnding", showEnding)
      : null;
    setTimeout(() => { closePuzzle(); showPuzzleSuccessDialog(p, afterSuccess); }, 700);
  } else {
    audio.playError();
    puzzleFeedbackEl.textContent = "✗ Salah. Coba lagi.";
    puzzleFeedbackEl.className   = "err";
  }
}

export function showPuzzleSuccessDialog(p, onDone) {
  if (!p.success) { if (onDone) onDone(); return; }
  const dialogSpeakerEl = document.getElementById("dialogSpeaker");
  const dialogEl = document.getElementById("dialog");

  state.modalOpen = true;
  dialogSpeakerEl.textContent = p.success.speaker || "";
  state.dialog.lines = p.success.lines.slice();
  state.dialog.index = 0;
  state.dialog.onDone = onDone || null;
  dialogEl.classList.remove("hidden");
  const dialogTextEl = document.getElementById("dialogText");
  if (dialogTextEl) {
    dialogTextEl.textContent = state.dialog.lines[state.dialog.index];
  }
}

export function closePuzzle() {
  const puzzleOverlayEl = document.getElementById("puzzleOverlay");
  puzzleOverlayEl?.classList.add("hidden");
  const dialogOpen = !document.getElementById("dialog")?.classList.contains("hidden");
  if (!state.openPanel && !dialogOpen) {
    state.modalOpen = false;
  }
}
