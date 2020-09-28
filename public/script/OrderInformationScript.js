$(document).ready(function () {

    $(".orderinfo-p_name").click(function () {

        var name = document.getElementById("orderinfo-span_name").innerHTML

        window.location.href = "client-information-" + name
    });
    
    $("#info-nextstatusbtn").click(function (e) {
        e.preventDefault();
        var ordernum    =   $( "#span_ordernum" ).text();
        var currstatus  =   $( "#span_orderstatus" ).text();
        var nextstatus  =   "";
        var data_success;

        if(currstatus == "Buying Ingredients") {
            nextstatus = "Complete Ingredients";
        }

        else if(currstatus == "Complete Ingredients") {
            nextstatus = "Cooking";
        }

        else if(currstatus == "Cooking") {
            nextstatus = "Delivered"
        }

        else if(currstatus == "Delivered") {
            nextstatus = "Completed"
        }

        var information = {
            status: nextstatus,
            ordernum: ordernum
        }

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

        return false;
    });

});