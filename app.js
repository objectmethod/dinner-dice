const categories = [
  { id: "heart", label: "Heart", icon: "♥" },
  { id: "faith", label: "Faith", icon: "✝" },
  { id: "family", label: "Family", icon: "⌂" },
  { id: "friends", label: "Friends", icon: "☻" },
  { id: "tomorrow", label: "Tomorrow", icon: "↑" },
  { id: "wild", label: "Wild", icon: "▦" },
];

const toneRank = {
  light: 1,
  clear: 2,
  devotional: 3,
};

const promptBank = [
  {
    category: "heart",
    ages: ["preschool", "grade"],
    tone: "light",
    text: "What made your heart feel big today?",
    helper: "Ask one person to help you name the feeling if you need a word for it.",
  },
  {
    category: "heart",
    ages: ["grade", "middle", "high"],
    tone: "light",
    text: "What is something that made you angry today?",
    helper: "Name what happened, then name one wise thing you could do with that anger.",
  },
  {
    category: "heart",
    ages: ["grade", "middle", "high"],
    tone: "clear",
    text: "Where did you need patience today?",
    helper: "Invite someone at the table to pray one sentence for you.",
  },
  {
    category: "heart",
    ages: ["middle", "high"],
    tone: "devotional",
    text: "What feeling did you bring to the table tonight that God already knows about?",
    helper: "You can answer with one word, one story, or a short prayer.",
  },
  {
    category: "heart",
    ages: ["preschool", "grade", "middle", "high"],
    tone: "light",
    text: "What was one good surprise from today?",
    helper: "Pick someone to guess before you answer.",
  },
  {
    category: "faith",
    ages: ["preschool", "grade"],
    tone: "light",
    text: "What is one thing you are thankful for at this table?",
    helper: "Point to it, hold it up, or say it out loud.",
  },
  {
    category: "faith",
    ages: ["preschool", "grade", "middle", "high"],
    tone: "light",
    text: "What is one thing you hope for this week?",
    helper: "Ask someone at the table to add one encouraging sentence.",
  },
  {
    category: "faith",
    ages: ["grade", "middle", "high"],
    tone: "clear",
    text: "Where did you notice God being kind today?",
    helper: "If you are not sure, ask the table to help you look back over your day.",
  },
  {
    category: "faith",
    ages: ["grade", "middle", "high"],
    tone: "clear",
    text: "Who could use prayer from our family this week?",
    helper: "Choose someone to pray a short sentence for that person.",
  },
  {
    category: "faith",
    ages: ["middle", "high"],
    tone: "devotional",
    text: "What is one part of Jesus' character you want to copy tomorrow?",
    helper: "Ask someone to suggest a real-life situation where you could practice it.",
  },
  {
    category: "faith",
    ages: ["preschool", "grade", "middle", "high"],
    tone: "devotional",
    text: "What is one good gift God gave you today?",
    helper: "Let another family member add one gift they noticed too.",
  },
  {
    category: "family",
    ages: ["preschool", "grade"],
    tone: "light",
    text: "Who helped you today, even in a small way?",
    helper: "Give them a tiny cheer or a table tap.",
  },
  {
    category: "family",
    ages: ["grade", "middle", "high"],
    tone: "light",
    text: "What is one thing someone in this family did well today?",
    helper: "Say it directly to them if they are at the table.",
  },
  {
    category: "family",
    ages: ["grade", "middle", "high"],
    tone: "clear",
    text: "Where could our family show more grace to each other this week?",
    helper: "Keep it kind and choose one small next step.",
  },
  {
    category: "family",
    ages: ["middle", "high"],
    tone: "devotional",
    text: "What would it look like for our home to be more peaceful tomorrow?",
    helper: "Ask the table for one practical idea, then choose your favorite.",
  },
  {
    category: "family",
    ages: ["preschool", "grade", "middle", "high"],
    tone: "light",
    text: "What family memory still makes you smile?",
    helper: "Pick someone else to add one detail they remember.",
  },
  {
    category: "friends",
    ages: ["preschool", "grade"],
    tone: "light",
    text: "Who did you play with or talk to today?",
    helper: "Tell us one thing you liked about being with them.",
  },
  {
    category: "friends",
    ages: ["grade", "middle", "high"],
    tone: "light",
    text: "What is something you could do tomorrow to be a good friend?",
    helper: "Let someone at the table help you make the idea specific.",
  },
  {
    category: "friends",
    ages: ["grade", "middle", "high"],
    tone: "clear",
    text: "Who might need encouragement from you this week?",
    helper: "Ask someone to help you think of a kind sentence you could say.",
  },
  {
    category: "friends",
    ages: ["middle", "high"],
    tone: "devotional",
    text: "Where is Jesus inviting you to be brave and kind with a friend?",
    helper: "You can keep names private if that makes the story easier to share.",
  },
  {
    category: "friends",
    ages: ["preschool", "grade", "middle", "high"],
    tone: "light",
    text: "What makes someone easy to be friends with?",
    helper: "Choose a person at the table who shows that quality.",
  },
  {
    category: "tomorrow",
    ages: ["preschool", "grade"],
    tone: "light",
    text: "What is one helpful thing you can do tomorrow?",
    helper: "Ask the table to make a drumroll before you answer.",
  },
  {
    category: "tomorrow",
    ages: ["grade", "middle", "high"],
    tone: "light",
    text: "What is one small choice that would make tomorrow better?",
    helper: "Make it small enough that you could actually do it before lunch.",
  },
  {
    category: "tomorrow",
    ages: ["grade", "middle", "high"],
    tone: "clear",
    text: "Who can you love well tomorrow?",
    helper: "Ask someone to help you choose one action, not just one intention.",
  },
  {
    category: "tomorrow",
    ages: ["middle", "high"],
    tone: "devotional",
    text: "What is one habit God may be growing in you right now?",
    helper: "Name one tiny practice that could water that habit tomorrow.",
  },
  {
    category: "tomorrow",
    ages: ["preschool", "grade", "middle", "high"],
    tone: "light",
    text: "What are you excited about tomorrow?",
    helper: "Let someone ask one follow-up question.",
  },
  {
    category: "wild",
    ages: ["preschool", "grade", "middle", "high"],
    tone: "light",
    text: "Close your eyes while someone gives you one mystery bite.",
    helper: "Only use food already on the table, and the roller can say no thanks.",
  },
  {
    category: "wild",
    ages: ["preschool", "grade", "middle", "high"],
    tone: "light",
    text: "Act out a scene from a movie or show until someone guesses it.",
    helper: "No words for the first ten seconds.",
  },
  {
    category: "wild",
    ages: ["preschool", "grade"],
    tone: "light",
    text: "Balance the die on your head while you answer this: what food would you eat every day?",
    helper: "Someone can count how long it stays up.",
  },
  {
    category: "wild",
    ages: ["grade", "middle", "high"],
    tone: "light",
    text: "Gently toss the die to someone and give them a ridiculous compliment.",
    helper: "The compliment should be silly and kind.",
  },
  {
    category: "wild",
    ages: ["middle", "high"],
    tone: "clear",
    text: "Give a one-minute toast to someone at the table.",
    helper: "Make it funny, specific, and kind.",
  },
  {
    category: "wild",
    ages: ["preschool", "grade", "middle", "high"],
    tone: "devotional",
    text: "Make up a ten-second family blessing song.",
    helper: "You can choose one person to provide percussion on the table.",
  },
];

