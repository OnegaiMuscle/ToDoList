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
      <span class="drag-handle">&#9776</span>
      <span class="delete" data-action="delete">&#x274E</span>`;
    li.children[1].textContent = obj.text;
    li.dataset.id = obj.createdAt
    li.dataset.action = 'drag'
    return li
}

function addTask(e) {
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
  console.log(e.target)
  if (e.target.dataset.action=='delete') {

    return deleteTask(e)
}}

const deleteTask = (e) => {
  const li = e.target.parentElement;
  const taskId = Number(li.dataset.id);
  const id = ids.indexOf(taskId);
  ids.splice(id ,1);
  localSW.setItem('Ids', ids);
  localSW.removeItem(taskId);
  li.remove();
};



dom.on$('#taskForm', 'submit', addTask);
dom.on$('#todolist', 'click', updateTask);


import { initDragDrop } from './dragDrop.js';

document.addEventListener('DOMContentLoaded', () => {
    initDragDrop('todolist');
});
