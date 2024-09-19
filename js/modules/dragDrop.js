import dom from "./domHelper.js";

function dragDrop(zoneId) {
  const zone = dom.$(zoneId)
  let isDragging = false;

  dom.on(zone,'dragstart', e => {
      isDragging = true;
      e.target.classList.add('dragging');
      setTimeout(() => {
          e.target.classList.add('dragging-active');
      }, 0);
  });

  dom.on(zone,'dragover', e => {
      e.preventDefault();
      const afterElement = getDragAfterElement(zone, e.clientY);
      const draggable = dom.$('.dragging');
      if (afterElement == null) {
          zone.appendChild(draggable);
      } else {
          zone.insertBefore(draggable, afterElement);
      }
  });

  dom.on(zone,'dragend', e => {
      isDragging = false;
      e.target.classList.remove('dragging', 'dragging-active');
  });

  window.addEventListener('scroll', e => {
      if (isDragging) {
          e.preventDefault();
          window.scrollTo(window.scrollX, window.scrollY);
      };
  }, { passive: false });

  document.addEventListener('mousemove', e => {
      if (isDragging) {
          const boundary = 50; // Zone de 50 pixels près des bords
          if (e.clientY < boundary || e.clientY > window.innerHeight - boundary) {
              e.preventDefault();
          };
      };
  });

  function getDragAfterElement(zone, y) {
      const draggableElements = [...zone.querySelectorAll('li:not(.dragging)')];

      return draggableElements.reduce((closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = y - box.top - box.height / 2;
          if (offset < 0 && offset > closest.offset) {
              return { offset: offset, element: child };
          } else {
              return closest;
          };
      }, { offset: Number.NEGATIVE_INFINITY }).element;
  };
};

export default dragDrop
