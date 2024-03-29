$(document).ready(function () {
    $("#clientsearch").click(function () {
        var name = $('#clientbox').val();
        var link = "/client-information-";
        link = link.concat(name);

        $.post('searchName', {name: name}, function(data, status){
          if(!data.ok) {
            alert("Customer Not Found");
          } else  {
            $(location).attr("href", link);
            alert("Customer Found");
          }
        });
    });

    $("#numsearch").click(function () {
        var num = $('#numbox').val();
        var link = "/order-information-";
        link = link.concat(num);

        $.post('searchOrderNum', {ordernum: num}, function(data, status){
          if(!data.ok) {
            alert("Order Not Found");
          } else  {
            $(location).attr("href", link);
            alert("Order Found");
          }
        });
    });
});
