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

  