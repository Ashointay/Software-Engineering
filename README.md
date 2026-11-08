# Software-Engineering
# Smart Campus - Room Availability Checker (Assignment #04)

## Project Overview
This project is an extended, refactored prototype of the Smart Campus Room Availability Checker. It allows users to filter a catalog of campus rooms based on attendee capacity and required equipment, and then verify time availability without booking overlap.

## Features & Implementation
- **Room Catalog:** Includes 4 fictional rooms with capacities, equipment lists, blocked statuses, and existing booking schedules.
- **Filtering Logic (F1–F5):** Filters rooms dynamically by minimum capacity (F1) and all selected equipment requirements (F2). Rejects blocked rooms (F3) and handles empty result states gracefully (F4).
- **Modular Codebase:** Cleanly refactored into separated architectural files (`index.html`, `styles.css`, `script.js`).

## How to Run & Setup
1. Clone or download this repository.
2. Open the project folder in **Visual Studio Code**.
3. Launch the application:
   - **Option A (Live Server):** Right-click `index.html` and select **Open with Live Server** (runs at `http://127.0.0.1:5500`).
   - **Option B (Direct):** Open `index.html` directly in any web browser.

## Testing Instructions
- **Manual UI Testing:** Select capacity/equipment criteria, filter rooms, choose a room, and enter valid or invalid booking slots (e.g., duration over 120 minutes or overlapping intervals).
- **Automated Tests:** Open Browser Developer Tools (`F12` -> `Console`) or run `node test.js` in the terminal to execute regression test suites.

## Author & Course Info
- **Student:** Shointay Aigerim
- **Course:** Software Engineering
- **Assignment:** Assignment #04
- **AI Tool Used:** ChatGPT / Gemini
