// ###### Add header ########
$(function(){
    $("#includedHeader").load("header.html");
});

// ###### Add footer ########
$(function(){
    $("#includedFooter").load("footer.html");
});

// ########"Search by" - Button show selected item ########
$(".dropdown-menu .dropdown-item").click(function(){
    var selText = $(this).text();
    $(this).parents('.dropdown').find('.dropdown-toggle').html(selText);
});

//######## Toggle Filter ########
$(function() {
    $("#toggleFilter").click(function() {
        $(this).toggleClass("filter_active");
        $(".filter__categories-container").toggleClass("filter_closed");
    });
});

// Change text of button element
$(document).ready(function(){
    if ($( "#bsd1-container" ).hasClass("show")) {
        $(".filter__categories .dropdown-toggle").html("-");
    } else {
        $(".filter__categories .dropdown-toggle").html("+");
    }
});
