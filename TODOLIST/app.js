let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const list = document.getElementById('todo-list');
  tasks.forEach(task => {
    const listItem = document.createElement('li');
    listItem.className = task.done ? 'done' : '';
    listItem.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button class="done-btn" onclick="markDone(this)">Done</button>
        <button onclick="removeTask(this)">Remove</button>
      </div>
    `;
    list.appendChild(listItem);
  });
}

function addTask(event) {
  event.preventDefault();

  const input = document.getElementById('todo-input');
  const taskText = input.value.trim();

  if (taskText === '') return;

  const list = document.getElementById('todo-list');

  
  const listItem = document.createElement('li');
  listItem.innerHTML = `
    <span>${taskText}</span>
    <div>
      <button class="done-btn" onclick="markDone(this)">Done</button>
      <button onclick="removeTask(this)">Remove</button>
    </div>
  `;

  list.appendChild(listItem);
  tasks.push({ text: taskText, done: false });
  saveTasksToLocalStorage();
  input.value = ''; 
}

function markDone(buttonElement) {
  const listItem = buttonElement.parentElement.parentElement;
  const taskIndex = Array.from(listItem.parentNode.children).indexOf(listItem);
  listItem.classList.toggle('done');
  tasks[taskIndex].done = listItem.classList.contains('done');
  saveTasksToLocalStorage();
}

function removeTask(buttonElement) {
  const listItem = buttonElement.parentElement.parentElement;
  const taskIndex = Array.from(listItem.parentNode.children).indexOf(listItem);
  tasks.splice(taskIndex, 1);
  listItem.remove();
  saveTasksToLocalStorage();
}

document.addEventListener('DOMContentLoaded', loadTasks);



function updateDateTime() {
    const currentDate = new Date();

    
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const formattedTime = currentDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });

    document.getElementById('today-date').textContent = formattedDate;
    document.getElementById('current-time').textContent = formattedTime;
}

updateDateTime();

setInterval(updateDateTime, 1000);