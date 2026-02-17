import { useState, useCallback } from "react";

const ARCHETYPES = {
  JOSEF_K: {
    id:"JOSEF_K",name:"Josef K.",subtitle:"The Accused",author:"Kafka",work:"The Trial",color:"#A0845C",bg:"#120e08",icon:"⚖",
    summary:"You move through the world with a persistent, low-grade sense that something is required of you — but no one will say what. You comply without knowing why. You resist without knowing how. Precise, anxious, quietly furious at systems you cannot name.",
    traits:[
      {label:"Behavioural Pattern",value:"You operate inside structures even when you resent them. Rule-following is strategy, not comfort."},
      {label:"Core Fear",value:"Being found guilty of something you didn't do — or something you did without knowing it."},
      {label:"Hidden Strength",value:"You notice what others miss. The absurdity others accept strikes you as intolerable."},
      {label:"Relationship Style",value:"You attract people with your seriousness but keep them at careful distance. Intimacy feels like exposure."},
      {label:"Shadow Self",value:"Paralysis dressed as deliberation. You think so long about the right move that the moment passes."},
    ],
    quote:"Someone must have slandered Josef K., for one morning, without having done anything wrong, he was arrested.",
    challenge:"The system will not explain itself. Your task is to live well inside the inexplicable — not to solve it.",
    tensions:["MEURSAULT","ZARATHUSTRA"],affinities:["GREGOR","STEPPENWOLF"],
  },
  GREGOR:{
    id:"GREGOR",name:"Gregor Samsa",subtitle:"The Transformed",author:"Kafka",work:"The Metamorphosis",color:"#5a8a5a",bg:"#0a120a",icon:"◈",
    summary:"You have felt yourself become unrecognizable — to others or yourself. You function. You provide. But somewhere the person doing those things became separate from the person watching. You carry others. You rarely ask to be carried.",
    traits:[
      {label:"Behavioural Pattern",value:"Self-erasure through service. You define yourself by usefulness, which makes you fragile when you cannot be useful."},
      {label:"Core Fear",value:"That without your function — your productivity, your role — you have no claim on love."},
      {label:"Hidden Strength",value:"A capacity for endurance that borders on the profound. You absorb what would break others, quietly."},
      {label:"Relationship Style",value:"You give more than you take and resent it less than you should. This confuses people."},
      {label:"Shadow Self",value:"The transformation you haven't admitted yet. The self suppressed in order to remain acceptable."},
    ],
    quote:"As Gregor Samsa awoke one morning from uneasy dreams, he found himself transformed.",
    challenge:"Your worth is not your output. The people who only love your function are not loving you.",
    tensions:["ZARATHUSTRA","ROQUENTIN"],affinities:["JOSEF_K","DEMIAN"],
  },
  ZARATHUSTRA:{
    id:"ZARATHUSTRA",name:"Zarathustra",subtitle:"The Overcomer",author:"Nietzsche",work:"Thus Spoke Zarathustra",color:"#c4882a",bg:"#150f04",icon:"⬡",
    summary:"You are constitutionally unable to accept the world as given. You push against every ceiling — moral, social, personal. Your fire is real. So is your loneliness. You have climbed to a height where the air is thin and the company sparse.",
    traits:[
      {label:"Behavioural Pattern",value:"You set standards others find exhausting or threatening. You cannot pretend to be less than you are."},
      {label:"Core Fear",value:"Becoming the Last Man — comfortable, mediocre, blinking contentedly while life passes."},
      {label:"Hidden Strength",value:"You give people permission to want more. Your refusal to settle is contagious."},
      {label:"Relationship Style",value:"Intense and asymmetric. You love fiercely but your standards make sustained closeness difficult."},
      {label:"Shadow Self",value:"The will to power turned inward as contempt — for others, yes, but mostly for yourself."},
    ],
    quote:"I teach you the Overman. Man is something that shall be overcome.",
    challenge:"The Overman is not above humanity — it is what humanity can become. Descent is not defeat.",
    tensions:["GREGOR","ALYOSHA"],affinities:["RASKOLNIKOV","MEURSAULT"],
  },
  DIONYSUS:{
    id:"DIONYSUS",name:"The Dionysian",subtitle:"The Affirmer",author:"Nietzsche",work:"The Birth of Tragedy",color:"#8a4a8a",bg:"#110811",icon:"◉",
    summary:"You say yes to life even when life is terrible. This is not naivety — you have looked into the abyss and chosen affirmation anyway. You are drawn to chaos, creation, and the intoxicating edge between them.",
    traits:[
      {label:"Behavioural Pattern",value:"You embrace contradiction. You can hold joy and grief simultaneously without needing to resolve them."},
      {label:"Core Fear",value:"The Apollonian trap: too much order and reason draining the life from everything."},
      {label:"Hidden Strength",value:"Amor fati — love of fate. You transform suffering into fuel rather than letting it become dead weight."},
      {label:"Relationship Style",value:"Magnetic and consuming. People feel more alive around you, sometimes dangerously so."},
      {label:"Shadow Self",value:"Affirmation as avoidance. 'Yes to everything' is sometimes a refusal to discriminate what matters."},
    ],
    quote:"What does not kill me makes me stronger.",
    challenge:"Eternal recurrence: if you had to live this exact life again — would you? That answer tells you everything.",
    tensions:["UNDERGROUND_MAN","ROQUENTIN"],affinities:["ZARATHUSTRA","MEURSAULT"],
  },
  MEURSAULT:{
    id:"MEURSAULT",name:"Meursault",subtitle:"The Stranger",author:"Camus",work:"The Stranger",color:"#6a9a9a",bg:"#080f0f",icon:"◇",
    summary:"You exist at a remove from the performances others take seriously. Social grief, moral outrage, romantic obligation — you observe these as a slightly baffled outsider. This is not coldness. It is radical honesty about what you actually feel.",
    traits:[
      {label:"Behavioural Pattern",value:"You respond to the present moment with unusual directness. Sentiment and social theatre don't move you."},
      {label:"Core Fear",value:"Not death — but being forced to perform a meaning you don't feel. The chaplain in the cell is your nightmare."},
      {label:"Hidden Strength",value:"Authenticity without effort. You cannot be manipulated by guilt or social obligation."},
      {label:"Relationship Style",value:"People sense you are fully present but somehow unreachable. This is maddening and magnetic."},
      {label:"Shadow Self",value:"The passivity that looks like freedom. Things happen to Meursault. He rarely chooses."},
    ],
    quote:"Mother died today. Or maybe yesterday; I can't be sure.",
    challenge:"The absurd hero must revolt — live fully in the face of meaninglessness. Clarity without action is only half the answer.",
    tensions:["ALYOSHA","JOSEF_K"],affinities:["DIONYSUS","ZARATHUSTRA"],
  },
  SISYPHUS:{
    id:"SISYPHUS",name:"Sisyphus",subtitle:"The Revolter",author:"Camus",work:"The Myth of Sisyphus",color:"#9a7a3a",bg:"#120f06",icon:"⬟",
    summary:"You have looked at the absurd — the silence of the universe, the human need for meaning — and refused to blink. You push the boulder. You know it will roll back. You push it again. This is not defeat. Camus says you must be imagined happy.",
    traits:[
      {label:"Behavioural Pattern",value:"You return to difficult things with calm persistence. Not optimism — revolt. Conscious, chosen engagement."},
      {label:"Core Fear",value:"Philosophical suicide — the leap into faith or nihilism to escape the tension of not knowing."},
      {label:"Hidden Strength",value:"You have made peace with impermanence. You find meaning in the act, not the outcome."},
      {label:"Relationship Style",value:"Steadying presence. People feel less afraid of their own struggles around you."},
      {label:"Shadow Self",value:"The performance of contentment. Are you truly at peace — or have you learned to look like it?"},
    ],
    quote:"One must imagine Sisyphus happy.",
    challenge:"The revolt must be genuine, not performed. Ask yourself daily: am I choosing this — or merely enduring it?",
    tensions:["RASKOLNIKOV","UNDERGROUND_MAN"],affinities:["MEURSAULT","DEMIAN"],
  },
  RASKOLNIKOV:{
    id:"RASKOLNIKOV",name:"Raskolnikov",subtitle:"The Transgressor",author:"Dostoevsky",work:"Crime and Punishment",color:"#8B3A3A",bg:"#150a0a",icon:"✦",
    summary:"You believe — perhaps rightly — that you are capable of more than the world allows. This creates dangerous pressure. You theorize your way into positions that feel liberating and are quietly devastating. Your suffering is real. So is your pride.",
    traits:[
      {label:"Behavioural Pattern",value:"You construct elaborate justifications for what you already want to do. The theory comes after the desire."},
      {label:"Core Fear",value:"Mediocrity. Being ordinary. Spending your capacities on things unworthy of them."},
      {label:"Hidden Strength",value:"Ferocious intellectual honesty — when you finally turn it on yourself."},
      {label:"Relationship Style",value:"Intense, asymmetric. You need people who can handle your full weight — and there are very few."},
      {label:"Shadow Self",value:"The 'extraordinary man' theory. You know it's flawed. You half-believe it anyway."},
    ],
    quote:"Pain and suffering are always inevitable for a large intelligence and a deep heart.",
    challenge:"Your intelligence is not a license. The question isn't whether you're capable — it's whether you can bear to be human.",
    tensions:["SISYPHUS","ALYOSHA"],affinities:["ZARATHUSTRA","UNDERGROUND_MAN"],
  },
  ALYOSHA:{
    id:"ALYOSHA",name:"Alyosha",subtitle:"The Luminous",author:"Dostoevsky",work:"The Brothers Karamazov",color:"#7a6a2a",bg:"#15120a",icon:"✶",
    summary:"You have seen the darkness and emerged not disillusioned but strangely more open. People confide in you. You don't fix their problems — you witness them. Your goodness is not naivety; it has been tested. That is what makes it real.",
    traits:[
      {label:"Behavioural Pattern",value:"Active, attending presence. You notice people. You remember what they told you three months ago."},
      {label:"Core Fear",value:"That love is not enough. That the darkness wins despite everything."},
      {label:"Hidden Strength",value:"You hold contradictions without needing to resolve them. Faith and doubt. Joy and grief."},
      {label:"Relationship Style",value:"People feel seen around you. This creates intimacy quickly — sometimes more than you intended."},
      {label:"Shadow Self",value:"Passive acceptance dressed as peace. Sometimes the loving thing is confrontation, not presence."},
    ],
    quote:"Love in action is a harsh and dreadful thing compared to love in dreams.",
    challenge:"Goodness is not the absence of conflict. Alyosha's love costs him. It costs you too — and that cost is the proof.",
    tensions:["ZARATHUSTRA","MEURSAULT"],affinities:["DEMIAN","SISYPHUS"],
  },
  UNDERGROUND_MAN:{
    id:"UNDERGROUND_MAN",name:"The Underground Man",subtitle:"The Hyper-Conscious",author:"Dostoevsky",work:"Notes from Underground",color:"#5A5A8B",bg:"#0c0c15",icon:"⬡",
    summary:"You see too clearly. Every social norm, comfortable lie, false cheerfulness — you see through it all. And the seeing paralyzes you. You know what people are doing and why. The knowledge doesn't help. It may be making things worse.",
    traits:[
      {label:"Behavioural Pattern",value:"Hyper-analysis that loops back on itself. You can argue any position — including against your own deepest desires."},
      {label:"Core Fear",value:"Being reduced to a formula. Being predicted. Being just another piano key in a rational system."},
      {label:"Hidden Strength",value:"Radical honesty — at least internally. You won't lie to yourself, even when lying would be more comfortable."},
      {label:"Relationship Style",value:"You oscillate between craving connection and pushing it away with compulsive spite."},
      {label:"Shadow Self",value:"Spite as philosophy. You sometimes act against your own interests just to prove you can."},
    ],
    quote:"I am a sick man. I am a spiteful man. I think my liver hurts.",
    challenge:"Awareness without action is its own cowardice. The Underground Man knows everything and does nothing. The exit is not more thinking.",
    tensions:["DIONYSUS","SISYPHUS"],affinities:["RASKOLNIKOV","ROQUENTIN"],
  },
  DEMIAN:{
    id:"DEMIAN",name:"Demian",subtitle:"The Seeker Between Worlds",author:"Hesse",work:"Demian / Steppenwolf",color:"#7a8a5a",bg:"#0e120a",icon:"◑",
    summary:"You have always sensed two worlds — the bright sanctioned one everyone pretends is the only one, and the darker, truer world beneath. You were drawn to the second not out of rebellion but necessity. You cannot unsee what you've seen.",
    traits:[
      {label:"Behavioural Pattern",value:"You seek people and ideas that crack things open. Safe conversations bore you physically."},
      {label:"Core Fear",value:"That the integration never comes. That you will always be between worlds, belonging fully to neither."},
      {label:"Hidden Strength",value:"You have done the interior work others avoid. You know your own darkness. That is rare."},
      {label:"Relationship Style",value:"You form deep bonds with people who can see what you see. You have few of them. They matter enormously."},
      {label:"Shadow Self",value:"The seeker as escape artist. Sometimes the journey inward is a way of not arriving anywhere."},
    ],
    quote:"I wanted only to try to live in accord with the promptings which came from my true self.",
    challenge:"The mark of Cain is not a curse — it is a calling. The question is what you build with it.",
    tensions:["UNDERGROUND_MAN","JOSEF_K"],affinities:["ALYOSHA","GREGOR"],
  },
  STEPPENWOLF:{
    id:"STEPPENWOLF",name:"Harry Haller",subtitle:"The Divided",author:"Hesse",work:"Steppenwolf",color:"#8a6a4a",bg:"#120e08",icon:"◐",
    summary:"You contain multitudes and they are at war. The bourgeois and the wolf. The intellectual and the animal. The person who wants comfort and the one who finds it suffocating. You are not broken — you are a person who hasn't yet learned to play all the instruments you possess.",
    traits:[
      {label:"Behavioural Pattern",value:"Alternating between intense engagement and complete withdrawal. Hot and cold, with little warm in between."},
      {label:"Core Fear",value:"That the wolf wins. Or worse — that the bourgeois wins. Either resolution feels like death."},
      {label:"Hidden Strength",value:"Your internal conflict means you cannot be complacent. You are always, uncomfortably, alive."},
      {label:"Relationship Style",value:"You fall hard for people who embody the part of yourself you're currently suppressing."},
      {label:"Shadow Self",value:"The romanticization of suffering. Pain as identity. The wolf as costume rather than truth."},
    ],
    quote:"He saw that all the hundred thousand pieces of life's game were in him, imprisoned in the dark.",
    challenge:"The Magic Theatre is not escape — it is education. You are not two wolves. You are a thousand things. Start naming them.",
    tensions:["MEURSAULT","SISYPHUS"],affinities:["DEMIAN","JOSEF_K"],
  },
  ROQUENTIN:{
    id:"ROQUENTIN",name:"Roquentin",subtitle:"The Nauseated",author:"Sartre",work:"Nausea",color:"#6a7a4a",bg:"#0c0f08",icon:"◬",
    summary:"You have looked at a chestnut tree root, a doorknob, your own hand — and suddenly the existence of things became unbearable. Not because they are terrible but because they simply ARE, without reason, without necessity, excessively, obscenely there.",
    traits:[
      {label:"Behavioural Pattern",value:"You notice what others filter out — the raw, unnarrated facticity of things. This makes you precise and occasionally overwhelmed."},
      {label:"Core Fear",value:"That existence is not just meaningless but actively excessive — a nausea without cure."},
      {label:"Hidden Strength",value:"You cannot lie to yourself about foundations. You see through every comfortable story. This is a terrifying gift."},
      {label:"Relationship Style",value:"You form connections then question their necessity. Why this person? Why now? The questioning is not cruelty — it is your nature."},
      {label:"Shadow Self",value:"The nausea as superiority. Looking down at the salauds from a height that is also a cage."},
    ],
    quote:"I exist. It's soft, so soft, so slow. And light: it seems as though it suspends in the air.",
    challenge:"Existence precedes essence — you are radically free to create meaning, not just observe its absence. The nausea is the beginning, not the conclusion.",
    tensions:["ALYOSHA","DIONYSUS"],affinities:["UNDERGROUND_MAN","GREGOR"],
  },
};

