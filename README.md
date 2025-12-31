# Skill Roadmap - Hackathon MVP

A cutting-edge web application that generates personalized career roadmaps and portfolio recommendations. Built with React, TypeScript, and modern web technologies.

## Features

✨ **Personalized Learning Roadmaps** - Week-by-week learning plans tailored to your profile, available hours, and target role

💬 **Interactive Chat Interface** - Natural conversation interface for asking about roles, skills, and career guidance

🎯 **Career Recommendations** - Get 3 suggested roles based on your background and interests

📚 **10 Prebuilt Roadmaps** - Instant access to professional learning paths for: Cloud Engineer, DevOps, Web Frontend, Web Backend, Data Analyst, ML Engineer, QA, Mobile, Cybersecurity, and Product Manager

🎨 **Portfolio Generator** - Create professional GitHub README and portfolio HTML with generated projects, skills, and descriptions

📱 **Responsive Design** - Beautiful, professional UI that works on desktop, tablet, and mobile

## Quick Start

### Prerequisites

- Node.js 18+ and npm

### Environment Setup

1. **Copy the environment variables file**:
   ```bash
   # Copy the example environment file
   cp .env.example .env
   ```

2. **Add your API keys**:
   - Get a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Add your API key to the `.env` file:
     ```
     VITE_GEMINI_API_KEY=your_actual_api_key_here
     ```

> **Note**: The `.env` file is intentionally excluded from version control for security reasons. Never commit actual API keys to the repository.

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## Usage Guide

### First Time Setup

1. **Complete Onboarding** - Enter your name, education/work status, organization, available hours per week, and coding comfort level
2. **Choose Your Path** - Use the chat to ask "What tech career fits me?" or browse prebuilt roadmaps

### Main Features

#### Chat & Guidance
- Ask career questions naturally
- Get recommended roles
- Select from suggested roles
- Triggers automatic roadmap generation

#### Roadmap Exploration
- **Browse Prebuilt Roadmaps** - Search and explore 10 professional career paths
- **View Your Personalized Roadmap** - See week-by-week learning goals, mini-projects, and resources
- **Access Resources** - Direct links to YouTube tutorials, courses, articles, and documentation

#### Portfolio Generation
- Generated mini-projects with subtasks
- Professional GitHub README markdown
- About Me and Skills sections
- Download as single-file HTML portfolio

## Project Structure

```
src/
├── components/           # React components
│   ├── OnboardingModal.tsx    # User profile setup
│   ├── ChatInterface.tsx       # Chat interface
│   ├── RoadmapTimeline.tsx     # Display roadmap
│   ├── RoadmapSearch.tsx       # Browse all roadmaps
│   ├── PortfolioGenerator.tsx  # Generate portfolio
│   └── HelpModal.tsx           # Instructions
├── utils/
│   ├── storage.ts        # localStorage management
│   └── // Other utilities
├── types/
│   └── index.ts          # TypeScript interfaces
├── data/
│   └── prebuilt_roadmaps.json  # 75 career roadmaps
├── App.tsx              # Main app component
├── main.tsx             # React entry point
└── index.css            # Global styles
```

## LocalStorage Keys

The app persists all data locally in browser storage:

- `skillroadmap_first_visit` - Tracks if user has completed onboarding
- `skillroadmap_user_profile` - User's profile information
- `skillroadmap_chat_history` - Chat messages
- `skillroadmap_roadmap` - Generated or selected roadmap
- `skillroadmap_portfolio` - Generated portfolio data

## Development

### Available Scripts

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run typecheck  # TypeScript type checking
```

### Code Architecture

- **Modular Components** - Each view has its own component for maintainability
- **Centralized State** - App.tsx manages all global state
- **Type Safety** - Full TypeScript typing throughout
- **LocalStorage Service** - Abstracted storage layer for easy data persistence

## Design System

- **Primary Color** - Blue (#0066cc / #2563eb)
- **Typography** - System fonts (Segoe UI, Tahoma, Geneva, Verdana)
- **Spacing** - 8px grid system via Tailwind
- **Icons** - lucide-react for all SVG icons
- **Components** - Tailwind CSS for styling, no external UI frameworks

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Single-page application (no page reloads)
- ~226KB JavaScript (gzipped 66KB)
- ~18KB CSS (gzipped 4KB)
- Lazy-loaded components with React Suspense
- IndexedDB ready for future enhancements

## Accessibility

- Semantic HTML throughout
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus states on all buttons
- Minimum 16px font size for readability
- Sufficient color contrast ratios (WCAG AA)

## Security

- No authentication/authorization needed (MVP)
- All data stored locally in browser
- No backend server required
- No personal data transmitted to external services

## Future Enhancements

- User accounts with cloud sync
- Progress tracking and XP system
- Social features (share roadmaps, compare paths)
- Advanced portfolio features (GitHub integration)
- Video learning paths
- Quiz and assessment system
- Job marketplace integration

## Troubleshooting

### Responses are generic
- Refresh the page to reset the state

### Styles not loading
- Clear browser cache
- Run `npm run build` and refresh
- Check that Tailwind CSS is properly configured

### localStorage full
- The app stores data efficiently, but you can clear old data
- Use browser DevTools to inspect localStorage
- Remove old entries manually if needed

## Contributing

This is an MVP created for hackathon purposes. For improvements, please:

1. Follow the existing code structure
2. Use TypeScript for type safety
3. Keep components modular and focused
4. Add comments for complex logic

## License

MIT License - feel free to use for personal and commercial projects

## Credits

Built with:
- React 18
- TypeScript 5
- Tailwind CSS 3
- Vite 5
- Lucide React (icons)