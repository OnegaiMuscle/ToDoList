import dom from "./domWrapper.js";
import localSW from "./localStorageWrapper.js";

export default function taskSorter(containerId) {
  const ul = dom.$(containerId);
  let draggedItem = null;
  let isDragging = false;

  dom.on(ul, 'pointerdown', handlePointerDown);
  dom.on(document, 'pointermove', handlePointerMove);
  dom.on(document, 'pointerup', handlePointerUp);
  dom.on(document, 'pointercancel', handlePointerUp);

  function handlePointerDown(e) {
    if (e.target.dataset.action) return;
    draggedItem = e.target.closest('li');
    if (draggedItem) {
      isDragging = true;
      draggedItem.classList.add('dragging');
      e.preventDefault();
    };
  };

  function handlePointerMove(e) {
    if (isDragging) {
      e.preventDefault();
      const afterElement = getDragAfterElement(ul, e.clientY);
      if (afterElement == null) {
        ul.appendChild(draggedItem);
      } else {
        ul.insertBefore(draggedItem, afterElement);
      };
    };
  };

  function handlePointerUp(e) {
    if (isDragging) {
      e.preventDefault();
      isDragging = false;
      if (draggedItem) {
        draggedItem.classList.remove('dragging');
      }
      const lis = ul.querySelectorAll('li');
      let ids = Array.from(lis).map(li => li.dataset.id);
      localSW.setItem('Ids', ids)
      draggedItem = null;
    };
  };

  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  };
};
