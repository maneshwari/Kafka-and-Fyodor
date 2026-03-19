// ── DOM HELPERS ───────────────────────────────────────────────────────────
const el = id => document.getElementById(id);
const $ = (sel, ctx) => (ctx || document).querySelector(sel);
const $$ = (sel, ctx) => [...(ctx || document).querySelectorAll(sel)];
const make = (tag, props = {}, ...children) => {
  const e = document.createElement(tag);
  Object.entries(props).forEach(([k, v]) => {
    if (k === "class") e.className = v;
    else if (k === "style") Object.assign(e.style, v);
    else if (k.startsWith("on")) e.addEventListener(k.slice(2), v);
    else e.setAttribute(k, v);
  });
  children.forEach(c => { if (c != null) e.append(typeof c === "string" ? c : c); });
  return e;
};

// ── SCREENS ───────────────────────────────────────────────────────────────
function showScreen(id) {
  $$(".screen").forEach(s => s.classList.remove("active"));
  el(id).classList.add("active");
  window.scrollTo(0, 0);
}

// ── INTRO ─────────────────────────────────────────────────────────────────
function renderIntro() {
  const authorColors = { Kafka:"#A0845C", Nietzsche:"#c4882a", Camus:"#6a9a9a", Dostoevsky:"#8B3A3A", Hesse:"#7a8a5a", Sartre:"#6a7a4a" };
  const grid = el("archetype-grid");
  grid.innerHTML = "";
  Object.entries(authorColors).forEach(([author, color]) => {
    const arcs = Object.values(ARCHETYPES).filter(a => a.author === author);
    const tile = make("div", { class: "archetype-tile", style: { borderColor: color + "44", borderTopColor: color + "88" } },
      make("div", { class: "author-label", style: { color } }, author),
      ...arcs.map(a => make("p", { class: "arc-name" }, `${a.icon} ${a.name}`))
    );
    grid.appendChild(tile);
  });
}

// ── QUIZ ──────────────────────────────────────────────────────────────────
function renderProgress(total, current) {
  const bar = el("progress-bar");
  bar.innerHTML = "";
  for (let i = 0; i < total; i++) {
    const pip = make("div", { class: "progress-pip" });
    pip.style.width = i < current ? "28px" : i === current ? "16px" : "8px";
    if (i < current) pip.classList.add("done");
    else if (i === current) pip.classList.add("current");
    bar.appendChild(pip);
  }
}

function renderQuestion(q, qIndex, total, onChoose) {
  el("q-label").textContent = `Situation ${qIndex + 1} of ${total}`;
  el("q-scenario-text").textContent = q.scenario;
  el("q-question-text").textContent = q.question;
  const choices = el("choices");
  choices.innerHTML = "";
  q.choices.forEach(choice => {
    const btn = make("button", { class: "choice-btn", onclick: () => onChoose(choice) }, choice.text);
    choices.appendChild(btn);
  });
  renderProgress(total, qIndex);
}

// ── RESULT ────────────────────────────────────────────────────────────────
function applyArcTheme(arc) {
  const result = el("result");
  result.style.background = arc.bg;
  const hero = el("result-hero");
  hero.style.borderBottomColor = arc.color + "22";
  el("result-hero-bg").style.backgroundImage = `repeating-linear-gradient(0deg,transparent,transparent 41px,${arc.color}08 41px,${arc.color}08 42px),repeating-linear-gradient(90deg,transparent,transparent 41px,${arc.color}08 41px,${arc.color}08 42px)`;
  el("arc-icon").textContent = arc.icon;
  el("arc-from").textContent = `${arc.author} — ${arc.work}`;
  el("arc-from").style.color = arc.color;
  el("arc-name-h1").textContent = arc.name;
  el("arc-subtitle-p").textContent = arc.subtitle;
  el("arc-subtitle-p").style.color = arc.color + "bb";
  el("tabs").style.borderBottomColor = arc.color + "18";
}

function renderTabBtns(arc) {
  $$(".tab-btn").forEach(btn => {
    btn.style.color = btn.classList.contains("active") ? arc.color : "#3a2a0e";
    btn.addEventListener("click", () => {
      $$(".tab-btn").forEach(b => { b.classList.remove("active"); b.style.color = "#3a2a0e"; });
      $$(".tab-panel").forEach(p => p.classList.remove("active"));
      btn.classList.add("active"); btn.style.color = arc.color;
      el(`tab-${btn.dataset.tab}`).classList.add("active");
    });
  });
}

