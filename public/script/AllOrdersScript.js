$(document).ready(function () {
    $(".allorders-ordernum").click(function () {
        var num =  $(this).text();

        window.location.href = "order-information-" + num
    });

    $(".allorders-customer").click(function () {
        var name =  $(this).text();

        window.location.href = "client-information-" + name
    });
});
