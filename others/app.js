// localStorage.clear();

// My selectors / Guys from the DOM
const inputBox = document.querySelector(".input-box");
const todoList = document.querySelector(".todo-list");
const filter = document.querySelector(".filter-select");
const saveButton = document.querySelector(".save-button");


/*****************Event Listeners*******************************/
// document.addEventListener("DOMContentLoaded", loadLocalTodos());
saveButton.addEventListener("click", addTodo);
todoList.addEventListener("click", saveOrDelete);



/*****************Functions************************/
function addTodo(myeventi) {
  // this EVENTI should prevent the form from submitting
  myeventi.preventDefault();
  // todoItems is the list item itself
  const newTodoItem = document.createElement("li");
  newTodoItem.classList.add("todo-items")
  // todoText is the div containing the text
  const todoText = document.createElement("div");
  todoText.classList.add("todo-text");
  // adding the innertext of the input element to it
  todoText.innerText = inputBox.value;
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
  // Save To Storage
  saveToLocalStorage(inputBox.value);
  // Claring the input after taking it's value
  inputBox.value = "";
}

// to determine whether to delete or mark as complete
function saveOrDelete(ev) {
  // i.e pressedItem = what has been pressed
  const pressedItem = ev.target;
  const pressedItemParent = pressedItem.parentElement;
  // if delete-btn is pressed
  if (pressedItem.classList.contains("delete-btn")) {
    pressedItemParent.classList.add("delete-it");
    // wait for transition to end before changing it
    pressedItemParent.addEventListener(
      "transitionend", function () {
        pressedItemParent.remove();
        // removeFromLocalStorage();
      })
  } else if (pressedItem.classList.contains("done-btn")) {
    // if done-btn is pressed
    pressedItemParent.classList.add("mark-as-done");
  }
}

function saveToLocalStorage(newTodoItems) {
  let todoItems;
  // get items if they exist in storage already
  if (localStorage.getItem("todoItems") === null) {
    // initialize an empty array
    todoItems = [];
  } else {// parse in the data.
    todoItems = JSON.parse(localStorage.getItem("todoItems"));
  }
  // add the new todo to the list
  todoItems.push(newTodoItems);
  // Save to localstorage
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
}