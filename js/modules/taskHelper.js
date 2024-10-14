import dom from "./domWrapper.js";
import localSW from "./localStorageWrapper.js";

export default function taskHelper(containerId) {
  const ul = dom.$(containerId);
  let ids = localSW.getItem('Ids') || [];

  dom.on(document, 'DOMContentLoaded', loadTasks);
  dom.on$('#taskForm', 'submit', addTask);
  dom.on$('#todolist', 'click', update);

  function loadTasksIds() {
    return localSW.getItem('Ids') || [];
  }

  function loadTasks() {
    const ids = loadTasksIds();
    ids.forEach( id => {
      const task = localSW.getItem(id);
      if (task.text) {
        ul.appendChild(display(task));
      };
    });
  };

  function display(obj) {
    const template = dom.$('#todotask')
    const clone = template.content.cloneNode(true)
    const li = clone.querySelector('li')
    li.children[1].textContent = obj.text;
    li.dataset.id = obj.createdAt;
    return clone;
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
      const taskId = task.createdAt.toString();
      let ids = loadTasksIds();
      ids.push(taskId);
      localSW.setItem('Ids', ids);
      localSW.setItem(taskId, task);
      form.reset();
      ul.appendChild(display(task));
    };
  }

  function deleteTask(e) {
    const li = e.target.parentElement;
    const taskId = li.dataset.id;
    let ids = loadTasksIds();
    const id = ids.indexOf(taskId);
    ids.splice(id ,1);
    localSW.setItem('Ids', ids);
    localSW.removeItem(taskId);
    li.remove();
  }

  function update(e) {
    if (e.target.dataset.action=='delete') {
      console.log(e.target.dataset.action)
      deleteTask(e)
    };
  }
};
