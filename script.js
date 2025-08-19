let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let isDark = false;


function addTask() {
  const taskInput = document.getElementById("taskInput");
  const category = document.getElementById("category").value;

  if (taskInput.value.trim() === "") return;

  tasks.push({
    text: taskInput.value,
    category: category,
    completed: false
  });

  taskInput.value = "";
  saveTasks();
  renderTasks();
}

function renderTasks(filter = "all") {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  let filteredTasks = tasks;

  if (filter === "completed") {
    filteredTasks = tasks.filter(t => t.completed);
  } else if (filter === "pending") {
    filteredTasks = tasks.filter(t => !t.completed);
  }

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <span>[${task.category}] ${task.text}</span>
      <div class="task-actions">
        <button onclick="toggleComplete(${index})">✔</button>
        <button class="edit" onclick="editTask(${index})">✏️</button>
        <button class="delete" onclick="deleteTask(${index})">🗑</button>
      </div>
    `;
    list.appendChild(li);
  });

  updateProgress();
}


function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}


function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText) {
    tasks[index].text = newText;
    saveTasks();
    renderTasks();
  }
}


function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}


function searchTasks() {
  const query = document.getElementById("search").value.toLowerCase();
  const filtered = tasks.filter(t => t.text.toLowerCase().includes(query));
  renderCustom(filtered);
}

function renderCustom(filteredTasks) {
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span>[${task.category}] ${task.text}</span>
      <div class="task-actions">
        <button onclick="toggleComplete(${index})">✔</button>
        <button class="edit" onclick="editTask(${index})">✏️</button>
        <button class="delete" onclick="deleteTask(${index})">🗑</button>
      </div>
    `;
    list.appendChild(li);
  });
}


function filterTasks() {
  const filter = document.getElementById("filter").value;
  renderTasks(filter);
}


function updateProgress() {
  const completed = tasks.filter(t => t.completed).length;
  const total = tasks.length;
  const percent = total === 0 ? 0 : (completed / total) * 100;

  document.getElementById("progressBar").style.width = percent + "%";
  document.getElementById("progressText").innerText = `${completed} / ${total} tasks completed`;
}


function toggleTheme() {
  document.body.classList.toggle("dark");
  isDark = !isDark;
}


function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

renderTasks();
