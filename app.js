//if ('serviceWorker' in navigator) {
//  navigator.serviceWorker.register('./sw.js');
//};


ul = document.querySelector('ul')
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  let task={};
  try {
    task = JSON.parse(localStorage.getItem(key))
    console.log(task)
  } catch (error) {
    console.error('Erreur de parsing JSON:', error);
  };

  if (task.text) {
    ul.appendChild(displayTask(task))
  };
}



function displayTask(obj) {
  const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" name="checkTask">
      <p></p>
      <span class="delete" onclick="deleteTask(this)">&#x274E</span>`;
    li.children[1].textContent = obj.text;
    li.dataset.Id= obj.createdAt
    return li
}

function addTask(e) {
  e.preventDefault();
  const form = e.target;
  const task = {
    text: form.newTask.value.trim(),
    done: false,
    createdAt: new Date().getTime(),
  };
  localStorage.setItem(task.createdAt, JSON.stringify(task))
  form.reset();

  if (task.text) {
    ul.appendChild(displayTask(task))
  };
};

function deleteTask(e) {
  li = e.parentElement;
  localStorage.removeItem(li.dataset.Id);
  li.remove();
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

//window.onstorage = () => {
//  console.log("localstorage modifié");
//};

//function generateTaskId() {
//  return 'task_' + new Date().getTime()
//}
