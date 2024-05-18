if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(function(registration) {
      console.log('Service Worker enregistré avec succès:', registration);
    })
    .catch(function(error) {
      console.log('Échec enregistrement du Service Worker:', error)
    });
}

function addTask(e) {
  e.preventDefault()
  const form = e.target
  const taskText = form.newTask.value.trim()
  const ul = form.nextElementSibling
  form.reset()
  if (taskText) {
    const li = document.createElement('li')
    li.innerHTML = `
      <input type="checkbox" name="checkTask">
      <p></p>
      <span class="delete" onclick="deleteTask(this)">&#x274E</span>`;
    li.children[1].textContent=taskText
    ul.appendChild(li)
  }
}

function deleteTask(e) {
  e.parentElement.remove()
}
