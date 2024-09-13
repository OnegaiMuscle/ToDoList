import domHelper from "./domHelper.js";
import localSW from "./localStorageWrapper.js";

//if ('serviceWorker' in navigator) {
//  navigator.serviceWorker.register('./serviceworker.js');
//};



const ul = domHelper.$('ul');
let Ids = localSW.getItem('Ids') || [];

(function loadSavedTasks() {
  Ids.forEach( x => {
    const task = localSW.getItem(x);
    if (task.text) {
      ul.appendChild(displayTask(task));
    };
  });
})();


function displayTask(obj) {
  const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" name="checkTask">
      <p></p>
      <span class="delete">&#x274E</span>`;
    li.children[1].textContent = obj.text;
    li.dataset.Id = obj.createdAt
    return li
}



const addTask = (e) => {
  e.preventDefault();
  const form = e.target;
  const taskText = form.newTask.value.trim();
  if (taskText) {
    const task = {
      text: taskText,
      done: false,
      createdAt: new Date().getTime(),
    };
    const taskId = task.createdAt;
    Ids.push(taskId);
    localSW.setItem('Ids', Ids);
    localSW.setItem(taskId, task);
    form.reset();
    ul.appendChild(displayTask(task));
  };
};

const updateTask = (e) => {
 if (e.target.classList.contains('delete')) {
  deleteTask(e)
 }
}

const deleteTask = (e) => {
  const li = e.target.parentElement;
  const taskId = parseInt(li.dataset.Id)
  Ids.splice(Ids.indexOf(taskId),1)
  localSW.setItem('Ids', Ids);
  localSW.removeItem(li.dataset.Id);
  li.remove();
};



domHelper.on$('#taskForm', 'submit', addTask);
domHelper.on$('#taskList', 'click', updateTask);

//Create (Set item)
//localStorage.setItem('key',JSON.stringify({name: 'Task 1', done:false}));

//Read (Get item)
//let task = JSON.parse(localStorage.getItem('key'));
//console.log(task)

//Update (Set item)
//let updatedTask = {name: 'Task 1', done; true};
//localStorage.setItem('key', JSON.stringify(updatedTask))

//Delete (Remove item)
//localStorage.removeItem('key')

//function generateId() {
//return Date.now().toString(36) + Math.random().toString(36).substr(2);
//}

//mutation observer

//window.onstorage = () => {
//  console.log("localstorage modifié");
//};

//function generateTaskId() {
//  return 'task_' + new Date().getTime()
//}
