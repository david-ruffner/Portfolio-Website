// Open up the mobile nav menu
$("#hamburger_icon").click(function() {
    $("#mobile_nav_container").animate({top: 0}, 250);
})

// Close the mobile nav menu
$("#expanded_hamburger_icon").click(function() {
    $("#mobile_nav_container").animate({top: -700}, 250);
})