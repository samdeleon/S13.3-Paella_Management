$(document).ready(function () {
    $("#reg").click(function () {
        var accntname =document.getElementById("username2").value;
        var accntpass =document.getElementById("pswrd_1").value;

        var newuser = {
            username:accntname,
            password:accntpass
        }



        if (accntname == "" || accntpass == "")
        {
            console.log("Fields are not filled up");
            return false;
        }
        else
        {
            console.log(accntname);
            console.log(accntpass);

            $.post("/newUser", newuser,function (data, status) {

            });

        }
    });

    $("#log").click(function () {
        var accntname = $("#username1").val();
        var accntpass = $('#password').val();
        var newuser = {
            username:accntname,
            password:accntpass
        }
        if (accntname == "" || accntpass == "")
        {
            alert("Fields are not filled up.");
        }
        else
        {
          $.post('login', {user: newuser}, function(data, status){
              if(!data.ok) {
                alert("Invalid Login.");
              } else {
                $(location).attr("href", "/home");
                alert("Welcome " + data.cont.username + "!");
              }
          });
        }
    });
});
