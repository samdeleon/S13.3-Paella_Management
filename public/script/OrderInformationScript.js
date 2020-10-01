$(document).ready(function () {

    // setting all out of stock ingredients to INDETERMINATE;
        var arrStock = []

        var stock1 = $("#stock-soffrito_1").text();    arrStock.push(stock1);
        var stock2 = $("#stock-soffrito_2").text();    arrStock.push(stock2);
        var stock3 = $("#stock-soffrito_3").text();    arrStock.push(stock3);
        var stock4 = $("#stock-soffrito_4").text();    arrStock.push(stock4);
        var stock5 = $("#stock-soffrito_5").text();    arrStock.push(stock5);
        
        var stock6 = $("#stock-meat_1").text();        arrStock.push(stock6);
        var stock7 = $("#stock-meat_2").text();        arrStock.push(stock7);
        var stock8 = $("#stock-meat_3").text();        arrStock.push(stock8);
        var stock9 = $("#stock-meat_4").text();        arrStock.push(stock9);
        
        var stock10 = $("#stock-seafood_1").text();    arrStock.push(stock10);
        var stock11 = $("#stock-seafood_2").text();    arrStock.push(stock11);
        var stock12 = $("#stock-seafood_3").text();    arrStock.push(stock12);
        var stock13 = $("#stock-seafood_4").text();    arrStock.push(stock13);
        var stock14 = $("#stock-seafood_5").text();    arrStock.push(stock14);
        var stock15 = $("#stock-seafood_6").text();    arrStock.push(stock15);
        
        var stock16 = $("#stock-stock_1").text();      arrStock.push(stock16);
        
        var stock17 = $("#stock-etc_1").text();        arrStock.push(stock17);
        var stock18 = $("#stock-etc_2").text();        arrStock.push(stock18);
        var stock19 = $("#stock-etc_3").text();        arrStock.push(stock19);
        var stock20 = $("#stock-etc_4").text();        arrStock.push(stock20);
        var stock21 = $("#stock-etc_5").text();        arrStock.push(stock21);
        var stock22 = $("#stock-etc_6").text();        arrStock.push(stock22);
        var stock23 = $("#stock-etc_7").text();        arrStock.push(stock23);

        var i=0;
        for (i=0; i<23; i++) {
            // making ingredient name
                // index 0 to 4 = soffrito 1 to 5
                if (i>=0 && i<=4) {
                    tempNum = i+1;
                    ingredientName = "soffrito_" + tempNum;
                }

                // index 5 to 8 = meat 1 to 4
                if (i>=5 && i<=8) {
                    tempNum = i-4;
                    ingredientName = "meat_" + tempNum;
                }

                // index 9 to 14 = seafood 1 to 6
                if (i>=9 && i<=14) {
                    tempNum = i-8;
                    ingredientName = "seafood_" + tempNum;
                }

                // index 15 = stock 1
                if (i==15) {
                    ingredientName = "stock_1";
                }

                // index 16 to 22 = etc 1 to 7
                if (i>=16 && i<=22) {
                    tempNum = i-15
                    ingredientName = "etc_" + tempNum;
                }

                var idCheckbox = "check-" + ingredientName;

            if(arrStock[i] == "(Out of Stock)") {
                // indeterminate
                $("#"+idCheckbox).prop('indeterminate', true);
                $("#"+idCheckbox).prop('disabled', true);
            }
            else {
                // back to normal
                $("#"+idCheckbox).prop('indeterminate', false);
            }
        }

    // setting the profit div
        var customerPrice = $("#customerPrice").text();
        var ingredientPrice = $("#ingredientPrice").text();
        var totalProfit = $("#totalProfit").text();

        if (customerPrice == "Php None" && customerPrice == "Php None" && customerPrice == "Php None"){
            $(".yesCompleted").css("display", "none");
            $(".notCompleted").css("display", "show");
        }
        else {
            $(".yesCompleted").css("display", "show");
            $(".notCompleted").css("display", "none");
        }


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
            var arrChecks = [];

            var check1 = $("#check-soffrito_1").is(":checked");    arrChecks.push(check1);
            var check2 = $("#check-soffrito_2").is(":checked");    arrChecks.push(check2);
            var check3 = $("#check-soffrito_3").is(":checked");    arrChecks.push(check3);
            var check4 = $("#check-soffrito_4").is(":checked");    arrChecks.push(check4);
            var check5 = $("#check-soffrito_5").is(":checked");    arrChecks.push(check5);
            
            var check6 = $("#check-meat_1").is(":checked");        arrChecks.push(check6);
            var check7 = $("#check-meat_2").is(":checked");        arrChecks.push(check7);
            var check8 = $("#check-meat_3").is(":checked");        arrChecks.push(check8);
            var check9 = $("#check-meat_4").is(":checked");        arrChecks.push(check9);
            
            var check10 = $("#check-seafood_1").is(":checked");    arrChecks.push(check10);
            var check11 = $("#check-seafood_2").is(":checked");    arrChecks.push(check11);
            var check12 = $("#check-seafood_3").is(":checked");    arrChecks.push(check12);
            var check13 = $("#check-seafood_4").is(":checked");    arrChecks.push(check13);
            var check14 = $("#check-seafood_5").is(":checked");    arrChecks.push(check14);
            var check15 = $("#check-seafood_6").is(":checked");    arrChecks.push(check15);
            
            var check16 = $("#check-stock_1").is(":checked");      arrChecks.push(check16);
            
            var check17 = $("#check-etc_1").is(":checked");        arrChecks.push(check17);
            var check18 = $("#check-etc_2").is(":checked");        arrChecks.push(check18);
            var check19 = $("#check-etc_3").is(":checked");        arrChecks.push(check19);
            var check20 = $("#check-etc_4").is(":checked");        arrChecks.push(check20);
            var check21 = $("#check-etc_5").is(":checked");        arrChecks.push(check21);
            var check22 = $("#check-etc_6").is(":checked");        arrChecks.push(check22);
            var check23 = $("#check-etc_7").is(":checked");        arrChecks.push(check23);

            var isAllChecked = true;
            var i=0;
            for (i=0; i<23; i++) {
                if(arrChecks[i]) {

                }
                else {
                    isAllChecked = false;
                }
            }

            // if all checked = can go to next status, else it cant
            if (isAllChecked) {
                $( "#nextstatusError" ).text("");
                next = true;
            }
            else {
                $( "#nextstatusError" ).text("Ingredients are still incomplete.");
                next = false;
            }

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

    $(".info-nextstatusCancel").click(function() {
        $( "#nextstatusError" ).text("");
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

    $("#ingredientsSaveBtn").click(function() {
        // getting all the CHECKED values of each ingredient:
            var arrChecks = [];

            var check1 = $("#check-soffrito_1").is(":checked");    arrChecks.push(check1);
            var check2 = $("#check-soffrito_2").is(":checked");    arrChecks.push(check2);
            var check3 = $("#check-soffrito_3").is(":checked");    arrChecks.push(check3);
            var check4 = $("#check-soffrito_4").is(":checked");    arrChecks.push(check4);
            var check5 = $("#check-soffrito_5").is(":checked");    arrChecks.push(check5);
            
            var check6 = $("#check-meat_1").is(":checked");        arrChecks.push(check6);
            var check7 = $("#check-meat_2").is(":checked");        arrChecks.push(check7);
            var check8 = $("#check-meat_3").is(":checked");        arrChecks.push(check8);
            var check9 = $("#check-meat_4").is(":checked");        arrChecks.push(check9);
            
            var check10 = $("#check-seafood_1").is(":checked");    arrChecks.push(check10);
            var check11 = $("#check-seafood_2").is(":checked");    arrChecks.push(check11);
            var check12 = $("#check-seafood_3").is(":checked");    arrChecks.push(check12);
            var check13 = $("#check-seafood_4").is(":checked");    arrChecks.push(check13);
            var check14 = $("#check-seafood_5").is(":checked");    arrChecks.push(check14);
            var check15 = $("#check-seafood_6").is(":checked");    arrChecks.push(check15);
            
            var check16 = $("#check-stock_1").is(":checked");      arrChecks.push(check16);
            
            var check17 = $("#check-etc_1").is(":checked");        arrChecks.push(check17);
            var check18 = $("#check-etc_2").is(":checked");        arrChecks.push(check18);
            var check19 = $("#check-etc_3").is(":checked");        arrChecks.push(check19);
            var check20 = $("#check-etc_4").is(":checked");        arrChecks.push(check20);
            var check21 = $("#check-etc_5").is(":checked");        arrChecks.push(check21);
            var check22 = $("#check-etc_6").is(":checked");        arrChecks.push(check22);
            var check23 = $("#check-etc_7").is(":checked");        arrChecks.push(check23);

        // getting all the QUANTITY values of each ingredient:
            var arrQuantity = [];   // TODO: change the value into getting the span of it

            var quantity1 = $("#quantity-soffrito_1").text();     arrQuantity.push(quantity1);
            var quantity2 = $("#quantity-soffrito_2").text();     arrQuantity.push(quantity2);
            var quantity3 = $("#quantity-soffrito_3").text();     arrQuantity.push(quantity3);
            var quantity4 = $("#quantity-soffrito_4").text();     arrQuantity.push(quantity4);
            var quantity5 = $("#quantity-soffrito_5").text();     arrQuantity.push(quantity5);
            
            var quantity6 = $("#quantity-meat_1").text();         arrQuantity.push(quantity6);
            var quantity7 = $("#quantity-meat_2").text();         arrQuantity.push(quantity7);
            var quantity8 = $("#quantity-meat_3").text();         arrQuantity.push(quantity8);
            var quantity9 = $("#quantity-meat_4").text();         arrQuantity.push(quantity9);
            
            var quantity10 = $("#quantity-seafood_1").text();     arrQuantity.push(quantity10);
            var quantity11 = $("#quantity-seafood_2").text();     arrQuantity.push(quantity11);
            var quantity12 = $("#quantity-seafood_3").text();     arrQuantity.push(quantity12);
            var quantity13 = $("#quantity-seafood_4").text();     arrQuantity.push(quantity13);
            var quantity14 = $("#quantity-seafood_5").text();     arrQuantity.push(quantity14);
            var quantity15 = $("#quantity-seafood_6").text();     arrQuantity.push(quantity15);
            
            var quantity16 = $("#quantity-stock_1").text();       arrQuantity.push(quantity16);
            
            var quantity17 = $("#quantity-etc_1").text();         arrQuantity.push(quantity17);
            var quantity18 = $("#quantity-etc_2").text();         arrQuantity.push(quantity18);
            var quantity19 = $("#quantity-etc_3").text();         arrQuantity.push(quantity19);
            var quantity20 = $("#quantity-etc_4").text();         arrQuantity.push(quantity20);
            var quantity21 = $("#quantity-etc_5").text();         arrQuantity.push(quantity21);
            var quantity22 = $("#quantity-etc_6").text();         arrQuantity.push(quantity22);
            var quantity23 = $("#quantity-etc_7").text();         arrQuantity.push(quantity23);

        // now we check each ingredient is checked
            var arrDeduct = [];
            var i=0;

            for (i=0; i<23; i++) {
                if(arrChecks[i]) {
                    var temp = parseInt(arrQuantity[i]);
                    arrDeduct.push(temp);
                }
                else {
                    var temp = 0;
                    arrDeduct.push(temp);
                }
            }

        // this is the post requests part
        var ordernum = $("#span_ordernum").text();
        
        var information = {
            ordernum: ordernum,
            checked: arrChecks,
            quantity: arrDeduct
        }

        // step 1: save checked fields in the orders db
        $.post("saveCheckedIngredients", information, function(data, status) {
            if (data.success){
                console.log("save checked ingredients working");

                // step 2: deduct the ingredients quantities from ingredients db
                $.post("deductCheckedIngredients", information, function(data, status) {

                    console.log("finished the deduct in index.js");

                    if (data.success){
                        console.log("deduct ingredients working");
                        alert("Successfully updated the ingredients checklist and inventory!");
                        window.location.reload();
                    }
                    else {
                        console.log("deduct ingredients aint working");
                    }
                });
            }
            else {
                console.log("save checked ingredients aint working");
            }
        });

    });
    
});