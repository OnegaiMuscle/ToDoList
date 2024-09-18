import dom from "./domHelper.js";
import localSW from "./localStorageWrapper.js";

//if ('serviceWorker' in navigator) {
//  navigator.serviceWorker.register('./serviceworker.js');
//};



const ul = dom.$('ul');

let ids = localSW.getItem('Ids') || [];
(function loadSavedTasks() {
  ids.forEach( x => {
    const task = localSW.getItem(x);
    if (task.text) {
      ul.appendChild(displayTask(task));
    };
  });
})();

function displayTask(obj) {
  const li = document.createElement('li');
  li.setAttribute('draggable', 'true');
    li.innerHTML = `
      <input type="checkbox" name="checkTask">
      <p></p>
      <span class="drag-handle">&#9776</span>
      <span class="delete" data-action="delete">&#x274E</span>`;
    li.children[1].textContent = obj.text;
    li.dataset.id = obj.createdAt
    li.dataset.action = 'drag'
    return li
}

function addTask(e) {
  e.preventDefault();
  const form = e.target;
  const taskText = form.newTask.value.trim();
  if (taskText) {
    const task = {
      text: taskText,
      done: false,
      createdAt: new Date().getTime(),
    };
    const taskId = task.createdAt;
    ids.push(taskId);
    localSW.setItem('Ids', ids);
    localSW.setItem(taskId, task);
    form.reset();
    ul.appendChild(displayTask(task));
  };
};

const updateTask = (e) => {
  console.log(e.target)
  if (e.target.dataset.action=='delete') {

    return deleteTask(e)
}}

const deleteTask = (e) => {
  const li = e.target.parentElement;
  const taskId = Number(li.dataset.id);
  const id = ids.indexOf(taskId);
  ids.splice(id ,1);
  localSW.setItem('Ids', ids);
  localSW.removeItem(taskId);
  li.remove();
};



dom.on$('#taskForm', 'submit', addTask);
dom.on$('#taskList', 'click', updateTask);


//data action
//drag drop


/* const dragandDrop = (event) => {

  let dragSrcEl = null;

  function handleDragStart(e) {
    this.style.opacity = '0.4';

    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';

    return false;
  }

  function handleDragEnter(e) {
    this.classList.add('over');
  }

  function handleDragLeave(e) {
    this.classList.remove('over');
  }

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }

    if (dragSrcEl != this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    }

    return false;
  }

  function handleDragEnd(e) {
    this.style.opacity = '1';

    items.forEach(function (item) {
      item.classList.remove('over');
    });
  }


  let items = document.querySelectorAll('li');
  items.forEach(function(item) {
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragleave', handleDragLeave, false);
    item.addEventListener('drop', handleDrop, false);
    item.addEventListener('dragend', handleDragEnd, false);
  });
}

const draggable = document.querySelectorAll('draggable');
const tooltip = document.getElementById('tooltip');

draggable.addEventListener('dragstart', (event) => {
  tooltip.style.display = 'block';
  tooltip.textContent = event.target.dataset.id;
});

draggable.addEventListener('drag', (event) => {
  if (event.clientX > 0 && event.clientY > 0) {
    tooltip.style.left = `${event.clientX + 10}px`;
    tooltip.style.top = `${event.clientY + 10}px`;
  }
});

draggable.addEventListener('dragend', () => {
  tooltip.style.display = 'none';
}); */








document.addEventListener('DOMContentLoaded', () => {
  const todoList = document.getElementById('taskList');
  let draggedElement = null;

  todoList.addEventListener('dragstart', (e) => {
      if (e.target.tagName === 'LI') {
          draggedElement = e.target;
          e.dataTransfer.setData('text/plain', e.target.dataset.id);
          setTimeout(() => e.target.classList.add('dragging'), 0);
      }
  });

  todoList.addEventListener('dragend', (e) => {
      if (e.target.tagName === 'LI') {
          e.target.classList.remove('dragging');
      }
  });

  todoList.addEventListener('dragover', (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(todoList, e.clientY);
      if (draggedElement) {
          if (afterElement == null) {
              todoList.appendChild(draggedElement);
          } else {
              todoList.insertBefore(draggedElement, afterElement);
          }
      }
  });

  todoList.addEventListener('drop', (e) => {
      e.preventDefault();
      const draggedId = e.dataTransfer.getData('text');
      const dropTarget = e.target.closest('li');
      if (dropTarget && draggedElement) {
          const dropId = dropTarget.dataset.id;
          console.log(`Élément glissé ID: ${draggedId}, Élément de dépôt ID: ${dropId}`);
      }
      draggedElement = null;
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

})
