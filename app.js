const form = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = \`
      <span>\${task}</span>
      <div class="actions">
        <button onclick="editTask(\${index})">Editar</button>
        <button onclick="deleteTask(\${index})">Eliminar</button>
      </div>
    \`;
    taskList.appendChild(li);
  });
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const newTask = taskInput.value.trim();
  if (newTask) {
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    renderTasks();
  }
});

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

function editTask(index) {
  const newTask = prompt('Edita la tarea:', tasks[index]);
  if (newTask !== null) {
    tasks[index] = newTask.trim();
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
}

renderTasks();
