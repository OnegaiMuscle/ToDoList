import sortHelper from './modules/sortHelper.js';
import taskHelper from './modules/taskHelper.js';

//if ('serviceWorker' in navigator) {
//  navigator.serviceWorker.register('./modules/sw.js');
//};

taskHelper('#todolist')
sortHelper('#todolist')

const todoList = document.getElementById('todolist');
const totalCountDisplay = document.getElementById('total-count');
const completedCountDisplay = document.getElementById('completed-count');
function updateTaskCount() {
  const totalCount = todoList.children.length;
  const completedCount = todoList.querySelectorAll('input[type="checkbox"]:checked').length;
  totalCountDisplay.textContent = `Tasks number : ${totalCount}`;
  completedCountDisplay.textContent = `Tasks done : ${completedCount}`;
  console.log("change")
}

const observer = new MutationObserver(updateTaskCount);
observer.observe(todoList, { childList: true, subtree: true,attributes: true,
  attributeFilter: ['class']  });
