$(document).ready(function () {
    $("#submitOrder").click(function () { 
        var customerName =      document.getElementById("customer_name").value;
        var contact_info =      document.getElementById("contact_info").value;
        var message_info =      document.getElementById("message_info").value;
        var mode =              $("#mode_of_delivery option:selected").text();
        var address =           document.getElementById("delivery_address").value;
        var date =              document.getElementById("date_needed").value;
        var time =              document.getElementById("time_needed").value;
        var size =              $('#paella_size option:selected').text()
        var remarks =           document.getElementById("remarks").value;

        if (remarks == "") {
            remarks = "None";
        }

        var details = {
            name:           customerName,
            info:           contact_info,
            msg_info:       message_info,
            address:        address,
            mode:           mode, 
            date:           date,
            time:           time,
            paellasize:     size,
            status:         "Buying Ingredients",
            extraremarks:   remarks,
            pan_used:       "No Pan Assigned"
        }
        
        

        if (customerName == "" || contact_info == "" || message_info == "" || mode == "Which mode?" || address == "" || date == ""  || time == "" || size == "Choose which size")
        {
            console.log("Fields are not filled up");

        }
        else
        {

            $.post("/newOrder", details ,function (data, status) {
                
            });
            
        }
    });

    $("#old_customer").click(function (e) { 
        
        var name = document.getElementById("old_customername").value;
        //alert(name)
        
        if (name != ""){
            var oldcus = {
                name: name 
            }
    
            $.post("findOldCustomer", oldcus, function (data, status) {
                if (data.success){
    
                    $("#customer_name").val(data.old_customer.name)
                    $("#contact_info").val(data.old_customer.contact_info);
                    $("#message_info").val(data.old_customer.message_info);
                    $("#delivery_address").val(data.old_customer.address);
    
    
                }else {
                    $("#error").text(data.message);
                    $("#error").css('color', 'red')
                }
            });
        }
        

    });
});