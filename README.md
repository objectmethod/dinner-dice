# Dinner Dice

Weekly Catholic conversation starters for families, from Family Meal Moments.

Dinner Dice is a mobile-first, static website for elementary-aged children and their families. Tap the digital die, answer a question from the category it lands on, and roll again. Each week's questions connect everyday family life with the themes of the Sunday Mass readings.

## Categories

- **Heart** — Feelings, gratitude, fears, and hopes
- **Faith** — God, prayer, Scripture, and Catholic life
- **Family** — Life at home, helping one another, and forgiveness
- **Friends** — Friendship, school, inclusion, and kindness
- **Go!** — One concrete action inspired by the week's message
- **Wild** — Movement, imagination, laughter, and playful challenges

## Current pilot

- Four Sunday content sets beginning July 12, 2026
- Three reviewed questions per category per week
- Automatic weekly selection beginning each Friday
- Direct links to the corresponding USCCB readings
- Nonrepeating category queues during a play session
- Digital die with direct category shortcuts
- No accounts, login, backend, or live AI requests

## Project structure

- `index.html` — page structure and accessible controls
- `styles.css` — category themes, mobile layout, and die geometry
- `content.js` — reviewed weekly themes, citations, and question pools
- `app.js` — weekly selection, die behavior, and prompt rotation

## Open locally

Open `index.html` in a browser. No build step or server is required.

To preview a particular week's content while serving the site, add a date to the URL:

`?date=2026-07-19`

## Publishing model

Questions should be prepared and reviewed in batches before being added to `content.js`. The family-facing site makes no third-party API or AI calls. The optional Readings link opens the official USCCB page for the selected Sunday.
