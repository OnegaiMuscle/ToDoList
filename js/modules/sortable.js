import dom from "./domHelper.js";

function sortable(containerId) {
  const ul = dom.$(containerId);
  let draggedItem = null;
  let isDragging = false;

  dom.on(ul, 'pointerdown', handlePointerDown);
  dom.on(document, 'pointermove', handlePointerMove);
  dom.on(document, 'pointerup', handlePointerUp);
  dom.on(document, 'pointercancel', handlePointerUp);

  function handlePointerDown(e) {
    draggedItem = e.target.closest('li');
    if (draggedItem) {
      isDragging = true;
      draggedItem.classList.add('dragging');
      e.preventDefault();
    };
  }

  function handlePointerMove(e) {
    if (isDragging) {
      const afterElement = getDragAfterElement(ul, e.clientY);
      if (afterElement == null) {
        ul.appendChild(draggedItem);
      } else {
        ul.insertBefore(draggedItem, afterElement);
      }
      //animateItems();
      e.preventDefault();
    }
  }

  function handlePointerUp(e) {
    if (isDragging) {
      isDragging = false;
      if (draggedItem) {
        draggedItem.classList.remove('dragging');
      }
    draggedItem = null;
    //resetItemPositions();
    e.preventDefault();
    }
  }

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
  }

  function animateItems() {
    const items = ul.querySelectorAll('li:not(.dragging)');
    items.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const listRect = ul.getBoundingClientRect();
      const targetY = listRect.top + (index)*(rect.height) - rect.top;
      item.style.transform = `translateY(${targetY}px)`;
      item.classList.add('moving');
    });
  }

  function resetItemPositions() {
    const items = ul.querySelectorAll('li');
    items.forEach(item => {
      item.style.transform = '';
      item.classList.remove('moving');
    });
  }
}

export default sortable
