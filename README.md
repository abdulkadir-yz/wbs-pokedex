# 🔴 Pokédex

A multi-page Pokédex application built as a refactoring project at WBS Coding School.

![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?logo=tailwindcss)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?logo=javascript)

## 📋 Project Overview

This project refactors an existing Pokédex into a modern, production-ready
Multi-Page Application (MPA) using Vite as the bundler, TailwindCSS for styling,
and Vanilla JavaScript organized as ES Modules.

**Data source:** [PokéAPI](https://pokeapi.co/) — free and open Pokémon REST API.

## ✨ Features

- 🔍 Search Pokémon by name or ID
- 📋 Browse first 151 Pokémon (Generation I)
- 🏷️ Filter by type (Fire, Water, Grass...)
- 📖 Personal Pokémon Journal (saved to localStorage)
- ⚠️ Graceful error & empty-state handling
- 📱 Fully responsive (mobile-first with Tailwind)

## 🗂️ Pages

| Page | Route | Description |
|------|-------|-------------|
| Pokédex | `/` | Browse and search all Pokémon |
| Journal | `/journal.html` | Your saved Pokémon collection |

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [Vite](https://vitejs.dev/) | Bundler & Dev Server |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework |
| Vanilla JavaScript | ES Modules, async/await |
| [PokéAPI](https://pokeapi.co/) | Pokémon data |
| [Render](https://render.com/) | Static site deployment |

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm v9+

### Installation

```bash
# Clone the repository
git clone git@github.com:abdulkadir-yz/wbs-pokedex.git
cd wbs-pokedex

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview  # Preview the production build locally
```

## 📁 Project structure

A clear, minimal layout that separates entry points, source code, configuration and static assets.

```text
wbs-pokedex/
├── index.html            # Pokédex (home) page entry
├── journal.html          # Journal page entry
├── vite.config.js        # Vite configuration for multiple pages
├── tailwind.config.js    # TailwindCSS configuration
├── package.json          # Project metadata, scripts & dependencies
├── src/                  # Application source (ES modules)
│   ├── home.js           # Entry script for index.html
│   ├── journal.js        # Entry script for journal.html
│   ├── style.css         # Tailwind imports & global styles
│   └── modules/          # Small, focused modules
│       ├── api.js        # PokéAPI fetch helpers
│       ├── ui.js         # DOM rendering & UI helpers
│       ├── storage.js    # localStorage helpers (journal persistence)
│       └── utils.js      # Reusable utility functions
├── public/               # Static assets copied to the build output
│   └── favicon.ico       # Site favicon
└── README.md             # Project documentation
```

Key notes
- Keep modules small and single-purpose (api, ui, storage, utils).
- `index.html` and `journal.html` are separate entry points (MPA) handled by `vite.config.js`.
- Static files placed in `public/` are served as-is and included in the final build.
- Use `package.json` scripts for dev, build and preview commands (see "Getting Started").

This structure favors clarity for newcomers and a smooth developer experience when extending features.

## 🌿 Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production — protected, merge via PR only |
| `dev` | Active development |
| `feature/*` | New features (branch from dev) |
| `fix/*` | Bug fixes (branch from dev) |

## 📦 Functional Requirements

| ID | Requirement | Status |
|----|-------------|--------|
| FR001 | Vite as bundler | ✅ |
| FR002 | Tailwind via npm | ✅ |
| FR003 | ES Module codebase | ✅ |
| FR004 | Multiple HTML entries | ✅ |
| FR005 | Clear file structure | ✅ |
| FR006 | Commented & documented code | ✅ |
| FR007 | Bug fixes | ✅ |
| FR008 | Edge-case handling | ✅ |
| FR009 | Robust error handling | ✅ |
| FR010 | Refactor for readability | ✅ |
| FR011 | Deploy to Render | ✅ |

## 🔗 Live Demo

🚧 Coming soon — [Render deployment link]

## 👨‍💻 Author

**Abdulkadir Yılmaz** — WBS Coding School  
[LinkedIn](https://linkedin.com/in/abdulkadiryilmaz) · [GitHub](https://github.com/abdulkadir-yz)

## 📄 License

[MIT](LICENSE)