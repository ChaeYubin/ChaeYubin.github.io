const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greetingMsg = document.querySelector("h1:first-child");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(e) {
  e.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  paintGreetings(username);
}

function paintGreetings(username) {
  greeting.innerText = `Hello ${username}, have a nice day!`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
  greetingMsg.classList.add(HIDDEN_CLASSNAME);

  setTimeout(() => {
    location.href = "todo.html";
  }, 4000);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);
if (savedUsername === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  paintGreetings(savedUsername);
}
