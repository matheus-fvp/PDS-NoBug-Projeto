import { db, ref, set, get, child, update } from "./firebase.js";

function faceLogin() {

    FB.login( response => {

        if (response.authResponse) {
            let access_token = response.authResponse['accessToken']; //get access token
            let user_id = response.authResponse.userID; //get FB UID
            //console.log(user_id);

            get(child(ref(db), "users/")).then((response)=> {
                console.log(response);
                if(response && !response.hasChild(user_id)) {
                    set(ref(db, "users/" + user_id), {
                        count: 4
                    })
                }
            });
            
            window.location.href = "/search";
        
            /*
            FB.api('/me', function(response) {
                let user_email = response.email; //get user email
            });
            */

        } else {
            //user hit cancel button
            alert('User cancelled login or did not fully authorize.');

        }
    }, {
        scope: 'public_profile,email'
    });
    
}

function faceLogout() {

    FB.logout(function(response) {
        window.location.href = "/";
      });

}

export { faceLogin, faceLogout };