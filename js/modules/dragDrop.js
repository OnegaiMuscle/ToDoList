import dom from "./domHelper.js";

/*function dragDrop(zoneId) {
  const zone = dom.$(zoneId);
  let draggedElement = null;
  let isDragging = false;
  let startY;
  let startTop;
  let longPressTimer;
  const LONG_PRESS_DURATION =1000;

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
};*/

function dragDrop(zoneId) {
  const zone = dom.$(zoneId);
  let draggedElement = null;
  let placeholder = null
  let isDragging = false;
  let startY, startTop;

  function onPointerDown(e) {
    //if (e.target.classList.contains('delete-btn')) return;

    const draggableElement = e.target.closest('li');
    if (draggableElement) {
        e.preventDefault();
        isDragging = true;
        draggedElement = draggableElement;
        const rect = draggedElement.getBoundingClientRect();
        const listRect = zone.getBoundingClientRect();
        startY = e.clientY - rect.top;
        startTop = rect.top - listRect.top;
        draggedElement.style.width = (rect.width - 2) + 'px';
        draggedElement.style.height = rect.height + 'px';

        placeholder = draggedElement.cloneNode(true);
        placeholder.classList.add('placeholder');
        //placeholder.style.visibility = 'hidden';
        draggedElement.parentNode.insertBefore(placeholder, draggedElement.nextSibling);

        draggedElement.classList.add('dragging');
        document.body.appendChild(draggedElement)
        updateDraggedElementPosition(e.clientY);
    }
}

function onPointerMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    updateDraggedElementPosition(e.clientY);
}

function onPointerUp(e) {
    if (!isDragging) return;
    isDragging = false;
    draggedElement.classList.remove('dragging');
    draggedElement.style.position = '';
    draggedElement.style.top = '';
    draggedElement.style.left = '';
    draggedElement.style.width = '';
    draggedElement.style.height = '';

    placeholder.parentNode.replaceChild(draggedElement, placeholder);
    placeholder = null;
    draggedElement = null;
}

function updateDraggedElementPosition(clientY) {
    const listRect = zone.getBoundingClientRect();
    let top = clientY - listRect.top - startY;
    top = Math.max(0, Math.min(top, listRect.height - draggedElement.offsetHeight));

    draggedElement.style.position = 'absolute';
    draggedElement.style.top = `${clientY - startY}px`;
    draggedElement.style.left = `${listRect.left +10}px`;
    const middleY = clientY - listRect.top;
    const afterElement = getDragAfterElement(zone, middleY);
    if (afterElement == null) {
        zone.appendChild(placeholder);
    } else {
        zone.insertBefore(placeholder, afterElement);
    }
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('li:not(.dragging):not(.placeholder)')];

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
  zone.addEventListener('pointerdown', onPointerDown);
  document.addEventListener('pointermove', onPointerMove);
  document.addEventListener('pointerup', onPointerUp);
  document.addEventListener('pointercancel', onPointerUp);

}
export default dragDrop
