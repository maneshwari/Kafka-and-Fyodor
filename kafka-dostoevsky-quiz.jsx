import { useState, useEffect } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const questions = [
  {
    id: 1,
    scenario: "You receive a letter. It contains no sender's address, no explanation — only your name and a time to appear at an unmarked building downtown.",
    question: "What do you do?",
    choices: [
      { text: "Go. Curiosity and duty pull equally — you need to know.", traits: { K: 3, D: 1, rebel: 1, seeker: 2 } },
      { text: "Ignore it. If it were important, they'd explain themselves.", traits: { K: 1, D: 1, rebel: 3, seeker: 0 } },
      { text: "Investigate obsessively — who sent this, what do they want, why me?", traits: { K: 2, D: 2, rebel: 0, seeker: 3 } },
      { text: "Go, but with dread. You feel somehow already guilty.", traits: { K: 4, D: 0, rebel: 0, seeker: 1 } },
    ],
  },
  {
    id: 2,
    scenario: "A close friend confesses they did something morally wrong — not illegal, but a betrayal of someone's trust. They ask you to keep it secret.",
    question: "What does your conscience demand?",
    choices: [
      { text: "Keep the secret. Loyalty to a person matters more than abstract morality.", traits: { K: 1, D: 2, rebel: 2, seeker: 1 } },
      { text: "You can't promise — the weight of knowing would crush you.", traits: { K: 2, D: 3, rebel: 0, seeker: 2 } },
      { text: "Keep it, but it changes how you see them. You carry it alone.", traits: { K: 3, D: 1, rebel: 0, seeker: 1 } },
      { text: "Tell them they must confess themselves — suffering through that is the only honest path.", traits: { K: 0, D: 4, rebel: 1, seeker: 2 } },
    ],
  },
  {
    id: 3,
    scenario: "You've worked for three years on a project. The day before it's finished, your manager cancels it with no explanation and reassigns you to something trivial.",
    question: "What do you feel — and what do you do?",
    choices: [
      { text: "Quiet fury. You comply, but something inside you calcifies.", traits: { K: 4, D: 0, rebel: 1, seeker: 0 } },
      { text: "Explode — demand an explanation, risk the consequences.", traits: { K: 0, D: 2, rebel: 4, seeker: 1 } },
      { text: "A strange relief. The project was becoming an obsession anyway.", traits: { K: 2, D: 1, rebel: 0, seeker: 3 } },
      { text: "Deep grief, as if something died. You mourn it privately.", traits: { K: 1, D: 3, rebel: 0, seeker: 2 } },
    ],
  },
  {
    id: 4,
    scenario: "You are offered complete security — a guaranteed income, stable relationships, predictable days — in exchange for giving up your most ambitious dream.",
    question: "Do you take it?",
    choices: [
      { text: "Yes. The dream was probably an illusion. Stability is real.", traits: { K: 2, D: 1, rebel: 0, seeker: 0 } },
      { text: "No. A life without the dream isn't a life — it's a sentence.", traits: { K: 0, D: 3, rebel: 3, seeker: 2 } },
      { text: "You'd want to say no, but you'd probably say yes. And hate yourself for it.", traits: { K: 3, D: 2, rebel: 0, seeker: 1 } },
      { text: "Reject it — then spend years wondering if you were just afraid of comfort.", traits: { K: 1, D: 2, rebel: 2, seeker: 3 } },
    ],
  },
  {
    id: 5,
    scenario: "Someone you love is suffering. They don't want help — they want to suffer through it alone. You believe your presence would ease their pain.",
    question: "What do you do?",
    choices: [
      { text: "Respect their wish. Their suffering is theirs. You stay away.", traits: { K: 2, D: 0, rebel: 2, seeker: 2 } },
      { text: "Stay close anyway. Love overrides their stated preference.", traits: { K: 0, D: 4, rebel: 1, seeker: 1 } },
      { text: "Leave, but it breaks something in you. The distance feels like abandonment.", traits: { K: 3, D: 2, rebel: 0, seeker: 1 } },
      { text: "Ask again. Push. Their 'no' might be pride, not a real wish.", traits: { K: 1, D: 3, rebel: 2, seeker: 2 } },
    ],
  },
  {
    id: 6,
    scenario: "Late at night, you find yourself genuinely uncertain whether your life has meaning — not in a crisis way, but as a clear-eyed, calm observation.",
    question: "How do you sit with that?",
    choices: [
      { text: "Meaning is something you build, not find. Back to work tomorrow.", traits: { K: 1, D: 0, rebel: 3, seeker: 2 } },
      { text: "The uncertainty itself feels important. You stay with it, unsettled.", traits: { K: 2, D: 2, rebel: 0, seeker: 3 } },
      { text: "It frightens you. You reach for something — prayer, a person, a belief.", traits: { K: 0, D: 4, rebel: 0, seeker: 2 } },
      { text: "You've thought this before. You've learned to keep moving anyway.", traits: { K: 3, D: 1, rebel: 1, seeker: 1 } },
    ],
  },
  {
    id: 7,
    scenario: "You discover that a rule everyone follows — at work, in society — is arbitrary and serves no one. You are the only one who sees this.",
    question: "What do you do with that knowledge?",
    choices: [
      { text: "Say nothing. Knowing the cage is a cage doesn't open it.", traits: { K: 4, D: 0, rebel: 0, seeker: 1 } },
      { text: "Tell people. Someone has to name it, even if they don't listen.", traits: { K: 0, D: 2, rebel: 4, seeker: 2 } },
      { text: "Quietly stop following the rule. Don't announce it.", traits: { K: 1, D: 1, rebel: 3, seeker: 2 } },
      { text: "Write it down. Document it. Even if no one reads it, it must be recorded.", traits: { K: 2, D: 3, rebel: 1, seeker: 3 } },
    ],
  },
  {
    id: 8,
    scenario: "You have wronged someone — meaningfully, not trivially. They don't know. They never will, unless you tell them.",
    question: "Do you confess?",
    choices: [
      { text: "No. Confession serves your conscience, not them. Carry it quietly.", traits: { K: 3, D: 0, rebel: 1, seeker: 1 } },
      { text: "Yes — the guilt is worse than any consequence. You must be seen.", traits: { K: 0, D: 4, rebel: 0, seeker: 2 } },
      { text: "You want to, but you don't. You live with that wanting.", traits: { K: 2, D: 2, rebel: 0, seeker: 1 } },
      { text: "Make it right without confessing — repair without disclosure.", traits: { K: 1, D: 1, rebel: 2, seeker: 3 } },
    ],
  },
];

