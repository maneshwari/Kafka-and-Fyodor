# Kafka and Fyodor

> *Which literary consciousness lives inside you?*

A personality quiz that matches you to one of 12 archetypes drawn from the works of Kafka, Dostoevsky, Nietzsche, Camus, Hesse, and Sartre — based on how you actually think and respond to situations, not on what you've read.

---

## What is this?

Most personality tests are built on corporate psychology frameworks. This one is built on literature.

You're presented with morally and existentially loaded scenarios — the kind these authors spent their lives writing about. Your responses are scored across trait dimensions and matched to a character archetype. The result isn't a label; it's a mirror.

---

## The 12 Archetypes

| Character | Author | Work |
|-----------|--------|------|
| Josef K. — *The Accused* | Kafka | The Trial |
| Gregor Samsa — *The Transformed* | Kafka | The Metamorphosis |
| Zarathustra — *The Overcomer* | Nietzsche | Thus Spoke Zarathustra |
| The Dionysian — *The Affirmer* | Nietzsche | The Birth of Tragedy |
| Meursault — *The Stranger* | Camus | The Stranger |
| Sisyphus — *The Revolter* | Camus | The Myth of Sisyphus |
| Raskolnikov — *The Transgressor* | Dostoevsky | Crime and Punishment |
| Alyosha — *The Luminous* | Dostoevsky | The Brothers Karamazov |
| The Underground Man — *The Hyper-Conscious* | Dostoevsky | Notes from Underground |
| Demian — *The Seeker Between Worlds* | Hesse | Demian / Steppenwolf |
| Harry Haller — *The Divided* | Hesse | Steppenwolf |
| Roquentin — *The Nauseated* | Sartre | Nausea |

Each archetype includes a full psychological profile: behavioural patterns, core fear, hidden strength, relationship style, shadow self, a defining quote, a challenge, and which archetypes you're in tension or affinity with.

---

## How the Scoring Works

Questions are scenario-based — not "which of these describes you" but "this happened, what do you do?" Each answer carries weighted trait scores across dimensions like Kafkaesque anxiety, Dostoevskian moral intensity, rebelliousness, and truth-seeking. The archetype with the highest match wins.

---

## Files

```
kafka-dostoevsky-quiz.jsx         Core quiz engine and archetype scoring
kafka-dostoevsky-explorer.jsx     Browse all archetypes and their profiles
literary-soul-v4.jsx              Latest combined version (quiz + results + explorer)
consciousness-explorer.jsx        Deeper philosophical layer
```

---

## Status & Roadmap

Currently built as JSX components (prototyped as interactive artifacts).

- [x] 12 archetypes fully written with psychological profiles
- [x] Scenario-based quiz with trait scoring
- [x] Author explorer
- [ ] Convert to vanilla JS/HTML/CSS (no framework dependencies)
- [ ] Deploy on Netlify as a public web app

---

## Tech

- JSX (prototype) → Vanilla JavaScript + HTML/CSS (planned)
- No backend, no database — runs entirely in the browser
- Built with Claude AI assistance

---

## About

A personal project born from the question: *what if a personality test took human nature as seriously as great literature does?*
