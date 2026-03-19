// ── STATE ─────────────────────────────────────────────────────────────────
let state = {
  phase: "intro",
  qIndex: 0,
  answers: [],
  result: null,
};

// ── BOOTSTRAP HTML ────────────────────────────────────────────────────────
document.getElementById("app").innerHTML = `
<!-- INTRO -->
<div id="intro" class="screen active">
  <div class="intro-inner">
    <div class="intro-icons">⚖ ◈ ◉ ✦ ◑ ◬</div>
    <div class="intro-title">
      <h1>The Literary Soul</h1>
      <p class="sub">A personality portrait through existential literature</p>
      <p class="authors">Kafka · Nietzsche · Camus · Dostoevsky · Hesse · Sartre</p>
    </div>
    <div class="intro-blurb">
      <p>Ten situations. No correct answers. Each question is designed to make you pause — not because the choice is hard, but because it requires you to be honest about who you actually are, not who you intend to be.</p>
      <p>At the end: your archetype portrait + a downloadable SVG card you can share anywhere.</p>
    </div>
    <div id="archetype-grid" class="archetype-grid"></div>
    <div class="intro-btns">
      <button class="btn btn-primary" id="start-btn">Enter the Labyrinth</button>
      <button class="btn btn-ghost" id="intro-compare-btn">Compare Archetypes</button>
    </div>
  </div>
</div>

<!-- QUIZ -->
<div id="quiz" class="screen">
  <div class="quiz-inner">
    <div id="progress-bar" class="progress-bar"></div>
    <div id="quiz-body">
      <p id="q-label" class="q-label"></p>
      <div class="q-scenario"><p id="q-scenario-text"></p></div>
      <h2 id="q-question-text" class="q-question"></h2>
      <div id="choices" class="choices"></div>
    </div>
  </div>
</div>

<!-- RESULT -->
<div id="result" class="screen">
  <div id="result-hero" class="result-hero" style="position:relative;overflow:hidden;">
    <div id="result-hero-bg" style="position:absolute;inset:0;pointer-events:none;"></div>
    <div style="position:relative;z-index:1;">
      <div id="arc-icon" class="arc-icon"></div>
      <p id="arc-from" class="arc-from"></p>
      <h1 id="arc-name-h1"></h1>
      <p id="arc-subtitle-p" class="arc-subtitle"></p>
      <div class="result-btns">
        <button class="result-btn" id="share-btn">⬇ Download Card</button>
        <button class="result-btn" id="result-compare-btn">Compare</button>
        <button class="result-btn" id="retake-btn">Retake</button>
      </div>
    </div>
  </div>
  <div id="tabs" class="tabs">
    <button class="tab-btn active" data-tab="profile">Profile</button>
    <button class="tab-btn" data-tab="clash" id="clash-tab-btn">Resonances</button>
    <button class="tab-btn" data-tab="compat">Compatibility</button>
    <button class="tab-btn" data-tab="scores">Scores</button>
    <button class="tab-btn" data-tab="challenge">Challenge</button>
  </div>
  <div class="tab-content">
    <div id="tab-profile" class="tab-panel active"></div>
    <div id="tab-clash" class="tab-panel"></div>
    <div id="tab-compat" class="tab-panel"></div>
    <div id="tab-scores" class="tab-panel"></div>
    <div id="tab-challenge" class="tab-panel"></div>
  </div>
  <div class="result-footer"><p>The Literary Soul · Kafka · Nietzsche · Camus · Dostoevsky · Hesse · Sartre</p></div>
</div>

<!-- COMPARE MODAL -->
<div id="compare-modal" class="modal-overlay">
  <div class="modal-inner">
    <div class="modal-header">
      <h2>Compare Archetypes</h2>
      <button class="modal-close" id="compare-close">×</button>
    </div>
    <div class="compare-selects">
      <div class="compare-select-wrap">
        <p class="label-micro" style="color:#4a3a1a;">First</p>
        <select id="compare-select-a" class="compare-select"></select>
      </div>
      <div class="compare-select-wrap">
        <p class="label-micro" style="color:#4a3a1a;">Second</p>
        <select id="compare-select-b" class="compare-select"></select>
      </div>
    </div>
    <div id="compare-cards" class="compare-cards"></div>
    <div id="tension-box" class="tension-box" style="display:none;">
      <p class="label-micro" style="color:#8B6914;">Registered Tension</p>
      <h4 id="tension-title"></h4>
      <p id="tension-desc"></p>
    </div>
  </div>
</div>

<!-- SHARE MODAL -->
<div id="share-modal" class="share-modal">
  <div class="share-inner">
    <div class="share-header">
      <p>Your portrait card</p>
      <button class="modal-close" id="share-close">×</button>
    </div>
    <div id="share-preview" class="share-preview">
      <div id="share-preview-bg" class="grid-bg" style="position:absolute;inset:0;pointer-events:none;"></div>
      <div id="share-preview-inner" class="share-preview-inner"></div>
    </div>
    <button id="share-download-btn" class="share-download-btn">⬇ Download as SVG Image</button>
    <p class="share-tip">SVG files open in any browser, Figma, or image editor — and scale to any size without losing quality.</p>
  </div>
</div>
`;

