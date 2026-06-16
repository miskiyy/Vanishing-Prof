import { state } from '../state.js';
import { INVENTORY_ITEMS, PEOPLE_DATA, LOCATIONS_DATA, QUESTS, CIPHER_GUIDE, BOARD_NODES, BOARD_CONNECTIONS } from '../data/ui-data.js';

export function setFlag(flag) {
  if (state.flags[flag]) return;
  state.flags[flag] = true;
  if (state.openPanel) renderPanel(state.openPanel);
  notifyNav("quests");
  notifyNav("board");
  notifyNav("notebook");
  notifyNav("ciphers");
}

export function addKeyword(name) {
  if (state.keywords.includes(name)) return;
  state.keywords.push(name);
  if (state.openPanel === "notebook") renderNotebookPanel();
  else notifyNav("notebook");
}

export function addInventoryItem(id) {
  if (state.inventory.includes(id)) return;
  state.inventory.push(id);
  if (state.openPanel === "inventory") renderInventoryPanel();
  else notifyNav("inventory");
}

export const PANEL_IDS = ["inventory", "notebook", "quests", "ciphers", "board"];

export function openPanel(id) {
  if (state.openPanel === id) { closePanel(); return; }
  if (state.openPanel) {
    document.getElementById("panel-" + state.openPanel)?.classList.remove("open");
    document.querySelector(`.nav-btn[data-panel="${state.openPanel}"]`)?.classList.remove("active");
  }
  state.openPanel = id;
  state.modalOpen = true;
  document.getElementById("prompt")?.classList.add("hidden");
  renderPanel(id);
  document.getElementById("panel-" + id)?.classList.add("open");
  const btn = document.querySelector(`.nav-btn[data-panel="${id}"]`);
  if (btn) { btn.classList.add("active"); btn.classList.remove("has-new"); }
}

export function closePanel() {
  if (!state.openPanel) return;
  document.getElementById("panel-" + state.openPanel)?.classList.remove("open");
  document.querySelector(`.nav-btn[data-panel="${state.openPanel}"]`)?.classList.remove("active");
  state.openPanel = null;
  const puzzleOpen = !document.getElementById("puzzleOverlay")?.classList.contains("hidden");
  const dialogOpen = !document.getElementById("dialog")?.classList.contains("hidden");
  if (!puzzleOpen && !dialogOpen) {
    state.modalOpen = false;
  }
}

export function notifyNav(id) {
  if (state.openPanel === id) return;
  document.querySelector(`.nav-btn[data-panel="${id}"]`)?.classList.add("has-new");
}

export function renderPanel(id) {
  if (id === "inventory") renderInventoryPanel();
  else if (id === "notebook") renderNotebookPanel();
  else if (id === "quests")   renderQuestsPanel();
  else if (id === "ciphers")  renderCiphersPanel();
  else if (id === "board")    renderBoardPanel();
}

export function renderInventoryPanel() {
  const el = document.getElementById("inventoryContent");
  if (!el) return;
  if (state.inventory.length === 0) {
    el.innerHTML = `<p class="panel-empty">Belum ada barang.</p>`; return;
  }
  el.innerHTML = state.inventory.map(id => {
    const item = INVENTORY_ITEMS[id];
    if (!item) return "";
    return `<div class="inv-item">
      <img class="inv-icon" src="${item.icon}" alt="" />
      <div><div class="inv-name">${item.name}</div>
           <div class="inv-desc">${item.desc}</div></div>
    </div>`;
  }).join("");
}

export function renderNotebookPanel() {
  renderPeoplTab();
  renderLocationsTab();
  renderKeywordsTab();
}

function renderPeoplTab() {
  const el = document.getElementById("nb-people");
  if (!el) return;
  el.innerHTML = PEOPLE_DATA.map(person => {
    let stage = null;
    for (const s of person.stages) {
      if (!s.flag || state.flags[s.flag]) stage = s;
    }
    if (!stage) {
      return `<div class="person-card locked">
        <div class="person-name">${person.name}</div>
        <div class="person-desc">Belum ada informasi.</div>
      </div>`;
    }
    return `<div class="person-card">
      <div class="person-name">${person.name}</div>
      <div class="person-status">${stage.status}</div>
      <div class="person-desc">${stage.desc}</div>
    </div>`;
  }).join("");
}

