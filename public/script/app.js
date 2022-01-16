//To add Task in list of items...

const ui = new UI();
const storage = new Storage();
//Get elements from HTML
const form = document.querySelector('form');
const mode = document.querySelector('.mode');
const count = document.querySelector('.count');
const countTxt = document.querySelector('.count-left');
const taskItems = document.querySelector('.task-items');
const footerLinks = document.querySelectorAll('.footer');

footerLinks.forEach(footerLink => {
    footerLink.addEventListener('click', footerEvents);
})
count.innerHTML = 0;

//Add event listener to the form
form.addEventListener("submit", addTask);

//Change mode
mode.addEventListener('click', changeTheme);

// add different functionality totasks
taskItems.addEventListener('click', functionality);

window.addEventListener('DOMContentLoaded',getTask);



//Add a task to task-lists
function addTask(e) {
    
    const input = document.querySelector('input');
    if (input.value === '') {
        ui.showError();
    } else {
        ui.createTaskItem(input.value);
        storage.storeActive(input.value);
        input.value = "";
    }
    
    e.preventDefault();
}



function changeTheme(e) {

    const lightIconPath = `http://${e.path[7].location.host}/images/icon-moon.svg`;
    const lightBg = `http://${e.path[7].location.host}/images/bg-desktop-light.jpg`;

    const darkIconPath = `http://${e.path[7].location.host}/images/icon-sun.svg`;
    const darkBg=`http://${e.path[7].location.host}/images/bg-desktop-dark.jpg`

    if (mode.classList.contains('sun')) {
        ui.changeToLight(lightIconPath,lightBg);
    } else {
        ui.changeToDark(darkIconPath,darkBg);
    }
}


function functionality(e) {
    if (e.target.className === 'circle') {
        ui.taskDone(e.target);
        storage.updateActive(e.target);

    }
    if (e.target.className === 'check-img') {
        ui.taskUndone(e.target);
        storage.updateComplete(e.target);
    }
    if (e.target.className === 'cross') {
        storage.removeTask(e.target);

        ui.removeTask(e.target);
    }
}

// Update all the tasks on screen when get loaded from local storage
function getTask() {
    
    const data = storage.getTasks();
    const tasks = data.tasks;
    const completedTasks = data.completedTasks;
    // console.log(activeTasks);
    // console.log(completedTasks);
    
    tasks.forEach(task => {
        ui.createTaskItem(task.task);
    });

    count.innerHTML -= completedTasks.length;
    countTxt.innerHTML =
    count.innerHTML == 1 ? "Task left" : "Tasks left";
    completedTasks.forEach(completedTask => {
        ui.doneTasks(completedTask);

    });
}


function footerEvents(e) {
    const data = storage.getTasks();
    if (e.target.textContent === 'Active') {
        ui.getActiveTasks(e.target);

    }
    if (e.target.textContent === 'Completed') {
        ui.getCompletedTasks(e.target);
    }
    if (e.target.textContent === 'All') {
        ui.getAllTasks(e.target);
    }
    if (e.target.textContent === 'Clear Completed') {
        ui.clearCompleted();
        const completedTasks = data.completedTasks;

        completedTasks.forEach(task => {
            storage.removeCompletedTask(task);
        })
    }
    
    e.preventDefault();
}