/* ═══════════════════════════════════════════════════════════
   Gather Round — behavior
   No colors or styles in here: this file only flips
   data-attributes and text. styles.css owns the theme.
   ═══════════════════════════════════════════════════════════ */

// ── Categories (label + glyph only; colors live in CSS) ─────
const CATS = {
  heart:    { label: 'Heart',    glyph: '\u2665' },
  faith:    { label: 'Faith',    glyph: '\u271D' },
  family:   { label: 'Family',   glyph: '\u2302' },
  friends:  { label: 'Friends',  glyph: '\u263B' },
  tomorrow: { label: 'Tomorrow', glyph: '\u2191' },
  wild:     { label: 'Wild',     glyph: '\u25A6' }
};
const ORDER = Object.keys(CATS);

// ── Prompts ─────────────────────────────────────────────────
// Real prompt bank. Shape: { t: question, h: helper, l: optional faith tie-in }.
const PROMPTS = {
  heart: [
    { t: 'What made your heart feel big today?', h: 'Ask one person to help you name the feeling if you need a word for it.' },
    { t: 'What is something that made you angry today?', h: 'Name what happened, then name one wise thing you could do with that anger.' },
    { t: 'Where did you need patience today?', h: 'Invite someone at the table to pray one sentence for you.' },
    { t: 'What feeling did you bring to the table tonight that God already knows about?', h: 'You can answer with one word, one story, or a short prayer.' },
    { t: 'What was one good surprise from today?', h: 'Pick someone to guess before you answer.' }
  ],
  faith: [
    { t: 'What is one thing you are thankful for at this table?', h: 'Point to it, hold it up, or say it out loud.' },
    { t: 'What is one thing you hope for this week?', h: 'Ask someone at the table to add one encouraging sentence.' },
    { t: 'Where did you notice God being kind today?', h: 'If you are not sure, ask the table to help you look back over your day.' },
    { t: 'Who could use prayer from our family this week?', h: 'Choose someone to pray a short sentence for that person.' },
    { t: "What is one part of Jesus' character you want to copy tomorrow?", h: 'Ask someone to suggest a real-life situation where you could practice it.' },
    { t: 'What is one good gift God gave you today?', h: 'Let another family member add one gift they noticed too.' }
  ],
  family: [
    { t: 'Who helped you today, even in a small way?', h: 'Give them a tiny cheer or a table tap.' },
    { t: 'What is one thing someone in this family did well today?', h: 'Say it directly to them if they are at the table.' },
    { t: 'Where could our family show more grace to each other this week?', h: 'Keep it kind and choose one small next step.' },
    { t: 'What would it look like for our home to be more peaceful tomorrow?', h: 'Ask the table for one practical idea, then choose your favorite.' },
    { t: 'What family memory still makes you smile?', h: 'Pick someone else to add one detail they remember.' }
  ],
  friends: [
    { t: 'Who did you play with or talk to today?', h: 'Tell us one thing you liked about being with them.' },
    { t: 'What is something you could do tomorrow to be a good friend?', h: 'Let someone at the table help you make the idea specific.' },
    { t: 'Who might need encouragement from you this week?', h: 'Ask someone to help you think of a kind sentence you could say.' },
    { t: 'Where is Jesus inviting you to be brave and kind with a friend?', h: 'You can keep names private if that makes the story easier to share.' },
    { t: 'What makes someone easy to be friends with?', h: 'Choose a person at the table who shows that quality.' }
  ],
  tomorrow: [
    { t: 'What is one helpful thing you can do tomorrow?', h: 'Ask the table to make a drumroll before you answer.' },
    { t: 'What is one small choice that would make tomorrow better?', h: 'Make it small enough that you could actually do it before lunch.' },
    { t: 'Who can you love well tomorrow?', h: 'Ask someone to help you choose one action, not just one intention.' },
    { t: 'What is one habit God may be growing in you right now?', h: 'Name one tiny practice that could water that habit tomorrow.' },
    { t: 'What are you excited about tomorrow?', h: 'Let someone ask one follow-up question.' }
  ],
  wild: [
    { t: 'Close your eyes while someone gives you one mystery bite.', h: 'Only use food already on the table, and the roller can say no thanks.', l: 'Faith tie-in: Trust can feel strange before you know what is coming. Talk about one safe person you trust, and how God invites us to trust him one step at a time.' },
    { t: 'Act out a scene from a movie or show until someone guesses it.', h: 'No words for the first ten seconds.', l: 'Faith tie-in: Stories are easier to understand when we step into them. Which Bible story would you want to see up close?' },
    { t: 'Balance the die on your head while you answer this: what food would you eat every day?', h: 'Someone can count how long it stays up.', l: 'Faith tie-in: Self-control grows when we slow down and pay attention. What is one place you can practice self-control tomorrow?' },
    { t: 'Gently toss the die to someone and give them a ridiculous compliment.', h: 'The compliment should be silly and kind.', l: 'Faith tie-in: Encouragement can surprise someone with grace. Who could use a kind word from you this week?' },
    { t: 'Give a one-minute toast to someone at the table.', h: 'Make it funny, specific, and kind.', l: 'Faith tie-in: Honor means naming the good God is growing in someone. What good thing do you see in them?' },
    { t: 'Make up a ten-second family blessing song.', h: 'You can choose one person to provide percussion on the table.', l: 'Faith tie-in: Blessing is a way to speak hope over someone. What good thing can our family ask God for tonight?' }
  ]
};

