import { ref, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";

import { db } from './firebase.js';


export function search(){

    const dbref = ref(db);

    FB.api('/me', {fields: 'id'}, res => {

        let user_id = res['id'];
        get(child(dbref, "users/"+ user_id)).then((response) =>{
            let count;
            let elem;
            if(response != null) {
                //console.log(response.val().historic['20'].key_word);
                count = response.val().count;
                let it = "it" + count;
                elem = document.getElementById(it);
                let link = document.createElement("a");
                link.textContent = document.getElementById("searchQuery").value;
                elem.appendChild(link);
                set(ref(db, "users/" + user_id + "/historic/" + count), {
                    key_word: document.getElementById("searchQuery").value
                })
                count = (count + 1) % 4;
                update(ref(db, "users/" + user_id), {
                    count: count
                })
                
            }
        })
        //console.log(count);
        console.log(user_id);
    });

    // limpa resultados anteriores para não ter duplicados
    cleanResults();
    var options = {
        method: "POST",
        mode: "same-origin",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
            query: document.getElementById("searchQuery").value,
            maxNum: document.getElementById("maxNum").value
        })
    };


    fetch("/twitterCall", options).then( response => {

        response.text().then( content => {

            let data = "";

            try{
                data = JSON.parse(content);
            }
            catch (err) {
                alert(content);
                return;
            }
            
            data.forEach( item => {
                
                let card = document.createElement("div");
                card.className = "card";

                let twitterUser = document.createElement("div");
                twitterUser.className = "twitterUser";
                twitterUser.innerText = item["user"];

                let tweetContent = document.createElement("div");
                tweetContent.className = "tweetContent";
                tweetContent.innerText = item["message"];

                document.getElementById("resultContainer").appendChild(card).appendChild(twitterUser).appendChild(tweetContent);

            });
        
        });
    }).catch( err =>{
        alert(err);
    });
    
}


function cleanResults(){

    let elements = document.getElementById("resultContainer").children;

    while(elements.length > 0)
        elements[elements.length - 1].remove();
}

