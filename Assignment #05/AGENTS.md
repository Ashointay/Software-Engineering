# AGENTS.md

## 1. Project Purpose

Smart Campus is a lightweight study-room availability and booking validation web application.

Its purpose is to allow users to:
- View available study rooms.
- Filter rooms by required capacity and equipment.
- Hide blocked rooms from the available room list.
- Select a room and check a proposed booking time.
- Validate booking rules and display success or error messages.
- Display room information, existing bookings, and an empty state when no rooms match the selected filters.

The application is a fictional demonstration project. Room data and existing bookings are defined locally in JavaScript.

## 2. Project Architecture

This project is a pure client-side application built with:

- HTML for the user interface.
- CSS for presentation and layout.
- Vanilla JavaScript for room data, filtering, validation, and DOM updates.

The application uses in-memory data. It does not use a backend, database, external REST API, JavaScript framework, or build system.

### Repository Structure

- `index.html` — Main application entry point and UI structure.
- `styles.css` — Application styling.
- `script.js` — Room catalog, time utilities, filtering, booking validation, and DOM logic.
- `AGENTS.md` — Project instructions and development constraints.

Do not invent files, modules, dependencies, scripts, or project configurations that are not present in the repository.

## 3. Running the Application

The application can be run without installing dependencies.

### Option 1: Open the HTML file

Open `index.html` in a web browser.

### Option 2: Run a local static server

From the project root, run:

    python -m http.server 8000

Then open:

    http://localhost:8000

The local server is only for serving static files. Do not introduce backend functionality.

## 4. Testing Rules

There is currently no automated test framework, test script, build script, lint configuration, or type-checking configuration in the repository.

Do not claim that automated tests, linting, type checking, or builds have passed unless those tools are actually configured, executed, and their results verified.

Use manual browser testing for changes.

After modifying the application, verify relevant scenarios, including:

- Start time exactly 10:00 is rejected.
- Start time 10:01 is accepted if other conditions pass.
- Duration of 1 minute is accepted.
- Duration of 120 minutes is accepted.
- Duration of 121 minutes is rejected.
- Blocked rooms are hidden by filtering.
- Attempting to book a blocked room is rejected.
- Overlapping bookings are rejected.
- Booking intervals that touch at endpoints are accepted.
- Capacity filtering selects rooms that meet the requirement.
- Equipment filtering requires all selected equipment.
- No matching rooms produces a visible empty state.

Test both valid and invalid inputs when modifying validation logic.

Report testing honestly. Distinguish manual browser checks from automated tests.

## 5. Acceptance Criteria — Must Be Preserved

All code changes must preserve AC1–AC5.

### AC1 — Start Time Rule

Bookings are allowed only strictly after the fixed current time of 10:00.

- 10:00 must be rejected.
- 10:01 must be accepted if all other booking rules pass.

The fixed current time is currently represented by `currentTimeMinutes` in `script.js`.

Do not replace the fixed time with the actual system clock unless explicitly requested.

### AC2 — Duration Rule

Booking duration must be between 1 and 120 minutes inclusive.

- 1 minute is valid.
- 120 minutes is valid.
- 0, negative durations, and durations above 120 minutes are invalid.

### AC3 — Blocked Room Rule

Blocked rooms must be excluded from the filtered room list.

Booking attempts for blocked rooms must be rejected with an error.

Do not remove or weaken blocked-room validation.

### AC4 — Overlap Rule

Overlapping booking intervals must be rejected.

Intervals that touch at their endpoints are allowed.

For example:

- 12:00–13:00 and 12:30–13:30 overlap and must be rejected.
- 12:00–13:00 and 13:00–14:00 touch but do not overlap and must be allowed.

### AC5 — Catalog Filtering and Empty State

Capacity and equipment filters must correctly select matching rooms.

All selected equipment requirements must be satisfied by a room.

If no rooms match the selected filters, the interface must display a clear empty state.

## 6. Coding Conventions

- Use plain HTML, CSS, and vanilla JavaScript.
- Keep the application lightweight and compatible with a browser without a build process.
- Use descriptive variable, function, and identifier names.
- Prefer simple, readable code suitable for beginner-level coursework.
- Avoid unnecessary abstractions, complex syntax, or premature optimization.
- Preserve existing functionality unless a change is explicitly requested.
- Keep the room catalog and existing booking data understandable.
- Use consistent formatting and indentation.
- Avoid adding inline styling when equivalent styling can reasonably be handled in `styles.css`.
- Use clear user-facing error and success messages.
- Do not silently change acceptance criteria.

### Separation of Concerns

When modifying the code:

- Keep HTML responsible for the page structure and user controls.
- Keep CSS responsible for presentation and styling.
- Keep JavaScript responsible for application data, filtering, validation, and UI behavior.
- Prefer pure functions for logic that can be calculated without reading or modifying the DOM.
- Separate validation and calculation logic from DOM manipulation where practical.
- Keep DOM update functions focused on displaying data.
- Avoid duplicating booking-rule logic.

Do not restructure the project into a different architecture unless explicitly requested and the change is reviewed.

## 7. Safe Commands

Commands may be used to inspect files, run the local static application, and verify changes.

Examples of acceptable read-only commands:

    pwd
    ls
    find . -maxdepth 2 -type f
    cat index.html
    cat styles.css
    cat script.js
    git status
    git diff
    git log -5 --oneline

Running the local static server is allowed:

    python -m http.server 8000

Stop the server normally when finished.

Review code changes before accepting or committing them.

Commands that modify files should be used only when their effects are understood and relevant to the task.

## 8. Strictly Forbidden Actions

Do not perform or recommend the following without explicit authorization and review:

### Security and privacy

- Do not add, expose, commit, or request passwords, API keys, tokens, credentials, or secrets.
- Do not add personal or sensitive user data to the project.
- Do not transmit project or user data to external services.

### Architecture restrictions

- Do not introduce a backend server, database, or server-side application.
- Do not introduce external REST APIs or remote data services.
- Do not add frameworks, third-party libraries, or dependencies without explicit approval.
- Do not introduce package managers, `package.json`, bundlers, build systems, or configuration files unless explicitly approved.
- Do not change the application from a static client-side project into a different architecture.

### Git and destructive operations

- Do not execute destructive Git commands.
- Do not delete, reset, overwrite, or discard user changes.
- Do not run commands such as `git reset --hard`, `git clean -fd`, forced checkout, or destructive removal commands.
- Do not commit, push, merge, rebase, or rewrite repository history without explicit authorization.
- Do not overwrite existing files without reviewing their contents and the proposed changes.

### Unsupported claims

- Do not invent files, packages, functions, test results, command outputs, or repository capabilities.
- Do not claim that tests, builds, linting, or type checks were performed if they were not actually run.
- Do not assume that a suggested improvement is a confirmed bug without checking the actual code and relevant acceptance criteria.

## 9. Change Workflow

Before making changes:

1. Inspect the relevant existing files.
2. Identify which acceptance criteria are affected.
3. Explain the proposed changes briefly.
4. Preserve unrelated functionality.

After making changes:

1. Review the diff.
2. Confirm that AC1–AC5 remain preserved.
3. Run the application in a browser if possible.
4. Manually test relevant valid and invalid scenarios.
5. Report exactly which files changed.
6. Report actual checks performed and any limitations.

## 10. Priority

The priority order for development is:

1. Preserve AC1–AC5.
2. Maintain correct booking validation.
3. Maintain correct room filtering and empty-state behavior.
4. Keep the application client-side and dependency-free.
5. Improve readability, maintainability, and usability without unnecessary architectural changes.

When requirements are unclear, ask for clarification instead of silently changing project behavior.
