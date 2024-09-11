if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./cache.js');
};


function addTask(e) {
  e.preventDefault();
  const form = e.target;
  const taskText = form.newTask.value.trim();
  const ul = form.nextElementSibling;
  form.reset();
  if (taskText) {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" name="checkTask">
      <p></p>
      <span class="delete" onclick="deleteTask(this)">&#x274E</span>`;
    li.children[1].textContent = taskText;
    ul.appendChild(li);
  };
};

function deleteTask(e) {
  e.parentElement.remove();
};

//Create (Set item)
//localStorage.setItem('key',JSON.stringify({name: 'Task 1', done:false}));

//Read (Get item)
//let task = JSON.parse(localStorage.getItem('key'));
//console.log(task)

//Update (Set item)
//let updatedTask = {name: 'Task 1', done; true};
//localStorage.setItem('key', JSON.stringify(updatedTask))

//Delete (Remove item)
//localStorage.removeItem('key')

//function generateId() {
//return Date.now().toString(36) + Math.random().toString(36).substr(2);
//}

//mutation observer

window.onstorage = () => {
  console.log("localstorage modifié");
};

function generateTaskId() {
  return 'task_' + new Date().getTime()
}
