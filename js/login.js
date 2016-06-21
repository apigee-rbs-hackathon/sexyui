// User Authentication Token Endpoint

function login() {

  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  $.ajax({
    type: "POST",
    url: "https://" + apigeeConfig.org + "-" + apigeeConfig.env + "." + apigeeConfig.domain + "/v1/identity/token",
    async: true,
    data: {
      client_id: loginAppConfig.key,
      grant_type: "password",
      username: username,
      password: password
    },
    dataType: "json",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Accept", "application/json");
    },
    success: function(data, textStatus) {
      sessionStorage.setItem("jwt", data.jwt);
      window.location.replace("index.html");
    },
    error: function(xhr, textStatus, errorThrown){
       createAlert("<span class='glyphicon glyphicon-remove-circle'></span>&nbsp;&nbsp;Access Denied!  The password you entered is incorrect. Please try again (make sure your caps lock is off).", "danger");
    }
  });
}
