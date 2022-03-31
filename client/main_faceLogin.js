import { fb_login } from "./modules/faceLogin.js";

const btnLogin = document.getElementById("btnLogin");

btnLogin.addEventListener('click', () => {
    fb_login();
})