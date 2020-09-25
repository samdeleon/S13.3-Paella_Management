$(document).ready(function () {
    $(".custorders-ordernum").click(function () {
        var num =  $(this).text();

        window.location.href = "order-information-" + num;
    });
});
