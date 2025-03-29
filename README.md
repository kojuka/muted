# Muted Chrome Extension

A Chrome extension to control audio across browser tabs - mute current tab, all tabs, or auto-mute new tabs.

## Features

- Mute/unmute the current tab
- Mute/unmute all tabs
- Auto-mute new tabs
- Visual feedback with icon changes based on tab's mute state

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [pnpm](https://pnpm.io/) package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd muted

# Install dependencies
pnpm install
```

### Development Workflow

```bash
# Start development build with watch mode
pnpm dev

# Build for production
pnpm build

# Generate icons from SVG sources
pnpm generate:icons

# Lint code
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code with Prettier
pnpm format

# Run tests
pnpm test
```

### Loading the Extension in Chrome

1. Build the extension: `pnpm build`
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top-right corner)
4. Click "Load unpacked" and select the `dist` directory from this project
5. The extension icon should appear in your browser toolbar

## Project Structure

```
muted/
├── dist/             # Compiled output
├── src/              # Source files
│   ├── background.ts # Service worker script
│   ├── icons/        # Extension icons
│   ├── manifest.json # Extension manifest
│   ├── popup/        # Popup UI
│   │   ├── popup.html
│   │   └── popup.ts
│   ├── scripts/      # Utility scripts
│   │   └── generate-icons.ts
│   └── types/        # TypeScript type definitions
└── ... configuration files
```

## Technologies

- TypeScript
- Webpack
- Chrome Extension API
- Canvas API (for icon generation)

## License

ISC © Ken Ojuka 