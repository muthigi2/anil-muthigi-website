# Anil Muthigi — Personal Website

A modern, dark/light themed personal website with animated hero, toolbar navigation, rich sections (About, Education, Experience, Projects, Blog, Achievements, Contact), and a small Express backend serving resume JSON and static assets.

## Tech Stack
- Frontend: React (Vite), CSS-in-JS styles, light/dark theme toggle
- Backend: Node.js + Express (serves `data/resume.json` and `public/` assets)

## Local Development
1. Backend
   ```bash
   node server.cjs
   # runs on http://localhost:5050
   ```
2. Frontend
   ```bash
   npm install
   npm run dev
   # opens http://localhost:5173
   ```

## Build
```bash
npm run build
# output in dist/
```

## Backend Hosting (example: Render)
1. Create a new Web Service
2. Start command: `node server.cjs`
3. Add CORS as needed
4. Update frontend API base URL in `src/App.jsx` if not `http://localhost:5050`

## Project Structure
```
.
├── data/
│   └── resume.json           # Backend data
├── public/
│   └── profile.jpg           # Photo
├── server.cjs                # Express server
├── src/
│   ├── components/           # UI sections
│   ├── App.jsx               # App shell
│   └── App.css               # Styles, themes
└── README.md
```
