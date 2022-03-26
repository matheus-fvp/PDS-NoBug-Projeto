import { fb_login } from "./modules/faceLogin.js";
import { cleanResults, init, search } from "./modules/search.js";

const btnSearch = document.getElementById("btnSearch");
const btnHist = document.getElementById("btn_hist");
const btn_reload = document.getElementById("reload");

btnSearch.addEventListener('click', () => {
    search(document.getElementById("searchQuery").value, document.getElementById("maxNum").value, true);
});

btnHist.addEventListener('click', () => {
    btnHist.remove();
    init();
    btn_reload.style.display = "inline";
});

btn_reload.addEventListener('click', () => {
    cleanResults("historic_list");
    init();
});
