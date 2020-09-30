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
                $.get('/pans-inventory', function(result){
                    var pan14A = $(result).find( "#14A-statusSPAN" ).text();
                    var pan14B = $(result).find( "#14B-statusSPAN" ).text();
                    var pan14C = $(result).find( "#14C-statusSPAN" ).text();
                    var pan14D = $(result).find( "#14D-statusSPAN" ).text();
                    // if pan is unavailable, then it shows "unavailable" text + disabled radio btn

                    // 14A availability
                        if(pan14A != "Available") {
                            $( "#used-14A" ).text("(Unavailable)");
                            $('input[name=radio-14choices][value=14A]').prop('disabled', true);
                        }
                        else {
                            $( "#used-14A" ).text("");
                            $('input[name=radio-14choices][value=14A]').prop('disabled', false);
                        }
                    
                    // 14B availability
                        if(pan14B != "Available") {
                            $( "#used-14B" ).text("(Unavailable)");
                            $('input[name=radio-14choices][value=14B]').prop('disabled', true);
                        }
                        else {
                            $( "#used-14B" ).text("");
                            $('input[name=radio-14choices][value=14B]').prop('disabled', false);
                        }
                    
                    // 14C availability
                        if(pan14C != "Available") {
                            $( "#used-14C" ).text("(Unavailable)");
                            $('input[name=radio-14choices][value=14C]').prop('disabled', true);
                        }
                        else {
                            $( "#used-14C" ).text("");
                            $('input[name=radio-14choices][value=14C]').prop('disabled', false);
                        }
                
                    // 14D availability
                        if(pan14D != "Available") {
                            $( "#used-14D" ).text("(Unavailable)");
                            $('input[name=radio-14choices][value=14D]').prop('disabled', true);
                        }
                        else {
                            $( "#used-14D" ).text("");
                            $('input[name=radio-14choices][value=14D]').prop('disabled', false);
                        }
                
                    // if all unavailable, then the save button is disabled
                        if(pan14A != "Available" && pan14B != "Available" && pan14C != "Available" && pan14D != "Available") {
                            $('#info-assignpanbtn').attr('disabled', true);
                            $("#info-assignpanbtn").css("cursor", "default");
                            $( "#assignpanError" ).text("Sorry, no pans are available :(");
                        }
                        else {
                            $('#info-assignpanbtn').attr('disabled', false);
                            $("#info-assignpanbtn").css("cursor", "pointer");
                            $( "#assignpanError" ).text("");
                        }
                
                    $('.choices-14in').show();
                });
            }
            else if(paellasize == "16 inches") {
                $.get('/pans-inventory', function(result){
                    var pan16A = $(result).find( "#16A-statusSPAN" ).text();
                    var pan16B = $(result).find( "#16B-statusSPAN" ).text();
                    var pan16C = $(result).find( "#16C-statusSPAN" ).text();
                    // if pan is unavailable, then it shows "unavailable" text + disabled radio btn

                    // 16A availability
                        if(pan16A != "Available") {
                            $( "#used-16A" ).text("(Unavailable)");
                            $('input[name=radio-16choices][value=16A]').prop('disabled', true);
                        }
                        else {
                            $( "#used-16A" ).text("");
                            $('input[name=radio-16choices][value=16A]').prop('disabled', false);
                        }
                    
                    // 16B availability
                        if(pan16B != "Available") {
                            $( "#used-16B" ).text("(Unavailable)");
                            $('input[name=radio-16choices][value=16B]').prop('disabled', true);
                        }
                        else {
                            $( "#used-16B" ).text("");
                            $('input[name=radio-16choices][value=16B]').prop('disabled', false);
                        }
                    
                    // 16C availability
                        if(pan16C != "Available") {
                            $( "#used-16C" ).text("(Unavailable)");
                            $('input[name=radio-16choices][value=16C]').prop('disabled', true);
                        }
                        else {
                            $( "#used-16C" ).text("");
                            $('input[name=radio-16choices][value=16C]').prop('disabled', false);
                        }
                
                    // if all unavailable, then the save button is disabled
                        if(pan16A != "Available" && pan16B != "Available" && pan16C != "Available") {
                            $('#info-assignpanbtn').attr('disabled', true);
                            $("#info-assignpanbtn").css("cursor", "default");
                            $( "#assignpanError" ).text("Sorry, no pans are available :(");
                        }
                        else {
                            $('#info-assignpanbtn').attr('disabled', false);
                            $("#info-assignpanbtn").css("cursor", "pointer");
                            $( "#assignpanError" ).text("");
                        }
                
                    $('.choices-16in').show();
                });
            }
            else if(paellasize == "20 inches") {
                $.get('/pans-inventory', function(result){
                    var pan20A = $(result).find( "#20A-statusSPAN" ).text();
                    var pan20B = $(result).find( "#20B-statusSPAN" ).text();
                    var pan20C = $(result).find( "#20C-statusSPAN" ).text();
                    var pan20D = $(result).find( "#20D-statusSPAN" ).text();
                    // if pan is unavailable, then it shows "unavailable" text + disabled radio btn

                    // 20A availability
                        if(pan20A != "Available") {
                            $( "#used-20A" ).text("(Unavailable)");
                            $('input[name=radio-20choices][value=20A]').prop('disabled', true);
                        }
                        else {
                            $( "#used-20A" ).text("");
                            $('input[name=radio-20choices][value=20A]').prop('disabled', false);
                        }
                    
                    // 20B availability
                        if(pan20B != "Available") {
                            $( "#used-20B" ).text("(Unavailable)");
                            $('input[name=radio-20choices][value=20B]').prop('disabled', true);
                        }
                        else {
                            $( "#used-20B" ).text("");
                            $('input[name=radio-20choices][value=20B]').prop('disabled', false);
                        }
                    
                    // 20C availability
                        if(pan20C != "Available") {
                            $( "#used-20C" ).text("(Unavailable)");
                            $('input[name=radio-20choices][value=20C]').prop('disabled', true);
                        }
                        else {
                            $( "#used-20C" ).text("");
                            $('input[name=radio-20choices][value=20C]').prop('disabled', false);
                        }
                
                    // 20D availability
                        if(pan20D != "Available") {
                            $( "#used-20D" ).text("(Unavailable)");
                            $('input[name=radio-20choices][value=20D]').prop('disabled', true);
                        }
                        else {
                            $( "#used-20D" ).text("");
                            $('input[name=radio-20choices][value=20D]').prop('disabled', false);
                        }

                    // if all unavailable, then the save button is disabled
                        if(pan20A != "Available" && pan20B != "Available" && pan20C != "Available" && pan20D != "Available") {
                            $('#info-assignpanbtn').attr('disabled', true);
                            $("#info-assignpanbtn").css("cursor", "default");
                            $( "#assignpanError" ).text("Sorry, no pans are available :(");
                        }
                        else {
                            $('#info-assignpanbtn').attr('disabled', false);
                            $("#info-assignpanbtn").css("cursor", "pointer");
                            $( "#assignpanError" ).text("");
                        }
                
                    $('.choices-20in').show();
                });
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
            var str = $('#info-pbutton').text();
            var panNum = str.substring(str.length-3)

            var panInfo = {
                status: nextstatus,
                ordernum: ordernum,
                pan: panNum
            }

            $.post("retrievePan", panInfo, function(data, status) {
                if (data.success){
                    console.log("retrieve pan working");
                }
                else {
                    console.log("retrieve pan aint working");
                }
            });
        
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
            ordernum: ordernum,
            pan: chosenOne
        }
        
        if(next) {
            // step 1: assign the specific pan to the order & assign ordernum to specific pan
            $.post("assignPan", information, function(data, status) {
                if (data.success){
                    console.log("assign pan working");

                    // step 2: go to the next status
                    $.post("nextStatus", information, function(data, status) {
                        if (data.success){
                            window.location.reload();
                            console.log("next status working");
                        }
                        else {
                            console.log("next status aint working");
                        }
                    });

                }
                else {
                    console.log("assign pan aint working");
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