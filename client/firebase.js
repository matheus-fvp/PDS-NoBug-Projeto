import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyAOmUz6oV6sMiOwHwu9VOHTUCrXSrrYSys",
    authDomain: "nobug-pds.firebaseapp.com",
    databaseURL: "https://nobug-pds-default-rtdb.firebaseio.com",
    projectId: "nobug-pds",
    storageBucket: "nobug-pds.appspot.com",
    messagingSenderId: "1021272577391",
    appId: "1:1021272577391:web:41cdf774c5ec9d452b449a"
});

export const db = getDatabase(firebaseApp);

/*export function insert_database(id) {
    set(ref(db, "users/" + id + "/historic/" + 20), {
        key_word: 'poseidon'
    })
}*/

/*
buttom.addEventListener('click', () => {
    FB.api('/me', {fields: 'id'}, res => {
        insert_database(res['id']);
    });
});
*/

//insert_database(35);

/*onAuthStateChanged(auth, user => {
    if(user != null) {
        console.log("Logado!");
    }else {
        console.log("não há!");
    }
})

*/

/*get(child(dbref, "users/4/historic/2")).then((response) =>{
    if(response != null) {
        console.log(response.val().key_word);
    }else{
        console.log("não há!");
    }
})*/