const archetypes = {
  JOSEF_K: {
    name: "Josef K.",
    subtitle: "The Accused",
    source: "Kafka — The Trial",
    color: "#8B6914",
    bg: "#1a1208",
    accent: "#c49a2a",
    icon: "⚖",
    summary: "You move through the world with a persistent, low-grade sense that something is required of you — but no one will say what. You comply without knowing why. You resist without knowing how. You are precise, anxious, and quietly furious at systems you cannot name.",
    traits: [
      { label: "Behavioural Pattern", value: "You operate inside structures even when you resent them. Rule-following isn't comfort — it's strategy." },
      { label: "Core Fear", value: "Being found guilty of something you didn't do — or worse, something you did without knowing it." },
      { label: "Hidden Strength", value: "You notice what others miss. The absurdity others accept without question strikes you as intolerable." },
      { label: "Relationship Style", value: "You attract people with your seriousness but keep them at a careful distance. Intimacy feels like exposure." },
      { label: "Shadow Self", value: "Paralysis dressed as deliberation. You think so long about the right move that the moment passes." },
    ],
    kafkaQuote: "Someone must have slandered Josef K., for one morning, without having done anything wrong, he was arrested.",
    challenge: "The system will not explain itself. Your task is to live well inside the inexplicable — not to solve it.",
  },
  RASKOLNIKOV: {
    name: "Raskolnikov",
    subtitle: "The Transgressor",
    source: "Dostoevsky — Crime and Punishment",
    color: "#8B3A3A",
    bg: "#150a0a",
    accent: "#c45a5a",
    icon: "✦",
    summary: "You believe — deeply and perhaps rightly — that you are capable of more than the world allows you to express. This creates a dangerous pressure. You theorize your way into positions that feel liberating and are quietly devastating. Your suffering is real. So is your pride.",
    traits: [
      { label: "Behavioural Pattern", value: "You construct elaborate justifications for what you already want to do. The theory comes after the desire." },
      { label: "Core Fear", value: "Mediocrity. Being ordinary. Spending your capacities on things unworthy of them." },
      { label: "Hidden Strength", value: "Ferocious intellectual honesty — when you finally turn it on yourself. You can see through your own rationalizations, eventually." },
      { label: "Relationship Style", value: "Intense, asymmetric. You need people who can handle your full weight — and there are very few of them." },
      { label: "Shadow Self", value: "The 'extraordinary man' theory. You know it's flawed. You believe it anyway." },
    ],
    kafkaQuote: "Pain and suffering are always inevitable for a large intelligence and a deep heart.",
    challenge: "Your intelligence is not a license. The question isn't whether you're capable of great things — it's whether you can bear to be human while doing them.",
  },
  UNDERGROUND_MAN: {
    name: "The Underground Man",
    subtitle: "The Hyper-Conscious",
    source: "Dostoevsky — Notes from Underground",
    color: "#5A5A8B",
    bg: "#0c0c15",
    accent: "#7a7aaa",
    icon: "⬡",
    summary: "You see too clearly. Every social norm, every comfortable lie, every false cheerfulness — you see through it. And the seeing paralyzes you. You know what people are doing and why. You know what you're doing and why. The knowledge doesn't help. It may be making things worse.",
    traits: [
      { label: "Behavioural Pattern", value: "Hyper-analysis that loops back on itself. You can argue any position — including against your own deepest desires." },
      { label: "Core Fear", value: "Being reduced to a formula. Being predicted. Being just another 'piano key' in someone's rational system." },
      { label: "Hidden Strength", value: "Radical honesty — at least internally. You won't lie to yourself, even when lying would be more comfortable." },
      { label: "Relationship Style", value: "You oscillate between craving connection and pushing it away with a kind of compulsive spite." },
      { label: "Shadow Self", value: "Spite as philosophy. You sometimes act against your own interests just to prove you can." },
    ],
    kafkaQuote: "I am a sick man. I am a spiteful man. I am an unattractive man. I think my liver hurts.",
    challenge: "Awareness without action is its own kind of cowardice. The Underground Man knows everything — and does nothing. The exit is not more thinking.",
  },
  GREGOR: {
    name: "Gregor Samsa",
    subtitle: "The Transformed",
    source: "Kafka — The Metamorphosis",
    color: "#4a7a4a",
    bg: "#0a150a",
    accent: "#6aaa6a",
    icon: "◈",
    summary: "You have, at some point, felt yourself become unrecognizable — to others, or to yourself. You function. You provide. But somewhere the person doing those things became separate from the person watching them. You carry others. You rarely ask to be carried.",
    traits: [
      { label: "Behavioural Pattern", value: "Self-erasure through service. You define yourself through your usefulness, which makes you fragile when you cannot be useful." },
      { label: "Core Fear", value: "That without your function — your productivity, your role — you have no claim on love." },
      { label: "Hidden Strength", value: "A capacity for endurance that borders on the profound. You absorb what would break others, quietly." },
      { label: "Relationship Style", value: "You give more than you take, and you resent it less than you should. This confuses people." },
      { label: "Shadow Self", value: "The transformation you haven't admitted yet. The self you've suppressed in order to remain acceptable." },
    ],
    kafkaQuote: "As Gregor Samsa awoke one morning from uneasy dreams, he found himself transformed into a gigantic insect.",
    challenge: "Your worth is not your output. Gregor's family loved him least when they needed him most. The people who only love your function are not loving you.",
  },
  ALYOSHA: {
    name: "Alyosha Karamazov",
    subtitle: "The Luminous",
    source: "Dostoevsky — The Brothers Karamazov",
    color: "#7a6a2a",
    bg: "#15120a",
    accent: "#b8a04a",
    icon: "✶",
    summary: "You have seen the darkness — perhaps lived inside it — and emerged not disillusioned but strangely more open. People confide in you. You don't fix their problems. You witness them. Your goodness is not naivety; it has been tested. That's what makes it real.",
    traits: [
      { label: "Behavioural Pattern", value: "Active, attending presence. You notice people. You remember what they told you three months ago. This is rarer than it sounds." },
      { label: "Core Fear", value: "That love is not enough. That the darkness wins despite everything." },
      { label: "Hidden Strength", value: "You hold contradictions without needing to resolve them. Faith and doubt. Joy and grief. You don't have to choose." },
      { label: "Relationship Style", value: "People feel seen around you. This creates intimacy quickly — sometimes more than you intended." },
      { label: "Shadow Self", value: "Passive acceptance dressed as peace. Sometimes the loving thing is confrontation, not presence." },
    ],
    kafkaQuote: "Love in action is a harsh and dreadful thing compared to love in dreams.",
    challenge: "Goodness is not the absence of conflict. Alyosha's love costs him. It costs you too — and that cost is the proof it's real.",
  },
  THE_SURVEYOR: {
    name: "K.",
    subtitle: "The Perpetual Seeker",
    source: "Kafka — The Castle",
    color: "#6B5A7A",
    bg: "#100c15",
    accent: "#9a7aaa",
    icon: "⬟",
    summary: "You are always approaching something — a goal, a person, an understanding — that recedes as you advance. This is not failure. It may be your nature. You are constitutionally unable to settle for the official answer, the accepted path, the castle as it presents itself.",
    traits: [
      { label: "Behavioural Pattern", value: "You ask questions that make people uncomfortable — not to provoke, but because you genuinely need to know." },
      { label: "Core Fear", value: "That the castle doesn't exist. That there is no centre, no truth — only endless corridors." },
      { label: "Hidden Strength", value: "Extraordinary persistence. K. never reaches the castle. He also never stops trying. This is not stupidity — it is a kind of defiant dignity." },
      { label: "Relationship Style", value: "You form connections quickly but struggle to stay. Somewhere else always seems to hold the answer." },
      { label: "Shadow Self", value: "The quest as avoidance. Are you searching — or are you running from the place you are?" },
    ],
    kafkaQuote: "It was late in the evening when K. arrived. The village was deep in snow.",
    challenge: "The castle may never open its doors. The question is: what do you build in the village while you wait? The waiting is also a life.",
  },
};

