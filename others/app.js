// My selectors / Guys from the DOM
const inputBox = document.querySelector(".input-box");
const todoList = document.querySelector(".todo-list");
console.log(inputBox.Value);
const filter = document.querySelector(".filter-select");
const saveButton = document.querySelector(".save-button");


/*****************Event Listeners*******************************/
saveButton.addEventListener("click", addTodo);



/*****************Functions************************/
function addTodo(eventi) {
  // this EVENTI should prevent the form from submitting
  eventi.preventDefault();
  console.log(inputBox.Value);
  // todoItems is the list item itself
  const newTodoItem = document.createElement("li");
  newTodoItem.classList.add("todo-items")
  // todoText is the div containing the text
  const todoText = document.createElement("div");
  todoText.classList.add("todo-text");
  // adding the innertext of the input element to it
  todoText.innerText = inputBox.Value;
  newTodoItem.appendChild(todoText);
  // save button
  const doneBtn = document.createElement("button");
  doneBtn.classList.add("done-btn")
  newTodoItem.appendChild(doneBtn);
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  newTodoItem.appendChild(deleteBtn);
  // now add the new todo to the ul.todo-items
  todoList.appendChild(newTodoItem);
  console.log("hello");
}


