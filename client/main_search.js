import { search } from "./search.js";

const btnSearch = document.getElementById("btnSearch");
const div_historic = document.getElementById("historico");

//initialize_historic();

btnSearch.addEventListener('click', () => {
    search();
});