$(document).ready(function() {
    $("#touch-menu").click(function(e) {
        e.preventDefault();
        $(".nav ul").slideToggle(300);
    });
    $("#touch-menu_producty").click(function(e) {
        e.preventDefault();
     $(".product_menu nav ul").slideToggle(300);
    });
}); 