import dom from "./domWrapper.js";

export default function taskCounter(containerId) {
  const ul = dom.$(containerId);
  const tasks = dom.$('#total-count');
  const taskDone = dom.$('#completed-count');

  const observer = new MutationObserver(updateTaskCount);
  observer.observe(ul, { childList: true, subtree: true,attributes: true,
    attributeFilter: ['class']  });

  function updateTaskCount() {
    const totalCount = ul.children.length;
    const completedCount = ul.querySelectorAll('input[type="checkbox"]:checked').length;
    tasks.textContent = `Tasks number : ${totalCount}`;
    taskDone.textContent = `Tasks done : ${completedCount}`;
    console.log("change")
  }
}
