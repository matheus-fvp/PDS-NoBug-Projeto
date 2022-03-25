import { ref, set, get, child, update } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";
import { db } from './firebase.js';

function search(word_key, max_tweets){

    const dbref = ref(db);

    FB.api('/me', {fields: 'id'}, res => {

        let user_id = res['id'];

        get(child(dbref, "users/"+ user_id)).then((response) =>{
            let count;
            let btn_id;
            let hist_list = document.getElementById("historic_list");
            //console.log(response);
            if(response.exists()) {
                //console.log(response.val().historic['20'].key_word);
                count = response.val().count;
                btn_id = document.getElementById("hist_item" + count);
                if(!response.hasChild("historic")) {
                    let text = hist_list.getElementsByTagName("h3");
                    hist_list.removeChild(text[0]);
                }
                if(!btn_id) {
                    console.log("aaa");
                    let btn = document.createElement("button");
                    btn.id = "hist_item" + count;
                    btn.className = "searchButton btnHistory btn btn-primary d-inline-block";
                    btn.textContent = word_key;
                    hist_list.appendChild(btn);
                }else {
                    btn_id.textContent = word_key;
                }
                set(ref(db, "users/" + user_id + "/historic/" + count), {
                    key_word: word_key
                })
                count = (count + 1) % 4;
                update(ref(db, "users/" + user_id), {
                    count: count
                })
                
            }
        })
    });

    // limpa resultados anteriores para não ter duplicados
    cleanResults();
    var options = {
        method: "POST",
        mode: "same-origin",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
            query: word_key,
            maxNum: max_tweets
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

function init() {
    const historicList = document.getElementById("historic_list");
    FB.api('/me', {fields: 'id'}, res => {

        let user_id = res['id'];

        get(child(ref(db), "users/" + user_id)).then((response) => {
            console.log(response);
            if(response.hasChild("historic")) {
                let size = response.val().historic.length;
                for(let i = 0; i < size; i++) {
                    let btn = document.createElement("button");
                    let data = response.val().historic[i].key_word;
                    btn.id = "hist_item" + i;
                    btn.className = "searchButton btnHistory btn btn-primary d-inline-block";
                    btn.textContent = data;
                    historicList.appendChild(btn); 
                }

            }else {
                let msg = document.createElement("h3");
                msg.textContent = "Seu histórico está vazio :(";
                historicList.appendChild(msg);
            }
        });

    });
}

function cleanResults(){

    let elements = document.getElementById("resultContainer").children;

    while(elements.length > 0)
        elements[elements.length - 1].remove();
}

export { search, init }

