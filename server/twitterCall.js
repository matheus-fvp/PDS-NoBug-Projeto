const express = require("express");
const https = require('https');
const router = express.Router();
const dotenv = require("dotenv").config();


router.post("/twitterCall", async (req, res) => {

    if(req.body.maxNum < 10 || req.body.maxNum > 100){
        res.write("Numero de tweets precisa ser entre 10 e 100!");
        res.end();
        return;
    }
    

    let options = "&max_results=" + req.body.maxNum + "&tweet.fields=author_id,created_at";
    let query = "/2/tweets/search/recent?query=" + encodeURI(req.body.query);

    const headerOptions = {
        hostname: "api.twitter.com",
        port: 443,
        headers: {
            "User-Agent": "v2RecentSearchJS",
            "authorization": "Bearer " + process.env.BEARER
        },
        path: query + options,
        method: 'GET'
    };


    let jsonResponse = [];

    
    // call para receber os tweets e o author_id
    const tweetsReq = https.get(headerOptions, tweetsRes => {
        
        let tweetsJsonString = "";

        tweetsRes.on("data", chunk => {
            tweetsJsonString += chunk;
        });

        tweetsRes.on("end", () => {
            
            let tweetsJson = JSON.parse(tweetsJsonString);
            
            // call para receber o nome do usuario
            tweetsJson["data"].forEach( item => {
                
                headerOptions.path = "/2/users/" + item["author_id"];

                const userReq = https.get(headerOptions, userRes => {

                    let userJsonString = "";

                    userRes.on("data", chunk => {
                        userJsonString += chunk;
                    });

                    userRes.on("end", () => {

                        let userName = "";

                        try {
                            userName = JSON.parse(userJsonString)["data"]["name"];
                        }
                        catch (err) {
                            
                            try {
                                res.write(JSON.parse(userJsonString)["title"]);
                            }
                            catch (err2){
                                console.log(err2);
                            }

                            res.end();
                            return;
                        }

                        jsonResponse.push({user: userName, message: item["text"]});

                        
                        if(jsonResponse.length == req.body.maxNum){
                            res.write(JSON.stringify(jsonResponse));
                            res.end();
                        }
                        
                    });

                });

                userReq.on('error', (e) => {
                    console.error(e);
                });
            
            });

        });

    });

    tweetsReq.on('error', (e) => {
        console.error(e);
    });
    
});

module.exports = router;