function renderLocationsTab() {
  const el = document.getElementById("nb-locations");
  if (!el) return;
  el.innerHTML = LOCATIONS_DATA.map(loc => {
    const visible = !loc.unlockedBy || state.flags[loc.unlockedBy];
    if (!visible) return `<div class="loc-item locked">
      <div class="loc-name">???</div>
      <div class="loc-desc">Belum ditemukan.</div>
    </div>`;
    return `<div class="loc-item">
      <div class="loc-name">${loc.name}</div>
      <div class="loc-desc">${loc.desc}</div>
    </div>`;
  }).join("");
}

function renderKeywordsTab() {
  const el = document.getElementById("nb-keywords");
  if (!el) return;
  if (state.keywords.length === 0) {
    el.innerHTML = `<p class="kw-empty">Belum ada keyword.</p>`; return;
  }
  el.innerHTML = `<div class="kw-area">${
    state.keywords.map(k => `<span class="kw-tag">${k}</span>`).join("")
  }</div>`;
}

export function renderQuestsPanel() {
  const el = document.getElementById("questsContent");
  if (!el) return;
  el.innerHTML = QUESTS.chapters
    .filter(ch => !ch.unlockedBy || state.flags[ch.unlockedBy])
    .map(ch => {
      const objs = ch.objectives.map(obj => {
        const done = !!state.flags[obj.flag];
        return `<div class="quest-obj${done ? " done" : ""}">
          <div class="quest-check"></div>
          <div class="quest-text">${obj.text}</div>
        </div>`;
      }).join("");
      return `<div class="quest-chapter">
        <div class="quest-chapter-label">${ch.chapterLabel}</div>
        <div class="quest-chapter-title">${ch.title}</div>
        <div class="quest-intro">${ch.intro}</div>
        ${objs}
      </div>`;
    }).join("");
}

export function renderCiphersPanel() {
  const container = document.getElementById("ciphersContent");
  if (!container) return;
  container.innerHTML = "";

  for (const cipher of CIPHER_GUIDE) {
    const unlocked = !cipher.unlockedBy || state.flags[cipher.unlockedBy];
    const card = document.createElement("div");
    card.className = `cipher-card${unlocked ? " unlocked" : " cipher-locked"}`;
    card.dataset.cipherId = cipher.id;

    const badge = unlocked
      ? `<span class="cipher-badge cipher-unlocked-badge">LEARNED</span>`
      : `<span class="cipher-badge cipher-locked-badge">LOCKED</span>`;

    const bodyRows = unlocked
      ? cipher.body.map(row =>
          `<div class="cipher-row">
            <div class="cipher-row-label">${row.label}</div>
            <div class="cipher-row-text">${row.text}</div>
          </div>`).join("")
      : "";

    card.innerHTML = `
      <div class="cipher-card-header">
        <div class="cipher-icon">${cipher.icon}</div>
        <div>
          <div class="cipher-title">${cipher.title}</div>
          <div class="cipher-short">${cipher.short}</div>
        </div>
        ${badge}
      </div>
      ${unlocked ? `<div class="cipher-body">${bodyRows}</div>` : ""}
    `;

    if (unlocked) {
      card.querySelector(".cipher-card-header").addEventListener("click", () => {
        card.classList.toggle("open");
      });
    }
    container.appendChild(card);
  }
}

