$(document).ready(function () {
    $("#reg").click(function () {
        var accntname =document.getElementById("username2").value;
        var accntpass =document.getElementById("pswrd_1").value;
        var accntpass2=document.getElementById("pswrd_2").value;
        var box=document.getElementById("checkbox").checked;
        var newuser = {
            username:accntname,
            password:accntpass
        }



        if (accntname == "" || accntpass == ""||accntpass!=accntpass2
        ||accntname==" "||accntpass==" "||accntpass2==""||accntpass2==" "
        ||checkbox.checked!=true)
        {
            return false;
        }
        else
        {
            $.post('login', {user: newuser}, function(data, status){
                if(!data.ok) {
                    alert("Registration Successful!")
                    curr_username = accntname;
                    $.post("/newUser", newuser,function (data, status) {

                    });
                } else {

                  alert("User already exists!");
                }
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
                curr_username = accntname;
                $(location).attr("href", "/home");
                alert("Welcome " + data.cont.username + "!");
              }
          });
        }
    });
});
