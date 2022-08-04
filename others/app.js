// localStorage.clear();
// My selectors / Guys from the DOM
const inputBox = document.querySelector(".input-box");
const todoList = document.querySelector(".todo-list");
const filter = document.querySelector(".filter-select");
const saveButton = document.querySelector(".save-button");


/*****************Event Listeners*******************************/
document.addEventListener("DOMContentLoaded", FETCHLocalTodos());
saveButton.addEventListener("click", addTodo);
todoList.addEventListener("click", saveOrDelete);
filter.addEventListener("click", filterfunc);



/*****************Functions************************/
function FETCHLocalTodos() {
  todoItems = JSON.parse(localStorage.getItem("todoItems"));
  if (!(todoItems === null)) {
    todoItems.forEach(function(item){
      showTodoInDom(item);
  });

  }
}

function showTodoInDom(eachTodo) {
  // todoItems is the list item itself
  const newTodoItem = document.createElement("li");
  newTodoItem.classList.add("todo-items");
  // todoText is the div containing the text
  const todoText = document.createElement("div");
  todoText.classList.add("todo-text");
  // adding the innertext of the input element to it
  todoText.innerText = eachTodo;
  newTodoItem.appendChild(todoText);
  // save button
  const doneBtn = document.createElement("button");
  //Add icon to button
  doneBtn.innerHTML = '<i class="fas fa-check ico" aria-hidden="true"></i>';
  doneBtn.classList.add("done-btn");
  newTodoItem.appendChild(doneBtn);
  const deleteBtn = document.createElement("button");
  //Add icon to button
  deleteBtn.innerHTML = '<i class="fas fa-trash ico" aria-hidden="true"></i>';
  deleteBtn.classList.add("delete-btn");
  newTodoItem.appendChild(deleteBtn);
  // now add the new todo to the ul.todo-items
  todoList.appendChild(newTodoItem);
}

function addTodo(myeventi) {
  // this EVENTI should prevent the form from submitting
  myeventi.preventDefault();
  //Show todo in dom
  showTodoInDom(inputBox.value);
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
    })
  const todoTextContent = pressedItemParent.children[0].innerText;
  deleteFromLocalStorage(todoTextContent);
  } else if (pressedItem.classList.contains("done-btn")) {
    // if done-btn is pressed
    pressedItemParent.classList.add("mark-as-done");
  }
}

function deleteFromLocalStorage(todoTextContentToDelete) {
  const todoItems = JSON.parse(localStorage.getItem("todoItems"));
  todoItems.splice(todoItems.indexOf(todoTextContentToDelete), 1);
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
}

function saveToLocalStorage(newTodoItems) {
  let todoItems;
  // get items if they exist in storage already
  if (localStorage.getItem("todoItems") === null) {
    todoItems = [];
  } else {
    todoItems = JSON.parse(localStorage.getItem("todoItems"));
  }
  // add the new todo to the list
  todoItems.push(newTodoItems);
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
}

console.log(todoList.childNodes);
// /*
function filterfunc(ev) {
  // grab all todos
  const todoItems = todoList.childNodes;
  todoItems.forEach(function (eachTodo) {
  switch (ev.target.value) {
    case "all":
      eachTodo.style.display = "flex";
    break;
    case "completed":
      if (eachTodo.classList.contains("mark-as-done")) {
        eachTodo.style.display = "flex";
      } else {
        eachTodo.style.display = "none";
      }
      break;
    case "uncompleted":
      if (!eachTodo.classList.contains("mark-as-done")) {
        eachTodo.style.display = "flex";
      } else {
        eachTodo.style.display = "none";
      }
      break;
  }
  });
}
// */