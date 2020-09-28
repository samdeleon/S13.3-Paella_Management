$(document).ready(function () {

    $(".orderinfo-p_name").click(function () {

        var name = document.getElementById("orderinfo-span_name").innerHTML

        window.location.href = "client-information-" + name
    });
    
    $(".info-nextstatusbtn").click(function () {
        var ordernum    =   document.getElementById("ordernumber").value;
        var currstatus  =   document.getElementById("info-obutton").value;
        var nextstatus

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

        $.post("/nextStatus", information, function(data, status) {

        });

    });
});