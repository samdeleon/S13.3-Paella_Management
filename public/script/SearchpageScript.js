$(document).ready(function () {
    $("#clientsearch").click(function () {
        var name = $('#clientbox').val();

        $.post('searchClient', {name: name}, function(data, status){
          var content = data.cont;
          const tableBody = document.querySelector("#search-table > tbody");
          const request = new XMLHttpRequest();
          request.onload = () => {
             while(tableBody.firstChild) {
               tableBody.removeChild(tableBody.firstChild);
             }
             content.forEach((row) => {
               const tr = document.createElement("tr");
               content.forEach((cell) => {
                 const td = document.createElement("td");
                 td.textContent = cell;
                 tr.appendChild(td);
               });
               tableBody.appendChild(tr);
             });
          }
          request.send();
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

    $(".orderRow").click(function () {
        var num =  $(this).text();
        var link = "/order-information-";
        link = link.concat(num);

        $(location).attr("href", link);
    });
});