const QUESTIONS = [
  {id:1,scenario:"You are at a funeral. You did not know the person well, but others are weeping deeply. You feel nothing — or something so quiet it barely registers.",question:"What is the most honest thing you do with that?",
    choices:[
      {text:"Perform the grief anyway. The ritual matters more than whether the feeling is real.",weights:{GREGOR:3,JOSEF_K:2,STEPPENWOLF:1}},
      {text:"Stay still and present. You don't manufacture what isn't there.",weights:{MEURSAULT:4,SISYPHUS:1,ROQUENTIN:1}},
      {text:"Feel quietly ashamed. Something must be wrong with you.",weights:{UNDERGROUND_MAN:3,STEPPENWOLF:2,GREGOR:1}},
      {text:"Sit with it as a question — why don't I feel this? What does that mean about me?",weights:{ROQUENTIN:3,DEMIAN:3,UNDERGROUND_MAN:1}},
    ]},
  {id:2,scenario:"Someone you respect deeply tells you: 'I think you are capable of much more than you allow yourself.' They mean it kindly. You have heard it before.",question:"What is the feeling underneath your response?",
    choices:[
      {text:"A flare of recognition — and then something that closes quickly, like a door.",weights:{RASKOLNIKOV:3,ZARATHUSTRA:2,STEPPENWOLF:2}},
      {text:"Mild irritation. You are tired of being someone else's potential.",weights:{MEURSAULT:3,UNDERGROUND_MAN:2,GREGOR:1}},
      {text:"Genuine warmth — but also the awareness that they don't know what 'more' would cost.",weights:{DEMIAN:3,SISYPHUS:2,ALYOSHA:1}},
      {text:"The fear that they are right, and you have been choosing smallness deliberately.",weights:{GREGOR:3,JOSEF_K:2,STEPPENWOLF:2}},
    ]},
  {id:3,scenario:"You are three years into something — a relationship, a career, a city — that is not bad. Not painful. Simply not yours. Leaving would hurt people who have done nothing wrong.",question:"What do you do?",
    choices:[
      {text:"Stay. The hurt caused by leaving is real. The alternative is abstract.",weights:{GREGOR:3,ALYOSHA:2,JOSEF_K:1}},
      {text:"Leave. A life that is almost right is the most dangerous kind of wrong.",weights:{ZARATHUSTRA:3,DEMIAN:2,DIONYSUS:2}},
      {text:"Stay but begin, very quietly, to build the door.",weights:{SISYPHUS:3,STEPPENWOLF:2,ROQUENTIN:1}},
      {text:"Decide nothing — and watch yourself become someone who has decided.",weights:{UNDERGROUND_MAN:3,MEURSAULT:2,JOSEF_K:2}},
    ]},
  {id:4,scenario:"You have done something you are not proud of — nothing catastrophic, but real. Nobody knows. A year passes. You have not repeated it. It has not left you.",question:"What do you do with the fact that it hasn't left you?",
    choices:[
      {text:"Confess it — not because it will help them, but because you cannot keep carrying it alone.",weights:{RASKOLNIKOV:3,ALYOSHA:2,DEMIAN:1}},
      {text:"Let it be proof that you are still the kind of person who feels things. That is enough.",weights:{SISYPHUS:3,MEURSAULT:2,DIONYSUS:1}},
      {text:"Keep it. Repair what you can without disclosure. The confession would be for you, not them.",weights:{JOSEF_K:2,GREGOR:2,ROQUENTIN:2}},
      {text:"Examine it until you understand exactly why you did it — even if what you find is ugly.",weights:{UNDERGROUND_MAN:3,ROQUENTIN:3,RASKOLNIKOV:1}},
    ]},
  {id:5,scenario:"A child asks you: 'Do you think people are mostly good?' They are young enough that your answer will shape something in them.",question:"What do you actually say?",
    choices:[
      {text:"Yes — not because it's fully true, but because the belief itself makes it more true.",weights:{ALYOSHA:4,DEMIAN:1,SISYPHUS:1}},
      {text:"I think people are capable of both, and the difference is what they choose to practice.",weights:{ZARATHUSTRA:2,SISYPHUS:2,DIONYSUS:2}},
      {text:"I think people are mostly frightened — and frightened people do terrible things and beautiful ones.",weights:{STEPPENWOLF:3,UNDERGROUND_MAN:2,ALYOSHA:1}},
      {text:"I don't know. I think that's the right answer to hold.",weights:{MEURSAULT:3,ROQUENTIN:2,DEMIAN:2}},
    ]},
  {id:6,scenario:"At 3am, unable to sleep, you find yourself doing something you'd be embarrassed to admit in daylight — not shameful, just private. A ritual, an obsession, a thought you return to.",question:"What does that 3am self want that the daytime self won't admit?",
    choices:[
      {text:"To be seen — fully, without the performance of being fine.",weights:{RASKOLNIKOV:2,UNDERGROUND_MAN:2,STEPPENWOLF:2}},
      {text:"To stop. Just — for once — to not be the one holding everything together.",weights:{GREGOR:4,JOSEF_K:2,ALYOSHA:1}},
      {text:"To feel something that has no name and no use and doesn't need either.",weights:{DIONYSUS:3,DEMIAN:2,ROQUENTIN:2}},
      {text:"To know that all of this — all of it — was worth something.",weights:{SISYPHUS:3,ZARATHUSTRA:2,RASKOLNIKOV:1}},
    ]},
  {id:7,scenario:"You are given undeniable evidence that a belief you have held for years — about yourself, about how the world works — is wrong. Not partially wrong. Wrong.",question:"What breaks first?",
    choices:[
      {text:"The belief. You update, painfully but completely. You are not your opinions.",weights:{SISYPHUS:3,MEURSAULT:2,DIONYSUS:2}},
      {text:"Your trust in the person who showed you. You know they're right. You still resent them.",weights:{UNDERGROUND_MAN:3,RASKOLNIKOV:2,STEPPENWOLF:1}},
      {text:"Your sense of who you are. The belief was load-bearing. Now you don't know what's left.",weights:{DEMIAN:3,ROQUENTIN:3,GREGOR:1}},
      {text:"Nothing, immediately. You go quiet. You need weeks before you know what broke.",weights:{JOSEF_K:3,ALYOSHA:2,ZARATHUSTRA:1}},
    ]},
  {id:8,scenario:"You witness someone being publicly humiliated — not physically harmed, but genuinely degraded. You could intervene. It would cost you something real. Nobody would blame you for staying quiet.",question:"What determines whether you speak?",
    choices:[
      {text:"Whether you could live with yourself afterward. That is the only calculation.",weights:{ALYOSHA:3,ZARATHUSTRA:2,RASKOLNIKOV:1}},
      {text:"Whether intervening would actually help them — or just make you feel better.",weights:{MEURSAULT:2,SISYPHUS:3,ROQUENTIN:1}},
      {text:"Whether anyone else is going to. The collective silence is its own act.",weights:{DEMIAN:2,UNDERGROUND_MAN:2,JOSEF_K:2}},
      {text:"Honestly? Whether you are having a day when you have something left to give.",weights:{STEPPENWOLF:3,GREGOR:2,DIONYSUS:1}},
    ]},
  {id:9,scenario:"You are offered a version of your life with all the difficulty removed. Same people, same work — but the weight is gone. The grinding sense that things cost something. It would feel like relief.",question:"Do you take it?",
    choices:[
      {text:"No. The weight is how you know you're alive. Remove it and you remove something essential.",weights:{ZARATHUSTRA:3,DIONYSUS:2,RASKOLNIKOV:2}},
      {text:"You would want to say no. You would probably take it. This tells you something uncomfortable.",weights:{UNDERGROUND_MAN:3,STEPPENWOLF:2,GREGOR:2}},
      {text:"No — not nobly. Because you wouldn't trust it. The ease would feel like a trap.",weights:{JOSEF_K:3,ROQUENTIN:2,DEMIAN:1}},
      {text:"Yes, without guilt. Suffering is not a credential. Ease is not a betrayal.",weights:{MEURSAULT:3,SISYPHUS:2,ALYOSHA:1}},
    ]},
  {id:10,scenario:"At the end of your life — imagining it now, honestly — you are asked to name the thing you protected most carefully. Not what you built or achieved. What you protected.",question:"What is it?",
    choices:[
      {text:"The ability to see clearly. To not be fooled — not by others, not by yourself.",weights:{ROQUENTIN:3,UNDERGROUND_MAN:2,MEURSAULT:2}},
      {text:"The people. The ones you loved. Everything else was in service of that.",weights:{ALYOSHA:4,GREGOR:2,DEMIAN:1}},
      {text:"The part of you that refused. That never fully surrendered to what the world wanted you to become.",weights:{ZARATHUSTRA:3,DIONYSUS:2,RASKOLNIKOV:2}},
      {text:"The question itself. You stayed uncertain. You kept asking. That felt like the most honest thing.",weights:{SISYPHUS:3,STEPPENWOLF:2,DEMIAN:2}},
    ]},
];

