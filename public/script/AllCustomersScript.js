$(document).ready(function () {
    $(".allcust-customer").click(function () {
        var name =  $(this).text();

        window.location.href = "client-information-" + name;
    });
});
