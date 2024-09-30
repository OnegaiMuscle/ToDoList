import dom from "./domHelper.js";
import localSW from "./localStorageWrapper.js";

const ul = dom.$('ul');
let ids = localSW.getItem('Ids') || [];

const taskHelper = {

  load() {
    ids.forEach( x => {
      const task = localSW.getItem(x);
      if (task.text) {
        ul.appendChild(this.display(task));
      };
    });
  },

  display(obj) {
    const li = document.createElement('li');
    //li.setAttribute('draggable', 'true');//
      li.innerHTML = `
        <input type="checkbox" name="checkTask">
        <p></p>
        <span class="drag-handle">&#9776</span>
        <span class="delete" data-action="delete">&#x274E</span>`;
      li.children[1].textContent = obj.text;
      li.dataset.id = obj.createdAt;
      li.dataset.action = 'drag';
      return li;
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
      const taskId = task.createdAt;
      ids.push(taskId);
      localSW.setItem('Ids', ids);
      localSW.setItem(taskId, task);
      form.reset();
      ul.appendChild(this.display(task));
    };
  },

  delete(e) {
    const li = e.target.parentElement;
    const taskId = Number(li.dataset.id);
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