const elements = {
  ageSelect: document.querySelector("#ageSelect"),
  toneGroup: document.querySelector("#toneGroup"),
  settingsPanel: document.querySelector("#settingsPanel"),
  settingsToggle: document.querySelector("#settingsToggle"),
  promptMeta: document.querySelector("#promptMeta"),
  promptText: document.querySelector("#promptText"),
  promptHelper: document.querySelector("#promptHelper"),
  digitalRollButton: document.querySelector("#digitalRollButton"),
  rerollPromptButton: document.querySelector("#rerollPromptButton"),
  dieCube: document.querySelector("#dieCube"),
  dieIcon: document.querySelector(".die-icon"),
  categoryTiles: document.querySelectorAll("[data-category]"),
};

let selectedTone = localStorage.getItem("gatherRoundTone") || "clear";
let selectedAge = localStorage.getItem("gatherRoundAge") || "grade";
let currentCategory = "heart";
let lastPrompt = null;

function setInitialControls() {
  elements.ageSelect.value = selectedAge;
  setTone(selectedTone);
}

function setTone(tone) {
  selectedTone = tone;
  localStorage.setItem("gatherRoundTone", tone);

  elements.toneGroup.querySelectorAll("[data-tone]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tone === tone);
  });
}

function getEligiblePrompts(category) {
  const maxTone = toneRank[selectedTone];
  const matches = promptBank.filter((prompt) => {
    return (
      prompt.category === category &&
      prompt.ages.includes(selectedAge) &&
      toneRank[prompt.tone] <= maxTone
    );
  });

  if (matches.length > 0) {
    return matches;
  }

  return promptBank.filter((prompt) => prompt.category === category);
}

function choosePrompt(category) {
  const prompts = getEligiblePrompts(category);
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

  elements.promptMeta.textContent = `${categoryConfig.label} · ${formatAge(selectedAge)} · ${formatTone(selectedTone)}`;
  elements.promptText.textContent = prompt.text;
  elements.promptHelper.textContent = prompt.helper;
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

function formatAge(age) {
  return {
    preschool: "Preschool",
    grade: "Grade school",
    middle: "Middle school",
    high: "High school",
  }[age];
}

function formatTone(tone) {
  return {
    light: "Light",
    clear: "Clear",
    devotional: "Devotional",
  }[tone];
}

elements.settingsToggle.addEventListener("click", () => {
  const isHidden = elements.settingsPanel.hasAttribute("hidden");
  elements.settingsPanel.toggleAttribute("hidden", !isHidden);
  elements.settingsToggle.setAttribute("aria-label", isHidden ? "Close settings" : "Open settings");
});

elements.ageSelect.addEventListener("change", (event) => {
  selectedAge = event.target.value;
  localStorage.setItem("gatherRoundAge", selectedAge);
  showPrompt(currentCategory);
});

elements.toneGroup.addEventListener("click", (event) => {
  const button = event.target.closest("[data-tone]");

  if (!button) {
    return;
  }

  setTone(button.dataset.tone);
  showPrompt(currentCategory);
});

elements.categoryTiles.forEach((tile) => {
  tile.addEventListener("click", () => showPrompt(tile.dataset.category));
});

elements.digitalRollButton.addEventListener("click", rollDigitalDie);
elements.rerollPromptButton.addEventListener("click", () => showPrompt(currentCategory));

setInitialControls();
