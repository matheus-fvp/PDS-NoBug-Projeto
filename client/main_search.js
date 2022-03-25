import { fb_login } from "./modules/faceLogin.js";
import { init, search } from "./modules/search.js";

const btnSearch = document.getElementById("btnSearch");
const btnHist = document.getElementById("btn_hist");

btnSearch.addEventListener('click', () => {
    search(document.getElementById("searchQuery").value, document.getElementById("maxNum").value);
});

btnHist.addEventListener('click', () => {
    btnHist.remove();
    init();
});
