# Dinner Dice project context

Last updated: July 12, 2026

This document is a handoff for future contributors and coding agents. It records the product decisions, research, implementation status, and next steps established while building the first weekly Dinner Dice pilot.

## Product purpose

Dinner Dice is a mobile-first website that helps Roman Catholic families in the United States have meaningful, enjoyable conversations at the dinner table. The first audience is families with elementary-school-aged children, initially approximately 397 families at a local Catholic school.

The child rolls a digital six-sided die. Each side represents a conversation category, and the site presents a question from that category. Questions relate to the Sunday Mass readings or their themes but must still make sense when a child missed Mass or does not remember the reading.

This is intended as a local, noncommercial project. It should remain simple, private, inexpensive, and dependable at the dinner table.

## Branding

- Parent identity and domain: **Family Meal Moments** / `FamilyMealMoments.com`
- Game name: **Dinner Dice**
- Previous working name: Gather Round; this is being retired as the product name.
- The custom domain has been purchased but is not configured yet.
- Current GitHub Pages site: `https://objectmethod.github.io/dinner-dice/`

## Category decisions

The permanent six categories are:

1. **Heart** — Feelings, gratitude, fears, and hopes
2. **Faith** — God, prayer, Scripture, and Catholic life
3. **Family** — Life at home, helping one another, and forgiveness
4. **Friends** — Friendship, school, inclusion, and kindness
5. **Go!** — One concrete action inspired by the week's message
6. **Wild** — Movement, imagination, laughter, and playful challenges

`Go!` replaced the earlier `Tomorrow` category because it is action-oriented and works regardless of which day a family plays.

Category-writing lenses:

- Heart: What is happening inside me?
- Faith: What does this teach us about God?
- Family: How does this connect with life at home?
- Friends: How does this affect how we treat other people?
- Go!: What can I actually do?
- Wild: How can we laugh, move, imagine, or play together?

## Content and architecture decisions

- The main experience is weekly and centered on the coming Sunday readings.
- Each content set becomes active on the Friday before Sunday and remains current until the next Friday.
- Holy days or daily content may be added later, but they are not part of the first pilot.
- Questions are generated in advance, reviewed by adults, and stored locally.
- No AI generation occurs during a family's dinner session.
- No third-party Bible or lectionary API is called by the family-facing website.
- The public site remains static and backend-free.
- Weekly data currently lives in `content.js`.
- `app.js` chooses the current content set using the visitor's local date.
- Questions are shuffled into per-category queues so all three appear before that category repeats.
- A reviewer can preview another week with `?date=YYYY-MM-DD`.
- The Readings link opens the official USCCB page; the app does not republish the copyrighted NABRE reading text.

The content-building pipeline should eventually be:

1. Obtain official U.S. Catholic liturgical dates and citations.
2. Resolve citations against a permitted Bible text when full text is useful for question generation.
3. Generate draft themes and questions in batches.
4. Have a qualified adult review them for theology, clarity, privacy, and age appropriateness.
5. Publish only approved content to the static site.

## Content-writing guidelines

- Target elementary-aged children and mixed-age family tables.
- Invite conversation; do not test Bible knowledge.
- Make every question understandable without requiring the reading to be fresh in memory.
- Use the reading or weekly theme as inspiration, not as a forced reference in every sentence.
- Avoid pressuring children to disclose private or upsetting information.
- Keep prompts concrete, warm, and answerable.
- Helpers should make discussion easier, not turn the question into a lesson.
- Wild should be genuinely playful first, with a brief optional faith connection.
- Review for fidelity to Catholic teaching before publication.

## Current four-week pilot

Each week has three prompts in each of the six categories: 18 per week and 72 total.

| Sunday | Activation date | Theme | Gospel |
| --- | --- | --- | --- |
| July 12, 2026 | July 10 | Good Things Grow | Matthew 13:1-23, the sower |
| July 19, 2026 | July 17 | Give Goodness Time to Grow | Matthew 13:24-43, wheat and weeds |
| July 26, 2026 | July 24 | Choose What Matters Most | Matthew 13:44-52, treasure and pearl |
| August 2, 2026 | July 31 | Bring What You Have | Matthew 14:13-21, feeding the five thousand |

