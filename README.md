# ⏱️ Chronos: Secure Event Countdown Tracker

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Live Application:** [Chronos Tracker](https://countdown-ten-iota.vercel.app/)
**GitHub Repository:** [countdown-collection](https://github.com/Emafido/countdown-collection)

## 📌 Overview
Chronos is a minimalist, high-tech web application built to help users securely track important milestones, deadlines, and product launches. Designed for a frontend evaluation assessment, this project emphasizes thoughtful UI/UX, robust client-side state management, and strict architectural organization.

---

## 🏗️ Assessment Explanations & Design Philosophy

### 1. What I Built & Why I Made Certain Choices
I opted to build the **Event Countdown Collection** because I am a highly visual learner, and I wanted to explore how to make the passage of time feel dynamic, engaging, and structured. 

**Design & Aesthetic Choices:**
* **Calm vs. Urgency:** Standard countdown apps often induce anxiety with chaotic interfaces. I intentionally chose a sleek, minimalist gray, white, and slate color palette to evoke a sense of calming, high-tech security. 
* **Dynamic Gamification:** To make the time passage interesting, I implemented SVG-based circular progress rings that deplete based on a 30-day scale, alongside mechanically flipping numbers. 
* **Visual Hierarchy:** To help users instantly see what matters most, the dashboard dynamically sorts events. The closest upcoming event is automatically promoted to a massive, dark-themed "Next Up" hero card, establishing immediate visual priority.
* **Color-Coded Stress States:** When an event is more than 3 days away, the interface remains a reassuring blue. At the 3-day mark, the progress ring and seconds indicator smoothly transition to a warning red, naturally creating urgency without cluttering the screen.
* **"Small Delights" (UX):** Tracking goals should feel rewarding. I integrated a custom SweetAlert2 modal, satisfying auditory feedback (swooshes and chimes), and a `canvas-confetti` explosion when a user successfully marks an event as completed.

### 2. Challenges Faced
* **Next.js Hydration Mismatches:** Because the application strictly relies on `localStorage` for data persistence (bypassing the need for a backend), I encountered hydration errors. The Next.js server was rendering an empty state, which clashed with the client-side browser storage. I engineered a robust `isMounted` state check to ensure storage was only read and hydrated safely on the client after the initial render.
* **Complex React State within Intervals:** Managing precise date math (`date-fns`) inside a `setInterval` loop while adhering to Next.js's strict ESLint rules (specifically `react-hooks/exhaustive-deps` and `react-hooks/set-state-in-effect`) required careful restructuring. I solved this by isolating the time-calculation logic into stable helper functions and utilizing the `useCallback` hook to prevent cascading memory leaks and unnecessary re-renders.

### 3. What I'd Improve With More Time
While the current application is highly polished for a localized environment, scaling it would require a few key upgrades:
* **Backend Infrastructure:** I am currently expanding my backend skills with Go. Given more time, I would migrate the `localStorage` data layer to a PostgreSQL database powered by a Go backend, allowing for cross-device synchronization and secure user authentication.
* **Strict Timezone Normalization:** Implementing precise UTC normalization to ensure countdowns remain flawlessly accurate even if a user travels across different global timezones.
* **Service Workers & Push Notifications:** Integrating browser service workers to alert users when a critical countdown hits zero, even if the application is closed.

### 4. Time Spent
This project was completed in a **weekend sprint (approximately 10-12 hours)**. The time was distributed across UI/UX wireframing, component architecture in Next.js, writing the complex interval logic, and fine-tuning the animations and responsive styling.

---

## ✨ Core Features
- **Real-Time Data Visualizations**: Depleting circular progress rings and fixed-width tabular numbers.
- **Seamless Event Management**: Add new events with target dates and detailed descriptions.
- **Inline Editing & Updates**: Modify existing event details directly from the dashboard modal without navigating away.
- **State Segregation**: Cleanly switch between "Active" timers and an "Archive" history tab of completed milestones.
- **Zero Backend Required**: All data is securely handled, stringified, and synced entirely within the browser's local storage.

## 💻 Tech Stack & Libraries
| Technology | Purpose |
| :--- | :--- |
| **Next.js (React)** | Core framework providing robust architecture and routing. |
| **TypeScript** | Strict type safety for event data structures (`CountdownEvent` interfaces). |
| **Tailwind CSS** | Utility-first styling for the sleek, responsive aesthetic. |
| **date-fns** | Lightweight, highly precise date and time math calculations. |
| **lucide-react** | Clean, minimalist, and scalable SVG iconography. |
| **SweetAlert2** | Themed, accessible, and non-intrusive modal interactions. |
| **canvas-confetti** | Lightweight canvas drawing for gamified celebratory UX effects. |

---

## 👨‍💻 Author Info
**Emmanuel Emafido**
* **LinkedIn:** [emmanuel-emafido](https://www.linkedin.com/in/emmanuel-emafido/)
* **GitHub:** [@Emafido](https://github.com/Emafido)