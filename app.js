/* ═══════════════════════════════════════════════════════════
   Dinner Dice — behavior
   No colors or styles in here: this file only flips
   data-attributes and text. styles.css owns the theme.
   ═══════════════════════════════════════════════════════════ */

// ── Categories (label + glyph only; colors live in CSS) ─────
const CATS = {
  heart:   { label: 'Heart',   glyph: '\u2665', description: 'Feelings, gratitude, fears, and hopes' },
  faith:   { label: 'Faith',   glyph: '\u271D', description: 'God, prayer, Scripture, and Catholic life' },
  family:  { label: 'Family',  glyph: '\u2302', description: 'Life at home, helping, and forgiveness' },
  friends: { label: 'Friends', glyph: '\u263B', description: 'Friendship, school, inclusion, and kindness' },
  go:      { label: 'Go!',     glyph: '\u2191', description: "One action inspired by this week's message" },
  wild:    { label: 'Wild',    glyph: '\u25A6', description: 'Movement, imagination, laughter, and play' }
};
const ORDER = Object.keys(CATS);

// ── Weekly content ─────────────────────────────────────────
// Content is loaded from content.js before this file.
const WEEKS = window.DINNER_DICE_WEEKS || [];

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function currentWeek(today = localDateKey()) {
  if (!WEEKS.length) throw new Error('No Dinner Dice content is available.');
  return WEEKS.reduce((selected, week) => week.startsOn <= today ? week : selected, WEEKS[0]);
}

function previewDateKey() {
  return new URLSearchParams(window.location.search).get('date') || localDateKey();
}

const WEEK = currentWeek(previewDateKey());
const PROMPTS = WEEK.prompts;

// ── Die geometry ────────────────────────────────────────────
// Orientation that brings each face to the front, plus a
// constant resting tilt so the cube always reads as 3D.
const ORIENT = {
  heart:    [0, 0],
  faith:    [0, -90],
  family:   [0, -180],
  friends:  [0, -270],
  go:       [-90, 0],
  wild:     [-270, 0]
};
const TILT_X = -22;
const TILT_Y = -32;

// ── Elements ────────────────────────────────────────────────
const app       = document.getElementById('app');
const dieZone   = document.getElementById('dieZone');
const die       = document.getElementById('die');
const card      = document.getElementById('promptCard');
const chip      = document.getElementById('chip');
const chipGlyph = document.getElementById('chipGlyph');
const chipLabel = document.getElementById('chipLabel');
const question  = document.getElementById('question');
const helper    = document.getElementById('helper');
const lesson    = document.getElementById('lesson');
const weekTheme = document.getElementById('weekTheme');
const weekSummary = document.getElementById('weekSummary');
const readingsLink = document.getElementById('readingsLink');

// ── State ───────────────────────────────────────────────────
const state = {
  face: 'go',
  turns: 0,        // accumulated full spins so rolls keep spinning forward
  rolling: false,
  queues: {}
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

function shuffledIndexes(length) {
  const indexes = Array.from({ length }, (_, index) => index);
  for (let i = indexes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
  }
  return indexes;
}

function pickPrompt(cat) {
  const list = PROMPTS[cat];
  if (!list || !list.length) throw new Error(`No prompts available for ${cat}.`);
  if (!state.queues[cat] || !state.queues[cat].length) {
    state.queues[cat] = shuffledIndexes(list.length);
  }
  return list[state.queues[cat].shift()];
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

// Tap the die: roll the digital die.
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

// Tap a category button: turn to that category and show another question.
function turnTo(cat) {
  if (state.rolling) return;
  state.face = cat;
  setDieTransform(cat);
  setTimeout(() => land(cat), cssSeconds('--turn-duration', 0.5) * 1000 + 50);
}

// ── Wire up ─────────────────────────────────────────────────
dieZone.addEventListener('click', roll);
document.querySelectorAll('.side').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    turnTo(btn.dataset.cat);
  });
});

// ── Init: random face, no animation on first paint ──────────
(function init() {
  weekTheme.textContent = WEEK.theme;
  weekSummary.textContent = WEEK.summary;
  readingsLink.href = WEEK.readingsUrl;
  readingsLink.title = `${WEEK.title}: ${WEEK.readings.join('; ')}`;

  const start = randCat();
  state.face = start;
  die.classList.add('no-anim');
  setDieTransform(start);
  requestAnimationFrame(() => requestAnimationFrame(() => die.classList.remove('no-anim')));
  document.body.dataset.face = start;
  showPrompt(start);
})();