const CLASHES = {
  "JOSEF_K-MEURSAULT":{title:"The Accused vs. The Stranger",description:"Part of you fights the system anxiously; part of you doesn't register it as real. Two responses to the same absurd world — and you contain both."},
  "ZARATHUSTRA-UNDERGROUND_MAN":{title:"The Overcomer vs. The Paralyzed",description:"You have the firepower of both — one pushes upward, the other spirals inward. On good days you are Zarathustra. On dark days, the Underground Man."},
  "RASKOLNIKOV-SISYPHUS":{title:"The Transgressor vs. The Revolter",description:"Both refuse the world as given — but one wants to stand above it, the other to engage it fully. Your tension is between transcendence and acceptance."},
  "ALYOSHA-MEURSAULT":{title:"The Luminous vs. The Stranger",description:"You may love deeply but cannot perform the rituals of love — or perform them without the feeling. The gap between inner and outer is where you live."},
  "DEMIAN-ROQUENTIN":{title:"The Seeker vs. The Nauseated",description:"Both have looked beneath the surface. Demian finds meaning in the darkness; Roquentin finds only excessive existence. You oscillate between them."},
  "STEPPENWOLF-DIONYSUS":{title:"The Divided vs. The Affirmer",description:"You contain contradictions — but are you at war with them or dancing with them? Somewhere between the suffering and the celebration."},
  "GREGOR-RASKOLNIKOV":{title:"The Transformed vs. The Transgressor",description:"One erases himself for others; one believes he transcends them. You carry both — the self-effacing servant and the secretly convinced exceptional."},
  "ALYOSHA-ZARATHUSTRA":{title:"The Luminous vs. The Overcomer",description:"Love versus will. You want to love people as they are and push them to become more. This is either wisdom or an impossible demand."},
};

