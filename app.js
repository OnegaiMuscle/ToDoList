import dom from "./domHelper.js";
import localSW from "./localStorageWrapper.js";

//if ('serviceWorker' in navigator) {
//  navigator.serviceWorker.register('./serviceworker.js');
//};



const ul = dom.$('ul');

let ids = localSW.getItem('Ids') || [];
(function loadSavedTasks() {
  ids.forEach( x => {
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
    };
    const taskId = new Date().getTime();
    ids.push(taskId);
    localSW.setItem('Ids', ids);
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
  const taskId = Number(li.dataset.Id);
  const id = ids.indexOf(taskId);
  ids.splice(id ,1);
  localSW.setItem('Ids', ids);
  localSW.removeItem(taskId);
  li.remove();
};



dom.on$('#taskForm', 'submit', addTask);
dom.on$('#taskList', 'click', updateTask);


//data action
//drag drop
