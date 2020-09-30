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
        var panOptions;
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
                var pan14A = $( "#14A-status" ).text();
                var pan14B = $( "#14A-status" ).text();
                var pan14C = $( "#14A-status" ).text();
                var pan14D = $( "#14A-status" ).text();

                // if available or not

                $('.choices-14in').show();
            }
            else if(paellasize == "16 inches") {
                panOptions = ["16A","16B","16C"];
                $('.choices-16in').show();
            }
            else if(paellasize == "20 inches") {
                panOptions = ["20A","20B","20C","20D"];
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
        var ordernum    =   $( "#span_ordernum" ).text();
        var paellasize  =   $( "#info-paellasize" ).text();
        var chosenOne = "";
        var next = false; // boolean if they can go to the next status

        if(paellasize == "14 inches") {
            if($('input[name=radio-14choices]:checked').val()) {
                $( "#assignpanError" ).text("");
                chosenOne = $('input[name=radio-14choices]:checked').val()
                next = true;
            }
            else {
                $( "#assignpanError" ).text("Please choose a pan.");
                next = false;
            }
        }
        else if(paellasize == "16 inches") {
            if($('input[name=radio-16choices]:checked').val()) {
                $( "#assignpanError" ).text("");
                chosenOne = $('input[name=radio-16choices]:checked').val()
                next = true;
            }
            else {
                $( "#assignpanError" ).text("Please choose a pan.");
                next = false;
            }
        }
        else if(paellasize == "20 inches") {
            if($('input[name=radio-20choices]:checked').val()) {
                $( "#assignpanError" ).text("");
                chosenOne = $('input[name=radio-20choices]:checked').val()
                next = true;
            }
            else {
                $( "#assignpanError" ).text("Please choose a pan.");
                next = false;
            }
        }

        var nextstatus = "Cooking";

        var information = {
            status: nextstatus,
            ordernum: ordernum
        }

        if(next) {
            $.post("nextStatus", information, function(data, status) {
                if (data.success){
                    window.location.reload();
                    console.log("it working");
                }
                else {
                    console.log("it aint working");
                }
    
            });
        }
    });

    $(".info-assignpanCancel").click(function() {

        $( "#assignpanError" ).text("");

        // clearing for 14 inch pans
            $('input:radio[name=radio-14choices]').each(function () {
                $(this).prop('checked', false);
            });
        
        // clearing for 16 inch pans
            $('input:radio[name=radio-16choices]').each(function () {
                $(this).prop('checked', false);
            });

        // clearing for 20 inch pans
            $('input:radio[name=radio-20choices]').each(function () {
                $(this).prop('checked', false);
            });
    });

});