function computeResult(answers) {
  const scores = {};
  Object.keys(ARCHETYPES).forEach(k => scores[k] = 0);
  answers.forEach(choice => { Object.entries(choice.weights).forEach(([k,v]) => { scores[k]=(scores[k]||0)+v; }); });
  const sorted = Object.entries(scores).sort((a,b)=>b[1]-a[1]);
  const primary=sorted[0][0], secondary=sorted[1][0], tertiary=sorted[2][0];
  const isClash = sorted[0][1]-sorted[1][1] <= 3;
  const clashData = CLASHES[`${primary}-${secondary}`]||CLASHES[`${secondary}-${primary}`]||null;
  return {primary,secondary,tertiary,scores,isClash,clashData,sorted};
}

// ── SVG CARD GENERATOR ────────────────────────────────────────────────────
function buildSVG(arc, secArc, isClash) {
  const W = 800, H = 500;
  const c = arc.color;
  const shadowTrait = arc.traits.find(t=>t.label==="Shadow Self")?.value||"";

  function wrapText(text, maxChars) {
    const words = text.split(" ");
    const lines = [];
    let line = "";
    for (const word of words) {
      if ((line + word).length > maxChars) { lines.push(line.trim()); line = word + " "; }
      else { line += word + " "; }
    }
    if (line.trim()) lines.push(line.trim());
    return lines;
  }

  const summaryLines = wrapText(arc.summary, 78);
  const shadowLines  = wrapText(shadowTrait, 78);
  const quoteLines   = wrapText(`"${arc.quote}"`, 82);

  const summaryY = 195;
  const shadowLabelY = summaryY + summaryLines.length * 22 + 28;
  const shadowY = shadowLabelY + 20;
  const quoteBoxY = shadowY + shadowLines.length * 20 + 28;

  let svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${arc.bg}"/>
      <stop offset="100%" stop-color="${arc.bg}dd"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- Grid lines -->
  ${Array.from({length:20},(_,i)=>`<line x1="${i*42}" y1="0" x2="${i*42}" y2="${H}" stroke="${c}" stroke-opacity="0.05" stroke-width="1"/>`).join("")}
  ${Array.from({length:13},(_,i)=>`<line x1="0" y1="${i*42}" x2="${W}" y2="${i*42}" stroke="${c}" stroke-opacity="0.05" stroke-width="1"/>`).join("")}

  <!-- Left accent bar -->
  <rect x="0" y="0" width="4" height="${H}" fill="${c}"/>

  <!-- Top / bottom borders -->
  <rect x="0" y="0" width="${W}" height="1" fill="${c}" opacity="0.4"/>
  <rect x="0" y="${H-1}" width="${W}" height="1" fill="${c}" opacity="0.4"/>

  <!-- Big faded icon -->
  <text x="${W-70}" y="90" font-family="serif" font-size="60" fill="${c}" opacity="0.18" text-anchor="middle">${arc.icon}</text>

  <!-- Author label -->
  <text x="36" y="50" font-family="'Courier New',monospace" font-size="11" fill="${c}" opacity="0.7" letter-spacing="2">${arc.author.toUpperCase()} — ${arc.work.toUpperCase()}</text>

  <!-- Name -->
  <text x="36" y="110" font-family="Georgia,serif" font-size="54" font-weight="bold" fill="#e8d5a3">${arc.name}</text>

  <!-- Subtitle -->
  <text x="38" y="140" font-family="Georgia,serif" font-size="18" font-style="italic" fill="${c}" opacity="0.8">${arc.subtitle}</text>

  <!-- Divider -->
  <rect x="36" y="158" width="220" height="1" fill="${c}" opacity="0.35"/>

  <!-- Summary -->
  ${summaryLines.slice(0,5).map((l,i)=>`<text x="36" y="${summaryY + i*22}" font-family="Georgia,serif" font-size="14" fill="#9a8a6a">${l.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</text>`).join("\n  ")}

  <!-- Shadow Self label -->
  <text x="36" y="${shadowLabelY}" font-family="'Courier New',monospace" font-size="10" fill="${c}" opacity="0.6" letter-spacing="2">SHADOW SELF</text>

  <!-- Shadow Self value -->
  ${shadowLines.slice(0,2).map((l,i)=>`<text x="36" y="${shadowY + i*19}" font-family="Georgia,serif" font-size="13" font-style="italic" fill="#6a5a35">${l.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</text>`).join("\n  ")}

  <!-- Quote box -->
  <rect x="36" y="${quoteBoxY}" width="${W-72}" height="62" rx="2" fill="${c}" fill-opacity="0.08" stroke="${c}" stroke-opacity="0.2" stroke-width="1"/>
  ${quoteLines.slice(0,3).map((l,i)=>`<text x="48" y="${quoteBoxY+22+i*18}" font-family="Georgia,serif" font-size="13" font-style="italic" fill="#7a6a45">${l.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</text>`).join("\n  ")}

  <!-- Secondary badge -->
  <text x="36" y="${H-20}" font-family="'Courier New',monospace" font-size="10" fill="#3a2a0e" letter-spacing="1">RESONATES WITH</text>
  <text x="160" y="${H-20}" font-family="'Courier New',monospace" font-size="10" fill="${secArc.color}" opacity="0.8">${secArc.icon} ${secArc.name.toUpperCase()} (${secArc.author.toUpperCase()})</text>
  ${isClash ? `<text x="500" y="${H-20}" font-family="'Courier New',monospace" font-size="10" fill="#A0845C">⚡ DIVIDED SOUL</text>` : ""}

  <!-- Watermark -->
  <text x="${W-36}" y="${H-20}" font-family="'Courier New',monospace" font-size="10" fill="#2a1e0e" text-anchor="end" letter-spacing="1">THE LITERARY SOUL</text>
</svg>`;

  return svgContent;
}

function downloadSVGasImage(arc, secArc, isClash) {
  const svgString = buildSVG(arc, secArc, isClash);
  const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `literary-soul-${arc.name.toLowerCase().replace(/\s+/g,"-")}.svg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ── GRAIN ────────────────────────────────────────────────────────────────
const Grain = () => (
  <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,
    backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E")`}}/>
);

const ProgressBar = ({total,current}) => (
  <div style={{display:"flex",gap:"5px",justifyContent:"center",marginBottom:"2rem"}}>
    {Array.from({length:total}).map((_,i)=>(
      <div key={i} style={{height:6,borderRadius:3,width:i<current?28:i===current?16:8,
        background:i<current?"#A0845C":i===current?"#c8b880":"#2a1e0e",transition:"all 0.4s ease"}}/>
    ))}
  </div>
);

// ── SHARE CARD PREVIEW ───────────────────────────────────────────────────
const ShareModal = ({result, onClose}) => {
  const arc = ARCHETYPES[result.primary];
  const secArc = ARCHETYPES[result.secondary];
  const [downloaded, setDownloaded] = useState(false);
  const font = "'Palatino Linotype',Palatino,serif";

  const handleDownload = () => {
    downloadSVGasImage(arc, secArc, result.isClash);
    setDownloaded(true);
    setTimeout(()=>setDownloaded(false), 2500);
  };

  const shadowTrait = arc.traits.find(t=>t.label==="Shadow Self")?.value||"";

  return (
    <div style={{position:"fixed",inset:0,background:"#000000dd",zIndex:200,display:"flex",
      alignItems:"center",justifyContent:"center",padding:"1rem",fontFamily:font}}
      onClick={onClose}>
      <div style={{maxWidth:660,width:"100%"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}}>
          <p style={{margin:0,color:"#5a4a2a",fontSize:"0.72rem",letterSpacing:"0.2em",textTransform:"uppercase"}}>Your portrait card</p>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#5a4a2a",cursor:"pointer",fontSize:"1.4rem",fontFamily:font}}>×</button>
        </div>

        {/* Live preview of the card */}
        <div style={{
          background:`linear-gradient(135deg, ${arc.bg} 0%, ${arc.bg}dd 100%)`,
          border:`1px solid ${arc.color}33`,
          borderLeft:`4px solid ${arc.color}`,
          padding:"2rem",
          marginBottom:"1rem",
          borderRadius:"2px",
          position:"relative",
          overflow:"hidden",
        }}>
          {/* grid bg */}
          <div style={{position:"absolute",inset:0,backgroundImage:`repeating-linear-gradient(0deg,transparent,transparent 41px,${arc.color}08 41px,${arc.color}08 42px),repeating-linear-gradient(90deg,transparent,transparent 41px,${arc.color}08 41px,${arc.color}08 42px)`}}/>

          <div style={{position:"relative",zIndex:1}}>
            <p style={{margin:"0 0 0.2rem",fontSize:"0.6rem",letterSpacing:"0.2em",color:arc.color,textTransform:"uppercase",fontFamily:"'Courier New',monospace"}}>
              {arc.author} — {arc.work}
            </p>
            <div style={{display:"flex",alignItems:"baseline",gap:"0.75rem",marginBottom:"0.2rem"}}>
              <h2 style={{margin:0,fontSize:"2.2rem",fontWeight:400,color:"#e8d5a3",lineHeight:1.1}}>{arc.name}</h2>
              <span style={{fontSize:"1.8rem",color:arc.color,opacity:0.4}}>{arc.icon}</span>
            </div>
            <p style={{margin:"0 0 1rem",fontStyle:"italic",color:`${arc.color}99`,fontSize:"0.9rem"}}>{arc.subtitle}</p>
            <p style={{margin:"0 0 1rem",color:"#8a7a5a",lineHeight:1.7,fontSize:"0.82rem"}}>{arc.summary}</p>

            <div style={{borderTop:`1px solid ${arc.color}22`,paddingTop:"0.75rem",marginBottom:"0.75rem"}}>
              <p style={{margin:"0 0 0.25rem",fontSize:"0.58rem",letterSpacing:"0.15em",color:arc.color,textTransform:"uppercase",fontFamily:"'Courier New',monospace"}}>Shadow Self</p>
              <p style={{margin:0,color:"#5a4a2a",fontStyle:"italic",fontSize:"0.8rem",lineHeight:1.6}}>{shadowTrait}</p>
            </div>

            <div style={{background:`${arc.color}10`,border:`1px solid ${arc.color}22`,padding:"0.75rem",borderRadius:"2px",marginBottom:"1rem"}}>
              <p style={{margin:0,color:"#6a5a35",fontStyle:"italic",fontSize:"0.8rem",lineHeight:1.6}}>"{arc.quote}"</p>
            </div>

            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
                <span style={{fontSize:"0.58rem",letterSpacing:"0.1em",color:"#2a1e0e",fontFamily:"'Courier New',monospace"}}>RESONATES WITH</span>
                <span style={{border:`1px solid ${secArc.color}44`,color:secArc.color,padding:"0.15rem 0.5rem",fontSize:"0.7rem",borderRadius:"2px"}}>{secArc.icon} {secArc.name}</span>
                {result.isClash && <span style={{color:"#A0845C",fontSize:"0.7rem"}}>⚡ Divided</span>}
              </div>
              <span style={{fontSize:"0.58rem",letterSpacing:"0.12em",color:"#2a1e0e",fontFamily:"'Courier New',monospace"}}>THE LITERARY SOUL</span>
            </div>
          </div>
        </div>

        <button onClick={handleDownload} style={{
          width:"100%",background:downloaded?"#1a2a1a":"none",
          border:`1px solid ${downloaded?"#4a7a4a":arc.color+"88"}`,
          color:downloaded?"#6aaa6a":arc.color,
          padding:"1rem",fontFamily:font,fontSize:"0.85rem",
          letterSpacing:"0.2em",textTransform:"uppercase",
          cursor:"pointer",borderRadius:"2px",transition:"all 0.3s"
        }}>
          {downloaded ? "✓ Downloaded to your device" : "⬇ Download as SVG Image"}
        </button>

        <p style={{margin:"0.75rem 0 0",textAlign:"center",color:"#3a2a0e",fontSize:"0.72rem",lineHeight:1.6}}>
          SVG files open in any browser, Figma, or image editor — and scale to any size without losing quality.
        </p>
      </div>
    </div>
  );
};

// ── COMPARE MODE ─────────────────────────────────────────────────────────
const CompareMode = ({onClose}) => {
  const [a,setA] = useState("JOSEF_K");
  const [b,setB] = useState("RASKOLNIKOV");
  const arcA=ARCHETYPES[a], arcB=ARCHETYPES[b];
  const clash = CLASHES[`${a}-${b}`]||CLASHES[`${b}-${a}`];
  const font="'Palatino Linotype',Palatino,serif";
  return (
    <div style={{position:"fixed",inset:0,background:"#000000dd",zIndex:100,overflow:"auto",fontFamily:font}}>
      <div style={{maxWidth:820,margin:"0 auto",padding:"2rem"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"2rem"}}>
          <h2 style={{margin:0,color:"#c8b880",fontWeight:400}}>Compare Archetypes</h2>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#5a4a2a",cursor:"pointer",fontSize:"1.5rem",fontFamily:font}}>×</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"2rem"}}>
          {[{val:a,set:setA,arc:arcA,label:"First"},{val:b,set:setB,arc:arcB,label:"Second"}].map(({val,set,arc,label})=>(
            <div key={label}>
              <p style={{margin:"0 0 0.5rem",fontSize:"0.6rem",letterSpacing:"0.2em",textTransform:"uppercase",color:"#4a3a1a"}}>{label}</p>
              <select value={val} onChange={e=>set(e.target.value)} style={{width:"100%",background:"#120e08",border:`1px solid ${arc.color}44`,color:arc.color,padding:"0.75rem",fontFamily:font,fontSize:"0.9rem",cursor:"pointer",borderRadius:"2px",outline:"none"}}>
                {Object.values(ARCHETYPES).map(ar=><option key={ar.id} value={ar.id} style={{background:"#120e08",color:"#c8b880"}}>{ar.icon} {ar.name} ({ar.author})</option>)}
              </select>
            </div>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1.5rem"}}>
          {[arcA,arcB].map(arc=>(
            <div key={arc.id} style={{background:arc.bg,border:`1px solid ${arc.color}33`,borderTop:`3px solid ${arc.color}`,padding:"1.5rem",borderRadius:"2px"}}>
              <div style={{fontSize:"2rem",marginBottom:"0.5rem"}}>{arc.icon}</div>
              <p style={{margin:"0 0 0.2rem",fontSize:"0.6rem",letterSpacing:"0.15em",textTransform:"uppercase",color:arc.color}}>{arc.author}</p>
              <h3 style={{margin:"0 0 0.2rem",color:"#e8d5a3",fontWeight:400,fontSize:"1.2rem"}}>{arc.name}</h3>
              <p style={{margin:"0 0 1rem",color:`${arc.color}88`,fontStyle:"italic",fontSize:"0.8rem"}}>{arc.subtitle}</p>
              {arc.traits.map((t,i)=>(
                <div key={i} style={{marginBottom:"0.65rem"}}>
                  <p style={{margin:"0 0 0.2rem",fontSize:"0.58rem",letterSpacing:"0.12em",textTransform:"uppercase",color:arc.color}}>{t.label}</p>
                  <p style={{margin:0,color:"#6a5a35",fontSize:"0.8rem",lineHeight:1.5}}>{t.value}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
        {clash&&(
          <div style={{background:"#1a1208",border:"1px solid #3a2a0e",borderLeft:"3px solid #8B6914",padding:"1.25rem",borderRadius:"2px"}}>
            <p style={{margin:"0 0 0.4rem",fontSize:"0.62rem",letterSpacing:"0.2em",textTransform:"uppercase",color:"#8B6914"}}>Registered Tension</p>
            <p style={{margin:"0 0 0.4rem",color:"#c8b880"}}>{clash.title}</p>
            <p style={{margin:0,color:"#7a6a45",lineHeight:1.7,fontSize:"0.88rem"}}>{clash.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ── MAIN ─────────────────────────────────────────────────────────────────
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
  const font = "'Palatino Linotype','Book Antiqua',Palatino,serif";

  const choose = (choice) => {
    if (fading||selected) return;
    setSelected(choice); setFading(true);
    setTimeout(()=>{
      const next=[...answers,choice];
      if (qIndex+1<QUESTIONS.length) { setAnswers(next);setQIndex(qIndex+1);setSelected(null);setFading(false); }
      else {
        const r=computeResult(next); setResult(r); setPhase("result"); setFading(false);
        [300,700,1100,1600,2100].forEach((t,i)=>setTimeout(()=>setRevealStep(i+1),t));
      }
    },500);
  };

  const restart = () => { setPhase("intro");setQIndex(0);setAnswers([]);setSelected(null);setResult(null);setRevealStep(0);setActiveTab("profile"); };

  // INTRO
  if (phase==="intro") return (
    <div style={{minHeight:"100vh",background:"#080604",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"2rem",fontFamily:font}}>
      <Grain/>
      <div style={{maxWidth:600,width:"100%",position:"relative",zIndex:1}}>
        <div style={{textAlign:"center",marginBottom:"2.5rem"}}>
          <div style={{display:"flex",justifyContent:"center",gap:"1rem",marginBottom:"1.5rem",fontSize:"1.4rem",color:"#2a1e0e"}}>
            {["⚖","◈","◉","✦","◑","◬"].map((ic,i)=><span key={i}>{ic}</span>)}
          </div>
          <h1 style={{margin:"0 0 0.4rem",fontSize:"clamp(2rem,5vw,3.2rem)",fontWeight:400,color:"#e8d5a3",letterSpacing:"0.03em",lineHeight:1.1}}>The Literary Soul</h1>
          <p style={{margin:"0 0 0.2rem",color:"#5a4a2a",fontStyle:"italic"}}>A personality portrait through existential literature</p>
          <p style={{margin:0,color:"#2a1e0e",fontSize:"0.7rem",letterSpacing:"0.2em",textTransform:"uppercase"}}>Kafka · Nietzsche · Camus · Dostoevsky · Hesse · Sartre</p>
        </div>
        <div style={{background:"#120e08",border:"1px solid #2a1e0e",borderLeft:"3px solid #6b5a35",padding:"1.5rem",marginBottom:"2rem",borderRadius:"2px"}}>
          <p style={{margin:"0 0 0.75rem",color:"#9a8a6a",lineHeight:1.8}}>Ten situations. No correct answers. Each question is designed to make you pause — not because the choice is hard, but because it requires you to be honest about who you actually are, not who you intend to be.</p>
          <p style={{margin:0,color:"#5a4a2a",fontSize:"0.85rem",fontStyle:"italic"}}>At the end: your archetype portrait + a downloadable SVG card you can share anywhere.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"0.5rem",marginBottom:"2rem"}}>
          {Object.entries({Kafka:"#A0845C",Nietzsche:"#c4882a",Camus:"#6a9a9a",Dostoevsky:"#8B3A3A",Hesse:"#7a8a5a",Sartre:"#6a7a4a"}).map(([author,color])=>{
            const arcs=Object.values(ARCHETYPES).filter(a=>a.author===author);
            return(
              <div key={author} style={{background:"#0e0c08",border:`1px solid ${color}22`,borderTop:`2px solid ${color}44`,padding:"0.75rem",borderRadius:"2px"}}>
                <p style={{margin:"0 0 0.4rem",fontSize:"0.58rem",letterSpacing:"0.15em",textTransform:"uppercase",color}}>{author}</p>
                {arcs.map(a=><p key={a.id} style={{margin:"0.1rem 0",fontSize:"0.72rem",color:"#4a3a1a",fontStyle:"italic"}}>{a.icon} {a.name}</p>)}
              </div>
            );
          })}
        </div>
        <div style={{display:"flex",gap:"1rem"}}>
          <button onClick={()=>setPhase("quiz")} style={{flex:2,background:"none",border:"1px solid #8B6914",color:"#c49a2a",padding:"1rem 2rem",fontSize:"0.85rem",letterSpacing:"0.2em",textTransform:"uppercase",cursor:"pointer",fontFamily:font,borderRadius:"2px",transition:"all 0.3s"}} onMouseEnter={e=>e.target.style.background="#8B691422"} onMouseLeave={e=>e.target.style.background="none"}>Enter the Labyrinth</button>
          <button onClick={()=>setShowCompare(true)} style={{flex:1,background:"none",border:"1px solid #2a1e0e",color:"#5a4a2a",padding:"1rem",fontSize:"0.8rem",letterSpacing:"0.12em",textTransform:"uppercase",cursor:"pointer",fontFamily:font,borderRadius:"2px",transition:"all 0.3s"}} onMouseEnter={e=>{e.target.style.borderColor="#5a4a2a";e.target.style.color="#8a7a5a";}} onMouseLeave={e=>{e.target.style.borderColor="#2a1e0e";e.target.style.color="#5a4a2a";}}>Compare</button>
        </div>
      </div>
      {showCompare&&<CompareMode onClose={()=>setShowCompare(false)}/>}
    </div>
  );

  // QUIZ
  if (phase==="quiz") {
    const q=QUESTIONS[qIndex];
    return (
      <div style={{minHeight:"100vh",background:"#080604",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"2rem",fontFamily:font}}>
        <Grain/>
        <div style={{maxWidth:640,width:"100%",position:"relative",zIndex:1}}>
          <ProgressBar total={QUESTIONS.length} current={qIndex}/>
          <div style={{opacity:fading?0:1,transform:fading?"translateY(-10px)":"translateY(0)",transition:"all 0.4s ease"}}>
            <p style={{margin:"0 0 0.4rem",textAlign:"center",fontSize:"0.6rem",letterSpacing:"0.3em",textTransform:"uppercase",color:"#3a2a0e"}}>Situation {qIndex+1} of {QUESTIONS.length}</p>
            <div style={{background:"#120e08",border:"1px solid #1e1608",borderLeft:"3px solid #2a1e0e",padding:"1.5rem",marginBottom:"1.25rem",borderRadius:"2px"}}>
              <p style={{margin:0,color:"#8a7a5a",lineHeight:1.85,fontStyle:"italic",fontSize:"0.98rem"}}>{q.scenario}</p>
            </div>
            <h2 style={{margin:"0 0 1.5rem",color:"#c8b880",fontWeight:400,fontSize:"1.15rem",textAlign:"center"}}>{q.question}</h2>
            <div style={{display:"grid",gap:"0.7rem"}}>
              {q.choices.map((choice,idx)=>{
                const isSel=selected===choice;
                return (
                  <button key={idx} onClick={()=>choose(choice)} style={{background:isSel?"#1a1208":"#0e0c08",border:isSel?"1px solid #A0845C":"1px solid #1e1608",borderLeft:isSel?"3px solid #A0845C":"3px solid transparent",padding:"1.1rem 1.25rem",textAlign:"left",cursor:"pointer",fontFamily:font,color:isSel?"#c8b880":"#6a5a35",fontSize:"0.95rem",lineHeight:1.65,borderRadius:"2px",transition:"all 0.25s",opacity:selected&&!isSel?0.3:1}}
                    onMouseEnter={e=>{if(!selected){e.currentTarget.style.borderLeftColor="#4a3a1a";e.currentTarget.style.color="#9a8a6a";}}}
                    onMouseLeave={e=>{if(!selected){e.currentTarget.style.borderLeftColor="transparent";e.currentTarget.style.color="#6a5a35";}}}
                  >{choice.text}</button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // RESULT
  if (phase==="result"&&result) {
    const arc=ARCHETYPES[result.primary];
    const secArc=ARCHETYPES[result.secondary];
    const terArc=ARCHETYPES[result.tertiary];

    return (
      <div style={{minHeight:"100vh",background:arc.bg,fontFamily:font}}>
        <Grain/>
        {showShare&&<ShareModal result={result} onClose={()=>setShowShare(false)}/>}
        {showCompare&&<CompareMode onClose={()=>setShowCompare(false)}/>}

        {/* Hero */}
        <div style={{position:"relative",zIndex:1,padding:"3rem 2rem 2rem",textAlign:"center",borderBottom:`1px solid ${arc.color}22`,opacity:revealStep>=1?1:0,transform:revealStep>=1?"translateY(0)":"translateY(20px)",transition:"all 0.7s ease"}}>
          <div style={{fontSize:"3rem",marginBottom:"0.5rem"}}>{arc.icon}</div>
          <p style={{margin:"0 0 0.25rem",fontSize:"0.6rem",letterSpacing:"0.3em",textTransform:"uppercase",color:arc.color}}>{arc.author} — {arc.work}</p>
          <h1 style={{margin:"0 0 0.2rem",fontSize:"clamp(2.5rem,6vw,4rem)",fontWeight:400,color:"#e8d5a3"}}>{arc.name}</h1>
          <p style={{margin:"0 0 1.5rem",fontStyle:"italic",color:`${arc.color}bb`,fontSize:"1.1rem"}}>{arc.subtitle}</p>
          <div style={{display:"flex",gap:"0.75rem",justifyContent:"center",flexWrap:"wrap"}}>
            {[
              {label:"⬇  Download Card",action:()=>setShowShare(true),primary:true},
              {label:"Compare",action:()=>setShowCompare(true)},
              {label:"Retake",action:restart},
            ].map(btn=>(
              <button key={btn.label} onClick={btn.action} style={{background:btn.primary?arc.color+"22":"none",border:`1px solid ${arc.color}${btn.primary?"99":"44"}`,color:arc.color,padding:"0.55rem 1.25rem",fontSize:"0.78rem",letterSpacing:"0.15em",textTransform:"uppercase",cursor:"pointer",fontFamily:font,borderRadius:"2px",transition:"all 0.2s"}}
                onMouseEnter={e=>e.currentTarget.style.background=arc.color+"33"} onMouseLeave={e=>e.currentTarget.style.background=btn.primary?arc.color+"22":"none"}
              >{btn.label}</button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{position:"relative",zIndex:1,borderBottom:`1px solid ${arc.color}18`,display:"flex",justifyContent:"center",opacity:revealStep>=2?1:0,transition:"opacity 0.5s ease 0.3s"}}>
          {["profile","clash","scores","challenge"].map(tab=>(
            <button key={tab} onClick={()=>setActiveTab(tab)} style={{background:"none",border:"none",borderBottom:activeTab===tab?`2px solid ${arc.color}`:"2px solid transparent",color:activeTab===tab?arc.color:"#3a2a0e",padding:"0.85rem 1.25rem",cursor:"pointer",fontFamily:font,fontSize:"0.75rem",letterSpacing:"0.12em",textTransform:"uppercase",transition:"all 0.2s"}}>
              {tab==="clash"?(result.isClash?"⚡ Divided Soul":"Resonances"):tab.charAt(0).toUpperCase()+tab.slice(1)}
            </button>
          ))}
        </div>

        <div style={{maxWidth:720,margin:"0 auto",padding:"2rem",position:"relative",zIndex:1,opacity:revealStep>=3?1:0,transition:"opacity 0.6s ease 0.5s"}}>

          {activeTab==="profile"&&(
            <div>
              <div style={{background:"#ffffff08",border:`1px solid ${arc.color}22`,borderLeft:`3px solid ${arc.color}`,padding:"1.5rem",marginBottom:"2rem",borderRadius:"2px"}}>
                <p style={{margin:0,color:"#c8b880",lineHeight:1.8}}>{arc.summary}</p>
              </div>
              {arc.traits.map((trait,i)=>(
                <div key={i} style={{borderBottom:`1px solid ${arc.color}15`,padding:"1.25rem 0",opacity:revealStep>=4?1:0,transform:revealStep>=4?"translateX(0)":"translateX(-12px)",transition:`all 0.5s ease ${i*0.1}s`}}>
                  <p style={{margin:"0 0 0.4rem",fontSize:"0.62rem",letterSpacing:"0.2em",textTransform:"uppercase",color:arc.color}}>{trait.label}</p>
                  <p style={{margin:0,color:"#9a8a6a",lineHeight:1.7}}>{trait.value}</p>
                </div>
              ))}
              <div style={{marginTop:"2rem",background:"#ffffff06",border:`1px solid ${arc.color}22`,padding:"1.25rem",borderRadius:"2px"}}>
                <p style={{margin:"0 0 0.4rem",fontStyle:"italic",color:"#7a6a45",lineHeight:1.7,fontSize:"0.9rem"}}>"{arc.quote}"</p>
                <p style={{margin:0,fontSize:"0.62rem",letterSpacing:"0.15em",color:arc.color}}>{arc.author}</p>
              </div>
            </div>
          )}

          {activeTab==="clash"&&(
            <div>
              {result.isClash?(
                <div>
                  <div style={{background:"#1a1208",border:"1px solid #3a2a0e",borderLeft:"3px solid #A0845C",padding:"1.5rem",marginBottom:"1.5rem",borderRadius:"2px"}}>
                    <p style={{margin:"0 0 0.4rem",fontSize:"0.65rem",letterSpacing:"0.2em",textTransform:"uppercase",color:"#A0845C"}}>⚡ Divided Soul Detected</p>
                    <p style={{margin:0,color:"#c8b880",lineHeight:1.7}}>Your answers didn't converge cleanly on one archetype. The gap between your primary and secondary was narrow — meaning you genuinely inhabit more than one of these worlds. This is not weakness. It is complexity.</p>
                  </div>
                  {result.clashData&&(
                    <div style={{background:"#120e08",border:"1px solid #2a1e0e",padding:"1.5rem",marginBottom:"1.5rem",borderRadius:"2px"}}>
                      <p style={{margin:"0 0 0.4rem",color:"#c8b880",fontWeight:400}}>{result.clashData.title}</p>
                      <p style={{margin:0,color:"#7a6a45",lineHeight:1.7,fontSize:"0.9rem"}}>{result.clashData.description}</p>
                    </div>
                  )}
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
                    {[arc,secArc].map((a,i)=>(
                      <div key={i} style={{background:a.bg,border:`1px solid ${a.color}33`,borderTop:`2px solid ${a.color}`,padding:"1.25rem",borderRadius:"2px"}}>
                        <div style={{fontSize:"1.5rem",marginBottom:"0.5rem"}}>{a.icon}</div>
                        <p style={{margin:"0 0 0.2rem",fontSize:"0.58rem",letterSpacing:"0.15em",textTransform:"uppercase",color:a.color}}>{i===0?"Primary":"Secondary"}</p>
                        <h3 style={{margin:"0 0 0.25rem",color:"#e8d5a3",fontWeight:400,fontSize:"1.1rem"}}>{a.name}</h3>
                        <p style={{margin:"0 0 0.75rem",color:`${a.color}88`,fontStyle:"italic",fontSize:"0.8rem"}}>{a.subtitle}</p>
                        <p style={{margin:0,color:"#6a5a35",fontSize:"0.82rem",lineHeight:1.6}}>{a.summary.substring(0,150)}…</p>
                      </div>
                    ))}
                  </div>
                </div>
              ):(
                <div>
                  <p style={{color:"#7a6a45",fontStyle:"italic",marginBottom:"1.5rem",lineHeight:1.7}}>Your answers aligned clearly with {arc.name}. Below are the archetypes that stand in tension with yours — and those that share your resonance.</p>
                  <p style={{margin:"0 0 0.75rem",fontSize:"0.62rem",letterSpacing:"0.2em",textTransform:"uppercase",color:"#4a3a1a"}}>In Tension With You</p>
                  {arc.tensions.map(id=>{const ta=ARCHETYPES[id];return(<div key={id} style={{background:ta.bg,border:`1px solid ${ta.color}33`,borderLeft:`2px solid ${ta.color}`,padding:"1rem",marginBottom:"0.75rem",borderRadius:"2px"}}><p style={{margin:"0 0 0.2rem",fontSize:"0.58rem",letterSpacing:"0.12em",textTransform:"uppercase",color:ta.color}}>{ta.author}</p><p style={{margin:"0 0 0.3rem",color:"#c8b880"}}>{ta.icon} {ta.name} — {ta.subtitle}</p><p style={{margin:0,color:"#5a4a2a",fontSize:"0.82rem",lineHeight:1.5}}>{ta.summary.substring(0,130)}…</p></div>);})}
                  <p style={{margin:"1.5rem 0 0.75rem",fontSize:"0.62rem",letterSpacing:"0.2em",textTransform:"uppercase",color:"#4a3a1a"}}>Shares Your Resonance</p>
                  {arc.affinities.map(id=>{const ta=ARCHETYPES[id];return(<div key={id} style={{background:ta.bg,border:`1px solid ${ta.color}33`,borderLeft:`2px solid ${ta.color}`,padding:"1rem",marginBottom:"0.75rem",borderRadius:"2px"}}><p style={{margin:"0 0 0.2rem",fontSize:"0.58rem",letterSpacing:"0.12em",textTransform:"uppercase",color:ta.color}}>{ta.author}</p><p style={{margin:"0 0 0.3rem",color:"#c8b880"}}>{ta.icon} {ta.name} — {ta.subtitle}</p><p style={{margin:0,color:"#5a4a2a",fontSize:"0.82rem",lineHeight:1.5}}>{ta.summary.substring(0,130)}…</p></div>);})}
                </div>
              )}
            </div>
          )}

          {activeTab==="scores"&&(
            <div>
              <p style={{color:"#5a4a2a",fontStyle:"italic",marginBottom:"1.5rem",fontSize:"0.9rem",lineHeight:1.7}}>Every archetype contains something true about you. The question is proportion — and what the distribution reveals about where your weight actually sits.</p>
              {result.sorted.map(([id,score],i)=>{
                const a=ARCHETYPES[id];
                const pct=result.sorted[0][1]>0?(score/result.sorted[0][1])*100:0;
                return(
                  <div key={id} style={{marginBottom:"0.85rem"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.3rem"}}>
                      <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
                        <span style={{color:a.color}}>{a.icon}</span>
                        <span style={{color:i===0?"#e8d5a3":"#6a5a35",fontSize:"0.88rem"}}>{a.name}</span>
                        <span style={{color:"#2a1e0e",fontSize:"0.7rem",fontStyle:"italic"}}>{a.author}</span>
                      </div>
                      <span style={{color:i===0?a.color:"#3a2a0e",fontSize:"0.8rem"}}>{score}</span>
                    </div>
                    <div style={{width:"100%",background:"#1a1208",height:5,borderRadius:3,overflow:"hidden"}}>
                      <div style={{width:`${pct}%`,height:"100%",background:a.color,opacity:i===0?1:0.35,borderRadius:3,transition:"width 1.2s ease"}}/>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab==="challenge"&&(
            <div>
              <div style={{background:`${arc.color}11`,border:`1px solid ${arc.color}44`,borderLeft:`3px solid ${arc.color}`,padding:"1.5rem",marginBottom:"2rem",borderRadius:"2px"}}>
                <p style={{margin:"0 0 0.5rem",fontSize:"0.62rem",letterSpacing:"0.2em",textTransform:"uppercase",color:arc.color}}>Your Challenge</p>
                <p style={{margin:0,color:"#c8b880",lineHeight:1.8}}>{arc.challenge}</p>
              </div>
              <p style={{margin:"0 0 1rem",fontSize:"0.62rem",letterSpacing:"0.2em",textTransform:"uppercase",color:"#3a2a0e"}}>Recommended Reading</p>
              {[...new Set([arc.author,secArc?.author])].filter(Boolean).flatMap(author=>
                Object.values(ARCHETYPES).filter(a=>a.author===author).map(a=>(
                  <div key={a.id} style={{display:"flex",gap:"0.5rem",marginBottom:"0.5rem",alignItems:"center"}}>
                    <span style={{color:{Kafka:"#A0845C",Nietzsche:"#c4882a",Camus:"#6a9a9a",Dostoevsky:"#8B3A3A",Hesse:"#7a8a5a",Sartre:"#6a7a4a"}[author]}}>{a.icon}</span>
                    <span style={{color:"#6a5a35",fontStyle:"italic",fontSize:"0.9rem"}}>{a.work}</span>
                    <span style={{color:"#3a2a0e",fontSize:"0.75rem"}}>— {a.author}</span>
                  </div>
                ))
              )}
              <div style={{marginTop:"1.5rem",background:"#120e08",border:"1px solid #1e1608",padding:"1.25rem",borderRadius:"2px"}}>
                <p style={{margin:"0 0 0.5rem",fontSize:"0.62rem",letterSpacing:"0.2em",textTransform:"uppercase",color:"#3a2a0e"}}>Also resonating in you</p>
                <div style={{display:"flex",gap:"0.5rem",flexWrap:"wrap"}}>
                  {[secArc,terArc].filter(Boolean).map(a=>(
                    <span key={a.id} style={{border:`1px solid ${a.color}44`,color:a.color,padding:"0.25rem 0.6rem",fontSize:"0.78rem",borderRadius:"2px",fontStyle:"italic"}}>{a.icon} {a.name}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{position:"relative",zIndex:1,textAlign:"center",padding:"1rem 2rem 3rem",borderTop:`1px solid ${arc.color}11`}}>
          <p style={{margin:0,color:"#2a1e0e",fontSize:"0.68rem",letterSpacing:"0.1em"}}>The Literary Soul · Kafka · Nietzsche · Camus · Dostoevsky · Hesse · Sartre</p>
        </div>
      </div>
    );
  }
  return null;
}