// ── Die geometry ────────────────────────────────────────────
// Orientation that brings each face to the front, plus a
// constant resting tilt so the cube always reads as 3D.
const ORIENT = {
  heart:    [0, 0],
  faith:    [0, -90],
  family:   [0, -180],
  friends:  [0, -270],
  tomorrow: [-90, 0],
  wild:     [-270, 0]
};
const TILT_X = -22;
const TILT_Y = -32;

// ── Elements ────────────────────────────────────────────────
const app       = document.getElementById('app');
const die       = document.getElementById('die');
const card      = document.getElementById('promptCard');
const chip      = document.getElementById('chip');
const chipGlyph = document.getElementById('chipGlyph');
const chipLabel = document.getElementById('chipLabel');
const question  = document.getElementById('question');
const helper    = document.getElementById('helper');
const lesson    = document.getElementById('lesson');

// ── State ───────────────────────────────────────────────────
const state = {
  face: 'tomorrow',
  turns: 0,        // accumulated full spins so rolls keep spinning forward
  rolling: false,
  lastPrompt: ''
};

// Read a duration token from CSS so themes control timing too.
function cssSeconds(name, fallback) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const n = parseFloat(v);
  if (isNaN(n)) return fallback;
  return v.endsWith('ms') ? n / 1000 : n;
}

function randCat() {
  return ORDER[Math.floor(Math.random() * ORDER.length)];
}

function setDieTransform(face) {
  const [ox, oy] = ORIENT[face];
  const x = ox + TILT_X - 360 * state.turns;
  const y = oy + TILT_Y + 360 * state.turns;
  die.style.transform = 'rotateX(' + x + 'deg) rotateY(' + y + 'deg)';
}

function pickPrompt(cat) {
  const list = PROMPTS[cat];
  let p = list[Math.floor(Math.random() * list.length)];
  let guard = 0;
  while (list.length > 1 && p.t === state.lastPrompt && guard < 8) {
    p = list[Math.floor(Math.random() * list.length)];
    guard++;
  }
  state.lastPrompt = p.t;
  return p;
}

function showPrompt(cat) {
  const p = pickPrompt(cat);
  chip.dataset.cat = cat;
  chipGlyph.textContent = CATS[cat].glyph;
  chipLabel.textContent = CATS[cat].label;
  question.textContent = p.t;
  helper.textContent = p.h;
  lesson.textContent = p.l || '';
  lesson.hidden = !p.l;
  card.classList.remove('pop');
  void card.offsetWidth; // restart the pop animation
  card.classList.add('pop');
}

function land(cat) {
  state.rolling = false;
  document.body.dataset.rolling = 'false';
  document.body.dataset.face = cat;
  showPrompt(cat);
}

// Tap anywhere: roll the digital die.
function roll() {
  if (state.rolling) return;
  state.rolling = true;
  document.body.dataset.rolling = 'true';
  const landCat = randCat();
  state.face = landCat;
  state.turns += 2;
  setDieTransform(landCat);
  setTimeout(() => land(landCat), cssSeconds('--roll-duration', 1.2) * 1000 + 150);
}

// Tap a side button: match the physical die.
function turnTo(cat) {
  if (state.rolling) return;
  state.face = cat;
  setDieTransform(cat);
  setTimeout(() => land(cat), cssSeconds('--turn-duration', 0.5) * 1000 + 50);
}

// ── Wire up ─────────────────────────────────────────────────
app.addEventListener('click', roll);
document.querySelectorAll('.side').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    turnTo(btn.dataset.cat);
  });
});

// ── Init: random face, no animation on first paint ──────────
(function init() {
  const start = randCat();
  state.face = start;
  die.classList.add('no-anim');
  setDieTransform(start);
  requestAnimationFrame(() => requestAnimationFrame(() => die.classList.remove('no-anim')));
  document.body.dataset.face = start;
  showPrompt(start);
})();
