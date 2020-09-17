$(document).ready(function () {
    $(".allorders-ordernum").click(function () {
        var num =  $(this).text();

        window.location.href = "order-information-" + num
    });
});
