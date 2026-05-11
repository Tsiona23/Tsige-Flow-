🌼 Tsige Flow

A modern Ethiopian-inspired menstrual cycle tracking and wellness dashboard built with React + Vite + Tailwind CSS.

👉 Live Demo: https://tsige-flow.vercel.app/

👉 GitHub Repo: https://github.com/Tsiona23/Tsige-Flow-.git

✨ About The Project

Tsige Flow is a smart period tracking and wellness web app that helps users monitor their menstrual cycles, moods, symptoms, and predictions in a clean SaaS-style dashboard.

It is designed with a feminine Ethiopian-inspired aesthetic and modern UI/UX principles.

🌸 Design Philosophy

Inspired by:

Ethiopian floral identity 🌼
Soft feminine wellness apps 🌸
Modern SaaS dashboards 📊
🎨 Color System:
🌸 Blush Pink — primary accent
💜 Lavender — secondary accent
✨ Soft Gold — highlights
🤍 Cream — light mode background
🌙 Soft Dark Purple — dark mode background
🚀 Features
📊 Dashboard
Cycle day tracking
Next period prediction
Health score overview
Smart cycle summary cards
📅 Calendar View
Period days visualization
Fertile window highlighting
Ovulation tracking
Predicted cycle mapping
🧠 Smart Insights Engine

Located in utils/insightEngine.js

Cycle phase detection
Health score calculation
Symptom-based recommendations
Cycle irregularity detection
📈 Analytics Page

Located in pages/Analytics.jsx

Mood trend analysis
Symptom frequency charts
Cycle pattern insights (Recharts)
⚙️ Settings Page

Located in pages/settings.jsx

Theme customization
Cycle configuration
Prediction settings UI
Privacy & preferences layout
🧠 Smart Logic System

Core logic is handled in /utils:

smartCycle.js → cycle calculations
smartPredictions.js → next period prediction
insightEngine.js → insights & recommendations
recommendations.js → symptom-based advice
🧩 Components Overview

Located in /src/components:

AppContext.jsx → global state management (theme, cycle data)
MainLayout.jsx → app layout wrapper (navbar + structure)
Navbar.jsx → sidebar + mobile navigation + dark mode toggle
Dashboard.jsx → main analytics overview
CalendarView.jsx → cycle calendar visualization
CycleForm.jsx → period start/end input system
ConfirmationModal.jsx → cycle end confirmation popup
History.jsx → past cycle records
Card.jsx → reusable UI card component
🪝 Custom Hooks

Located in /hooks:

useLocalStorage.js → persistent storage for cycle data
🛠️ Tech Stack
React.js ⚛️
Vite ⚡
Tailwind CSS 🎨
React Router 🧭
Recharts 📊
Local Storage API 💾
🌙 Dark Mode System

✔ Controlled via AppContext.jsx
✔ Applied using Tailwind dark: classes
✔ Toggles globally via MainLayout.jsx
✔ Supports full UI (calendar, charts, cards, forms)

Theme:

Light mode → cream + blush tones 🤍
Dark mode → soft purple elegant UI 🌙
📁 Project Structure
period-tracker/
├── public/
├── src/
│ ├── components/
│ │ ├── AppContext.jsx
│ │ ├── Card.jsx
│ │ ├── CalendarView.jsx
│ │ ├── ConfirmationModal.jsx
│ │ ├── CycleForm.jsx
│ │ ├── Dashboard.jsx
│ │ ├── History.jsx
│ │ ├── MainLayout.jsx
│ │ └── Navbar.jsx
│ │
│ ├── hooks/
│ │ └── useLocalStorage.js
│ │
│ ├── pages/
│ │ ├── Analytics.jsx
│ │ ├── Home.jsx
│ │ └── settings.jsx
│ │
│ ├── utils/
│ │ ├── insightEngine.js
│ │ ├── recommendations.js
│ │ ├── smartCycle.js
│ │ └── smartPredictions.js
│ │
│ └── App.jsx
│
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
├── .gitignore
└── README.md
💡 Future Improvements
AI-powered cycle predictions 🧠
Notification reminders 🔔
Backend integration (Firebase / Node.js)
Export cycle reports 📤
Mobile optimization 📱
👩‍💻 Author

Built by Tsiona 🌸
Focused on frontend development, UI design, and wellness tech.
