document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const taskList = document.getElementById('taskList');
    const listItem = document.createElement('li');
    listItem.innerHTML = `${taskText} <button onclick="removeTask(this)">Remove</button> <button onclick="toggleComplete(this)">Complete</button>`;
    taskList.appendChild(listItem);

    taskInput.value = '';

    saveTasks();
}

function removeTask(button) {
    const listItem = button.parentElement;
    listItem.remove();
    saveTasks();
}

function toggleComplete(button) {
    const listItem = button.parentElement;
    listItem.classList.toggle('completed');
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(function(item) {
        tasks.push({ text: item.childNodes[0].textContent.trim(), completed: item.classList.contains('completed') });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');

    tasks.forEach(function(task) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${task.text} <button onclick="removeTask(this)">Remove</button> <button onclick="toggleComplete(this)">Complete</button>`;
        if (task.completed) {
            listItem.classList.add('completed');
        }
        taskList.appendChild(listItem);
    });
}
