const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

function createElement(tagName = "div") {
    const listeners = {};
    const children = [];

    return {
        tagName,
        children,
        className: "",
        dataset: {},
        value: "",
        checked: false,
        textContent: "",
        innerHTML: "",
        hidden: false,
        setAttribute(name, value) {
            this[name] = value;
        },
        addEventListener(type, handler) {
            listeners[type] = handler;
        },
        reset() {
            this.value = "";
        },
        append(...items) {
            children.push(...items);
        },
        appendChild(item) {
            children.push(item);
            return item;
        },
        replaceChildren(...items) {
            children.length = 0;
            children.push(...items);
        },
        focus() {},
        dispatch(type) {
            listeners[type]?.();
        },
        getListener(type) {
            return listeners[type];
        }
    };
}

function createFixture() {
    const elements = new Map();
    const getElement = (id) => {
        if (!elements.has(id)) {
            elements.set(id, createElement());
        }
        return elements.get(id);
    };

    const taskList = getElement("task-list");
    const taskForm = getElement("task-form");
    const taskInput = getElement("task-input");
    const pendingCount = getElement("pending-count");
    const taskSummary = getElement("task-summary");
    const emptyState = getElement("empty-state");

    const document = {
        querySelector(selector) {
            const id = selector.replace(/^#/, "");
            return getElement(id);
        },
        createElement
    };

    const storage = new Map();
    const localStorage = {
        getItem(key) {
            return storage.has(key) ? storage.get(key) : null;
        },
        setItem(key, value) {
            storage.set(key, value);
        }
    };

    let confirmResult = true;
    const context = {
        console,
        document,
        localStorage,
        window: {
            confirm() {
                return confirmResult;
            }
        },
        crypto: { randomUUID: () => "task-1" },
        setTimeout,
        clearTimeout
    };

    vm.createContext(context);
    const source = fs.readFileSync(
        path.join(__dirname, "..", "app.js"),
        "utf8"
    );
    vm.runInContext(source, context);

    return {
        taskInput,
        taskForm,
        taskList,
        pendingCount,
        taskSummary,
        emptyState,
        setConfirmResult(value) {
            confirmResult = value;
        }
    };
}

test("checkboxing a task updates its visual state and summary", () => {
    const fixture = createFixture();

    fixture.taskInput.value = "Review lecture notes";
    fixture.taskForm.getListener("submit")({ preventDefault() {} });

    let taskItem = fixture.taskList.children[0];
    let checkbox = taskItem.children[0];

    checkbox.checked = true;
    checkbox.getListener("change")();

    taskItem = fixture.taskList.children[0];
    checkbox = taskItem.children[0];
    assert.equal(taskItem.className, "task-item completed");
    assert.equal(checkbox.checked, true);
    assert.equal(fixture.pendingCount.textContent, 0);
    assert.equal(fixture.taskSummary.textContent, "1 task · 1 completed");

    checkbox.checked = false;
    checkbox.getListener("change")();

    taskItem = fixture.taskList.children[0];
    checkbox = taskItem.children[0];
    assert.equal(taskItem.className, "task-item");
    assert.equal(checkbox.checked, false);
    assert.equal(fixture.pendingCount.textContent, 1);
    assert.equal(fixture.taskSummary.textContent, "1 task · 0 completed");
});

test("canceling deletion leaves the task and counters unchanged", () => {
    const fixture = createFixture();
    fixture.taskInput.value = "Prepare presentation";
    fixture.taskForm.getListener("submit")({ preventDefault() {} });
    fixture.setConfirmResult(false);

    const taskItem = fixture.taskList.children[0];
    taskItem.children[2].children[0].getListener("click")();

    assert.equal(fixture.taskList.children.length, 1);
    assert.equal(fixture.pendingCount.textContent, 1);
    assert.equal(fixture.taskSummary.textContent, "1 task · 0 completed");
});

test("confirming deletion removes the task and updates the pending counter", () => {
    const fixture = createFixture();
    fixture.taskInput.value = "Prepare presentation";
    fixture.taskForm.getListener("submit")({ preventDefault() {} });
    fixture.setConfirmResult(true);

    const taskItem = fixture.taskList.children[0];
    taskItem.children[2].children[0].getListener("click")();

    assert.equal(fixture.taskList.children.length, 0);
    assert.equal(fixture.pendingCount.textContent, 0);
    assert.equal(fixture.taskSummary.textContent, "0 tasks · 0 completed");
});
