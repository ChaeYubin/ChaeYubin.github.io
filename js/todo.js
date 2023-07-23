const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDolist = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(e) {
  const li = e.target.parentElement.parentElement;
  li.remove();
  toDos = toDos.filter((todo) => todo.id.toString() !== li.id);
  saveToDos();
}

function successToDo(e) {
  const li = e.target.parentElement.parentElement;
  li.classList.toggle("success");
  toDos = toDos.map((todo) => {
    if (todo.id.toString() === li.id) {
      let res = todo.success ? false : true;
      return { ...todo, success: res };
    }
    return todo;
  });
  saveToDos();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  li.classList.add("todo-list");

  const span = document.createElement("span");
  span.innerText = newTodo.text;

  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("todo-button-container");

  const successButton = document.createElement("button");
  successButton.innerText = "✅";
  successButton.addEventListener("click", successToDo);

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "❌";
  deleteButton.addEventListener("click", deleteToDo);

  li.appendChild(span);
  li.appendChild(buttonDiv);
  buttonDiv.appendChild(deleteButton);
  buttonDiv.appendChild(successButton);
  toDolist.appendChild(li);
}

function handleToDoSubmit(e) {
  e.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";

  const newTodoObj = {
    id: Date.now(),
    text: newTodo,
    success: false,
  };

  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
