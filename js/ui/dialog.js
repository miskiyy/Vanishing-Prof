import { state } from '../state.js';
import { DIALOGS } from '../data/rooms.js';
import { addKeyword, setFlag, addInventoryItem } from './panels.js';

export function startDialog(dialogId, onDone) {
  const d = DIALOGS[dialogId];
  if (!d) return;
  const promptEl = document.getElementById("prompt");
  const dialogSpeakerEl = document.getElementById("dialogSpeaker");
  const dialogEl = document.getElementById("dialog");
  
  if (!promptEl || !dialogSpeakerEl || !dialogEl) return;

  state.modalOpen = true;
  promptEl.classList.add("hidden");
  let speakerName = d.speaker || "";
  if (speakerName === "MC" || speakerName === "[MC]") speakerName = state.playerName;
  dialogSpeakerEl.textContent = speakerName;
  state.dialog.lines = d.lines.slice();
  state.dialog.index = 0;
  state.dialog.onDone = function () {
    if (d.keywords)  d.keywords.forEach(addKeyword);
    if (d.flags)     d.flags.forEach(setFlag);
    if (d.inventory) d.inventory.forEach(addInventoryItem);
    if (onDone) onDone();
  };
  dialogEl.classList.remove("hidden");
  showDialogLine();
}

export function showDialogLine() {
  const dialogTextEl = document.getElementById("dialogText");
  if (dialogTextEl) {
    let line = state.dialog.lines[state.dialog.index];
    if (line) line = line.replace(/\[MC\]/g, state.playerName);
    dialogTextEl.textContent = line;
  }
}

export function advanceDialog() {
  state.dialog.index++;
  const dialogEl = document.getElementById("dialog");
  
  if (state.dialog.index >= state.dialog.lines.length) {
    if (dialogEl) dialogEl.classList.add("hidden");
    const puzzleOpen = !document.getElementById("puzzleOverlay")?.classList.contains("hidden");
    if (!state.openPanel && !puzzleOpen) {
      state.modalOpen = false;
    }
    const done = state.dialog.onDone;
    state.dialog.onDone = null;
    if (done) done();
  } else {
    showDialogLine();
  }
}
