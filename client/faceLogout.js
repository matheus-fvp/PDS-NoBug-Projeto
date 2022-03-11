function faceLogout() {

    FB.logout(function(response) {
        window.location.href = "/";
      });

}