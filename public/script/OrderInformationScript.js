$(document).ready(function () {

    $(".orderinfo-p_name").click(function () {

        var name = document.getElementById("orderinfo-span_name").innerHTML

        window.location.href = "client-information-" + name
    });
    
    $("#info-nextstatusbtn").click(function (e) {
        e.preventDefault();
        var ordernum    =   $( "#span_ordernum" ).text();
        var currstatus  =   $( "#span_orderstatus" ).text();
        var paellasize  =   $( "#info-paellasize" ).text();
        var nextstatus  =   "";
        var next = false; // boolean if they can go to the next status

        if(currstatus == "Buying Ingredients") {
            nextstatus = "Complete Ingredients";
            next = true;
        }

        else if(currstatus == "Complete Ingredients") {
            nextstatus = "Cooking";
            $('#orderstatusModal').modal('toggle');

            // displaying the options depending on the paella size
            if(paellasize == "14 inches") {
                $('.choices-14in').show();
            }
            else if(paellasize == "16 inches") {
                $('.choices-16in').show();
            }
            else if(paellasize == "20 inches") {
                $('.choices-20in').show();
            }

            $('#assignpanModal').modal('show');
            next = false;   // ill just copy the nextstatus post in the second modal
        }

        else if(currstatus == "Cooking") {
            nextstatus = "Delivered"
            next = true;
        }

        else if(currstatus == "Delivered") {
            nextstatus = "Completed"
            next = true;
        }

        var information = {
            status: nextstatus,
            ordernum: ordernum
        }

        if(next) {
            $.post("nextStatus", information, function(data, status) {
                if (data.success){
                    $('#orderstatusModal').modal('toggle');
                    window.location.reload();
                    console.log("it working");
                }
                else {
                    console.log("it aint working");
                }
    
            });
        }
        

        return false;
    });

    $("#info-assignpanbtn").click(function (e) {

    });

});