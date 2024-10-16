import dom from "./domWrapper.js";
import localSW from "./localStorageWrapper.js";

export default function taskHelper(containerId) {
  const ul = dom.$(containerId);

  dom.on(document, 'DOMContentLoaded', loadTasks);
  dom.on$('#taskForm', 'submit', addTask);
  dom.on$('#todolist', 'click', runTask);

  function display(obj) {
    const template = dom.$('#todotask');
    const clone = template.content.cloneNode(true);
    const li = clone.querySelector('li');
    li.children[0].checked = obj.done;
    li.children[1].textContent = obj.text;
    li.dataset.id = obj.createdAt;
    return clone;
  };

  function loadTasks() {
    const ids = localSW.getItem('Ids') || [];
    ids.forEach( id => {
      const task = localSW.getItem(id);
      if (task.text) {
        ul.appendChild(display(task));
      };
    });
  };

  function addTask(e) {
    e.preventDefault();
    const form = e.target;
    const taskText = form.newTask.value.trim();
    if (taskText) {
      const task = {
        done: false,
        text: taskText,
        createdAt: new Date().getTime(),
      };
      const taskId = task.createdAt + '';
      let ids = localSW.getItem('Ids') || [];
      ids.push(taskId);
      localSW.setItem('Ids', ids);
      localSW.setItem(taskId, task);
      form.reset();
      ul.appendChild(display(task));
    };
  };

  function runTask(e) {
    const userAction = e.target.dataset.action;
    if (userAction) {
      const li = e.target.parentElement;
      const taskId = li.dataset.id;
      const tasks = {
        check: () => {
          const task = localSW.getItem(taskId);
          task.done = e.target.checked;
          localSW.setItem(taskId, task);
          e.target.classList.toggle("done")
        },

        delete: () => {
          let ids = localSW.getItem('Ids');
          const id = ids.indexOf(taskId);
          ids.splice(id ,1);
          localSW.setItem('Ids', ids);
          localSW.removeItem(taskId);
          li.remove();
        },

        update: () => {console.log(2)},
      };

      tasks[userAction]();
    };
  };
};
