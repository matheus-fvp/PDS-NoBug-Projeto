import { faceLogout } from "./faceLogin.js";
import { search, LoadHistory } from "./search.js";

document.getElementById("btnLogout").addEventListener("click", () => {
    faceLogout();
});

document.getElementById("btnSearch").addEventListener("click", () => {
    search(document.getElementById("searchQuery").value, document.getElementById("maxNum").value, 1);
});

document.getElementById("btnHist").addEventListener("click", () => {
    LoadHistory();
});