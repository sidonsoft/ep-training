# EP Training Prep

A browser-based training preparation tool for Qantas cabin crew preparing for recurrent Emergency Procedures (EP) training.

## Overview

Interactive branching scenarios for cognitive preparation before hands-on simulator training. Not a replacement for actual training — this is mental rehearsal and procedure review.

**Target users:** Qantas cabin crew studying at hotels, during commute, or at home.

## Features

- 📱 Phone-first design (works on mobile browsers)
- 🧠 Interactive decision-based scenarios
- ⏱️ Timed responses with feedback
- 📊 Progress tracking (stored in browser)
- 💾 Works offline after first load

## Scenarios Included

| ID | Category | Aircraft | Decisions |
|----|----------|----------|-----------|
| fire-001 | Fire | A330 | 7 |
| fire-002 | Fire | A330 | 8 |
| depress-001 | Depressurisation | A330 | 7 |
| evac-001 | Evacuation | A330 | 9 |
| evac-002 | Ditching | A330-200 | 11 |

## Running Locally

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build + preview
npm run build
npm run preview
```

The preview server runs at http://localhost:4173/

## Project Structure

```
src/
├── components/
│   ├── ScenarioList.jsx      # Home screen with scenario cards
│   ├── ScenarioPlayer.jsx    # Interactive scenario gameplay
│   └── Stats.jsx             # Progress tracking
├── data/
│   ├── fire-001-galley-oven.json
│   ├── fire-002-lavatory-waste-bin.json
│   ├── depress-001-sudden.json
│   ├── evac-001-unplanned-land.json
│   └── evac-002-ditching.json
├── utils/
│   └── loadScenarios.js      # Scenario loader
├── App.jsx                   # Main app component
├── App.css                   # Phone-first styles
└── main.jsx                  # Entry point
```

## Scenario Format

Each scenario uses a node-based structure:

```json
{
  "id": "fire-001",
  "title": "Galley Oven Fire",
  "category": "fire",
  "aircraft": "A330",
  "nodes": {
    "start": {
      "id": "start",
      "type": "situation",
      "content": "Scenario setup text...",
      "choices": [
        {
          "text": "Option A",
          "correct": true,
          "feedback": "Why this is correct",
          "next_node": "dp1"
        }
      ]
    }
  }
}
```

## Team

| Role | Name |
|------|------|
| Product Owner | Russell |
| Domain Expert | Samantha Stephens |
| Developer | Russell (with AI assistance) |

## License

Private repository. Not for distribution.