function renderProfile(arc) {
  const panel = el("tab-profile");
  panel.innerHTML = "";
  const summaryBox = make("div", { class: "card-box", style: { borderColor: arc.color + "22", borderLeftColor: arc.color, background: "#ffffff08" } },
    make("p", { style: { color: "#c8b880", lineHeight: "1.8" } }, arc.summary)
  );
  panel.appendChild(summaryBox);
  arc.traits.forEach(trait => {
    const row = make("div", { class: "trait-row", style: { borderBottomColor: arc.color + "15" } },
      make("p", { class: "label-micro", style: { color: arc.color } }, trait.label),
      make("p", { style: { color: "#9a8a6a", lineHeight: "1.7" } }, trait.value)
    );
    panel.appendChild(row);
  });
  const quoteBox = make("div", { class: "quote-box", style: { borderColor: arc.color + "22" } },
    make("p", {}, `"${arc.quote}"`),
    make("p", { class: "q-author", style: { color: arc.color } }, arc.author)
  );
  panel.appendChild(quoteBox);
}

function renderClash(arc, secArc, result) {
  const panel = el("tab-clash");
  panel.innerHTML = "";
  // update tab label
  const clashTab = $('[data-tab="clash"]');
  if (clashTab) clashTab.textContent = result.isClash ? "⚡ Divided" : "Resonances";

  if (result.isClash) {
    const banner = make("div", { class: "clash-banner" },
      make("p", { class: "label-micro" }, "⚡ Divided Soul Detected"),
      make("p", {}, "Your answers didn't converge cleanly on one archetype. The gap between your primary and secondary was narrow — meaning you genuinely inhabit more than one of these worlds. This is not weakness. It is complexity.")
    );
    panel.appendChild(banner);
    if (result.clashData) {
      const clashDesc = make("div", { style: { background: "#120e08", border: "1px solid #2a1e0e", padding: "1.5rem", marginBottom: "1.5rem", borderRadius: "2px" } },
        make("p", { style: { color: "#c8b880", marginBottom: ".4rem" } }, result.clashData.title),
        make("p", { style: { color: "#7a6a45", lineHeight: "1.7", fontSize: ".9rem" } }, result.clashData.description)
      );
      panel.appendChild(clashDesc);
    }
    const pair = make("div", { class: "clash-pair" });
    [arc, secArc].forEach((a, i) => {
      const card = make("div", { class: "mini-arc-card", style: { background: a.bg, borderColor: a.color + "33", borderTopColor: a.color } },
        make("div", { style: { fontSize: "1.5rem", marginBottom: ".5rem" } }, a.icon),
        make("p", { class: "label-micro", style: { color: a.color } }, i === 0 ? "Primary" : "Secondary"),
        make("h3", {}, a.name),
        make("p", { class: "sub", style: { color: a.color + "88" } }, a.subtitle),
        make("p", { class: "desc" }, a.summary.substring(0, 150) + "…")
      );
      pair.appendChild(card);
    });
    panel.appendChild(pair);
  } else {
    panel.appendChild(make("p", { style: { color: "#7a6a45", fontStyle: "italic", marginBottom: "1.5rem", lineHeight: "1.7" } },
      `Your answers aligned clearly with ${arc.name}. Below are the archetypes that stand in tension with yours — and those that share your resonance.`
    ));
    panel.appendChild(make("p", { class: "label-micro", style: { color: "#4a3a1a", marginBottom: ".75rem" } }, "In Tension With You"));
    arc.tensions.forEach(id => {
      const ta = ARCHETYPES[id];
      const card = make("div", { style: { background: ta.bg, border: `1px solid ${ta.color}33`, borderLeft: `2px solid ${ta.color}`, padding: "1rem", marginBottom: ".75rem", borderRadius: "2px" } },
        make("p", { class: "label-micro", style: { color: ta.color } }, ta.author),
        make("p", { style: { color: "#c8b880", marginBottom: ".3rem" } }, `${ta.icon} ${ta.name} — ${ta.subtitle}`),
        make("p", { style: { color: "#5a4a2a", fontSize: ".82rem", lineHeight: "1.5" } }, ta.summary.substring(0, 130) + "…")
      );
      panel.appendChild(card);
    });
    panel.appendChild(make("p", { class: "label-micro", style: { color: "#4a3a1a", margin: "1.5rem 0 .75rem" } }, "Shares Your Resonance"));
    arc.affinities.forEach(id => {
      const ta = ARCHETYPES[id];
      const card = make("div", { style: { background: ta.bg, border: `1px solid ${ta.color}33`, borderLeft: `2px solid ${ta.color}`, padding: "1rem", marginBottom: ".75rem", borderRadius: "2px" } },
        make("p", { class: "label-micro", style: { color: ta.color } }, ta.author),
        make("p", { style: { color: "#c8b880", marginBottom: ".3rem" } }, `${ta.icon} ${ta.name} — ${ta.subtitle}`),
        make("p", { style: { color: "#5a4a2a", fontSize: ".82rem", lineHeight: "1.5" } }, ta.summary.substring(0, 130) + "…")
      );
      panel.appendChild(card);
    });
  }
}

