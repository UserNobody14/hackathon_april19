# AI Story Simulator

A modern React + TypeScript application that allows users to guide AI characters through narrative adventures. Users can select from different stories, provide guidance for how their character should behave, and watch as the AI simulates the character's journey through the story beats.

## Features

- 📚 Select from different story scenarios
- 🧠 Provide character guidance and behavior instructions
- 🤖 Watch the AI character navigate through story beats
- 🎯 See how the character progresses toward goals

## Technologies Used

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Headless UI

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or bun

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd <repository-folder>/frontend
```

2. Install dependencies
```bash
npm install
# or
bun install
```

3. Start the development server
```bash
npm run dev
# or
bun run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
frontend/
├── public/             # Static files
├── src/                # Source files
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # React components
│   ├── data/           # Sample data and constants
│   ├── hooks/          # Custom React hooks
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── index.html          # HTML entry point
└── package.json        # Project dependencies and scripts
```

## Connecting to a Backend

This frontend is designed to connect to an AI backend service for processing user guidance and story beats. The `useAISimulation` hook provides a placeholder implementation that can be replaced with actual API calls to your backend service.

## License

[MIT License](LICENSE)

---

Created with ❤️ for AI storytelling enthusiasts