// ─── SCORING ────────────────────────────────────────────────────────────────

function computeArchetype(answers) {
  const totals = { K: 0, D: 0, rebel: 0, seeker: 0 };
  answers.forEach(({ traits }) => {
    Object.entries(traits).forEach(([k, v]) => { totals[k] += v; });
  });

  const K = totals.K, D = totals.D, rebel = totals.rebel, seeker = totals.seeker;

  if (K >= 20) return "JOSEF_K";
  if (D >= 18 && rebel >= 8) return "RASKOLNIKOV";
  if (D >= 18 && rebel < 8) return "ALYOSHA";
  if (K >= 14 && seeker >= 10) return "THE_SURVEYOR";
  if (K >= 14) return "GREGOR";
  if (seeker >= 12 && D >= 10) return "UNDERGROUND_MAN";
  if (rebel >= 12) return "RASKOLNIKOV";
  if (seeker >= 10) return "THE_SURVEYOR";
  if (D >= 12) return "ALYOSHA";
  return "UNDERGROUND_MAN";
}

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

const ProgressDots = ({ total, current }) => (
  <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginBottom: "2rem" }}>
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} style={{
        width: i < current ? 24 : 8, height: 8,
        borderRadius: 4,
        background: i < current ? "#8B6914" : i === current ? "#c49a2a" : "#2a1e0e",
        transition: "all 0.4s ease"
      }} />
    ))}
  </div>
);

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function App() {
  const [phase, setPhase] = useState("intro"); // intro | quiz | result
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [result, setResult] = useState(null);
  const [revealStep, setRevealStep] = useState(0);

  const q = questions[qIndex];

  const choose = (choice) => {
    if (animating || selected !== null) return;
    setSelected(choice);
    setAnimating(true);
    setTimeout(() => {
      const newAnswers = [...answers, choice];
      if (qIndex + 1 < questions.length) {
        setAnswers(newAnswers);
        setQIndex(qIndex + 1);
        setSelected(null);
        setAnimating(false);
      } else {
        const archetype = computeArchetype(newAnswers);
        setResult(archetypes[archetype]);
        setPhase("result");
        setAnimating(false);
        // stagger reveal
        setTimeout(() => setRevealStep(1), 400);
        setTimeout(() => setRevealStep(2), 800);
        setTimeout(() => setRevealStep(3), 1200);
        setTimeout(() => setRevealStep(4), 1600);
      }
    }, 600);
  };

  const restart = () => {
    setPhase("intro"); setQIndex(0); setAnswers([]);
    setSelected(null); setResult(null); setRevealStep(0);
  };

  // ── INTRO ──
  if (phase === "intro") return (
    <div style={{ minHeight: "100vh", background: "#080604", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif" }}>
      <GrainOverlay />
      <div style={{ maxWidth: 560, textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem", letterSpacing: "0.2em", color: "#3a2a0e" }}>⬡ ⬟ ⬡</div>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 400, color: "#e8d5a3", margin: "0 0 0.5rem", letterSpacing: "0.03em", lineHeight: 1.1 }}>
          The Soul Beneath the System
        </h1>
        <p style={{ color: "#6b5a35", fontStyle: "italic", fontSize: "1rem", marginBottom: "2.5rem", lineHeight: 1.7 }}>
          A personality portrait through the lens of Kafka & Dostoevsky
        </p>

        <div style={{ background: "#120e08", border: "1px solid #2a1e0e", borderLeft: "3px solid #8B6914", padding: "1.5rem", marginBottom: "2.5rem", textAlign: "left", borderRadius: "2px" }}>
          <p style={{ margin: "0 0 1rem", color: "#9a8a6a", lineHeight: 1.8, fontSize: "0.95rem" }}>
            Eight situations. No right answers. Each choice reveals something about how you move through the world — your fears, your patterns, your defences, your capacity for suffering and love.
          </p>
          <p style={{ margin: 0, color: "#5a4a2a", fontSize: "0.85rem", fontStyle: "italic" }}>
            You will be matched to one of six archetypes drawn from the worlds of Franz Kafka and Fyodor Dostoevsky.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "2.5rem" }}>
          {Object.values(archetypes).map(a => (
            <div key={a.name} style={{
              border: `1px solid ${a.color}44`, color: a.color,
              padding: "0.3rem 0.75rem", fontSize: "0.75rem", fontStyle: "italic",
              borderRadius: "2px", letterSpacing: "0.03em"
            }}>{a.icon} {a.name}</div>
          ))}
        </div>

        <button onClick={() => setPhase("quiz")} style={{
          background: "none", border: "1px solid #8B6914", color: "#c49a2a",
          padding: "1rem 3rem", fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase",
          cursor: "pointer", fontFamily: "inherit", borderRadius: "2px", transition: "all 0.3s"
        }}
          onMouseEnter={e => { e.target.style.background = "#8B691422"; }}
          onMouseLeave={e => { e.target.style.background = "none"; }}
        >
          Enter the Labyrinth
        </button>
      </div>
    </div>
  );

  // ── QUIZ ──
  if (phase === "quiz") return (
    <div style={{ minHeight: "100vh", background: "#080604", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif" }}>
      <GrainOverlay />
      <div style={{ maxWidth: 620, width: "100%", position: "relative", zIndex: 1 }}>
        <ProgressDots total={questions.length} current={qIndex} />

        <div style={{
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(-8px)" : "translateY(0)",
          transition: "all 0.4s ease"
        }}>
          {/* Question number */}
          <p style={{ margin: "0 0 0.5rem", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#3a2a0e", textAlign: "center" }}>
            Situation {qIndex + 1} of {questions.length}
          </p>

          {/* Scenario */}
          <div style={{ background: "#120e08", border: "1px solid #1e1608", borderLeft: "3px solid #3a2a0e", padding: "1.5rem", marginBottom: "1.5rem", borderRadius: "2px" }}>
            <p style={{ margin: 0, color: "#8a7a5a", lineHeight: 1.8, fontStyle: "italic", fontSize: "1rem" }}>
              {q.scenario}
            </p>
          </div>

          {/* Question */}
          <h2 style={{ margin: "0 0 1.5rem", color: "#c8b880", fontWeight: 400, fontSize: "1.3rem", textAlign: "center", letterSpacing: "0.02em" }}>
            {q.question}
          </h2>

          {/* Choices */}
          <div style={{ display: "grid", gap: "0.75rem" }}>
            {q.choices.map((choice, idx) => {
              const isSelected = selected === choice;
              return (
                <button key={idx} onClick={() => choose(choice)} style={{
                  background: isSelected ? "#1a1208" : "#0e0c08",
                  border: isSelected ? "1px solid #8B6914" : "1px solid #1e1608",
                  borderLeft: isSelected ? "3px solid #8B6914" : "3px solid transparent",
                  padding: "1.1rem 1.25rem", textAlign: "left", cursor: "pointer",
                  fontFamily: "inherit", color: isSelected ? "#c8b880" : "#6a5a35",
                  fontSize: "0.95rem", lineHeight: 1.6,
                  borderRadius: "2px", transition: "all 0.25s",
                  opacity: selected && !isSelected ? 0.4 : 1
                }}
                  onMouseEnter={e => { if (!selected) { e.currentTarget.style.borderLeftColor = "#5a4a2a"; e.currentTarget.style.color = "#9a8a6a"; } }}
                  onMouseLeave={e => { if (!selected) { e.currentTarget.style.borderLeftColor = "transparent"; e.currentTarget.style.color = "#6a5a35"; } }}
                >
                  {choice.text}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  // ── RESULT ──
  if (phase === "result" && result) return (
    <div style={{ minHeight: "100vh", background: result.bg, fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif", padding: "0 0 4rem" }}>
      <GrainOverlay />

      {/* Hero */}
      <div style={{
        position: "relative", zIndex: 1, borderBottom: `1px solid ${result.color}22`,
        padding: "3rem 2rem", textAlign: "center",
        opacity: revealStep >= 1 ? 1 : 0,
        transform: revealStep >= 1 ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.6s ease"
      }}>
        <div style={{ fontSize: "3rem", marginBottom: "0.75rem", color: result.color }}>{result.icon}</div>
        <p style={{ margin: "0 0 0.25rem", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: result.color }}>
          {result.source}
        </p>
        <h1 style={{ margin: "0 0 0.25rem", fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 400, color: "#e8d5a3", letterSpacing: "0.03em" }}>
          {result.name}
        </h1>
        <p style={{ margin: 0, fontStyle: "italic", color: `${result.color}aa`, fontSize: "1.1rem" }}>
          {result.subtitle}
        </p>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 1 }}>

        {/* Summary */}
        <div style={{
          marginTop: "2.5rem",
          opacity: revealStep >= 2 ? 1 : 0,
          transform: revealStep >= 2 ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.6s ease"
        }}>
          <div style={{ background: "#ffffff0a", border: `1px solid ${result.color}33`, borderLeft: `3px solid ${result.color}`, padding: "1.5rem", borderRadius: "2px", marginBottom: "2rem" }}>
            <p style={{ margin: 0, color: "#c8b880", lineHeight: 1.8, fontSize: "1rem" }}>
              {result.summary}
            </p>
          </div>

          {/* Traits */}
          <div style={{ marginBottom: "2rem" }}>
            {result.traits.map((trait, i) => (
              <div key={i} style={{
                borderBottom: `1px solid ${result.color}18`, padding: "1.25rem 0",
                opacity: revealStep >= 3 ? 1 : 0,
                transform: revealStep >= 3 ? "translateX(0)" : "translateX(-12px)",
                transition: `all 0.5s ease ${i * 0.1}s`
              }}>
                <p style={{ margin: "0 0 0.4rem", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: result.color }}>
                  {trait.label}
                </p>
                <p style={{ margin: 0, color: "#9a8a6a", lineHeight: 1.7, fontSize: "0.95rem" }}>
                  {trait.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quote + Challenge */}
        <div style={{
          opacity: revealStep >= 4 ? 1 : 0,
          transform: revealStep >= 4 ? "translateY(0)" : "translateY(16px)",
          transition: "all 0.6s ease"
        }}>
          <div style={{ background: "#ffffff06", border: `1px solid ${result.color}22`, padding: "1.5rem", borderRadius: "2px", marginBottom: "1.5rem" }}>
            <p style={{ margin: "0 0 0.5rem", fontStyle: "italic", color: "#8a7a5a", lineHeight: 1.8, fontSize: "0.95rem" }}>
              "{result.kafkaQuote}"
            </p>
            <p style={{ margin: 0, fontSize: "0.7rem", letterSpacing: "0.1em", color: result.color }}>
              {result.source}
            </p>
          </div>

          <div style={{ background: `${result.color}11`, border: `1px solid ${result.color}44`, padding: "1.5rem", borderRadius: "2px", marginBottom: "2.5rem" }}>
            <p style={{ margin: "0 0 0.5rem", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: result.color }}>
              Your Challenge
            </p>
            <p style={{ margin: 0, color: "#c8b880", lineHeight: 1.7 }}>
              {result.challenge}
            </p>
          </div>

          {/* Other archetypes */}
          <div style={{ marginBottom: "2.5rem" }}>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#3a2a0e", marginBottom: "1rem" }}>
              Other archetypes in this world
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {Object.values(archetypes).filter(a => a.name !== result.name).map(a => (
                <div key={a.name} style={{
                  border: `1px solid ${a.color}44`, color: `${a.color}aa`,
                  padding: "0.35rem 0.75rem", fontSize: "0.8rem", fontStyle: "italic", borderRadius: "2px"
                }}>
                  {a.icon} {a.name}
                </div>
              ))}
            </div>
          </div>

          <button onClick={restart} style={{
            background: "none", border: `1px solid ${result.color}66`, color: result.color,
            padding: "0.85rem 2.5rem", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase",
            cursor: "pointer", fontFamily: "inherit", borderRadius: "2px", width: "100%", transition: "all 0.3s"
          }}
            onMouseEnter={e => { e.target.style.background = `${result.color}18`; }}
            onMouseLeave={e => { e.target.style.background = "none"; }}
          >
            Return to the Beginning
          </button>
        </div>
      </div>
    </div>
  );

  return null;
}

function GrainOverlay() {
  return (
    <div style={{
      position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
      opacity: 0.5
    }} />
  );
}
