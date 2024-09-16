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
  li.setAttribute('draggable', 'true');
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


const sortable = document.getElementById('taskList');
console.log(sortable)
let dragged;

sortable.addEventListener('dragstart', (event) => {
  dragged = event.target;

  event.target.style.opacity = 0.5;
});

sortable.addEventListener('dragend', (event) => {
  event.target.style.opacity = "";
});

sortable.addEventListener('dragover', (event) => {
  event.preventDefault();
});

sortable.addEventListener('dragenter', (event) => {
  if (event.target.tagName === 'LI') {
    event.target.style.border = '2px dashed #000';
  }
});

sortable.addEventListener('dragleave', (event) => {
  if (event.target.tagName === 'LI') {
    event.target.style.border = '';
  }
});

sortable.addEventListener('drop', (event) => {
  event.preventDefault();
  if (event.target.tagName === 'LI') {
    event.target.style.border = '';
    sortable.insertBefore(dragged, event.target.nextSibling);
  }
});
