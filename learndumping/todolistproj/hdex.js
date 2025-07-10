let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text !== "") {
    tasks.push({ text, completed: false });
    input.value = "";
    saveTasks();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
}

function displayTasks(filter = "all") {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    if (
      filter === "active" && task.completed ||
      filter === "completed" && !task.completed
    ) return;

    const li = document.createElement("li");
    li.innerHTML = `
  <span class="task-text ${task.completed ? "completed" : ""}">${task.text}</span>
  <span>
    <button onclick="toggleTask(${index})">✓</button>
    <button onclick="deleteTask(${index})">🗑</button>
  </span>
`;

    list.appendChild(li);
  });
}

function filterTasks(type) {
  displayTasks(type);
}

displayTasks();
