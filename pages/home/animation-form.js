const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");

signupBtn.onclick = () => {
  loginForm.style.marginLeft = "-50%";
};
loginBtn.onclick = () => {
  loginForm.style.marginLeft = "0%";
};