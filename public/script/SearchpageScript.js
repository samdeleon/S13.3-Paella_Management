$(document).ready(function () {
    $("#clientsearch").click(function () {
        var name = $('#clientbox').val();
        var link = "/search-client-";
        link = link.concat(name);

        $(location).attr("href", link);
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