// ── INIT ──────────────────────────────────────────────────────────────────
function init() {
  renderIntro();
  initCompareSelects();
  bindEvents();
}

function bindEvents() {
  // Intro
  el("start-btn").addEventListener("click", startQuiz);
  el("intro-compare-btn").addEventListener("click", () => el("compare-modal").classList.add("open"));

  // Compare modal
  el("compare-close").addEventListener("click", () => el("compare-modal").classList.remove("open"));
  el("compare-modal").addEventListener("click", e => { if (e.target === el("compare-modal")) el("compare-modal").classList.remove("open"); });

  // Share modal
  el("share-close").addEventListener("click", () => el("share-modal").classList.remove("open"));
  el("share-modal").addEventListener("click", e => { if (e.target === el("share-modal")) el("share-modal").classList.remove("open"); });
  el("share-download-btn").addEventListener("click", () => {
    if (!state.result) return;
    const arc = ARCHETYPES[state.result.primary];
    const secArc = ARCHETYPES[state.result.secondary];
    downloadSVG(arc, secArc, state.result.isClash);
    const btn = el("share-download-btn");
    btn.textContent = "✓ Downloaded to your device";
    btn.style.color = "#6aaa6a";
    btn.style.borderColor = "#4a7a4a";
    btn.style.background = "#1a2a1a";
    setTimeout(() => {
      btn.textContent = "⬇ Download as SVG Image";
      btn.style.color = arc.color;
      btn.style.borderColor = arc.color + "88";
      btn.style.background = "none";
    }, 2500);
  });
}

// ── QUIZ FLOW ─────────────────────────────────────────────────────────────
function startQuiz() {
  state = { phase: "quiz", qIndex: 0, answers: [], result: null };
  showScreen("quiz");
  renderQuestion(QUESTIONS[0], 0, QUESTIONS.length, choose);
}

function choose(choice) {
  const btns = $$(".choice-btn");
  btns.forEach(b => {
    if (b.textContent === choice.text) b.classList.add("selected");
    else b.classList.add("fade");
  });
  const body = el("quiz-body");
  body.classList.add("quiz-fade");

  setTimeout(() => {
    state.answers.push(choice);
    if (state.qIndex + 1 < QUESTIONS.length) {
      state.qIndex++;
      body.classList.remove("quiz-fade");
      renderQuestion(QUESTIONS[state.qIndex], state.qIndex, QUESTIONS.length, choose);
      // force reflow
      void body.offsetHeight;
    } else {
      state.result = computeResult(state.answers);
      showResult();
    }
  }, 500);
}

// ── RESULT ────────────────────────────────────────────────────────────────
function showResult() {
  showScreen("result");
  const { result } = state;
  const arc = ARCHETYPES[result.primary];
  const secArc = ARCHETYPES[result.secondary];
  const terArc = ARCHETYPES[result.tertiary];

  applyArcTheme(arc);
  renderTabBtns(arc);
  renderProfile(arc);
  renderClash(arc, secArc, result);
  renderCompat(arc, result.primary);
  renderScores(result);
  renderChallenge(arc, secArc, terArc);

  // Result buttons
  el("share-btn").style.borderColor = arc.color + "99";
  el("share-btn").style.color = arc.color;
  el("result-compare-btn").style.borderColor = arc.color + "44";
  el("result-compare-btn").style.color = arc.color;
  el("retake-btn").style.borderColor = arc.color + "44";
  el("retake-btn").style.color = arc.color;

  el("share-btn").onclick = () => {
    renderSharePreview(arc, secArc, result.isClash);
    el("share-modal").classList.add("open");
  };
  el("result-compare-btn").onclick = () => el("compare-modal").classList.add("open");
  el("retake-btn").onclick = () => {
    state = { phase: "intro", qIndex: 0, answers: [], result: null };
    showScreen("intro");
  };
}

// ── GO ────────────────────────────────────────────────────────────────────
init();
