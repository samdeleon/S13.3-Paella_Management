$(document).ready(function () {
    $(".info-nextstatusbtn").click(function () {
        var ordernum    =   document.getElementById("ordernumber").value;
        var currstatus  =   document.getElementById("info-obutton").value;
        var nextstatus

        if(currstatus == "Buying Ingredients") {
            nextstatus = "Complete Ingredients";
        }

        elseif(currstatus == "Complete Ingredients") {
            nextstatus = "Cooking";
        }

        elseif(currstatus == "Cooking") {
            nextstatus = "Delivered"
        }

        elseif(currstatus == "Delivered") {
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