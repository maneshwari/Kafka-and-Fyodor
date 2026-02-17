import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════════
// ARCHETYPES — 12 total across 6 authors
// ═══════════════════════════════════════════════════════════════════
const ARCHETYPES = {
  JOSEF_K: {
    id: "JOSEF_K", name: "Josef K.", subtitle: "The Accused",
    author: "Kafka", work: "The Trial",
    color: "#A0845C", bg: "#120e08", icon: "⚖",
    summary: "You move through the world with a persistent low-grade sense that something is required of you — but no one will say what. You comply without knowing why. You resist without knowing how. Precise, anxious, quietly furious at systems you cannot name.",
    traits: [
      { label: "Behavioural Pattern", value: "You operate inside structures even when you resent them. Rule-following is strategy, not comfort." },
      { label: "Core Fear", value: "Being found guilty of something you didn't do — or something you did without knowing it." },
      { label: "Hidden Strength", value: "You notice what others miss. The absurdity others accept strikes you as intolerable." },
      { label: "Relationship Style", value: "You attract people with your seriousness but keep them at careful distance. Intimacy feels like exposure." },
      { label: "Shadow Self", value: "Paralysis dressed as deliberation. You think so long the moment passes." },
    ],
    quote: "Someone must have slandered Josef K., for one morning, without having done anything wrong, he was arrested.",
    challenge: "The system will not explain itself. Your task is to live well inside the inexplicable — not to solve it.",
    tensions: ["MEURSAULT", "ZARATHUSTRA"],
    affinities: ["GREGOR", "STEPPENWOLF"],
  },
  GREGOR: {
    id: "GREGOR", name: "Gregor Samsa", subtitle: "The Transformed",
    author: "Kafka", work: "The Metamorphosis",
    color: "#5a8a5a", bg: "#0a120a", icon: "◈",
    summary: "You have felt yourself become unrecognizable — to others or yourself. You function. You provide. But somewhere the person doing those things became separate from the person watching. You carry others. You rarely ask to be carried.",
    traits: [
      { label: "Behavioural Pattern", value: "Self-erasure through service. You define yourself by usefulness, which makes you fragile when you cannot be useful." },
      { label: "Core Fear", value: "That without your function — your productivity, your role — you have no claim on love." },
      { label: "Hidden Strength", value: "A capacity for endurance that borders on the profound. You absorb what would break others, quietly." },
      { label: "Relationship Style", value: "You give more than you take and resent it less than you should. This confuses people." },
      { label: "Shadow Self", value: "The transformation you haven't admitted yet. The self suppressed to remain acceptable." },
    ],
    quote: "As Gregor Samsa awoke one morning from uneasy dreams, he found himself transformed into a gigantic insect.",
    challenge: "Your worth is not your output. The people who only love your function are not loving you.",
    tensions: ["ZARATHUSTRA", "ROQUENTIN"],
    affinities: ["JOSEF_K", "DEMIAN"],
  },
  ZARATHUSTRA: {
    id: "ZARATHUSTRA", name: "Zarathustra", subtitle: "The Overcomer",
    author: "Nietzsche", work: "Thus Spoke Zarathustra",
    color: "#c4882a", bg: "#150f04", icon: "⬡",
    summary: "You are constitutionally unable to accept the world as given. You push against every ceiling — moral, social, personal. Your fire is real. So is your loneliness. You have climbed to a height where the air is thin and the company sparse.",
    traits: [
      { label: "Behavioural Pattern", value: "You set standards others find exhausting or threatening. You cannot pretend to be less than you are." },
      { label: "Core Fear", value: "Becoming the Last Man — comfortable, mediocre, asking only 'what is happiness?' while blinking contentedly." },
      { label: "Hidden Strength", value: "You give people permission to want more. Your refusal to settle is contagious." },
      { label: "Relationship Style", value: "Intense and asymmetric. You love fiercely but your standards make sustained closeness difficult." },
      { label: "Shadow Self", value: "The will to power turned inward as contempt. For others, yes — but mostly for yourself." },
    ],
    quote: "I teach you the Overman. Man is something that shall be overcome. What have you done to overcome him?",
    challenge: "The Overman is not above humanity — it is what humanity is capable of becoming. The descent back into the marketplace is not defeat. It is the point.",
    tensions: ["GREGOR", "ALYOSHA"],
    affinities: ["RASKOLNIKOV", "MEURSAULT"],
  },
  DIONYSUS: {
    id: "DIONYSUS", name: "The Dionysian", subtitle: "The Affirmer",
    author: "Nietzsche", work: "The Birth of Tragedy / Beyond Good & Evil",
    color: "#8a4a8a", bg: "#110811", icon: "◉",
    summary: "You say yes to life even when life is terrible. This is not naivety — you have looked into the abyss and chosen affirmation anyway. You are drawn to chaos, creation, and the intoxicating edge between them. You believe destruction and creation are the same force.",
    traits: [
      { label: "Behavioural Pattern", value: "You embrace contradiction. You can hold joy and grief simultaneously without needing to resolve them." },
      { label: "Core Fear", value: "The Apollonian trap: too much order, structure, and reason draining the life from everything." },
      { label: "Hidden Strength", value: "Amor fati — love of fate. You can transform suffering into fuel rather than letting it be dead weight." },
      { label: "Relationship Style", value: "Magnetic and consuming. People feel more alive around you, sometimes dangerously so." },
      { label: "Shadow Self", value: "Affirmation as avoidance. Sometimes 'yes to everything' is a refusal to discriminate what actually matters." },
    ],
    quote: "What does not kill me makes me stronger. And if it kills me — I went down fighting, affirming.",
    challenge: "Eternal recurrence: if you had to live this exact life again, infinitely — would you? That answer tells you everything.",
    tensions: ["UNDERGROUND_MAN", "ROQUENTIN"],
    affinities: ["ZARATHUSTRA", "MEURSAULT"],
  },
  MEURSAULT: {
    id: "MEURSAULT", name: "Meursault", subtitle: "The Stranger",
    author: "Camus", work: "The Stranger",
    color: "#6a9a9a", bg: "#080f0f", icon: "◇",
    summary: "You exist at a remove from the performances others take seriously. Social grief, moral outrage, romantic obligation — you observe these as a slightly baffled outsider. This is not coldness. It is a kind of radical honesty about what you actually feel versus what you're supposed to feel.",
    traits: [
      { label: "Behavioural Pattern", value: "You respond to the present moment with unusual directness. Sentiment and social theatre don't move you." },
      { label: "Core Fear", value: "Not death — but being forced to perform a meaning you don't feel. The chaplain in the cell is your nightmare." },
      { label: "Hidden Strength", value: "Authenticity without effort. You cannot be manipulated by guilt or obligation. You feel what you feel." },
      { label: "Relationship Style", value: "People sense you are fully present but somehow unreachable. This is maddening and magnetic." },
      { label: "Shadow Self", value: "The passivity that looks like freedom. Things happen to Meursault. He rarely chooses." },
    ],
    quote: "Mother died today. Or maybe yesterday; I can't be sure.",
    challenge: "The absurd hero must revolt — must live fully in the face of meaninglessness. Meursault's clarity without action is only half the answer.",
    tensions: ["ALYOSHA", "JOSEF_K"],
    affinities: ["DIONYSUS", "ZARATHUSTRA"],
  },
  SISYPHUS: {
    id: "SISYPHUS", name: "Sisyphus", subtitle: "The Revolter",
    author: "Camus", work: "The Myth of Sisyphus",
    color: "#9a7a3a", bg: "#120f06", icon: "⬟",
    summary: "You have looked at the absurd — the silence of the universe, the human need for meaning — and refused to blink. You push the boulder. You know it will roll back. You push it again. This is not defeat. Camus says you must be imagined happy.",
    traits: [
      { label: "Behavioural Pattern", value: "You return to difficult things with a strange, calm persistence. Not optimism — revolt. Conscious, chosen engagement." },
      { label: "Core Fear", value: "Philosophical suicide — taking the leap into faith or nihilism to escape the tension. The comfortable answer." },
      { label: "Hidden Strength", value: "You have made peace with impermanence. You find meaning in the act, not the outcome." },
      { label: "Relationship Style", value: "Steadying presence. People feel less afraid of their own struggles around you." },
      { label: "Shadow Self", value: "The performance of contentment. Are you truly at peace — or have you just learned to look like it?" },
    ],
    quote: "One must imagine Sisyphus happy.",
    challenge: "The revolt must be genuine, not performed. Ask yourself daily: am I choosing this — or enduring it?",
    tensions: ["RASKOLNIKOV", "UNDERGROUND_MAN"],
    affinities: ["MEURSAULT", "DEMIAN"],
  },
  RASKOLNIKOV: {
    id: "RASKOLNIKOV", name: "Raskolnikov", subtitle: "The Transgressor",
    author: "Dostoevsky", work: "Crime and Punishment",
    color: "#8B3A3A", bg: "#150a0a", icon: "✦",
    summary: "You believe — perhaps rightly — that you are capable of more than the world allows. This creates dangerous pressure. You theorize your way into positions that feel liberating and are quietly devastating. Your suffering is real. So is your pride.",
    traits: [
      { label: "Behavioural Pattern", value: "You construct elaborate justifications for what you already want to do. The theory comes after the desire." },
      { label: "Core Fear", value: "Mediocrity. Being ordinary. Spending your capacities on things unworthy of them." },
      { label: "Hidden Strength", value: "Ferocious intellectual honesty — when you finally turn it on yourself." },
      { label: "Relationship Style", value: "Intense, asymmetric. You need people who can handle your full weight — and there are very few." },
      { label: "Shadow Self", value: "The 'extraordinary man' theory. You know it's flawed. You believe it anyway." },
    ],
    quote: "Pain and suffering are always inevitable for a large intelligence and a deep heart.",
    challenge: "Your intelligence is not a license. The question isn't whether you're capable — it's whether you can bear to be human while doing it.",
    tensions: ["SISYPHUS", "ALYOSHA"],
    affinities: ["ZARATHUSTRA", "UNDERGROUND_MAN"],
  },
  ALYOSHA: {
    id: "ALYOSHA", name: "Alyosha", subtitle: "The Luminous",
    author: "Dostoevsky", work: "The Brothers Karamazov",
    color: "#7a6a2a", bg: "#15120a", icon: "✶",
    summary: "You have seen the darkness and emerged not disillusioned but strangely more open. People confide in you. You don't fix their problems — you witness them. Your goodness is not naivety; it has been tested. That's what makes it real.",
    traits: [
      { label: "Behavioural Pattern", value: "Active, attending presence. You notice people. You remember what they told you three months ago." },
      { label: "Core Fear", value: "That love is not enough. That the darkness wins despite everything." },
      { label: "Hidden Strength", value: "You hold contradictions without needing to resolve them. Faith and doubt. Joy and grief." },
      { label: "Relationship Style", value: "People feel seen around you. This creates intimacy quickly — sometimes more than you intended." },
      { label: "Shadow Self", value: "Passive acceptance dressed as peace. Sometimes the loving thing is confrontation, not presence." },
    ],
    quote: "Love in action is a harsh and dreadful thing compared to love in dreams.",
    challenge: "Goodness is not the absence of conflict. Alyosha's love costs him. It costs you too — and that cost is the proof it's real.",
    tensions: ["ZARATHUSTRA", "MEURSAULT"],
    affinities: ["DEMIAN", "SISYPHUS"],
  },
  UNDERGROUND_MAN: {
    id: "UNDERGROUND_MAN", name: "The Underground Man", subtitle: "The Hyper-Conscious",
    author: "Dostoevsky", work: "Notes from Underground",
    color: "#5A5A8B", bg: "#0c0c15", icon: "⬡",
    summary: "You see too clearly. Every social norm, comfortable lie, false cheerfulness — you see through it all. And the seeing paralyzes you. You know what people are doing and why. The knowledge doesn't help. It may be making things worse.",
    traits: [
      { label: "Behavioural Pattern", value: "Hyper-analysis that loops back on itself. You can argue any position — including against your own desires." },
      { label: "Core Fear", value: "Being reduced to a formula. Being predicted. Being just another piano key in a rational system." },
      { label: "Hidden Strength", value: "Radical honesty — at least internally. You won't lie to yourself, even when it would be more comfortable." },
      { label: "Relationship Style", value: "You oscillate between craving connection and pushing it away with a kind of compulsive spite." },
      { label: "Shadow Self", value: "Spite as philosophy. You sometimes act against your own interests just to prove you can." },
    ],
    quote: "I am a sick man. I am a spiteful man. I am an unattractive man. I think my liver hurts.",
    challenge: "Awareness without action is its own cowardice. The Underground Man knows everything and does nothing. The exit is not more thinking.",
    tensions: ["DIONYSUS", "SISYPHUS"],
    affinities: ["RASKOLNIKOV", "ROQUENTIN"],
  },
  DEMIAN: {
    id: "DEMIAN", name: "Demian / Sinclair", subtitle: "The Seeker Between Worlds",
    author: "Hesse", work: "Demian / Steppenwolf",
    color: "#7a8a5a", bg: "#0e120a", icon: "◑",
    summary: "You have always sensed that there are two worlds — the bright, sanctioned world everyone pretends is the only one, and the darker, truer world beneath it. You were drawn to the second world not out of rebellion but out of necessity. You cannot unsee what you've seen.",
    traits: [
      { label: "Behavioural Pattern", value: "You seek people and ideas that crack things open. Safe conversations bore you physically." },
      { label: "Core Fear", value: "That the integration never comes. That you will always be between worlds — belonging fully to neither." },
      { label: "Hidden Strength", value: "You have done the interior work others avoid. You know your own darkness. That is rare and powerful." },
      { label: "Relationship Style", value: "You form deep bonds with people who can see what you see. You have few of them. They matter enormously." },
      { label: "Shadow Self", value: "The seeker as escape artist. Sometimes the journey inward is a way of not arriving anywhere." },
    ],
    quote: "I wanted only to try to live in accord with the promptings which came from my true self. Why was that so very difficult?",
    challenge: "The mark of Cain is not a curse — it is a calling. The question is what you build with it.",
    tensions: ["UNDERGROUND_MAN", "JOSEF_K"],
    affinities: ["ALYOSHA", "GREGOR"],
  },
  STEPPENWOLF: {
    id: "STEPPENWOLF", name: "Harry Haller", subtitle: "The Steppenwolf",
    author: "Hesse", work: "Steppenwolf",
    color: "#8a6a4a", bg: "#120e08", icon: "◐",
    summary: "You contain multitudes and they are at war. The bourgeois and the wolf. The intellectual and the animal. The person who wants comfort and the one who finds it suffocating. You are not broken. You are a person who has not yet learned to play all the instruments you possess.",
    traits: [
      { label: "Behavioural Pattern", value: "Alternating between intense engagement and complete withdrawal. Hot and cold, with little warm." },
      { label: "Core Fear", value: "That the wolf wins. Or worse — that the bourgeois wins. Either resolution feels like death." },
      { label: "Hidden Strength", value: "Your internal conflict means you cannot be complacent. You are always, uncomfortably, alive." },
      { label: "Relationship Style", value: "You fall hard for people who embody the part of yourself you're currently suppressing." },
      { label: "Shadow Self", value: "The romanticization of suffering. Pain as identity. The wolf as costume rather than truth." },
    ],
    quote: "He saw that all the hundred thousand pieces of life's game were in him... imprisoned as a prisoner in the dark.",
    challenge: "The Magic Theatre is not an escape — it is an education. You are not two wolves. You are a thousand things. Start naming them.",
    tensions: ["MEURSAULT", "SISYPHUS"],
    affinities: ["DEMIAN", "JOSEF_K"],
  },
  ROQUENTIN: {
    id: "ROQUENTIN", name: "Roquentin", subtitle: "The Nauseated",
    author: "Sartre", work: "Nausea",
    color: "#6a7a4a", bg: "#0c0f08", icon: "◬",
    summary: "You have looked at a chestnut tree root, a doorknob, your own hand — and suddenly the existence of things became unbearable. Not because they are terrible but because they simply ARE, without reason, without necessity, excessively, obscenely there. You cannot un-see this.",
    traits: [
      { label: "Behavioural Pattern", value: "You notice what others filter out — the raw, unnarrated facticity of things. This makes you precise and occasionally overwhelmed." },
      { label: "Core Fear", value: "That existence is not just meaningless but actively excessive — a nausea without cure." },
      { label: "Hidden Strength", value: "You cannot lie to yourself about foundations. You see through every comfortable story. This is a terrifying gift." },
      { label: "Relationship Style", value: "You form connections then question their necessity. Why this person? Why now? The questioning is not cruelty — it is your nature." },
      { label: "Shadow Self", value: "The nausea as superiority. Looking down at the 'salauds' — the people with clean consciences — from a height that is also a cage." },
    ],
    quote: "I exist. It's soft, so soft, so slow. And light: it seems as though it suspends in the air. It moves.",
    challenge: "Existence precedes essence — which means you are radically free to create meaning, not just observe its absence. The nausea is the beginning, not the conclusion.",
    tensions: ["ALYOSHA", "DIONYSUS"],
    affinities: ["UNDERGROUND_MAN", "GREGOR"],
  },
};

