# Engineering Portfolio — Display Process Engineer

A fully interactive, responsive personal engineering portfolio website built with HTML, CSS, and Chart.js. Created as a model answer for the **LetUIn AI + Vibe Coding Lecture, Project 1 (Advanced Level)**.

**Live Demo**: Deploy to GitHub Pages to view at `https://<username>.github.io/<repo>/`

---

## Overview

This portfolio belongs to a fictional engineering student (이디스 / Lee Dis) majoring in materials engineering with a focus on **display process engineering** — specifically OLED deposition and TFT backplane processes.

The page demonstrates how engineering students can use **Gemini AI** to generate professional-quality web portfolios without prior coding knowledge.

---

## Features

### Visualizations (3+)
1. **Radar Chart** — Self-assessed skill competency across 6 engineering domains
2. **Doughnut Chart** — Global display market share by panel technology (2024 estimate)
3. **Area/Line Chart** — OLED panel shipment trends by year (2018–2025E)

### UI/UX
- Dark / Light mode toggle (persists via CSS variables)
- Sticky responsive top navigation bar
- Scroll-based section layout
- Animated section entrance (`fadeUp` keyframes)
- Hover effects on all interactive elements
- Fully responsive — works on mobile, tablet, and desktop

### Content Sections
- Hero with at-a-glance stats
- About (personal background, timeline)
- Skills (radar chart + progress bars)
- Industry analysis (2 charts with data sources)
- Data table (OLED vs LCD spec comparison)

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| HTML5 / CSS3 | Structure and styling (no frameworks) |
| Chart.js 4.4 (CDN) | All data visualizations |
| CSS Custom Properties | Dark/light theme switching |
| CSS Grid / Flexbox | Responsive layout |
| Vanilla JavaScript | Tab logic, chart rendering, theme toggle |

No build tools, no npm, no React. Everything runs from a single `index.html` file.

---

## Data Sources

All data is based on publicly available industry reports and estimates:

- DSCC (Display Supply Chain Consultants) — Market share figures
- Omdia Display Research — Shipment forecasts
- Displaymate Technologies — Performance benchmarks
- KEIT (Korea Evaluation Institute of Industrial Technology) — Industry reports

> Note: Some values are approximate or representative estimates for educational purposes.

---

## Commit History (example)

```
git log --oneline

a8f3c21  Add dark/light mode toggle
b72de04  Add radar and area charts with Chart.js
c15e309  Add OLED vs LCD data comparison table  
d04a812  Add skills section with progress bars
e91f177  Initial hero and about section
```

> Minimum 5 meaningful commits are required for the advanced level. Each commit should represent a distinct, working improvement to the page.

---

## How to Deploy (GitHub Pages)

```bash
# 1. Create a new GitHub repository
# 2. Clone locally or upload index.html + README.md directly

git init
git add index.html README.md
git commit -m "Initial portfolio page"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main

# 3. Enable GitHub Pages
# Settings → Pages → Source: Deploy from branch → main → / (root) → Save
# Your site will be live at: https://<username>.github.io/<repo>/
```

---

## AI Prompting Notes

This portfolio was generated with the assistance of **Gemini AI**. Key prompts used:

1. **Initial scaffold**: "Create a dark-mode engineering portfolio in a single HTML file with CSS variables for theme switching. Include a fixed navbar and hero section."
2. **Radar chart**: "Add a Chart.js radar chart showing 6 engineering skill scores. Use purple accent color."
3. **Theme toggle**: "Add a button that toggles between dark and light mode by changing the data-theme attribute on the html element."
4. **Data table**: "Create a responsive HTML table comparing OLED vs LCD across 8 technical specifications with colored badge pills."
5. **Responsive fix**: "Make the layout fully responsive. Hide the navbar links on mobile and make the grid single-column below 768px."

> Tip: Break large requests into small, testable steps. Verify each change in the browser before moving on.

---

## Project Context

This file is part of the **LetUIn AI + Vibe Coding Lecture** (렛유인 AI + 바이브코딩 강의).

- **Course**: AI-assisted engineering portfolio development
- **Target Students**: Semiconductor, display, battery, bio, and energy engineering majors
- **Main AI Tool**: Gemini
- **Deployment**: GitHub Pages (free, no server required)
- **Project Level**: Advanced (상)

---

*LetUIn AI + Vibe Coding Lecture | Project 1 of 8 — Advanced Model Answer*
