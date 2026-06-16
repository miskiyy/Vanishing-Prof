import { state } from '../state.js';
import { loadRoom } from '../entities/room.js';

export const MAP_LOCATIONS = [
  { room: "office",    flag: null,                 label: "Professor's Office" },
  { room: "lab",       flag: null,                 label: "Research Laboratory" },
  { room: "library",   flag: null,                 label: "University Library" },
  { room: "archive",   flag: "binarySolved",       label: "Underground Archive" },
  { room: "abandoned", flag: "vigenereSolved",     label: "Abandoned Facility" },
  { room: "server",    flag: "substitutionSolved", label: "Server Facility" },
];

export function openMap() {
  state.mapOpen   = true;
  state.modalOpen = true;
  document.getElementById("prompt")?.classList.add("hidden");
  const mapEl = document.getElementById("mapScreen");
  if (!mapEl) return;
  mapEl.classList.remove("hidden");

  MAP_LOCATIONS.forEach(({ room, flag }) => {
    const btn = mapEl.querySelector(`[data-room="${room}"]`);
    if (!btn) return;
    const unlocked = !flag || state.flags[flag];
    btn.classList.toggle("locked", !unlocked);
    btn.disabled = !unlocked;
    btn.classList.toggle("current", state.room && state.room.id === room);
  });
}

export function closeMap() {
  state.mapOpen   = false;
  state.modalOpen = false;
  document.getElementById("mapScreen")?.classList.add("hidden");
}

export function showEnding() {
  state.modalOpen = true;
  const epiScreen = document.getElementById("epilogueScreen");
  const epiText = document.getElementById("epilogueText");
  const epiAnim = document.getElementById("epilogueAnimation");
  const epiHint = document.getElementById("epilogueHint");
  
  if (!epiScreen) {
    document.getElementById("endScreen")?.classList.remove("hidden");
    return;
  }
  
  epiScreen.classList.remove("hidden");
  epiText.innerHTML = "";
  epiAnim.classList.remove("start");
  epiAnim.classList.add("hidden");
  epiHint.classList.add("hidden");
  
  const text = "> KODE DITERIMA\n> OVERRIDE SISTEM BERHASIL...\n> PROJECT CHRONOS DIHENTIKAN.\n\nAkhirnya semua kebenaran terungkap.\nSemua misteri ini telah menemukan titik terang.";
  
  let i = 0;
  const iv = setInterval(() => {
    epiText.innerHTML += text.charAt(i) === '\n' ? '<br>' : text.charAt(i);
    if (window.AUDIO && window.AUDIO.typing) {
      window.AUDIO.typing.currentTime = 0;
      window.AUDIO.typing.play().catch(()=>{});
    }
    i++;
    if (i >= text.length) {
      clearInterval(iv);
      setTimeout(() => {
        epiAnim.classList.remove("hidden");
        setTimeout(() => {
          epiAnim.classList.add("start");
          setTimeout(() => {
            epiHint.classList.remove("hidden");
            const onSpace = (e) => {
              if (e.code === "Space") {
                e.preventDefault();
                window.removeEventListener("keydown", onSpace);
                epiScreen.classList.add("hidden");
                document.getElementById("endScreen")?.classList.remove("hidden");
              }
            };
            window.addEventListener("keydown", onSpace);
          }, 4500);
        }, 100);
      }, 1000);
    }
  }, 50);
}