function renderCompat(arc, primaryId) {
  const panel = el("tab-compat");
  panel.innerHTML = "";
  panel.appendChild(make("p", { style: { color: "#7a6a45", fontStyle: "italic", marginBottom: ".5rem", lineHeight: "1.7", fontSize: ".9rem" } },
    `How ${arc.name} relates to every other archetype — not as a personality test, but as a philosophical diagnosis of what each pairing produces.`
  ));
  const legend = make("div", { class: "compat-legend" });
  Object.entries(COMPAT_STATUS).forEach(([, s]) => {
    legend.appendChild(make("div", { class: "compat-legend-item", style: { borderColor: s.color + "33" } },
      make("span", { style: { color: s.color } }, s.symbol),
      make("span", { style: { color: s.color } }, s.label)
    ));
  });
  panel.appendChild(legend);
  const list = make("div", { class: "compat-list" });
  Object.keys(ARCHETYPES)
    .filter(id => id !== primaryId)
    .sort((a, b) => (getCompatibility(primaryId, b)?.score || 0) - (getCompatibility(primaryId, a)?.score || 0))
    .forEach(id => {
      const other = ARCHETYPES[id];
      const compat = getCompatibility(primaryId, id);
      const statusKey = getCompatStatus(compat.score);
      const status = COMPAT_STATUS[statusKey];
      const card = make("div", { class: "compat-card", style: { borderColor: "#1e1608", borderLeftColor: status.color } });
      const header = make("div", { class: "compat-card-header" },
        make("span", { class: "compat-card-icon", style: { color: other.color } }, other.icon),
        make("div", { class: "compat-card-meta" },
          make("div", {},
            make("span", { class: "compat-card-name" }, other.name),
            make("span", { class: "compat-card-author" }, other.author)
          ),
          make("div", { class: "compat-bar-wrap" },
            make("div", { class: "compat-bar", style: { width: `${compat.score}%`, background: status.color } })
          )
        ),
        make("div", { class: "compat-card-right" },
          make("span", { class: "compat-status-label", style: { color: status.color } }, `${status.symbol} ${status.label}`),
          make("span", { class: "compat-score-num", style: { color: status.color } }, String(compat.score))
        ),
        make("span", { class: "compat-chevron" }, "▾")
      );
      const body = make("div", { class: "compat-card-body", style: { borderTopColor: other.color + "22" } },
        make("span", { class: "compat-badge", style: { borderColor: status.color + "44", color: status.color } }, status.label.toUpperCase()),
        make("span", { style: { color: "#4a3a1a", fontSize: ".75rem", fontStyle: "italic", marginLeft: ".5rem" } }, status.desc),
        make("p", { class: "compat-note", style: { marginTop: ".5rem" } }, compat.note),
        make("div", { class: "compat-divider" },
          make("div", { class: "compat-divider-line", style: { background: other.color + "22" } }),
          make("span", { class: "compat-divider-text" }, `${arc.name.toUpperCase()} × ${other.name.toUpperCase()}`),
          make("div", { class: "compat-divider-line", style: { background: other.color + "22" } })
        )
      );
      card.appendChild(header);
      card.appendChild(body);
      card.addEventListener("click", () => card.classList.toggle("open"));
      list.appendChild(card);
    });
  panel.appendChild(list);
}

