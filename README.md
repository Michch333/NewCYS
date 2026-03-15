🏆 Game Night Tournament Tracker

A custom-built, fully reactive Angular application designed to track games, scores, and specific house-rule punishments for a 3-player gaming tournament.

Built with a "Mario Party" style interface, this app serves as the central hub for game night, managing everything from randomizing turn orders to permanently logging match history.

## ✨ Features

* **The "Mario Party" Dashboard:** A 4-corner CSS Grid layout keeping the three players (Mike, Greg, and Jason) locked in the corners while the central console manages the active game state.
* **Live Score & Threat Tracking:** Real-time updates for points (1st place) and consecutive 3rd place finishes. 
* **🚨 The Dookie Dab Penalty:** A screen-locking, violently flashing modal that automatically triggers when a player suffers three consecutive last-place finishes. The tournament cannot proceed until the punishment is acknowledged!
* **Hall of Records (Data Persistence):** Match history and player stats are saved directly to the browser's `localStorage`. If you accidentally close the tab or refresh the page, zero data is lost.
* **Global Tools Panel:**
    * **d60 Roller:** A quick digital dice roller for tiebreakers.
    * **Turn Randomizer:** Instantly shuffles the players to determine draft or selection order.
    * **☢️ Nuke Tournament:** A protected hard-reset button to wipe the local storage and reset the board for a fresh game night.

## 🛠️ Tech Stack

* **Framework:** Angular (Standalone Components)
* **State Management:** RxJS (`BehaviorSubject` for reactive UI updates across isolated components)
* **Styling:** SCSS (Custom Flexbox & Grid architectures, CSS animations)
* **Storage:** Browser LocalStorage API (with SSR bypassing)
* **Language:** TypeScript / HTML5

## 🚀 Getting Started

To get this project running on your local machine:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and the [Angular CLI](https://angular.io/cli) installed.

### Installation
1. Clone the repository:
   ```bash
   git clone <your-github-repo-url>