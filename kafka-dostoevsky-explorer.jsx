import { useState, useEffect } from "react";

const data = {
  themes: [
    {
      id: "absurd-bureaucracy",
      author: "kafka",
      title: "The Absurd Machine",
      subtitle: "Kafka on Power & Meaninglessness",
      icon: "⚙",
      quote: "It is not necessary to accept everything as true, one must only accept it as necessary.",
      quoteSource: "— The Trial",
      description:
        "Kafka's world is one of impenetrable systems: courts without verdicts, castles without entry, laws without explanation. The individual is not crushed by evil — but by indifferent process. Guilt is presumed before any crime. Authority never shows its face.",
      coreIdea:
        "Bureaucracy is not a tool of oppression — it IS the oppression. The system has no center, no architect, no cruelty. It simply grinds, endlessly, without meaning.",
      keyWorks: ["The Trial", "The Castle", "In the Penal Colony", "The Metamorphosis"],
      concepts: [
        { term: "Kafkaesque", meaning: "A situation so absurd and oppressive it becomes surreal — where logic itself is weaponized against you." },
        { term: "The Invisible Authority", meaning: "Power that never identifies itself. You cannot fight what has no face." },
        { term: "Complicit Guilt", meaning: "Josef K. is guilty the moment he is accused — not because of evidence, but because the system presumes it." },
      ],
      color: "#8B6914",
      bg: "#1a1208",
    },
    {
      id: "metamorphosis-self",
      author: "kafka",
      title: "The Transformed Self",
      subtitle: "Kafka on Alienation & Identity",
      icon: "◈",
      quote: "As Gregor Samsa awoke one morning from uneasy dreams, he found himself transformed into a gigantic insect.",
      quoteSource: "— The Metamorphosis",
      description:
        "Gregor Samsa's transformation is not magic — it is revelation. He was already living as something less than human: a body producing income, tolerated for his function. The insect merely makes visible what was always true.",
      coreIdea:
        "Alienation is not a feeling — it is a social condition. We become unrecognizable when we can no longer produce. The family's love was always conditional. Society's dignity was always rented.",
      keyWorks: ["The Metamorphosis", "Letter to His Father", "The Judgment"],
      concepts: [
        { term: "Alienation", meaning: "The individual reduced to their economic function. When the function fails, the person disappears." },
        { term: "The Body as Burden", meaning: "Kafka saw the body as something shameful, unruly, and ultimately betraying — a cage for the self." },
        { term: "Family as Trap", meaning: "The domestic sphere in Kafka is not refuge but prison. Love calcifies into obligation and resentment." },
      ],
      color: "#6B8E6B",
      bg: "#0d150d",
    },
    {
      id: "freedom-suffering",
      author: "dostoevsky",
      title: "Freedom Through the Abyss",
      subtitle: "Dostoevsky on Free Will & Suffering",
      icon: "✦",
      quote: "Pain and suffering are always inevitable for a large intelligence and a deep heart.",
      quoteSource: "— Crime and Punishment",
      description:
        "For Dostoevsky, suffering is not an accident of existence — it is its very substance. To be conscious is to suffer. But crucially: suffering is also the price of genuine freedom. The Grand Inquisitor offers bread and security; Christ offers freedom and the cross.",
      coreIdea:
        "True freedom is terrifying. Most people will trade it for comfort, certainty, and order. The few who refuse — who insist on their full humanity — must carry the weight of consciousness. Suffering is proof you are alive.",
      keyWorks: ["The Brothers Karamazov", "Crime and Punishment", "The Idiot", "Notes from Underground"],
      concepts: [
        { term: "Voluntary Suffering", meaning: "Suffering chosen freely is redemptive. Suffering imposed by systems is degrading. The distinction is everything." },
        { term: "The Grand Inquisitor's Bargain", meaning: "Humanity craves miracle, mystery, and authority. True freedom is a burden most will reject." },
        { term: "Raskolnikov's Trap", meaning: "The 'extraordinary man' theory: some believe they transcend moral law. Raskolnikov discovers he cannot — and his suffering is the proof." },
      ],
      color: "#8B3A3A",
      bg: "#150a0a",
    },
    {
      id: "underground-man",
      author: "dostoevsky",
      title: "The Underground Man",
      subtitle: "Dostoevsky on Consciousness & Spite",
      icon: "⬡",
      quote: "I am a sick man... I am a spiteful man. I am an unattractive man. I believe my liver is diseased.",
      quoteSource: "— Notes from Underground",
      description:
        "The Underground Man is hyper-conscious — and it paralyzes him. He sees through every social norm, every rational system, every comfortable lie. And precisely because he sees too clearly, he cannot act. Awareness becomes its own prison.",
      coreIdea:
        "Rationalism promises to solve the human condition — but the Underground Man demonstrates it cannot. Humans are not utility-maximizers. We are spite-driven, irrational, self-destructive beings who would sooner smash the Crystal Palace than live inside it contentedly.",
      keyWorks: ["Notes from Underground", "The Double", "White Nights"],
      concepts: [
        { term: "Hyper-Consciousness", meaning: "Too much awareness becomes paralysis. The man who sees everything cannot move." },
        { term: "Spite as Autonomy", meaning: "Acting against your own interest is the ultimate proof of freedom. The irrational act asserts the self." },
        { term: "The Crystal Palace Rejection", meaning: "Dostoevsky's critique of utopian rationalism: even in paradise, humans will revolt, just to prove they can." },
      ],
      color: "#5A5A8B",
      bg: "#0c0c15",
    },
  ],

  experiments: [
    {
      id: "trial",
      title: "Josef K.'s Morning",
      source: "Kafka — The Trial",
      scenario:
        "You wake up and two men are in your apartment. They tell you that you are under arrest — but they will not tell you the charge. They leave you free to go to work. Days pass. A court summons arrives for a Sunday. The court is in an attic of a tenement building. No one will tell you what you did.",
      question: "How do you respond to an authority that will not name your crime?",
      choices: [
        {
          label: "Fight the system — demand transparency, hire lawyers, seek the truth",
          outcome: "Josef K. does this. He discovers the court is everywhere and nowhere. Every lawyer is corrupt or ineffective. The system has no center to attack. Fighting it gives it more power over you.",
          tension: "To engage is to accept its legitimacy. The system feeds on your compliance.",
          alignment: "kafkaesque-resistance",
        },
        {
          label: "Accept the guilt — perhaps I have done something, even if I don't know what",
          outcome: "This is what the system wants. The accused internalizes guilt before any judgment. Kafka suggests this is precisely how power works — it colonizes your sense of self.",
          tension: "Acceptance is surrender. But resistance may be futile. Which is more honest?",
          alignment: "kafkaesque-submission",
        },
        {
          label: "Ignore it entirely — live as if nothing has changed",
          outcome: "The execution finds you anyway. Kafka's point: there is no exit from the system by pretending it doesn't exist. Indifference is not freedom.",
          tension: "You cannot opt out of society's structures simply by refusing to see them.",
          alignment: "kafkaesque-denial",
        },
        {
          label: "Find dark humor in it — the absurdity is the point",
          outcome: "This is the Kafka reader's response. To laugh at the system is a form of clarity. It does not save Josef K. — but it preserves something the system cannot touch.",
          tension: "Camus called this the 'absurd hero': one who sees the meaninglessness and lives anyway.",
          alignment: "absurdist-lucidity",
        },
      ],
    },
    {
      id: "raskolnikov",
      title: "Raskolnikov's Theory",
      source: "Dostoevsky — Crime and Punishment",
      scenario:
        "You are brilliant, impoverished, and certain that the world is held back by mediocre people. You develop a theory: extraordinary individuals — Napoleons — have the right to transgress moral law for a greater purpose. The old pawnbroker is cruel, parasitic, useless. If she were gone, her money could fund your education and greatness.",
      question: "Does the 'extraordinary man' theory hold? Can superior purpose justify transgression?",
      choices: [
        {
          label: "Yes — the truly great transcend ordinary morality. History proves this.",
          outcome: "Raskolnikov believes this — until he commits the act. The theory collapses not from logic but from psychology. He cannot live with it. His conscience is not a social construct; it is something deeper.",
          tension: "Dostoevsky's answer: you cannot reason your way out of your own humanity. The suffering that follows is not punishment — it is proof of a moral reality.",
          alignment: "nietzschean-overreach",
        },
        {
          label: "No — moral law applies universally. No individual can stand above it.",
          outcome: "This is Sonia's position — rooted in faith and shared human dignity. Dostoevsky sympathizes here, though he does not dismiss the intellectual challenge.",
          tension: "But if moral law is universal, where does it come from? Dostoevsky's answer: God. Without God, Raskolnikov's theory has no refutation — only consequences.",
          alignment: "christian-humanism",
        },
        {
          label: "The theory is correct but Raskolnikov was wrong about himself — he is not extraordinary",
          outcome: "This is Raskolnikov's own eventual self-diagnosis. The cruelest realization: he is not Napoleon. He is ordinary. The murder proved it.",
          tension: "Is this humility — or the deepest form of suffering? To know your own smallness is its own abyss.",
          alignment: "tragic-self-knowledge",
        },
        {
          label: "The theory is meaningless — morality is constructed, consequences are real",
          outcome: "A modern reading: the 'extraordinary man' theory is a rationalization. What matters is what actually happens — the psychological destruction, the human cost.",
          tension: "Dostoevsky would say this misses something: if morality is constructed, why does Raskolnikov suffer? The suffering points to something real.",
          alignment: "consequentialist-pragmatism",
        },
      ],
    },
    {
      id: "grand-inquisitor",
      title: "The Grand Inquisitor's Offer",
      source: "Dostoevsky — The Brothers Karamazov",
      scenario:
        "Christ has returned to Seville during the Inquisition. The Cardinal has him arrested. In a private cell, the Inquisitor speaks for hours. His argument: humanity cannot bear freedom. You gave them liberty — we gave them bread, miracle, and certainty. They are happier under our authority than under your love. We have corrected your work.",
      question: "Is the Inquisitor right? Does humanity need authority more than freedom?",
      choices: [
        {
          label: "Yes — most people cannot handle true freedom. Benevolent authority is mercy.",
          outcome: "This is the Inquisitor's position — and it is not easily dismissed. Dostoevsky makes him brilliant. The comfort of certainty, the relief of submission — these are real human needs.",
          tension: "But the Inquisitor's compassion is contempt in disguise. He has decided for humanity what it cannot decide for itself.",
          alignment: "authoritarian-paternalism",
        },
        {
          label: "No — freedom is constitutive of human dignity. A comfortable cage is still a cage.",
          outcome: "Christ's answer is silence — and then a kiss. Dostoevsky does not argue against the Inquisitor with logic. He answers with love. The gesture is everything.",
          tension: "But love does not feed the hungry. Freedom does not comfort the terrified. The Inquisitor's critique stands, even if his solution is wrong.",
          alignment: "christian-freedom",
        },
        {
          label: "The question is false — humans need both, and the tension between them is life itself",
          outcome: "Dostoevsky's deepest position may be this: the struggle between freedom and security is not a problem to be solved but a condition to be lived.",
          tension: "To resolve the tension in either direction is to lose something essential about being human.",
          alignment: "dialectical-tension",
        },
        {
          label: "The Inquisitor represents every system that claims to serve people while controlling them",
          outcome: "Read politically: the Inquisitor is every ideology that trades freedom for order — communism, theocracy, technocracy. Dostoevsky saw this coming.",
          tension: "If all authority is potentially the Inquisitor, how do we build societies at all?",
          alignment: "political-critique",
        },
      ],
    },
    {
      id: "metamorphosis-choice",
      title: "After the Metamorphosis",
      source: "Kafka — The Metamorphosis",
      scenario:
        "Gregor Samsa's family initially tries to care for him. But as weeks pass, he becomes a burden — financially, emotionally, socially. His sister, who once brought him food with love, eventually says: 'We must try to get rid of it.' She no longer calls him 'he.' After overhearing this, Gregor crawls back to his room and dies — seemingly of his own decision.",
      question: "Did Gregor die of despair — or of love? Was his death a defeat or a final act of will?",
      choices: [
        {
          label: "Defeat — he internalized the family's rejection and gave up",
          outcome: "The most tragic reading. The system — family, society, economy — successfully eliminated what it could not use. Gregor's death is not chosen; it is induced.",
          tension: "Kafka suggests we are all one transformation away from becoming expendable.",
          alignment: "social-critique",
        },
        {
          label: "Love — he chose to free the family from the burden of him",
          outcome: "A devastating reading: his last act is selfless. Loving them more than himself, he removes himself. This makes the family's relief even more grotesque.",
          tension: "Is a love that makes itself nothing truly love — or the ultimate form of self-erasure that the system demands?",
          alignment: "tragic-love",
        },
        {
          label: "Agency — the only autonomous act available to him was to die on his own terms",
          outcome: "In a life of total powerlessness, dying was the one thing Gregor could choose. Kafka may be saying: sometimes the only freedom left is the freedom to stop.",
          tension: "This is not endorsement — it is observation. The horror is that it took this to find agency.",
          alignment: "existential-agency",
        },
        {
          label: "Ambiguity — Kafka refuses to let us know, and that is the point",
          outcome: "Kafka resists resolution. Was it despair? Love? Will? The story ends with the family going on a tram ride, relieved. Gregor's death has no meaning — which is precisely Kafka's point.",
          tension: "Meaning is what we want. Kafka gives us its absence.",
          alignment: "kafkaesque-ambiguity",
        },
      ],
    },
  ],

  dialogue: {
    title: "Kafka vs. Dostoevsky: The Silent Argument",
    description:
      "These two authors never met, but their worldviews are in constant tension. Both confronted suffering, systems, and the human soul — but arrived at radically different conclusions.",
    exchanges: [
      {
        topic: "On God",
        kafka: "God is the ultimate inaccessible authority. The Castle cannot be entered. Whether it exists is almost irrelevant — only its effects matter.",
        dostoevsky: "Without God, everything is permitted — and that is terrifying, not liberating. God is not the castle; God is the only thing that makes the castle bearable.",
      },
      {
        topic: "On Suffering",
        kafka: "Suffering is administered. It is bureaucratic. It comes from systems, not sin. There is no redemption in it — only endurance.",
        dostoevsky: "Suffering is sacred. It is the crucible of the self. To suffer consciously is to become more fully human. Redemption is not only possible — it is the point.",
      },
      {
        topic: "On the Individual",
        kafka: "The individual is small, disoriented, and structurally powerless. Josef K., Gregor, K. — they cannot win. The self is a site of anxiety, not heroism.",
        dostoevsky: "The individual is infinite. Raskolnikov, Alyosha, the Underground Man — each contains a universe. The self is the battleground of cosmic forces. This is not smallness — it is terrible greatness.",
      },
      {
        topic: "On Hope",
        kafka: "Hope is the cruelest trap. 'There is infinite hope — but not for us.' To hope in a Kafka story is to be prolonged, not saved.",
        dostoevsky: "Hope is the only honest response to existence. Not naïve hope — but the hope of Alyosha, who has seen everything and still kneels, still loves.",
      },
    ],
  },
};

