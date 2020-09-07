$(document).ready(function () {
    $("#submitOrder").click(function () { 
        var customerName = document.getElementById("customer_name").value;
        var date = document.getElementById("date_needed").value;
        var time = document.getElementById("time_needed").value;
        var size = $('#paella_size option:selected').text()
        var remarks = document.getElementById("remarks").value;


        var neworder = {
            name:           customerName,
            date:           date,
            time:           time,
            paellasize:     size,
            status:         "Preparing",
            extraremarks:   remarks,
            pan_used:       ""
        }
    
        

        if (customerName == "" || date == ""  || time == "" || size == "Choose which size")
        {
            console.log("Fields are not filled up");
            return false;
        }
        else
        {
            console.log(neworder);
            $.post("/newOrder", neworder,function (data, status) {

            });
        }
    });

    
});