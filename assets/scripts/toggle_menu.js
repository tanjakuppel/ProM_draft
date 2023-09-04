$(function() {
    $(".main-menu_toggle").click(function() {
        $(this).toggleClass("active");
        $(".main-menu_drawer").toggleClass("open");
        $("#mainMenu_toggle").attr("aria-expanded","true");
    });
});

