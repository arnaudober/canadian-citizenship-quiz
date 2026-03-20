# 🇨🇦 Canadian Citizenship Quiz

An interactive quiz app to help you prepare for the Canadian citizenship test. Built with Angular 20.

![IMG_5521](https://github.com/user-attachments/assets/8f1c2d4c-0026-4bb9-976b-9202ee719a07)

## Features

- **Random question sets** — 20 questions drawn randomly from the full question bank each round
- **Instant feedback** — correct and incorrect answers are highlighted after each selection
- **Controlled pacing** — a "Next question" button lets you review answers before moving on
- **Progress tracking** — a progress bar and question counter keep you oriented throughout the quiz
- **Results summary** — see your score, percentage, and a full review of any wrong answers at the end
- **Accessible** — proper ARIA roles (`radiogroup` / `radio`) and keyboard navigation (Enter / Space)
- **Loading skeleton** — smooth shimmer animation while questions load

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install dependencies

```bash
npm ci
```

### Run the dev server

```bash
npx ng serve
```

Open [http://localhost:4200](http://localhost:4200) in your browser. The app reloads automatically on file changes.

### Build for production

```bash
npx ng build
```

Output is placed in `dist/`. The `docs/` folder contains a pre-built static version for GitHub Pages hosting.

## Project Structure

```
src/
├── app/
│   ├── app.ts          # Main component — quiz state & logic
│   ├── app.html        # Template
│   ├── app.css         # Component styles
│   ├── animations.ts   # Angular animation definitions
│   ├── service.ts      # Question loading & randomisation service
│   ├── model.ts        # Question interface & SET_SIZE constant
│   └── app.routes.ts   # Router config
└── assets/
    └── questions.json  # Full question bank
```

## Adding or Editing Questions

Questions live in `src/assets/questions.json`. Each entry follows this shape:

```json
{
  "question": "What is the capital of Canada?",
  "options": ["Toronto", "Ottawa", "Vancouver", "Montreal"],
  "correctOptionIndex": 1
}
```

`correctOptionIndex` is zero-based.

## Tech Stack

- [Angular 20](https://angular.dev) with standalone components and signals
- [Angular Material](https://material.angular.io) for UI components
- TypeScript, RxJS
