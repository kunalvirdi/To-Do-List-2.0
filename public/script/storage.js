class Storage {

	//Add all the active tasks to storage
	storeActive(item) {
		let tasks;

		if (localStorage.getItem('tasks') === null) {
			tasks = [];
		} else {
			tasks = JSON.parse(localStorage.getItem('tasks'));
		}
		let obj = {
			state: "active",
			task: item
		}

		tasks.push(obj);
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	//Remove task from storage
	removeTask(item) {
		let tasks;

		if (localStorage.getItem("tasks") === null) {
			tasks = [];
		} else {
			tasks = JSON.parse(localStorage.getItem("tasks"));
		}

		tasks.forEach((t, i) => {
			if (item.parentElement.children[0].textContent === t.task) {
				tasks.splice(i, 1);
			}
		});

		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	//Add task whose status get completed
	updateActive(item) {
		let tasks;

		if (localStorage.getItem("tasks") === null) {
			tasks = [];
		} else {
			tasks = JSON.parse(localStorage.getItem("tasks"));
		}

		tasks.forEach(t => {
			if (item.parentElement.children[1].children[0].textContent === t.task) {
				t.state = 'completed'
			}
		})
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}


	//Update the tasks who got active
	updateComplete(item) {
		item.parentElement.parentElement.parentElement.classList.remove('completed-task');

		let tasks;

		if (localStorage.getItem("tasks") === null) {
			tasks = [];
		} else {
			tasks = JSON.parse(localStorage.getItem("tasks"));
		}

		tasks.forEach((t) => {
			if (
				item.parentElement.parentElement.parentElement.children[1]
				.children[0].textContent === t.task
			) {
				t.state = "active";
			}
		});
		localStorage.setItem("tasks", JSON.stringify(tasks));

	}

	getTasks() {
		let tasks;
		if (localStorage.getItem('tasks') === null) {
			tasks = [];
		} else {
			tasks = JSON.parse(localStorage.getItem('tasks'));
			let completedTasks = [];
			let activeTasks = [];
			tasks.forEach(task => {
				if (task.state === 'completed') {
					// push the completed tasks into different array
					completedTasks.push(task);
				}
				if (task.state === 'active') {
					activeTasks.push(task);
				}
			});
			return {
				tasks,
				activeTasks,
				completedTasks
			}
		}
	}
	removeCompletedTask(task) {

		let tasks;

		if (localStorage.getItem("tasks") === null) {
			tasks = [];
		} else {
			tasks = JSON.parse(localStorage.getItem("tasks"));
		}

		tasks.forEach((t,i) => {
			if (t.task === task.task) {
				tasks.splice(i,1);
			}
		});
		localStorage.setItem("tasks", JSON.stringify(tasks));
	}

}