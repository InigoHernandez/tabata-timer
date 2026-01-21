# Rythmic Interval Blaster

A modern, feature-rich Tabata interval timer application built with React and TypeScript. Perfect for high-intensity interval training (HIIT) workouts with customizable work/rest periods, multiple sets, and audio feedback.

>> https://tabata.page/

<img width="756" height="425" alt="Tabata Timer" src="https://github.com/user-attachments/assets/9e0e3f04-d645-4a1f-84a2-f2310b17e6af" />


## Features

- ⏱️ **Customizable Timer Settings**
  - Adjustable work time, rest time, and countdown duration
  - Multiple rounds per set
  - Multiple sets with rest periods between sets

- 🔊 **Audio Feedback**
  - Countdown beeps before workout starts
  - Warning beeps in the last 4 seconds of each interval
  - Start and finish sounds for clear state transitions

- 📱 **Responsive Design**
  - Mobile-first design with touch-friendly controls
  - Tablet and desktop optimized layouts
  - Fullscreen mode support

- 🎨 **Modern UI**
  - Clean, minimalist interface
  - Real-time progress indicators
  - Visual feedback for current state (work/rest/set rest)

- ⚡ **Performance**
  - Code splitting with lazy loading
  - Optimized audio scheduling
  - Smooth animations and transitions

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI component library
- **React Router** - Routing
- **TanStack Query** - Data fetching and state management

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, or bun

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd rythmic-interval-blaster-main
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
yarn build
# or
bun run build
```

The production build will be created in the `dist` directory.

### Preview Production Build

```bash
npm run preview
# or
yarn preview
# or
bun run preview
```

## Usage

1. **Configure Your Workout**
   - Set work time (default: 20 seconds)
   - Set rest time (default: 10 seconds)
   - Set number of rounds per set (default: 8)
   - Set number of sets (default: 2)
   - Set rest time between sets (default: 40 seconds)
   - Set countdown duration (default: 5 seconds)

2. **Start the Timer**
   - Click the play button to begin
   - The timer will countdown, then start the first work interval
   - Audio beeps will indicate transitions and countdowns

3. **Control the Timer**
   - Pause/Resume: Click the play/pause button
   - Reset: Click the reset button to return to initial state
   - Fullscreen: Use the fullscreen button for distraction-free workouts

4. **Monitor Progress**
   - View current round and set numbers
   - See remaining time in current interval
   - Track total remaining workout time

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/            # shadcn/ui components
│   ├── TabataTimer.tsx
│   ├── TimerDisplay.tsx
│   ├── TimerSettings.tsx
│   └── ...
├── hooks/              # Custom React hooks
│   └── useAudio.ts     # Audio management hook
├── pages/              # Page components
├── utils/              # Utility functions
└── lib/                # Library utilities
```

## Development

### Linting

```bash
npm run lint
# or
yarn lint
# or
bun run lint
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

Built as part of the Scrimba Frontend Development course.
