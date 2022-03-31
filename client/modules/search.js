import { db, ref, set, get, child, update } from "./firebase.js"


const historicList = document.getElementById("historyList");


function search(word_key, max_tweets, save){
    
    const dbref = ref(db);

    if(save) {
        FB.api('/me', { fields: 'id' }, res => {

            let user_id = res['id'];

            get( child(dbref, "users/"+ user_id) ).then( (response) => {
                let count;
                let btn_id;

                if(response.exists()) {
                    //console.log(response.val().historic['20'].key_word);
                    count = response.val().count;
                    if(!document.getElementById("btnHist")) {

                        if(!response.hasChild("historic")) {
                            let text = historicList.getElementsByTagName("h3");
                            historicList.removeChild(text[0]);
                        }

                        btn_id = document.getElementById("hist_item" + count);

                        if(!btn_id) {
                            CreateHistoryButton(historicList, "hist_item" + count, word_key, max_tweets);
                        }else {
                            btn_id.textContent = word_key;
                            btn_id.removeEventListener('click', search);
                            btn_id.addEventListener('click', () => {
                                search(word_key, max_tweets, false);
                            });
                        }
                    }
            
                    set(ref(db, "users/" + user_id + "/historic/" + count), {
                        key_word: word_key,
                        qtd: max_tweets
                    });

                    count--;
                    
                    if(count < 0)
                        count = 5;
                    
                    update(ref(db, "users/" + user_id), {
                        count: count
                    });
                    
                }
            })


        });
    }

    // limpa resultados anteriores para não ter duplicados
    cleanResults("resultContainer");
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

function LoadHistory() {

    if(document.getElementById("btnHist"))
        document.getElementById("btnHist").remove();

    FB.api('/me', {fields: 'id'}, res => {

        let user_id = res['id'];

        get(child(ref(db), "users/" + user_id)).then((response) => {

            if(response.hasChild("historic")) {

                let size = response.val().historic.length;

                for(let i = 0; i < size; i++) {
                    let data = response.val().historic[i].key_word;
                    let qtd_tweets = response.val().historic[i].qtd;
                    let id = "hist_item" + i;
                    CreateHistoryButton(historicList, id, data, qtd_tweets);
                }

            }else {
                let msg = document.createElement("h3");
                msg.textContent = "Seu histórico está vazio :(";
                historicList.appendChild(msg);
            }
        });

    });
}

function cleanResults(id){

    let elements = document.getElementById(id).children;

    while(elements.length > 0)
        elements[elements.length - 1].remove();
}

function CreateHistoryButton(parent, id, key_word, qtd_tweets) {

    let btn = document.createElement("button");
    btn.id = id;
    btn.className = "searchButton btnHistory btn btn-primary d-inline-block";
    btn.textContent = key_word;
    parent.appendChild(btn);
    btn.addEventListener('click', () => {
        search(key_word, qtd_tweets, false);
    });

}

export { search, LoadHistory, cleanResults }