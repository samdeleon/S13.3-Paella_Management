$(document).ready(function () {
    $("#submitOrder").click(function () { 
        var customerName =      document.getElementById("customer_name").value;
        var contact_info =      document.getElementById("contact_info").value;
        var mode =              $("#mode_of_delivery option:selected").text();
        var address =           document.getElementById("delivery_address").value;
        var date =              document.getElementById("date_needed").value;
        var time =              document.getElementById("time_needed").value;
        var size =              $('#paella_size option:selected').text()
        var remarks =           document.getElementById("remarks").value;

        if (remarks = "") {
            remarks = "None";
        }

        var neworder = {
            name:           customerName,
            info:           contact_info,
            mode:           mode,
            address:        address,
            date:           date,
            time:           time,
            paellasize:     size,
            status:         "Buying Ingredients",
            extraremarks:   remarks,
            pan_used:       "No Pan Assigned"
        }
    
        

        if (customerName == "" || contact_info == "" || mode == "Which mode?" || address == "" || date == ""  || time == "" || size == "Choose which size")
        {
            console.log("Fields are not filled up");
            return false;
        }
        else
        {
            console.log(customerName);
            console.log(contact_info);
            console.log(mode);
            console.log(address);
            console.log(date);
            console.log(time);
            console.log(size);

            $.post("/newOrder", neworder,function (data, status) {
                
            });
            
        }
    });

    $("#old_customer").click(function (e) { 
        var name = document.getElementById("old_customername").value;
        //alert(name)
        

        var oldcus = {
            name: name 
        }

        $.post("findOldCustomer", oldcus, function (data, status) {
            if (data.success){
                var obj = data.old_customer


                

                /$("#customer_name").val(data.old_customer.name)
                $("#contact_info").val(data.old_customer.contact_info);
               // $("#customer_name").val(data.old_customer.name);
                $("#delivery_address").val(data.old_customer.address);


            }else {
                $("#error").text(data.message);
                $("#error").css('color', 'red')
            }
        });

    });
});