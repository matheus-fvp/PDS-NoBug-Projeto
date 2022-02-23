function search(){

    /*
    FB.api('/me', {fields: 'id'}, res => {
        console.log(res)
    });
    */

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