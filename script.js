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
