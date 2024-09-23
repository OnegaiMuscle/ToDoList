import dom from "./domHelper.js";

function dragDrop(zoneId) {
  const zone = dom.$(zoneId);
  let draggedElement = null;
  let isDragging = false;
  let startY;
  let startTop;
  let longPressTimer;
  const LONG_PRESS_DURATION =300;

  zone.addEventListener('pointerdown', (e) => {
    const li = e.target.closest('li');
    console.log(li)
    if (li) {
        console.log('drag true');
        draggedElement = li;
        startY = e.clientY;

        startTop = li.offsetTop;
        longPressTimer = setTimeout(() => {
          isDragging= true;
          draggedElement = li;;
          draggedElement.setPointerCapture(e.pointerId);
          draggedElement.classList.add('dragging');
        }, LONG_PRESS_DURATION);
    }
  });

  document.addEventListener('pointermove', (e) => {

    if (longPressTimer) {
      const moveY = Math.abs(e.clientY - startY);
      if (moveY > 5) {
        clearTimeout(longPressTimer);
        longPressTimer = null


      }
    };

    if (!isDragging) return;

    const deltaY = e.clientY - startY;
    draggedElement.style.top = `${startTop + deltaY}px`;

    const afterElement = getDragAfterElement(zone, e.clientY);
    if (afterElement == null) {
        zone.appendChild(draggedElement);
    } else {
        zone.insertBefore(draggedElement, afterElement);
    }
  });

  document.addEventListener('pointerup', (e) => {
    if (longPressTimer) {
      const moveY = Math.abs(e.clientY - startY);
      if (moveY > 5) {
        clearTimeout(longPressTimer);
        longPressTimer = null
      }
    };

    if (!isDragging) return;
    isDragging = false;
    draggedElement.classList.remove('dragging');
    draggedElement.style.top = '';
    draggedElement.releasePointerCapture(e.pointerId);
    draggedElement = null;

  })





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
};

export default dragDrop
