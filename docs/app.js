// Renders the taxonomy from taxonomy.json. No build step, no framework.

const el = (id) => document.getElementById(id);
const treeBox = el("tree");

let DATA = null;
const state = { query: "", area: "", material: "", view: "map", path: [] };

// ---------- helpers ----------

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

function highlight(text, query) {
  const safe = escapeHtml(text);
  if (!query) return safe;
  const pattern = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return safe.replace(new RegExp(pattern, "ig"), (m) => `<mark>${m}</mark>`);
}

function matchesFilters(node) {
  if (state.area && !node.areas.includes(state.area) && !node.areas.includes("all")) return false;
  if (state.material && !node.materials.includes(state.material)) return false;
  if (state.query && !node.title.toLowerCase().includes(state.query)) return false;
  return true;
}

// A node is kept if it matches, or any descendant matches.
// Returns a filtered copy so the source data is never mutated.
function filterTree(node) {
  const kids = node.children.map(filterTree).filter(Boolean);
  if (kids.length || matchesFilters(node)) {
    return Object.assign({}, node, { children: kids, isHit: matchesFilters(node) });
  }
  return null;
}

function countLeaves(node) {
  if (!node.children.length) return 1;
  return node.children.reduce((sum, c) => sum + countLeaves(c), 0);
}

// ---------- rendering ----------

function renderNode(node, openDepth) {
  const hasKids = node.children.length > 0;
  const open = node.depth < openDepth;
  const wrapper = document.createElement("div");
  wrapper.className = `node l${node.depth}`;

  const row = document.createElement("button");
  row.type = "button";
  row.className = "row";
  if (hasKids) row.setAttribute("aria-expanded", String(open));
  else row.disabled = true;

  const leafCount = hasKids ? countLeaves(node) : 0;
  row.innerHTML =
    `<span class="num">${escapeHtml(node.id)}</span>` +
    `<span class="label">${highlight(node.title, state.query)}</span>` +
    (hasKids ? `<span class="count">${leafCount}</span>` : "");
  wrapper.appendChild(row);

  if (hasKids) {
    const kids = document.createElement("div");
    kids.className = "kids";
    kids.hidden = !open;
    node.children.forEach((child) => kids.appendChild(renderNode(child, openDepth)));
    wrapper.appendChild(kids);
    row.addEventListener("click", () => {
      const nowOpen = row.getAttribute("aria-expanded") !== "true";
      row.setAttribute("aria-expanded", String(nowOpen));
      kids.hidden = !nowOpen;
    });
  }

  return wrapper;
}

// ---------- map view ----------

const COLUMN_HEADS = ["Domain", "Branch", "Workflow", "Detail"];

function makeBox(node, level, isOpen) {
  const hasKids = node.children.length > 0;
  const box = document.createElement("button");
  box.type = "button";
  box.className = `box lvl${level}` + (hasKids ? "" : " is-leaf") + (isOpen ? " is-open" : "");
  box.setAttribute("aria-expanded", String(isOpen));

  const meta = hasKids
    ? `${countLeaves(node)} workflow${countLeaves(node) === 1 ? "" : "s"}`
    : "";
  box.innerHTML =
    `<span class="b-num">${escapeHtml(node.id)}</span>` +
    `<span class="b-title">${highlight(node.title, state.query)}</span>` +
    (meta ? `<span class="b-meta">${meta}</span>` : "") +
    (hasKids ? `<span class="b-arrow">›</span>` : "");
  return box;
}

function renderMap(domains) {
  const columns = el("columns");
  columns.innerHTML = "";
  if (!domains.length) return;

  // Walk the chosen path, building one column per level.
  let level = 0;
  let siblings = domains;
  let domainId = null;

  while (siblings && siblings.length) {
    const openId = state.path[level];
    const open = siblings.find((n) => n.id === openId) || null;

    const col = document.createElement("div");
    col.className = "col";
    if (domainId) col.dataset.d = domainId;

    const head = document.createElement("p");
    head.className = "col-head";
    head.textContent = COLUMN_HEADS[Math.min(level, COLUMN_HEADS.length - 1)];
    col.appendChild(head);

    const thisLevel = level;
    siblings.forEach((node) => {
      const box = makeBox(node, level + 1, open !== null && node.id === open.id);
      box.addEventListener("click", () => {
        const already = state.path[thisLevel] === node.id;
        state.path = state.path.slice(0, thisLevel);
        if (!already) state.path.push(node.id);
        renderMap(domains);
        const cols = el("columns");
        cols.scrollTo({ left: cols.scrollWidth, behavior: "smooth" });
      });
      col.appendChild(box);
    });

    columns.appendChild(col);

    if (!open) break;
    if (level === 0) {
      domainId = open.id;
      col.dataset.d = domainId;
      columns.querySelectorAll(".col")[0].dataset.d = domainId;
    }
    if (!open.children.length) break;
    siblings = open.children;
    level += 1;
  }
}

