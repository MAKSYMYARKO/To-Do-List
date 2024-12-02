// Load saved tasks from cookies when the page loads
document.addEventListener('DOMContentLoaded', function () {
    loadTasksFromCookies();
});

// Add event listeners
document.getElementById('add-task-btn').addEventListener('click', function () {
    console.log('Add button clicked');
    addTask();
});

document.getElementById('task-input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        console.log('Enter key pressed');
        addTask();
    }
});

function addTask() {
    console.log('addTask function called');
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const taskList = document.getElementById('task-list');
        console.log('Task text:', taskText);
        const taskItem = createTaskElement(taskText);

        taskList.appendChild(taskItem);
        taskInput.value = '';

        saveTasksToCookies();
    } else {
        console.log('No task input provided');
    }
}

function createTaskElement(taskText) {
    const taskItem = document.createElement('li');

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    taskSpan.addEventListener('click', function () {
        taskSpan.parentNode.classList.toggle('completed');
        saveTasksToCookies();
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
        const taskList = document.getElementById('task-list');
        taskList.removeChild(taskItem);
        saveTasksToCookies();
    });

    taskItem.appendChild(taskSpan);
    taskItem.appendChild(deleteButton);

    return taskItem;
}

// Save tasks to cookies
function saveTasksToCookies() {
    const taskList = document.getElementById('task-list');
    const tasks = [];

    taskList.querySelectorAll('li').forEach(taskItem => {
        const text = taskItem.querySelector('span').textContent;
        const completed = taskItem.classList.contains('completed');
        tasks.push({ text, completed });
    });

    document.cookie = "tasks=" + encodeURIComponent(JSON.stringify(tasks)) + "; path=/";
    console.log('Tasks saved to cookies:', tasks);
}

// Load tasks from cookies
function loadTasksFromCookies() {
    const cookies = document.cookie.split('; ');
    const tasksCookie = cookies.find(cookie => cookie.startsWith('tasks='));

    if (tasksCookie) {
        const tasks = JSON.parse(decodeURIComponent(tasksCookie.split('=')[1]));
        console.log('Tasks loaded from cookies:', tasks);

        const taskList = document.getElementById('task-list');
        tasks.forEach(task => {
            const taskItem = createTaskElement(task.text);
            if (task.completed) {
                taskItem.classList.add('completed');
            }
            taskList.appendChild(taskItem);
        });
    }
}
