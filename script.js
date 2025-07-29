document.addEventListener("DOMContentLoaded", () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))

    if(storedTasks){
        storedTasks.forEach((task)=> tasks.push(task))
        updateTasksList();
        updateStats();
    }
})

let tasks = [];

const saveTasks = () => {
     localStorage.setItem('tasks', JSON.stringify(tasks))
};
const addTask = ()=> {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text,completed: false });
        taskInput.value = "";
        updateTasksList();
        updateStats();
        saveTasks();
        blaskConfetti();
    }
};

const toggleTastComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList (); 
    updateStats();
    saveTasks();
    blaskConfetti();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList ();
    updateStats();
    saveTasks();
    blaskConfetti();
};

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput")
    taskInput.value = tasks[index].text

    tasks.splice(index,1)
    updateTasksList();
    updateStats();
    saveTasks();
    blaskConfetti();
};

const updateStats = () => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length; 
    const progress = (completedTasks / totalTasks) * 100;
    const progressbar = document.getElementById("progress");

    progressbar.style.width = `${progress}%`;

    document.getElementById("numbers").innerText = `${completedTasks} / ${totalTasks}`;

    if(tasks .length && completedTasks === totalTasks){
        blaskConfetti();
    }
};
const updateTasksList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML =  `
         <div class="taskItem">
            <div class="task ${task.completed ? 'completed':''}">
             <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
             <p>${task.text}</p>
            </div>
            <div class="icons">
             <img src="./img/edit.webp" onClick="editTask(${index})" />
             <img src="./img/bin.webp" onClick="deleteTask(${index})" />
            </div>
         </div>
        `;
        listItem.addEventListener("change", () => toggleTastComplete(index));
        taskList.append(listItem);
    });
};

document.getElementById("newtask").addEventListener("click", function (e) {
e.preventDefault();

addTask();
});

const blaskConfetti = () => {
    const defaults = {
  spread: 360,
  ticks: 50,
  gravity: 0,
  decay: 0.94,
  startVelocity: 30,
  shapes: ["star"],
  colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
};

function shoot() {
  confetti({
    ...defaults,
    particleCount: 40,
    scalar: 1.2,
    shapes: ["star"],
  });

  confetti({
    ...defaults,
    particleCount: 10,
    scalar: 0.75,
    shapes: ["circle"],
  });
}

setTimeout(shoot, 0);
setTimeout(shoot, 100);
setTimeout(shoot, 200);
}