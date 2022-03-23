function fb_login() {

    FB.login( response => {

        if (response.authResponse) {

            access_token = response.authResponse.accessToken; //get access token
            user_id = response.authResponse.userID; //get FB UID

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
