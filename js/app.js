import sortHelper from './modules/sortHelper.js';
import taskHelper from './modules/taskHelper.js';

//if ('serviceWorker' in navigator) {
//  navigator.serviceWorker.register('./modules/sw.js');
//};

taskHelper('#todolist')
sortHelper('#todolist')

const todoList = document.getElementById('todolist');
const taskCountDisplay = document.getElementById('task-count');
function updateTaskCount() {
  const count = todoList.children.length;
  taskCountDisplay.textContent = `Tasks number : ${count}`;
  console.log("changement")
}

const observer = new MutationObserver(updateTaskCount);
observer.observe(todoList, { childList: true });