// ---------- render ----------

function render() {
  const filtering = Boolean(state.query || state.area || state.material);
  const domains = DATA.tree.map(filterTree).filter(Boolean);

  // A filtered-out branch must not stay selected.
  const stillValid = [];
  let level = domains;
  for (const id of state.path) {
    const found = (level || []).find((n) => n.id === id);
    if (!found) break;
    stillValid.push(id);
    level = found.children;
  }
  state.path = stillValid;

  if (state.view === "map") {
    renderMap(domains);
  } else {
    const openDepth = filtering ? 5 : 1;
    treeBox.innerHTML = "";
    domains.forEach((domain) => {
      const box = document.createElement("section");
      box.className = "domain";
      box.dataset.d = domain.id;
      box.appendChild(renderNode(domain, openDepth));
      treeBox.appendChild(box);
    });
  }

  el("empty").hidden = domains.length > 0;
}

function setView(view) {
  state.view = view;
  el("viewMap").classList.toggle("is-on", view === "map");
  el("viewList").classList.toggle("is-on", view === "list");
  el("viewMap").setAttribute("aria-pressed", String(view === "map"));
  el("viewList").setAttribute("aria-pressed", String(view === "list"));
  el("map").hidden = view !== "map";
  el("tree").hidden = view !== "list";
  el("expand").hidden = view !== "list";
  el("collapse").hidden = view !== "list";
  render();
}

function setAllOpen(open) {
  treeBox.querySelectorAll(".row[aria-expanded]").forEach((row) => {
    row.setAttribute("aria-expanded", String(open));
    const kids = row.parentElement.querySelector(":scope > .kids");
    if (kids) kids.hidden = !open;
  });
  // Keep domain headers themselves visible when collapsing.
  if (!open) {
    treeBox.querySelectorAll(".domain > .node > .row").forEach((row) => {
      row.setAttribute("aria-expanded", "false");
    });
  }
}

function fillSelects() {
  const used = { areas: new Set(), materials: new Set() };
  const walk = (n) => {
    n.areas.forEach((a) => used.areas.add(a));
    n.materials.forEach((m) => used.materials.add(m));
    n.children.forEach(walk);
  };
  DATA.tree.forEach(walk);

  const options = (set, labels) =>
    [...set]
      .filter((k) => k !== "all")
      .sort((a, b) => (labels[a] || a).localeCompare(labels[b] || b))
      .map((k) => `<option value="${k}">${escapeHtml(labels[k] || k)}</option>`)
      .join("");

  el("area").insertAdjacentHTML("beforeend", options(used.areas, DATA.areaLabels));
  el("material").insertAdjacentHTML("beforeend", options(used.materials, DATA.materialLabels));
}

// ---------- events ----------

let searchTimer;
el("search").addEventListener("input", (e) => {
  clearTimeout(searchTimer);
  const value = e.target.value.trim().toLowerCase();
  searchTimer = setTimeout(() => {
    state.query = value;
    render();
  }, 120);
});

el("area").addEventListener("change", (e) => {
  state.area = e.target.value;
  render();
});

el("material").addEventListener("change", (e) => {
  state.material = e.target.value;
  render();
});

el("expand").addEventListener("click", () => setAllOpen(true));
el("collapse").addEventListener("click", () => setAllOpen(false));
el("viewMap").addEventListener("click", () => setView("map"));
el("viewList").addEventListener("click", () => setView("list"));

// ---------- init ----------

fetch("taxonomy.json")
  .then((r) => {
    if (!r.ok) throw new Error(r.status);
    return r.json();
  })
  .then((data) => {
    DATA = data;
    fillSelects();
    setView("map");
  })
  .catch(() => {
    treeBox.innerHTML =
      '<p class="empty">Could not load taxonomy.json. If you opened this file directly, ' +
      "serve the folder over http instead, for example with python3 -m http.server.</p>";
  });
