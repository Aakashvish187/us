# Us — Aakash × Sanjana

A private, local-only memory app for two. React + Vite + Tailwind + Framer Motion.

## Run it
```bash
npm install && npm run dev
```
Open the URL it prints (on your phone: use the "Network" URL on the same Wi-Fi).

## Make it yours — `src/config.js`
- `START_DATE` — when the story began (Day N = whole days since this moment)
- `VAULT_PASSCODE` / `VAULT_HINT` — the cute lock on the Little Secret
- `STORAGE_PREFIX` — change to start with a fresh, empty app

Also edit `src/data/quiz.js` to set Aakash's real answers for the game.

## Where things live
```
src/
  config.js            names, start date, passcode
  App.jsx              shell, page transitions, milestone confetti
  pages/               Landing, Home, Story, Memories, Letter, More
  components/          ProgressRing, LiveCounter, TodayNote, QuestionOfDay,
                       MoodCheckIn, HowWellGame, SecretVault, Milestones,
                       FloatingHearts, HeartButton, Nav, Modal, PhotoDrop ...
  data/                timeline, questions (30), quiz, messages, milestones, vault
  hooks/               useLocalStorage, useNow, useDay
  utils/               storage, time, image (photo compression)
public/photos/         the three starter photos
```

## Privacy
Everything is saved in the browser's localStorage. Nothing is sent anywhere.
Photos are shrunk before saving so lots of them fit. The vault passcode is a
cute lock, not real security.

## Deploy on Vercel
No config needed (`vercel.json` is included).

**Option A: GitHub (recommended)**
1. Create a new GitHub repo and push this folder (`node_modules` and `dist` are git-ignored).
2. On vercel.com choose Add New → Project → import the repo.
3. Framework preset: Vite (auto-detected). Click Deploy.

**Option B: CLI**
```bash
npx vercel        # first deploy / preview
npx vercel --prod # production
```

Note: anyone who has the link can open the site and see the photos in
`public/photos`. The page is set to `noindex` so search engines skip it, but
keep the link private (and don't share the URL publicly).

## Photos
Starter photos live in `public/photos/` and are listed in
`src/data/seedMemories.js`. Photos you add inside the app are stored only in
that browser, not in the project. If you change the seed list after the app has
already been opened on a device, bump `STORAGE_PREFIX` in `src/config.js` so the
new seeds load.

# us
