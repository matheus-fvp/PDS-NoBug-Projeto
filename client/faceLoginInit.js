window.onload = () => {

    if (!document.getElementById("fb-root")) {
        
        // create div required for fb
        const fbDiv = document.createElement("div");
        fbDiv.id = "fb-root";
        document.body.appendChild(fbDiv);
        
        // Run any script after sdk is loaded
        window.fbAsyncInit = function() {
            FB.init({
              appId      : "449951210206827"/*"2230411237123442"*/,
              cookie     : true,
              xfbml      : true,
              version    : "v13.0"
            });
              
            FB.AppEvents.logPageView();

            FB.getLoginStatus(function(response) {
                // nada
            });
        };

        // inject sdk.js
        (function(d, script) {
            script = d.createElement("script");
            script.type = "text/javascript";
            script.async = true;
            script.src = "https://connect.facebook.net/en_US/sdk.js";
            d.getElementsByTagName("head")[0].appendChild(script);
        })(document);
    }
}