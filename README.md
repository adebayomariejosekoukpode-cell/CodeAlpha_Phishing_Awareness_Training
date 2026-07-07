# CodeAlpha_Phishing_Awareness_Training

# CodeAlpha — Phishing Awareness Training Module

An interactive web-based training module designed to educate users about phishing attacks, social engineering tactics, and cybersecurity best practices.

---

## Features

- 5 interactive sections covering phishing awareness
- Real-world phishing email comparison (fake vs legitimate)
- 10-question interactive quiz (Multiple Choice + True/False)
- Score tracking with detailed explanations
- Responsive design (mobile & desktop)
- Dark cybersecurity-themed UI

---

## Project Structure

```
CodeAlpha_Phishing_Awareness_Training
├── src/
│   └── app/
│   │   └── App.tsx     # Main application component
│   │── styles/
|   |    └──fonts.css       # Custom font definitions
|   |    |──index.css       # Global base styles
|   |    |──tailwind.css    # Tailwind CSS directives
|   |    └──theme.css       # Color variables and theme
|   └── main.tsx        # React entry point
|── index.html          # Main HTML entry point
├── package-lock.json   # Auto-generated dependency lock file
├── package.json        # Project dependencies
|── README.md           # Project details
└── vite.config.ts      # Vite configuration
```
---

## 📚 Sections

| # | Section               | Content                                       |
|---|-----------------------|-----------------------------------------------|
| 1 | **Home**              | Introduction and key phishing statistics      |
| 2 | **What is Phishing?** | Definition and types (Email, Spear, Smishing) |
| 3 | **Recognize It**      | Fake vs legitimate email comparison           |
| 4 | **Best Practices**    | 5 essential security tips                     |
| 5 | **Quiz**              | 10 questions to test your knowledge           |

---

## Requirements

- Node.js 18+
- npm 9+

---

## Installation & Usage

### Linux (Kali / Ubuntu / Debian)

**1. Clone the repository**
```bash
git clone https://github.com/your-username/CodeAlpha_Phishing_Awareness_Training.git
cd CodeAlpha_Phishing_Awareness_Training
```

**2. Install dependencies**
```bash
npm install
```

**3. Run in development mode**
```bash
npm run dev
```

**4. Open in your browser**
```
http://localhost:5173
```

---

### Windows

**1. Install Node.js**

Download and install Node.js from: https://nodejs.org/en/download

>  npm is included with Node.js — no separate installation needed

**2. Clone the repository**
```bash
git clone https://github.com/your-username/CodeAlpha_Phishing_Awareness_Training.git
cd CodeAlpha_Phishing_Awareness_Training
```

**3. Install dependencies**
```bash
npm install
```

**4. Run in development mode**
```bash
npm run dev
```

**5. Open in your browser**
```
http://localhost:5173
```

---

## Build for Production

To generate a static version of the site that can be hosted anywhere:

```bash
npm run build
```

The output will be in the `dist/` folder. You can host it on:
- GitHub Pages
- Netlify
- Vercel
- Any static web server

---

## Quiz Overview

The quiz contains 10 questions:

| Type            | Count |
|-----------------|-------|
| Multiple Choice | 6     |
| True / False    | 4     |

Each question includes a detailed explanation after submission to reinforce learning.

---

## Tech Stack

| Technology   | Role                      |
|--------------|---------------------------|
| React 18     | UI framework              |
| TypeScript   | Type-safe JavaScript      |
| Tailwind CSS | Utility-first styling     |
| Vite         | Build tool and dev server |
| Lucide React | Icons                     |

---

## Legal Notice

This module is intended for **educational and awareness purposes only**. All phishing examples are simulated and designed to help users recognize and avoid real attacks.

---

## Author

**Marie-José** — Cybersecurity Intern @CodeAlpha  
IFRI — Université d'Abomey-Calavi, Benin