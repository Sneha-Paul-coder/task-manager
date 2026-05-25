const btn = document.getElementById("btn");
const taskInput = document.getElementById("task-name");
const taskListEl = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  render();
}

function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );

  localStorage.setItem("tasks", JSON.stringify(tasks));

  render();
}

function render() {
  taskListEl.innerHTML = "";

    if (tasks.length === 0) {
    taskListEl.innerHTML =
      '<li class="list-group-item py-3 text-center text-muted">No tasks added yet.</li>';

    return;
  }

  tasks.forEach((task) => {
    const li = document.createElement("li");

    li.className =
      "list-group-item d-flex";

    const checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxInput.className = "form-check-input me-1";
    checkboxInput.checked = task.completed;

    const label = document.createElement("label");
    label.textContent = task.text;
    label.className = "flex-grow-1 ms-2";

    if (task.completed) {
      label.style.textDecoration = "line-through";
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm";

    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => deleteTask(task.id));
    checkboxInput.addEventListener("change", () => toggleTask(task.id));

    li.appendChild(checkboxInput);
    li.appendChild(label);
    li.appendChild(deleteBtn);

    taskListEl.appendChild(li);
  });
}

function addTaskBtn() {
  const taskText = taskInput.value.trim();

  if (!taskText) return;

  tasks.push({
    id: Date.now(),
    text: taskText,
    completed: false,
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskInput.value = "";

  render();
}

btn.addEventListener("click", addTaskBtn);
render();
