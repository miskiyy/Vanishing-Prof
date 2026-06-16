import { state } from '../state.js';
import { CONFIG } from '../config.js';
import { ROOMS } from '../data/rooms.js';
import { updatePlayerSprite } from './player.js';
import { audio } from '../audio.js';

export function loadRoom(roomId) {
  const worldEl = document.getElementById("world");
  const bgEl = document.getElementById("background");
  const objLayerEl = document.getElementById("objectLayer");
  const viewportEl = document.getElementById("viewport");
  
  if (!worldEl || !bgEl || !objLayerEl || !viewportEl) return;

  const room = ROOMS[roomId];
  state.room = room;
  worldEl.style.width  = room.size.width  + "px";
  worldEl.style.height = room.size.height + "px";
  bgEl.style.backgroundImage = `url("${room.background}")`;
  state.player.x = room.playerStart.x;
  state.player.y = room.playerStart.y;
  state.player.dir = "down";

  objLayerEl.innerHTML = "";

  for (const obj of room.objects) {
    let s = null;
    if (obj.sprite) {
      s = document.createElement("div");
      s.className = "game-object";
      s.dataset.objId = obj.id;
      s.style.left   = obj.x + "px";
      s.style.top    = obj.y + "px";
      s.style.width  = (obj.spriteWidth  || obj.spriteSize || 64) + "px";
      s.style.height = (obj.spriteHeight || obj.spriteSize || 64) + "px";
      s.style.backgroundImage = `url("${obj.sprite}")`;
      objLayerEl.appendChild(s);
    }
    // debug hotspot
    const h = document.createElement("div");
    h.className = "hotspot";
    h.dataset.objId = obj.id;
    h.style.left   = obj.x + "px";
    h.style.top    = obj.y + "px";
    h.style.width  = obj.radius * 2 + "px";
    h.style.height = obj.radius * 2 + "px";
    objLayerEl.appendChild(h);

    // interact glow
    const g = document.createElement("div");
    g.className = "interact-glow";
    g.dataset.objId = obj.id;
    g.style.left = obj.x + "px";
    g.style.top  = obj.y + "px";
    // Also use the same size logic as the sprite so the glow matches
    g.style.width  = (obj.spriteWidth  || obj.spriteSize || 64) + "px";
    g.style.height = (obj.spriteHeight || obj.spriteSize || 64) + "px";
    objLayerEl.appendChild(g);

    // Drag and drop removed.
  }

  // debug walkable polygon (with hole support, fill-rule evenodd)
  if (room.walkablePolygon) {
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.id = "debugWalkable";
    svg.setAttribute("width",  room.size.width);
    svg.setAttribute("height", room.size.height);
    svg.style.cssText = "position:absolute;left:0;top:0;pointer-events:none";

    // Build SVG path: outer polygon + any holes (evenodd punches them out)
    let d = "M" + room.walkablePolygon.map(p => p.join(" ")).join(" L") + " Z";
    if (room.walkableHoles) {
      for (const hole of room.walkableHoles) {
        d += " M" + hole.map(p => p.join(" ")).join(" L") + " Z";
      }
    }
    const path = document.createElementNS(ns, "path");
    path.setAttribute("d", d);
    path.setAttribute("fill-rule", "evenodd");
    path.setAttribute("fill", "rgba(80,200,120,0.18)");
    path.setAttribute("stroke", "rgba(80,255,140,0.7)");
    path.setAttribute("stroke-width", "2");
    svg.appendChild(path);
    objLayerEl.appendChild(svg);
  }

  viewportEl.classList.toggle("debug", CONFIG.debug);
  updatePlayerSprite(true);

  if (roomId === "server" && !state.flags.substitutionSolved) {
    audio.startGlitch();
  } else {
    audio.stopGlitch();
  }
}
