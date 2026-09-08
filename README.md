# YoQuiz

A trivia quiz app built with React, TypeScript and Vite. Questions are pulled live from the [Open Trivia Database](https://opentdb.com/).

Live: https://trivia-quiz-app-sage.vercel.app/

## What it does

- Fetches 10 multiple-choice questions per round from Open Trivia DB
- Shows correct/incorrect feedback as soon as you pick an answer
- Keeps a running scoreboard: correct, wrong, accuracy
- Lets you give up mid-round and see your results, or start over with a fresh set of questions

## Stack

React 19, TypeScript, Vite. No backend, no API key — the trivia API is called directly from the browser.

## Running it locally

```bash
git clone https://github.com/szbence005/trivia-quiz-app.git
cd trivia-quiz-app
npm install
npm run dev
```

Opens on http://localhost:5173 by default.

Other scripts:

```bash
npm run build    # type-check + production build (outputs to dist/)
npm run preview  # preview the production build locally
npm run lint
```

## Structure

```
src/
├── assets/
├── components/
│   ├── Header.tsx
│   ├── Question.tsx   # fetching questions, answering, results screen
│   ├── Answers.tsx
│   └── Score.tsx       # scoreboard
├── services/
│   ├── triviaApi.ts   # calls the Open Trivia DB API
│   └── quiz.ts        # types + HTML entity decoding
├── App.tsx
└── main.tsx
```