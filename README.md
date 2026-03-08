# ⏱️ Chronos: Secure Event Countdown Tracker

## Overview
Chronos is a sleek, minimalist web application built to help users track important milestones, deadlines, and launches with precision. It replaces the anxiety of looming deadlines with a calming, reassuring, and high-tech interface, transforming basic time tracking into an engaging, dynamic experience.

**Live Demo:** [Insert your Vercel/Netlify link here]

---

## 🏗️ Assessment Deliverables & Explanations

### What I Built & Design Choices
[cite_start]I chose to build the Event Countdown Collection because I am a visual learner, and I wanted to explore how to make the passage of time feel interesting and dynamic[cite: 43, 112]. 

* **Aesthetic & Tone:** I intentionally avoided cluttered, anxiety-inducing interfaces. Instead, I opted for a calming, futuristic, and sleek design using a clean gray, white, and slate color palette to evoke a sense of high-tech financial security. 
* [cite_start]**Visual Hierarchy:** To help users see what matters most, the dashboard automatically isolates the closest upcoming event into a prominent "Next Up" hero card, while sorting the rest sequentially below[cite: 44, 113].
* **Creating Urgency vs. Calm:** The dynamic SVG progress rings act as a visual anchor. For events further out, the interface remains a calming blue. [cite_start]As an event approaches the 3-day mark, the ring and seconds text smoothly transition to a warning red, naturally creating urgency without breaking the minimalist design[cite: 46, 115].
* **Delightful UX:** Time tracking should feel rewarding. I incorporated auditory feedback (subtle high-tech swooshes and success chimes) and visual gamification (canvas confetti) when users mark an event as completed.

### Challenges Faced
* [cite_start]**Next.js Hydration Mismatches:** Because the application relies on `localStorage` for data persistence to bypass the need for a backend[cite: 37, 106], I ran into hydration errors where the server rendered an empty state while the client had saved data. I resolved this by implementing a robust `isMounted` state check to ensure storage was only accessed safely on the client.
* **React State within Intervals:** Managing precise date math (`date-fns`) inside a `setInterval` while keeping the strict Next.js ESLint rules happy required careful structuring of `useEffect` dependencies and the `useCallback` hook to prevent cascading renders.

### What I'd Improve With More Time
* **Backend Integration:** While `localStorage` works great for a localized assessment, I am currently expanding my backend skills with Go and Python. I would love to migrate the data layer to a PostgreSQL database to allow for cross-device synchronization and user authentication.
* **Timezone Handling:** Implementing strict UTC normalization to ensure countdowns remain accurate if a user travels across timezones.
* **Push Notifications:** Utilizing service workers to alert users when a countdown hits zero, even if the app isn't active in their browser.

### Time Spent
Approximately 10-12 hours over a single weekend sprint, covering UI/UX design, component architecture, state management logic, and final polish.

---

## ✨ Core Features
-   **Dynamic Visualizations**: Real-time mechanical number flipping and depleting circular progress rings.
-   **Seamless Event Management**: Add new events with target dates, times, and descriptions.
-   **Inline Editing**: Modify existing event details directly from the dashboard without navigating away.
-   **Archive & History**: Switch between active timers and a history tab of completed milestones.
-   **Zero Backend Required**: All data is securely encrypted and synced to your browser's local storage.

## 💻 Tech Stack
| Technology         | Purpose                                         |
| :----------------- | :---------------------------------------------- |
| **Next.js (React)**| Core framework for structured, maintainable code|
| **TypeScript** | Strict type safety for data structures          |
| **Tailwind CSS** | Utility-first styling for the sleek aesthetic   |
| **date-fns** | Lightweight, precise date/time math calculations|
| **lucide-react** | Clean, minimalist iconography                   |
| **SweetAlert2** | Themed, non-intrusive modal interactions        |
| **canvas-confetti**| Gamified celebratory UX effects                 |

## 🚀 Getting Started

This project uses `bun` for blazing-fast dependency management and execution.

1.  **Clone the Repository**:
    ```bash
    git clone <repository-url>
    cd countdown-collection
    ```

2.  **Install Dependencies**:
    ```bash
    bun install
    ```

3.  **Run the Development Server**:
    ```bash
    bun dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 👨‍💻 Author Info
**Emmanuel Aridon**
-   GitHub: [Your GitHub Link]
-   LinkedIn: [Your LinkedIn Link]