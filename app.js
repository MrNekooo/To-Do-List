const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const deleteAll = document.getElementById('deleteAllBtn');


window.addEventListener('DOMContentLoaded', () => {
    const taskValues = JSON.parse(localStorage.getItem("taskValue")) || [];
    
    taskValues.forEach(task => {
        addTaskToDOM(task);
    });
});

addTaskBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const taskText = taskInput.value.trim();
    if (taskInput.value.trim() === ""){
        alert("Enter a Value")
        return;
    }

    const task = { text: taskText, done: false };

    addTaskToDOM(task);
    saveTask(task);

    taskInput.value = "";
});

function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.classList.add('task-item');
    li.textContent = task.text;

    if (task.done) {
        li.classList.add('done-task');
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener('click', () => {
        li.remove();
        removeTask(task.text);
    });

    const doneBtn = document.createElement('button');
    doneBtn.classList.add('add-btn');
    doneBtn.textContent = task.done ? "Undone" : "Done";
    doneBtn.addEventListener('click', () => {
        li.classList.toggle('done-task');

        if(li.classList.contains('done-task')){
            doneBtn.textContent = "Undone"
        } else {
            doneBtn.textContent = "Done"
        }

        const taskValues = JSON.parse(localStorage.getItem("taskValue")) || [];

        const updatedTasks = taskValues.map(item => {
            if (item.text === task.text) {
                return { ...item, done: !item.done };
            }
            return item;
        });

        localStorage.setItem('taskValue', JSON.stringify(updatedTasks));
    });

    li.appendChild(deleteBtn);
    li.appendChild(doneBtn);
    taskList.appendChild(li);
}

deleteAll.addEventListener('click', (e)=>{
    e.preventDefault();

    taskList.innerHTML = "";
    localStorage.removeItem('taskValue')
})

function saveTask(task) {
    const taskValues = JSON.parse(localStorage.getItem("taskValue")) || [];
    taskValues.push(task);
    localStorage.setItem("taskValue", JSON.stringify(taskValues));
}

function removeTask(taskText) {
    const taskValues = JSON.parse(localStorage.getItem("taskValue")) || [];
    const updatedTasks = taskValues.filter(task => task.text !== taskText);
    localStorage.setItem("taskValue", JSON.stringify(updatedTasks));
}
