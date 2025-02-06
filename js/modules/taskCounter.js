import dom from "./domWrapper.js";

export default function taskCounter(containerId) {
  const ul = dom.$(containerId);
  const tasks = dom.$('label[for="tab1"]');
  const taskDone = dom.$('label[for="tab3"]');
  const todo = dom.$('label[for="tab2"]')

  const observer = new MutationObserver(updateTaskCount);
  observer.observe(ul, { childList: true, subtree: true, attributes: true,
    attributeFilter: ['class']  });

  function updateTaskCount() {
    const totalCount = ul.children.length;
    const completedCount = ul.querySelectorAll('input[type="checkbox"]:checked').length;
    const alltasks = ul.querySelectorAll('input[type="checkbox"]:not(:checked)').length;
    tasks.textContent = `All: ${totalCount}`;
    taskDone.textContent = `Done: ${completedCount}`;
    todo.textContent = `To-Do: ${alltasks}`
    console.log("xxx")
  };
};
