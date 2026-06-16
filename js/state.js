export const state = {
  playerName: "Player",
  room: null,
  player: { x: 0, y: 0, dir: "down", moving: false },
  keys: {},
  nearest: null,
  modalOpen: false,
  mapOpen: false,
  flags: {},
  keywords: [],
  inventory: [],       // array of item IDs
  openPanel: null,     // 'inventory'|'notebook'|'quests'|'ciphers'|'board'
  animFrame: 0,
  animTimer: 0,
  dialog: { lines: [], index: 0, onDone: null },
  tutorialsRead: {},
};
