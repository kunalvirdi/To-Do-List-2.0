class UI {
	constructor() {
		this.body = document.querySelector("body");
		this.bg = document.querySelector(".background img");
		this.input = document.querySelector(".input");
		this.input2 = document.querySelector("input");
		this.form = document.querySelector("form");
		this.footer = document.querySelector(".footer");
		this.footerR = document.querySelector(".footer-responsive");
		this.mode = document.querySelector(".mode");
		this.count = document.querySelector(".count");
		this.countTxt = document.querySelector(".count-left");
		this.taskItems = document.querySelector(".task-items");
		this.container = document.querySelector(".container");
		this.inputCont = document.querySelector(".input-cont");
		this.count.innerHTML = 0;
	}

	// It will create a task-item and append in task-items div
	createTaskItem(taskContent) {
		this.taskItems = document.querySelector(".task-items");
		this.taskItems.innerHTML += `<div class="task-item">
                <div class="circle">
                    <div class="check">
                        <img class="check-img" src="images/icon-check.svg" alt="">
                    </div>
                </div>
                <div class="task">
                    <p>${taskContent}</p>
                    <span class="cross">X</span>
                </div>
           </div>`;
		this.countPlus();
	}

	changeToLight(path, bg) {
		this.mode.src = path;
		this.bg.src = bg;
		this.footerR.classList.add("footer-responsive-light");
		this.footer.classList.add("footer-light");
		this.body.classList.add("bg-light");
		this.input.classList.add("input-light");
		this.input2.classList.add("input-light");
		this.form.classList.add("form-light");
		this.taskItems.classList.add("task-items-light");
		this.mode.classList.remove("sun");
	}

	changeToDark(path, bg) {
		this.mode.src = path;
		this.bg.src = bg;
		this.footerR.classList.remove("footer-responsive-light");
		this.footer.classList.remove("footer-light");
		this.body.classList.remove("bg-light");
		this.input.classList.remove("input-light");
		this.input2.classList.remove("input-light");
		this.form.classList.remove("form-light");
		this.taskItems.classList.remove("task-items-light");
		this.mode.classList.add("sun");
		this.taskItems.children[0].classList.remove("task-item-light");
	}

	// It will mark the task and show that the task is completed
	taskDone(element) {
		element.children[0].classList.add("check-blocked");
		element.style.backgroundImage =
			"linear-gradient(hsl(192, 100%, 67%),hsl(280, 87%, 65%))";
		element.parentElement.children[1].children[0].classList.add("cut");
        element.parentElement.classList.add("completed-task");
        this.countMinus();
	}

	taskUndone(element) {
		element.parentElement.classList.remove("check-blocked");
		element.parentElement.parentElement.style = "";
		element.parentElement.parentElement.parentElement.children[1].children[0].classList.remove(
			"cut"
		);
        element.parentElement.classList.remove("completed-task");
        this.countPlus();

	}

	//Show error when input is empty
	showError() {
		const div = document.createElement("div");
		div.className = "error";
		div.innerText = "Please enter some task to add!!";
		this.input.classList.add("input-border");
		this.inputCont.insertBefore(div, this.input);
		setTimeout(this.removeError, 3000);
	}

	removeError() {
		document.querySelector(".error").remove();
		document
			.querySelector(".input.input-border")
			.classList.remove("input-border");
	}

	removeTask(element) {
		if (confirm("Are you sure to delete this task?")) {
			element.parentElement.parentElement.remove();
			if (
				element.parentElement.parentElement.classList.contains("completed-task")
			) {
			} else {
				this.countMinus();
			}
		}
	}

	// maintain the count of tasks
	countPlus() {
		this.count.innerHTML++;
		this.countTxt.innerHTML = count.innerHTML == 1 ? "Task left" : "Tasks left";
	}

	countMinus() {
		this.count.innerHTML--;
		this.countTxt.innerHTML = count.innerHTML == 1 ? "Task left" : "Tasks left";
	}

	// It will mark the tasks tick if the are already completed at the time of loading from localStorage
	doneTasks(completedTask) {
		this.tasks = document.querySelectorAll(".task-item");

		this.tasks.forEach((task) => {
			if (task.children[1].children[0].textContent === completedTask.task) {
				task.classList.add("completed-task");
				task.children[0].children[0].classList.add("check-blocked");
				task.children[0].style.backgroundImage =
					"linear-gradient(hsl(192, 100%, 67%),hsl(280, 87%, 65%))";
				task.children[1].children[0].classList.add("cut");
			}
		});
	}

	getActiveTasks(element) {
		element.parentElement.classList.add("status-active");
		element.parentElement.classList.remove("status-completed");
		this.tasks = document.querySelectorAll(".task-item");

		this.tasks.forEach((task) => {
			if (task.classList.value === "task-item") {
				task.style.display = "flex";
			} else {
				task.style.display = "none";
			}
		});
	}

	getCompletedTasks(element) {
		element.parentElement.classList.remove("status-active");
	    element.parentElement.classList.add("status-completed");
	    this.tasks = document.querySelectorAll(".task-item");

		this.tasks.forEach((task) => {
			if (task.classList.contains('completed-task')) {
	                task.style.display = "flex";
			} else {
				task.style.display = "none";
					}
				});
	}
	getAllTasks(element) {
		element.parentElement.classList.remove("status-active");
	    element.parentElement.classList.remove("status-completed");
	    this.tasks = document.querySelectorAll(".task-item");

	    this.tasks.forEach(task => {
	        task.style.display = 'flex';
	    })
    }
    
    clearCompleted() {
        this.tasks = document.querySelectorAll('.task-item');
        if (confirm("Are you sure to clear the completed tasks?")) {
            this.tasks.forEach((task) => {
              if (task.classList.contains("completed-task")) {
                task.remove();
              }
            });
        }
        
    }
}
