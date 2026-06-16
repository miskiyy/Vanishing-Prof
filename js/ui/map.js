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
  document.getElementById("endScreen")?.classList.remove("hidden");
}
