function search(){

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer AAAAAAAAAAAAAAAAAAAAABxiZAEAAAAAvA8QYBr6TPIYnBzrpnxEdk3XoL4%3DDwhTKdypqfbrWouhPitNO4elvpYUCMR7DYAf4q8qmPMQr1PeU7");


    var options = { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + "AAAAAAAAAAAAAAAAAAAAABxiZAEAAAAAvA8QYBr6TPIYnBzrpnxEdk3XoL4%3DDwhTKdypqfbrWouhPitNO4elvpYUCMR7DYAf4q8qmPMQr1PeU7",
        },
        mode: 'no-cors',
    };

    console.log(options);

    fetch("https://api.twitter.com/2/tweets/search/recent?query=" + "MichaelJackson" + "&max_results=10",options).then( res => {

        console.log(res.body);

    });

}