const authorColors = {
  kafka: { primary: "#8B6914", bg: "#1a1208", light: "#c49a2a" },
  dostoevsky: { primary: "#8B3A3A", bg: "#150a0a", light: "#c45a5a" },
};

export default function App() {
  const [tab, setTab] = useState("map");
  const [activeTheme, setActiveTheme] = useState(null);
  const [activeExp, setActiveExp] = useState(null);
  const [selectedChoices, setSelectedChoices] = useState({});
  const [revealedChoice, setRevealedChoice] = useState({});
  const [dialogueLine, setDialogueLine] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    setFadeIn(false);
    const t = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(t);
  }, [tab]);

  const selectChoice = (expId, choiceIdx) => {
    setSelectedChoices((prev) => ({ ...prev, [expId]: choiceIdx }));
    setTimeout(() => setRevealedChoice((prev) => ({ ...prev, [expId]: true })), 300);
  };

  const tabs = [
    { id: "map", label: "Philosophical Map" },
    { id: "experiments", label: "Moral Crucibles" },
    { id: "dialogue", label: "The Confrontation" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0806", color: "#d4c4a0", fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      {/* Grain texture overlay */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        opacity: 0.6
      }} />

      {/* Header */}
      <div style={{ position: "relative", zIndex: 1, borderBottom: "1px solid #2a2010", padding: "2rem 2rem 1.5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "0.25rem" }}>
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "#6b5a35", textTransform: "uppercase" }}>An Existential Inquiry</span>
          </div>
          <h1 style={{ margin: 0, fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 400, letterSpacing: "0.02em", color: "#e8d5a3", lineHeight: 1.1 }}>
            Kafka & Dostoevsky
          </h1>
          <p style={{ margin: "0.4rem 0 0", fontSize: "1rem", color: "#7a6a45", fontStyle: "italic" }}>
            The Abyss, the System, and the Struggling Soul
          </p>
        </div>
      </div>

      {/* Nav */}
      <div style={{ position: "relative", zIndex: 1, borderBottom: "1px solid #1e1608", padding: "0 2rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 0 }}>
          {tabs.map((t) => (
            <button key={t.id} onClick={() => { setTab(t.id); setActiveTheme(null); setActiveExp(null); }}
              style={{
                background: "none", border: "none", borderBottom: tab === t.id ? "2px solid #8B6914" : "2px solid transparent",
                color: tab === t.id ? "#c49a2a" : "#5a4a2a", padding: "1rem 1.5rem", cursor: "pointer",
                fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "inherit",
                transition: "all 0.2s"
              }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "2rem", opacity: fadeIn ? 1 : 0, transition: "opacity 0.3s" }}>

        {/* ── TAB: MAP ── */}
        {tab === "map" && !activeTheme && (
          <div>
            <p style={{ color: "#7a6a45", fontStyle: "italic", marginBottom: "2rem", fontSize: "1.05rem", lineHeight: 1.7 }}>
              Two writers. Two darknesses. Both stared into the human condition without flinching — 
              but what they saw there was not the same thing. Choose a philosophical territory to explore.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              {/* Kafka column header */}
              {["kafka", "dostoevsky"].map(author => (
                <div key={author}>
                  <div style={{
                    fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase",
                    color: authorColors[author].primary, marginBottom: "1rem", paddingBottom: "0.5rem",
                    borderBottom: `1px solid ${authorColors[author].primary}33`
                  }}>
                    {author === "kafka" ? "Franz Kafka · 1883–1924" : "Fyodor Dostoevsky · 1821–1881"}
                  </div>
                  {data.themes.filter(t => t.author === author).map(theme => (
                    <div key={theme.id} onClick={() => setActiveTheme(theme)}
                      style={{
                        background: theme.bg, border: `1px solid ${theme.color}33`,
                        borderLeft: `3px solid ${theme.color}`, padding: "1.5rem",
                        marginBottom: "1rem", cursor: "pointer",
                        transition: "all 0.2s", borderRadius: "2px"
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderLeftColor = theme.color; e.currentTarget.style.background = theme.bg.replace("0d", "14"); }}
                      onMouseLeave={e => { e.currentTarget.style.borderLeftColor = theme.color + "33"; e.currentTarget.style.background = theme.bg; }}
                    >
                      <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{theme.icon}</div>
                      <h3 style={{ margin: "0 0 0.25rem", color: theme.color, fontWeight: 400, fontSize: "1.1rem" }}>{theme.title}</h3>
                      <p style={{ margin: "0 0 0.75rem", fontSize: "0.75rem", color: "#5a4a2a", letterSpacing: "0.05em" }}>{theme.subtitle}</p>
                      <p style={{ margin: 0, fontSize: "0.85rem", color: "#8a7a5a", lineHeight: 1.6, fontStyle: "italic" }}>
                        "{theme.quote.length > 100 ? theme.quote.substring(0, 100) + "…" : theme.quote}"
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── THEME DETAIL ── */}
        {tab === "map" && activeTheme && (
          <div>
            <button onClick={() => setActiveTheme(null)} style={{
              background: "none", border: "none", color: "#5a4a2a", cursor: "pointer",
              fontFamily: "inherit", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase",
              marginBottom: "2rem", padding: 0, display: "flex", alignItems: "center", gap: "0.5rem"
            }}>
              ← Return
            </button>

            <div style={{ borderLeft: `3px solid ${activeTheme.color}`, paddingLeft: "1.5rem", marginBottom: "2rem" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{activeTheme.icon}</div>
              <h2 style={{ margin: "0 0 0.25rem", color: activeTheme.color, fontWeight: 400, fontSize: "1.8rem" }}>
                {activeTheme.title}
              </h2>
              <p style={{ margin: 0, color: "#5a4a2a", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {activeTheme.subtitle}
              </p>
            </div>

            <div style={{
              background: "#1a1408", border: `1px solid ${activeTheme.color}22`,
              padding: "1.5rem", marginBottom: "2rem", borderRadius: "2px"
            }}>
              <p style={{ margin: "0 0 0.5rem", fontStyle: "italic", fontSize: "1.1rem", color: "#c8b880", lineHeight: 1.7 }}>
                "{activeTheme.quote}"
              </p>
              <p style={{ margin: 0, fontSize: "0.75rem", color: "#5a4a2a", letterSpacing: "0.05em" }}>
                {activeTheme.quoteSource}
              </p>
            </div>

            <p style={{ color: "#9a8a6a", lineHeight: 1.8, marginBottom: "1.5rem", fontSize: "1rem" }}>
              {activeTheme.description}
            </p>

            <div style={{
              background: activeTheme.bg, border: `1px solid ${activeTheme.color}44`,
              padding: "1.25rem", marginBottom: "2rem", borderRadius: "2px"
            }}>
              <p style={{ margin: "0 0 0.5rem", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: activeTheme.color }}>Core Argument</p>
              <p style={{ margin: 0, color: "#c8b880", lineHeight: 1.7 }}>{activeTheme.coreIdea}</p>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#4a3a1a", marginBottom: "1rem" }}>Key Works</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {activeTheme.keyWorks.map(w => (
                  <span key={w} style={{
                    border: `1px solid ${activeTheme.color}44`, color: activeTheme.color,
                    padding: "0.35rem 0.75rem", fontSize: "0.8rem", fontStyle: "italic", borderRadius: "2px"
                  }}>{w}</span>
                ))}
              </div>
            </div>

            <div>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#4a3a1a", marginBottom: "1rem" }}>Key Concepts</p>
              {activeTheme.concepts.map((c, i) => (
                <div key={i} style={{
                  borderBottom: "1px solid #1e1608", paddingBottom: "1rem", marginBottom: "1rem"
                }}>
                  <p style={{ margin: "0 0 0.35rem", color: activeTheme.color, fontWeight: 400, fontSize: "0.95rem" }}>{c.term}</p>
                  <p style={{ margin: 0, color: "#7a6a45", fontSize: "0.9rem", lineHeight: 1.6 }}>{c.meaning}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB: EXPERIMENTS ── */}
        {tab === "experiments" && !activeExp && (
          <div>
            <p style={{ color: "#7a6a45", fontStyle: "italic", marginBottom: "2rem", lineHeight: 1.7, fontSize: "1.05rem" }}>
              Both authors placed their characters in moral crucibles — impossible situations 
              that reveal the structure of the human soul. Enter one. There are no right answers.
            </p>
            <div style={{ display: "grid", gap: "1rem" }}>
              {data.experiments.map((exp) => {
                const done = selectedChoices[exp.id] !== undefined;
                return (
                  <div key={exp.id} onClick={() => setActiveExp(exp.id)} style={{
                    background: "#120e08", border: "1px solid #2a1e0e",
                    borderLeft: done ? "3px solid #4a7a4a" : "3px solid #2a1e0e",
                    padding: "1.5rem", cursor: "pointer", borderRadius: "2px", transition: "all 0.2s"
                  }}
                    onMouseEnter={e => e.currentTarget.style.borderLeftColor = "#8B6914"}
                    onMouseLeave={e => { e.currentTarget.style.borderLeftColor = done ? "#4a7a4a" : "#2a1e0e"; }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <p style={{ margin: "0 0 0.25rem", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#4a3a1a" }}>
                          {exp.source}
                        </p>
                        <h3 style={{ margin: "0 0 0.75rem", color: "#c8b880", fontWeight: 400, fontSize: "1.2rem" }}>
                          {exp.title}
                        </h3>
                      </div>
                      {done && <span style={{ color: "#4a7a4a", fontSize: "0.75rem", letterSpacing: "0.1em" }}>EXPLORED</span>}
                    </div>
                    <p style={{ margin: 0, color: "#6a5a35", lineHeight: 1.6, fontSize: "0.9rem" }}>
                      {exp.scenario.substring(0, 160)}…
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── EXPERIMENT DETAIL ── */}
        {tab === "experiments" && activeExp && (() => {
          const exp = data.experiments.find(e => e.id === activeExp);
          const chosen = selectedChoices[exp.id];
          const revealed = revealedChoice[exp.id];
          return (
            <div>
              <button onClick={() => setActiveExp(null)} style={{
                background: "none", border: "none", color: "#5a4a2a", cursor: "pointer",
                fontFamily: "inherit", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase",
                marginBottom: "2rem", padding: 0
              }}>← Return</button>

              <p style={{ margin: "0 0 0.5rem", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#4a3a1a" }}>
                {exp.source}
              </p>
              <h2 style={{ margin: "0 0 1.5rem", color: "#c8b880", fontWeight: 400, fontSize: "1.8rem" }}>{exp.title}</h2>

              <div style={{
                background: "#120e08", border: "1px solid #2a1e0e", borderLeft: "3px solid #6b5a35",
                padding: "1.5rem", marginBottom: "1.5rem", borderRadius: "2px"
              }}>
                <p style={{ margin: "0 0 0.5rem", fontSize: "0.65rem", letterSpacing: "0.2em", color: "#4a3a1a", textTransform: "uppercase" }}>The Situation</p>
                <p style={{ margin: 0, color: "#9a8a6a", lineHeight: 1.8 }}>{exp.scenario}</p>
              </div>

              <div style={{
                background: "#1a1408", border: "1px solid #3a2a0e",
                padding: "1rem 1.5rem", marginBottom: "2rem", borderRadius: "2px"
              }}>
                <p style={{ margin: 0, color: "#c8b880", fontStyle: "italic", fontSize: "1.05rem" }}>
                  {exp.question}
                </p>
              </div>

              <div style={{ display: "grid", gap: "0.75rem", marginBottom: "1.5rem" }}>
                {exp.choices.map((choice, idx) => {
                  const isChosen = chosen === idx;
                  const othersChosen = chosen !== undefined && !isChosen;
                  return (
                    <div key={idx} onClick={() => !revealed && selectChoice(exp.id, idx)} style={{
                      background: isChosen ? "#1a1208" : "#0e0c08",
                      border: isChosen ? "1px solid #8B6914" : "1px solid #1e1608",
                      borderLeft: isChosen ? "3px solid #8B6914" : "3px solid transparent",
                      padding: "1.25rem", cursor: revealed ? "default" : "pointer",
                      opacity: othersChosen && !revealed ? 0.5 : 1,
                      transition: "all 0.3s", borderRadius: "2px"
                    }}>
                      <p style={{ margin: 0, color: isChosen ? "#c8b880" : "#6a5a35", lineHeight: 1.6 }}>
                        {choice.label}
                      </p>

                      {isChosen && revealed && (
                        <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #2a1e0e" }}>
                          <p style={{ margin: "0 0 0.75rem", color: "#9a8a6a", lineHeight: 1.7, fontSize: "0.9rem" }}>
                            {choice.outcome}
                          </p>
                          <div style={{
                            background: "#120e08", border: "1px solid #3a2a0e",
                            padding: "0.75rem 1rem", borderRadius: "2px"
                          }}>
                            <p style={{ margin: "0 0 0.25rem", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#4a3a1a", textTransform: "uppercase" }}>Tension</p>
                            <p style={{ margin: 0, color: "#7a6a45", fontStyle: "italic", fontSize: "0.85rem", lineHeight: 1.6 }}>
                              {choice.tension}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {!revealed && (
                <p style={{ color: "#3a2a0e", fontStyle: "italic", fontSize: "0.85rem", textAlign: "center" }}>
                  Choose to see the philosophical consequence
                </p>
              )}
            </div>
          );
        })()}

        {/* ── TAB: DIALOGUE ── */}
        {tab === "dialogue" && (
          <div>
            <p style={{ color: "#7a6a45", fontStyle: "italic", marginBottom: "2rem", lineHeight: 1.7, fontSize: "1.05rem" }}>
              {data.dialogue.description}
            </p>

            {data.dialogue.exchanges.map((ex, i) => (
              <div key={i} style={{ marginBottom: "2.5rem" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "1rem",
                  marginBottom: "1.25rem"
                }}>
                  <div style={{ height: "1px", flex: 1, background: "#1e1608" }} />
                  <span style={{
                    fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase",
                    color: "#4a3a1a", whiteSpace: "nowrap"
                  }}>
                    {ex.topic}
                  </span>
                  <div style={{ height: "1px", flex: 1, background: "#1e1608" }} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div style={{
                    background: authorColors.kafka.bg, border: "1px solid #2a1e0e",
                    borderLeft: `3px solid ${authorColors.kafka.primary}`,
                    padding: "1.25rem", borderRadius: "2px"
                  }}>
                    <p style={{ margin: "0 0 0.5rem", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: authorColors.kafka.primary }}>
                      Kafka
                    </p>
                    <p style={{ margin: 0, color: "#9a8a6a", lineHeight: 1.7, fontStyle: "italic", fontSize: "0.9rem" }}>
                      "{ex.kafka}"
                    </p>
                  </div>
                  <div style={{
                    background: authorColors.dostoevsky.bg, border: "1px solid #2a0e0e",
                    borderLeft: `3px solid ${authorColors.dostoevsky.primary}`,
                    padding: "1.25rem", borderRadius: "2px"
                  }}>
                    <p style={{ margin: "0 0 0.5rem", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: authorColors.dostoevsky.primary }}>
                      Dostoevsky
                    </p>
                    <p style={{ margin: 0, color: "#9a8a6a", lineHeight: 1.7, fontStyle: "italic", fontSize: "0.9rem" }}>
                      "{ex.dostoevsky}"
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div style={{
              background: "#120e08", border: "1px solid #2a1e0e",
              padding: "1.5rem", borderRadius: "2px", marginTop: "1rem"
            }}>
              <p style={{ margin: "0 0 0.5rem", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#4a3a1a" }}>
                The Unresolved
              </p>
              <p style={{ margin: 0, color: "#7a6a45", lineHeight: 1.8, fontStyle: "italic" }}>
                Neither writer offers a solution. Kafka gives you the labyrinth. Dostoevsky gives you 
                the suffering inside it. Between them they may have mapped the full territory of modern 
                consciousness — not to escape it, but to see it clearly for the first time.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ position: "relative", zIndex: 1, borderTop: "1px solid #1a1208", padding: "1.5rem 2rem", marginTop: "2rem", textAlign: "center" }}>
        <p style={{ margin: 0, fontSize: "0.75rem", color: "#3a2a0e", letterSpacing: "0.1em" }}>
          "There is infinite hope — but not for us." — Kafka &nbsp;·&nbsp; "Love in action is a harsh and dreadful thing." — Dostoevsky
        </p>
      </div>
    </div>
  );
}
