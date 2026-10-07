# College Task Manager

A simple, responsive task management web application designed for college students. It helps students organize assignments and study tasks, track completion, and view the number of tasks that still need attention.

## Main Features

- Add a new task from the input field.
- Display tasks in a clear, readable list.
- Mark tasks as completed with a checkbox.
- Visually distinguish completed tasks from pending tasks.
- Delete tasks after confirming the action.
- View the current number of pending tasks.
- See the total number of tasks and completed tasks in the summary.
- Keep tasks stored in the browser using local storage.
- Use a responsive layout that adapts to desktop and mobile screens.

## Technologies Used

- **HTML** — Application structure and accessible interface elements.
- **CSS** — Responsive layout, visual styling, task states, and mobile design.
- **JavaScript** — Task creation, completion toggling, deletion confirmation, rendering, counters, and local storage.

No framework or package installation is required.

## Installation

This application is a static web project and does not require a package installation.

1. Open the project folder in Visual Studio Code.
2. Confirm that the following files are available:
   - `index.html`
   - `styles.css`
   - `app.js`
3. No additional setup is required.

## How to Run the Application

1. Open `index.html` in a browser, or serve the project folder with any static file server.
2. The application will load and display its task list.

For example, from the project directory in a terminal, the following command can be used with Python:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## How to Use the Application

1. Enter a task name in the **What needs to be done?** field.
2. Select **Add task** to add the task to the list.
3. Select a task's checkbox to mark it as completed or pending.
4. Select the trash icon to delete a task after confirming the deletion.
5. Review the pending count and task summary at the top of the application.

Tasks are saved in the browser. Refreshing the page will restore the previously saved tasks.

## Project Structure

```text
college-task-manager/
├── index.html
├── styles.css
├── app.js
├── README.md
└── tests/
    └── app.test.js
```

- `index.html` — Page structure and accessible interface elements.
- `styles.css` — Responsive visual design and task states.
- `app.js` — Task management functionality and local storage.
- `tests/app.test.js` — Automated tests for task completion and deletion behavior.

## Future Improvements

- Add task categories or due dates.
- Add filtering for pending, completed, or all tasks.
- Add task editing.
- Add a clear-completed option.
- Add a user-friendly confirmation design with a custom modal.
- Add data synchronization across devices.
- Add a user account or login system.