Implementation files:

- `index.html` — structure, branding, weekly banner, accessible controls
- `styles.css` — responsive layout, category colors, and 3D die
- `content.js` — four reviewed weekly sets and 72 questions
- `app.js` — date selection, die behavior, nonrepeating prompt queues
- `README.md` — public project overview and local instructions

## Reading-source research

The research established the following:

- The USCCB liturgical calendar is the preferred authority for U.S. celebrations and Lectionary citations.
- The USCCB daily pages are useful reading links, but their exact NABRE text should not be copied into the app without appropriate permission.
- Citation metadata can be stored separately from Bible text.
- HelloAO provides downloadable public-domain translations, including the World English Bible Catholic (`eng_webc`). This was used to assemble a local research dataset.
- The community Catholic Readings API and Lectio API were useful supplementary sources but were not sufficiently complete or consistent to be the sole authority.
- API.Bible has rate, commercial-use, and translation-licensing considerations. It is unnecessary as a runtime dependency for this project.

Local research artifacts created during this work are outside the repository:

`/Users/richguy/Documents/Codex/2026-07-12/i-ne/outputs/`

They include CSV, SQLite, and XLSX reading datasets covering July 12 through August 31, 2026. The combined dataset contains consecutive daily reading records, citation metadata, alternatives, USCCB source links, and public-domain WEBC text for research and generation.

## Running and previewing locally

From the repository:

```bash
cd /Users/richguy/Development/dinner-dice
python3 -m http.server 4173
```

Open `http://localhost:4173/`.

Examples for reviewing pilot weeks:

- `http://localhost:4173/?date=2026-07-12`
- `http://localhost:4173/?date=2026-07-19`
- `http://localhost:4173/?date=2026-07-26`
- `http://localhost:4173/?date=2026-08-02`

Stop the server with Control-C.

## Validation completed

- `node --check app.js`
- `node --check content.js`
- Programmatic validation of four weeks, six categories, three prompts per category, and 72 total prompts
- Mobile browser test at a 390 × 844 viewport
- Digital die roll tested
- Direct category selection and nonrepeating Go! queue tested
- Wild prompt and faith connection tested
- Future-week preview tested
- USCCB reading-link target checked
- Browser console checked with no application warnings or errors

## Git and pull request status

- Repository: `objectmethod/dinner-dice`
- Base branch: `main`
- Working branch: `agent/add-weekly-dinner-dice-pilot`
- Pilot commit: `558c1dc2a082dd7af1852c9dc4e7d72d9a44173d`
- Merged pull request: `https://github.com/objectmethod/dinner-dice/pull/1`
- PR title: **Add weekly Dinner Dice pilot content**
- Merge commit on `main`: `4b0d2e4`

PR #1 has been merged into `main`. This context document was added afterward as a direct follow-up commit to preserve the project's decisions and history.

Git used the automatically configured commit identity `Rich Guy <richguy@mac.lan>` for the pilot commit. Configure the preferred GitHub email before future commits if linked GitHub attribution matters.

## Recommended next steps

1. Review the 72 pilot questions with parents and a qualified Catholic reviewer.
2. Adjust wording based on that review.
3. Configure GitHub Pages to use `FamilyMealMoments.com`, including DNS and the repository `CNAME` file.
4. Test the pilot with 5–10 families before expanding the content calendar.
5. Gather feedback on whether children understand the game, want to roll again, and find the questions enjoyable.
6. Prepare new question sets monthly or by school term rather than generating them at runtime.
7. Add offline/PWA caching only after the core pilot behavior has been validated.

Do not add accounts, child profiles, stored answers, live AI, or runtime Bible API dependencies without a clear product need and a fresh privacy/architecture review.
