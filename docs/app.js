// Renders the taxonomy from taxonomy.json. No build step, no framework.

const el = (id) => document.getElementById(id);
const treeBox = el("tree");

let DATA = null;
const state = { query: "", area: "", material: "" };

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
    `<span class="caret${hasKids ? "" : " leaf"}"></span>` +
    `<span class="num">${escapeHtml(node.id)}</span>` +
    `<span class="label">${highlight(node.title, state.query)}</span>` +
    (hasKids ? `<span class="count">${leafCount}</span>` : "");
  wrapper.appendChild(row);

  if (node.depth === 1 && node.output) {
    const out = document.createElement("p");
    out.className = "output";
    out.textContent = "output: " + node.output;
    wrapper.appendChild(out);
  }

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

function render() {
  const filtering = Boolean(state.query || state.area || state.material);
  const domains = DATA.tree.map(filterTree).filter(Boolean);

  // When filtering, open enough levels that the matches are visible.
  const openDepth = filtering ? 5 : 1;

  treeBox.innerHTML = "";
  domains.forEach((domain) => {
    const box = document.createElement("section");
    box.className = "domain";
    box.dataset.d = domain.id;
    box.appendChild(renderNode(domain, openDepth));
    treeBox.appendChild(box);
  });

  el("empty").hidden = domains.length > 0;

  const shown = domains.reduce((sum, d) => sum + countLeaves(d), 0);
  el("resultLine").textContent = filtering
    ? `${shown} of ${DATA.stats.leaves} workflows across ${domains.length} of ${DATA.stats.domains} domains`
    : `${DATA.stats.domains} domains, ${DATA.stats.leaves} workflows, ${DATA.stats.maxDepth} levels deep`;
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

function fillStats() {
  const s = DATA.stats;
  const rows = [
    ["Domains", s.domains],
    ["Workflows", s.leaves],
    ["Nodes", s.nodes],
    ["Levels", s.maxDepth],
  ];
  el("stats").innerHTML = rows
    .map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`)
    .join("");
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

// ---------- init ----------

fetch("taxonomy.json")
  .then((r) => {
    if (!r.ok) throw new Error(r.status);
    return r.json();
  })
  .then((data) => {
    DATA = data;
    fillStats();
    fillSelects();
    render();
  })
  .catch(() => {
    treeBox.innerHTML =
      '<p class="empty">Could not load taxonomy.json. If you opened this file directly, ' +
      "serve the folder over http instead, for example with python3 -m http.server.</p>";
  });
