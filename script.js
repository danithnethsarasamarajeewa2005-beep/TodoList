
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const errorMessage = document.getElementById("errorMessage");
const taskCounter = document.getElementById("taskCounter");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = [];
let currentFilter = "all";

function renderTasks() {
    taskList.innerHTML = "";

    const filteredTasks = tasks.filter(function(task) {
        if (currentFilter === "active") {
            return !task.completed;
        }

        if (currentFilter === "completed") {
            return task.completed;
        }

        return true;
    });

    filteredTasks.forEach(function(task) {
        const li = document.createElement("li");
        li.className = "list-group-item";

        const leftSide = document.createElement("div");
        leftSide.className = "d-flex align-items-center gap-2";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        const taskText = document.createElement("span");
        taskText.textContent = task.text;

        if (task.completed) {
            taskText.classList.add("completed-task");
        }

        checkbox.addEventListener("change", function() {
            task.completed = checkbox.checked;
            renderTasks();
        });

        leftSide.appendChild(checkbox);
        leftSide.appendChild(taskText);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "btn btn-danger btn-sm";

        deleteBtn.addEventListener("click", function() {
            tasks = tasks.filter(function(item) {
                return item.id !== task.id;
            });

            renderTasks();
        });

        li.appendChild(leftSide);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

    const remainingTasks = tasks.filter(function(task) {
        return !task.completed;
    }).length;

    taskCounter.textContent = remainingTasks + " tasks left";
}

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        errorMessage.textContent = "Please enter a task!";
        return;
    }

    tasks.push({
        id: Date.now(),
        text: taskText,
        completed: false
    });

    taskInput.value = "";
    errorMessage.textContent = "";

    renderTasks();
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        currentFilter = button.dataset.filter;
        renderTasks();
    });
});

clearCompletedBtn.addEventListener("click", function() {
    tasks = tasks.filter(function(task) {
        return !task.completed;
    });

    renderTasks();
});

renderTasks();
