# Smart Campus — Room Availability Checker

Lightweight client-side web application for filtering study rooms and checking booking availability against fixed rules (`AC1–AC5`).

## Repository Structure

```text
Assignment #05/
├── baseline/
│   ├── index.html     # Original baseline HTML entry point
│   ├── script.js      # Original baseline JavaScript logic
│   └── styles.css     # Original baseline stylesheet
├── index.html         # Updated application entry point
├── script.js          # Updated room data, filtering, time validation, booking checks, and DOM logic
├── styles.css         # Updated layout, form controls, and status styling
├── AGENTS.md          # Guidelines and safety rules for AI agents and contributors
└── README.md          # Project overview, run steps, and verification notes

```

## Architecture & Scope

* Pure client-side application built with HTML, CSS, and vanilla JavaScript.
* No backend, database, external REST APIs, build tools, or third-party dependencies.
* Room catalog and existing bookings are stored in memory in `script.js`.

## Running the Application

Option 1: Open `index.html` in the `Assignment #05/` folder (or `baseline/index.html` for the original version) directly in a web browser.

Option 2: Run a local static server from `Assignment #05/`:

python -m http.server 8000

Then open `http://localhost:8000` in your browser.

## Acceptance Criteria (`AC1–AC5`) & Verification

* AC1 (Start time): Strictly after fixed time `10:00` (`10:00` rejected, `10:01` allowed if other checks pass).
* AC2 (Duration): Between `1` and `120` minutes inclusive (`120` allowed; `121`, `0`, or negative rejected).
* AC3 (Blocked rooms): Blocked rooms (`blocked: true`, e.g., Room 103) are excluded from filtered results and rejected on booking attempt.
* AC4 (Overlaps): Overlapping intervals are rejected; touching intervals (e.g., `12:00–13:00` and `13:00–14:00`) are allowed.
* AC5 (Filters & empty state): Filters by capacity and required equipment; displays an empty state when no rooms match.
