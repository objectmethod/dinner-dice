const categories = [
  { id: "heart", label: "Heart", icon: "♥" },
  { id: "faith", label: "Faith", icon: "✝" },
  { id: "family", label: "Family", icon: "⌂" },
  { id: "friends", label: "Friends", icon: "☻" },
  { id: "tomorrow", label: "Tomorrow", icon: "↑" },
  { id: "wild", label: "Wild", icon: "▦" },
];

const promptBank = [
  {
    category: "heart",
    text: "What made your heart feel big today?",
    helper: "Ask one person to help you name the feeling if you need a word for it.",
  },
  {
    category: "heart",
    text: "What is something that made you angry today?",
    helper: "Name what happened, then name one wise thing you could do with that anger.",
  },
  {
    category: "heart",
    text: "Where did you need patience today?",
    helper: "Invite someone at the table to pray one sentence for you.",
  },
  {
    category: "heart",
    text: "What feeling did you bring to the table tonight that God already knows about?",
    helper: "You can answer with one word, one story, or a short prayer.",
  },
  {
    category: "heart",
    text: "What was one good surprise from today?",
    helper: "Pick someone to guess before you answer.",
  },
  {
    category: "faith",
    text: "What is one thing you are thankful for at this table?",
    helper: "Point to it, hold it up, or say it out loud.",
  },
  {
    category: "faith",
    text: "What is one thing you hope for this week?",
    helper: "Ask someone at the table to add one encouraging sentence.",
  },
  {
    category: "faith",
    text: "Where did you notice God being kind today?",
    helper: "If you are not sure, ask the table to help you look back over your day.",
  },
  {
    category: "faith",
    text: "Who could use prayer from our family this week?",
    helper: "Choose someone to pray a short sentence for that person.",
  },
  {
    category: "faith",
    text: "What is one part of Jesus' character you want to copy tomorrow?",
    helper: "Ask someone to suggest a real-life situation where you could practice it.",
  },
  {
    category: "faith",
    text: "What is one good gift God gave you today?",
    helper: "Let another family member add one gift they noticed too.",
  },
  {
    category: "family",
    text: "Who helped you today, even in a small way?",
    helper: "Give them a tiny cheer or a table tap.",
  },
  {
    category: "family",
    text: "What is one thing someone in this family did well today?",
    helper: "Say it directly to them if they are at the table.",
  },
  {
    category: "family",
    text: "Where could our family show more grace to each other this week?",
    helper: "Keep it kind and choose one small next step.",
  },
  {
    category: "family",
    text: "What would it look like for our home to be more peaceful tomorrow?",
    helper: "Ask the table for one practical idea, then choose your favorite.",
  },
  {
    category: "family",
    text: "What family memory still makes you smile?",
    helper: "Pick someone else to add one detail they remember.",
  },
  {
    category: "friends",
    text: "Who did you play with or talk to today?",
    helper: "Tell us one thing you liked about being with them.",
  },
  {
    category: "friends",
    text: "What is something you could do tomorrow to be a good friend?",
    helper: "Let someone at the table help you make the idea specific.",
  },
  {
    category: "friends",
    text: "Who might need encouragement from you this week?",
    helper: "Ask someone to help you think of a kind sentence you could say.",
  },
  {
    category: "friends",
    text: "Where is Jesus inviting you to be brave and kind with a friend?",
    helper: "You can keep names private if that makes the story easier to share.",
  },
  {
    category: "friends",
    text: "What makes someone easy to be friends with?",
    helper: "Choose a person at the table who shows that quality.",
  },
  {
    category: "tomorrow",
    text: "What is one helpful thing you can do tomorrow?",
    helper: "Ask the table to make a drumroll before you answer.",
  },
  {
    category: "tomorrow",
    text: "What is one small choice that would make tomorrow better?",
    helper: "Make it small enough that you could actually do it before lunch.",
  },
  {
    category: "tomorrow",
    text: "Who can you love well tomorrow?",
    helper: "Ask someone to help you choose one action, not just one intention.",
  },
  {
    category: "tomorrow",
    text: "What is one habit God may be growing in you right now?",
    helper: "Name one tiny practice that could water that habit tomorrow.",
  },
  {
    category: "tomorrow",
    text: "What are you excited about tomorrow?",
    helper: "Let someone ask one follow-up question.",
  },
  {
    category: "wild",
    text: "Close your eyes while someone gives you one mystery bite.",
    helper: "Only use food already on the table, and the roller can say no thanks.",
    lesson: "Faith tie-in: Trust can feel strange before you know what is coming. Talk about one safe person you trust, and how God invites us to trust him one step at a time.",
  },
  {
    category: "wild",
    text: "Act out a scene from a movie or show until someone guesses it.",
    helper: "No words for the first ten seconds.",
    lesson: "Faith tie-in: Stories are easier to understand when we step into them. Which Bible story would you want to see up close?",
  },
  {
    category: "wild",
    text: "Balance the die on your head while you answer this: what food would you eat every day?",
    helper: "Someone can count how long it stays up.",
    lesson: "Faith tie-in: Self-control grows when we slow down and pay attention. What is one place you can practice self-control tomorrow?",
  },
  {
    category: "wild",
    text: "Gently toss the die to someone and give them a ridiculous compliment.",
    helper: "The compliment should be silly and kind.",
    lesson: "Faith tie-in: Encouragement can surprise someone with grace. Who could use a kind word from you this week?",
  },
  {
    category: "wild",
    text: "Give a one-minute toast to someone at the table.",
    helper: "Make it funny, specific, and kind.",
    lesson: "Faith tie-in: Honor means naming the good God is growing in someone. What good thing do you see in them?",
  },
  {
    category: "wild",
    text: "Make up a ten-second family blessing song.",
    helper: "You can choose one person to provide percussion on the table.",
    lesson: "Faith tie-in: Blessing is a way to speak hope over someone. What good thing can our family ask God for tonight?",
  },
];

