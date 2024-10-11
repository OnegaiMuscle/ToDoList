import dom from "./domWrapper.js";
import localSW from "./localStorageWrapper.js";

const ul = dom.$('ul');
let ids = localSW.getItem('Ids') || [];

const taskHelper = {

  load() {
    ids.forEach( id => {
      const task = localSW.getItem(id);
      if (task.text) {
        ul.appendChild(this.display(task));
      };
    });
  },

  display(obj) {
    const template = dom.$('#todotask')
    const clone = template.content.cloneNode(true)
    const li = clone.querySelector('li')
    li.setAttribute('draggable', 'true');
    li.children[1].textContent = obj.text;
    li.dataset.id = obj.createdAt;
    li.dataset.action = 'drag';
    return clone;
  },

  add(e) {
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
      ids.push(taskId);
      localSW.setItem('Ids', ids);
      localSW.setItem(taskId, task);
      form.reset();
      ul.appendChild(this.display(task));
    };
  },

  delete(e) {
    const li = e.target.parentElement;
    const taskId = li.dataset.id;
    const id = ids.indexOf(taskId);
    ids.splice(id ,1);
    localSW.setItem('Ids', ids);
    localSW.removeItem(taskId);
    li.remove();
  },

  update(e) {
    if (e.target.dataset.action=='delete') {
      return this.delete(e)
    };
  },
};

export default taskHelper
