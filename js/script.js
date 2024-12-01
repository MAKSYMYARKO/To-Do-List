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
        const taskItem = document.createElement('li');

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        taskSpan.addEventListener('click', function () {
            taskSpan.parentNode.classList.toggle('completed');
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function () {
            taskList.removeChild(taskItem);
        });

        taskItem.appendChild(taskSpan);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);

        taskInput.value = '';
    } else {
        console.log('No task input provided');
    }
}
