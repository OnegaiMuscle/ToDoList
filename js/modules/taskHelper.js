import dom from "./domWrapper.js";
import localSW from "./localStorageWrapper.js";

const ul = dom.$('#todolist');
const template = dom.$('#todotask');
const tasks = dom.$('label[for="tab1"]');
const todo = dom.$('label[for="tab2"]')
const tasksDone = dom.$('label[for="tab3"]');

function display(obj) {
  const clone = template.content.cloneNode(true);
  const li = clone.querySelector('li');
  const checkbox = clone.querySelector('input');
  checkbox.checked = obj.done;
  li.children[1].textContent = obj.text;
  li.dataset.id = obj.createdAt;
  ul.appendChild(clone);
  updateTaskCount();
};

function loadTasks() {
  const ids = localSW.getItem('Ids') || [];
  ids.forEach( id => {
    const task = localSW.getItem(id);
    if (task) display(task);
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
    display(task);
  };
};

function handleClick(e) {
  e.preventDefault();
  const actionType = e.target.dataset.action;
  if (actionType) {
    const li = e.target.parentElement;
    const checkbox = e.target.children[0];
    const taskId = li.dataset.id;
    const taskActions = {
      check: () => {
        const task = localSW.getItem(taskId);
        checkbox.checked = !checkbox.checked;
        task.done = checkbox.checked;
        localSW.setItem(taskId, task);
      },

      delete: () => {
        li.remove();
        const lis = ul.querySelectorAll('li');
        let ids = Array.from(lis).map(li => li.dataset.id);
        ids.length ? localSW.setItem('Ids', ids) : localStorage.clear();
        localSW.removeItem(taskId);
      },
    };

    taskActions[actionType]();
    updateTaskCount()
  };
};

function updateTaskCount() {
  const totalCount = ul.children.length;
  const todoCount = ul.querySelectorAll('input:not(:checked)').length;
  const completedCount = ul.querySelectorAll('input:checked').length;
  tasks.textContent = `All: ${totalCount}`;
  tasksDone.textContent = `Done: ${completedCount}`;
  todo.textContent = `To-Do: ${todoCount}`;
};

function refreshTasks() {
  ul.innerHTML = '';
  loadTasks();
};

export { loadTasks, addTask, handleClick, refreshTasks }
