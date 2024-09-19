export default function initDragDrop(containerId) {
  const container = document.getElementById(containerId);
  let isDragging = false;

  container.addEventListener('dragstart', e => {
      isDragging = true;
      e.target.classList.add('dragging');
      setTimeout(() => {
          e.target.classList.add('dragging-active');
      }, 0);
  });

  container.addEventListener('dragover', e => {
      e.preventDefault();
      const afterElement = getDragAfterElement(container, e.clientY);
      const draggable = document.querySelector('.dragging');
      if (afterElement == null) {
          container.appendChild(draggable);
      } else {
          container.insertBefore(draggable, afterElement);
      }
  });

  container.addEventListener('dragend', e => {
      isDragging = false;
      e.target.classList.remove('dragging', 'dragging-active');
  });



  window.addEventListener('scroll', e => {
      if (isDragging) {
          e.preventDefault();
          window.scrollTo(window.scrollX, window.scrollY);
      }
  }, { passive: false });

  document.addEventListener('mousemove', e => {
      if (isDragging) {
          const boundary = 50; // Zone de 50 pixels près des bords
          if (e.clientY < boundary || e.clientY > window.innerHeight - boundary) {
              e.preventDefault();
          }
      }
  });

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
}