// ═══════════════════════════════════════════════════════════════════
// QUESTIONS — 10 questions, each with 4 choices
// scoring: primary archetype weights
// ═══════════════════════════════════════════════════════════════════
const QUESTIONS = [
  {
    id: 1,
    scenario: "You wake to find a letter with your name but no sender, no explanation — only a time and an address. The building, when you find it, has no sign.",
    question: "What do you do?",
    choices: [
      { text: "Go. Curiosity and a vague sense of obligation pull equally.", weights: { JOSEF_K: 3, DEMIAN: 2, SISYPHUS: 1 } },
      { text: "Ignore it entirely. They can find you if they need you.", weights: { MEURSAULT: 3, ZARATHUSTRA: 2, DIONYSUS: 1 } },
      { text: "Obsess over it for days, constructing theories, unable to act.", weights: { UNDERGROUND_MAN: 3, ROQUENTIN: 2, RASKOLNIKOV: 1 } },
      { text: "Go with dread. You feel somehow already guilty.", weights: { JOSEF_K: 2, GREGOR: 3, STEPPENWOLF: 1 } },
    ],
  },
  {
    id: 2,
    scenario: "A close friend confesses a genuine moral wrong — not illegal, but a real betrayal of someone's trust. They ask for your silence.",
    question: "What does your conscience demand?",
    choices: [
      { text: "Keep it. Loyalty to a person outweighs abstract principles.", weights: { MEURSAULT: 2, STEPPENWOLF: 2, DEMIAN: 1 } },
      { text: "You cannot promise silence — the weight would crush you.", weights: { RASKOLNIKOV: 1, ALYOSHA: 2, ROQUENTIN: 3 } },
      { text: "Keep it but it changes how you see them. You carry it alone.", weights: { GREGOR: 3, JOSEF_K: 2, UNDERGROUND_MAN: 1 } },
      { text: "Tell them they must confess themselves. Suffering through it is the only honest path.", weights: { ALYOSHA: 3, RASKOLNIKOV: 2, ZARATHUSTRA: 1 } },
    ],
  },
  {
    id: 3,
    scenario: "You are offered complete security — guaranteed income, stable relationships, predictable days — in exchange for abandoning your most ambitious dream.",
    question: "Do you take it?",
    choices: [
      { text: "Yes. The dream was probably an illusion. Stability is real.", weights: { GREGOR: 2, STEPPENWOLF: 2, JOSEF_K: 1 } },
      { text: "No. A life without the dream is a sentence, not a life.", weights: { ZARATHUSTRA: 3, DIONYSUS: 2, RASKOLNIKOV: 2 } },
      { text: "You'd want to say no. You'd probably say yes. And hate yourself.", weights: { UNDERGROUND_MAN: 3, STEPPENWOLF: 2, RASKOLNIKOV: 1 } },
      { text: "Reject it — then spend years wondering if you were just afraid of comfort.", weights: { DEMIAN: 3, SISYPHUS: 2, ROQUENTIN: 1 } },
    ],
  },
  {
    id: 4,
    scenario: "Late at night, a calm, clear thought arrives: you cannot find evidence that your life has meaning. Not a crisis — a lucid observation.",
    question: "How do you sit with that?",
    choices: [
      { text: "Meaning is made, not found. Back to work tomorrow.", weights: { SISYPHUS: 3, ZARATHUSTRA: 2, DIONYSUS: 1 } },
      { text: "The uncertainty itself feels important. You stay in it, unsettled.", weights: { ROQUENTIN: 3, DEMIAN: 2, UNDERGROUND_MAN: 2 } },
      { text: "It frightens you. You reach for something — faith, a person, a belief.", weights: { ALYOSHA: 3, GREGOR: 1, STEPPENWOLF: 2 } },
      { text: "You've thought this before. You keep moving. That is your answer.", weights: { MEURSAULT: 3, JOSEF_K: 2, SISYPHUS: 1 } },
    ],
  },
  {
    id: 5,
    scenario: "You discover that an important rule everyone follows — at work, in society — is arbitrary and serves no one. You alone see this clearly.",
    question: "What do you do with that knowledge?",
    choices: [
      { text: "Say nothing. Knowing the cage is a cage doesn't open it.", weights: { JOSEF_K: 4, GREGOR: 2, MEURSAULT: 1 } },
      { text: "Tell people. Someone must name it, even if they don't listen.", weights: { ZARATHUSTRA: 3, RASKOLNIKOV: 2, ALYOSHA: 1 } },
      { text: "Quietly stop following it. Don't announce it.", weights: { MEURSAULT: 3, DIONYSUS: 2, SISYPHUS: 1 } },
      { text: "Write it down. Document it. Even if no one reads it.", weights: { ROQUENTIN: 3, UNDERGROUND_MAN: 2, DEMIAN: 1 } },
    ],
  },
  {
    id: 6,
    scenario: "You have wronged someone meaningfully. They don't know. They never will, unless you tell them.",
    question: "Do you confess?",
    choices: [
      { text: "No. Confession serves your conscience, not them. Carry it quietly.", weights: { MEURSAULT: 3, JOSEF_K: 2, STEPPENWOLF: 1 } },
      { text: "Yes — the guilt is worse than any consequence. You need to be seen.", weights: { RASKOLNIKOV: 3, ALYOSHA: 2, DEMIAN: 1 } },
      { text: "You want to but don't. You live with that wanting.", weights: { UNDERGROUND_MAN: 3, GREGOR: 2, STEPPENWOLF: 2 } },
      { text: "Make it right without confessing — repair without disclosure.", weights: { SISYPHUS: 3, ALYOSHA: 1, ROQUENTIN: 2 } },
    ],
  },
  {
    id: 7,
    scenario: "Someone you love is suffering. They don't want help — they want to suffer alone. You believe your presence would ease their pain.",
    question: "What do you do?",
    choices: [
      { text: "Respect their wish entirely. Their suffering belongs to them.", weights: { MEURSAULT: 3, ZARATHUSTRA: 2, ROQUENTIN: 1 } },
      { text: "Stay close anyway. Love overrides their stated preference.", weights: { ALYOSHA: 4, GREGOR: 2, STEPPENWOLF: 1 } },
      { text: "Leave, but it breaks something in you. The distance feels like abandonment.", weights: { UNDERGROUND_MAN: 2, DEMIAN: 2, JOSEF_K: 2 } },
      { text: "Push gently. Their 'no' might be pride, not a real wish.", weights: { RASKOLNIKOV: 2, ALYOSHA: 2, DIONYSUS: 2 } },
    ],
  },
  {
    id: 8,
    scenario: "You encounter a system — bureaucratic, social, professional — that is clearly unjust but completely stable. Fighting it would cost you everything. Accepting it costs your integrity.",
    question: "What is your move?",
    choices: [
      { text: "Work within it while hating it. Survival first.", weights: { GREGOR: 3, JOSEF_K: 3, STEPPENWOLF: 1 } },
      { text: "Fight it. The cost is the point — to fight is to be free.", weights: { ZARATHUSTRA: 3, DIONYSUS: 2, RASKOLNIKOV: 2 } },
      { text: "Neither — find a third path, even if you have to invent it.", weights: { SISYPHUS: 3, DEMIAN: 2, MEURSAULT: 1 } },
      { text: "Document it. Name it. Make it visible, even only to yourself.", weights: { ROQUENTIN: 3, UNDERGROUND_MAN: 2, ALYOSHA: 1 } },
    ],
  },
  {
    id: 9,
    scenario: "A stranger asks you: 'Are you happy?' It is a genuine question, not small talk. They have time. So do you.",
    question: "What is your honest answer?",
    choices: [
      { text: "I don't think about it in those terms. I exist. That's something.", weights: { MEURSAULT: 3, ROQUENTIN: 2, SISYPHUS: 1 } },
      { text: "I am becoming. Happiness is the wrong metric.", weights: { ZARATHUSTRA: 3, DEMIAN: 2, DIONYSUS: 2 } },
      { text: "I have moments of it. Mostly I'm at war with myself.", weights: { STEPPENWOLF: 3, UNDERGROUND_MAN: 2, RASKOLNIKOV: 1 } },
      { text: "No. But I love things. That matters more.", weights: { ALYOSHA: 3, GREGOR: 2, SISYPHUS: 1 } },
    ],
  },
  {
    id: 10,
    scenario: "You are at the end of something — a relationship, a chapter of life, a belief you held for years. It is over. You are standing at the edge of what comes next.",
    question: "What is the truest thing you feel?",
    choices: [
      { text: "A strange, vertiginous freedom. Terror and possibility, identical.", weights: { DIONYSUS: 3, ZARATHUSTRA: 2, DEMIAN: 2 } },
      { text: "Grief. Real, full grief — for the thing itself and for who you were in it.", weights: { ALYOSHA: 2, STEPPENWOLF: 2, GREGOR: 2 } },
      { text: "The absurd clarity that it was always going to end. Everything does.", weights: { SISYPHUS: 3, MEURSAULT: 3, ROQUENTIN: 1 } },
      { text: "The awareness that you will construct a story about this — and that the story will be a lie.", weights: { ROQUENTIN: 3, UNDERGROUND_MAN: 3, JOSEF_K: 1 } },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════
// CLASH DETECTION — what to say when scores are close
// ═══════════════════════════════════════════════════════════════════
const CLASHES = {
  "JOSEF_K-MEURSAULT": {
    title: "The Accused vs. The Stranger",
    description: "You are caught between two relationships with authority: Josef K. who fights the system even as it consumes him, and Meursault who simply doesn't register it as real. Part of you complies anxiously; part of you doesn't care at all. These are not contradictions — they are two responses to the same absurd world.",
  },
  "ZARATHUSTRA-UNDERGROUND_MAN": {
    title: "The Overcomer vs. The Paralyzed",
    description: "You have the intellectual firepower of both — but one pushes upward while the other spirals inward. On good days you are Zarathustra. On dark days you are the Underground Man. The question is which one is doing the choosing.",
  },
  "RASKOLNIKOV-SISYPHUS": {
    title: "The Transgressor vs. The Revolter",
    description: "Both refuse to accept the world as given. But Raskolnikov wants to stand above it; Sisyphus wants to engage it fully, boulder and all. Your tension is between transcendence and acceptance — between the extraordinary man theory and the ordinary man who refuses to be crushed.",
  },
  "ALYOSHA-MEURSAULT": {
    title: "The Luminous vs. The Stranger",
    description: "Alyosha loves with his whole being; Meursault feels without performing. You may be someone who genuinely loves but cannot perform the rituals of love — or someone who performs them without the feeling. Either way, the gap between inner and outer is where you live.",
  },
  "DEMIAN-ROQUENTIN": {
    title: "The Seeker vs. The Nauseated",
    description: "Both have looked beneath the surface and cannot look away. But Demian finds meaning in the darkness; Roquentin finds only excessive, nauseating existence. You oscillate between these: sometimes the abyss is a doorway, sometimes it's just an abyss.",
  },
  "STEPPENWOLF-DIONYSUS": {
    title: "The Divided vs. The Affirmer",
    description: "You contain contradictions — but are you at war with them or dancing with them? The Steppenwolf suffers his multiplicity; the Dionysian celebrates it. Your score suggests you are somewhere between the suffering and the celebration.",
  },
};

// ═══════════════════════════════════════════════════════════════════
// SCORING ENGINE
// ═══════════════════════════════════════════════════════════════════
function computeResult(answers) {
  const scores = {};
  Object.keys(ARCHETYPES).forEach(k => scores[k] = 0);
  answers.forEach(choice => {
    Object.entries(choice.weights).forEach(([k, v]) => {
      scores[k] = (scores[k] || 0) + v;
    });
  });

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primary = sorted[0][0];
  const secondary = sorted[1][0];
  const tertiary = sorted[2][0];

  // clash detection: if top two are within 3 points
  const isClash = sorted[0][1] - sorted[1][1] <= 3;

  // find registered clash description
  const clashKey1 = `${primary}-${secondary}`;
  const clashKey2 = `${secondary}-${primary}`;
  const clashData = CLASHES[clashKey1] || CLASHES[clashKey2] || null;

  return { primary, secondary, tertiary, scores, isClash, clashData, sorted };
}

// ═══════════════════════════════════════════════════════════════════
// AUTHOR PALETTE
// ═══════════════════════════════════════════════════════════════════
const AUTHOR_COLORS = {
  Kafka: "#A0845C", Nietzsche: "#c4882a", Camus: "#6a9a9a",
  Dostoevsky: "#8B3A3A", Hesse: "#7a8a5a", Sartre: "#6a7a4a",
};

// ═══════════════════════════════════════════════════════════════════
// GRAIN OVERLAY
// ═══════════════════════════════════════════════════════════════════
const Grain = () => (
  <div style={{
    position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E")`,
  }} />
);

// ═══════════════════════════════════════════════════════════════════
// SHAREABLE CARD
// ═══════════════════════════════════════════════════════════════════
const ShareCard = ({ result, onClose }) => {
  const arc = ARCHETYPES[result.primary];
  const sec = ARCHETYPES[result.secondary];
  const cardRef = useRef(null);

  const handleCopy = () => {
    const text = `I am ${arc.name} — ${arc.subtitle}\n"${arc.quote}"\n\n${arc.summary}\n\nMy shadow: ${arc.traits.find(t => t.label === "Shadow Self")?.value}\n\nDiscover yours at: The Literary Soul`;
    navigator.clipboard?.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "#000000cc", zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem"
    }} onClick={onClose}>
      <div ref={cardRef} onClick={e => e.stopPropagation()} style={{
        background: arc.bg, border: `1px solid ${arc.color}44`,
        borderLeft: `4px solid ${arc.color}`, maxWidth: 480, width: "100%",
        padding: "2.5rem", fontFamily: "'Palatino Linotype', Palatino, serif",
        position: "relative", borderRadius: "2px"
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: "1rem", right: "1rem",
          background: "none", border: "none", color: "#4a3a1a",
          cursor: "pointer", fontSize: "1.2rem", fontFamily: "inherit"
        }}>×</button>

        <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{arc.icon}</div>
        <p style={{ margin: "0 0 0.2rem", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: arc.color }}>
          {arc.author} — {arc.work}
        </p>
        <h2 style={{ margin: "0 0 0.2rem", color: "#e8d5a3", fontWeight: 400, fontSize: "2rem" }}>{arc.name}</h2>
        <p style={{ margin: "0 0 1.5rem", color: `${arc.color}aa`, fontStyle: "italic" }}>{arc.subtitle}</p>

        <p style={{ margin: "0 0 1.5rem", color: "#9a8a6a", lineHeight: 1.7, fontSize: "0.9rem" }}>
          {arc.summary}
        </p>

        <div style={{ borderTop: `1px solid ${arc.color}22`, paddingTop: "1rem", marginBottom: "1.5rem" }}>
          <p style={{ margin: "0 0 0.3rem", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: arc.color }}>
            Shadow Self
          </p>
          <p style={{ margin: 0, color: "#7a6a45", fontStyle: "italic", fontSize: "0.85rem", lineHeight: 1.6 }}>
            {arc.traits.find(t => t.label === "Shadow Self")?.value}
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <span style={{ fontSize: "0.7rem", color: "#3a2a0e", letterSpacing: "0.1em" }}>RESONATES WITH:</span>
          <span style={{ border: `1px solid ${sec.color}44`, color: sec.color, padding: "0.2rem 0.5rem", fontSize: "0.75rem", borderRadius: "2px" }}>
            {sec.icon} {sec.name}
          </span>
        </div>

        <div style={{ marginTop: "1.5rem", borderTop: `1px solid ${arc.color}22`, paddingTop: "1rem" }}>
          <p style={{ margin: "0 0 0.5rem", fontStyle: "italic", color: "#5a4a2a", fontSize: "0.8rem" }}>
            "{arc.quote}"
          </p>
          <p style={{ margin: 0, fontSize: "0.6rem", letterSpacing: "0.2em", color: arc.color }}>{arc.author}</p>
        </div>

        <button onClick={handleCopy} style={{
          marginTop: "1.5rem", width: "100%", background: "none",
          border: `1px solid ${arc.color}66`, color: arc.color,
          padding: "0.75rem", fontFamily: "inherit", fontSize: "0.75rem",
          letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer",
          borderRadius: "2px", transition: "all 0.3s"
        }}>
          Copy to Share
        </button>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// COMPARE MODE
// ═══════════════════════════════════════════════════════════════════
const CompareMode = ({ onClose }) => {
  const [a, setA] = useState("JOSEF_K");
  const [b, setB] = useState("RASKOLNIKOV");
  const arcA = ARCHETYPES[a];
  const arcB = ARCHETYPES[b];
  const clashKey1 = `${a}-${b}`;
  const clashKey2 = `${b}-${a}`;
  const clash = CLASHES[clashKey1] || CLASHES[clashKey2];

  return (
    <div style={{
      position: "fixed", inset: 0, background: "#000000dd", zIndex: 100,
      overflow: "auto", fontFamily: "'Palatino Linotype', Palatino, serif"
    }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h2 style={{ margin: 0, color: "#c8b880", fontWeight: 400, fontSize: "1.5rem" }}>Compare Archetypes</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#5a4a2a", cursor: "pointer", fontSize: "1.5rem", fontFamily: "inherit" }}>×</button>
        </div>

        {/* Selectors */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {[{ val: a, set: setA, arc: arcA }, { val: b, set: setB, arc: arcB }].map(({ val, set, arc }, i) => (
            <div key={i}>
              <p style={{ margin: "0 0 0.5rem", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#4a3a1a" }}>
                {i === 0 ? "First" : "Second"}
              </p>
              <select value={val} onChange={e => set(e.target.value)} style={{
                width: "100%", background: "#120e08", border: `1px solid ${arc.color}44`,
                color: arc.color, padding: "0.75rem", fontFamily: "inherit", fontSize: "0.9rem",
                cursor: "pointer", borderRadius: "2px", outline: "none"
              }}>
                {Object.values(ARCHETYPES).map(ar => (
                  <option key={ar.id} value={ar.id} style={{ background: "#120e08", color: "#c8b880" }}>
                    {ar.icon} {ar.name} ({ar.author})
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Comparison grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
          {[arcA, arcB].map(arc => (
            <div key={arc.id} style={{
              background: arc.bg, border: `1px solid ${arc.color}33`,
              borderTop: `3px solid ${arc.color}`, padding: "1.5rem", borderRadius: "2px"
            }}>
              <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>{arc.icon}</div>
              <p style={{ margin: "0 0 0.2rem", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: arc.color }}>{arc.author}</p>
              <h3 style={{ margin: "0 0 0.2rem", color: "#e8d5a3", fontWeight: 400, fontSize: "1.3rem" }}>{arc.name}</h3>
              <p style={{ margin: "0 0 1rem", color: `${arc.color}88`, fontStyle: "italic", fontSize: "0.85rem" }}>{arc.subtitle}</p>
              <p style={{ margin: "0 0 1rem", color: "#8a7a5a", fontSize: "0.85rem", lineHeight: 1.6 }}>{arc.summary}</p>

              {arc.traits.map((t, i) => (
                <div key={i} style={{ marginBottom: "0.75rem" }}>
                  <p style={{ margin: "0 0 0.2rem", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: arc.color }}>{t.label}</p>
                  <p style={{ margin: 0, color: "#6a5a35", fontSize: "0.8rem", lineHeight: 1.5 }}>{t.value}</p>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Tensions & Affinities */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
          {[arcA, arcB].map(arc => (
            <div key={arc.id} style={{ background: "#120e08", border: `1px solid #1e1608`, padding: "1rem", borderRadius: "2px" }}>
              <p style={{ margin: "0 0 0.5rem", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#4a3a1a" }}>
                {arc.name}'s tensions
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.75rem" }}>
                {arc.tensions.map(t => {
                  const ta = ARCHETYPES[t];
                  return <span key={t} style={{ border: `1px solid ${ta?.color}44`, color: ta?.color, padding: "0.2rem 0.5rem", fontSize: "0.7rem", borderRadius: "2px" }}>{ta?.name}</span>;
                })}
              </div>
              <p style={{ margin: "0 0 0.5rem", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#4a3a1a" }}>
                {arc.name}'s affinities
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {arc.affinities.map(t => {
                  const ta = ARCHETYPES[t];
                  return <span key={t} style={{ border: `1px solid ${ta?.color}44`, color: ta?.color, padding: "0.2rem 0.5rem", fontSize: "0.7rem", borderRadius: "2px" }}>{ta?.name}</span>;
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Registered clash if exists */}
        {clash && (
          <div style={{ background: "#1a1208", border: "1px solid #3a2a0e", borderLeft: "3px solid #8B6914", padding: "1.25rem", borderRadius: "2px" }}>
            <p style={{ margin: "0 0 0.4rem", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8B6914" }}>Registered Tension</p>
            <p style={{ margin: "0 0 0.5rem", color: "#c8b880", fontWeight: 400 }}>{clash.title}</p>
            <p style={{ margin: 0, color: "#7a6a45", lineHeight: 1.7, fontSize: "0.9rem" }}>{clash.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════
// PROGRESS BAR
// ═══════════════════════════════════════════════════════════════════
const ProgressBar = ({ total, current }) => (
  <div style={{ display: "flex", gap: "5px", justifyContent: "center", marginBottom: "2rem" }}>
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} style={{
        height: 6, borderRadius: 3,
        width: i < current ? 28 : i === current ? 16 : 8,
        background: i < current ? "#A0845C" : i === current ? "#c8b880" : "#2a1e0e",
        transition: "all 0.4s ease"
      }} />
    ))}
  </div>
);

// ═══════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════
export default function App() {
  const [phase, setPhase] = useState("intro");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [fading, setFading] = useState(false);
  const [result, setResult] = useState(null);
  const [revealStep, setRevealStep] = useState(0);
  const [showShare, setShowShare] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  const choose = (choice) => {
    if (fading || selected) return;
    setSelected(choice);
    setFading(true);
    setTimeout(() => {
      const newAnswers = [...answers, choice];
      if (qIndex + 1 < QUESTIONS.length) {
        setAnswers(newAnswers);
        setQIndex(qIndex + 1);
        setSelected(null);
        setFading(false);
      } else {
        const r = computeResult(newAnswers);
        setResult(r);
        setPhase("result");
        setFading(false);
        [400, 800, 1200, 1800, 2400].forEach((t, i) => setTimeout(() => setRevealStep(i + 1), t));
      }
    }, 500);
  };

  const restart = () => {
    setPhase("intro"); setQIndex(0); setAnswers([]); setSelected(null);
    setResult(null); setRevealStep(0); setActiveTab("profile");
  };

  const font = "'Palatino Linotype', 'Book Antiqua', Palatino, serif";

  // ── INTRO ──────────────────────────────────────────────────────
  if (phase === "intro") return (
    <div style={{ minHeight: "100vh", background: "#080604", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", fontFamily: font }}>
      <Grain />
      <div style={{ maxWidth: 600, width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginBottom: "1.5rem", fontSize: "1.5rem", color: "#2a1e0e" }}>
            <span>⚖</span><span>◈</span><span>◉</span><span>✦</span><span>◑</span><span>◬</span>
          </div>
          <h1 style={{ margin: "0 0 0.5rem", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 400, color: "#e8d5a3", letterSpacing: "0.03em", lineHeight: 1.1 }}>
            The Literary Soul
          </h1>
          <p style={{ margin: "0 0 0.25rem", color: "#5a4a2a", fontStyle: "italic", fontSize: "1rem" }}>
            A personality portrait through existential literature
          </p>
          <p style={{ margin: 0, color: "#3a2a0e", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Kafka · Nietzsche · Camus · Dostoevsky · Hesse · Nabokov/Sartre
          </p>
        </div>

        <div style={{ background: "#120e08", border: "1px solid #2a1e0e", borderLeft: "3px solid #6b5a35", padding: "1.5rem", marginBottom: "2rem", borderRadius: "2px" }}>
          <p style={{ margin: "0 0 0.75rem", color: "#9a8a6a", lineHeight: 1.8 }}>
            Ten situations. No right answers. Each choice is scored across twelve archetypes drawn from six of literature's darkest, most honest thinkers.
          </p>
          <p style={{ margin: 0, color: "#5a4a2a", fontSize: "0.85rem", fontStyle: "italic" }}>
            Your result includes: primary archetype · resonant secondary · clash detection if your answers are divided · a shareable card · and a comparison mode.
          </p>
        </div>

        {/* Author roster */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem", marginBottom: "2rem" }}>
          {Object.entries(AUTHOR_COLORS).map(([author, color]) => {
            const authorArcs = Object.values(ARCHETYPES).filter(a => a.author === author);
            return (
              <div key={author} style={{ background: "#0e0c08", border: `1px solid ${color}22`, borderTop: `2px solid ${color}44`, padding: "0.75rem", borderRadius: "2px" }}>
                <p style={{ margin: "0 0 0.4rem", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color }}>{author}</p>
                {authorArcs.map(a => (
                  <p key={a.id} style={{ margin: "0.15rem 0", fontSize: "0.75rem", color: "#5a4a2a", fontStyle: "italic" }}>{a.icon} {a.name}</p>
                ))}
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button onClick={() => setPhase("quiz")} style={{
            flex: 2, background: "none", border: "1px solid #8B6914", color: "#c49a2a",
            padding: "1rem 2rem", fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase",
            cursor: "pointer", fontFamily: font, borderRadius: "2px", transition: "all 0.3s"
          }}
            onMouseEnter={e => e.target.style.background = "#8B691422"}
            onMouseLeave={e => e.target.style.background = "none"}
          >Enter the Labyrinth</button>
          <button onClick={() => setShowCompare(true)} style={{
            flex: 1, background: "none", border: "1px solid #2a1e0e", color: "#5a4a2a",
            padding: "1rem", fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase",
            cursor: "pointer", fontFamily: font, borderRadius: "2px", transition: "all 0.3s"
          }}
            onMouseEnter={e => { e.target.style.borderColor = "#5a4a2a"; e.target.style.color = "#8a7a5a"; }}
            onMouseLeave={e => { e.target.style.borderColor = "#2a1e0e"; e.target.style.color = "#5a4a2a"; }}
          >Compare</button>
        </div>
      </div>
      {showCompare && <CompareMode onClose={() => setShowCompare(false)} />}
    </div>
  );

  // ── QUIZ ───────────────────────────────────────────────────────
  if (phase === "quiz") {
    const q = QUESTIONS[qIndex];
    return (
      <div style={{ minHeight: "100vh", background: "#080604", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", fontFamily: font }}>
        <Grain />
        <div style={{ maxWidth: 640, width: "100%", position: "relative", zIndex: 1 }}>
          <ProgressBar total={QUESTIONS.length} current={qIndex} />
          <div style={{ opacity: fading ? 0 : 1, transform: fading ? "translateY(-10px)" : "translateY(0)", transition: "all 0.4s ease" }}>
            <p style={{ margin: "0 0 0.4rem", textAlign: "center", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#3a2a0e" }}>
              Situation {qIndex + 1} of {QUESTIONS.length}
            </p>
            <div style={{ background: "#120e08", border: "1px solid #1e1608", borderLeft: "3px solid #2a1e0e", padding: "1.5rem", marginBottom: "1.5rem", borderRadius: "2px" }}>
              <p style={{ margin: 0, color: "#8a7a5a", lineHeight: 1.8, fontStyle: "italic" }}>{q.scenario}</p>
            </div>
            <h2 style={{ margin: "0 0 1.5rem", color: "#c8b880", fontWeight: 400, fontSize: "1.2rem", textAlign: "center" }}>{q.question}</h2>
            <div style={{ display: "grid", gap: "0.7rem" }}>
              {q.choices.map((choice, idx) => {
                const isSel = selected === choice;
                return (
                  <button key={idx} onClick={() => choose(choice)} style={{
                    background: isSel ? "#1a1208" : "#0e0c08",
                    border: isSel ? "1px solid #A0845C" : "1px solid #1e1608",
                    borderLeft: isSel ? "3px solid #A0845C" : "3px solid transparent",
                    padding: "1.1rem 1.25rem", textAlign: "left", cursor: "pointer",
                    fontFamily: font, color: isSel ? "#c8b880" : "#6a5a35",
                    fontSize: "0.95rem", lineHeight: 1.6, borderRadius: "2px",
                    transition: "all 0.25s", opacity: selected && !isSel ? 0.35 : 1
                  }}
                    onMouseEnter={e => { if (!selected) { e.currentTarget.style.borderLeftColor = "#4a3a1a"; e.currentTarget.style.color = "#9a8a6a"; } }}
                    onMouseLeave={e => { if (!selected) { e.currentTarget.style.borderLeftColor = "transparent"; e.currentTarget.style.color = "#6a5a35"; } }}
                  >{choice.text}</button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── RESULT ─────────────────────────────────────────────────────
  if (phase === "result" && result) {
    const arc = ARCHETYPES[result.primary];
    const secArc = ARCHETYPES[result.secondary];
    const terArc = ARCHETYPES[result.tertiary];

    return (
      <div style={{ minHeight: "100vh", background: arc.bg, fontFamily: font }}>
        <Grain />
        {showShare && <ShareCard result={result} onClose={() => setShowShare(false)} />}
        {showCompare && <CompareMode onClose={() => setShowCompare(false)} />}

        {/* Hero */}
        <div style={{
          position: "relative", zIndex: 1, padding: "3rem 2rem 2rem", textAlign: "center",
          borderBottom: `1px solid ${arc.color}22`,
          opacity: revealStep >= 1 ? 1 : 0, transform: revealStep >= 1 ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s ease"
        }}>
          <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>{arc.icon}</div>
          <p style={{ margin: "0 0 0.25rem", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: arc.color }}>
            {arc.author} — {arc.work}
          </p>
          <h1 style={{ margin: "0 0 0.2rem", fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 400, color: "#e8d5a3" }}>
            {arc.name}
          </h1>
          <p style={{ margin: "0 0 1.5rem", fontStyle: "italic", color: `${arc.color}bb`, fontSize: "1.1rem" }}>
            {arc.subtitle}
          </p>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { label: "Share Card", action: () => setShowShare(true) },
              { label: "Compare Archetypes", action: () => setShowCompare(true) },
              { label: "Retake", action: restart },
            ].map(btn => (
              <button key={btn.label} onClick={btn.action} style={{
                background: "none", border: `1px solid ${arc.color}55`, color: arc.color,
                padding: "0.5rem 1.25rem", fontSize: "0.75rem", letterSpacing: "0.15em",
                textTransform: "uppercase", cursor: "pointer", fontFamily: font,
                borderRadius: "2px", transition: "all 0.2s"
              }}
                onMouseEnter={e => e.currentTarget.style.background = `${arc.color}18`}
                onMouseLeave={e => e.currentTarget.style.background = "none"}
              >{btn.label}</button>
            ))}
          </div>
        </div>

        {/* Tab navigation */}
        <div style={{
          position: "relative", zIndex: 1, borderBottom: `1px solid ${arc.color}18`,
          display: "flex", justifyContent: "center", gap: 0,
          opacity: revealStep >= 2 ? 1 : 0, transition: "opacity 0.5s ease 0.3s"
        }}>
          {["profile", "clash", "scores", "challenge"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              background: "none", border: "none",
              borderBottom: activeTab === tab ? `2px solid ${arc.color}` : "2px solid transparent",
              color: activeTab === tab ? arc.color : "#3a2a0e",
              padding: "0.85rem 1.25rem", cursor: "pointer", fontFamily: font,
              fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase",
              transition: "all 0.2s"
            }}>
              {tab === "clash" ? (result.isClash ? "⚡ Divided Soul" : "Resonances") : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{
          maxWidth: 720, margin: "0 auto", padding: "2rem",
          position: "relative", zIndex: 1,
          opacity: revealStep >= 3 ? 1 : 0, transition: "opacity 0.6s ease 0.5s"
        }}>

          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <div>
              <div style={{ background: "#ffffff08", border: `1px solid ${arc.color}22`, borderLeft: `3px solid ${arc.color}`, padding: "1.5rem", marginBottom: "2rem", borderRadius: "2px" }}>
                <p style={{ margin: 0, color: "#c8b880", lineHeight: 1.8 }}>{arc.summary}</p>
              </div>

              {arc.traits.map((trait, i) => (
                <div key={i} style={{
                  borderBottom: `1px solid ${arc.color}15`, padding: "1.25rem 0",
                  opacity: revealStep >= 4 ? 1 : 0,
                  transform: revealStep >= 4 ? "translateX(0)" : "translateX(-12px)",
                  transition: `all 0.5s ease ${i * 0.1}s`
                }}>
                  <p style={{ margin: "0 0 0.4rem", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: arc.color }}>{trait.label}</p>
                  <p style={{ margin: 0, color: "#9a8a6a", lineHeight: 1.7 }}>{trait.value}</p>
                </div>
              ))}

              <div style={{ marginTop: "2rem", background: "#ffffff06", border: `1px solid ${arc.color}22`, padding: "1.25rem", borderRadius: "2px" }}>
                <p style={{ margin: "0 0 0.4rem", fontStyle: "italic", color: "#7a6a45", lineHeight: 1.7, fontSize: "0.9rem" }}>"{arc.quote}"</p>
                <p style={{ margin: 0, fontSize: "0.65rem", letterSpacing: "0.15em", color: arc.color }}>{arc.author}</p>
              </div>
            </div>
          )}

          {/* CLASH TAB */}
          {activeTab === "clash" && (
            <div>
              {result.isClash ? (
                <div>
                  <div style={{ background: "#1a1208", border: "1px solid #3a2a0e", borderLeft: "3px solid #A0845C", padding: "1.5rem", marginBottom: "1.5rem", borderRadius: "2px" }}>
                    <p style={{ margin: "0 0 0.4rem", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#A0845C" }}>⚡ Divided Soul Detected</p>
                    <p style={{ margin: 0, color: "#c8b880", lineHeight: 1.7 }}>
                      Your answers didn't converge cleanly on one archetype. The gap between your primary and secondary scores is narrow — meaning you genuinely inhabit more than one of these worlds.
                    </p>
                  </div>

                  {result.clashData && (
                    <div style={{ background: "#120e08", border: "1px solid #2a1e0e", padding: "1.5rem", marginBottom: "1.5rem", borderRadius: "2px" }}>
                      <p style={{ margin: "0 0 0.4rem", color: "#c8b880", fontWeight: 400 }}>{result.clashData.title}</p>
                      <p style={{ margin: 0, color: "#7a6a45", lineHeight: 1.7, fontSize: "0.9rem" }}>{result.clashData.description}</p>
                    </div>
                  )}

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    {[arc, secArc].map((a, i) => (
                      <div key={i} style={{ background: a.bg, border: `1px solid ${a.color}33`, borderTop: `2px solid ${a.color}`, padding: "1.25rem", borderRadius: "2px" }}>
                        <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{a.icon}</div>
                        <p style={{ margin: "0 0 0.2rem", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: a.color }}>{i === 0 ? "Primary" : "Secondary"}</p>
                        <h3 style={{ margin: "0 0 0.25rem", color: "#e8d5a3", fontWeight: 400, fontSize: "1.1rem" }}>{a.name}</h3>
                        <p style={{ margin: "0 0 0.75rem", color: `${a.color}88`, fontStyle: "italic", fontSize: "0.8rem" }}>{a.subtitle}</p>
                        <p style={{ margin: 0, color: "#6a5a35", fontSize: "0.8rem", lineHeight: 1.6 }}>{a.summary.substring(0, 140)}…</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <p style={{ color: "#7a6a45", fontStyle: "italic", marginBottom: "1.5rem", lineHeight: 1.7 }}>
                    Your answers aligned clearly with {arc.name}. Below are the archetypes that stand in tension with yours — and those that share your resonance.
                  </p>

                  <div style={{ marginBottom: "1.5rem" }}>
                    <p style={{ margin: "0 0 0.75rem", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#4a3a1a" }}>In Tension With You</p>
                    <div style={{ display: "grid", gap: "0.75rem" }}>
                      {arc.tensions.map(id => {
                        const ta = ARCHETYPES[id];
                        return (
                          <div key={id} style={{ background: ta.bg, border: `1px solid ${ta.color}33`, borderLeft: `2px solid ${ta.color}`, padding: "1rem", borderRadius: "2px" }}>
                            <p style={{ margin: "0 0 0.2rem", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: ta.color }}>{ta.author}</p>
                            <p style={{ margin: "0 0 0.3rem", color: "#c8b880", fontWeight: 400 }}>{ta.icon} {ta.name} — {ta.subtitle}</p>
                            <p style={{ margin: 0, color: "#5a4a2a", fontSize: "0.82rem", lineHeight: 1.5 }}>{ta.summary.substring(0, 120)}…</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <p style={{ margin: "0 0 0.75rem", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#4a3a1a" }}>Shares Your Resonance</p>
                    <div style={{ display: "grid", gap: "0.75rem" }}>
                      {arc.affinities.map(id => {
                        const ta = ARCHETYPES[id];
                        return (
                          <div key={id} style={{ background: ta.bg, border: `1px solid ${ta.color}33`, borderLeft: `2px solid ${ta.color}`, padding: "1rem", borderRadius: "2px" }}>
                            <p style={{ margin: "0 0 0.2rem", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: ta.color }}>{ta.author}</p>
                            <p style={{ margin: "0 0 0.3rem", color: "#c8b880", fontWeight: 400 }}>{ta.icon} {ta.name} — {ta.subtitle}</p>
                            <p style={{ margin: 0, color: "#5a4a2a", fontSize: "0.82rem", lineHeight: 1.5 }}>{ta.summary.substring(0, 120)}…</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SCORES TAB */}
          {activeTab === "scores" && (
            <div>
              <p style={{ color: "#5a4a2a", fontStyle: "italic", marginBottom: "1.5rem", fontSize: "0.9rem", lineHeight: 1.7 }}>
                How your answers distributed across all twelve archetypes. Every archetype contains something true about you — the question is proportion.
              </p>
              {result.sorted.map(([id, score], i) => {
                const a = ARCHETYPES[id];
                const max = result.sorted[0][1];
                const pct = max > 0 ? (score / max) * 100 : 0;
                return (
                  <div key={id} style={{ marginBottom: "0.85rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ color: a.color, fontSize: "1rem" }}>{a.icon}</span>
                        <span style={{ color: i === 0 ? "#e8d5a3" : "#6a5a35", fontSize: "0.88rem" }}>{a.name}</span>
                        <span style={{ color: "#3a2a0e", fontSize: "0.7rem", fontStyle: "italic" }}>{a.author}</span>
                      </div>
                      <span style={{ color: i === 0 ? a.color : "#3a2a0e", fontSize: "0.8rem" }}>{score}</span>
                    </div>
                    <div style={{ width: "100%", background: "#1a1208", height: 6, borderRadius: 3, overflow: "hidden" }}>
                      <div style={{
                        width: `${pct}%`, height: "100%", background: a.color,
                        opacity: i === 0 ? 1 : 0.4, borderRadius: 3,
                        transition: "width 1s ease"
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* CHALLENGE TAB */}
          {activeTab === "challenge" && (
            <div>
              <div style={{ background: `${arc.color}11`, border: `1px solid ${arc.color}44`, borderLeft: `3px solid ${arc.color}`, padding: "1.5rem", marginBottom: "2rem", borderRadius: "2px" }}>
                <p style={{ margin: "0 0 0.5rem", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: arc.color }}>Your Challenge</p>
                <p style={{ margin: 0, color: "#c8b880", lineHeight: 1.8 }}>{arc.challenge}</p>
              </div>

              <div style={{ marginBottom: "2rem" }}>
                <p style={{ margin: "0 0 1rem", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#3a2a0e" }}>Recommended Reading</p>
                {Object.values(ARCHETYPES).filter(a => a.author === arc.author).map(a => (
                  <div key={a.id} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", alignItems: "center" }}>
                    <span style={{ color: arc.color }}>{a.icon}</span>
                    <span style={{ color: "#6a5a35", fontStyle: "italic", fontSize: "0.9rem" }}>{a.work}</span>
                    <span style={{ color: "#3a2a0e", fontSize: "0.8rem" }}>— {a.author}</span>
                  </div>
                ))}
                {secArc && Object.values(ARCHETYPES).filter(a => a.author === secArc.author && a.author !== arc.author).map(a => (
                  <div key={a.id} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", alignItems: "center" }}>
                    <span style={{ color: secArc.color }}>{a.icon}</span>
                    <span style={{ color: "#6a5a35", fontStyle: "italic", fontSize: "0.9rem" }}>{a.work}</span>
                    <span style={{ color: "#3a2a0e", fontSize: "0.8rem" }}>— {a.author}</span>
                  </div>
                ))}
              </div>

              <div style={{ background: "#120e08", border: "1px solid #1e1608", padding: "1.25rem", borderRadius: "2px" }}>
                <p style={{ margin: "0 0 0.4rem", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#4a3a1a" }}>Also resonating</p>
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  {[secArc, terArc].filter(Boolean).map(a => (
                    <span key={a.id} style={{ border: `1px solid ${a.color}44`, color: a.color, padding: "0.25rem 0.6rem", fontSize: "0.78rem", borderRadius: "2px", fontStyle: "italic" }}>
                      {a.icon} {a.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "1rem 2rem 3rem", borderTop: `1px solid ${arc.color}11` }}>
          <p style={{ margin: 0, color: "#2a1e0e", fontSize: "0.7rem", letterSpacing: "0.1em" }}>
            The Literary Soul · Kafka · Nietzsche · Camus · Dostoevsky · Hesse · Sartre
          </p>
        </div>
      </div>
    );
  }

  return null;
}
