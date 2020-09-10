$(document).ready(function () {
    $(".orderRow").click(function () {
        var num =  $(this).text();
        var link = "/order-information-";
        link = link.concat(num);

        $(location).attr("href", link);
    });
});