function renderScores(result) {
  const panel = el("tab-scores");
  panel.innerHTML = "";
  panel.appendChild(make("p", { style: { color: "#5a4a2a", fontStyle: "italic", marginBottom: "1.5rem", fontSize: ".9rem", lineHeight: "1.7" } },
    "Every archetype contains something true about you. The question is proportion — and what the distribution reveals about where your weight actually sits."
  ));
  result.sorted.forEach(([id, score], i) => {
    const a = ARCHETYPES[id];
    const pct = result.sorted[0][1] > 0 ? (score / result.sorted[0][1]) * 100 : 0;
    const row = make("div", { class: "score-row" },
      make("div", { class: "score-row-header" },
        make("div", { class: "score-row-left" },
          make("span", { style: { color: a.color } }, a.icon),
          make("span", { class: "score-row-name", style: { color: i === 0 ? "#e8d5a3" : "#6a5a35" } }, a.name),
          make("span", { class: "score-row-author" }, a.author)
        ),
        make("span", { class: "score-row-num", style: { color: i === 0 ? a.color : "#3a2a0e" } }, String(score))
      ),
      make("div", { class: "score-bar-wrap" },
        make("div", { class: "score-bar", style: { width: `${pct}%`, background: a.color, opacity: i === 0 ? "1" : "0.35" } })
      )
    );
    panel.appendChild(row);
  });
}

function renderChallenge(arc, secArc, terArc) {
  const panel = el("tab-challenge");
  panel.innerHTML = "";
  panel.appendChild(make("div", { class: "challenge-box", style: { borderColor: arc.color + "44", borderLeftColor: arc.color, background: arc.color + "11" } },
    make("p", { class: "label-micro", style: { color: arc.color } }, "Your Challenge"),
    make("p", {}, arc.challenge)
  ));
  panel.appendChild(make("p", { class: "label-micro", style: { color: "#3a2a0e", marginBottom: "1rem" } }, "Recommended Reading"));
  const readingWrap = make("div", { class: "reading-list" });
  [...new Set([arc.author, secArc?.author])].filter(Boolean).forEach(author => {
    Object.values(ARCHETYPES).filter(a => a.author === author).forEach(a => {
      readingWrap.appendChild(make("div", { class: "reading-item" },
        make("span", { style: { color: { Kafka:"#A0845C",Nietzsche:"#c4882a",Camus:"#6a9a9a",Dostoevsky:"#8B3A3A",Hesse:"#7a8a5a",Sartre:"#6a7a4a" }[author] } }, a.icon),
        make("span", { class: "work" }, a.work),
        make("span", { class: "author" }, `— ${a.author}`)
      ));
    });
  });
  panel.appendChild(readingWrap);
  const resonance = make("div", { class: "resonance-box" },
    make("p", { class: "label-micro" }, "Also resonating in you"),
    make("div", { class: "resonance-tags" },
      ...[secArc, terArc].filter(Boolean).map(a =>
        make("span", { class: "resonance-tag", style: { borderColor: a.color + "44", color: a.color } }, `${a.icon} ${a.name}`)
      )
    )
  );
  panel.appendChild(resonance);
}

// ── COMPARE MODAL ──────────────────────────────────────────────────────────
function buildCompareOptions() {
  const opts = Object.values(ARCHETYPES).map(a =>
    make("option", { value: a.id, style: { background: "#120e08", color: "#c8b880" } }, `${a.icon} ${a.name} (${a.author})`)
  );
  return opts;
}

function renderCompareCards(idA, idB) {
  const arcA = ARCHETYPES[idA], arcB = ARCHETYPES[idB];
  const container = el("compare-cards");
  container.innerHTML = "";
  [arcA, arcB].forEach(arc => {
    const card = make("div", { class: "compare-arc-card", style: { background: arc.bg, borderColor: arc.color + "33", borderTopColor: arc.color } },
      make("div", { class: "arc-icon-big" }, arc.icon),
      make("p", { class: "from", style: { color: arc.color } }, arc.author),
      make("h3", {}, arc.name),
      make("p", { class: "sub", style: { color: arc.color + "88" } }, arc.subtitle),
      ...arc.traits.map(t => make("div", { class: "compare-trait" },
        make("p", { class: "label-micro", style: { color: arc.color } }, t.label),
        make("p", {}, t.value)
      ))
    );
    container.appendChild(card);
  });
  const clashData = CLASHES[`${idA}-${idB}`] || CLASHES[`${idB}-${idA}`];
  const tensionEl = el("tension-box");
  if (clashData) {
    tensionEl.style.display = "block";
    el("tension-title").textContent = clashData.title;
    el("tension-desc").textContent = clashData.description;
  } else {
    tensionEl.style.display = "none";
  }
  // update select border colors
  el("compare-select-a").style.borderColor = arcA.color + "44";
  el("compare-select-a").style.color = arcA.color;
  el("compare-select-b").style.borderColor = arcB.color + "44";
  el("compare-select-b").style.color = arcB.color;
}

