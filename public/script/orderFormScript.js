$(document).ready(function () {
    $("#submitOrder").click(function () { 
        var customerName = document.getElementById("customer_name").value;
        var contact_info = document.getElementById("contact_info").value;
        var mode = $("#mode_of_delivery option:selected").text();
        var address = document.getElementById("delivery_address")
        var date = document.getElementById("date_needed").value;
        var time = document.getElementById("time_needed").value;
        var size = $('#paella_size option:selected').text()
        var remarks = document.getElementById("remarks").value;


        var neworder = {
            name:           customerName,
            info:           contact_info,
            mode:           mode,
            address:        address,
            date:           date,
            time:           time,
            paellasize:     size,
            status:         "Preparing",
            extraremarks:   remarks,
            pan_used:       " "
        }
    
        

        if (customerName == "" || contact_info == "" || mode == "Which mode?" || address == "" || date == ""  || time == "" || size == "Choose which size")
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

/* -------------------------------------- [PAGE-01] LOGIN --------------------------------------- */

/* ------------------------------------ [PAGE-02] HOMEPAGE -------------------------------------- */

/* ------------------------------------ [PAGE-03] ORDER FORM ------------------------------------ */

/* -------------------------------- [PAGE-04] ORDER INFORMATION --------------------------------- */

/* ------------------------------ [PAGE-05] INGREDIENTS INVENTORY ------------------------------- */

/* ---------------------------------- [PAGE-07] PANS INVENTORY ---------------------------------- */

/* ------------------------------------ [PAGE-08] ALL ORDERS ------------------------------------ */

/* ----------------------------------- [PAGE-09] SEARCH PAGE ------------------------------------ */