export function renderBoardPanel() {
  const svg = document.getElementById("boardSVG");
  if (!svg) return;
  while (svg.firstChild) svg.removeChild(svg.firstChild);

  const ns  = "http://www.w3.org/2000/svg";
  const byId = {};
  BOARD_NODES.forEach(n => { byId[n.id] = n; });

  const visNodes = BOARD_NODES.filter(n => !n.unlockedBy || state.flags[n.unlockedBy]);
  const visConns = BOARD_CONNECTIONS.filter(c =>
    (!c.unlockedBy || state.flags[c.unlockedBy]) &&
    byId[c.from] && byId[c.to] &&
    visNodes.includes(byId[c.from]) && visNodes.includes(byId[c.to])
  );

  if (visNodes.length === 0) {
    const t = document.createElementNS(ns, "text");
    t.setAttribute("x", "265"); t.setAttribute("y", "60");
    t.setAttribute("text-anchor", "middle");
    t.setAttribute("fill", "#555");
    t.setAttribute("font-size", "13");
    t.setAttribute("font-family", "Segoe UI, system-ui, sans-serif");
    t.textContent = "Selesaikan investigasi untuk mengisi board.";
    svg.appendChild(t);
    return;
  }

  for (const conn of visConns) {
    const from = byId[conn.from], to = byId[conn.to];
    const line = document.createElementNS(ns, "line");
    line.setAttribute("x1", from.x); line.setAttribute("y1", from.y);
    line.setAttribute("x2", to.x);   line.setAttribute("y2", to.y);
    line.setAttribute("stroke", "rgba(100,130,200,0.45)");
    line.setAttribute("stroke-width", "1.5");
    line.setAttribute("stroke-dasharray", "5 3");
    svg.appendChild(line);

    const mx = (from.x + to.x) / 2, my = (from.y + to.y) / 2;
    const pill = document.createElementNS(ns, "rect");
    pill.setAttribute("x",  mx - 28); pill.setAttribute("y", my - 8);
    pill.setAttribute("width", 56);   pill.setAttribute("height", 14);
    pill.setAttribute("rx", 3);
    pill.setAttribute("fill", "rgba(10,12,20,0.85)");
    svg.appendChild(pill);

    const lbl = document.createElementNS(ns, "text");
    lbl.setAttribute("x", mx); lbl.setAttribute("y", my + 1);
    lbl.setAttribute("text-anchor", "middle");
    lbl.setAttribute("dominant-baseline", "middle");
    lbl.setAttribute("fill", "rgba(150,180,230,0.9)");
    lbl.setAttribute("font-size", "9");
    lbl.setAttribute("font-family", "Segoe UI, system-ui, sans-serif");
    lbl.textContent = conn.label;
    svg.appendChild(lbl);
  }

  const NW = 126, NH = 46, NR = 7;
  for (const node of visNodes) {
    const g    = document.createElementNS(ns, "g");
    const rect = document.createElementNS(ns, "rect");
    rect.setAttribute("x",      node.x - NW / 2);
    rect.setAttribute("y",      node.y - NH / 2);
    rect.setAttribute("width",  NW);
    rect.setAttribute("height", NH);
    rect.setAttribute("rx",     NR);
    rect.setAttribute("fill",   node.color);

    const filterId = "sh_" + node.id;
    const defs = svg.querySelector("defs") || (() => {
      const d = document.createElementNS(ns, "defs"); svg.prepend(d); return d;
    })();
    const filt = document.createElementNS(ns, "filter");
    filt.setAttribute("id", filterId);
    filt.setAttribute("x", "-20%"); filt.setAttribute("y", "-20%");
    filt.setAttribute("width", "140%"); filt.setAttribute("height", "140%");
    const fe = document.createElementNS(ns, "feDropShadow");
    fe.setAttribute("dx", "0"); fe.setAttribute("dy", "2");
    fe.setAttribute("stdDeviation", "3");
    fe.setAttribute("flood-color", "rgba(0,0,0,0.55)");
    filt.appendChild(fe); defs.appendChild(filt);
    rect.setAttribute("filter", `url(#${filterId})`);

    g.appendChild(rect);

    const t1 = document.createElementNS(ns, "text");
    t1.setAttribute("x", node.x); t1.setAttribute("y", node.y - 5);
    t1.setAttribute("text-anchor", "middle");
    t1.setAttribute("dominant-baseline", "middle");
    t1.setAttribute("fill", node.tc);
    t1.setAttribute("font-size", "11");
    t1.setAttribute("font-weight", "700");
    t1.setAttribute("font-family", "Segoe UI, system-ui, sans-serif");
    t1.textContent = node.label;
    g.appendChild(t1);

    const t2 = document.createElementNS(ns, "text");
    t2.setAttribute("x", node.x); t2.setAttribute("y", node.y + 11);
    t2.setAttribute("text-anchor", "middle");
    t2.setAttribute("dominant-baseline", "middle");
    t2.setAttribute("fill", node.tc);
    t2.setAttribute("font-size", "9");
    t2.setAttribute("opacity", "0.72");
    t2.setAttribute("font-family", "Segoe UI, system-ui, sans-serif");
    t2.textContent = node.sub;
    g.appendChild(t2);

    svg.appendChild(g);
  }
}
