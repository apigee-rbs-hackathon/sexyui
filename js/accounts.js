function getVaccounts() {

  var jwt = sessionStorage.getItem("jwt");

  $.ajax({
    url: "http://bbank-test.apigee.net/v1/vaccounts",
    async: true,
    dataType: "json",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Authorization", "Bearer " + jwt);
    },
    success: function(data) {

      $(".accounts").html('');

      setBalanceAccNo(data.accNo,data.balance);

      for (var i = 0; i < data.vaccounts.length; i++) {

        if (data.vaccounts[i].limit != null) {
          var limit = 'Limit: £' + data.vaccounts[i].limit;
        } else {
          var limit = "Limit: None";
        };

        if (data.vaccounts[i].name == "Entertainment") {
          var catImage = 'category-entertainment.png';
        } else if (data.vaccounts[i].name == "Shopping") {
          var catImage = 'category-shopping.png';
        } else if (data.vaccounts[i].name == "Night Out") {
          var catImage = 'category-nightsout.jpg';
        } else if (data.vaccounts[i].name == "Charity") {
          var catImage = 'category-charity.jpg';
        } else if (data.vaccounts[i].name == "Mortgage") {
          var catImage = 'category-mortgage.jpg';
        } else if (data.vaccounts[i].name == "Groceries") {
          var catImage = 'category-groceries.jpg';
        } else {
          var catImage = "category-default.jpg";
        };

        if (data.vaccounts[i].balance >= 0) {
          var balance = "<span class='label label-success'>£" + data.vaccounts[i].balance + "</span>";
        } else {
          var balance = "<span class='label label-danger'>£" + data.vaccounts[i].balance + "</span>";
        };

        var mydate = new Date(data.vaccounts[i].txs[0].txdate);
        var formattedDate = mydate.toString("dd MMMM yyyy");

        $(".accounts").append(
          '<div class="col-sm-12 col-md-4 col-lg-4">' +
          '  <div class="wrapper text-center">' +
          '  <br/><br/>' +
          '  <div class="caption text-center">' +
          '    <div class="image">' +
          '     <img src="img/'+ catImage +'" width="100%"/>' +
          '  <h2><span>&nbsp;' + data.vaccounts[i].name + '&nbsp;&nbsp;</span></h2></div>' +
          '    <h3>' + balance + '&nbsp;<span class="label label-default">' + limit + '</span></h3>' +
          '    <br/>' +
          '<div id="table">' +
          '  <table class="table table-striped table-hover">' +
          '    <thead><tr><th>Date</th><th>Amount</th><th>Description</th></tr></thead>' +
          '    <tbody>' +
          '      <tr><td>' + formattedDate + '</td><td>' + data.vaccounts[i].txs[0].amount + '</td><td>' + data.vaccounts[i].txs[0].desc + '</td></tr>' +
          '    </tbody>' +
          '  </table>' +
          '  </div>' +
          '  </div>' +
          '  </div>' +
          ' </div>' +
          '</div>');
      }
    },
    error: function(xhr, textStatus, errorThrown) {}
  });
}

//function setUserAccountNavBar() {
//  $.ajax({
//    type: "GET",
//    url: apigeeUrl + "/v1/users/" + username,
//    async: true,
//    dataType: "json",
//    beforeSend: function(xhr) {
//      xhr.setRequestHeader("Accept", "application/json");
//    },
//    success: function(data) {
//      var x = document.getElementById("username"); -->
//      x.innerHTML = x.innerHTML + "<img src='" + data.picture + "' class='profile-image img-circle'>&nbsp;&nbsp;" + data.name + "  <span class='caret' ></span>";
//    }
//  });
//var x = document.getElementById("username");
//x.innerHTML = x.innerHTML + "<img src='img/user-paul.png' class='profile-image img-circle'>&nbsp;&nbsp;Paul Agolini&nbsp;&nbsp;<span class='caret' ></span>";
//}

// Logout Function. Sets all session storage variables to null

function logout() {
  sessionStorage.setItem("jwt", null);
  window.open("login.html", "_self", false);
}

function setBalanceAccNo(accountNo,balance) {
  var x = document.getElementById("accountNo");
  x.innerHTML = x.innerHTML + accountNo;

  var y = document.getElementById("balance");
  y.innerHTML = y.innerHTML + balance;


}
