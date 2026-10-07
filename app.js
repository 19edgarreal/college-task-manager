const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const pendingCount = document.querySelector("#pending-count");
const taskSummary = document.querySelector("#task-summary");
const emptyState = document.querySelector("#empty-state");

const STORAGE_KEY = "college-task-manager-tasks";

let tasks = loadTasks();

function loadTasks() {
    try {
        const savedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return Array.isArray(savedTasks) ? savedTasks : [];
    } catch (error) {
        console.warn("Could not load saved tasks.", error);
        return [];
    }
}

function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function createTask(text) {
    return {
        id: crypto.randomUUID(),
        text,
        completed: false
    };
}

function renderTasks() {
    taskList.replaceChildren();

    tasks.forEach((task) => {
        const item = document.createElement("li");
        item.className = `task-item${task.completed ? " completed" : ""}`;
        item.dataset.id = task.id;

        const checkbox = document.createElement("input");
        checkbox.className = "task-checkbox";
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.setAttribute("aria-label", `Mark “${task.text}” as ${task.completed ? "pending" : "completed"}`);
        checkbox.addEventListener("change", () => toggleTask(task.id));

        const text = document.createElement("span");
        text.className = "task-text";
        text.textContent = task.text;

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const deleteButton = document.createElement("button");
        deleteButton.className = "icon-button delete";
        deleteButton.type = "button";
        deleteButton.setAttribute("aria-label", `Delete “${task.text}”`);
        deleteButton.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M3 6h18"></path>
                <path d="M8 6V4h8v2"></path>
                <path d="M19 6l-1 14H6L5 6"></path>
                <path d="M10 11v5M14 11v5"></path>
            </svg>
        `;
        deleteButton.addEventListener("click", () => deleteTask(task.id));

        actions.appendChild(deleteButton);
        item.append(checkbox, text, actions);
        taskList.appendChild(item);
    });

    const pendingTasks = tasks.filter((task) => !task.completed).length;
    const completedTasks = tasks.length - pendingTasks;
    pendingCount.textContent = pendingTasks;
    taskSummary.textContent = `${tasks.length} ${tasks.length === 1 ? "task" : "tasks"} · ${completedTasks} completed`;
    emptyState.hidden = tasks.length > 0;
}

function addTask(event) {
    event.preventDefault();

    const text = taskInput.value.trim();
    if (!text) {
        return;
    }

    tasks.unshift(createTask(text));
    saveTasks();
    renderTasks();
    taskForm.reset();
    taskInput.focus();
}

function toggleTask(id) {
    tasks = tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    const task = tasks.find((item) => item.id === id);
    if (!task) {
        return;
    }

    const confirmed = window.confirm(`Delete “${task.text}”? This cannot be undone.`);
    if (!confirmed) {
        return;
    }

    tasks = tasks.filter((item) => item.id !== id);
    saveTasks();
    renderTasks();
}

taskForm.addEventListener("submit", addTask);
renderTasks();
