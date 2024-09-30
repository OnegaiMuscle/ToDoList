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
            let isDragging = false;
            let offsetY;

            function onPointerDown(e) {
                const draggableElement = e.target.closest('li');
                if (draggableElement) {
                    e.preventDefault();
                    isDragging = true;
                    draggedElement = draggableElement;
                    offsetY = e.clientY - draggedElement.getBoundingClientRect().top;
                    draggedElement.setPointerCapture(e.pointerId);
                    draggedElement.classList.add('dragging');

                    // Positionnement initial
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
                draggedElement.releasePointerCapture(e.pointerId);
                draggedElement = null;
            }

            function updateDraggedElementPosition(clientY) {
                const containerRect = zone.getBoundingClientRect();
                const draggedRect = draggedElement.getBoundingClientRect();
                const draggedTop = clientY - offsetY;

                draggedElement.style.position = 'absolute';
                draggedElement.style.top = `${draggedTop - containerRect.top}px`;
                draggedElement.style.left = `${containerRect.left - draggedRect.left}px`;
                draggedElement.style.width = `${draggedRect.width}px`;

                const afterElement = getDragAfterElement(zone, clientY);
                if (afterElement == null) {
                    zone.appendChild(draggedElement);
                } else {
                    zone.insertBefore(draggedElement, afterElement);
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

            zone.addEventListener('pointerdown', onPointerDown);
            document.addEventListener('pointermove', onPointerMove);
            document.addEventListener('pointerup', onPointerUp);
            document.addEventListener('pointercancel', onPointerUp);

}
export default dragDrop
