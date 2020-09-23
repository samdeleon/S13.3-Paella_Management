$(document).ready(function () {
    $("#reg").click(function () { 
        var accntname =      document.getElementById("username2").value;
        var accntpass =      document.getElementById("pswrd_1").value;
        
        var newuser = {
            username:           accntname,
            password:           accntpass
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
    $("#login").click(function () { 
        var accntname =      document.getElementById("username1").value;
        var accntpass =      document.getElementById("password").value;
        
        var newuser = {
            username:           accntname,
            password:           accntpass
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

            $.post("/Login", newuser,function (data, status) {
                
            });
            
        }
    });
    
});