function initCompareSelects() {
  const selA = el("compare-select-a");
  const selB = el("compare-select-b");
  buildCompareOptions().forEach(o => selA.appendChild(o.cloneNode(true)));
  buildCompareOptions().forEach(o => selB.appendChild(o.cloneNode(true)));
  selA.value = "JOSEF_K"; selB.value = "RASKOLNIKOV";
  renderCompareCards("JOSEF_K", "RASKOLNIKOV");
  selA.addEventListener("change", () => renderCompareCards(selA.value, selB.value));
  selB.addEventListener("change", () => renderCompareCards(selA.value, selB.value));
}

// ── SHARE PREVIEW ──────────────────────────────────────────────────────────
function renderSharePreview(arc, secArc, isClash) {
  const preview = el("share-preview");
  preview.style.background = `linear-gradient(135deg, ${arc.bg} 0%, ${arc.bg}dd 100%)`;
  preview.style.borderLeftColor = arc.color;
  preview.style.borderColor = arc.color + "33";
  el("share-preview-bg").style.backgroundImage = `repeating-linear-gradient(0deg,transparent,transparent 41px,${arc.color}08 41px,${arc.color}08 42px),repeating-linear-gradient(90deg,transparent,transparent 41px,${arc.color}08 41px,${arc.color}08 42px)`;
  const inner = el("share-preview-inner");
  const shadowTrait = arc.traits.find(t => t.label === "Shadow Self")?.value || "";
  inner.innerHTML = "";
  inner.appendChild(make("p", { style: { margin: "0 0 .2rem", fontSize: ".6rem", letterSpacing: ".2em", color: arc.color, textTransform: "uppercase", fontFamily: "'Courier New',monospace" } }, `${arc.author} — ${arc.work}`));
  const nameRow = make("div", { style: { display: "flex", alignItems: "baseline", gap: ".75rem", marginBottom: ".2rem" } },
    make("h2", { style: { margin: "0", fontSize: "2.2rem", fontWeight: "400", color: "#e8d5a3", lineHeight: "1.1" } }, arc.name),
    make("span", { style: { fontSize: "1.8rem", color: arc.color, opacity: ".4" } }, arc.icon)
  );
  inner.appendChild(nameRow);
  inner.appendChild(make("p", { style: { margin: "0 0 1rem", fontStyle: "italic", color: arc.color + "99", fontSize: ".9rem" } }, arc.subtitle));
  inner.appendChild(make("p", { style: { margin: "0 0 1rem", color: "#8a7a5a", lineHeight: "1.7", fontSize: ".82rem" } }, arc.summary));
  inner.appendChild(make("div", { style: { borderTop: `1px solid ${arc.color}22`, paddingTop: ".75rem", marginBottom: ".75rem" } },
    make("p", { style: { margin: "0 0 .25rem", fontSize: ".58rem", letterSpacing: ".15em", color: arc.color, textTransform: "uppercase", fontFamily: "'Courier New',monospace" } }, "Shadow Self"),
    make("p", { style: { margin: "0", color: "#5a4a2a", fontStyle: "italic", fontSize: ".8rem", lineHeight: "1.6" } }, shadowTrait)
  ));
  inner.appendChild(make("div", { style: { background: arc.color + "10", border: `1px solid ${arc.color}22`, padding: ".75rem", borderRadius: "2px", marginBottom: "1rem" } },
    make("p", { style: { margin: "0", color: "#6a5a35", fontStyle: "italic", fontSize: ".8rem", lineHeight: "1.6" } }, `"${arc.quote}"`)
  ));
  const footer = make("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } },
    make("div", { style: { display: "flex", alignItems: "center", gap: ".5rem" } },
      make("span", { style: { fontSize: ".58rem", letterSpacing: ".1em", color: "#2a1e0e", fontFamily: "'Courier New',monospace" } }, "RESONATES WITH"),
      make("span", { style: { border: `1px solid ${secArc.color}44`, color: secArc.color, padding: ".15rem .5rem", fontSize: ".7rem", borderRadius: "2px" } }, `${secArc.icon} ${secArc.name}`),
      isClash ? make("span", { style: { color: "#A0845C", fontSize: ".7rem" } }, "⚡ Divided") : null
    ),
    make("span", { style: { fontSize: ".58rem", letterSpacing: ".12em", color: "#2a1e0e", fontFamily: "'Courier New',monospace" } }, "THE LITERARY SOUL")
  );
  inner.appendChild(footer);
  // Download btn
  const dlBtn = el("share-download-btn");
  dlBtn.style.borderColor = arc.color + "88";
  dlBtn.style.color = arc.color;
}