const elements = {
  promptMeta: document.querySelector("#promptMeta"),
  promptText: document.querySelector("#promptText"),
  promptHelper: document.querySelector("#promptHelper"),
  promptLesson: document.querySelector("#promptLesson"),
  digitalRollButton: document.querySelector("#digitalRollButton"),
  rerollPromptButton: document.querySelector("#rerollPromptButton"),
  dieIcon: document.querySelector(".die-icon"),
  categoryTiles: document.querySelectorAll("[data-category]"),
};

let currentCategory = "heart";
let lastPrompt = null;

function getPromptsForCategory(category) {
  return promptBank.filter((prompt) => prompt.category === category);
}

function choosePrompt(category) {
  const prompts = getPromptsForCategory(category);
  const freshPrompts = prompts.filter((prompt) => prompt !== lastPrompt);
  const options = freshPrompts.length > 0 ? freshPrompts : prompts;
  const prompt = options[Math.floor(Math.random() * options.length)];
  lastPrompt = prompt;
  currentCategory = category;
  return prompt;
}

function showPrompt(category) {
  const categoryConfig = categories.find((item) => item.id === category);
  const prompt = choosePrompt(category);

  elements.promptMeta.textContent = categoryConfig.label;
  elements.promptText.textContent = prompt.text;
  elements.promptHelper.textContent = prompt.helper;
  elements.promptLesson.textContent = prompt.lesson || "";
  elements.promptLesson.hidden = !prompt.lesson;
  elements.dieIcon.textContent = categoryConfig.icon;
}

function rollDigitalDie() {
  const result = categories[Math.floor(Math.random() * categories.length)];
  elements.digitalRollButton.classList.add("is-rolling");
  elements.dieIcon.textContent = result.icon;

  window.setTimeout(() => {
    elements.digitalRollButton.classList.remove("is-rolling");
    showPrompt(result.id);
  }, 620);
}

elements.categoryTiles.forEach((tile) => {
  tile.addEventListener("click", () => showPrompt(tile.dataset.category));
});

elements.digitalRollButton.addEventListener("click", rollDigitalDie);
elements.rerollPromptButton.addEventListener("click", () => showPrompt(currentCategory));
